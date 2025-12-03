# 멘티 ID 매칭 문제 디버깅 가이드

## 문제 상황
- 멘티 ID와 프로젝트 신청 기록의 ID가 매칭되지 않음
- 결제 완료 후 프로젝트가 "내 프로젝트"에 나타나지 않음
- 잘못된 프로젝트가 표시됨

## 백엔드 코드 확인 결과

### ✅ 정상 동작하는 부분

1. **결제 완료 후 프로젝트 멤버 추가** (`TossPaymentService.confirmPayment`)
   - `request.menteeId()`와 `request.projectId()`를 받아서 처리
   - `projectMemberService.addMember(projectId, menteeId)` 호출
   - DB 저장 후 검증 로직 포함

2. **프로젝트 멤버 추가 로직** (`ProjectMemberService.addMember`)
   - `projectId`와 `menteeId`를 받아서 `ProjectMember` 엔티티에 저장
   - `role = "MENTEE"`로 저장
   - 중복 체크 후 저장

3. **프로젝트 조회 쿼리** (`ProjectMemberRepository.findProjectIdsByUserIdAndRole`)
   ```sql
   SELECT pm.projectId FROM ProjectMember pm 
   WHERE pm.userId = :userId AND pm.role = :role
   ```
   - 올바른 쿼리 조건 사용

### 🔍 확인이 필요한 부분

1. **프론트엔드에서 전달하는 menteeId**
   - 결제 요청 시 `paymentData.menteeId`가 올바른지 확인
   - 로그: `결제 요청 (토스 없이 바로 처리): {menteeId: ...}`

2. **DB에 실제 저장되는 데이터**
   - `project_member` 테이블에 `user_id`와 `project_id`가 올바르게 저장되는지 확인
   - `role = 'MENTEE'`로 저장되는지 확인

3. **프로젝트 조회 시 전달되는 userId**
   - `/projects/my?userId=...&role=MENTEE` 호출 시 `userId`가 올바른지 확인

## 디버깅 방법

### 1. 백엔드 로그 확인

Spring Boot 애플리케이션 실행 후 다음 로그를 확인:

```
🔍 addMember 호출 - projectId: X, menteeId: Y
✅ 멘티 멤버 추가 성공: projectId=X, menteeId=Y
🔍 getProjectsByMentee 호출 - menteeId: Y
🔍 조회된 프로젝트 ID 목록: [X]
✅ 멘티 ID Y의 프로젝트 조회 완료: 1개
```

### 2. DB 직접 확인

```sql
-- 멘티 ID 1의 모든 프로젝트 멤버 확인
SELECT * FROM project_member 
WHERE user_id = 1 AND role = 'MENTEE';

-- 특정 프로젝트의 멘티 확인
SELECT * FROM project_member 
WHERE project_id = 3 AND user_id = 1 AND role = 'MENTEE';

-- 모든 프로젝트 멤버 확인
SELECT * FROM project_member 
ORDER BY id DESC 
LIMIT 10;
```

### 3. 프론트엔드 로그 확인

React Native 앱에서 다음 로그 확인:

```
결제 요청 (토스 없이 바로 처리): {menteeId: X, projectId: Y}
내 프로젝트 조회 시작 - menteeId: X, role: MENTEE
```

## 문제 해결 체크리스트

- [ ] 프론트엔드에서 결제 요청 시 올바른 `menteeId` 전달 확인
- [ ] 백엔드에서 결제 완료 후 프로젝트 멤버 추가 성공 로그 확인
- [ ] DB에 `project_member` 테이블에 데이터가 올바르게 저장되었는지 확인
- [ ] 프로젝트 조회 시 올바른 `userId` 전달 확인
- [ ] 쿼리 결과에 올바른 프로젝트 ID가 포함되는지 확인

## 예상 문제 원인

1. **프론트엔드에서 잘못된 menteeId 전달**
   - 하드코딩된 ID 1 사용
   - → 해결: 실제 로그인한 멘티의 ID 사용

2. **DB에 잘못된 데이터 저장**
   - 다른 멘티 ID로 저장됨
   - → 해결: 결제 요청 로그와 DB 저장 로그 비교

3. **프로젝트 조회 시 잘못된 userId 사용**
   - 하드코딩된 ID 1 사용
   - → 해결: 실제 로그인한 멘티의 ID 사용

## 수정 사항

백엔드 코드에 상세 로깅 추가:
- `ProjectMemberService.addMember`: 멤버 추가 시 상세 로그
- `ProjectMemberService.getProjectsByMentee`: 프로젝트 조회 시 상세 로그
- `ProjectService.getMyProjects`: API 응답 시 상세 로그

이제 Spring Boot 애플리케이션을 재시작하고 테스트하면 상세한 로그를 통해 문제를 정확히 파악할 수 있습니다.

