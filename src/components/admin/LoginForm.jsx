export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  remember,
  setRemember,
  stayLogged,
  setStayLogged,
  login,
  setShowForgotUsername,
  setShowForgotPassword,
}) {

  return (

    <main className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

      <div className="max-w-md w-full bg-white border border-black/10 p-10">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-4 text-center">

          Golden Light Studio

        </p>

        <img
            src="/images/logo-white.png"
            alt="Golden Light Studio"
            className="w-20 mx-auto mb-4"
        />

        <h1 className="text-4xl font-light mb-10 text-center">

          Admin Access

        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border-b border-black bg-transparent py-4 outline-none mb-8"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
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
          className="text-sm cursor-pointer opacity-60 hover:opacity-100 mt-4"
        >

          Forgot Username?

        </p>

        <p
          onClick={() =>
            setShowForgotPassword(true)
          }
          className="text-sm cursor-pointer opacity-60 hover:opacity-100 mt-2"
        >

          Forgot Password?

        </p>

      </div>

    </main>

  );

}