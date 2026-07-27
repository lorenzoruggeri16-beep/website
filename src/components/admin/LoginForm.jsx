export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  remember,
  setRemember,
  login,
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

        <h1 className="text-4xl font-light mb-10 text-center">Admin Access</h1>

        <label className="sr-only" htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          placeholder="Email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full border-b border-black bg-transparent py-4 outline-none mb-8"
        />

        <label className="sr-only" htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter") login(); }}
          className="w-full border-b border-black bg-transparent py-4 outline-none mb-8"
        />

        <label className="flex items-center gap-3 text-sm mb-10">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          Remember email on this device
        </label>

        <button
          type="button"
          onClick={login}
          className="w-full border border-black py-4 uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition duration-500"
        >
          Enter Admin
        </button>

        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-sm opacity-60 hover:opacity-100 mt-4"
        >
          Forgot Password?
        </button>
      </div>
    </main>
  );
}
