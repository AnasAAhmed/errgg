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
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);
  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <>
      <div >
        <section className="relative">
          <Carousel
            showArrows={false}
            showIndicators={true}
            showStatus={false}
            showThumbs={false}
            interval={3000}
            // animationHandler={'fade'}
            infiniteLoop={true}
            autoPlay={true}
          >
            <Banner
              // heading="Gift Collection"
              // text="Embrace the warmth with gift collection"
              imgUrl="https://res.cloudinary.com/dvnef4cyd/image/upload/v1745933317/imaginify/vprt1ius82jfdw5yictw.jpg"
              link="/collections/summer"
              // textPositionH="end"
              textPositionV="end"
              shade=""
            />
            <Banner
              heading="Elevate Your Accessories Game"
              text="Discover the latest day-to-day accessories in our new collection."
              imgUrl="https://res.cloudinary.com/dvnef4cyd/image/upload/v1745932760/imaginify/k2b8hdz9xluixuotk8m2.jpg"
              link="/collections/accessories"
              shade="black"
            />
            <Banner
              heading="Women's Collection 2025"
              textColor="white"
              textPositionH="start"
              text="From elegant dresses to everyday basics, our women’s collection blends style, comfort, and confidence."
              imgUrl="https://res.cloudinary.com/dvnef4cyd/image/upload/v1745933152/imaginify/jdbzqxf6i6oxu6cdapv0.jpg"
              link="/collections/women"
              shade="black"
            />
          </Carousel>
        </section>

        <section className="py-2 px-4 sm:px-10">
          <CollectionsList />
        </section>

        <section ref={textRef} className="py-10">
          <h1 className={`${isVisible ? 'opacity-100 animate-fadeInUp ' : 'opacity-0'} text-3xl font-semibold text-center mb-8`}>Latest Products</h1>
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
                    <ProductCard key={product._id}  product={product} />
                  ))
                )}
              </div>
            )}
          </div>
          <div className="text-center">
            <Link to="/search" className={`${isVisible ? 'opacity-100 animate-fadeInUp ' : 'opacity-0'} text-blue-500 font-medium hover:underline`}>
              View More Products
            </Link>
          </div>
        </section>

        <section className="my-10">
          <Banner
            imgUrl="/banner.jpg"
            link="/collections/watch"
            textPositionH="center"
            textPositionV="end"
            shade=""
          />
        </section>
        <section className="py-s">
          <RelatedProducts category={''} heading="Top Selling Products" />
        </section>

        <section className="py-s8">
          <BlogSection />
        </section>

        <section className="py-s14 bg-white">
          <Services />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
