import React from 'react';
import './HomePage.scss';
import { Baner } from '../../components/Baner';
import { Services } from '../../components/Services';
import { GivePet } from '../../components/GivePet';
import { QuestionForm } from '../../components/QuestionForm';
import { PetsCarousel } from '../../components/PetsCarousel';
import { Loader } from '../../components/Loader';
import { useGetPetsQuery } from '../../api/apiSlice';
import { Pet } from '../../types/Pet';

export const HomePage: React.FC = () => {
  const {
    data: petsData,
    isLoading: petsLoading,
  } = useGetPetsQuery({ size: 10 });
  const pets = petsData?.content || [] as Pet[];

  return (
    <div className="home-page">
      <Baner />
      <Services />
      <GivePet />
      {pets.length > 0 && (
        <PetsCarousel
          pets={pets}
        />
      )}
      <QuestionForm
        key="home-page"
      />
      {petsLoading && (
        <Loader />
      )}
    </div>
  );
};
