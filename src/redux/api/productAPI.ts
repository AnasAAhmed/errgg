import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  CollectionProductsResponse,
  CollectionsResponse,
  DeleteProductRequest,
  DeleteReviewRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  ReviewRequest,
  ReviewsResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    latestCategoryProducts: builder.query<AllProductsResponse, { category?: string }>({
      query: ({ category }) => `category-top?category=${category}`, // Fetch latest products by category
      providesTags: ["product"],
    }),
    latestCollectionsProducts: builder.query<CollectionProductsResponse, { price?:number;page?: number; sort?: string; sortField?: string; color?: string; size?: string; collection: string, limit?: number }>({
      query: ({ collection, color, page, sort, size, sortField,price }) => {
        let base = `allcollections/${collection}?page=${page || 1}`;

        if (color) base += `&color=${color}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (sortField) base += `&sortField=${sortField}`;
        if (size) base += `&size=${size}`;

        return base;
      }, // Fetch latest products by collection
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, { id: string, page: string, key: string, query: string }>({
      query: ({ id, query, key, page }) => {
        let base = `admin-products?id=${id}`;

        if (query && key) base += `&query=${query}&key=${key}`;
        if (page) base += `&page=${page}`;

        return base;
      },
      providesTags: ["product"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    collections: builder.query<CollectionsResponse, string>({
      query: () => `collections`,
      providesTags: ["product"],
    }),

    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, category, page, sortField, color, size }) => {
        let base = `all?search=${search}&page=${page}`;

        if (sortField) base += `&sortField=${sortField}`;
        if (color) base += `&color=${color}`;
        if (size) base += `&size=${size}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["product"],
    }),

    productDetails: builder.query<ProductResponse, { slug: string, userId?: string }>({
      query: ({ slug, userId }) => ({
        url: userId ? `${slug}?id=${userId}` : slug
      }),
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    //Reviews
    fetchProductReviews: builder.query<ReviewsResponse, string>({
      query: (productId) => `reviews?id=${productId}`,
      providesTags: ["product"],
    }),
    createProductReview: builder.mutation<MessageResponse, ReviewRequest>({
      query: ({ rating, comment, photo, email, name, userId, productId }) => ({
        url: `new-reviews/${productId}`,
        method: "POST",
        body: { rating, comment, photo, email, name, userId },
      }),
      invalidatesTags: ["product"],
    }),

    deleteProductReview: builder.mutation<MessageResponse, DeleteReviewRequest>({
      query: ({ userId, productId }) => ({
        url: `delete-review?productId=${productId}&id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
})

export const {
  useLatestProductsQuery,
  useLatestCategoryProductsQuery,
  useLatestCollectionsProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useCollectionsQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchProductReviewsQuery,
  useCreateProductReviewMutation,
  useDeleteProductReviewMutation,
} = productAPI;
