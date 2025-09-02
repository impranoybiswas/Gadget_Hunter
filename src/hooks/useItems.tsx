"use client";
import axiosApi from "@/libs/axiosInstance";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Product, PaginatedResponse } from "@/types/product";


// GET Items
const fetchItems = async (page: number, search: string): Promise<PaginatedResponse> => {
  const res = await axiosApi.get("/items", { params: { page, search } });
  return res.data;
};

export function useGetItems(page: number, search: string) {
  return useQuery({
    queryKey: ["items", page, search],
    queryFn: () => fetchItems(page, search),
    placeholderData : keepPreviousData,
  });
}

//Get Single product
const fetchItem = async (id: string) => {
  const res = await axiosApi.get(`/items/${id}`);
  return res.data;
};

export function useGetitem(id: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
  });
}

// ADD product
const addItem = async (newItem: Omit<Product, "_id">) => {
  const res = await axiosApi.post("/items", newItem);
  return res.data;
};

export function useAddItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] }); // auto refetch
    },
  });
}

// UPDATE product
const updateItem = async ({ _id, name, price }: Product) => {
  const res = await axiosApi.patch(`/items/${_id}`, { name, price });
  return res.data;
};

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

// DELETE product
const deleteItem = async (id: string) => {
  const res = await axiosApi.delete(`/items/${id}`);
  return res.data;
};

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
