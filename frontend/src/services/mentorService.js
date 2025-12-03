import apiClient from '../config/api';

/**
 * 멘토 관련 API 서비스
 */

/**
 * 멘토 회원가입
 * @param {Object} mentorData - 멘토 정보
 * @param {string} mentorData.name - 이름
 * @param {string} mentorData.title - 직함/제목
 * @param {string} mentorData.profileImageUrl - 프로필 이미지 URL
 * @param {string} mentorData.intro - 소개
 * @param {string} mentorData.specialty - 전문 분야
 * @param {number} mentorData.price - 가격
 * @returns {Promise} 멘토 정보
 */
export const createMentor = async (mentorData) => {
  try {
    const response = await apiClient.post('/mentors', mentorData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘토 목록 조회
 * @returns {Promise} 멘토 목록
 */
export const getAllMentors = async () => {
  try {
    const response = await apiClient.get('/mentors');
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 추천 멘토 조회
 * @returns {Promise} 추천 멘토 목록
 */
export const getRecommendedMentors = async () => {
  try {
    const response = await apiClient.get('/mentors/recommended');
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘토 상세 조회
 * @param {number} mentorId - 멘토 ID
 * @returns {Promise} 멘토 상세 정보
 */
export const getMentorById = async (mentorId) => {
  try {
    const response = await apiClient.get(`/mentors/${mentorId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

