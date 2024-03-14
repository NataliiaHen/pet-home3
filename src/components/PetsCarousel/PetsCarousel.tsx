import './PetsCarousel.scss';
import React, { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { CardSwiper } from '../Swiper';
import { Pet } from '../../types/Pet';
import { Container } from '../Container';
import { getRandomArray } from '../../helpers/getRandomArray';
import { Loader } from '../Loader';

type Props = {
  pets: Pet[];
  favoritePets?: Pet[];
  petShowId?: number;
};

export const PetsCarousel: React.FC<Props> = memo(({
  pets, favoritePets, petShowId,
}) => {
  const { pathname } = useLocation();
  const randomPets = useMemo(() => pets
    && getRandomArray(pets, 20, favoritePets, petShowId),
  [pets, favoritePets, petShowId]);

  if (!randomPets) {
    return <Loader />;
  }

  return (
    <div className="pets-carousel">
      <Container>
        <div className="pets-carousel__top">
          {pathname === '/' ? (
            <>
              <h2 className="pets-carousel__title">
                Pick a friend
              </h2>

              <p className="pets-carousel__count">
                {`${pets.length} available`}
              </p>
            </>
          ) : (
            <h2 className="pets-carousel__title">
              They are also looking for homes
            </h2>
          )}
        </div>
      </Container>

      {pets.length > 0 && randomPets.length > 0 && (
        <CardSwiper
          pets={randomPets}
        />
      )}
    </div>
  );
});
