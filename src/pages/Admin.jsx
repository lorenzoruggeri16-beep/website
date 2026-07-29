import {
  useState,
  useEffect,
} from "react";

import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";

import WelcomeScreen from "../components/admin/WelcomeScreen";
import DashboardSection from "../components/admin/DashboardSection";
import ArticlesSection from "../components/admin/ArticlesSection";
import PortfolioSection from "../components/admin/PortfolioSection";
import SettingsSection from "../components/admin/SettingsSection";
import BinSection from "../components/admin/BinSection";

import LoginForm from "../components/admin/LoginForm";
import AdminSidebar from "../components/admin/AdminSidebar";
import Notification from "../components/admin/Notification";
import ResetPassword from "../components/admin/ResetPassword";
import MediaLibrarySection from "../components/admin/MediaLibrarySection";

async function fetchAdminProfile(userId) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("name, role, permissions, username, email")
    .eq("user_id", userId)
    .single();

  return error || !data ? null : data;
}
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

  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem("adminUsername")));

  // USER
  const [currentUser,
    setCurrentUser] =
    useState(null);

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

      setRecentUsers(latestUsers || []);

    };

    fetchCounts();

  }, []);

  // SESSION RESTORE: Supabase Auth is the sole authorization source.
  useEffect(() => {
    let active = true;

    const syncSession = async (session) => {
      if (!session) {
        if (active) {
          setLogged(false);
          setCurrentUser(null);
        }
        return;
      }

      const profile = await fetchAdminProfile(session.user.id);
      if (!active) return;

      if (!profile) {
        await supabase.auth.signOut();
        setLogged(false);
        setCurrentUser(null);
        setNotification({ message: "Account not authorized for Studio Control", type: "error" });
        return;
      }

      setCurrentUser(profile);
      setLogged(true);
    };

    supabase.auth.getSession().then(({ data }) => syncSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSession(session);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username.trim(),
      password,
    });

    if (error || !data.user) {
      setNotification({ message: "Incorrect email or password", type: "error" });
      return;
    }

    const user = await fetchAdminProfile(data.user.id);
    if (!user) {
      await supabase.auth.signOut();
      setNotification({ message: "Account not authorized for Studio Control", type: "error" });
      return;
    }

    setCurrentUser(user);
    setLogged(true);
    setShowWelcome(true);
    setNotification({ message: `Welcome back, ${user.name}`, type: "success" });

    if (remember) localStorage.setItem("adminUsername", username.trim());
    else localStorage.removeItem("adminUsername");
  };
    // LOGIN SCREEN
  if (!logged) {

    return (

      <>
        <SEO title="Studio Control | Golden Light Studio" noIndex />

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
          login={login}
          setShowForgotPassword={
            setShowForgotPassword
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

    <main className="min-h-screen bg-[#f5f2ec] flex flex-col lg:flex-row">
      <SEO title="Studio Control | Golden Light Studio" noIndex />

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

      <section className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-8 lg:p-16">

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
