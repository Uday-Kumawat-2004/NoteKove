import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Signin() {
  const [successMessage, setSuccess] = useState({
    success: null,
    message: "",
    id: null,
  });
  const [showPopUp, setShowPopUp] = useState(false);

  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault(); // ✅ Prevents page reload & URL pollution

    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess({ success: true, message: res.data.message });
      setShowPopUp(true);
      // Clear fields
      emailInputRef.current.value = "";
      passInputRef.current.value = "";
      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
    } catch (err) {
      const res = err?.response;

      if (!res) {
        setSuccess({ success: false, message: "Server unavailable", id: 0 });
        setShowPopUp(true);
        setTimeout(() => {
          setShowPopUp(false);
        }, 3000);
        return;
      }
      if (res.status === 401) {
        setSuccess({ success: false, message: res.data.error, id: 1 });
      }
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-[#3c6e71] w-[500px] h-auto flex flex-col gap-2 ">
        <div className="flex w-full h-[95px] bg-[#1f3a3b] justify-center items-center">
          <img className="w-[270px] h-[270px]" src="/NoteKove2.png" />
        </div>

        <div className="flex-1 w-full h-full p-4">
          <p className="w-full h-[50px] text-3xl font-semibold text-white border-b-2 mb-4">
            SIGN IN
          </p>

          {/* ✅ Use a form */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {[
              {
                id: "email",
                label: "E-MAIL",
                type: "email",
                ref: emailInputRef,
                check: successMessage,
              },
              {
                id: "Password",
                label: "PASSWORD",
                type: "password",
                ref: passInputRef,
                check: successMessage,
              },
            ].map((field) => (
              <div
                key={field.id}
                className="relative w-full max-w-[420px] pt-5 mb-0"
              >
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  ref={field.ref}
                  required
                  autoComplete="new-password"
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    if (
                      (e.ctrlKey || e.metaKey) &&
                      ["c", "x"].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  placeholder={field.label}
                  className="peer w-full border-0 border-b-2 border-gray-400 bg-transparent py-1 text-white placeholder-transparent outline-none transition-all focus:border-b-[3px] focus:[border-image:linear-gradient(to_right,_#116399,_#38caef)_1]"
                />
                <label
                  htmlFor={field.id}
                  className="absolute left-0 top-0 text-white text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:cursor-text peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#38caef] peer-focus:font-bold"
                >
                  {field.label}
                </label>
                <p className="w-full min-h-[18px] max-h-[50px] mb-[4px] text-[#e56b6f]">
                  {successMessage.success === false && successMessage.id === 1
                    ? successMessage.message
                    : ""}
                </p>
              </div>
            ))}

            {/* ✅ Submit Button */}
            <button
              type="submit"
              className="w-[150px] bg-[#3c6e71] border-2 border-[#38caef] h-[50px] my-3 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-95 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#38caef] before:to-[#38caef] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 text-[#fff]"
            >
              SIGN-IN
            </button>

            <div className="text-center mt-3 text-sm text-[#dfe4ea]">
              Create an account
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="ml-1 text-[#38caef] font-semibold hover:underline transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPopUp && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-md shadow-lg z-50 transition-all duration-300
    ${
      successMessage.success
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white"
    }`}
        >
          {successMessage.message}
        </div>
      )}
    </div>
  );
}
