# API 사용 가이드

## 설정

### 1. API Base URL 설정
`src/config/api.js` 파일에서 API 기본 URL을 설정합니다.

**개발 환경:**
- iOS 시뮬레이터: `http://localhost:8080/api`
- Android 에뮬레이터: `http://10.0.2.2:8080/api`
- 실제 기기: `http://[컴퓨터IP주소]:8080/api` (예: `http://192.168.0.1:8080/api`)

**실제 기기에서 테스트하는 경우:**
1. 컴퓨터와 모바일 기기가 같은 Wi-Fi에 연결되어 있어야 합니다.
2. 컴퓨터의 IP 주소를 확인하세요:
   - Mac: `ifconfig | grep "inet "`
   - Windows: `ipconfig`
3. `src/config/api.js`의 `API_BASE_URL`을 IP 주소로 변경하세요.

## 사용 예시

### 1. 멘토 목록 조회

```javascript
import { getAllMentors } from './services/mentorService';

// 컴포넌트에서 사용
const fetchMentors = async () => {
  try {
    const mentors = await getAllMentors();
    console.log('멘토 목록:', mentors);
    // mentors는 배열입니다
  } catch (error) {
    console.error('멘토 목록 조회 실패:', error);
  }
};
```

### 2. 추천 멘토 조회

```javascript
import { getRecommendedMentors } from './services/mentorService';

const fetchRecommendedMentors = async () => {
  try {
    const mentors = await getRecommendedMentors();
    console.log('추천 멘토:', mentors);
  } catch (error) {
    console.error('추천 멘토 조회 실패:', error);
  }
};
```

### 3. 멘토 회원가입

```javascript
import { createMentor } from './services/mentorService';

const registerMentor = async () => {
  try {
    const mentorData = {
      name: '이지윤',
      title: '시니어 개발자',
      profileImageUrl: 'https://example.com/profile.jpg',
      intro: '10년차 풀스택 개발자입니다.',
      specialty: '개발',
      price: 50000,
    };
    
    const mentor = await createMentor(mentorData);
    console.log('멘토 등록 완료:', mentor);
  } catch (error) {
    console.error('멘토 등록 실패:', error);
  }
};
```

### 4. 프로젝트 개설

```javascript
import { createProject } from './services/projectService';

const createNewProject = async () => {
  try {
    const projectData = {
      mentorId: 1,
      title: 'React Native 마스터하기',
      description: 'React Native를 활용한 모바일 앱 개발을 배웁니다.',
      curriculum: JSON.stringify([
        { week: 1, title: '기초 설정' },
        { week: 2, title: '컴포넌트 개발' },
      ]),
      skills: ['React', 'React Native', 'JavaScript'],
      price: 200000,
      duration: 8,
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
    };
    
    const project = await createProject(projectData);
    console.log('프로젝트 개설 완료:', project);
  } catch (error) {
    console.error('프로젝트 개설 실패:', error);
  }
};
```

### 5. 프로젝트 상세 조회

```javascript
import { getProjectDetail } from './services/projectService';

const fetchProjectDetail = async (projectId) => {
  try {
    const project = await getProjectDetail(projectId);
    console.log('프로젝트 상세:', project);
  } catch (error) {
    console.error('프로젝트 조회 실패:', error);
  }
};
```

### 6. 프로젝트 결제 및 참여

```javascript
import { confirmPayment } from './services/paymentService';

const payForProject = async () => {
  try {
    const paymentData = {
      paymentKey: 'tgen_20241201_1234567890', // 토스에서 받은 결제 키
      orderId: 'order-12345',
      amount: '200000',
      projectId: 1,
      menteeId: 1,
    };
    
    const result = await confirmPayment(paymentData);
    console.log('결제 완료 및 프로젝트 참여:', result);
    // 결제 완료 후 자동으로 프로젝트 참여가 등록됩니다.
  } catch (error) {
    console.error('결제 실패:', error);
  }
};
```

### 7. 내 프로젝트 조회

```javascript
import { getMyProjects } from './services/projectService';

// 멘토인 경우
const fetchMyProjectsAsMentor = async (mentorId) => {
  try {
    const projects = await getMyProjects(mentorId, 'MENTOR');
    console.log('내가 개설한 프로젝트:', projects);
  } catch (error) {
    console.error('프로젝트 조회 실패:', error);
  }
};

// 멘티인 경우
const fetchMyProjectsAsMentee = async (menteeId) => {
  try {
    const projects = await getMyProjects(menteeId, 'MENTEE');
    console.log('내가 참여한 프로젝트:', projects);
  } catch (error) {
    console.error('프로젝트 조회 실패:', error);
  }
};
```

## 에러 처리

```javascript
import { getErrorMessage } from './utils/apiHelper';

try {
  const data = await getAllMentors();
} catch (error) {
  const errorMessage = getErrorMessage(error);
  Alert.alert('오류', errorMessage);
}
```

## React Native에서 실제 기기 테스트 시 주의사항

1. **같은 Wi-Fi 네트워크**: 컴퓨터와 모바일 기기가 같은 Wi-Fi에 연결되어 있어야 합니다.
2. **방화벽 설정**: 컴퓨터의 방화벽에서 8080 포트를 허용해야 합니다.
3. **IP 주소 확인**: 컴퓨터의 로컬 IP 주소를 확인하고 API URL에 설정하세요.
4. **CORS 설정**: 백엔드의 CORS 설정이 모든 origin을 허용하도록 설정되어 있습니다.

