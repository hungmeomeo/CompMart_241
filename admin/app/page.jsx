"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { be_url } from "@/config_var";
import { useToast } from "@chakra-ui/react";
import { Card } from "@/components/card";

const ProductManagement = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productStatus, setProductStatus] = useState("InStock");
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  // Fetch existing products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${be_url}/`);
        setProductList(response.data);
      } catch (e) {
        console.error("Failed to fetch products:", e);
      }
    };
    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        price: productPrice,
        url: productImage,
        brand: [productBrand],
        genre: [productStatus],
      };
      const response = await axios.post(`${be_url}/create`, newProduct);
      setProductList((prev) => [...prev, response.data]);

      toast({
        title: "Product added",
        description: "The new product has been added successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      // Reset form fields
      setProductName("");
      setProductPrice("");
      setProductImage("");
      setProductBrand("");
      setProductStatus("InStock");
    } catch (e) {
      toast({
        title: "Error adding product",
        description: "Failed to add the product. Try again.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // Remove a product
  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`${be_url}/${productId}`);
      setProductList((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      toast({
        title: "Product removed",
        description: "The product has been removed successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error removing product",
        description: "Failed to remove the product. Try again.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // Open modal with sales data
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Generate fake sales data for the selected product
  
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="responsive-layout mt-6">
      <h1 className="font-bold text-3xl">Product Management</h1>

      {/* Add Product Section */}
      <section className="mt-10">
        <h2 className="font-semibold text-2xl">Add New Product</h2>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Brand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Image URL"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={productStatus}
            onChange={(e) => setProductStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Motherboard">Motherboard</option>
            <option value="RAM">RAM</option>
            <option value="SSD">SSD</option>
            <option value="Power Supplies">Power Supplies</option>
            <option value="VGA">VGA</option>
            <option value="Headphones">Headphones</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Laptop">Laptop</option>
          </select>
          <button
            onClick={handleAddProduct}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </section>

      {/* Search and Display Products Section */}
      <section className="mt-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </section>

      <section className="mt-10">
        <h2 className="font-semibold text-2xl">Current Products</h2>
        <ul className="mt-4">
          {filteredProducts.map((product) => (
            <li
              key={product._id}
              className="flex justify-between items-center border p-4 rounded mt-2 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <Card product={product} setProductList={setProductList} />
            </li>
          ))}
        </ul>
      </section>

      
    </main>
  );
};

export default ProductManagement;
