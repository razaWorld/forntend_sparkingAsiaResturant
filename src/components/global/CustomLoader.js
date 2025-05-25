import { StyleSheet, Text, View, ActivityIndicator, Modal } from 'react-native';
import React from 'react';

const CustomLoader = ({
  visible = false,
  text = '',
  size = 'small',
  color = '#007BFF',
  overlayColor = 'rgba(0,0,0,0.1)',
}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size={size} color={color} />
          {text ? <Text style={styles.text}>{text}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    minWidth: 100,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
});
