import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SettingsSection({
  currentUser,
}) {

  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [newUsername, setNewUsername] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [newRole, setNewRole] = useState("editor");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    const {
      data,
      error,
    } = await supabase

      .from("admin_users")
      .select("*")
      .order(
        "name",
        {
          ascending: true,
        }
      );

    if (error) {

      console.log(error);
      return;

    }

    setUsers(data);

  };

  const saveUser = async () => {
       
    const { error } =
      await supabase
      .from("admin_users")
      .update({
        permissions:
        selectedUser.permissions,
      })
      .eq("id", selectedUser.id);

      alert("User updated successfully");

      
        
    if (error) {
      return;
    }

    await fetchUsers();
    setShowModal(false);

  };

  const deleteUser = async () => {

        const confirmDelete =
        window.confirm(
          "Delete this user?"
        );
        if(!confirmDelete)
          return;

        const { error } =
        await supabase
          .from("admin_users")
          .delete()
          .eq("id", selectedUser.id);

        if (error) {
          console.log(error);
          return;

        }

        await fetchUsers();
        setShowModal(false);

      };

  if (
    currentUser?.role !==
    "owner"
  ) {

    return (

      <div className="max-w-3xl">

        <h2 className="text-5xl font-light mb-6">

          Access Restricted

        </h2>

        <p className="opacity-60">

          Only the owner can manage users.

        </p>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto">

      {/* HEADER */}

      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          User Management

        </p>

        <h2 className="text-6xl font-light mb-6">

          Settings

        </h2>

        <p className="opacity-50 text-lg">

          Manage studio collaborators.

        </p>

      </div>

      {/* ADD USER */}

      <button
        onClick={() =>
          setShowAddModal(true)
        }
        className="
          border
          border-black
          px-6
          py-4
          mb-10
          uppercase
          tracking-[0.2em]
          text-xs
          hover:bg-black
          hover:text-white
          transition
        "
      >

        + Add User

      </button>

      {/* USERS */}

      <div className="grid md:grid-cols-2 gap-6">

        {users
          .filter(
            (user) =>
              user.role !== "owner"
          )
          .map((user) => (

            <div
              key={user.id}
              className="
                bg-white
                border
                border-black/5
                p-8
                hover:shadow-xl
                transition
                duration-300
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-light mb-2">

                    {user.name}

                  </h3>

                  <p className="text-sm opacity-50">

                    {user.email}

                  </p>

                  <p className="text-xs uppercase tracking-[0.2em] opacity-40 mt-4">

                    {user.role}

                  </p>

                </div>

                <button
                  onClick={() => {

                    setSelectedUser(user);
                    setShowModal(true);

                  }}
                  className="
                    border
                    border-black/10
                    px-4
                    py-2
                    hover:bg-black
                    hover:text-white
                    transition
                  "
                >

                  ✏ Edit

                </button>

              </div>

            </div>

          ))}

      </div>

      {/* MODAL */}

      {showAddModal && (

              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                <div className="bg-white p-10 w-[500px] max-w-[90vw]">

                  <h3 className="text-3xl mb-6">

                    Add User 

                  </h3>

                <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) =>
                  setNewName(e.target.value)
                }
                className="w-full border p-3 mb-4"
                />

                <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) =>
                  setNewEmail(
                    e.target.value
                  )
                }
                className="w-full border p-3 mb-4"
                />

                <input
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={(e) =>
                  setNewUsername(
                    e.target.value
                  )
                }
                className="w-full border p-3 mb-4"
                />

                <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="w-full border p-3 mb-8"
                />

                <select
                value={newRole}
                onChange={(e) =>
                  setNewRole(
                    e.target.value
                  )
                }
                className="w-full border p-3 mb-8">

                <option value="editor">
                  Editor
                </option>

                <option value="owner">
                  Owner
                </option>

                </select>

                <div className="flex gap-4">

                  <button
                  onClick={() => {

                    console.log({
                    name: newName,
                    email: newEmail,
                    username: newUsername,
                    password: newPassword,
                    role: newRole,
                    });
                    
                  }}
                  className="border px-4 py-2">
                    Create User
                  </button>

                  <button
                  onClick={() =>
                    setShowAddModal(false)
                  }                  
                  className="border px-4 py-2">
                    Close
                  </button>

                  </div>

                </div>
                
              </div>
            )}

      {showModal && selectedUser && (

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

              Edit User

            </h3>

            <p className="text-xl mb-2">

              {selectedUser.name}

            </p>

            <p className="opacity-50 mb-8">

              {selectedUser.email}

            </p>

            <p>
              ID: {selectedUser.id}
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-lg font-light">
                Permissions
              </h4>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    selectedUser.permissions
                      ?.editArticles
                  }
                  onChange={() => {
                    setSelectedUser({
                      ...selectedUser,
                      permissions: {
                        ...selectedUser.permissions,
                        editArticles:
                        !selectedUser
                        .permissions
                        .editArticles,
                      },
                    });
                  }}
                  />
                  Edit Articles
              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    selectedUser.permissions
                    ?.editPortfolio
                  }
                  onChange={() => {
                    setSelectedUser({
                      ...selectedUser,
                      permissions: {
                        ...selectedUser.permissions,
                        editPortfolio:
                        !selectedUser
                        .permissions
                        .editPortfolio,
                      },
                    });
                  }}
                  />
                  Edit Portfolio
              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    selectedUser.permissions
                    ?.deleteArticles
                  }
                  onChange={() => {
                    setSelectedUser({
                      ...selectedUser,
                      permissions: {
                        ...selectedUser.permissions,
                        deleteArticles:
                        !selectedUser
                        .permissions
                        .deleteArticles,
                      },
                    });
                  }}
                  />

                  Delete Articles 

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    selectedUser.permissions
                    ?.deletePortfolio
                  }
                  onChange={() => {
                    setSelectedUser({
                      ...selectedUser,
                      permissions: {
                        ...selectedUser.permissions,
                        deletePortfolio:
                        !selectedUser
                        .permissions
                        .deletePortfolio,
                      },
                    });
                  }}
                  />

                  Delete Portfolio 

              </label>

            </div>
            
            <div className="flex gap-4">

              <button
              onClick={saveUser}
                className="
                  border
                  px-4
                  py-2
                "
              >

                Save Changes

              </button>

              <button
              onClick={deleteUser}
              className="border border-red-500 text-red-500 px-4 py-4 hover:bg-red-500 hover:text-white transition">
                Delete User
                </button>

              <button
                onClick={() =>
                  setShowModal(false)
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

    </div>

  );

}