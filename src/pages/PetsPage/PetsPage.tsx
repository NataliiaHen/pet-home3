import './PetsPage.scss';
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useActions } from '../../app/hooks';
import { getSearchWith } from '../../helpers/searchHelpers';
import { useGetFilterPetsQuery, useGetPetsQuery } from '../../api/apiSlice';
import { NotificationStatus } from '../../types/Notification';
import { Container } from '../../components/Container';
import { Filters } from '../../components/Filters';
import { PageSizeContext } from '../../storage/PageSizeContext';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';
import { PetsList } from '../../components/PetsList';

export const CatalogPage: React.FC = () => {
  const { setNotification } = useActions();
  const { currentPageSize } = useContext(PageSizeContext);

  // SearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const emptySearchParams = new URLSearchParams();
  const age = searchParams.get('age') || '';
  const gender = searchParams.get('gender') || '';
  const location = searchParams.get('location') || '';
  const animalType = searchParams.get('animalType') || '';
  const searchData = {
    age, animalType, gender, location,
  };
  const isSearch = Object.values(searchData).some((value) => value !== '');
  const params = getSearchWith(emptySearchParams, searchData);
  // const isFiltering = Object.keys(params).length !== 0;

  // Pagination
  // const [page, setPage] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(2);

  // PetsData
  const {
    data: petsData,
    isLoading: petsLoading,
    isFetching: petsFetching,
    isError: petsLoadError,
  } = useGetPetsQuery();
  // const {
  //   data: petsData,
  //   isLoading: petsLoading,
  //   isFetching: petsFetching,
  //   isError: petsLoadError,
  // } = useGetPetsQuery({
  //   page,
  //   size: itemsPerPage,
  // });
  const pets = petsData?.content;
  // const petsCount = petsData?.totalItems;
  const {
    data: filteredPetsData,
    isLoading: filterLoading,
    isFetching: filterFetching,
  } = useGetFilterPetsQuery(
    params,
    { skip: !isSearch },
  );
  const filteredPets = filteredPetsData?.content;
  const petsForList = isSearch ? filteredPets : pets;

  if (petsLoadError) {
    setNotification({
      message: 'Something went wrong! Try later',
      color: NotificationStatus.Error,
    });
  }

  const showAllPets = () => {
    setSearchParams(undefined);
  };

  // const handlePageChange = useCallback((newPage: number) => {
  //   setPage(newPage);
  // }, []);

  // useEffect(() => {
  //   if (isLaptopSize) {
  //     setItemsPerPage(10);
  //   }

  //   if (isDesktopSize) {
  //     setItemsPerPage(9);
  //   }
  // }, [isLaptopSize, isDesktopSize]);

  if (
    petsLoading
    || filterLoading
    || petsFetching
    || filterFetching
  ) {
    return <Loader />;
  }

  return (
    <div className="catalog">
      <Container>
        {petsData && (
          <div className="catalog__content">
            <div className="catalog__top-titles">
              <h2 className="catalog__title">Pick a friend</h2>
              <p className="catalog__available-title">{`${petsForList?.length} friends available`}</p>
            </div>

            {(currentPageSize === 'LAPTOP'
              || currentPageSize === 'DESKTOP') && (
              <div className="catalog__filters">
                <Filters />
              </div>
            )}

            <div className="catalog__pets">
              {/* {petsForList && (
                <Catalog
                  pets={petsForList}
                  itemsPerPage={itemsPerPage}
                  petsCount={petsData.totalItems}
                  handlePageChange={handlePageChange}
                />
              )} */}
              {petsForList && (
                <PetsList
                  pets={petsForList}
                />
              )}

              {!petsForList?.length && isSearch
                && !petsLoading && !filterLoading && (
                <NoResults>
                  <p className="catalog__error-message">
                    Don&apos;t worry, though &ndash;
                    there are plenty more furry friends waiting for you.
                    <br />
                    Please, choose another filters or click button bellow.
                  </p>
                  <button
                    type="button"
                    onClick={showAllPets}
                    className="catalog__reset-filters"
                  >
                    Show all pets
                  </button>
                </NoResults>
              )}

              {!petsForList?.length && !petsLoading && !isSearch && (
                <NoResults>
                  <p className="catalog__error-message">
                    Thank you for considering adoption!
                    <br />
                    Keep checking back for future updates,
                    as new pets may become available.
                  </p>
                </NoResults>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
