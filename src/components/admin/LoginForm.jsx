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
    <main className="flex min-h-screen items-center justify-center bg-[#f8f6f2] px-5 sm:px-6">
      <div className="w-full max-w-md border border-black/10 bg-white p-6 sm:p-10">
        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-4 text-center">
          Golden Light Studio
        </p>

        <picture className="mx-auto mb-4 block w-20">
          <source srcSet="/images/logo-white.avif" type="image/avif" />
          <img src="/images/logo-white.png" alt="Golden Light Studio" className="w-full" />
        </picture>

        <h1 className="mb-7 text-3xl font-light sm:mb-10 sm:text-4xl text-center">Admin Access</h1>

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
