import React, { useRef, useState } from "react";
import axios from "axios";

export default function Singup() {
  const [passNotMatched, setPassNotMatched] = useState(false);
  const [successMessage, setSuccess] = useState({
    success: null, // true or false
    message: "",
    id: null, // optional error ID for conditionals
  });
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const confirmPassInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;
    const confirmPass = confirmPassInputRef.current.value;
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

      setSuccess({ status: true, message: res.data.message });

      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
      passInputRef.current.value = "";
      confirmPassInputRef.current.value = "";
    } catch (err) {
      const res = err?.response;

      if (!res) {
        setSuccess({ success: false, message: "Server unavailable", id: 0 });
        return;
      }

      if (res.status === 409) {
        setSuccess({ success: false, message: res.data.error, id: 1 }); // Email already in use
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
      }

      console.error("Signup error:", res.data);
    }
  }
  return (
    <>
      <div className="w-screen h-screen flex  justify-center items-center ">
        <div className="bg-[#57606f] w-[500px] h-[650px] flex flex-col gap-2 shadow-2xl">
          <div className="flex w-full  h-[95px] bg-[#1d262f] justify-center pb-px items-center">
            <img className="w-[270px] h-[270px]" src="/NoteKove2.png" />
          </div>
          <div className="flex-1  w-full h-full p-4">
            <p className="w-full h-[50px] text-3xl font-semibold text-white
             border-b-2 mb-4">
              SIGN UP
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              {/* Floating Label Inputs */}
              {[
                { id: "name", label: "Name", type: "text", ref: nameInputRef },
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
                    autoComplete="new-password" // <--- THIS is KEY
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()} // disable right click
                    onKeyDown={(e) => {
                      if (
                        (e.ctrlKey || e.metaKey) &&
                        (e.key === "c" || e.key === "v" || e.key === "x")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    placeholder={field.label}
                    className="peer w-full border-0 border-b-2 border-gray-400 bg-transparent py-1 text-white placeholder-transparent outline-none transition-all focus:border-transparent focus:border-b-[3px] focus:[border-image:linear-gradient(to_right,_#116399,_#38caef)_1]"
                  />
                  <label
                    htmlFor={field.id}
                    className="absolute left-0 top-0 text-white text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:cursor-text peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#38caef] peer-focus:font-bold"
                  >
                    {field.label}
                  </label>
                  <p className="w-full min-h-[18px] max-h-[50px] mb-[4px] text-[#ff6b81]">
                    {field.id === "confirmPass" && passNotMatched
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

              {/* Signup Button with Interaction Enhancements */}
              <button
                type="submit"
                className="w-[150px] bg-[#57606f] border-2 border-[#38caef] h-[50px] my-3 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-95 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#38caef] before:to-[#38caef] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 text-[#fff]"
              >
                SIGN-UP
              </button>

              {/* Sign In Prompt */}
              <div className="text-center mt-3 text-sm text-[#dfe4ea]">
                Already have an account?
                <button
                  type="submit"
                  className="ml-1 text-[#38caef] font-semibold hover:underline transition duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
