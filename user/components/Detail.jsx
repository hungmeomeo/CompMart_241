"use client";

import React, { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const Detail = () => {
  const [userForm, setUserForm] = useState({ name: "", email: "" });
  console.log(userForm);
  return (
    <div className="pl-10">
      <p className="font-semibold text-lg">Account Details</p>
      <form action="" className="flex flex-col gap-4 mt-6 w-72">
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            name="name"
            type="text"
            value={userForm.name}
            onChange={e =>
              setUserForm({ ...userForm, [e.target.name]: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={userForm.email}
            onChange={e =>
              setUserForm({ ...userForm, [e.target.name]: e.target.value })
            }
          />
        </FormControl>
        <button className="font-medium bg-black text-white px-4 py-2 w-fit rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Detail;
