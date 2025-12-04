import axios from 'axios';
import { Platform } from 'react-native';

// API 기본 URL 설정
// ngrok 터널 사용 (핫스팟 환경에서 백엔드 연결)
const USE_MOCK_API = false; // true로 설정하면 Mock 데이터 사용
const NGROK_URL = 'https://ungroundable-cordie-ungamelike.ngrok-free.dev'; // ngrok 터널 URL

const getApiBaseUrl = () => {
  if (__DEV__) {
    // 개발 환경 - ngrok 터널 사용
    const baseUrl = `${NGROK_URL}/api`;
    console.log('🌐 API Base URL:', baseUrl);
    console.log('🔧 Mock API Mode:', USE_MOCK_API ? 'ENABLED' : 'DISABLED');
    return baseUrl;
  }
  // 프로덕션 환경
  return 'https://your-production-server.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (필요 시 토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // 디버깅: 요청 URL 로그
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    // TODO: 인증 토큰이 있다면 여기서 추가
    // const token = AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    // 디버깅: 성공 응답 로그
    console.log('✅ API Response:', response.config.url, response.status);
    // API 응답이 ApiResponse 래퍼로 감싸져 있으므로 data.data로 접근
    return response.data;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      console.error('❌ API Error:', error.response.status, error.response.data);
      return Promise.reject({
        message: error.response.data?.message || '서버 오류가 발생했습니다.',
        status: error.response.status,
      });
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error('❌ Network Error:', {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        message: error.message,
      });
      console.error('💡 네트워크 연결 확인사항:');
      console.error('   1. 백엔드 서버가 실행 중인지 확인 (http://localhost:8080)');
      console.error('   2. 컴퓨터와 스마트폰이 같은 Wi-Fi에 연결되어 있는지 확인');
      console.error('   3. IP 주소가 올바른지 확인:', IP_ADDRESS);
      console.error('   4. 방화벽에서 8080 포트가 허용되어 있는지 확인');
      return Promise.reject({
        message: `네트워크 연결을 확인해주세요. (서버: ${IP_ADDRESS}:8080)`,
        status: 0,
      });
    } else {
      // 요청 설정 중 에러
      console.error('❌ Request Setup Error:', error.message);
      return Promise.reject({
        message: error.message || '알 수 없는 오류가 발생했습니다.',
        status: 0,
      });
    }
  }
);

export default apiClient;

