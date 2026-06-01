import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {

  const [password, setPassword] =
    useState("");

  const updatePassword =
    async () => {

      const { error } =
        await supabase.auth
          .updateUser({
            password,
          });

      console.log("update error:", error)

      if (error) {

        alert(error.message);
        return;

      }

      alert(
        "Password updated successfully"
      );

      window.location.href =
        "/admin";

    };

  return (

    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#f8f6f2]
      px-6
    ">

      <div className="
        bg-white
        p-10
        w-full
        max-w-md
      ">

        <h1 className="
          text-4xl
          font-light
          mb-8
        ">

          New Password

        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            border-b
            border-black
            py-4
            outline-none
            mb-8
          "
        />

        <button
          onClick={updatePassword}
          className="
            w-full
            border
            border-black
            py-4
            uppercase
            tracking-[0.3em]
            text-xs
          "
        >

          Update Password

        </button>

      </div>

    </main>

  );

}