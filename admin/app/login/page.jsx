"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { be_url, web_link } from "@/config_var";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const toast = useToast();
  const [loginForm, setLoginForm] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center mb-10 h-full">
        <Navigation path={["Ecommerce", "Login"]} />
        <div className="flex flex-col items-center w-full px-6 md:w-3/4 lg:w-[400px]">
          <button className="flex text-[#5C5F6A] border-2 py-2 w-full rounded-md justify-center mt-10">
            <div className="flex gap-2">
              <img src="/Google.png" alt="" />
              <p>Continue with Google</p>
            </div>
          </button>
          <p className="text-[#5C5F6A] text-xs font-medium my-6">OR</p>
          <form
            action=""
            className="w-full flex flex-col grow"
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("Submit login form to backend ", loginForm);
              try {
                console.log("inside try block");
                const sendLogin = await axios.post(`${be_url}/auth/login`, {
                  email: loginForm.email,
                  password: loginForm.password,
                });
                console.log(sendLogin);
                console.log(sendLogin.data.userid);
                if (sendLogin.data.success) {
                  Cookies.set("userId", sendLogin.data.userid);
                  router.push("/");
                } else {
                  toast({
                    title: "Incorrect email or password",
                    description: "Please check your account",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                  });
                }
              } catch (e) {
                console.log(e);
                toast({
                  title: "Incorrect email or password",
                  description: "Please check your account",
                  status: "error",
                  duration: 1000,
                  isClosable: true,
                });
              }
            }}
          >
            <label htmlFor="email" className="mt-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="outline-none border-2 focus:border-[#5C5F6A] px-2 rounded-md py-2"
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
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
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <div className="w-6" onClick={() => setShowPwd((old) => !old)}>
                {showPwd ? (
                  <img src="/eye.png" alt="" />
                ) : (
                  <img src="/eye-off.png" alt="" />
                )}
              </div>
            </div>
            <a
              href=""
              className="text-[#5C5F6A] text-sm ml-auto my-4 font-semibold"
            >
              Forgot Password?
            </a>
            <button className="bg-black text-white font-semibold rounded-md py-2">
              Login
            </button>
          </form>
          <p className="text-[#5C5F6A] mt-4">
            Don't have an account?{" "}
            <span>
              <a href={`${web_link}/register`} className="hover:underline">
                Sign Up
              </a>
            </span>
          </p>
        </div>
      </div>
      <Footer bgColor="#F6F6F6" />
    </>
  );
};

export default Login;
