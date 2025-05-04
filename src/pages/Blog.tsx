import BlogPostList from "../components/BLogPostList";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Banner from "../components/Banner";


const Blog = () => {
    return (
        <>
            <div>
                <Banner
                    imgUrl="/blog5.avif"
                    heading="Blog"
                    text=" Discover and Explore our latest blogs."
                    // textPositionH="center"
                    // textPositionV="end"
                    btnText="Discover"
                    shade=""
                />
               
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