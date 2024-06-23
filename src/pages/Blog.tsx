import BlogPostList from "../components/BLogPostList";
import Services from "../components/Services";
import Footer from "../components/Footer";


const Blog = () => {
    return (
        <>
            <div>
                <div className="relative w-full h-[300px]  sm:h-[400px] md:h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("https://figma-to-code-ecom-design.vercel.app/rectangle-13@2x.png")' }}>
                    <div className="absolute inset-0 to-transparent opacity-60"></div>
                    <div className="relative z-5 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12 lg:px-24">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                            Blog
                        </h1>
                        <p className="text-2xl sm:text-3xl mb-10 font-semibold">
                            Discover and Explore our latest blogs.
                        </p>
                        <button onClick={()=>window.scroll(0,700)} className="bg-white text-black font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            Discover
                        </button>
                    </div>
                </div>
                <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
                    <section className="self-stretch bg-white flex flex-col items-center justify-start pt-[2rem] pb-[0rem] pr-[1.437rem] pl-[1.25rem] box-border gap-[3.375rem] max-w-full mq800:gap-[1.688rem] mq800:pt-[1.438rem] mq800:box-border mq1350:pt-[2.25rem] mq1350:box-border">
                        <div id="post" className="w-[90rem] h-[169.375rem] relative bg-white hidden max-w-full" />
                        <BlogPostList />
                    </section>
                </div>
            </div>
            <Services />
            <Footer />
        </>
    );
};

export default Blog;