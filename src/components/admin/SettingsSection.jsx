import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SettingsSection({
  currentUser,
  setNotification,
}) {

  const [showAddModal, setShowAddModal] = useState(false);

  const [creatingUser, setCreatingUser] = useState(false);

  const [newName, setNewName] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [newUsername, setNewUsername] = useState("");

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);
  
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
                    
    if (error) {
      return;
    }

    setNotification({
      message:
        "User updated successfully",
      type: "success",
    });

    await fetchUsers();
    setShowModal(false);

  };

  const deleteUser = async () => {

      if (selectedUser.role === "owner"){
        setNotification({
          message:
            "Owner account cannot be deleted",
          type: "warning",
        });
        return;
      }

      if(
        selectedUser.email ===
        currentUser.email
      ) {
        setNotification({
          message:
            "You cannot delete your own account",
          type: "warning",
        });
        return;
      }

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

        <p className="uppercase tracking-[0.3em] text-xs opacity-40 mt-4">

          {users.length} Team Members

        </p>

      </div>

      {/* ADD USER */}

      <div
        onClick={() =>
          setShowAddModal(true)
        }
        className="
          bg-white
          border
          border-black/5
          p-10
          cursor-pointer
          hover-translate-y-1
          hover:shadow-xl
          transition
          duration-500
          flex
          flex-col
          justify-center
          items-center
          min-h-[180px]
        "
      >
        <span className="text-5xl font-light mb-4">
          +
        </span>

        <p className="uppercase tracking-[0.3em] text-xs opacity-50">

        + Add User

        </p>

      </div>

      {/* USERS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

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
                p-10
                min-h-[220px]
                hover:-translate-y-1
                hover:shadow-xl
                transition
                duration-500
              "
            >

              <div className="flex flex-col h-full">

                <div>

                  <h3 className="text-2xl font-light mb-2">

                    {user.name}

                  </h3>

                  <p className="text-sm opacity-50">

                    {user.email}

                  </p>

                  <div className="mt-6 space-y-2">

                  <p className="text-xs uppercase tracking-[0.2em] opacity-40 mt-4">

                    permissions

                  </p>

                  <div className="text-sm space-y-1 opacity-70">
                     <p>
                      Articles {
                        user.permissions?.editArticles
                          ? "✓"
                          : "✕"
                      }
                      </p>

                      <p>
                        Portfolio {
                          user.permissions?.editPortfolio
                            ? "✓"
                            : "✕"
                        }
                      </p>

                      <p>
                        Delete {
                          user.permissions?.deleteArticles ||
                          user.permissions?.deletePortfolio
                            ? "✓"
                            : "✕"
                        }
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-auto pt-8">

                  <button
                    onClick={() => {

                    if (user.role === "owner") {

                      setNotification({
                        message:
                          "Owner permissions cannot be modified",
                        type: "error",
                      });

                      return;

                      }

                      setSelectedUser(user);
                      setShowModal(true);

                    }}
                    className="
                      w-full
                      border
                      border-black/10
                      py-3
                      hover:bg-black
                      hover:text-white
                      transition
                      duration-500
                      "
                    >

                      Manage

                  </button>

                </div>

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
                                
                <div className="flex gap-4">

                  <button
                    onClick={async () => {
                    
                      const{
                        data: { session },
                      } = await supabase.auth.getSession();

                   
                      if (!session) {
               
                        return;
                      }

                      setCreatingUser(true);

                      const response = await fetch(
                        "https://nntdmjodnepsavvlbhvp.supabase.co/functions/v1/create-user",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${session.access_token}`,
                          },
                          body: JSON.stringify({
                            name: newName,
                            email: newEmail,
                            username: newUsername,
                          }),
                        }
                      );

                      const data = await response.json();

                      setCreatingUser(false);

                      if (response.ok) {

                      setNotification({
                        message:
                          "User created successfully",
                        type: "success",
                      });

                      setNewName("");
                      setNewEmail("");
                      setNewUsername("");

                      setShowAddModal(false);

                    await fetchUsers();

                    } else {

                     setNotification({
                        message:
                          "Failed to create user",
                        type: "error",
                      }); 

                    }

                    }}
                                   
                  className="border px-4 py-2">
                    {creatingUser
                    ? "Creating..."
                    : "Create User"}
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