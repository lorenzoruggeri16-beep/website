import { Sparkles, Upload, X } from "lucide-react";

import { PORTFOLIO_CATEGORIES } from "../../../lib/portfolio";

function UploadPanel({
  accept,
  children,
  multiple = false,
  onFiles,
}) {
  const handleFiles = (files) => {
    if (files?.length) onFiles(files);
  };

  return (
    <label
      className="block cursor-pointer border border-dashed border-black/20 p-6 transition hover:border-black/50"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      {children}
    </label>
  );
}

export default function PortfolioEditor({
  aiStatus,
  aiWarning,
  error,
  form,
  isSaving,
  onCancel,
  onChange,
  onCoverUpload,
  onGalleryUpload,
    onRemoveGalleryImage,
  onSubmit,
  progress,
  uploading,
}) {
  const isEditing = Boolean(form.id);

  return (
    <aside className="w-full border border-black/10 bg-white p-6 sm:p-8 lg:col-span-4 lg:max-w-[500px] lg:p-10 rounded-sm">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.3em] text-[10px] opacity-45 mb-3">
            Studio Control
          </p>
          <h3 className="text-2xl font-light">
            {isEditing ? "Modifica sessione" : "Nuova sessione"}
          </h3>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 border border-black/10 hover:bg-black hover:text-white transition"
            aria-label="Annulla modifica"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Titolo della sessione"
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          className="w-full border-b border-black bg-transparent py-4 outline-none"
        />

        <input
          type="text"
          placeholder="Localit\u00e0"
          value={form.location}
          onChange={(event) => onChange("location", event.target.value)}
          className="w-full border-b border-black bg-transparent py-4 outline-none"
        />

        <select
          value={form.category}
          onChange={(event) => onChange("category", event.target.value)}
          className="w-full border-b border-black bg-transparent py-4 outline-none"
        >
          {PORTFOLIO_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <UploadPanel accept="image/*" onFiles={onCoverUpload}>
          {form.coverImage ? (
            <img
              src={form.coverImage}
              alt="Anteprima copertina"
              className="w-full h-[180px] object-cover"
            />
          ) : (
            <div className="min-h-[140px] flex flex-col items-center justify-center text-center">
              <Upload size={20} className="mb-4 opacity-45" />
              <p className="uppercase tracking-[0.3em] text-xs opacity-45">
                Carica copertina
              </p>
              <p className="mt-2 text-sm opacity-50">Clicca o trascina un'immagine</p>
            </div>
          )}
        </UploadPanel>

        <UploadPanel accept="image/*" multiple onFiles={onGalleryUpload}>
          <div className="min-h-[120px]">
            <p className="uppercase tracking-[0.3em] text-xs opacity-45 mb-2">
              Galleria
            </p>
            <p className="text-sm opacity-50 mb-5">
              Clicca o trascina tutte le immagini della sessione
            </p>

            {uploading && (
              <div className="mb-5">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2">
                  <span>Caricamento</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-px bg-black/10">
                  <div
                    className="h-full bg-[#c6a66a] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {form.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {form.gallery.map((image, index) => (
                  <div key={image} className="group relative">
                    <img
                      src={image}
                      alt={`Immagine ${index + 1} della galleria`}
                      className="h-20 w-full object-cover"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => onRemoveGalleryImage(image)}
                        className="absolute right-1 top-1 grid h-6 w-6 place-items-center bg-black/80 text-white opacity-0 transition group-hover:opacity-100"
                        aria-label="Elimina immagine"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </UploadPanel>

        <textarea
          rows="5"
          placeholder="Descrizione della sessione"
          value={form.description}
          onChange={(event) => onChange("description", event.target.value)}
          className="w-full border-b border-black bg-transparent py-4 outline-none resize-none"
        />

        <div className="border border-black/10 px-4 py-3 flex gap-3 items-center text-sm opacity-60">
          <Sparkles size={16} className="text-[#c6a66a]" />
          <span>{aiStatus.message}</span>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {aiWarning && <p className="text-sm text-amber-700">{aiWarning}</p>}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={uploading || isSaving}
            className="border border-black px-7 py-4 uppercase tracking-[0.25em] text-xs hover:bg-black hover:text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving
              ? "Salvataggio..."
              : isEditing
                ? "Aggiorna sessione"
                : "Pubblica sessione"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-4 text-xs uppercase tracking-[0.2em] opacity-55 hover:opacity-100 transition"
            >
              Annulla
            </button>
          )}
        </div>
      </form>
    </aside>
  );
}



