import { supabase } from "../../lib/supabase";

export default function AdminSidebar({
  section,
  setSection,
  currentUser,
  setLogged,
  setCurrentUser,
}) {

  const logout = async () => {

    await supabase.auth.signOut();

    setLogged(false);

    setCurrentUser(null);

  };

  return (

    <aside className="flex w-full flex-col border-b border-black/5 bg-white/80 p-5 backdrop-blur-xl lg:min-h-screen lg:w-[280px] lg:border-b-0 lg:border-r lg:p-10">

      <div className="mb-5 lg:mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-4">

          Golden Light Studio

        </p>

        <h1 className="text-2xl font-light leading-tight lg:text-3xl">

          Admin
          <br />
          Panel

        </h1>

      </div>

      <nav className="flex gap-5 overflow-x-auto pb-2 lg:block lg:space-y-6 lg:pb-0">

        <button
          onClick={() =>
            setSection("dashboard")
          }
          className={`shrink-0 text-left text-sm transition-all duration-300 lg:block lg:text-lg ${
            section === "dashboard"
              ? "opacity-100 lg:translate-x-2"
              : "opacity-40 hover:opacity-80"
          }`}
        >

          Dashboard

        </button>

        {currentUser?.permissions?.editArticles &&(
        <button
          onClick={() =>
            setSection("journal")
          }
          className={`shrink-0 text-left text-sm transition-all duration-300 lg:block lg:text-lg ${
            section === "journal"
              ? "opacity-100 lg:translate-x-2"
              : "opacity-40 hover:opacity-80"
          }`}
        >

          Articles

        </button>
        )}

        {currentUser?.permissions?.editPortfolio && (
        <button
          onClick={() =>
            setSection("portfolio")
          }
          className={`shrink-0 text-left text-sm transition-all duration-300 lg:block lg:text-lg ${
            section === "portfolio"
              ? "opacity-100 lg:translate-x-2"
              : "opacity-40 hover:opacity-80"
          }`}
        >

          Portfolio

        </button>
        )}

        {currentUser?.role === "owner" && (
        <button
            onClick={() =>
              setSection("media")
            }
            className={`shrink-0 text-left text-sm transition-all duration-300 lg:block lg:text-lg ${
              section === "media"
                ? "opacity-100 lg:translate-x-2"
                : "opacity-40 hover:opacity-80"
              }`}
          >

              Media Library

          </button>
          
        )}

        <button
          onClick={() => {

            if (

              currentUser?.permissions?.deleteArticles ||

              currentUser?.permissions?.deletePortfolio ||

              currentUser?.role === "owner"

            ) {

              setSection("bin");

            }

          }}
          className={`shrink-0 text-left text-sm transition-all duration-300 lg:block lg:text-lg ${
            section === "bin"
              ? "opacity-100 lg:translate-x-2"
              : currentUser?.permissions?.deleteArticles ||
                currentUser?.permissions?.deletePortfolio ||
                currentUser?.role === "owner"
              ? "opacity-40 hover:opacity-80"
              : "opacity-20 cursor-not-allowed"
          }`}
        >

          Bin

        </button>

        {currentUser?.role === "owner" && (

          <button
            onClick={() =>
              setSection("settings")
            }
            className={`shrink-0 text-left text-sm transition-all duration-300 lg:block lg:text-lg ${
              section === "settings"
                ? "opacity-100 lg:translate-x-2"
                : "opacity-40 hover:opacity-80"
            }`}
          >

            Settings

          </button>

        )}

      </nav>

      <div className="hidden lg:mb-6 lg:mt-auto lg:block">

        <p className="text-sm opacity-40 mb-2">

          Logged as

        </p>

        <p className="text-lg font-light">

          {currentUser?.name}

        </p>

      </div>

      <button
        onClick={logout}
        className="mt-3 border border-black px-5 py-3 text-[10px] uppercase tracking-[0.24em] transition duration-500 hover:bg-black hover:text-white lg:mt-0 lg:px-6 lg:py-4 lg:text-xs lg:tracking-[0.3em]"
      >

        Logout

      </button>

    </aside>

  );

}
