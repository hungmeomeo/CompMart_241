import React from "react";

const Footer = ({ bgColor }) => {
  return (
    <footer
      className={`responsive-layout py-20 flex flex-wrap justify-between bg-[${bgColor}] mt-6`}
    >
      <div className="mt-5 md:w-1/3">
        <div className="flex gap-2 font-bold text-xl items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/049/007/non_2x/computer-pc-icon-logo-design-vector.jpg"
            alt=""
            className="w-12 h-12"
          />
          <p>CompMart</p>
        </div>
        <p className="text-[#5C5F6A] mt-4">
          This is an ecommerce website used for the project in the ecommerce
          course
        </p>
        <div className="flex gap-4 mt-2">
          <img src="/Github.png" alt="" />
          <img src="/Instagram.png" alt="" />
          <img src="/Youtube.png" alt="" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-8 gap-y-4 mt-5">
        <div>
          <h4 className="text-[#5C5F6A] mb-6">SUPPORT</h4>
        </div>
        <div>
          <h4 className="text-[#5C5F6A]">COMPANY</h4>
        </div>
        <div>
          <h4 className="text-[#5C5F6A]">SHOP</h4>
        </div>
        <div>
          <p>FAQ</p>
        </div>
        <div>
          <p>About Us</p>
        </div>
        <div>
          <p>My Account</p>
        </div>
        <div>
          <p>Terms of use</p>
        </div>
        <div>
          <p>Contact</p>
        </div>
        <div>
          <p>Checkout</p>
        </div>
        <div>
          <p>Privacy Policy</p>
        </div>
        <div>
          <p>Career</p>
        </div>
        <div>
          <p>Cart</p>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="text-[#5C5F6A]">ACCEPTED PAYMENTs</h4>
        <div className="flex gap-2 mt-4">
          <img src="/Mastercard.png" alt="" />
          <img src="/Amex.png" alt="" />
          <img src="/Visa.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
