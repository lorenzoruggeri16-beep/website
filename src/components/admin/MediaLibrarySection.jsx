import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MediaLibrarySection() {

  const [journalFiles, setJournalFiles] =
    useState([]);

  const [portfolioFiles, setPortfolioFiles] =
    useState([]);

  const [selectedImage,
    setSelectedImage] =
    useState(null)
  
  const getImageUrl = (
    bucket,
    fileName
  ) => {

    const copyUrl = async (
        bucket,
        fileName
    ) => {

        const url =
            getImageUrl(
                bucket,
                fileName
            );

        await navigator
            .clipboard
            .writeText(url);

        alert(
            "URL copied"
        );

    };

    const {
      data,
    } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(
        fileName
      );

    return data.publicUrl;

  };

  const deleteImage = async (
    bucket,
    fileName
    ) => {

  const confirmed =
    window.confirm(
      "This action cannot be undone. Delete image?"
    );

  if (!confirmed)
    return;

  const {
    error,
  } = await supabase
    .storage
    .from(bucket)
    .remove([
      fileName,
    ]);

  if (error) {

    console.error(
      error
    );

    alert(
      "Error deleting image"
    );

    return;

  }

  if (
    bucket === "journal"
  ) {

    setJournalFiles(
      (prev) =>
        prev.filter(
          (file) =>
            file.name !==
            fileName
        )
    );

  }

  if (
    bucket ===
    "portfolio-images"
  ) {

    setPortfolioFiles(
      (prev) =>
        prev.filter(
          (file) =>
            file.name !==
            fileName
        )
    );

  }

  setSelectedImage(
    null
  );

};

  useEffect(() => {

    const loadFiles = async () => {

      const {
        data: journal,
      } = await supabase
        .storage
        .from("journal")
        .list("", {
          limit: 100,
          offset: 0,
        });

      const {
        data: portfolio,
      } = await supabase
        .storage
        .from("portfolio-images")
        .list("", {
          limit: 100,
          offset: 0,
        });

      setJournalFiles(
        journal || []
      );

      setPortfolioFiles(
        portfolio || []
      );

    };

    loadFiles();

  }, []);

  return (

    <div>

      <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

        Storage

      </p>

      <h2 className="text-6xl font-light mb-12">

        Media Library

      </h2>

      <div className="grid md:grid-cols-2 gap-12">

        {/* JOURNAL */}

        <div className="bg-white border border-black/5 p-8">

          <h3 className="text-2xl font-light mb-4">

            Journal

          </h3>

          <p className="opacity-50 mb-6">

            {journalFiles.length} images

          </p>

          <div className="grid grid-cols-3 gap-4">

            {journalFiles
              .slice(0, 12)
              .map((file) => (

                <div
                  key={file.name}
                  className="space-y-2"
                >

                  <img
                    src={getImageUrl(
                      "journal",
                      file.name
                    )}
                    onClick={() =>
                      setSelectedImage({
                        bucket: "journal",
                        file: file.name,
                     })
                    }
                    alt=""
                    className="
                      aspect-square
                      object-cover
                      border
                      border-black/5
                      cursor-pointer
                      hover:scale-105
                      transition
                      duration-300
                    "
                  />

                  <div
                    className="
                      text-xs
                      opacity-50
                      truncate
                    "
                  >

                    {file.name}

                  </div>

                </div>

              ))}

          </div>

        </div>

        {/* PORTFOLIO */}

        <div className="bg-white border border-black/5 p-8">

          <h3 className="text-2xl font-light mb-4">

            Portfolio

          </h3>

          <p className="opacity-50 mb-6">

            {portfolioFiles.length} images

          </p>

          <div className="grid grid-cols-3 gap-4">

            {portfolioFiles
              .slice(0, 12)
              .map((file) => (

                <div
                  key={file.name}
                  className="space-y-2"
                >

                  <img
                    src={getImageUrl(
                      "portfolio-images",
                      file.name
                    )}
                    onClick={() =>
                      setSelectedImage({
                        bucket: "portfolio-images",
                        file: file.name,
                     })
                    }
                    alt=""
                    className="
                      aspect-square
                      object-cover
                      border
                      border-black/5
                      cursor-pointer
                      hover:scale-105
                      transition
                      duration-300
                    "
                  />

                  <div
                    className="
                      text-xs
                      opacity-50
                      truncate
                    "
                  >

                    {file.name}

                  </div>

                </div>

              ))}

          </div>

        </div>

      </div>

      {selectedImage && (

        <div
            className="
                fixed
                inset-0
                bg-black/80
                z-[9999]
                flex
                items-center
                justify-center
                p-10
                "
        >

            <button
                onClick={() =>
                    setSelectedImage(null)
                }
                className="
                    absolute
                    top-8
                    right-8
                    text-white
                    text-3xl
                    "
            >

                ✕

            </button>

            <img
                src={getImageUrl(
                    selectedImage.bucket,
                    selectedImage.file
                )}
                alt=""
                className="
                    max-h-[90vh]
                    max-w-[90vw]
                    object-contain
                "
            />

            <div
                className="
                    absolute
                    bottom-8
                    left-1/2
                    -translate-x-1/2
                    flex
                    gap-4
                    "
                >

            <button
                onClick={() =>
                    copyUrl(
                        selectedImage.bucket,
                        selectedImage.file
                    )
                }
                className="
                    bg-white
                    px-6
                    py-3
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    hover:bg-black
                    hover:text-white
                    transition
                    "
                >

                Copy URL

            </button>

            <button
                onClick={() =>
                    deleteImage(
                        selectedImage.bucket,
                        selectedImage.file
                    )
                }
                className="
                    bg-red-500
                    text-white
                    px-6
                    py-3
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    hover:bg-red-600
                    transition
                    "
                >

                Delete

            </button>

          </div>

        </div>

      )}

    </div>

  );

}