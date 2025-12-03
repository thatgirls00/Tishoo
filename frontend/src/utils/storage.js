import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_NAME: '@tishoo:user_name',
  USER_ROLE: '@tishoo:user_role', // 'mentor' or 'mentee'
  MENTEE_ID: '@tishoo:mentee_id',
  MENTOR_ID: '@tishoo:mentor_id',
  APPLIED_PROJECT_IDS: '@tishoo:applied_project_ids', // 결제 완료한 프로젝트 ID 목록
};

/**
 * 사용자 이름 저장
 */
export const saveUserName = async (name) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    console.log('✅ 사용자 이름 저장:', name);
  } catch (error) {
    console.error('❌ 이름 저장 실패:', error);
  }
};

/**
 * 사용자 이름 불러오기
 */
export const getUserName = async () => {
  try {
    const name = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
    return name || null;
  } catch (error) {
    console.error('❌ 이름 불러오기 실패:', error);
    return null;
  }
};

/**
 * 사용자 역할 저장
 */
export const saveUserRole = async (role) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (error) {
    console.error('❌ 역할 저장 실패:', error);
  }
};

/**
 * 사용자 역할 불러오기
 */
export const getUserRole = async () => {
  try {
    const role = await AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return role || null;
  } catch (error) {
    console.error('❌ 역할 불러오기 실패:', error);
    return null;
  }
};

/**
 * 멘티 ID 저장
 */
export const saveMenteeId = async (menteeId) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.MENTEE_ID, String(menteeId));
    console.log('✅ 멘티 ID 저장:', menteeId);
  } catch (error) {
    console.error('❌ 멘티 ID 저장 실패:', error);
  }
};

/**
 * 멘티 ID 불러오기
 */
export const getMenteeId = async () => {
  try {
    const menteeId = await AsyncStorage.getItem(STORAGE_KEYS.MENTEE_ID);
    return menteeId ? parseInt(menteeId, 10) : null;
  } catch (error) {
    console.error('❌ 멘티 ID 불러오기 실패:', error);
    return null;
  }
};

/**
 * 멘토 ID 저장
 */
export const saveMentorId = async (mentorId) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.MENTOR_ID, String(mentorId));
    console.log('✅ 멘토 ID 저장:', mentorId);
  } catch (error) {
    console.error('❌ 멘토 ID 저장 실패:', error);
  }
};

/**
 * 멘토 ID 불러오기
 */
export const getMentorId = async () => {
  try {
    const mentorId = await AsyncStorage.getItem(STORAGE_KEYS.MENTOR_ID);
    return mentorId ? parseInt(mentorId, 10) : null;
  } catch (error) {
    console.error('❌ 멘토 ID 불러오기 실패:', error);
    return null;
  }
};

/**
 * 결제 완료한 프로젝트 ID 추가
 */
export const addAppliedProjectId = async (projectId) => {
  try {
    const existingIds = await getAppliedProjectIds();
    const updatedIds = [...new Set([...existingIds, projectId])]; // 중복 제거
    await AsyncStorage.setItem(STORAGE_KEYS.APPLIED_PROJECT_IDS, JSON.stringify(updatedIds));
    console.log('✅ 결제 완료 프로젝트 ID 추가:', projectId, '전체:', updatedIds);
  } catch (error) {
    console.error('❌ 결제 완료 프로젝트 ID 추가 실패:', error);
  }
};

/**
 * 결제 완료한 프로젝트 ID 목록 가져오기
 */
export const getAppliedProjectIds = async () => {
  try {
    const idsJson = await AsyncStorage.getItem(STORAGE_KEYS.APPLIED_PROJECT_IDS);
    if (idsJson) {
      return JSON.parse(idsJson);
    }
    return [];
  } catch (error) {
    console.error('❌ 결제 완료 프로젝트 ID 목록 불러오기 실패:', error);
    return [];
  }
};

/**
 * 모든 사용자 데이터 삭제
 */
export const clearUserData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_NAME,
      STORAGE_KEYS.USER_ROLE,
      STORAGE_KEYS.MENTEE_ID,
      STORAGE_KEYS.MENTOR_ID,
      STORAGE_KEYS.APPLIED_PROJECT_IDS,
    ]);
  } catch (error) {
    console.error('❌ 사용자 데이터 삭제 실패:', error);
  }
};

