export interface Product {
  _id?: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  warranty: string;
  description: string;
  isBrandNew: boolean;
  thumbnail: string;
  images: string[];
}

export interface PaginatedResponse {
  page: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}
