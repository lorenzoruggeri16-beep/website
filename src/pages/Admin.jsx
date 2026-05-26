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

import { journalArticles }
from "../data/journalData";

import { galleryData }
from "../data/galleryData";

export default function Admin() {

  // USERS
  const [users, setUsers] =
    useState([

      {
        email:
          "contacto.goldenlightstudio@gmail.com",

        password:
          "Goldenlight2026.",

        name:
          "Golden Light Studio",

        role:
          "owner",

        permissions: {
          editArticles: true,
          deleteArticles: true,
          editPortfolio: true,
          deletePortfolio: true,
        },
      },

      {
        email:
          "lorenzoruggeri16@gmail.com",

        password:
          "Goldenlightstudio1!",

        name:
          "Lorenzo",

        role:
          "editor",

        permissions: {
          editArticles: true,
          deleteArticles: false,
          editPortfolio: true,
          deletePortfolio: false,
        },
      },

      {
        email:
          "giorgialabrozzi1998@gmail.com",

        password:
          "Goldenlightstudio1.",

        name:
          "Giorgia",

        role:
          "editor",

        permissions: {
          editArticles: true,
          deleteArticles: false,
          editPortfolio: true,
          deletePortfolio: false,
        },
      },

    ]);

  // LOGIN
  const [logged, setLogged] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

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
    useState(() => {

      const saved =
        localStorage.getItem(
          "binItems"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    });

  // WELCOME SCREEN
  const [showWelcome,
    setShowWelcome] =
    useState(true);

  // REAL COUNTS
  const articlesCount =

    JSON.parse(
      localStorage.getItem(
        "articles"
      )
    )?.length ||

    journalArticles.length;

  const portfolioCount =

    JSON.parse(
      localStorage.getItem(
        "portfolio"
      )
    )?.length ||

    galleryData.length;

  // SAVE BIN
  useEffect(() => {

    localStorage.setItem(
      "binItems",
      JSON.stringify(binItems)
    );

  }, [binItems]);

  // AUTO DELETE BIN AFTER 20 DAYS
  useEffect(() => {

    const twentyDays =

      20 *
      24 *
      60 *
      60 *
      1000;

    const now =
      Date.now();

    const filtered =

      binItems.filter(

        (item) =>

          now - item.deletedAt <
          twentyDays

      );

    if (
      filtered.length !==
      binItems.length
    ) {

      setBinItems(filtered);

    }

  }, []);

  // AUTO LOGIN + REMEMBER EMAIL
  useEffect(() => {

    const savedEmail =
      localStorage.getItem(
        "adminEmail"
      );

    if (savedEmail) {

      setEmail(savedEmail);

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

    const timer =
      setTimeout(() => {

        setShowWelcome(false);

      }, 2500);

    return () =>
      clearTimeout(timer);

  }, []);

  // LOGIN
  const login = () => {

    const user = users.find(

      (u) =>

        u.email === email &&
        u.password === password

    );

    if (user) {

      setLogged(true);

      setCurrentUser(user);

      localStorage.setItem(
        "adminUser",
        JSON.stringify(user)
      );

      // REMEMBER EMAIL
      if (remember) {

        localStorage.setItem(
          "adminEmail",
          email
        );

      } else {

        localStorage.removeItem(
          "adminEmail"
        );

      }

      // STAY LOGGED
      if (stayLogged) {

        const tenDays =
          10 *
          24 *
          60 *
          60 *
          1000;

        const expiration =
          Date.now() +
          tenDays;

        localStorage.setItem(
          "adminExpiration",
          expiration.toString()
        );

      }

    } else {

      alert(
        "Incorrect email or password"
      );

    }

  };

  // LOGIN PAGE
  if (!logged) {

    return (

      <main className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

        <div className="max-w-md w-full bg-white border border-black/10 p-10">

          <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-4 text-center">

            Golden Light Studio

          </p>

          <h1 className="text-4xl font-light mb-10 text-center">

            Admin Access

          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
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

        </div>

      </main>

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
            currentUser={
              currentUser
            }
            users={users}
            setUsers={setUsers}
          />

        )}

      </section>

    </main>

  );
}