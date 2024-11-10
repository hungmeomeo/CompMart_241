"use client";

import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

import { be_url } from "@/config_var";

export const Card = ({ product, setProductList }) => {
  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [updatedBrand, setUpdatedBrand] = useState(product.brand);
  const [updatedImage, setUpdatedImage] = useState(product.image);

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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        ...product,
        name: updatedName,
        price: updatedPrice,
        image: updatedImage,
        brand: updatedBrand,
      };

      await axios.put(`${be_url}/${product._id}`, updatedProduct);
      setProductList((prev) =>
        prev.map((p) => (p._id === product._id ? updatedProduct : p))
      );

      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setIsUpdateModalOpen(false);
    } catch (e) {
      toast({
        title: "Error updating product",
        description: "Failed to update the product. Try again.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };


  return (
    <>
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => handleProductClick(product)}
      >
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
        className="bg-black ml-auto text-white px-4 py-2 rounded"
      >
        Remove
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsUpdateModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Update
      </button>

      {/* Update Product Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Product Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Product Price"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Product Brand"
              value={updatedBrand}
              onChange={(e) => setUpdatedBrand(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Product Image URL"
              value={updatedImage}
              onChange={(e) => setUpdatedImage(e.target.value)}
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateProduct}>
              Save Changes
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsUpdateModalOpen(false)}
              ml={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      
    </>
  );
};
