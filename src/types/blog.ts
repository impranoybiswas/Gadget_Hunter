export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string; // user email
  createdAt: string;
  updatedAt?: string;
}

export interface BlogResponse {
  success: boolean;
  data: Blog[];
  total: number;
  page: number;
  totalPages: number;
}
