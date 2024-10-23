import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Product,
  Review,
  ShippingInfo,
  Stats,
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = {
  success: boolean;
  totalPages: number;
  totalUsers: number;
  users: User[];
};

export type AllUsersRequest = {
  email?: string;
  id?: string;
  searchId?: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllProductsResponse = {
  success: boolean;
  totalPages: number;
  totalProducts: number;
  products: Product[];
};
export type CollectionProductsResponse = {
  success: boolean;
  productCollection: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type CollectionsResponse = {
  success: boolean;
  collections: string[];
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPage: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
  sortField: string
};
export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type ReviewsResponse = {
  success: boolean;
  reviews: Review;
};

export type AllOrdersResponse = {
  success: boolean;
  totalOrders: number;
  totalPages: number;
  orders: Order[];
};
export type Notification = {
  _id: string;
  message: string;
  adminMessage: string;
  orderId: string;
  userId: string;
  status: string;
  isAdmin: string;
};
export type MyNotificationResponse = {
  message: string;
  notifications: Notification[]
};
export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type UpdateUserRequest = {
  id: string;
  gender: string;
  name: string;
  phone: number;
  dob: string;
}

export type ReviewRequest = {
  productId: string;
  // formData:FormData;
  rating: number;
  comment: string;
  email: string;
  name: string;
  photo: string;
  userId: string;
};


export type DeleteProductRequest = {
  userId: string;
  productId: string;
};
export type GetProductRequest = {
  productId: string;
};
export type DeleteReviewRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};


export interface GetProductReviewsResponse {
  success: boolean; // Indicates whether the request was successful
  reviews: Review[]; // Array of review objects for the product
}
export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};
export type DeleteSingleUserRequest = {
  userId: string;
};
