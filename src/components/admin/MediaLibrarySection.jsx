import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Eye, ImagePlus, RefreshCw, Search, Trash2, X } from "lucide-react";
import {
  deleteOrphanedMedia,
  deleteReferencedMedia,
  fetchMediaLibrary,
  prepareMediaDeletion,
  replaceReferencedMedia,
  retryMediaDatabaseRepair,
} from "../../services/mediaLibraryService";

const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
};

const formatDate = (date) => date ? new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" }).format(new Date(date)) : "Non disponibile";

export default function MediaLibrarySection() {
  const [library, setLibrary] = useState(null);
  const [section, setSection] = useState("portfolio");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [repair, setRepair] = useState(null);
  const [coverPrompt, setCoverPrompt] = useState(null);
  const [selectedOrphans, setSelectedOrphans] = useState(new Set());
  const fileInput = useRef(null);

  const reload = async () => {
    try {
      setLoading(true);
      const nextLibrary = await fetchMediaLibrary();
      setLibrary(nextLibrary);
      setSelectedOrphans(new Set(nextLibrary.orphans.map((file) => `${file.bucket}:${file.path}`)));
    } catch (error) {
      console.error(error);
      setMessage("Non è stato possibile leggere la libreria media.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(reload, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const projects = useMemo(() => {
    const allProjects = library?.projects?.[section] || [];
    const term = search.trim().toLowerCase();
    return allProjects
      .filter((project) => {
        const assets = project.assets || [];
        const matchesSearch = !term || project.title?.toLowerCase().includes(term) || assets.some((asset) => asset.file?.name?.toLowerCase().includes(term));
        if (!matchesSearch) return false;
        if (filter === "with-cover") return Boolean(project.cover_image);
        if (filter === "without-cover") return !project.cover_image;
        if (filter === "most-images") return assets.length >= 5;
        return true;
      })
      .sort((first, second) => {
        if (filter === "latest") return new Date(second.updated_at || second.created_at || 0) - new Date(first.updated_at || first.created_at || 0);
        if (filter === "most-images") return second.assets.length - first.assets.length;
        return first.title.localeCompare(second.title);
      });
  }, [library, section, search, filter]);

  const activeProject = selectedProject && (library?.projects?.[section] || []).find((project) => project.id === selectedProject);

  const finishDelete = async (asset, replacementCover) => {
    try {
      await deleteReferencedMedia(asset, replacementCover);
      setSelectedAsset(null);
      setCoverPrompt(null);
      setMessage("Immagine eliminata da Storage e riferimento aggiornato nel database.");
      await reload();
    } catch (error) {
      if (error.code === "DATABASE_REPAIR_REQUIRED") {
        setRepair(error.repair);
        setSelectedAsset(null);
        setCoverPrompt(null);
        return;
      }
      setMessage(error.message || "Non è stato possibile eliminare l'immagine.");
    }
  };

  const requestDelete = async () => {
    if (!selectedAsset) return;
    try {
      const preparation = await prepareMediaDeletion(selectedAsset);
      if (preparation.imageCount <= 1) {
        setMessage("Operazione bloccata: questo contenuto rimarrebbe senza immagini.");
        return;
      }
      if (preparation.isCover) {
        setCoverPrompt({ asset: selectedAsset, preparation, replacement: preparation.replacementOptions[0] || "" });
        return;
      }
      if (window.confirm("Eliminare definitivamente questa immagine da Storage e database?")) {
        await finishDelete(selectedAsset);
      }
    } catch (error) {
      setMessage(error.message || "Non è stato possibile verificare l'immagine.");
    }
  };

  const retryRepair = async () => {
    try {
      await retryMediaDatabaseRepair(repair);
      setRepair(null);
      setMessage("Riferimento nel database riparato correttamente.");
      await reload();
    } catch {
      setMessage("La riparazione non è riuscita: riprova più tardi.");
    }
  };

  const replaceSelectedAsset = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !selectedAsset) return;
    try {
      await replaceReferencedMedia(selectedAsset, file);
      setSelectedAsset(null);
      setMessage("Nuova immagine caricata, database aggiornato e vecchio file eliminato.");
      await reload();
    } catch (error) {
      setMessage(error.message || "Non è stato possibile sostituire l'immagine.");
      if (error.code === "OLD_FILE_CLEANUP_REQUIRED") await reload();
    }
  };

  const deleteSelectedOrphans = async () => {
    const files = (library?.orphans || []).filter((file) => selectedOrphans.has(`${file.bucket}:${file.path}`));
    if (!files.length || !window.confirm(`Eliminare definitivamente ${files.length} immagini orfane selezionate?`)) return;
    try {
      await deleteOrphanedMedia(files);
      setMessage(`${files.length} immagini orfane eliminate dallo Storage.`);
      await reload();
    } catch {
      setMessage("Alcune immagini orfane non sono state eliminate. Riprova con quelle rimaste.");
      await reload();
    }
  };

  const selectAsset = (asset) => setSelectedAsset(asset);

  return (
    <div className="max-w-[1600px] mx-auto">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-5">Digital Asset Manager</p>
          <h2 className="text-4xl font-light sm:text-5xl lg:text-6xl">Media Library</h2>
        </div>
        <button onClick={reload} disabled={loading} className="inline-flex items-center gap-2 border border-black px-5 py-3 text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white disabled:opacity-40 transition">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Analizza Storage
        </button>
      </header>

      {repair && (
        <div className="mb-8 border border-amber-500 bg-amber-50 p-5 text-sm">
          <p className="font-medium">✓ File eliminato da Storage · ✕ Aggiornamento database fallito</p>
          <p className="mt-2 opacity-70">Lo Storage è già stato aggiornato; il record contiene ancora un riferimento non valido.</p>
          <button onClick={retryRepair} className="mt-4 border border-black px-4 py-2 text-xs uppercase tracking-[0.18em] hover:bg-black hover:text-white transition">Riprova aggiornamento</button>
        </div>
      )}
      {message && <div className="mb-8 flex items-center justify-between gap-4 border border-black/10 bg-white p-4 text-sm"><span>{message}</span><button onClick={() => setMessage("")} aria-label="Chiudi"><X size={16} /></button></div>}

      {!selectedProject ? (
        <>
          <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-black/10 bg-white p-5"><p className="text-xs uppercase tracking-[0.2em] opacity-45">Portfolio</p><p className="mt-2 text-3xl font-light">{library?.projects?.portfolio?.length || 0}</p><p className="text-sm opacity-55">progetti</p></div>
            <div className="border border-black/10 bg-white p-5"><p className="text-xs uppercase tracking-[0.2em] opacity-45">Immagini</p><p className="mt-2 text-3xl font-light">{library?.stats?.images || 0}</p><p className="text-sm opacity-55">nei due bucket</p></div>
            <div className="border border-black/10 bg-white p-5"><p className="text-xs uppercase tracking-[0.2em] opacity-45">Storage</p><p className="mt-2 text-3xl font-light">{formatBytes(library?.stats?.bytes || 0)}</p><p className="text-sm opacity-55">utilizzati</p></div>
            <div className="border border-black/10 bg-white p-5"><p className="text-xs uppercase tracking-[0.2em] opacity-45">Orfane</p><p className="mt-2 text-3xl font-light">{library?.stats?.orphans || 0}</p><p className="text-sm opacity-55">da verificare</p></div>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-black/10 pb-6">
            {[["portfolio", "Portfolio"], ["journal", "Journal"]].map(([key, label]) => <button key={key} onClick={() => { setSection(key); setSearch(""); }} className={`px-5 py-3 text-xs uppercase tracking-[0.2em] transition ${section === key ? "bg-black text-white" : "border border-black/15 hover:border-black"}`}>{label}</button>)}
            <div className="ml-auto flex min-w-[240px] flex-1 items-center gap-2 border-b border-black/30 py-2 sm:max-w-md"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Titolo o nome file..." className="w-full bg-transparent outline-none" /></div>
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-black/15 bg-white px-3 py-3 text-sm outline-none"><option value="all">Tutti</option><option value="with-cover">Con cover</option><option value="without-cover">Senza cover</option><option value="latest">Ultimi modificati</option><option value="most-images">Più immagini</option></select>
          </div>

          <section className="border border-black/10 bg-white">
            <div className="border-b border-black/10 p-6"><h3 className="text-2xl font-light">{section === "portfolio" ? "Portfolio" : "Journal"}</h3><p className="mt-1 text-sm opacity-55">Apri un progetto per vedere solo le immagini a esso collegate.</p></div>
            {loading ? <p className="p-10 opacity-55">Caricamento libreria…</p> : <div className="divide-y divide-black/10">{projects.map((project) => <button key={project.id} onClick={() => setSelectedProject(project.id)} className="flex w-full items-center gap-5 p-5 text-left hover:bg-black/[0.02] transition"><img src={project.cover_image || project.assets?.[0]?.url} alt="" className="h-16 w-16 object-cover bg-black/5" /><span className="flex-1"><span className="block text-lg">{project.title}</span><span className="text-sm opacity-55">{project.assets.length} immagini · {project.cover_image ? "cover impostata" : "senza cover"}</span></span><ArrowLeft className="rotate-180 opacity-50" size={18} /></button>)}{!projects.length && <p className="p-10 opacity-55">Nessun contenuto trovato.</p>}</div>}
          </section>

          <section className="mt-12 border border-black/10 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.22em] opacity-45">Storage</p><h3 className="mt-2 text-2xl font-light">Immagini orfane</h3><p className="mt-1 text-sm opacity-55">File non riferiti da Portfolio, Journal o elementi nel cestino.</p></div><button onClick={deleteSelectedOrphans} disabled={!selectedOrphans.size} className="inline-flex items-center gap-2 border border-red-500 px-4 py-3 text-xs uppercase tracking-[0.18em] text-red-600 disabled:opacity-35 hover:bg-red-500 hover:text-white transition"><Trash2 size={14} /> Elimina selezionate</button></div>
            <div className="mt-6 divide-y divide-black/10">{(library?.orphans || []).map((file) => { const key = `${file.bucket}:${file.path}`; return <label key={key} className="flex items-center gap-4 py-3 text-sm"><input type="checkbox" checked={selectedOrphans.has(key)} onChange={() => setSelectedOrphans((selected) => { const next = new Set(selected); next.has(key) ? next.delete(key) : next.add(key); return next; })} /><span className="flex-1 truncate">{file.name}</span><span className="opacity-55">{file.bucket}</span><span className="opacity-55">{formatBytes(file.metadata?.size)}</span><span className="opacity-55">{formatDate(file.created_at)}</span></label>})}{library && !library.orphans.length && <p className="py-6 text-sm opacity-55">Nessuna immagine orfana trovata.</p>}</div>
          </section>
        </>
      ) : (
        <section>
          <button onClick={() => { setSelectedProject(null); setSelectedAsset(null); }} className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-60 hover:opacity-100"><ArrowLeft size={15} /> Torna a {section === "portfolio" ? "Portfolio" : "Journal"}</button>
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="uppercase tracking-[0.2em] text-xs opacity-45">{section}</p><h3 className="mt-3 text-4xl font-light">{activeProject?.title}</h3></div><p className="text-sm opacity-55">{activeProject?.assets?.length || 0} immagini</p></div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">{activeProject?.assets?.map((asset) => <button key={asset.id} onClick={() => selectAsset(asset)} className="group relative overflow-hidden border border-black/10 bg-black/5 text-left"><img src={asset.url} alt="" className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-white opacity-0 transition group-hover:opacity-100"><span>{asset.kind === "cover" ? "Cover" : "Immagine"}</span><Eye size={13} /></span></button>)}</div>
        </section>
      )}

      {selectedAsset && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5"><div className="max-h-[95vh] w-full max-w-5xl overflow-auto bg-white p-5 sm:p-6 md:p-8"><div className="mb-5 flex justify-end"><button onClick={() => setSelectedAsset(null)} aria-label="Chiudi"><X size={22} /></button></div><div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:gap-8"><img src={selectedAsset.url} alt="" className="max-h-[65vh] w-full object-contain bg-black/5" /><div><p className="text-xs uppercase tracking-[0.2em] opacity-45">{selectedAsset.kind === "cover" ? "Copertina" : "Foto"}</p><h3 className="mt-3 break-all text-xl font-light">{selectedAsset.file?.name || selectedAsset.path || "File non trovato"}</h3><dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="opacity-50">Usata in</dt><dd>{selectedAsset.recordType === "portfolio" ? "Portfolio" : "Journal"} · {selectedAsset.recordTitle}</dd></div><div className="flex justify-between gap-4"><dt className="opacity-50">Dimensione</dt><dd>{formatBytes(selectedAsset.file?.metadata?.size)}</dd></div><div className="flex justify-between gap-4"><dt className="opacity-50">Caricata</dt><dd>{formatDate(selectedAsset.file?.created_at)}</dd></div></dl><input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={replaceSelectedAsset} /><button onClick={() => fileInput.current?.click()} className="mt-8 flex w-full items-center justify-center gap-2 border border-black px-4 py-3 text-xs uppercase tracking-[0.18em] hover:bg-black hover:text-white transition"><ImagePlus size={15} /> Sostituisci</button><button onClick={requestDelete} className="mt-3 flex w-full items-center justify-center gap-2 border border-red-500 px-4 py-3 text-xs uppercase tracking-[0.18em] text-red-600 hover:bg-red-500 hover:text-white transition"><Trash2 size={15} /> Elimina definitivamente</button></div></div></div></div>}

      {coverPrompt && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-5"><div className="w-full max-w-lg bg-white p-8"><h3 className="text-2xl font-light">Questa immagine è la copertina</h3><p className="mt-3 text-sm opacity-65">Scegli una nuova copertina prima di eliminarla dallo Storage.</p><select value={coverPrompt.replacement} onChange={(event) => setCoverPrompt({ ...coverPrompt, replacement: event.target.value })} className="mt-6 w-full border border-black/20 bg-white p-3 text-sm"><option value="">Scegli una nuova copertina</option>{coverPrompt.preparation.replacementOptions.map((url, index) => <option key={url} value={url}>Immagine {index + 1}</option>)}</select><div className="mt-6 flex gap-3"><button onClick={() => finishDelete(coverPrompt.asset, coverPrompt.replacement)} disabled={!coverPrompt.replacement} className="border border-black bg-black px-5 py-3 text-xs uppercase tracking-[0.18em] text-white disabled:opacity-35">Imposta e elimina</button><button onClick={() => setCoverPrompt(null)} className="px-4 py-3 text-xs uppercase tracking-[0.18em] opacity-60">Annulla</button></div></div></div>}
    </div>
  );
}
