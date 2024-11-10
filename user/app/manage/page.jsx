"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { be_url } from "@/config_var";
import { useToast } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

// Import necessary Chart.js components and register them
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductManagement = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productStatus, setProductStatus] = useState("InStock");
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  // Fetch existing products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${be_url}/home`);
        setProductList(response.data);
      } catch (e) {
        console.error(e);
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
        image: productImage,
        status: productStatus === "InStock",
      };
      const response = await axios.post(`${be_url}/products`, newProduct);
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
      await axios.delete(`${be_url}/products/${productId}`);
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
  const generateFakeSalesData = () => {
    const labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
    const salesData = labels.map(() => faker.number.int({ min: 50, max: 500 }));

    return {
      labels,
      datasets: [
        {
          label: `Total Sales`,
          data: salesData,
          fill: false,
          backgroundColor: "black",
          borderColor: "black",
        },
      ],
    };
  };

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
            <option value="InStock">In Stock</option>
            <option value="OutStock">Out of Stock</option>
          </select>
          <button
            onClick={handleAddProduct}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </section>

      {/* Current Products Section */}
      <section className="mt-10">
        <h2 className="font-semibold text-2xl">Current Products</h2>
        <ul className="mt-4">
          {productList.map((product) => (
            <li
              key={uuid()}
              className="flex justify-between items-center border p-4 rounded mt-2 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>{product.price} vnd</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProduct(product._id);
                }}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sales Graph Modal */}
      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            maxWidth="50vw" // 2/3 of the screen width
            margin="auto"
          >
            <ModalHeader>Sales Data for {selectedProduct.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Line data={generateFakeSalesData()} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </main>
  );
};

export default ProductManagement;
