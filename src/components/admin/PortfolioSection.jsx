import {
  useState,
  useEffect,
} from "react";

import {
  Pencil,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

export default function PortfolioSection({
  currentUser,
  binItems,
  setBinItems,
}) {

  // PORTFOLIO
  const [portfolioItems,
    setPortfolioItems] =
    useState([])

  // CREATE
  const [portfolioTitle,
    setPortfolioTitle] =
    useState("");

  const [portfolioLocation,
    setPortfolioLocation] =
    useState("");

  const [portfolioCategory,
  setPortfolioCategory] =
  useState("Portrait Sessions");

  const [portfolioDescription,
    setPortfolioDescription] =
    useState("");

  // COVER
  const [coverPreview,
    setCoverPreview] =
    useState("");

  // GALLERY
  const [galleryImages,
    setGalleryImages] =
    useState([]);

  const [uploading,
  setUploading] =
  useState(false);

  const [uploadProgress,
  setUploadProgress] =
  useState(0);

  // EDIT
  const [editingPortfolioId,
    setEditingPortfolioId] =
    useState(null);

  
  // SEARCH
  const [search,
    setSearch] =
    useState("");

  const [sortBy,
    setSortBy] =
    useState("latest");

  // SAVE
  useEffect(() => {

    const fetchPortfolio =
    async () => {

      const {
        data,
        error,
      } = await supabase

      .from("portfolio")
      .select("*")
      .eq("deleted", false)
      .order("created_at", {ascending:false,});
      
      if (error) {

        return;

      }

      setPortfolioItems(

        data.map((item) => ({

          ...item,

          coverImage:
           item.cover_image,

           images:
            item.gallery || [],
        }))

     );

    };

    fetchPortfolio();

  }, []);

  // FILTER
  const filteredPortfolio =

    Array.isArray(
      portfolioItems
    )

      ? [...portfolioItems]

          .filter(
            (item) => item
          )

          .filter((item) =>

            item.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.location
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          )

          .sort((a, b) => {

            if (
              sortBy === "latest"
            ) {

              return b.id - a.id;

            }

            if (
              sortBy === "oldest"
            ) {

              return a.id - b.id;

            }

            return 0;

          })

      : [];

  // UPLOAD IMAGE
  const uploadImage =
    async (file) => {

      const fileName =

        `${Date.now()}-${file.name}`;

      const { error } =

        await supabase.storage

          .from(
            "portfolio-images"
          )

          .upload(
            fileName,
            file
          );

      if (error) {

        console.error(error);

        return null;

      }

      const {
        data: publicUrlData,
      } = supabase.storage

        .from(
          "portfolio-images"
        )

        .getPublicUrl(
          fileName
        );

      return publicUrlData
        .publicUrl;

    };

  // CREATE
  const publishPortfolio =
    async () => {

      if (
        !portfolioTitle ||
        !portfolioLocation ||
        !portfolioDescription ||
        !coverPreview
      ) {

        alert(
          "Fill all fields"
        );

        return;

      }

      const slug =

        portfolioTitle
          .toLowerCase()
          .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
      
      if (editingPortfolioId) {

        const { error } =
         await supabase

         .from("portfolio")
         .update({

          title:portfolioTitle,
          slug,
          category: portfolioCategory,
          location: portfolioLocation,
          description: portfolioDescription,
          cover_image: coverPreview,
          gallery: galleryImages,

         })

         .eq("id", editingPortfolioId);

         if (error) {
       
          return;

        }

        alert("Portfolio updated");

        return;
        
      }

      const{
        data,
        error,
      } = await supabase

      .from("portfolio")
      .insert([
        {
          title:
          portfolioTitle,

          slug,

          category:
          portfolioCategory,

          location:
          portfolioLocation,

          description:
          portfolioDescription,

          cover_image:
          coverPreview,

          gallery:
            galleryImages,

            deleted:
            false,
            
        },
      ])

      .select();

      if(error) {
     
        return;
      }
     
      setPortfolioItems([

        data[0],

        ...(portfolioItems || []),
    
      ]);

      // RESET
      setPortfolioTitle("");
      setPortfolioLocation("");
      setPortfolioDescription("");
      setCoverPreview("");
      setGalleryImages([]);

    };

  return (

    <div className="max-w-[1600px] mx-auto">

      {/* HEADER */}
      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          Creative Management

        </p>

        <h2 className="text-6xl font-light mb-6">

          Portfolio

        </h2>

        <p className="opacity-50 text-lg max-w-2xl leading-relaxed">

          Manage cinematic
          sessions and visual
          storytelling archives.

        </p>

      </div>

      <div className="grid lg:grid-cols-12 gap-20 w-full items-start">

        {/* LEFT */}
        <div className="lg:col-span-4 max-w-[500px] bg-white border border-black/10 p-10 rounded-sm">

          <div className="space-y-5">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Session Title"
              value={portfolioTitle}
              onChange={(e) =>
                setPortfolioTitle(
                  e.target.value
                )
              }
              className="w-full border-b border-black bg-transparent py-4 outline-none"
            />

            {/* LOCATION */}
            <input
              type="text"
              placeholder="Location"
              value={
                portfolioLocation
              }
              onChange={(e) =>
                setPortfolioLocation(
                  e.target.value
                )
              }
              className="w-full border-b border-black bg-transparent py-4 outline-none"
            />

            <select
             value={portfolioCategory}
             onChange={(e) =>
              setPortfolioCategory(
              e.target.value
              )
             }
             className="w-full border-b border-black bg-transparent py-4 outline-none"
             >

              <option>
                Portrait Sessions
              </option>

              <option>
                Weddings
              </option>

              <option>
                Events
              </option>
                   
             </select>

          
            {/* COVER */}
            <label

              onDragOver={(e) =>
                e.preventDefault()
              }

              onDrop={async (e) => {

                e.preventDefault();

                const file =
                  e.dataTransfer.files[0];

                if (file) {

                  const uploadedUrl =
                    await uploadImage(
                      file
                    );

                  if (uploadedUrl) {

                    setCoverPreview(
                      uploadedUrl
                    );

                  }

                }

              }}

              className="border border-dashed border-black/20 hover:border-black/40 transition duration-500 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer p-10 rounded-sm"
            >

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {

                  const file =
                    e.target.files[0];

                  if (file) {

                    const uploadedUrl =
                      await uploadImage(
                        file
                      );

                    if (uploadedUrl) {

                      setCoverPreview(
                        uploadedUrl
                      );

                    }

                  }

                }}
              />

              {coverPreview ? (

                <img
                  src={coverPreview}
                  alt=""
                  className="w-full h-[180px] object-cover rounded-sm"
                />

              ) : (

                <>

                  <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                    Upload Cover Image

                  </p>

                  <p className="opacity-50 text-sm">

                    click or drag image

                  </p>

                </>

              )}

            </label>

            {/* GALLERY */}
            <label

              onDragOver={(e) =>
                e.preventDefault()
              }

              onDrop={async (e) => {

                e.preventDefault();

                const files =
                  Array.from(
                    e.dataTransfer.files
                  );

                setUploading(true);

                setUploadProgress(0);

                const uploaded= [];

                for (
                  let i = 0;
                  i < files.length;
                  i++
                ) {

                  const uploadedUrl =
                  await uploadImage(
                    files[i]
                  );

                  if (uploadedUrl) {

                    uploaded.push(
                      uploadedUrl
                    );

                  }

                  setUploadProgress(

                    Math.round(
                      ((i+1) /
                    files.length) *
                      100
                    )

                  );

                }

                setGalleryImages(
                  uploaded
                );

                setUploading(false);

              }}

              className="border border-dashed border-black/20 hover:border-black/40 transition duration-500 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer p-10 rounded-sm"
            >

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {

                  const files =
                    Array.from(
                      e.target.files
                    );

                  setUploading(true);

                  setUploadProgress(0);

                  const uploaded = [];

                  for(
                    let i = 0;
                    i < files.length;
                    i++
                  ) {

                    const uploadedUrl =
                    await uploadImage(
                      files[i]
                    );

                    if(uploadedUrl) {

                      uploaded.push(
                        uploadedUrl
                      );

                    }

                    setUploadProgress(

                      Math.round(
                        ((i+1) /
                      files.length) *
                    100
                    )

                  );
                    
                  }

                  setGalleryImages(
                    uploaded
                  );

                  setUploading(false);

                }}
              />

              <div className="w-full">

                <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                  Upload Gallery Images

                </p>

                <p className="opacity-50 text-sm mb-8">

                  click or drag multiple images

                </p>

                {/* PROGRESS */}
                <div className="mb-8">

                  <div className="flex justify-between text-xs uppercase tracking-[0.3em] opacity-50 mb-3">

                    <span>
                      Upload Progress
                    </span>

                    <span>
                      {uploadProgress}%
                    </span>

                  </div>

                  <div className="w-full h-[2px] bg-black/10 overflow-hidden">
                  
                  <div
                  className="h-full bg-[#c6a66a] transition-all duration-500"
                  style={{
                    width:
                    `${uploadProgress}%`,
                    opacity:
                    uploading
                     ? 1
                     : 0,
                  }}

                  />

                  </div>

                </div>

                {/* PREVIEW */}
                {galleryImages.length > 0 && (

                  <div className="grid grid-cols-3 gap-3">

                    {galleryImages
                     .slice(0, 9)
                     .map((img, index) => (

                      <img
                      key={index}
                      src={img}
                      alt=""
                      className="w-full h-24 object-cover rounded-sm"
                      />

                     ))}

                  </div>

                )}

              </div>
            

            </label>

            {/* DESCRIPTION */}
            <textarea
              rows="4"
              placeholder="Session Description"
              value={
                portfolioDescription
              }
              onChange={(e) =>
                setPortfolioDescription(
                  e.target.value
                )
              }
              className="w-full border-b border-black bg-transparent py-4 outline-none resize-none"
            />

            {/* BUTTON */}
            <button
              
              disabled={uploading}

              onClick={
                publishPortfolio
              }
              className="border border-black px-8 py-4 uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition duration-500"
            >

              {
                editingPortfolioId
                ? "Update Session"
                : "Publish Session"
              }

            </button>
            
          </div>

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 w-full">

          {/* SEARCH */}
          <div className="mb-10">

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c6a66a] to-transparent opacity-70 mb-10" />

            <div className="flex items-center justify-between gap-6">

              <input
                type="text"
                placeholder="Search portfolio..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="flex-1 border-b border-[#c6a66a] bg-transparent py-4 outline-none"
              />

              <button
                onClick={() => {

                  if (
                    sortBy === "latest"
                  ) {

                    setSortBy(
                      "oldest"
                    );

                  } else {

                    setSortBy(
                      "latest"
                    );

                  }

                }}
                className="w-14 h-14 border border-[#c6a66a]/30 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 rounded-sm"
              >

                <SlidersHorizontal
                  size={18}
                />

              </button>

            </div>

          </div>

          {/* PORTFOLIO */}
          <div className="flex gap-8 overflow-x-auto pb-6">

            {filteredPortfolio.map(
              (item) => (

                <div
                  key={item.id}
                  className="bg-white min-w-[420px] overflow-hidden border border-black/5 rounded-sm"
                >

                  {/* COVER */}
                  <img
                    src={
                      item.coverImage ||
                      item.image
                    }
                    alt={item.title}
                    className="w-full h-[240px] object-cover"
                  />

                  <div className="p-8">

                    <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                      {item.location}

                    </p>

                    <h3 className="text-3xl font-light mb-6">

                      {item.title}

                    </h3>

                    <p className="opacity-60 leading-relaxed mb-8">

                      {item.description}

                    </p>

                    {/* GALLERY PREVIEW */}
                    {(
                      item.images?.length > 0 ||
                      item.coverImage ||
                      item.image
                    ) && (

                      <div className="grid grid-cols-4 gap-2 mt-8">

                        {(
                          item.images?.length > 0

                            ? item.images

                            : [
                                item.coverImage ||
                                item.image
                              ]

                        )
                          .slice(0, 4)
                          .map((img, index) => (

                            <img
                              key={index}
                              src={img}
                              alt=""
                              className="w-full h-20 object-cover rounded-sm"
                            />

                          ))}

                      </div>

                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-8">

                      {/* EDIT */}
                      {currentUser?.permissions
                        ?.editPortfolio && (

                        <button
                        onClick={() => {

                          setEditingPortfolioId(
                            item.id
                          );

                          setPortfolioTitle(
                            item.title
                          );

                          setPortfolioLocation(
                            item.location
                          );

                          setPortfolioDescription(
                            item.description
                          );

                          setPortfolioCategory(
                            item.category
                          );

                          setCoverPreview(
                            item.coverImage
                          );

                          setGalleryImages(
                            item.images || []
                          );

                        }}

                          className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition duration-500"
                        >

                          <Pencil size={15} />

                        </button>

                      )}

                      {/* DELETE */}
                      {currentUser?.permissions
                        ?.deletePortfolio && (

                        <button
                          onClick={async () => {

                            const { error } =

                            await supabase

                            .from("portfolio")
                            .update({deleted: true,
                              deleted_at:new Date().toISOString(),
                            })
                            .eq("id", item.id);

                            if (error) {
                           
                              return;
                            }

                            setPortfolioItems(

                              portfolioItems.filter(
                                (p) =>
                                  p.id !==
                                item.id
                              )
                            
                            );

                            setBinItems((prev) => [
                              {
                                id: item.id,
                                title:item.title,
                                type: "portfolio",
                                coverImage: item.coverImage,
                                description: item.description,
                                deletedAt: new Date().toISOString(),
                              },

                              ...prev,
                            ]);

                          }}
                          className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition duration-500"
                        >

                          <Trash2 size={15} />

                        </button>

                      )}

                    </div>

                  </div>

                </div>

              )

            )}

          </div>

        </div>

      </div>

    </div>

  );

}