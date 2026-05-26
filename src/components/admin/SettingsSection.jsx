export default function SettingsSection({
  currentUser,
  users,
  setUsers,
}) {

  // ONLY OWNER ACCESS
  if (
    currentUser?.role !==
    "owner"
  ) {

    return (

      <div className="max-w-3xl">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          Settings

        </p>

        <h2 className="text-5xl font-light mb-10">

          Access Restricted

        </h2>

        <p className="opacity-60 text-lg leading-relaxed">

          Only the owner account
          can manage users and
          permissions.

        </p>

      </div>

    );
  }

  return (

    <div className="max-w-5xl">

      {/* HEADER */}
      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          User Management

        </p>

        <h2 className="text-6xl font-light mb-6">

          Settings

        </h2>

        <p className="opacity-50 text-lg max-w-2xl leading-relaxed">

          Manage collaborators,
          permissions and studio
          access.

        </p>

      </div>

      {/* USERS */}
      <div className="space-y-8">

        {users
          .filter(
            (user) =>
              user.role !==
              "owner"
          )
          .map((user, index) => (

            <div
              key={index}
              className="bg-white border border-black/5 p-8 hover:shadow-xl transition duration-500"
            >

              {/* TOP */}
              <div className="flex items-center justify-between mb-10">

                <div>

                  <h3 className="text-2xl font-light mb-2">

                    {user.name}

                  </h3>

                  <p className="text-sm opacity-40">

                    {user.email}

                  </p>

                </div>

                <button
                  className="border border-red-200 text-red-500 px-5 py-3 uppercase tracking-[0.25em] text-[10px] hover:bg-red-500 hover:text-white transition duration-500"
                >

                  Remove

                </button>

              </div>

              {/* PERMISSIONS */}
              <div className="space-y-2">

                {/* EDIT ARTICLES */}
                <label className="flex items-center justify-between py-5 border-b border-black/5">

                  <span className="text-sm">

                    Edit Articles

                  </span>

                  <input
                    type="checkbox"
                    checked={
                      user.permissions
                        .editArticles
                    }
                    onChange={() => {

                      const updatedUsers =
                        [...users];

                      updatedUsers[index + 1]
                        .permissions
                        .editArticles =

                        !updatedUsers[index + 1]
                          .permissions
                          .editArticles;

                      setUsers(
                        updatedUsers
                      );

                    }}
                  />

                </label>

                {/* DELETE ARTICLES */}
                <label className="flex items-center justify-between py-5 border-b border-black/5">

                  <span className="text-sm">

                    Delete Articles

                  </span>

                  <input
                    type="checkbox"
                    checked={
                      user.permissions
                        .deleteArticles
                    }
                    onChange={() => {

                      const updatedUsers =
                        [...users];

                      updatedUsers[index + 1]
                        .permissions
                        .deleteArticles =

                        !updatedUsers[index + 1]
                          .permissions
                          .deleteArticles;

                      setUsers(
                        updatedUsers
                      );

                    }}
                  />

                </label>

                {/* EDIT PORTFOLIO */}
                <label className="flex items-center justify-between py-5 border-b border-black/5">

                  <span className="text-sm">

                    Edit Portfolio

                  </span>

                  <input
                    type="checkbox"
                    checked={
                      user.permissions
                        .editPortfolio
                    }
                    onChange={() => {

                      const updatedUsers =
                        [...users];

                      updatedUsers[index + 1]
                        .permissions
                        .editPortfolio =

                        !updatedUsers[index + 1]
                          .permissions
                          .editPortfolio;

                      setUsers(
                        updatedUsers
                      );

                    }}
                  />

                </label>

                {/* DELETE PORTFOLIO */}
                <label className="flex items-center justify-between py-5">

                  <span className="text-sm">

                    Delete Portfolio

                  </span>

                  <input
                    type="checkbox"
                    checked={
                      user.permissions
                        .deletePortfolio
                    }
                    onChange={() => {

                      const updatedUsers =
                        [...users];

                      updatedUsers[index + 1]
                        .permissions
                        .deletePortfolio =

                        !updatedUsers[index + 1]
                          .permissions
                          .deletePortfolio;

                      setUsers(
                        updatedUsers
                      );

                    }}
                  />

                </label>

              </div>

            </div>

          ))}

      </div>

    </div>

  );
}