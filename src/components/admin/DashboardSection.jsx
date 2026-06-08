export default function DashboardSection({
articlesCount,
portfolioCount,
binCount = 0,
setSection,
currentUser,
}) {

const totalContent =
articlesCount +
portfolioCount;

return (

<div>

  <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

    Overview

  </p>

  <h2 className="text-6xl font-light mb-4">

    Welcome back.
  </h2>

  <p className="opacity-50 mb-16 max-w-xl">

    Manage your articles, portfolio projects and administrative content from a single workspace.

  </p>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

    <div className="bg-white border border-black/5 p-8 hover:-translate-y-1 hover:shadow-xl transition duration-500">

      <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-6">

        Articles

      </p>

      <h3 className="text-6xl font-light">

        {articlesCount}

      </h3>

    </div>

    <div className="bg-white border border-black/5 p-8 hover:-translate-y-1 hover:shadow-xl transition duration-500">

      <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-6">

        Portfolio

      </p>

      <h3 className="text-6xl font-light">

        {portfolioCount}

      </h3>

    </div>

    <div className="bg-white border border-black/5 p-8 hover:-translate-y-1 hover:shadow-xl transition duration-500">

      <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-6">

        Bin

      </p>

      <h3 className="text-6xl font-light">

        {binCount}

      </h3>

    </div>

    <div className="bg-white border border-black/5 p-8 hover:-translate-y-1 hover:shadow-xl transition duration-500">

      <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-6">

        Total Content

      </p>

      <h3 className="text-6xl font-light">

        {totalContent}

      </h3>

    </div>

  </div>

  <div className="bg-white border border-black/5 p-12">

    <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-6">
      Quick Actions
    </p>

    <h3 className="text-3xl font-light mb-10">
      What would you like to do?
    </h3>

    <div className="grid md:grid-cols-2 gap-4">

      {currentUser?.permissions?.editArticles && (

        <button
          onClick={() =>
            setSection("journal")
          }
          className="border border-black/10 p-6 text-left hover:bg-black hover:text-white transition duration-500"
          >
            New Article
        </button>

      )}

      {currentUser?.permissions?.editPortfolio && (


        <button
          onClick={() =>
            setSection("portfolio") 
          }
          className="border border-black/10 p-6 text-left hover:bg-black hover:text-white transition duration-500"
          >
            New Portfolio Project
        </button>
      )}

      {currentUser?.role ==="owner" && (

        <button
          onClick={() =>
            setSection("settings")
          }
          className="border border-black/10 p-6 text-left hover:bg-black hover:text-white transition duration-500"
          >
            Manage Users
        </button>
      )}

      {(currentUser?.permissions?.deleteArticles ||
        currentUser?.permissions?.deletePortfolio ||
        currentUser?.role === "owner") && (
      
        <button
          onClick={() =>
            setSection("bin")
          }
          className="border border-black/10 p-6 text-left hover:bg-black hover:text-white transition duration-500"
        >
          Open Bin
        </button>
        )}

    </div>

  </div>

</div>

);

}