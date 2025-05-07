import { KeyboardEvent, useEffect, useState } from "react";
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { RiFilterFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import { Loader1 } from "../components/loader";

const DEFAULT_MAX_PRICE = 100000;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [color, setColor] = useState(searchParams.get("color") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [sortField, setSortField] = useState(searchParams.get("sortField") || "");
  const [maxPriceValue, setMaxPriceValue] = useState(Number(searchParams.get("price")) || DEFAULT_MAX_PRICE);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("price")) || DEFAULT_MAX_PRICE);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Fetch categories
  const { data: categoriesResponse, isLoading: loadingCategories, isError, error } = useCategoriesQuery("");
  const { isLoading: productLoading, data: searchedData, isError: productIsError, error: productError } = useSearchProductsQuery({
    search, sort, sortField, category, page, price: maxPrice,color,size
  });

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    if (color) params.set("color", color);
    if (size) params.set("size", size);
    if (sortField) params.set("sortField", sortField);
    if (category) params.set("category", category);
    if (maxPrice !== DEFAULT_MAX_PRICE) params.set("price", maxPrice.toString());
    setSearchParams(params);
  };

  useEffect(() => {
    updateSearchParams();
    setLoading(true);
  }, [search, sort, sortField, category, maxPrice, page,color,size]);

  useEffect(() => {
    const orTitle = document.title;
    document.title = search ? 'Search: ' + search : orTitle;
    setLoading(false);
    window.scrollTo(0, 0);
  }, [searchedData]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPage(1);
      callback();
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    const [field, order] = e.target.value.split("|");
    setSort(order);
    setSortField(field);
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    const color = e.target.value;
    setColor(color);
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    const size = e.target.value;
    setSize(size);
  };
  const clearFilters = () => {
    setSearchValue("");
    setSearch("");
    document.title = 'Search'
    setSort("");
    setSortField("");
    setColor("");
    setSize("");
    setCategory("");
    setMaxPriceValue(DEFAULT_MAX_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setPage(1);
    setSearchParams({});
  };

  const handleError = (error: CustomError) => toast.error(error.data.message);

  if (isError) handleError(error as CustomError);
  if (productIsError) handleError(productError as CustomError);

  return (
    <>
      <div className="flex flex-col px-4">
        <h2 className="text-center text-2xl font-semibold mt-10 mb-3">
          Filters <RiFilterFill className="inline-block mb-2" />
        </h2>
        <button
          onClick={clearFilters}
          className="mx-1 mb-3 text-lg hover:gray-600"
        >
          Clear &times;
        </button>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex items-center w-full h-10 bg-gray-100 rounded-lg">
            <input
              type="text"
              list="products"
              placeholder="Search by brand or name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-full px-3 bg-transparent outline-none"
              onKeyDown={(e) => handleKeyPress(e, () => setSearch(searchValue))}
            />
            <datalist id="products">
              {searchedData?.products.slice(0, 8).map((item, i) => (
                <option key={i} value={item.name}>{item.category}</option>
              ))}
            </datalist>
            <button
              className="h-full text-gray-600 px-3 bg-gray-200 rounded-r-lg"
              onClick={() => { setSearch(searchValue); setPage(1); }}
            >
              <FaSearch size={"1.2rem"} />
            </button>
          </div>

          {/* Sort and Filter Options */}
          <div className="flex max-lg:flex-wrap gap-2">
            <select
              className="h-10 px-3 bg-gray-100 rounded-lg"
              value={`${sortField}|${sort}`}
              onChange={handleSortChange}
            >
              <option value="">Sort</option>
              <option value="price|asc">Price (Low to High)</option>
              <option value="price|desc">Price (High to Low)</option>
              <option value="sold|desc">Best-Selling</option>
              <option value="createdAt|desc">Latest</option>
              <option value="ratings|desc">Most-Rated</option>
              <option value="ratings|asc">Less-Rated</option>
            </select>
            <select
              className="h-10 px-3 bg-gray-100 rounded-lg"
              value={size}
              onChange={handleSizeChange}
            >
              <option value="">Sizes</option>
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
              <option value="xl">Extra Large</option>
              <option value="xxl">XxL</option>
              <option value="">None</option>

            </select> 
            <select
              className="h-10 px-3 bg-gray-100 rounded-lg"
              value={color}
              onChange={handleColorChange}
            >
              <option value="">Colors</option>
              <option value="white">white</option>
              <option value="blue">blue</option>
              <option value="red">red</option>
              <option value="yellow">yellow</option>
              <option value="black">black</option>
              <option value="green">green</option>
              <option value="">None</option>
            </select>
            <select
              className="h-10 px-3 bg-gray-100 rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">ALL</option>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>{i.toUpperCase()}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Max Price Filter */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <h4 className="text-sm sm:text-lg">Max Price: {maxPriceValue}</h4>
          <input
            type="range"
            min={1}
            max={DEFAULT_MAX_PRICE}
            value={maxPriceValue}
            onKeyDown={(e) => handleKeyPress(e, () => setMaxPrice(maxPriceValue))}
            onChange={(e) => setMaxPriceValue(Number(e.target.value))}
            className="w-60 h-4"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setMaxPrice(maxPriceValue)}
          >
            Go
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-6">
          {search && `Results for "${search}"`}
        </h1>

        {/* Product Section */}
        <main className="flex flex-col items-center">
        {loading || productLoading &&<Loader1/>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {!loading || !productLoading && searchedData?.products.length ? (
              searchedData?.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-2xl font-bold col-span-full text-center">No products found</p>
            )}
          </div>

          {searchedData && searchedData?.totalPage > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button
                disabled={page <= 1}
                onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}
                className={`px-4 py-2 ${page > 1 ? 'bg-violet-500' : 'bg-gray-400'} text-white rounded mr-2`}
              >
                Prev
              </button>
              <span className="text-base">{page} of {searchedData.totalPage}</span>
              <button
                disabled={page >= searchedData.totalPage}
                onClick={() => { setPage(page + 1); window.scrollTo(0, 0); }}

                className={`px-4 py-2 ${page < searchedData.totalPage ? 'bg-violet-500' : 'bg-gray-400'} text-white rounded ml-2`}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Search;
