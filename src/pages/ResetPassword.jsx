import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {

const [password, setPassword] =
    useState("");

const [confirmPassword, setConfirmPassword] =
    useState("");

const [showPassword, setShowPassword]=
    useState(false);

const[showConfirmPassword, setShowConfirmPassword]=
useState(false);

  const updatePassword =
    async () => {

    if (password !==confirmPassword) {

        alert(
            "Password do not match"
        );
        return;
    }

      const { error } =
        await supabase.auth
          .updateUser({
            password,
          });

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
        border
        border-black/5
        shadow-xl
        p-8
        w-full
        max-w-md
      ">

        <img
         src="/images/logo-white.png"
         alt="Golden Light Studio"
          className="
           w-20
           h-auto
           mx-auto
           mb-4
          "
        />

        <p className="
          uppercase
          tracking-[0.4em]
          text-xs
          opacity-50
          mb-4
          text-center
        ">

          Golden light Studio

        </p>

        

        <h1 className="
        text-4xl sm:text-5xl
        font-light
        mb-4
        text-center
        ">

          Set Your Password 

        </h1>

        <p className="
        text-center
        opacity-60
        mb-10
        ">

          Create a secure password to access the admin area. 

        </p>

      <div className="relative mb-8">
        <input
          type={showPassword
                ? "text"
                : "password"
              }
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
        type="button"
        
        onMouseDown={() =>
          setShowPassword(true)
        }

        onMouseUp={() =>
          setShowPassword(false)
        }

        onMouseLeave={() =>
          setShowPassword(false)
        }

        onTouchStart={() =>
          setShowPassword(true)
        }

        onTouchEnd={() =>
          setShowPassword(false)
        }

        className="
        absolute 
        right-0
        top-1/2
        -translate-y-6
        text-xs
        uppercase
        traching-[0.2em]
        opacity-50
        hover:opacity-100">
                            
        {showPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
       
        </button>

      </div>

      <div className="relative mb-4">

        <input
         type={showConfirmPassword
              ? "text"
              : "password"
         }
         placeholder="Confirm Password"
         value={confirmPassword}
         onChange={(e) =>
            setConfirmPassword(
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
        type="button"

        onMouseDown={() =>
          setShowConfirmPassword(true)
        }

        onMouseUp={() =>
          setShowConfirmPassword(false)
        }

        onMouseLeave={() =>
          setShowConfirmPassword(false)
        }

        onTouchStart={() =>
          setShowConfirmPassword(true)
        }

        onTouchEnd={() =>
          setShowConfirmPassword(false)
        }

        className="
        absolute 
        right-0
        top-1/2
        -translate-y-6
        text-xs
        uppercase
        traching-[0.2em]
        opacity-50
        hover:opacity-100">

          {showConfirmPassword ? (
          <EyeOff size={18} />
          ) : (
          <Eye size={18} />
          )}
        
        </button>
        
      </div>

        {password.length > 0 && (

          <p
          className={`
          text-sm
          mb-8
          ${
            password === confirmPassword
              ? "text-green-600"
              : "text-red-500"
            }
          `}
          >

            {password === confirmPassword
              ? "✓ Passwords match"
              : "Passwords do not match"}

          </p>

        )}

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
            hover:bg-black
            hover:text-white
            transition
            duration-500
          "
        >

          Update Password

        </button>

      </div>

    </main>

  );

}