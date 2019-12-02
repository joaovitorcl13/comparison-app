import React from 'react';

import Routes from './routes';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={style.container}>

      <Routes>

      </Routes>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container:{
    backgroundColor: '#031822',
    flex: 1
  }
});