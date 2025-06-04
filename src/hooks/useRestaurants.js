// src/hooks/useRestaurants.js
import { useEffect, useState, useCallback } from 'react';
import { useGetResturantMutation } from '../redux/services/resturantApi';
const useRestaurants = (token, search, limit = 10) => {
  const [getRestaurant, { isLoading }] = useGetResturantMutation();
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchRestaurants = useCallback(
    async (reset = false) => {
      try {
        setError(null);
        const response = await getRestaurant({
          userToken: token,
          search,
          cuisine: '',
          location: '',
          rating: '',
          page,
          limit,
        }).unwrap();

        const newRestaurants = response?.data || [];
        setRestaurants(prev =>
          reset ? newRestaurants : [...prev, ...newRestaurants]
        );
        setHasMore(newRestaurants.length === limit);
      } catch (err) {
        setError('Failed to load restaurants. Please try again.');
      } finally {
        setIsFetchingMore(false);
      }
    },
    [getRestaurant, token, search, page, limit]
  );

  useEffect(() => {
    setPage(1);
    fetchRestaurants(true);
  }, [search]);

  useEffect(() => {
    if (page > 1) fetchRestaurants();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore && !isLoading) {
      setIsFetchingMore(true);
      setPage(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchRestaurants(page === 1); // retry current page
  };

  return {
    restaurants,
    isLoading,
    error,
    isFetchingMore,
    handleLoadMore,
    handleRetry,
  };
};

export default useRestaurants;
