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
  images: string[];
  totalPrice?: number;
  totalProducts?: number ;
}

export interface PaginatedResponse {
  page: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}


export interface BannerItem {
  title: string;
  subtitle: string;
  image: string;
}

export interface Payment {
  tranId: string;
  amount: number;
  status: string;
}