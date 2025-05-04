import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { pageTitle } from '../utils/features';

type BannerProps = {
  text?: string;
  heading?: string;
  textColor?: string;
  btnText?: string;
  textPositionV?: 'center' | 'end' | 'start';
  textPositionH?: 'center' | 'end' | 'start';
  imgUrl: string;
  shade?: string;
  link?: string;
};

const Banner = ({
  imgUrl,
  text,
  textPositionH = 'center',
  textPositionV = 'center',
  textColor = 'white',
  heading,
  btnText,
  shade,
  link
}: BannerProps) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full py-4 sm:py-12 h-[300px] sm:h-[400px] md:h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: shade && `linear-gradient(to bottom, ${shade} 0%, transparent 100%)`
        }}
      ></div>

      <div
        ref={textRef}
        style={{
          color: textColor,
          justifyContent: textPositionV,
          alignItems: textPositionH
        }}
        className="relative z-5 flex flex-col h-full text-center px-6 md:px-12 lg:px-24"
      >
        <h1
          style={{ textAlign: textPositionH }}

          className={`text-3xl sm:text-5xl font-bold mb-6 leading-tight transition-opacity duration-700 ease-out
            ${isVisible ? 'opacity-100 animate-fadeIn delay-[100ms]' : 'opacity-0'}`}
        >
          {heading}
        </h1>

        <p
          style={{ textAlign: textPositionH }}
          className={`text-2xl sm:text-3xl mb-10 font-semibold max-md:hidden transition-opacity duration-700 ease-out
            ${isVisible ? 'opacity-100 anismate-fadeIn delay-[300ms]' : 'opacity-0'}`}
        >
          {text}
        </p>

        {btnText && !link && (
          <button
            onClick={() => window.scroll(0, 700)}
            className={`${isVisible
              ? 'opacity-100 animatse-fadeIn delay-[500ms]'
              : 'opacity-0'
              } bg-white text-black font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out`}
          >
            {btnText}
          </button>
        )}

        {link && (
          <Link title={pageTitle(link).replace('Collections', '') + ' Collection'} to={link}>
            <div
              className={`${isVisible
                ? 'opacity-100 animaste-fadeIn delay-[500ms]'
                : 'opacity-0'
                } bg-white max-sm:text-center  text-black font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out`}
            >
              {btnText || 'Shop Now'}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;
