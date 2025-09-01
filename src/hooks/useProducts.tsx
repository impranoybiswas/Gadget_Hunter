"use client";
import axiosApi from "@/libs/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Product = {
  _id: string;
  name: string;
  price: number;
};

// GET products
const fetchProducts = async (): Promise<Product[]> => {
  const res = await axiosApi.get("/products");
  return res.data;
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

//Get Single product
const fetchProduct = async (id: string) => {
  const res = await axiosApi.get(`/products/${id}`);
  return res.data;
};

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });
}

// ADD product
const addProduct = async (newProduct: Omit<Product, "_id">) => {
  const res = await axiosApi.post("/products", newProduct);
  return res.data;
};

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // auto refetch
    },
  });
}

// UPDATE product
const updateProduct = async ({_id, name, price}: Product) => {
  const res = await axiosApi.patch(`/products/${_id}`, { name, price });
  return res.data;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// DELETE product
const deleteProduct = async (id: string) => {
  const res = await axiosApi.delete(`/products/${id}`);
  return res.data;
};

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
