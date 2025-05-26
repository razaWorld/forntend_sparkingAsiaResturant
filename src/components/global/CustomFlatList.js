import React from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import CustomLoader from './CustomLoader';

const CustomFlatList = ({
  data,
  renderItem,
  keyExtractor,
  horizontal = false,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  contentContainerStyle = {},
  ListEmptyComponent = () => <Text style={styles.emptyText}>No data found</Text>,
  ListFooterComponent = null,
  loading = false,
  ItemSeparatorComponent = null,
  onEndReached = null,
  onRefresh = null,
  refreshing = false,
}) => {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
        <CustomLoader />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    paddingVertical: 20,
  },
  footerLoader: {
    marginVertical: 16,
  },
});

export default CustomFlatList;
