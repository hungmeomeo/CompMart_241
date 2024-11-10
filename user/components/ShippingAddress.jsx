"use cliet";

import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { be_url } from "@/config_var";
import Cookies from "js-cookie";

const ShippingAddress = () => {
  const toast = useToast()
  const [shippingForm, setShippingForm] = useState({
    address: "",
    city: "",
    district: "",
    ward: "",
    phone: "",
  });
  console.log(shippingForm);
  useEffect(() => {
    const getCusInfo = async () => {
      const uid = Cookies.get("userId");
      const fetchCus = await axios.get(`${be_url}/user/${uid}/shipping`);
      fetchCus.data.length &&
        setShippingForm({
          address: fetchCus.data[0].address,
          city: fetchCus.data[0].city,
          district: fetchCus.data[0].district,
          ward: fetchCus.data[0].ward,
          phone: fetchCus.data[0].ship_phone,
        });
    };
    getCusInfo()
  }, []);
  return (
    <div className="mt-4 py-4 md:mt-0 md:pl-10">
      <p className="font-semibold text-lg">Shipping Address</p>
      <form
        action=""
        className="flex flex-col gap-4 my-4"
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            const uid = Cookies.get('userId')
            const updateCusInfo = await axios.post(`${be_url}/user/${uid}/shipping/update`, {
              address: shippingForm.address, 
              city: shippingForm.city,
              district: shippingForm.district,
              ward: shippingForm.ward,
              ship_phone: shippingForm.phone
            })
            toast({
              title: "Shipping Address updated",
              description: "You have updated your shipping address",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <FormControl isRequired>
          <FormLabel>Street Address</FormLabel>
          <Input
            name="address"
            type="text"
            value={shippingForm.address}
            onChange={e => {
              setShippingForm(old => ({
                ...old,
                [e.target.name]: e.target.value,
              }));
            }}
          />
        </FormControl>
        <div className="flex gap-4">
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              name="city"
              type="text"
              value={shippingForm.city}
              onChange={e => {
                setShippingForm(old => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone"
              type="text"
              value={shippingForm.phone}
              onChange={e => {
                setShippingForm(old => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </FormControl>
        </div>
        <div className="flex gap-4">
          <FormControl isRequired>
            <FormLabel>District</FormLabel>
            <Input
              name="district"
              type="text"
              value={shippingForm.district}
              onChange={e => {
                setShippingForm(old => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Ward</FormLabel>
            <Input
              name="ward"
              type="text"
              value={shippingForm.ward}
              onChange={e => {
                setShippingForm(old => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </FormControl>
        </div>
        <button className="font-medium bg-black text-white px-4 py-2 w-fit rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
