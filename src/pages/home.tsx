import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import heroImg from '../assets/Ecommerce.png'
import CollectionsList from "../components/CollectionsList";
import RelatedProducts from "../components/RelatedProducts";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Services from "../components/Services";
import Footer from "../components/Footer";
import { FaSpinner } from "react-icons/fa";


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
            <img src={heroImg} className="w-full h-[40vh] sm:h-[50vh] md:h-[85vh]" alt="heroImg" />
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDYCCsQ3MxbAXHCSu6cG77fLvhnakopvkFQ&s"} className="w-full h-[40vh] md:h-[85vh] sm:h-[50vh]" alt="heroImg" />
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxOruz0L6Y-Zn_Wt-ifVGR5aqKXSpZZg0HA&s"} className="w-full h-[40vh] md:h-[85vh] sm:h-[50vh]" alt="heroImg" />
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
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsX6tCdGyxoSyGCg_2ceCWrpkTs59KBEem4g&s"} className="w-full my-8 h-[30vh] md:h-[65vh] sm:h-[40vh]" alt="heroImg" />

        <div className="flex flex-col items-center">
          <RelatedProducts category={"camera"} heading="Camera's" />
        </div>
        <img src={"https://img.freepik.com/premium-vector/flat-design-realistic-banner-template_23-2150102691.jpg?w=740"} className="w-full my-8 h-[30vh] md:h-[65vh] sm:h-[40vh]" alt="heroImg" />

        <div className="flex flex-col items-center">
          <RelatedProducts category={"laptop"} heading="Laptop's" />
        </div>
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default Home;
