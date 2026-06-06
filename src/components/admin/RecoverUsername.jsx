import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RecoverUsername({
  open,
  onClose,
  setNotification,
}) {

  const [email, setEmail] =
    useState("");

  if (!open) return null;

  const recoverUsername =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("login_users")
        .select("*")
        .eq("email", email);

      if (
        error ||
        !data?.length
      ) {

        setNotification({
          message:
            "Email not found",
          type: "error",
        });

        return;

      }

      setNotification({
        message:
          `Username: ${data[0].username}`,
        type: "success",
      });

      setEmail("");

      onClose();

    };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-10 w-[500px] max-w-[90vw] rounded-sm shadow-xl">

        <h3 className="text-3xl font-light mb-6">

          Recover Username

        </h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border border-black/10 p-4 mb-8 outline-none"
        />

        <div className="flex gap-4">

          <button
            onClick={
              recoverUsername
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
              transition
              duration-500
            "
          >

            Find Username

          </button>

          <button
            onClick={() => {

              setEmail("");

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
              transition
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