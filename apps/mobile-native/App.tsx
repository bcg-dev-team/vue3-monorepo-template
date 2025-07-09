import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// 토큰 import (JS/TS로 export된 값 사용)
import { baseColorsPrimaryPrimary800 } from '@template/ui/src/styles/_tokens';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>공유 토큰 적용 예시</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Primary 버튼</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 24 },
  button: {
    backgroundColor: baseColorsPrimaryPrimary800,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#131313', fontWeight: 'bold' },
});