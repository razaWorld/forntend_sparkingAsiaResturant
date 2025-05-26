import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import CustomSearchBar from './CustomSearchBar';
import { SearchSvg } from '../../assets/svgs/svg';

const CustomDropdown = ({
  label,
  data,
  selectedValue,
  onSelect,
  placeholder,
  onEndReached,
  onEndReachedThreshold = 0.5,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data client side if needed
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
    setSearchTerm('');
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: selectedValue ? '#000' : '#aaa' }}>
          {selectedValue || placeholder || 'Select'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            
            <CustomSearchBar
            leftIcon={SearchSvg}
            placeholder={`Search ${label.toLowerCase()}...`}
            value={searchTerm}
            onChangeText={setSearchTerm}
            />

            <FlatList
              data={filteredData}
              keyExtractor={(item, idx) => item + idx}
              onEndReached={onEndReached}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={onEndReachedThreshold}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  No {label.toLowerCase()} found.
                </Text>
              }
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: '70%',
    paddingHorizontal:10
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
