import { useLatestCategoryProductsQuery } from '../redux/api/productAPI';
import ProductCard from './product-card';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

type CategoryProductsProps = {
  category: string;
  heading?: string;
  filteredProductId?: string;
};

const RelatedProducts = ({ category, heading, filteredProductId }: CategoryProductsProps) => {
  const { data, isLoading, isError } = useLatestCategoryProductsQuery({ category: category }); // Pass the category name

  if (isError) return <div>Error: Cannot Fetch the Products</div>;

  const filteredProducts = data?.products.filter(product => product._id !== filteredProductId)

  return (
    <div>
      <h1 className='text-4xl mb-12 flex items-center justify-center'>{heading}</h1>
      <div className="flex flex-col items-center sm:gap-10 py-8 px-2 sm:px-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-[30rem]">
            <FaSpinner className="animate-spin h-28 w-28 text-gray-500" />
          </div>
        ) : (
          <main className='md:flex md:flex-wrap grid grid-cols-2 justify-center gap-4 md:gap-16'>
            {filteredProducts?.length === 0 || data?.products.length === 0 ? (
              <p className="font-bold text-4xl h-[260px]">No Related products found</p>
            ) : (
              filteredProducts?.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  photo={product.photos[0]}
                  numOfReviews={product.numOfReviews}
                  ratings={product.ratings}
                  cutPrice={product.cutPrice}
                  size={product.size ? product.size[1] : ""}
                  color={product.color ? product.color[1] : ""}
                  stock={product.stock}
                />
              ))
            )}
          </main>
        )}
      </div>
      {heading && (
        <h1 className='text-2xl my-6 flex items-center justify-center'>
          <Link to={`/search/${category}`} onClick={() => window.scrollTo(0, 0)}>
            More
          </Link>
        </h1>

      )}
    </div>
  );
};

export default RelatedProducts;