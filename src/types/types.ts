export type User = {
  name: string;
  email: string;
  photo: string;
  phone: number;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type IShippingInfo ={
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
}

export type IOrderItem= {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string; // Use `Types.ObjectId` for Mongoose ObjectId
}

export type IOrder  ={
    shippingInfo: IShippingInfo;
    user: string; // Assuming the user ID is a string
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered'; // Enum for status
    orderItems: IOrderItem[];
}

export type Review= {
  name: string;
  userId: string;
  email: string;
  rating: number;
  date:number
  comment: string;
};

export type Product = {
  name: string;
  price: number;
  cutPrice: number;
  description:string;
  stock: number;
  ratings: number;
  numOfReviews: number;
  category: string;
  collections: string;
  size: string[];
  style: string[];
  color: string[];
  photo: string;
  _id: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  quantity: number;
  stock: number;
  size?: string;
  color?: string;
  style?: string;
};
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
   email: string;
    phone: number;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};
export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
