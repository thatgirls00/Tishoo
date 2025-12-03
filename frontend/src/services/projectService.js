import apiClient from '../config/api';

/**
 * 프로젝트 관련 API 서비스
 */

/**
 * 프로젝트 개설
 * @param {Object} projectData - 프로젝트 정보
 * @param {number} projectData.mentorId - 멘토 ID
 * @param {string} projectData.title - 프로젝트 제목
 * @param {string} projectData.description - 프로젝트 설명
 * @param {string} projectData.curriculum - 커리큘럼 (JSON 문자열 또는 텍스트)
 * @param {string[]} projectData.skills - 스킬 목록
 * @param {number} projectData.price - 가격
 * @param {number} projectData.duration - 기간 (주 단위)
 * @param {string} projectData.thumbnailUrl - 썸네일 이미지 URL
 * @returns {Promise} 프로젝트 정보
 */
export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post('/projects', projectData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 전체 프로젝트 목록 조회
 * @returns {Promise} 프로젝트 목록
 */
export const getAllProjects = async () => {
  try {
    const response = await apiClient.get('/projects');
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 프로젝트 상세 조회
 * @param {number} projectId - 프로젝트 ID
 * @returns {Promise} 프로젝트 상세 정보
 */
export const getProjectDetail = async (projectId) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 멘토별 프로젝트 목록 조회
 * @param {number} mentorId - 멘토 ID
 * @returns {Promise} 프로젝트 목록
 */
export const getProjectsByMentor = async (mentorId) => {
  try {
    const response = await apiClient.get(`/projects/mentor/${mentorId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 프로젝트 참여 (결제 후)
 * @param {Object} participationData - 참여 정보
 * @param {number} participationData.projectId - 프로젝트 ID
 * @param {number} participationData.menteeId - 멘티 ID
 * @param {string} participationData.paymentKey - 결제 키
 * @param {string} participationData.orderId - 주문 ID
 * @returns {Promise} 프로젝트 정보
 */
export const participateInProject = async (participationData) => {
  try {
    const response = await apiClient.post('/projects/participate', participationData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 내 프로젝트 조회
 * @param {number} userId - 사용자 ID
 * @param {string} role - 역할 ('MENTOR' 또는 'MENTEE')
 * @returns {Promise} 프로젝트 목록
 */
export const getMyProjects = async (userId, role) => {
  try {
    const response = await apiClient.get('/projects/my', {
      params: {
        userId,
        role,
      },
    });
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

