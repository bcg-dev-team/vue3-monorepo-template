import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

export default function App() {
  const [webViewKey, setWebViewKey] = useState(0);

  // WebView에서 네이티브로 메시지를 받는 핸들러
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('WebView에서 받은 메시지:', message);
      
      // 메시지 타입에 따른 처리
      switch (message.type) {
        case 'alert':
          Alert.alert('웹앱 알림', message.data);
          break;
        case 'navigate':
          // 네이티브 네비게이션 처리
          console.log('네이티브 네비게이션:', message.data);
          break;
        default:
          console.log('알 수 없는 메시지 타입:', message.type);
      }
    } catch (error) {
      console.error('메시지 파싱 오류:', error);
    }
  };

  // 네이티브에서 WebView로 메시지를 보내는 함수
  const sendMessageToWebView = (message: any) => {
    // WebView ref를 통해 메시지 전송
    // 실제 구현에서는 useRef를 사용하여 WebView 인스턴스에 접근
  };

  return (
    <View style={styles.container}>
      <WebView
        key={webViewKey}
        source={{ 
          uri: 'http://localhost:5173' // 개발 환경에서는 모바일 웹앱 URL
          // uri: 'https://your-production-domain.com/mobile' // 프로덕션 환경
        }}
        style={styles.webview}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView 오류:', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP 오류:', nativeEvent);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
