import apiClient from '../config/api';

/**
 * 멘토링 신청 관련 API 서비스
 */

/**
 * 멘토링 신청 생성
 * @param {Object} applicationData - 신청 정보
 * @param {number} applicationData.mentorId - 멘토 ID
 * @param {number} applicationData.menteeId - 멘티 ID
 * @param {number} applicationData.price - 가격
 * @param {string} applicationData.sessionType - 세션 타입
 * @returns {Promise} 신청 정보
 */
export const createMentoringApplication = async (applicationData) => {
  try {
    const response = await apiClient.post('/mentoring/applications', applicationData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘토링 신청 조회
 * @param {number} applicationId - 신청 ID
 * @returns {Promise} 신청 정보
 */
export const getMentoringApplication = async (applicationId) => {
  try {
    const response = await apiClient.get(`/mentoring/applications/${applicationId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘토별 멘토링 신청 목록 조회
 * @param {number} mentorId - 멘토 ID
 * @returns {Promise} 신청 목록
 */
export const getApplicationsByMentor = async (mentorId) => {
  try {
    const response = await apiClient.get(`/mentoring/applications/mentor/${mentorId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘티별 멘토링 신청 목록 조회
 * @param {number} menteeId - 멘티 ID
 * @returns {Promise} 신청 목록
 */
export const getApplicationsByMentee = async (menteeId) => {
  try {
    const response = await apiClient.get(`/mentoring/applications/mentee/${menteeId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘토링 신청 승인
 * @param {number} applicationId - 신청 ID
 * @returns {Promise} 승인된 신청 정보
 */
export const acceptMentoringApplication = async (applicationId) => {
  try {
    const response = await apiClient.post(`/mentoring/applications/${applicationId}/accept`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

