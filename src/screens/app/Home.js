import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetResturantMutation } from '../../redux/services/resturantApi';
import CustomSearchBar from '../../components/global/CustomSearchBar'; // adjust path if needed

const Home = () => {
  const token = useSelector((state) => state.user.token);
  const [getRestaurant, { isLoading }] = useGetResturantMutation();

  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // 🔄 Fetch restaurants
  const fetchRestaurants = useCallback(
    async (reset = false) => {
      try {
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

        // 🔍 Check if there's more data
        setHasMore(newRestaurants.length === limit);
        setIsFetchingMore(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setIsFetchingMore(false);
      }
    },
    [getRestaurant, token, search, page, limit]
  );

  // 📦 On initial load or search change
  useEffect(() => {
    setPage(1);
    fetchRestaurants(true);
  }, [search]);

  // ⬇️ Load more when reaching end of list
  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore) {
      setIsFetchingMore(true);
      setPage(prev => prev + 1);
    }
  };

  // 📦 Fetch more when page increases
  useEffect(() => {
    if (page > 1) {
      fetchRestaurants();
    }
  }, [page]);

  return (
    <View style={styles.container}>
      <CustomSearchBar
        placeholder="Search Restaurants..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />

      {isLoading && page === 1 ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item, index) => item._id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>{item.cuisine}</Text>
              <Text style={styles.detail}>{item.location}</Text>
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={() =>
            isFetchingMore && <ActivityIndicator size="small" color="#000" />
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
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
  },
  token: {
    marginBottom: 16,
    color: 'gray',
  },
  item: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    marginVertical: 6,
    borderRadius: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
});
