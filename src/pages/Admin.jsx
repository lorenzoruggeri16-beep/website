import {
  useState,
  useEffect,
} from "react";

import { supabase } from "../lib/supabase";

import WelcomeScreen from "../components/admin/WelcomeScreen";
import DashboardSection from "../components/admin/DashboardSection";
import ArticlesSection from "../components/admin/ArticlesSection";
import PortfolioSection from "../components/admin/PortfolioSection";
import SettingsSection from "../components/admin/SettingsSection";
import BinSection from "../components/admin/BinSection";

import LoginForm from "../components/admin/LoginForm";
import AdminSidebar from "../components/admin/AdminSidebar";
import Notification from "../components/admin/Notification";
import RecoverUsername from "../components/admin/RecoverUsername";
import ResetPassword from "../components/admin/ResetPassword";
import MediaLibrarySection from "../components/admin/MediaLibrarySection";

export default function Admin() {

  // NOTIFICATION
  const [notification, setNotification] =
    useState(null);

  // LOGIN
  const [logged, setLogged] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showForgotPassword,
    setShowForgotPassword] =
    useState(false);

  const [showForgotUsername,
    setShowForgotUsername] =
    useState(false);

  // USER
  const [currentUser,
    setCurrentUser] =
    useState(null);

  // LOGIN OPTIONS
  const [remember,
    setRemember] =
    useState(false);

  const [stayLogged,
    setStayLogged] =
    useState(false);

  // SECTION
  const [section,
    setSection] =
    useState("dashboard");

  // BIN
  const [binItems,
    setBinItems] =
    useState([]);

  // WELCOME
  const [showWelcome,
    setShowWelcome] =
    useState(false);

  // COUNTS
  const [articlesCount,
    setArticlesCount] =
    useState(0);

  const [portfolioCount,
    setPortfolioCount] =
    useState(0);

  const [usersCount,
    setUsersCount] =
    useState(0);

  const [recentUsers,
    setRecentUsers] =
    useState([]);
    
  // FETCH BIN
  useEffect(() => {

    const fetchBinItems =
      async () => {

      const {
        data: articles,
      } = await supabase
        .from("articles")
        .select("*")
        .eq("deleted", true);

      const {
        data: portfolio,
      } = await supabase
        .from("portfolio")
        .select("*")
        .eq("deleted", true);

      const formattedArticles =
        (articles || []).map(
          (article) => ({
            id: article.id,
            title: article.title,
            type: "article",
            coverImage:
              article.cover_image,
            description:
              article.excerpt,
            deletedAt:
              article.deleted_at,
          })
        );

      const formattedPortfolio =
        (portfolio || []).map(
          (item) => ({
            id: item.id,
            title: item.title,
            type: "portfolio",
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

  // COUNTS
  useEffect(() => {

    const fetchCounts =
      async () => {

      const {
        count: articles,
      } = await supabase
        .from("articles")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("deleted", false);

      const {
        count: portfolio,
      } = await supabase
        .from("portfolio")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("deleted", false);

      const{
      count: users,
      } = await supabase
        .from("admin_users")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        data: latestUsers,
       } = await supabase
        .from("admin_users")
        .select("*")
        .order("id", {
          ascending: false,
        })
         .limit(5);

      setArticlesCount(
        articles || 0
      );

      setPortfolioCount(
        portfolio || 0
      );

      setUsersCount(
        users || 0
      );

    };

    fetchCounts();

  }, []);

  // AUTO LOGIN
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

        setNotification({
          message: "Session restored",
          type: "success",
        });

      }

    }

  }, []);

  // WELCOME TIMER
  useEffect(() => {

    if (!showWelcome)
      return;

    const timer =
      setTimeout(() => {
        setShowWelcome(false);
      }, 2500);

    return () =>
      clearTimeout(timer);

  }, [showWelcome]);

  // AUTO CLOSE NOTIFICATION
    useEffect(() => {

    if (!notification)
     return;

    const timer =
      setTimeout(() => {

        setNotification(null);

      }, 3000);

    return () =>
      clearTimeout(timer);

    }, [notification]);

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
      !userRecord?.length
    ) {

      setNotification({
        message:
          "Username not found",
        type: "error",
      });

      return;

    }

    const {
      data,
      error,
    } =
      await supabase.auth
        .signInWithPassword({
          email:
            userRecord[0].email,
          password,
        });

    if (error) {

      setNotification({
        message:
          "Incorrect username or password",
        type: "error",
      });

      return;

    }

    const {
      data: adminUser,
    } = await supabase
      .from("admin_users")
      .select("*")
      .eq(
        "user_id",
        data.user.id
      )
      .single();

    if (!adminUser) {

      setNotification({
        message:
          "User not configured",
        type: "error",
      });

      return;

    }

    const user = {
      name:
        adminUser.name,
      role:
        adminUser.role,
      permissions:
        adminUser.permissions,
      username:
        adminUser.username,
      email:
        adminUser.email,
    };

    setLogged(true);
    setShowWelcome(true);
    setCurrentUser(user);

    setNotification({
      message: `Welcome back, ${user.name}`,
      type: "success",
    });

    localStorage.setItem(
      "adminUser",
      JSON.stringify(user)
    );

    if (remember) {

      localStorage.setItem(
        "adminUsername",
        username
      );

    }

    if (stayLogged) {

      const expiration =
        Date.now() +
        10 *
          24 *
          60 *
          60 *
          1000;

      localStorage.setItem(
        "adminExpiration",
        expiration.toString()
      );

    }

  };

    // LOGIN SCREEN
  if (!logged) {

    return (

      <>

        <Notification
          message={notification?.message}
          type={notification?.type}
        />

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          remember={remember}
          setRemember={setRemember}
          stayLogged={stayLogged}
          setStayLogged={setStayLogged}
          login={login}
          setShowForgotUsername={
            setShowForgotUsername
          }
          setShowForgotPassword={
            setShowForgotPassword
          }
        />

        <RecoverUsername
          open={showForgotUsername}
          onClose={() =>
            setShowForgotUsername(false)
          }
          setNotification={
            setNotification
          }
        />

        <ResetPassword
          open={showForgotPassword}
          onClose={() =>
            setShowForgotPassword(false)
          }
          setNotification={
            setNotification
          }
        />

      </>

    );

  }

  return (

    <main className="min-h-screen bg-[#f5f2ec] flex">

      <Notification
        message={notification?.message}
        type={notification?.type}
      />

      {showWelcome && (

        <WelcomeScreen
          userName={
            currentUser?.name
          }
        />

      )}

      <AdminSidebar
        section={section}
        setSection={setSection}
        currentUser={currentUser}
        setLogged={setLogged}
        setCurrentUser={setCurrentUser}
      />

      <section className="flex-1 p-16 overflow-y-auto">

        {section === "dashboard" && (

          <DashboardSection
            articlesCount={
            articlesCount
            }
            portfolioCount={
            portfolioCount
            }
            binCount={
            binItems.length
            }
            usersCount={
              usersCount
            }
            recentUsers={
              recentUsers
            }
            setSection={
              setSection
            }
            currentUser={
              currentUser
            }
          />
        )}

        {section === "journal" && 
          currentUser?.permissions?.editArticles && (

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

        {section === "portfolio" && 
          currentUser?.permissions?.editPortfolio && (

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

        {section === "media" && 
        currentUser?.role === "owner" && (

          <MediaLibrarySection />

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

        {section === "settings" &&
        currentUser?.role === "owner" && (

          <SettingsSection
            currentUser={currentUser}
            setNotification={setNotification}
          />

        )}

      </section>

    </main>

  );

}