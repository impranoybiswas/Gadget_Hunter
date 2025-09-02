export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
  }
  
  export interface PaginatedResponse {
    page: number;
    totalPages: number;
    totalItems: number;
    items: Product[];
  }
  