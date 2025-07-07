import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState, useRef } from 'react';
import { WEBAPP_URL } from '@env';

export default function App() {
  const [webViewKey, setWebViewKey] = useState(0);
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // WebView에서 네이티브로 메시지를 받는 핸들러
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      
      // React DevTools 메시지 필터링
      if (message.source === 'react-devtools-content-script') {
        return; // DevTools 메시지는 무시
      }
      
      // 웹앱 메시지인지 확인 (type 필드가 있는 경우만)
      if (!message.type) {
        return; // type이 없는 메시지는 무시
      }
      
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
        case 'webappLoaded':
          // 웹앱 로드 완료 처리
          console.log('웹앱 로드 완료:', message.data);
          setIsWebViewLoaded(true);
          // 웹앱에 환영 메시지 전송
          sendMessageToWebView({
            type: 'welcome',
            data: {
              message: '네이티브 앱에서 환영합니다!',
              timestamp: Date.now(),
              platform: 'React Native',
              version: '1.0.0'
            }
          });
          break;
        case 'deviceInfo':
          // 디바이스 정보 요청 처리
          const deviceInfo = {
            type: 'deviceInfoResponse',
            data: {
              requestId: message.data.requestId,
              platform: 'React Native',
              version: '1.0.0',
              timestamp: Date.now(),
              device: {
                brand: 'Expo',
                model: 'Development',
                systemVersion: '1.0.0'
              }
            }
          };
          sendMessageToWebView(deviceInfo);
          break;
        default:
          console.log('알 수 없는 메시지 타입:', message.type);
      }
    } catch (error) {
      console.error('메시지 파싱 오류:', error);
      console.error('원본 데이터:', event.nativeEvent.data);
    }
  };

  // 네이티브에서 WebView로 메시지를 보내는 함수
  const sendMessageToWebView = (message: any) => {
    if (webViewRef.current && isWebViewLoaded) {
      const messageString = JSON.stringify(message);
      
      // postMessage 사용
      webViewRef.current.postMessage(messageString);
      
      // 전역 함수 직접 호출
      const script = `
        if (window.receiveMessageFromNative) {
          window.receiveMessageFromNative('${messageString.replace(/'/g, "\\'")}');
        }
      `;
      webViewRef.current.injectJavaScript(script);
      
      console.log('WebView로 전송한 메시지:', messageString);
    } else {
      console.log('WebView가 아직 로드되지 않았거나 ref가 없습니다.');
    }
  };

  // 테스트 메시지 전송
  const sendTestMessage = () => {
    sendMessageToWebView({
      type: 'test',
      data: {
        message: '네이티브에서 보낸 테스트 메시지',
        timestamp: Date.now()
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* 네이티브 컨트롤 패널 */}
      <View style={styles.controlPanel}>
        <Text style={styles.statusText}>
          상태: {isWebViewLoaded ? '연결됨' : '연결 중...'}
        </Text>
        <TouchableOpacity 
          style={[styles.testButton, !isWebViewLoaded && styles.disabledButton]} 
          onPress={sendTestMessage}
          disabled={!isWebViewLoaded}
        >
          <Text style={styles.buttonText}>테스트 메시지 전송</Text>
        </TouchableOpacity>
      </View>

      <WebView
        ref={webViewRef}
        key={webViewKey}
        source={{ 
          uri: WEBAPP_URL
        }}
        style={styles.webview}
        onMessage={handleMessage}
        onLoad={() => {
          console.log('WebView 로드 완료');
          setIsWebViewLoaded(true);
        }}
        onLoadStart={() => {
          console.log('WebView 로드 시작');
          setIsWebViewLoaded(false);
        }}
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
  controlPanel: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  testButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  webview: {
    flex: 1,
  },
});