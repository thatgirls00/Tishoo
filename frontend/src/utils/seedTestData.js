import { createMentor } from '../services/mentorService';
import { createProject } from '../services/projectService';

/**
 * 테스트용 멘토와 프로젝트 데이터 생성
 * 앱에서 직접 호출하여 데이터를 생성할 수 있습니다.
 */

// 멋진 멘토 데이터
const mentorData = {
  name: '멘토테스트',
  title: '시니어 소프트웨어 엔지니어 @ 네이버',
  profileImageUrl: 'http://localhost:3845/assets/27c5b5af8541698db9668979820e9e8e4446374b.png',
  intro: `안녕하세요! 10년 경력의 시니어 개발자 멘토테스트입니다.

저는 네이버에서 대규모 서비스 개발과 운영을 담당하고 있으며, 수많은 주니어 개발자들을 성장시켜온 경험이 있습니다.

제 멘토링의 특징:
✨ 실무 중심의 실용적인 커리큘럼
✨ 1:1 맞춤형 피드백
✨ 체계적인 코드 리뷰
✨ 취업/이직을 위한 포트폴리오 완성
✨ 현업 개발자의 노하우 전수

여러분의 성장을 위해 최선을 다하겠습니다!`,
  specialty: '풀스택 개발',
  price: 500000,
};

// 멋진 프로젝트 데이터
const getProjectData = (mentorId) => ({
  mentorId,
  title: '테스트 잘 하는 집 : 테참잘',
  description: `실무에서 바로 사용할 수 있는 체계적인 테스트 코드 작성 방법을 배우는 프로젝트입니다.

🎯 이런 분들께 추천합니다:
- 테스트 코드가 중요하다는 건 알지만 어떻게 시작해야 할지 막막한 분
- Unit Test, Integration Test, E2E Test의 차이를 명확히 알고 싶은 분
- TDD(테스트 주도 개발) 방법론을 실전에 적용하고 싶은 분
- 현업에서 사용되는 테스트 전략을 배우고 싶은 분
- 코드 커버리지를 높이고 안정적인 서비스를 만들고 싶은 분

💡 프로젝트 특징:
✅ Jest, React Testing Library, Cypress 등 주요 테스트 도구 완벽 마스터
✅ 실무 중심의 예제와 함께하는 체계적인 학습
✅ 실제 프로젝트에 테스트 코드를 점진적으로 도입하는 전략
✅ 레거시 코드에 테스트를 추가하는 리팩토링 기법
✅ CI/CD 파이프라인에 자동화된 테스트 통합

🚀 프로젝트 완료 후:
- 어떤 프로젝트에서든 적절한 테스트 전략을 수립할 수 있습니다
- 테스트 가능한 코드를 설계하고 작성할 수 있습니다
- 팀 내에서 테스트 문화를 주도할 수 있는 역량을 갖추게 됩니다
- 버그 없는 안정적인 서비스를 만들 수 있습니다

함께 테스트의 달인이 되어봅시다! 🎉`,
  curriculum: JSON.stringify([
    {
      week: 1,
      title: '테스트의 기초와 Jest 시작하기',
      topics: [
        '테스트가 왜 중요한가? (실무 사례)',
        'Unit Test vs Integration Test vs E2E Test',
        'Jest 설치 및 기본 설정',
        '첫 번째 테스트 작성하기',
        'Matcher 함수 완벽 이해하기',
        '실습: 간단한 유틸리티 함수 테스트 작성',
      ],
      assignment: '학습한 내용을 바탕으로 5개 이상의 유틸리티 함수에 대한 테스트 작성',
    },
    {
      week: 2,
      title: 'React 컴포넌트 테스트',
      topics: [
        'React Testing Library 소개',
        '컴포넌트 렌더링 테스트',
        '사용자 이벤트 시뮬레이션',
        'Query 함수 (getBy, findBy, queryBy)',
        'Async 테스트 작성법',
        '실습: Todo 리스트 컴포넌트 완전 테스트',
      ],
      assignment: '자신의 프로젝트 컴포넌트 3개 이상 테스트 작성',
    },
    {
      week: 3,
      title: 'Mock과 테스트 더블',
      topics: [
        'Mock, Stub, Spy 이해하기',
        'API 호출 Mocking',
        'Module Mocking 기법',
        'Timer와 Date Mocking',
        'Mock 함수 검증 방법',
        '실습: API 통신하는 컴포넌트 테스트',
      ],
      assignment: 'API를 사용하는 기능에 대한 Mock 테스트 작성',
    },
    {
      week: 4,
      title: 'Integration Test와 E2E Test',
      topics: [
        'Integration Test 전략',
        'Cypress 설치 및 설정',
        'E2E 테스트 시나리오 작성',
        'Page Object Pattern',
        '테스트 데이터 관리',
        '실습: 로그인부터 결제까지 E2E 시나리오',
      ],
      assignment: '주요 사용자 플로우에 대한 E2E 테스트 작성',
    },
    {
      week: 5,
      title: 'TDD와 테스트 전략',
      topics: [
        'TDD(Test Driven Development) 실습',
        'Red-Green-Refactor 사이클',
        '테스트 가능한 코드 설계',
        '테스트 커버리지 이해하기',
        'Code Coverage 측정 및 개선',
        '실습: TDD로 기능 개발하기',
      ],
      assignment: 'TDD 방식으로 새로운 기능 1개 개발',
    },
    {
      week: 6,
      title: '실전 테스트 전략과 CI/CD',
      topics: [
        '레거시 코드에 테스트 추가하기',
        '리팩토링과 테스트',
        'GitHub Actions로 자동화 테스트',
        'Pre-commit Hook 설정',
        '테스트 유지보수 전략',
        '프로젝트 회고 및 포트폴리오 정리',
      ],
      assignment: '최종 프로젝트: 전체 애플리케이션 테스트 커버리지 80% 이상 달성',
    },
  ]),
  skills: [
    'Jest',
    'React Testing Library',
    'Cypress',
    'TDD',
    'Unit Test',
    'Integration Test',
    'E2E Test',
    'CI/CD',
    'GitHub Actions',
    'Test Coverage',
  ],
  price: 450000,
  duration: 6,
  thumbnailUrl: 'http://localhost:3845/assets/27c5b5af8541698db9668979820e9e8e4446374b.png',
});

/**
 * 테스트용 멘토와 프로젝트 데이터를 생성합니다.
 * @returns {Promise<{mentor, project}>} 생성된 멘토와 프로젝트 데이터
 */
export const seedTestData = async () => {
  try {
    console.log('🚀 테스트 데이터 생성 시작...');

    // 1. 멘토 생성
    console.log('📝 멘토 생성 중...');
    const mentor = await createMentor(mentorData);
    console.log('✅ 멘토 생성 완료:', mentor.name, '(ID:', mentor.id, ')');

    // 2. 프로젝트 생성
    console.log('📝 프로젝트 생성 중...');
    const project = await createProject(getProjectData(mentor.id));
    console.log('✅ 프로젝트 생성 완료:', project.title, '(ID:', project.id, ')');

    console.log('🎉 모든 테스트 데이터 생성 완료!');
    console.log('==========================================');
    console.log(`멘토: ${mentor.name} (ID: ${mentor.id})`);
    console.log(`프로젝트: ${project.title} (ID: ${project.id})`);
    console.log(`가격: ${project.price.toLocaleString()}원`);
    console.log(`기간: ${project.duration}주`);
    console.log('==========================================');

    return { mentor, project };
  } catch (error) {
    console.error('❌ 테스트 데이터 생성 실패:', error);
    throw error;
  }
};
