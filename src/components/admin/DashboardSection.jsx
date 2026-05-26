export default function DashboardSection({
  articlesCount,
  portfolioCount,
}) {

  return (

    <div>

      <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

        Overview

      </p>

      <h2 className="text-6xl font-light mb-16">

        Welcome back.

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

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

            Sessions

          </p>

          <h3 className="text-6xl font-light">

            {portfolioCount}

          </h3>

        </div>

      </div>

    </div>

  );
}