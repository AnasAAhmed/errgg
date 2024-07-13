
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
    <div key={idx} className="h-20 my-2 w-full bg-gray-200 animate-pulse"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width :width}}>
      {skeletions}
    </div>
  );
};


export const ProductDetailsSkeleton = () => {
  return (
    <>
     <section className="sec1 flex-1 flex-col md:flex-row flex flex-shrink-0 w-full md:w-72 mr-10 mb-10">
        <div className="flex justify-center flex-col gap-3 w-full">
          <div className="w-full h-[300px] md:h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="flex gap-2 overflow-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-20 h-20 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
      <article className="sec2 flex-1 w-full md:w-96">
        <div className="min-h-12 h-8 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-8 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-24 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-4 rounded"></div>
        <div className="flex gap-2 mb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
          ))}
        </div>
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
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

