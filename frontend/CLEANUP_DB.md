# DB 정리 가이드

## 문제 상황
- "저년수" 프로젝트가 계속 나타남 (신청한 적 없는 프로젝트)
- 신청한 프로젝트가 저장되지 않음

## 해결 방법

### 1. 잘못된 프로젝트 멤버 데이터 삭제 (API 사용)

#### 방법 1: 멘티의 모든 프로젝트 멤버 삭제
```bash
# 멘티 ID 1의 모든 프로젝트 멤버 삭제
curl -X DELETE http://localhost:8080/api/projects/members/mentee/1
```

#### 방법 2: 특정 프로젝트에서 멘티 삭제
```bash
# 프로젝트 ID 1에서 멘티 ID 1 삭제
curl -X DELETE http://localhost:8080/api/projects/1/members/mentee/1
```

### 2. DB 직접 삭제 (MySQL)

```sql
-- 멘티 ID 1의 모든 프로젝트 멤버 삭제
DELETE FROM project_member 
WHERE user_id = 1 AND role = 'MENTEE';

-- 특정 프로젝트(ID 1)에서 멘티 ID 1 삭제
DELETE FROM project_member 
WHERE project_id = 1 AND user_id = 1 AND role = 'MENTEE';

-- 모든 잘못된 데이터 확인
SELECT * FROM project_member 
WHERE user_id = 1 AND role = 'MENTEE';
```

### 3. 결제 완료 후 프로젝트 멤버 추가 확인

결제 완료 후 다음 로그를 확인하세요:
- `✅ 결제 완료 후 프로젝트 멤버 추가 성공`
- `✅ 멘티 멤버 추가 성공`
- `✅ 프로젝트 멤버 DB 저장 확인 완료`

만약 다음 로그가 보이면 문제가 있습니다:
- `❌ 프로젝트 참여 등록 실패`
- `❌ 프로젝트 멤버 DB 저장 확인 실패`

## 테스트 순서

1. **잘못된 데이터 삭제**
   ```bash
   curl -X DELETE http://localhost:8080/api/projects/members/mentee/1
   ```

2. **프로젝트 결제 진행**
   - 앱에서 프로젝트 결제 버튼 클릭
   - 결제 완료 화면으로 이동 확인

3. **내 프로젝트 확인**
   - "내 프로젝트" 탭에서 신청한 프로젝트만 표시되는지 확인
   - "저년수" 프로젝트가 더 이상 나타나지 않는지 확인

## 주의사항

- 멘티 ID는 현재 기본값으로 1을 사용하고 있습니다.
- 실제 멘티 ID를 확인하려면 결제 로그를 확인하세요.
- 삭제 후에는 반드시 프로젝트를 다시 신청해야 합니다.

