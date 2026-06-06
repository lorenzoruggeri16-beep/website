import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ResetPassword({
  open,
  onClose,
  setNotification,
}) {

  const [resetUsername,
    setResetUsername] =
    useState("");

  const [resetEmail,
    setResetEmail] =
    useState("");

  if (!open) return null;

  const resetPassword =
    async () => {

      const { data: user } =
        await supabase
          .from("login_users")
          .select("*")
          .eq(
            "username",
            resetUsername
          )
          .eq(
            "email",
            resetEmail
          );

      if (!user?.length) {

        setNotification({
          message:
            "Username and email do not match",
          type: "error",
        });

        return;

      }

      const { error } =
        await supabase.auth
          .resetPasswordForEmail(
            resetEmail,
            {
              redirectTo:
                window.location.origin +
                "/reset-password",
            }
          );

      if (error) {

        setNotification({
          message:
            error.message,
          type: "error",
        });

        return;

      }

      setNotification({
        message:
          "Password reset email sent",
        type: "success",
      });

      setResetUsername("");
      setResetEmail("");

      onClose();

    };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white border border-black/10 shadow-xl p-10 w-[500px] max-w-[90vw] rounded-sm">

        <h3 className="text-4xl font-light mb-8">

          Reset Password

        </h3>

        <input
          type="text"
          placeholder="Username"
          value={resetUsername}
          onChange={(e) =>
            setResetUsername(
              e.target.value
            )
          }
          className="w-full border border-black/10 p-4 mb-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={resetEmail}
          onChange={(e) =>
            setResetEmail(
              e.target.value
            )
          }
          className="w-full border border-black/10 p-4 mb-8 outline-none"
        />

        <div className="flex gap-4">

          <button
            onClick={
              resetPassword
            }
            className="
              border
              border-black
              px-6
              py-3
              uppercase
              tracking-[0.2em]
              text-xs
              hover:bg-black
              hover:text-white
              transition-all
              duration-500
            "
          >

            Send Reset Link

          </button>

          <button
            onClick={() => {

              setResetUsername("");
              setResetEmail("");

              onClose();

            }}
            className="
              border
              border-black/20
              px-6
              py-3
              uppercase
              tracking-[0.2em]
              text-xs
              hover:bg-black
              hover:text-white
              transition-all
              duration-500
            "
          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}