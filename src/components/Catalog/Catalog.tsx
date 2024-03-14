import './Catalog.scss';
import React, { memo, useMemo } from 'react';
import { Pet } from '../../types/Pet';
import { PetsList } from '../PetsList';
import { Pagination } from '../Pagination';

type Props = {
  pets: Pet[],
  itemsPerPage: number,
  petsCount: number,
  handlePageChange: (selected: number) => void,
};

export const Catalog: React.FC<Props> = memo(({
  pets, petsCount, itemsPerPage, handlePageChange,
}) => {
  const pageCount = useMemo(() => {
    return Math.ceil(petsCount / itemsPerPage);
  }, [petsCount, itemsPerPage]);

  return (
    <div className="catalog">
      <PetsList pets={pets} />

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
});
