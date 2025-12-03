/**
 * API 헬퍼 유틸리티 함수
 */

/**
 * 에러 메시지 추출
 * @param {Error} error - 에러 객체
 * @returns {string} 에러 메시지
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * API 응답 데이터 추출 (ApiResponse 래퍼 제거)
 * @param {Object} response - API 응답
 * @returns {*} 실제 데이터
 */
export const extractData = (response) => {
  // 백엔드 ApiResponse 구조: { status, message, data }
  if (response && response.data !== undefined) {
    return response.data;
  }
  return response;
};

/**
 * 로딩 상태 관리 헬퍼
 */
export const createAsyncHandler = (asyncFunction) => {
  return async (...args) => {
    try {
      const result = await asyncFunction(...args);
      return { success: true, data: result, error: null };
    } catch (error) {
      return { success: false, data: null, error: getErrorMessage(error) };
    }
  };
};

