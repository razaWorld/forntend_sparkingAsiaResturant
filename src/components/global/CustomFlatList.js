import React from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const CustomFlatList = ({
  data,
  renderItem,
  keyExtractor,
  horizontal = false,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator=false,
  contentContainerStyle = {},
  ListEmptyComponent = () => <Text style={styles.emptyText}>No data found</Text>,
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
});

export default CustomFlatList;
