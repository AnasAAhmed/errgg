import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import heroImg from '../assets/Ecommerce.png'
import SummerImg from '../assets/banner2.png'
import CollectionsList from "../components/CollectionsList";
import RelatedProducts from "../components/RelatedProducts";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
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
      <div className="">
        <section className="bg-center bg-cover ">
          <Carousel
            showArrows={false}
            showIndicators={true}
            showStatus={false}
            showThumbs={false}
            interval={2000}
            infiniteLoop={true}
            autoPlay={true}

          >
            <Banner
              heading="Elevate Your Style"
              text=" Discover the latest trends in fashion with our new collection."
              imgUrl={heroImg}
              shade="gray"
              link="/search"
            />
            <Banner
              heading="Summer Collection 2024"
              text="Embrace the warmth with our stylish and comfortable summer wear "
              imgUrl={SummerImg}
              shade="gray"
              link="/collections/summer"
            />
            <Banner
              heading="Tech Heaven 2024"
              text="Premium quality tech at unbeatable prices."
              imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxOruz0L6Y-Zn_Wt-ifVGR5aqKXSpZZg0HA&s"
              shade="gray"
              link='/collections/tech Heaven'
            />
          </Carousel>
        </section>
        <CollectionsList />
        <h1 className="text-4xl my-8 flex items-center justify-center">Latest Products</h1>
        <div className="flex flex-col items-center sm:gap-10 py-8 px-2 sm:px-5">
          {isLoading ? (
            <div className="flex items-center justify-center h-[30rem]">
              <FaSpinner className="animate-spin h-28 w-28 text-gray-500" />
            </div>
          ) : (
            <div className="md:flex md:flex-wrap grid grid-cols-2 justify-center gap-4 md:gap-16 ">
              {!data?.products || data?.products.length === 0 ? (
                <p className="font-bold text-4xl h-[260px]">No products found</p>
              ) : (
                data?.products.map((i) => (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    price={i.price}
                    photo={i.photos[0]}
                    numOfReviews={i.numOfReviews}
                    ratings={i.ratings}
                    cutPrice={i.cutPrice}
                    sold={i.sold}
                  />
                ))
              )}
            </div>
          )}
        </div>
        <h1 className="text-2xl my-6 flex items-center justify-center">
          <Link to="/search" >
            More
          </Link>
        </h1>
        
        <Banner
          imgUrl="https://img.freepik.com/premium-vector/flat-design-realistic-banner-template_23-2150102691.jpg?w=740"
          link="/search/laptop"
          shade="white"
        />
        <div className="flex flex-col mt-14 items-center">
          {/* if category empty it'll fetch top selling products */}
          <RelatedProducts category={''} heading="Top selling products" />
        </div>
        <BlogSection/>
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default Home;
