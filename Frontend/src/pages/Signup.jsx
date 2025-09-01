import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "../components/Header";

export default function Signup() {
  const [passNotMatched, setPassNotMatched] = useState(false);
  const [namelengthErr, setNameLengthErr] = useState(false);
  const [successMessage, setSuccess] = useState({
    success: null,
    message: "",
    id: null,
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const confirmPassInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault(); // ✅ Prevents page reload & URL pollution

    const name = nameInputRef.current.value.trim();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;
    const confirmPass = confirmPassInputRef.current.value;
    if (name.length < 2) {
      setNameLengthErr(true);
      return;
    } else {
      setNameLengthErr(false);
    }
    if (password !== confirmPass) {
      setPassNotMatched(true);
      return;
    }

    setPassNotMatched(false);

    try {
      const res = await axios.post("http://localhost:4000/api/users/signup", {
        name,
        email,
        password,
      });

      setSuccess({ success: true, message: res.data.message });
      setShowPopUp(true);
      // Clear fields
      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
      passInputRef.current.value = "";
      confirmPassInputRef.current.value = "";
      setTimeout(() => {
        setShowPopUp(false);
      }, 5000);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      const res = err?.response;

      if (!res) {
        setSuccess({ success: false, message: "Server unavailable", id: 0 });
        setShowPopUp(true);
        setInterval(() => {
          setShowPopUp(false);
        }, 5000);
        return;
      }

      if (res.status === 409) {
        setSuccess({ success: false, message: res.data.error, id: 1 });
      } else if (res.status === 400 && res.data.error === "validation failed") {
        const details = res.data.details;

        if (details.email) {
          setSuccess({ success: false, message: details.email, id: 2 });
        } else if (details.password) {
          setSuccess({ success: false, message: details.password, id: 3 });
        } else {
          setSuccess({
            success: false,
            message: "Please check your inputs",
            id: 0,
          });
        }
      } else {
        setSuccess({
          success: false,
          message: res.data.error || "Signup failed",
          id: 0,
        });
        setShowPopUp(true);
        setTimeout(() => {
          setShowPopUp(false);
        }, 5000);
      }

      console.error("Signup error:", res.data);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center ">
      <Header />

      <div className="backdrop-blur-xl flex-1 bg-white/10 border border-white/20 shadow-2xl rounded w-[500px] mb-10 pt-6">
        <div className="w-full h-auto p-4">
          <p className="w-full h-[50px] text-3xl font-semibold text-white border-b-2 mb-4">
            SIGN UP
          </p>

          {/* ✅ Use a form */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {[
              {
                id: "name",
                label: "Name",
                type: "text",
                ref: nameInputRef,
                check: namelengthErr,
              },
              {
                id: "email",
                label: "E-MAIL",
                type: "email",
                ref: emailInputRef,
                check: successMessage,
              },
              {
                id: "setPassword",
                label: "SET PASSWORD",
                type: "password",
                ref: passInputRef,
                check: successMessage,
              },
              {
                id: "confirmPass",
                label: "CONFIRM PASSWORD",
                type: "password",
                ref: confirmPassInputRef,
                check: passNotMatched,
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
                  onPaste={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    if (
                      (e.ctrlKey || e.metaKey) &&
                      ["c", "v", "x"].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  placeholder={field.label}
                  className="peer w-full border-0 border-b-2 border-gray-400 bg-transparent py-1 text-white caret-white placeholder-transparent outline-none transition-all focus:border-b-[3px] focus:[border-image:linear-gradient(to_right,_#116399,_#38caef)_1]"
                />
                <label
                  htmlFor={field.id}
                  className="absolute left-0 top-0 text-white text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:cursor-text peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#38caef] peer-focus:font-bold"
                >
                  {field.label}
                </label>
                <p className="w-full min-h-[18px] max-h-[50px] mb-[4px] text-[#f57276]">
                  {field.id === "name" && namelengthErr
                    ? "Name must be at least 2 characters"
                    : field.id === "confirmPass" && passNotMatched
                    ? "Please make sure both passwords are the same."
                    : field.id === "email" &&
                      (successMessage.id === 1 || successMessage.id === 2)
                    ? successMessage.message
                    : field.id === "setPassword" && successMessage.id === 3
                    ? successMessage.message
                    : ""}
                </p>
              </div>
            ))}

            {/* ✅ Submit Button */}
            <button
              type="submit"
              className="w-[300px] py-3 bg-gradient-to-r from-cyan-500 to-[#25879f] text-white font-semibold rounded cursor-pointer shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              SIGN-UP
            </button>

            <div className="text-center mt-6 text-sm text-[#dfe4ea]">
              Already have an account?
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="ml-1.5 text-[#38caef] font-semibold hover:underline transition duration-200 cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPopUp && (
        <div
          className={`fixed top-25 right-5 px-5 py-3 rounded-md shadow-lg z-50 
      transform transition-all duration-500 ease-in-out
      ${successMessage.success ? "bg-green-600" : "bg-red-600"} text-white
      ${showPopUp ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
    `}
        >
          {successMessage.message}
        </div>
      )}
    </div>
  );
}
