import { useRef, useState, MouseEvent } from 'react';

interface ImageZoomProps {
    src: string;
    alt: string;
}

const ImageZoom = ({ src, alt }: ImageZoomProps) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = () => setIsZoomed(true);
    const handleMouseLeave = () => setIsZoomed(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (imgRef.current && isZoomed) {
            const { left, top, width, height } = imgRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setBackgroundPosition(`${x}% ${y}%`);
        }
    };
    const formattedSrc = src.replace(/\\/g, '/');
    

    return (
        <div
            className="relative w-full md:h-[400px] h-[250px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {isZoomed &&
                <div
                    className={`absolute top-0 left-0 w-full md:h-[400px] h-[250px] bg-no-repeat transition-transform duration-300 `}
                    style={{
                        backgroundImage: `url(${formattedSrc})`,
                        backgroundPosition: isZoomed ? backgroundPosition : 'center',
                    }}
                />}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className={`absolute top-0 left-0 w-full md:h-[400px] h-[250px] ${isZoomed ? 'opacity-0 ' : 'opacity-100'}`}
            />
        </div>

    );
};

export default ImageZoom;
