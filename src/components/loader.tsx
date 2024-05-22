import { AiOutlineStar } from "react-icons/ai";

const Loader = () => {
  return (
    <section className="loader min-h-[90vh]">
      <div></div>
    </section>
  );
};

export default Loader;

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeletions = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletions}
    </div>
  );
};


export const ProductDetailsSkeleton = () => {
  return (
    <>
      <section className="sec1 flex-1 flex-shrink-0 w-full md:w-72 mr-10 mb-10">
        <div className="animate-pulse w-full md:h-[400px] h-[250px] bg-gray-300"></div>
      </section>
      <article className="sec2 flex-1 w-full md:w-96">
        <div className="animate-pulse mb-2 h-6 w-4/4 bg-gray-300"></div>
        <div className="animate-pulse mb-4 h-6 w-4/4 bg-gray-300"></div>
        <div className="animate-pulse flex mb-4">
          <div className="h-8 w-10 bg-gray-300 rounded-md mr-2"></div>
          <div className="h-8 w-10 bg-gray-300 rounded-md mr-2"></div>
          <div className="h-8 w-10 bg-gray-300 rounded-md mr-2"></div>
          <div className="h-8 w-10 bg-gray-300 rounded-md"></div>
        </div>
        <div className="animate-pulse flex mb-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
        </div>
        <div className="animate-pulse flex mb-4">
        <AiOutlineStar className="text-gray-300 text-[1.3rem]" />
        <AiOutlineStar className="text-gray-300 text-[1.3rem]" />
        <AiOutlineStar className="text-gray-300 text-[1.3rem]" />
        <AiOutlineStar className="text-gray-300 text-[1.3rem]" />
        <AiOutlineStar className="text-gray-300 text-[1.3rem]" />

        </div>
        <div className="animate-pulse mb-1 h-6 w-40 bg-gray-300"></div>
        <div className="animate-pulse mb-4 h-6 w-20 bg-gray-300"></div>
        <div className="animate-pulse mb-4 h-12 w-4/4 bg-gray-300"></div>
        <div className="animate-pulse mb-4 h-6 w-20 bg-gray-300"></div>
        <div className="animate-pulse h-12 w-full bg-gray-300 rounded-md"></div>
      </article>
    </>
  )
}
export const DashboardSkeleton = () => {
  return (
    <div className="admin-conftainer">
      <main className="dashboard-skeleton">
        <section className="widget-container">
          {Array.from({ length: 4 }).map((_, index) => (
            <WidgetSkeleton key={index} />
          ))}
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <div className="chart-skeleton"></div> 
          </div>

          <div className="dashboard-categories">
            <div className="categories-skeleton"></div> 
          </div>
        </section>

        <section className="transaction-container">
          <div className="gender-chart">
            <div className="gender-chart-skeleton"></div> 
          </div>
          <div className="transaction-box">
            <div className="transaction-skeleton"></div> 
          </div>
        </section>
      </main>
    </div>
  );
};

const WidgetSkeleton = () => {
  return (
    <article className="widget widget-skeleton">
      <div className="widget-info-skeleton"></div> 
      <div className="widget-circle-skeleton"></div>
    </article>
  );
};

