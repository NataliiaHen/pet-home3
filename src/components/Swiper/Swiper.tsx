import './Swiper.scss';
import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import {
  Grid, Keyboard, Navigation,
} from 'swiper/modules';
import 'swiper/swiper-bundle.min.css';
import { Pet } from '../../types/Pet';
import { PetCard } from '../PetCard';
import { ButtonMove } from '../ButtonMove';

type Props = {
  pets: Pet[];
};

export const CardSwiper: React.FC<Props> = ({ pets }) => {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.destroy();
    }

    swiperRef.current = new Swiper('.image-swiper', {
      direction: 'horizontal',
      modules: [Navigation, Grid, Keyboard],
      navigation: {
        prevEl: '.button-move--left',
        nextEl: '.button-move--right',
      },
      centeredSlides: false,
      grabCursor: true,
      slidesPerView: 4.5,
      spaceBetween: 24,
      watchOverflow: true,
      keyboard: {
        enabled: true,
        pageUpDown: true,
      },
      breakpoints: {
        320: {
          direction: 'horizontal',
          slidesPerView: 1,
          spaceBetween: 16,
          grid: {
            rows: 4,
            fill: 'row',
          },
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 12,
          direction: 'horizontal',
          grid: {
            rows: 2,
          },
        },
        1024: {
          slidesPerView: 3.3,
          slidesPerGroup: 3,
          spaceBetween: 20,
          direction: 'horizontal',
          grid: {
            rows: 1,
          },
        },
        1440: {
          slidesPerView: 4.4,
          slidesPerGroup: 4,
          spaceBetween: 24,
          direction: 'horizontal',
          grid: {
            rows: 1,
          },
        },
      },
    });

    swiperRef.current.slideTo(0);
  }, [pets]);

  return (
    <div className="swiper-component">
      <div className="swiper">
        <div className="image-swiper swiper-container">
          <div className="image-swiper__wrapper swiper-wrapper">
            {pets.map(pet => (
              <div
                key={pet.id}
                className="swiper-slide"
              >
                <PetCard
                  pet={pet}
                />
              </div>
            ))}
          </div>

          {pets.length && (
            <div className="image-swiper__buttons">
              <ButtonMove
                direction="left"
                size="big"
              />

              <ButtonMove
                direction="right"
                size="big"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
