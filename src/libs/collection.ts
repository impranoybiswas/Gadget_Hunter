import { getCollection } from "@/libs/connectDB";

export async function getItemsCollection() {
  const collection = await getCollection("products");
  if (!collection) {
    throw new Error("Failed to connect to collection");
  }
  return collection;
}

export async function getUsersCollection() {
  const collection = await getCollection("users");
  if (!collection) {
    throw new Error("Failed to connect to collection");
  }
  return collection;
}

export async function getPaymentsCollection() {
  const collection = await getCollection("payments");
  if (!collection) {
    throw new Error("Failed to connect to collection");
  }
  return collection;
}

export async function getBlogsCollection() {
  const collection = await getCollection("blogs");
  if (!collection) {
    throw new Error("Failed to connect to collection");
  }
  return collection;
}
