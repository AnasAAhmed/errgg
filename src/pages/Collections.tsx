import { useParams, useSearchParams } from "react-router-dom";
import { useLatestCollectionsProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import ProductCard from "../components/product-card";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { RiFilterFill } from "react-icons/ri";
import { Loader1 } from "../components/loader";


const Collections = () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [color, setColor] = useState(searchParams.get("color") || "");
    const [size, setSize] = useState(searchParams.get("size") || "");
    const [sortField, setSortField] = useState(searchParams.get("sortField") || "");
    const [maxPriceValue, setMaxPriceValue] = useState(Number(searchParams.get("price")) || 100000);
    const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("price")) || 100000);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);


    const { data, isLoading, isError } = useLatestCollectionsProductsQuery({ collection: params.collection!, page, color, size, sort, sortField ,price:maxPrice});
    const updateSearchParams = () => {
        const params = new URLSearchParams();
        if (sort) params.set("sort", sort);
        if (color) params.set("color", color);
        if (size) params.set("size", size);
        if (sortField) params.set("sortField", sortField);

        if (maxPrice !== 100000) params.set("price", maxPrice.toString());
        setSearchParams(params);
    };

    useEffect(() => {
        updateSearchParams();
        setLoading(true);
    }, [sort, sortField, maxPrice, page, color, size]);

    useEffect(() => {
        setLoading(false);
        window.scrollTo(0, 0);
    }, [data]);
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
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
        document.title = 'Search'
        setSort("");
        setSortField("");
        setColor("");
        setSize("");
        setMaxPriceValue(100000);
        setMaxPrice(100000);
        setSearchParams({});
    };
    if (isError) toast.error("Cannot Fetch the Products");

    return (
        <>
            <div className="flex items-center flex-col px-4">
                <h1 className="text-4xl mt-4 flex items-center justify-center">{params.collection!.toUpperCase()}'s</h1>
                <div className="flex flex-wrap gap-2 text-center text-2xl font-semibold mt-10 mb-3">
                    <h2> Filters <RiFilterFill className="inline-block mb-2" /></h2>
                    <button
                        onClick={clearFilters}
                        className="mx-1 mb-3 text-lg hover:gray-600"
                    >
                        Clear &times;
                    </button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
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
                        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                            <h4 className="text-sm sm:text-lg">Max Price: {maxPriceValue}</h4>
                            <input
                                type="range"
                                min={1}
                                max={100000}
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
                    </div>
                </div>
            </div>

            <div className="min-h-[100vh]">

                {loading || isLoading ? (
                    <Loader1/>
                ) : (
                    <div className="flex flex-col gap-10 py-8 px-5">
                        {!data?.productCollection || data?.productCollection.length === 0 ? (
                            <p className="font-bold text-4xl">No products found</p>
                        ) : (
                            <div className="md:flex md:flex-wrap grid grid-cols-2 justify-center gap-4 md:gap-16 ">
                                {data?.productCollection.map((i) => (
                                    <ProductCard key={i._id} product={i} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {data && data?.totalPages > 1 && (
                <div className="flex justify-center items-center mt-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}
                        className={`px-4 py-2 ${page > 1 ? 'bg-violet-500' : 'bg-gray-400'} text-white rounded mr-2`}
                    >
                        Prev
                    </button>
                    <span className="text-base">{page} of {data.totalPages}</span>
                    <button
                        disabled={page >= data.totalPages}
                        onClick={() => { setPage(page + 1); window.scrollTo(0, 0); }}

                        className={`px-4 py-2 ${page < data.totalPages ? 'bg-violet-500' : 'bg-gray-400'} text-white rounded ml-2`}
                    >
                        Next
                    </button>
                </div>
            )}
            <Footer />
        </>
    )
}

export default Collections
