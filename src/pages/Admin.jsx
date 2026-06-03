import {
  useState,
  useEffect,
} from "react";

import WelcomeScreen from "../components/admin/WelcomeScreen";

import DashboardSection from "../components/admin/DashboardSection";
import ArticlesSection from "../components/admin/ArticlesSection";
import PortfolioSection from "../components/admin/PortfolioSection";
import SettingsSection from "../components/admin/SettingsSection";
import BinSection from "../components/admin/BinSection";
import { supabase } from "../lib/supabase";
import journalData from "../data/journalData";
import { galleryData } from "../data/galleryData";

export default function Admin() {
  
  // LOGIN
  const [logged, setLogged] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");
  
  const [showForgotPassword, setShowForgotPassword] =
  useState(false);

  const [showForgotUsername, setShowForgotUsername] =
  useState(false);

  const [resetUsername, setResetUsername] =
  useState("");

  const [resetEmail, setResetEmail] =
  useState("");

  const [usernameEmail, setUsernameEmail] =
  useState("");

  const resetPassword = async () => {

  const { data: user } =
    await supabase

      .from("login_users")
      .select("*")
      .eq("username", resetUsername)
      .eq("email", resetEmail);

    if (!user?.length) {

      alert(
        "Username and email do not match"
      );

    return;

    }

    const { error } =
      await supabase.auth
        .resetPasswordForEmail(
          resetEmail,
          {
            redirectTo:
              window.location.origin +
              "/reset-password",
          }
        );

    if (error) {

      alert(error.message);
      return;

    }

    alert(
      "Password reset email sent"
    );

    setShowForgotPassword(false);

};

const recoverUsername = async () => {

  const { data, error } =
    await supabase

      .from("login_users")

      .select("*")
      .eq("email", usernameEmail);

  if (
    error ||
    !data.length
  ) {

    alert(
      "Email not found"
    );

    return;

  }

  alert(
    `Your username is: ${data[0].username}`
  );

  setShowForgotUsername(false);

};

  // CURRENT USER
  const [currentUser,
    setCurrentUser] =
    useState(null);

  // REMEMBER LOGIN
  const [remember,
    setRemember] =
    useState(false);

  const [stayLogged,
    setStayLogged] =
    useState(false);

  // ADMIN SECTION
  const [section, setSection] =
    useState("dashboard");

  // BIN
  const [binItems,
    setBinItems] =
    useState([]);

    useEffect(() => {
      console.log("BIN STATE:", binItems);
    }, [binItems]);
      
  // WELCOME SCREEN
  const [showWelcome,
    setShowWelcome] =
    useState(false);

  // REAL COUNTS
  const [articlesCount,
  setArticlesCount] =
  useState(0);

  const [portfolioCount,
  setPortfolioCount] =
  useState(0);

    useEffect(() => {

        const fetchBinItems =
          async () => {

          // ARTICLES
            const {
              data: articles,
              error: articlesError,
            } = await supabase

              .from("articles")

              .select("*")

              .eq(
                "deleted",
                true
              );

              //PORTFOLIO
              const {
                data: portfolio,
                error: portfolioError,
              } = await supabase

               .from("portfolio")
               .select("*")
               .eq("deleted", true);

               if (
                articlesError ||
                portfolioError
               ) {

                console.log(
                  articlesError ||
                  portfolioError
                );

                return;

               }

              const formattedArticles =

               articles.map(
                (article) => ({

                  id: article.id,
                  title: article.title,
                  type: "article",
                  coverImage: article.cover_image,
                  description: article.excerpt,
                  deletedAt: article.deleted_at,

                })
               );

               const formattedPortfolio =
               
               portfolio.map(
                (item) => ({

                  id:
                   item.id,

                  title:
                   item.title,

                  type:
                   "portfolio",

                  coverImage:
                   item.cover_image,

                  description:
                   item.description,

                  deletedAt:
                   item.deleted_at,

                })

               );
               
               setBinItems([
                ...formattedArticles,
                ...formattedPortfolio,
               ].sort(
                (a, b) =>
                  new Date(b.deletedAt) -
                  new Date(a.deletedAt)
               ));

            };

        fetchBinItems();

      }, []);

      useEffect(() => {
        const fetchCounts =
        async () => {
          const{
            count: articles,
          } = await supabase
          .from("articles")
          .select("*", {count: "exact", head: true})
          .eq("deleted", false);

          const{
            count: portfolio,
          } =await supabase
          .from("portfolio")
          .select("*", {count: "exact", head: true})
          .eq("deleted", false);

          setArticlesCount(
            articles || 0
          );

          setPortfolioCount(
            portfolio || 0
          );

        };

        fetchCounts();

      }, []);
        
      
  // AUTO DELETE BIN AFTER 20 DAYS
  useEffect(() => {
    const twentyDays =
    20* 24* 60* 60* 1000;

    const now =
      Date.now()

    const expiredItems =
      binItems.filter(
        (item) => {

          if(!item.deletedAt)
            return false;

          return (
            now - 
            new Date(
              item.deletedAt
            ).getTime()
          ) > twentyDays;

        }
      );

    if (
      expiredItems.length === 0
    ) return;

    setBinItems(
      binItems.filter(
        (item) =>
          !expiredItems.includes(item)
      )
    );

  }, [binItems]);

  // AUTO LOGIN + REMEMBER EMAIL
  useEffect(() => {

    const savedUsername =
      localStorage.getItem(
        "adminUsername"
      );

    if (savedUsername) {

      setUsername(savedUsername);

      setRemember(true);

    }

    const expiration =
      localStorage.getItem(
        "adminExpiration"
      );

    const savedUser =
      localStorage.getItem(
        "adminUser"
      );

    if (
      expiration &&
      savedUser
    ) {

      const now =
        Date.now();

      if (
        now <
        Number(expiration)
      ) {

        setLogged(true);
       
        setCurrentUser(
          JSON.parse(savedUser)
        );

      } else {

        localStorage.removeItem(
          "adminExpiration"
        );

        localStorage.removeItem(
          "adminUser"
        );

      }

    }

  }, []);

  // WELCOME TIMER
  useEffect(() => {

    if(!showWelcome)
      return;

    const timer =
      setTimeout(() => {

        setShowWelcome(false);
      }, 2500);

      return () =>
        clearTimeout(timer);
      
    }, [showWelcome]);

  // LOGIN
  const login = async () => {

    const {
  data: userRecord,
  error: userError,
} = await supabase

  .from("login_users")
  .select("*")
  .eq(
    "username",
    username.trim()
  );

    if (
      userError ||
      !userRecord.length
    ) {
      
    alert("Username not found");

    return;
    }

    const {data, error,} =
      await supabase.auth
        .signInWithPassword({
          email: userRecord[0].email,
          password,
        });
      
      if (error) {
        
        alert("Incorrect email or password");

        return;

      }
    
  const { data: adminUser } =

      await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", data.user.id)
        .single();
                    
    if (!adminUser) {

      alert("User not configured");

      return;
    }

    const user ={
      name: adminUser.name,
      role: adminUser.role,
      permissions: adminUser.permissions,
      username: adminUser.username,
    };

    setLogged(true);
    setShowWelcome(true);
    setCurrentUser(user);
    localStorage.setItem("adminUser", JSON.stringify(user));

          // REMEMBER EMAIL
      if (remember) {

        localStorage.setItem(
          "adminUsername",
          username
        );

      } else {

        localStorage.removeItem(
          "adminUsername"
        );

      }

      // STAY LOGGED
      if (stayLogged) {

        const tenDays =
          10 * 24 * 60 * 60 * 1000;

        const expiration =
          Date.now() +
          tenDays;

        localStorage.setItem(
          "adminExpiration",
          expiration.toString()
        );

      }
    
  };

  // LOGIN PAGE
  if (!logged) {

    return (

      <>

      <main className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

        <div className="max-w-md w-full bg-white border border-black/10 p-10">

          <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-4 text-center">

            Golden Light Studio

          </p>

          <h1 className="text-4xl font-light mb-10 text-center">

            Admin Access

          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full border-b border-black bg-transparent py-4 outline-none mb-8"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border-b border-black bg-transparent py-4 outline-none mb-8"
          />

          <div className="space-y-4 mb-10">

            <label className="flex items-center gap-3 text-sm">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(
                    e.target.checked
                  )
                }
              />

              Remember account

            </label>

            <label className="flex items-center gap-3 text-sm">

              <input
                type="checkbox"
                checked={stayLogged}
                onChange={(e) =>
                  setStayLogged(
                    e.target.checked
                  )
                }
              />

              Stay logged in for 10 days

            </label>

          </div>

          <button
            onClick={login}
            className="w-full border border-black py-4 uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition duration-500"
          >

            Enter Admin

          </button>

          <p
            onClick={() =>
              setShowForgotUsername(true)
            }
            className="text-sm cursor-pointer opacity-60 hover:opacity-100 mt-4">
            Forgot Username?
          </p>

          <p
           onClick={() =>
            setShowForgotPassword(true)
           }
           className=" text-sm cursor-pointer opacity-60 hover:opacity-100 mt-2 ">
            Forgot Password?
          </p>

        </div>

      </main>

      {showForgotPassword && (

      <div 
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div 
        className="bg-white p-10 w-[500px] max-w-[90vw]">

        <h3 className="text-3xl mb-6">

         Reset Password

        </h3>

      <input
        type="text"
        placeholder="Username"
        value={resetUsername}
        onChange={(e) =>
          setResetUsername(
            e.target.value
          )
        }
        className="
          w-full
          border
          p-3
          mb-4
        "
      />

      <input
        type="email"
        placeholder="Email"
        value={resetEmail}
        onChange={(e) =>
          setResetEmail(
            e.target.value
          )
        }
        className="
          w-full
          border
          p-3
          mb-8
        "
      />

      <div className="flex gap-4">

        <button
          onClick={resetPassword}
          className="border px-4 py-2">

          Send Reset Link

        </button>

        <button
          onClick={() =>
            setShowForgotPassword(false)
          }
          className="border px-4 py-2">

          Close

        </button>

        </div>

      </div>

    </div>

    )}

    {showForgotUsername && (

      <div
        className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
        "
      >

        <div
          className="
            bg-white
            p-10
            w-[500px]
            max-w-[90vw]
          "
        >

          <h3 className="text-3xl mb-6">

            Recover Username

          </h3>

          <input
            type="email"
            placeholder="Email"
            value={usernameEmail}
            onChange={(e) =>
              setUsernameEmail(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-3
              mb-8
            "
          />

          <div className="flex gap-4">

            <button
              onClick={recoverUsername}
              className="
                border
                px-4
                py-2
              "
            >

              Find Username

            </button>

            <button
              onClick={() =>
                setShowForgotUsername(false)
              }
              className="
                border
                px-4
                py-2
              "
            >

              Close

            </button>

          </div>

        </div>

      </div>

    )}

  </>

);

}

  return (

    <main className="min-h-screen bg-[#f5f2ec] flex">

      {/* WELCOME SCREEN */}
      {showWelcome && (

        <WelcomeScreen
          userName={
            currentUser?.name
          }
        />

      )}

      {/* SIDEBAR */}
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

        {/* NAVIGATION */}
        <nav className="space-y-6">

          <button
            onClick={() =>
              setSection("dashboard")
            }
            className={`block text-left text-lg transition duration-300 ${
              section === "dashboard"
                ? "opacity-100 translate-x-2"
                : "opacity-40 hover:opacity-80"
            }`}
          >

            Dashboard

          </button>

          <button
            onClick={() =>
              setSection("journal")
            }
            className={`block text-left text-lg transition duration-300 ${
              section === "journal"
                ? "opacity-100 translate-x-2"
                : "opacity-40 hover:opacity-80"
            }`}
          >

            Articles

          </button>

          <button
            onClick={() =>
              setSection("portfolio")
            }
            className={`block text-left text-lg transition duration-300 ${
              section === "portfolio"
                ? "opacity-100 translate-x-2"
                : "opacity-40 hover:opacity-80"
            }`}
          >

            Portfolio

          </button>

          {/* BIN */}
          <button
            onClick={() => {

              if (

                currentUser?.permissions
                  ?.deleteArticles ||

                currentUser?.permissions
                  ?.deletePortfolio ||

                currentUser?.role ===
                  "owner"

              ) {

                setSection("bin");

              }

            }}
            className={`block text-left text-lg transition duration-300 ${
              section === "bin"
                ? "opacity-100 translate-x-2"

                : currentUser?.permissions
                      ?.deleteArticles ||

                  currentUser?.permissions
                      ?.deletePortfolio ||

                  currentUser?.role ===
                    "owner"

                  ? "opacity-40 hover:opacity-80"

                  : "opacity-20 cursor-not-allowed"
            }`}
          >

            Bin

          </button>

          <button
            onClick={() =>
              setSection("settings")
            }
            className={`block text-left text-lg transition duration-300 ${
              section === "settings"
                ? "opacity-100 translate-x-2"
                : "opacity-40 hover:opacity-80"
            }`}
          >

            Settings

          </button>

        </nav>

        {/* USER INFO */}
        <div className="mt-auto mb-6">

          <p className="text-sm opacity-40 mb-2">

            Logged as

          </p>

          <p className="text-lg font-light">

            {currentUser?.name}

          </p>

        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {

            setLogged(false);

            setCurrentUser(null);

            localStorage.removeItem(
              "adminExpiration"
            );

            localStorage.removeItem(
              "adminUser"
            );

          }}
          className="border border-black px-6 py-4 uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition duration-500"
        >

          Logout

        </button>

      </aside>

      {/* CONTENT */}
      <section className="flex-1 p-16 overflow-y-auto">

        {section === "dashboard" && (

          <DashboardSection
            articlesCount={
              articlesCount
            }
            portfolioCount={
              portfolioCount
            }
          />

        )}

        {section === "journal" && (

          <ArticlesSection
            currentUser={
              currentUser
            }
            binItems={
              binItems
            }
            setBinItems={
              setBinItems
            }
          />

        )}

        {section === "portfolio" && (

          <PortfolioSection
            currentUser={
              currentUser
            }
            binItems={
              binItems
            }
            setBinItems={
              setBinItems
            }
          />

        )}

        {section === "bin" && (

          <BinSection
            binItems={
              binItems
            }
            setBinItems={
              setBinItems
            }
          />

        )}

        {section === "settings" && (

          <SettingsSection
            currentUser={currentUser}
          />

        )}

      </section>

    </main>

  );
}