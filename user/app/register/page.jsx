"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React, { useState } from "react";
import { be_url, web_link } from "@/config_var";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";




const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter()
  const toast = useToast()
  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <Navigation path={["Ecommerce", "Sign up"]} />
        <div className="flex flex-col items-center w-full px-6 md:w-3/4 lg:w-[400px]">
          <button className="flex text-[#5C5F6A] w-full border-2 py-2 rounded-md justify-center mt-10">
            <div className="flex gap-2">
              <img src="/Google.png" alt="" />
              <p>Continue with Google</p>
            </div>
          </button>
          <p className="text-[#5C5F6A] text-xs font-medium my-6">OR</p>
          <form
            action=""
            className="flex flex-col w-full"
            onSubmit={async e => {
              e.preventDefault();
              try {
                const sendRegister = await axios.post(`${be_url}/auth/signup`, {
                  username: registerForm.username,
                  password: registerForm.password,
                  email: registerForm.email,
                });
                router.push("/login");
              } catch (e) {
                console.log(e);
                toast({
                  title: "Email already exist",
                  description: "Please choose another mail to register",
                  status: "error",
                  duration: 1000,
                  isClosable: true,
                });
              }
            }}
          >
            <label htmlFor="email" className="">
              Name
            </label>
            <input
              type="text"
              name="username"
              className="outline-none border-2 focus:border-[#5C5F6A] px-2 rounded-md py-2"
              onChange={e =>
                setRegisterForm({
                  ...registerForm,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label htmlFor="email" className="mt-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="outline-none border-2 focus:border-[#5C5F6A] px-2 rounded-md py-2"
              onChange={e =>
                setRegisterForm({
                  ...registerForm,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label htmlFor="password" className="mt-4">
              Password
            </label>
            <div className="flex border-2 focus:border-[#5C5F6A] px-2 rounded-md py-2 items-center justify-between">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                className="outline-none w-full"
                onChange={e =>
                  setRegisterForm({
                    ...registerForm,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <div className="w-6" onClick={() => setShowPwd(old => !old)}>
                {showPwd ? (
                  <img src="/eye.png" alt="" />
                ) : (
                  <img src="/eye-off.png" alt="" />
                )}
              </div>
            </div>
            <button className="bg-black text-white font-semibold rounded-md py-2 mt-8">
              Create Account
            </button>
          </form>
          <p className="text-[#5C5F6A] mt-4">
            Already have an account?{" "}
            <span>
              <a href={`${web_link}/login`} className="hover:underline">
                Login
              </a>
            </span>
          </p>
        </div>
      </div>
      <Footer bgColor="#F6F6F6" />
    </>
  );
};

export default Register;
