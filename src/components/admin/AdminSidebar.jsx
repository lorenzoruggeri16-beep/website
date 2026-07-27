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

    <aside className="w-[280px] border-r border-black/5 p-10 flex flex-col bg-white/80 backdrop-blur-xl">

      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-4">

          Golden Light Studio

        </p>

        <h1 className="text-3xl font-light leading-tight">

          Admin
          <br />
          Panel

        </h1>

      </div>

      <nav className="space-y-6">

        <button
          onClick={() =>
            setSection("dashboard")
          }
          className={`block text-left text-lg transition-all duration-300 ${
            section === "dashboard"
              ? "opacity-100 translate-x-2"
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
          className={`block text-left text-lg transition-all duration-300 ${
            section === "journal"
              ? "opacity-100 translate-x-2"
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
          className={`block text-left text-lg transition-all duration-300 ${
            section === "portfolio"
              ? "opacity-100 translate-x-2"
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
            className={`block text-left text-lg transition-all duration-300 ${
              section === "media"
                ? "opacity-100 translate-x-2"
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
          className={`block text-left text-lg transition-all duration-300 ${
            section === "bin"
              ? "opacity-100 translate-x-2"
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
            className={`block text-left text-lg transition-all duration-300 ${
              section === "settings"
                ? "opacity-100 translate-x-2"
                : "opacity-40 hover:opacity-80"
            }`}
          >

            Settings

          </button>

        )}

      </nav>

      <div className="mt-auto mb-6">

        <p className="text-sm opacity-40 mb-2">

          Logged as

        </p>

        <p className="text-lg font-light">

          {currentUser?.name}

        </p>

      </div>

      <button
        onClick={logout}
        className="border border-black px-6 py-4 uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition duration-500"
      >

        Logout

      </button>

    </aside>

  );

}
