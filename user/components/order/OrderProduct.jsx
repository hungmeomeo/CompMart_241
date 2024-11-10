import React from "react";

const OrderProduct = ({ product }) => {
  console.log("Inside order prodcuts", product);
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-md bg-[#F6F6F6] flex justify-center">
          <img src={product.product1.image} alt="" className="object-fit" />
        </div>
        <p className="font-semibold ml-5 w-[180px] truncate text-ellipsis">
          {product.product1.name}
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-semibold ml-20">{product.product1.price * product.quantity1}</p>
      </div>
    </div>
  );
};

export default OrderProduct;
