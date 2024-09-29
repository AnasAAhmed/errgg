import { Link } from 'react-router-dom'

type BannerProps = {
  text?: string;
  heading?: string;
  imgUrl: string
  shade?: string
  link: string
}

const Banner = ({ imgUrl, text, heading, shade, link }: BannerProps) => {
  return (
    <div className="relative w-full h-[300px]  sm:h-[400px] md:h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }}>
      <div className={`absolute inset-0  opacity-60`}
        style={{ background: shade && `linear-gradient(to bottom, ${shade} 0%, transparent 100%)` }}>
      </div>
      <div className="relative z-5 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12 lg:px-24">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
          {heading}
        </h1>
        <p className="text-2xl sm:text-3xl mb-10 font-semibold max-xsm:hidden">
          {text}
        </p>
        <Link to={link}>
          <div className="bg-white text-black font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            Shop Now
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Banner
