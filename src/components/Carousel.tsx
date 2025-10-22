import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (infinite) {
      setIndex(prev => (prev + step) % images.length);
    } else if (index < images.length - frameSize) {
      setIndex(prev => Math.min(prev + step, images.length - frameSize));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setIndex(prev => (prev - step + images.length) % images.length);
    } else if (index > 0) {
      setIndex(prev => Math.max(prev - step, 0));
    }
  };

  const offset = -index * itemWidth;

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        onClick={handlePrev}
        disabled={!infinite && index === 0}
      >
        ⏪
      </button>

      <div
        className="Carousel__viewport"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${images.length * itemWidth}px`,
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((src, i) => (
            <li
              key={i}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                width={itemWidth}
                height={itemWidth}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        className="Carousel__button Carousel__button--next"
        onClick={handleNext}
        disabled={!infinite && index >= images.length - frameSize}
      >
        ⏩
      </button>
    </div>
  );
};

export default Carousel;
