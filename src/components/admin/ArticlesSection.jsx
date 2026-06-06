import {
  useState,
  useEffect,
} from "react";

import {
  Pencil,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";

import { supabase }
from "../../lib/supabase";

export default function ArticlesSection({
  currentUser,
  binItems,
  setBinItems,
}) {

  // ARTICLES
  const [articles, setArticles] = useState([]);

  useEffect(() => {

  const fetchArticles =
    async () => {

      const {
        data,
        error,
      } = await supabase

        .from("articles")

        .select("*")

        .eq("deleted", false)

        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        console.log(error);

        return;

      }

      setArticles(

        data.map(
          (article) => ({

            id:
              article.id,

            slug:
              article.slug,

            title:
              article.title,

            category:
              article.category,

            excerpt:
              article.excerpt,

            coverImage:
              article.cover_image,

            blocks:
              article.blocks,

          })
        )

      );

    };

  fetchArticles();

}, []);

  // CREATE
  const [articleTitle,
    setArticleTitle] =
    useState("");

  const [articleCategory,
    setArticleCategory] =
    useState("");

  const [articleDescription,
    setArticleDescription] =
    useState("");

  const [articlePreview,
    setArticlePreview] =
    useState("");

  // BLOCKS
  const [blocks,
    setBlocks] =
    useState([]);

  // SEARCH
  const [search,
    setSearch] =
    useState("");

  const [sortBy,
    setSortBy] =
    useState("latest");

    // FILTER
  const filteredArticles =

    [...articles]

      .filter((article) =>

        article.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        article.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        article.excerpt
          ?.toLowerCase()
          .includes(search.toLocaleLowerCase())

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

      });

  // CREATE ARTICLE
  const [editingId,
    setEditingId] =
    useState(null);
  
  const publishArticle =
  async () => {
    
      if (
        !articleTitle ||
        !articleCategory ||
        !articlePreview
      ) {

        alert(
          "Fill all fields"
        );

        return;

      }

      const slug =

        articleTitle
          .toLowerCase()
          .Trim()
          .replaceAll(/[^\w\s-]/g,"")
          .replace(/\s+/g,"");

      

      let imageUrl =
         articlePreview;

// Upload solo se è una nuova immagine
if (
  articlePreview.startsWith(
    "data:image"
  )
) {

  const imageName =
    `${Date.now()}-${articleTitle}`;

  const imageBlob =
    await fetch(
      articlePreview
    ).then(
      (res) => res.blob()
    );

  const {
    error: imageError,
  } = await supabase

    .storage

    .from("journal")

    .upload(
      imageName,
      imageBlob
    );

  if (imageError) {

    console.log(
      imageError
    );

    return;

  }

  const {
    data: publicUrlData,
  } = supabase

    .storage

    .from("journal")

    .getPublicUrl(
      imageName
    );

  imageUrl =
    publicUrlData.publicUrl;

}

      const newArticle = {
        
        id:
        editingId ||
        Date.now(),

        slug,

        title:
          articleTitle,

        category:
          articleCategory,

        excerpt:
          articleDescription,

        coverImage:
          imageUrl,

        blocks,

        createdAt:
         Date.now(),

      };

      //INSERT DATABASE
      let error;

      // EDIT MODE
        if (editingId) {

        const response =
          await supabase

        .from("articles")

        .update({

        title:
          newArticle.title,

        slug:
          newArticle.slug,

        category:
          newArticle.category,

        excerpt:
          newArticle.excerpt,

        cover_image:
          newArticle.coverImage,

        blocks:
          newArticle.blocks,

        })

        .eq("id", editingId);
    
       error =
         response.error;

        } else {

         // CREATE MODE
          const response =
           await supabase

           .from("articles")

           .insert([
          {

          title:
            newArticle.title,

          slug:
            newArticle.slug,

          category:
            newArticle.category,

          excerpt:
            newArticle.excerpt,

          cover_image:
            newArticle.coverImage,

          blocks:
            newArticle.blocks,

          },
        ]);

         error =
        response.error;

        }  

      if (error) {

        console.log(error);
    
        return;
      }

      const {
        data: refreshedArticles,
      } = await supabase
        .from("articles")
        .select("*")
        .eq("deleted", false)
        .order("created_at", {ascending: false,});

      setArticles(
        refreshedArticles.map(
          (article) => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            category: article.category,
            excerpt: article.excerpt,
            coverImage: article.cover_image,
            blocks: article.blocks,

          })
        )

      );
setTimeout(() => {

  console.log(
    "ARTICLES AFTER UPDATE"
  );

  console.log(
    articles
  );

}, 1000);

      console.log(
  "REFRESHED",
  refreshedArticles
);

console.log(
  "ARTICLES STATE UPDATE"
);
 
      // RESET
      setArticleTitle("");
      setArticleCategory("");
      setArticleDescription("");
      setArticlePreview("");
      setBlocks([]);
      setEditingId(null);

    };

  return (

    <div className="max-w-[1600px] mx-auto">

      {/* HEADER */}
      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          Editorial Management

        </p>

        <h2 className="text-6xl font-light mb-6">

          Journal

        </h2>

        <p className="opacity-50 text-lg max-w-2xl leading-relaxed">

          Curate cinematic stories,
          motherhood sessions and
          editorial narratives.

        </p>

      </div>

      <div className="grid lg:grid-cols-12 gap-20 w-full items-start">

        {/* LEFT */}
        <div className="lg:col-span-4 max-w-[500px] bg-white border border-black/10 p-10">

          <div className="space-y-5">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Article Title"
              value={articleTitle}
              onChange={(e) =>
                setArticleTitle(
                  e.target.value
                )
              }
              className="w-full border-b border-black bg-transparent py-4 outline-none"
            />

            {/* CATEGORY */}
            <input
              type="text"
              placeholder="Category"
              value={articleCategory}
              onChange={(e) =>
                setArticleCategory(
                  e.target.value
                )
              }
              className="w-full border-b border-black bg-transparent py-4 outline-none"
            />

            {/* COVER IMAGE */}
            <label className="border border-dashed border-black/20 hover:border-black/40 transition duration-500 min-h-[160px] flex flex-col items-center justify-center text-center cursor-pointer p-10">

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {

                  const file =
                    e.target.files[0];

                  if (file) {

                    const reader =
                      new FileReader();

                    reader.onloadend =
                      () => {

                        setArticlePreview(
                          reader.result
                        );

                      };

                    reader.readAsDataURL(
                      file
                    );

                  }

                }}
              />

              {articlePreview ? (

                <img
                  src={
                    articlePreview
                  }
                  alt=""
                  className="w-full h-[180px] object-cover"
                />

              ) : (

                <>

                  <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                    Upload Cover Image

                  </p>

                  <p className="opacity-50 text-sm">

                    cinematic cover

                  </p>

                </>

              )}

            </label>

            {/* EXCERPT */}
            <textarea
              rows="4"
              placeholder="Short cinematic excerpt..."
              value={
                articleDescription
              }
              onChange={(e) =>
                setArticleDescription(
                  e.target.value
                )
              }
              className="w-full border-b border-black bg-transparent py-4 outline-none resize-none"
            />

            {/* BLOCK BUILDER */}
            <div className="space-y-4 pt-6">

              <p className="uppercase tracking-[0.3em] text-xs opacity-40">

                Story Blocks

              </p>

              {/* ADD TEXT */}
              <button
                type="button"
                onClick={() => {

                  setBlocks([

                    ...blocks,

                    {
                      type: "text",
                      content: "",
                    },

                  ]);

                }}
                className="border border-black/10 px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white transition duration-500"
              >

                Add Text Block

              </button>

              {/* ADD QUOTE */}
              <button
                type="button"
                onClick={() => {

                  setBlocks([

                    ...blocks,

                    {
                      type: "quote",
                      content: "",
                    },

                  ]);

                }}
                className="border border-black/10 px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white transition duration-500 ml-3"
              >

                Add Quote

              </button>

              {/* ADD IMAGE */}

              <button
               type="button"
               onClick={() => {

                setBlocks([

                  ...blocks,

                  {
                    type: "image",
                    image: "",
                  },

                ]);

              }}
              className="border border-black/10 px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white transition duration-500 ml-3"
              >

                Add Image 

              </button>

            </div>

            {/* BLOCKS RENDER */}
            <div className="space-y-6 pt-8">

              {blocks.map(
                (block, index) => (

                  <div
                    key={index}
                    className="border border-black/10 p-5"
                  >

                    <p className="uppercase tracking-[0.25em] text-[10px] opacity-40 mb-4">

                      {block.type} block

                    </p>

                    {block.type === "image" ? (

                      <label className="border border-dashed border-black/20 hover:border-black/40 transition duration-500 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer p-6">

                        <input
                         type="file"
                         accept="image/*"
                         className="hidden"
                         onChange={(e) => {

                          const file =
                          e.target.files[0]

                          if (file) {

                            const reader =
                            new FileReader();

                            reader.onloadend =
                            () => {

                              const updatedBlocks =
                              [...blocks];

                              updatedBlocks[index]
                              .image =
                              reader.result;

                              setBlocks(
                                updatedBlocks
                              );

                            };

                            reader.readAsDataURL(
                              file
                            );

                          }

                         }}
                         />
                      
                      {block.image ? (

                        <img
                        src={block.image}
                        alt=""
                        className="w-full h-[220px] object-cover"
                        />
                       
                      ) : (
                        <>
                        
                         <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">
                        
                           Upload Story Image 

                         </p>

                         <p className="opacity-50 text-sm">

                            cinematic editorial frame 

                         </p>
                        
                        </>

                      )}

                      </label>

                    ) : (

                      <textarea
                      rows="5"
                      value={block.content}
                      onChange={(e) => {

                        const updatedBlocks =
                        [...blocks];

                        updatedBlocks[index]
                        .content =
                        e.target.value;

                        setBlocks(
                          updatedBlocks
                        );

                      }}
                      className="w-full bg-transparent outline-none resize-none leading-relaxed"
                      placeholder="Write cinematic content..."
                      />

                    )}

                  </div>

                )

              )}

            </div>
            
            {/* BUTTON */}
            <button
              onClick={publishArticle}
              className="border border-black px-8 py-4 uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition duration-500"
            >

              {editingId
                ? "Update Article"
                : "Publish Article"}

            </button>

            {editingId && (

              <button
                onClick={() => {

                  setEditingId(null);

                  setArticleTitle("");
                  setArticleCategory("");
                  setArticleDescription("");
                  setArticlePreview("");
                  setBlocks([]);

                }}
              className="
                border
                border-red-300
                text-red-500
                px-8
                py-4
                uppercase
                tracking-[0.3em]
                text-xs
                hover:bg-red-500
                hover:text-white
                transition
                duration-500
                ml-4
               "
              >

              Cancel Editing

            </button>

          )}

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
                placeholder="Search articles..."
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
                className="w-14 h-14 border border-[#c6a66a]/30 flex items-center justify-center hover:bg-black hover:text-white transition duration-500"
              >

                <SlidersHorizontal
                  size={18}
                />

              </button>

            </div>

          </div>

          {/* ARTICLES */}
          <div className="flex gap-8 overflow-x-auto pb-6">

            {filteredArticles.map(
              (article) => (

                <div
                  key={article.id}
                  className="bg-white min-w-[420px] overflow-hidden border border-black/5"
                >

                  {/* IMAGE */}
                  <img
                    src={
                      article.coverImage ||
                      article.image
                    }
                    alt={
                      article.title
                    }
                    className="w-full h-[240px] object-cover"
                  />

                  <div className="p-8">

                    <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                      {article.category}

                    </p>

                    <h3 className="text-3xl font-light mb-6">

                      {article.title}

                    </h3>

                    <p className="opacity-60 leading-relaxed mb-8 line-clamp-4">

                      {article.excerpt}

                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-3">

                      {/* EDIT */}
                      {currentUser?.permissions
                        ?.editArticles && (

                        <button
                        

                         onClick={() => {
                          
                           setEditingId(
                           article.id
                          );
                                                          
                           setArticleTitle(
                           article.title
                         );
                        
                           setArticleCategory(
                           article.category
                          );

                           setArticleDescription(
                            article.excerpt
                         );

                           setArticlePreview(
                           article.coverImage
                         );

                           setBlocks(
                            article.blocks || []
                          );

                          }}

                           className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition duration-500"
                          >

                          <Pencil
                           size={15}
                         />

                      </button>

                      )}

                      {/* DELETE */}
                      {currentUser?.permissions
                        ?.deleteArticles && (

                        <button
                         onClick={async () => {

                         const { error } =
                          await supabase

                              .from("articles")

                              .update({
                              deleted: true,
                              deleted_at:
                                new Date()
                                  .toISOString(),
                            })

                            .eq(
                              "id",
                              article.id
                            );

                        if (error) {

                          console.log(error);

                          return;
                      }

                        setArticles(
                          articles.filter(
                            (a) =>
                              a.id !== article.id
                          )
                        );

                        setBinItems((prev) => [
                          {
                            id: article.id,
                            title: article.title,
                            type: "article",
                            coverImage: article.coverImage,
                            description: article.excerpt,
                            deletedAt: new Date() .toISOString(),
                          },

                          ...prev,

                        ]);

                      }}
                            
                          className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition duration-500"
                        >

                          <Trash2
                            size={15}
                          />

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