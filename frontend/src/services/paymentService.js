import apiClient from '../config/api';

/**
 * 결제 관련 API 서비스
 */

/**
 * 결제 금액 임시 저장 (세션)
 * @param {Object} amountData - 금액 정보
 * @param {string} amountData.orderId - 주문 ID
 * @param {string} amountData.amount - 금액
 * @returns {Promise} 성공 메시지
 */
export const saveAmount = async (amountData) => {
  try {
    const response = await apiClient.post('/payments/toss/saveAmount', amountData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 결제 금액 검증
 * @param {Object} amountData - 금액 정보
 * @param {string} amountData.orderId - 주문 ID
 * @param {string} amountData.amount - 금액
 * @returns {Promise} 검증 결과
 */
export const verifyAmount = async (amountData) => {
  try {
    const response = await apiClient.post('/payments/toss/verifyAmount', amountData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 결제 승인 (프로젝트 참여 자동 등록 포함)
 * @param {Object} paymentData - 결제 정보
 * @param {string} paymentData.paymentKey - 결제 키 (토스에서 받은 키)
 * @param {string} paymentData.orderId - 주문 ID
 * @param {string} paymentData.amount - 금액
 * @param {number} paymentData.projectId - 프로젝트 ID
 * @param {number} paymentData.menteeId - 멘티 ID
 * @returns {Promise} 결제 승인 결과
 */
export const confirmPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments/toss/confirm', paymentData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 결제 정보 조회
 * @param {string} orderId - 주문 ID
 * @returns {Promise} 결제 정보
 */
export const getPayment = async (orderId) => {
  try {
    const response = await apiClient.get(`/payments/toss/${orderId}`);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

/**
 * 결제 취소
 * @param {Object} cancelData - 취소 정보
 * @param {string} cancelData.paymentKey - 결제 키
 * @param {string} cancelData.cancelReason - 취소 사유
 * @returns {Promise} 취소 결과
 */
export const cancelPayment = async (cancelData) => {
  try {
    const response = await apiClient.post('/payments/toss/cancel', cancelData);
    return response.data; // ApiResponse의 data 필드
  } catch (error) {
    throw error;
  }
};

