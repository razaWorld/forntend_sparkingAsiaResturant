import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator,Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetResturantMutation } from '../../redux/services/resturantApi';
import { HomeCard, CustomSearchBar, CustomFlatList,HomeHeader } from '../../components';
import { AppColors } from '../../utils/DesignSystem';
import { SearchSvg } from '../../assets/svgs/svg';
import ScreenNames from '../../routes/routes';
import {logout } from '../../redux/slices/user';
import { useDispatch } from 'react-redux';
const Home = ({navigation}) => {
  const token = useSelector((state) => state.user.token);
  const [getRestaurant, { isLoading }] = useGetResturantMutation();
  const dispatch=useDispatch()
  const onLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
        
            dispatch(logout())          // clear redux auth state
            navigation.replace(ScreenNames.LOGIN); // go to login screen
          },
        },
      ],
      { cancelable: true }
    );
  };
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Fetch restaurants
  const fetchRestaurants = useCallback(
    async (reset = false) => {
      try {
        setError(null); // Clear previous error

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
    if (page > 1) {
      fetchRestaurants();
    }
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

  return (
    <View style={styles.container}>
      <HomeHeader onLogout={onLogout}/>
      <CustomSearchBar
        placeholder="Search name,cousine"
        onChangeText={setSearch}
        value={search}
        leftIcon={SearchSvg}
      />
     

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CustomFlatList
          data={restaurants}
          renderItem={({ item }) => (
            <HomeCard
              name={item.name}
              cuisine={item.cuisine}
              location={item.location}
              rating={item.rating}
            />
          )}
          keyExtractor={(item) => item._id}
          loading={isLoading && page === 1}
          onEndReached={handleLoadMore}
          refreshing={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={<Text style={styles.noResults}>No restaurants found.</Text>}
          ListFooterComponent={
            isFetchingMore ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={AppColors.blue} />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: AppColors.white,
  },
  noResults: {
    textAlign: 'center',
    color: AppColors.black,
    fontSize: 16,
    paddingVertical: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
