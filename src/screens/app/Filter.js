import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import {
  useGetCuisinesMutation,
  useGetSpecificResturantMutation,
  useGetLocationsMutation,
} from '../../redux/services/resturantApi';
import { useSelector } from 'react-redux';

import { CustomFlatList,HomeCard,CustomDropdown } from '../../components';

const FilterScreen = () => {
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('');
  const [cuisineList, setCuisineList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);

  // Pagination for cuisines and locations
  const [cuisinePage, setCuisinePage] = useState(1);
  const [cuisineTotalPages, setCuisineTotalPages] = useState(1);
  const [locationPage, setLocationPage] = useState(1);
  const [locationTotalPages, setLocationTotalPages] = useState(1);

  // Pagination for restaurants
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = useSelector((state) => state.user.token);

  // API hooks
  const [
    getCuisines,
    { data: cuisinesData, isLoading: loadingCuisines, error: errorCuisines },
  ] = useGetCuisinesMutation();

  const [
    getLocations,
    { data: locationsData, isLoading: loadingLocations, error: errorLocations },
  ] = useGetLocationsMutation();

  const [
    getRestaurant,
    { data: restaurantsData, isLoading: loadingRestaurants, error: errorRestaurants },
  ] = useGetSpecificResturantMutation();

  // Load cuisines and locations on mount or token change
  useEffect(() => {
    if (token) {
      setCuisinePage(1);
      setLocationPage(1);
      getCuisines({ userToken: token, page: 1, limit: 10 });
      getLocations({ userToken: token, page: 1, limit: 10 });
    }
  }, [token]);

  // Handle cuisines data update (append if page > 1)
  useEffect(() => {
    if (cuisinesData?.success && Array.isArray(cuisinesData.data)) {
      if (cuisinePage === 1) {
        setCuisineList(cuisinesData.data);
      } else {
        setCuisineList((prev) => [...prev, ...cuisinesData.data]);
      }
      setCuisineTotalPages(cuisinesData.totalPages || 1);
    }
    if (errorCuisines) {
      Alert.alert('Error', errorCuisines?.data?.message || 'Failed to load cuisines');
    }
  }, [cuisinesData, errorCuisines]);

  // Handle locations data update (append if page > 1)
  useEffect(() => {
    if (locationsData?.success && Array.isArray(locationsData.data)) {
      if (locationPage === 1) {
        setLocationList(locationsData.data);
      } else {
        setLocationList((prev) => [...prev, ...locationsData.data]);
      }
      setLocationTotalPages(locationsData.totalPages || 1);
    }
    if (errorLocations) {
      Alert.alert('Error', errorLocations?.data?.message || 'Failed to load locations');
    }
  }, [locationsData, errorLocations]);

  // When cuisine or location changes, reset page and restaurant list, and fetch
  useEffect(() => {
    if ((cuisine || location) && token) {
      setPage(1);
      setRestaurantList([]);
      fetchRestaurants(1, cuisine, location);
    } else {
      setRestaurantList([]);
      setPage(1);
      setTotalPages(1);
    }
  }, [cuisine, location, token]);

  // Update restaurant list when data changes
  useEffect(() => {
    if (restaurantsData?.success && Array.isArray(restaurantsData.data)) {
      if (page === 1) {
        setRestaurantList(restaurantsData.data);
      } else {
        setRestaurantList((prev) => [...prev, ...restaurantsData.data]);
      }
      setTotalPages(restaurantsData.totalPages || 1);
    }
    if (errorRestaurants) {
      Alert.alert('Error', errorRestaurants?.data?.message || 'Failed to load restaurants');
    }
  }, [restaurantsData, errorRestaurants]);

  // Fetch restaurants API call
  const fetchRestaurants = (pageNumber, selectedCuisine, selectedLocation) => {
    getRestaurant({
      userToken: token,
      cuisine: selectedCuisine || '',
      location: selectedLocation || '',
      page: pageNumber,
      limit: 10,
    });
  };

  // Load more restaurants for pagination
  const handleLoadMore = () => {
    if (!loadingRestaurants && page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRestaurants(nextPage, cuisine, location);
    }
  };

  // Load more cuisines for dropdown pagination
  const loadMoreCuisines = () => {
    if (cuisinePage < cuisineTotalPages && !loadingCuisines) {
      const nextPage = cuisinePage + 1;
      setCuisinePage(nextPage);
      getCuisines({ userToken: token, page: nextPage, limit: 10 });
    }
  };

  // Load more locations for dropdown pagination
  const loadMoreLocations = () => {
    if (locationPage < locationTotalPages && !loadingLocations) {
      const nextPage = locationPage + 1;
      setLocationPage(nextPage);
      getLocations({ userToken: token, page: nextPage, limit: 10 });
    }
  };

  // Show empty list message depending on selected filters
  const renderEmptyComponent = () => {
    if (!cuisine && !location) {
      return <Text style={styles.message}>Please select a cuisine or location to see restaurants.</Text>;
    }
    if (!loadingRestaurants && restaurantList.length === 0) {
      return <Text style={styles.message}>No restaurants found for the selected filter.</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {(loadingCuisines && cuisinePage === 1) || (loadingLocations && locationPage === 1) ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <CustomDropdown
            label="Cuisine"
            data={cuisineList}
            selectedValue={cuisine}
            onSelect={(selectedCuisine) => {
              setCuisine(selectedCuisine);
              setLocation(''); // reset location when cuisine selected
              // Reset pagination for cuisines and locations if needed
              setCuisinePage(1);
              setLocationPage(1);
              setLocationList([]);
              getLocations({ userToken: token, page: 1, limit: 10 });
            }}
            placeholder="Select a cuisine"
            onEndReached={loadMoreCuisines}
            onEndReachedThreshold={0.5}
          />

          <CustomDropdown
            label="Location"
            data={locationList}
            selectedValue={location}
            onSelect={(selectedLocation) => {
              setLocation(selectedLocation);
              setCuisine(''); // reset cuisine when location selected
              // Reset pagination for locations and cuisines if needed
              setLocationPage(1);
              setCuisinePage(1);
              setCuisineList([]);
              getCuisines({ userToken: token, page: 1, limit: 10 });
            }}
            placeholder="Select a location"
            style={{ marginTop: 10 }}
            onEndReached={loadMoreLocations}
            onEndReachedThreshold={0.5}
          />
        </>
      )}

      {loadingRestaurants && page === 1 ? (
        <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }} />
      ) : (
        <CustomFlatList
          data={restaurantList}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <HomeCard
              cuisine={item.cuisine}
              location={item.location}
              rating={item.rating}
              name={item.name}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingRestaurants && page > 1 ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : null
          }
          ListEmptyComponent={renderEmptyComponent}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
