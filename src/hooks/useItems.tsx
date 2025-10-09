"use client";

import axiosApi from "@/libs/axiosInstance";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Product, PaginatedResponse, BannerItem } from "@/types/product";

/**
 * =========================
 * Product API React Query Hooks
 * =========================
 * Centralized hooks for product CRUD operations with
 * proper typing, query invalidation, and cache handling.
 */

/* =========================
   GET: Paginated Products
   ========================= */

/**
 * Fetch paginated list of products from backend.
 * @param page Current page number
 * @param search Search keyword for filtering
 */
const fetchItems = async (
  page: number,
  search: string,
  category: string,
  brand: string,
  all: boolean = false
): Promise<PaginatedResponse> => {
  const res = await axiosApi.get("/items", {
    params: { page, search, category, brand, all },
  });
  return res.data;
};

/**
 * Hook for fetching paginated products with search support.
 */

export function useGetItems(
  page: number,
  search: string,
  category: string,
  brand: string,
  all: boolean = false
) {
  return useQuery({
    queryKey: ["items", page, search, category, brand, all],
    queryFn: () => fetchItems(page, search, category, brand, all), // ✅ use the actual param
    placeholderData: keepPreviousData,
    refetchInterval: 2000,
  });
}

/* =========================
   GET: Single Product
   ========================= */

/**
 * Fetch single product details by ID.
 * @param id Product ID
 */
const fetchItem = async (id: string): Promise<Product> => {
  const res = await axiosApi.get(`/items/${id}`);
  return res.data;
};

/**
 * Hook for fetching a single product.
 */
export function useGetItem(id: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
    enabled: !!id, // Prevents request if id is undefined/null
    refetchInterval: 2000,
  });
}

/* =========================
   POST: Add Product
   ========================= */

/**
 * Add a new product.
 * Excludes `_id` because backend generates it.
 */
const addItem = async (newItem: Omit<Product, "_id">): Promise<Product> => {
  const res = await axiosApi.post("/items", newItem);
  return res.data;
};

/**
 * Hook for adding a new product.
 * Automatically invalidates product list cache.
 */
export function useAddItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });
}

/* =========================
   PATCH: Update Product
   ========================= */

/**
 * Update product fields.
 * Accepts partial product data with `_id` required.
 */
const updateItem = async (
  item: Partial<Product> & { _id: string }
): Promise<Product> => {
  const res = await axiosApi.patch(`/items/${item._id}`, item);
  return res.data;
};

/**
 * Hook for updating a product.
 * Invalidates product list to refresh updated data.
 */
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });
}

/* =========================
   DELETE: Remove Product
   ========================= */

/**
 * Delete a product by ID.
 */
const deleteItem = async (id: string): Promise<{ success: boolean }> => {
  const res = await axiosApi.delete(`/items/${id}`);
  return res.data;
};

/**
 * Hook for deleting a product.
 * Invalidates product list cache after deletion.
 */
export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });
}

/* =========================
   GET: Head Data
   ========================= */

const fetchHeadData = async (): Promise<BannerItem[]> => {
  const res = await axiosApi.get("/head-data");
  return res.data;
};

export function useGetHeadData() {
  return useQuery<BannerItem[]>({
    queryKey: ["head-data"],
    queryFn: () => fetchHeadData(),
    refetchInterval: 2000,
  });
}
