import { useEffect, useState } from "react";

const Loader = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Also handle long load (e.g., server warming up)
    const timeout = setTimeout(() => {
      if (!navigator.onLine) {
        setIsOffline(true);
      } else {
        setHasTimedOut(true);
      }
    }, 20000); // 20 seconds fallback for connection/server issues

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="min-h-[90vh] gap-3 flex flex-col justify-center items-center text-center px-4">
      {!isOffline && <section className="loader flex flex-col justify-center items-center text-center px-4">
        <div></div>
      </section>}

      <span className="text-xl font-semibold mb-4">
        {isOffline ? "No internet connection" : "Warming up..."}
      </span>

      <p className="max-w-md text-sm text-gray-500">
        {isOffline
          ? "Please check your internet connection and try again."
          : hasTimedOut
            ? "This might be taking longer than usual. The server could be cold or there's a network issue."
            : "This project is hosted on Render's free tier, which puts the server to sleep after a minute of inactivity. It may take up to 1 minute to wake up — thank you for your patience!"}
      </p>
    </main>
  );
};

export default Loader;

export const Loader1=()=>{
  const [isOffline, setIsOffline] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Also handle long load (e.g., server warming up)
    const timeout = setTimeout(() => {
      if (!navigator.onLine) {
        setIsOffline(true);
      } else {
        setHasTimedOut(true);
      }
    }, 20000); // 20 seconds fallback for connection/server issues

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <main className="min-h-[30vh] gap-3 flex flex-col justify-center items-center text-center px-4">
      {!isOffline && <section className="loader flex flex-col justify-center items-center text-center px-4">
        <div></div>
      </section>}

      <span className="text-xl font-semibold mb-4">
        {isOffline ? "No internet connection" : "Warming up..."}
      </span>

      <p className="max-w-md text-sm text-gray-500">
        {isOffline
          ? "Please check your internet connection and try again."
          : hasTimedOut
            ? "This might be taking longer than usual. The server could be cold or there's a network issue."
            : "This project is hosted on Render's free tier, which puts the server to sleep after a minute of inactivity. It may take up to 1 minute to wake up — thank you for your patience!"}
      </p>
    </main>
  );
}

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeletions = Array.from({ length }, (_, idx) => (
    <div key={idx} className="h-20 my-2 w-full bg-gray-200 animate-pulse"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width: width }}>
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
export function DashboardSkeleton() {
  return (
    <div className="dashboard-loader animate-pulse py-8 space-y-16 overflow-y-auto">
  {/* Top Widgets */}
  <div className="flex flex-wrap justify-between gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="h-36 w-56 bg-gray-200 rounded-lg shadow" />
    ))}
  </div>

  {/* Graphs Section */}
  <div className="flex flex-wrap gap-6">
    <div className="h-80 flex-1 bg-gray-200 rounded-lg" />
    <div className="h-80 w-64 bg-gray-200 rounded-lg" />
  </div>

  {/* Bottom Section */}
  <div className="flex flex-wrap gap-6">
    <div className="h-80 w-80 bg-gray-200 rounded-lg" />
    <div className="h-80 flex-1 bg-gray-200 rounded-lg" />
  </div>
</div>

  );
}
