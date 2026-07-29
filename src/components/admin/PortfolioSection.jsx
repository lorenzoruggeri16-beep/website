import {
  useEffect,
  useMemo,
  useState,
} from "react";

import PortfolioCollection from "./portfolio/PortfolioCollection";
import PortfolioEditor from "./portfolio/PortfolioEditor";
import {
  EMPTY_PORTFOLIO_FORM,
  createPortfolioForm,
  filterPortfolioItems,
  validatePortfolioForm,
} from "../../lib/portfolio";
import {
  archivePortfolio,
  fetchActivePortfolio,
  savePortfolio,
} from "../../services/portfolioService";
import {
  uploadPortfolioGallery,
  uploadPortfolioImage,
} from "../../services/portfolioStorage";
import { deleteReferencedMedia } from "../../services/mediaLibraryService";
import {
  generatePortfolioContent,
  getPortfolioAiStatus,
} from "../../services/portfolioAi";

export default function PortfolioSection({
  currentUser,
  setBinItems,
}) {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [form, setForm] = useState(EMPTY_PORTFOLIO_FORM);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [aiWarning, setAiWarning] = useState("");

  const aiStatus = getPortfolioAiStatus();

  const filteredPortfolio = useMemo(
    () => filterPortfolioItems(portfolioItems, search, sortBy),
    [portfolioItems, search, sortBy]
  );

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setError("");
        setPortfolioItems(await fetchActivePortfolio());
      } catch (fetchError) {
        setError("Non \u00e8 stato possibile caricare il portfolio.");
        console.error(fetchError);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const updateForm = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const resetForm = () => {
    setForm({ ...EMPTY_PORTFOLIO_FORM, gallery: [], translations: {} });
    setError("");
  };

  const handleCoverUpload = async (files) => {
    const [file] = files;
    if (!file) return;

    try {
      setError("");
      setUploading(true);
      setUploadProgress(0);
      const coverImage = await uploadPortfolioImage(file);
      updateForm("coverImage", coverImage);
      setUploadProgress(100);
    } catch (uploadError) {
      setError("Non \u00e8 stato possibile caricare l'immagine di copertina.");
      console.error(uploadError);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (files) => {
    const selectedFiles = Array.from(files || []);
    if (!selectedFiles.length) return;

    try {
      setError("");
      setUploading(true);
      setUploadProgress(0);
      const gallery = await uploadPortfolioGallery(selectedFiles, setUploadProgress);
      setForm((currentForm) => ({
        ...currentForm,
        gallery: [...currentForm.gallery, ...gallery],
      }));
    } catch (uploadError) {
      setError("Non \u00e8 stato possibile caricare tutte le immagini della galleria.");
      console.error(uploadError);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryImageDelete = async (image) => {
    if (!window.confirm("Eliminare definitivamente questa immagine dalla galleria?")) return;

    if (!form.id) {
      setError("Salva prima la sessione: le immagini non pubblicate si possono ancora rimuovere senza rischi.");
      return;
    }

    try {
      setError("");
      const asset = {
        bucket: "portfolio-images",
        url: image,
        recordId: form.id,
        recordType: "portfolio",
        recordTitle: form.title,
      };
      await deleteReferencedMedia(asset);
      setForm((currentForm) => ({
        ...currentForm,
        gallery: currentForm.gallery.filter((galleryImage) => galleryImage !== image),
      }));
      setPortfolioItems((items) => items.map((item) => (
        item.id === form.id
          ? { ...item, gallery: item.gallery.filter((galleryImage) => galleryImage !== image) }
          : item
      )));
    } catch (deleteError) {
      console.error(deleteError);
      setError(deleteError.code === "DATABASE_REPAIR_REQUIRED"
        ? "Il file è stato eliminato, ma il database va riparato dalla Media Library."
        : deleteError.message || "Non è stato possibile eliminare l'immagine.");
    }
  };
  const handleSave = async (event) => {
    event.preventDefault();

    const validationError = validatePortfolioForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setAiWarning("");
      setIsSaving(true);

      let preparedForm = form;
      let warning = "";

      try {
        preparedForm = await generatePortfolioContent(form);
      } catch (aiError) {
        console.error(aiError);
        warning = "L'AI non ha generato traduzioni, SEO e alt text. Puoi rigenerarli in seguito.";
      }

      const savedItem = await savePortfolio(preparedForm);
      setPortfolioItems((items) => (
        form.id
          ? items.map((item) => (item.id === savedItem.id ? savedItem : item))
          : [savedItem, ...items]
      ));
      resetForm();
      setAiWarning(warning);
    } catch (saveError) {
      console.error(saveError);
      setError("Non \u00e8 stato possibile salvare la sessione.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleArchive = async (item) => {
    if (!window.confirm(`Spostare "${item.title}" nel cestino?`)) return;

    try {
      setError("");
      const deletedAt = await archivePortfolio(item.id);
      setPortfolioItems((items) => items.filter(({ id }) => id !== item.id));
      setBinItems((items) => [
        {
          id: item.id,
          title: item.title,
          type: "portfolio",
          coverImage: item.coverImage,
          description: item.description,
          deletedAt,
        },
        ...items,
      ]);

      if (form.id === item.id) resetForm();
    } catch (archiveError) {
      setError("Non \u00e8 stato possibile spostare la sessione nel cestino.");
      console.error(archiveError);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <header className="mb-10 sm:mb-16 lg:mb-20">
        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">
          Creative Management
        </p>
        <h2 className="mb-5 text-4xl font-light sm:mb-6 sm:text-5xl lg:text-6xl">Portfolio</h2>
        <p className="opacity-50 text-lg max-w-2xl leading-relaxed">
          Manage cinematic sessions and visual storytelling archives.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-20 w-full items-start">
        <PortfolioEditor
          aiStatus={aiStatus}
          aiWarning={aiWarning}
          error={error}
          form={form}
          isSaving={isSaving}
          onCancel={resetForm}
          onChange={updateForm}
          onCoverUpload={handleCoverUpload}
          onGalleryUpload={handleGalleryUpload}
          onRemoveGalleryImage={handleGalleryImageDelete}
          onSubmit={handleSave}
          progress={uploadProgress}
          uploading={uploading}
        />

        {loading ? (
          <div className="lg:col-span-8 py-16 text-center opacity-50">Caricamento portfolio...</div>
        ) : (
          <PortfolioCollection
            items={filteredPortfolio}
            onArchive={currentUser?.permissions?.deletePortfolio ? handleArchive : undefined}
            onEdit={(item) => {
              setForm(createPortfolioForm(item));
              setError("");
            }}
            onSearchChange={setSearch}
            onSortToggle={() => setSortBy((value) => (value === "latest" ? "oldest" : "latest"))}
            search={search}
            sortBy={sortBy}
          />
        )}
      </div>
    </div>
  );
}
