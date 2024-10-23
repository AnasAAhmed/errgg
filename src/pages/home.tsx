import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import CollectionsList from "../components/CollectionsList";
import RelatedProducts from "../components/RelatedProducts";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { FaSpinner } from "react-icons/fa";
import Banner from "../components/Banner";
import BlogSection from "../components/BlogSection";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      <div>
        <section className="relative">
          <Carousel
            showArrows={false}
            showIndicators={true}
            showStatus={false}
            showThumbs={false}
            interval={3000}
            infiniteLoop={true}
            autoPlay={true}
          >
            <Banner
              heading="Gift Collection"
              text="Embrace the warmth with gift collection"
              imgUrl="https://www.next.co.uk/nxtcms/resource/blob/6139514/32061ca88062e4ed271cce514bbf0cde/130624-hero-gifts-dt-data.jpg"
              link="/collections/gift"
              shade="black"
            />
            <Banner
              heading="Elevate Your Gaming"
              text="Discover the latest gaming accessories in our new collection."
              imgUrl="https://res.cloudinary.com/dj5q966nb/image/upload/v1719253433/ticeufjqvf6napjhdiee.png"
              link="/search/accessories"
              shade="black"
            />
            <Banner
              heading="Cosmetics Heaven 2024"
              text="Premium quality beauty products at unbeatable prices."
              imgUrl="https://www.next.co.uk/nxtcms/resource/blob/6292750/0aad3fee48413abd53f667d285bf3b42/260924-hero-beauty-dt-data.jpg"
              link="/collections/cosmetics"
              shade=""
            />
          </Carousel>
        </section>

        <section className="py-2 px-4 sm:px-10">
          <CollectionsList />
        </section>

        <section className="py-10">
          <h1 className="text-3xl font-semibold text-center mb-8">Latest Products</h1>
          <div className="flex flex-col items-center py-8 px-2 sm:px-5">
            {isLoading ? (
              <div className="flex items-center justify-center h-[30rem]">
                <FaSpinner className="animate-spin h-28 w-28 text-gray-500" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-12">
                {!data?.products || data?.products.length === 0 ? (
                  <p className="font-bold text-2xl h-[260px]">No products found</p>
                ) : (
                  data?.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </div>
            )}
          </div>
          <div className="text-center">
            <Link to="/search" className="text-blue-500 font-medium hover:underline">
              View More Products
            </Link>
          </div>
        </section>

        <section className="my-10">
          <Banner
            imgUrl="https://www.next.co.uk/nxtcms/resource/blob/6268504/4c85a5e35de4844844702816284c4568/11-09-24-hero-home-dt-min-data.jpg"
            link="/search/furniture"
            heading="Furniture Collection"
            text="Coming Soon"
            shade=""
          />
        </section>
        <section className="py-14">
          <RelatedProducts category={''} heading="Top Selling Products" />
        </section>

        <section className="py-14">
          <BlogSection />
        </section>

        <section className="py-14 bg-white">
          <Services />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
