import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loader = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        elevation: 2,
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <ActivityIndicator size="large" color={'yellow'} />
    </View>
  );
};

export default Loader;
