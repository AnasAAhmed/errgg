import { Link } from "react-router-dom";
const BlogSection = () => {
    return (
      <section className="flex flex-col items-center justify-center pt-14 px-5 pb-13 gap-16 max-w-full text-left text-2xl text-black font-poppins">
        <div className="w-full flex flex-col items-center justify-center text-center gap-3">
          <h1 className="text-3xl font-medium">Our Blogs</h1>
          <p className="text-gray-500">Find a bright idea to suit your taste with our great selection</p>
        </div>
        <div className="w-full flex flex-wrap items-start justify-center gap-8">
          <GroupComponent3 blogCardImage="https://figma-to-code-ecom-design.vercel.app/rectangle-13@2x.png" />
          <GroupComponent3 blogCardImage="https://figma-to-code-ecom-design.vercel.app/rectangle-14@2x.png" />
          <GroupComponent3 blogCardImage="https://figma-to-code-ecom-design.vercel.app/rectangle-15@2x.png" />
        </div>
        <div className="flex flex-col items-center">
          <Link to="/blog" className="text-lg font-medium" onClick={()=>window.scroll(0,0)}>View All Posts</Link>
          <div className="border-t-2 border-black w-16 mt-2"></div>
        </div>
      </section>
    );
  };

  export type GroupComponent3Type = {
    blogCardImage?: string;
  };
  
  const GroupComponent3 = ({ blogCardImage }: GroupComponent3Type) => {
    return (
      <div className="flex flex-col items-start justify-start gap-8  max-w-full text-left text-lg text-black font-poppins">
        <img
          className="self-stretch h-96 relative rounded-md max-w-full object-cover"
          loading="lazy"
          alt="Blog"
          src={blogCardImage}
        />
        <div className="self-stretch flex flex-col items-start justify-start p-4 box-border max-w-full">
          <div className="text-xl">Going all-in with millennial design</div>
          <Link to='/blog' className="text-2xl font-medium" onClick={()=>window.scroll(0,0)}>Read More</Link>
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex items-center gap-2">
              <img className="w-4 h-4" alt="icon" src="https://figma-to-code-ecom-design.vercel.app/group.svg" />
              <span className="font-light">5 min</span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-4 h-4" alt="calendar" src="https://figma-to-code-ecom-design.vercel.app/uilcalender.svg" />
              <span className="font-light">12<sup>th</sup> Oct 2022</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default BlogSection