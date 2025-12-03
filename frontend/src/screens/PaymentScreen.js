import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import BackArrowIcon from '../components/BackArrowIcon';
import CreditCardIcon from '../components/CreditCardIcon';
import TossPayIcon from '../components/TossPayIcon';
import MobilePaymentIcon from '../components/MobilePaymentIcon';
import BankTransferIcon from '../components/BankTransferIcon';
import CheckIcon from '../components/CheckIcon';
import ContainerIcon from '../components/ContainerIcon';
import { confirmPayment } from '../services/paymentService';
import { getMenteeId, saveMenteeId, addAppliedProjectId } from '../utils/storage';

export default function PaymentScreen({ navigation, route }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [menteeId, setMenteeId] = useState(null);
  const [isMenteeIdLoading, setIsMenteeIdLoading] = useState(true);

  // 멘티 ID 로드 (컴포넌트 마운트 시 즉시 실행)
  React.useEffect(() => {
    const loadMenteeId = async () => {
      try {
        setIsMenteeIdLoading(true);
        const id = await getMenteeId();
        console.log('PaymentScreen - 멘티 ID 로드 결과:', id);
        if (id) {
          setMenteeId(id);
          console.log('✅ PaymentScreen - 멘티 ID 설정:', id);
        } else {
          // 멘티 ID가 없으면 에러 (프로필을 먼저 완성해야 함)
          console.error('❌ PaymentScreen - 멘티 ID가 없습니다. 프로필을 먼저 완성해주세요.');
          Alert.alert('오류', '멘티 프로필을 먼저 완성해주세요.');
        }
      } catch (error) {
        console.error('❌ PaymentScreen - 멘티 ID 로드 실패:', error);
        // 에러 발생 시 기본값 사용
        const defaultMenteeId = 1;
        setMenteeId(defaultMenteeId);
        await saveMenteeId(defaultMenteeId);
      } finally {
        setIsMenteeIdLoading(false);
      }
    };
    loadMenteeId();
  }, []);

  const project = route?.params?.project || {
    title: 'React로 만드는 실시간 채팅 앱',
    mentor: '김민준 멘토',
    category: '개발',
    price: '180,000원',
  };
  
  const mentor = route?.params?.mentor || null;

  const paymentMethods = [
    { id: 'card', name: '신용/체크카드', icon: CreditCardIcon },
    { id: 'toss', name: '토스페이', icon: TossPayIcon },
    { id: 'mobile', name: '휴대폰 결제', icon: MobilePaymentIcon },
    { id: 'bank', name: '계좌이체', icon: BankTransferIcon },
  ];

  const isPaymentButtonEnabled = selectedPaymentMethod !== null && isAgreed && !isProcessing;

  // 결제 처리 함수
  const handlePayment = async () => {
    if (!isPaymentButtonEnabled || !project?.id) {
      return;
    }

    // 멘티 ID가 아직 로딩 중이면 대기
    if (isMenteeIdLoading) {
      Alert.alert('로딩 중', '사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      setIsProcessing(true);

      // 멘티 ID 재확인 (로딩 완료 후에도 null일 수 있음)
      let finalMenteeId = menteeId;
      if (!finalMenteeId) {
        // 멘티 ID가 없으면 다시 로드 시도
        finalMenteeId = await getMenteeId();
        if (!finalMenteeId) {
          // 멘티 ID가 없으면 결제 불가
          Alert.alert('오류', '멘티 프로필을 먼저 완성해주세요.');
          setIsProcessing(false);
          return;
        }
      }

      // 금액 추출 (문자열에서 숫자만 추출)
      const amount = project.price 
        ? parseInt(project.price.replace(/[^0-9]/g, ''), 10) 
        : 180000;
      
      // 주문 ID 생성 (타임스탬프 기반)
      const orderId = `ORDER_${Date.now()}_${project.id}`;
      
      if (!finalMenteeId) {
        Alert.alert('오류', '멘티 프로필을 먼저 완성해주세요.');
        setIsProcessing(false);
        return;
      }

      // 토스 페이먼츠 없이 바로 결제 완료 처리 (DB에 저장)
      const paymentData = {
        paymentKey: `PAYMENT_KEY_${Date.now()}`, // 더미 키
        orderId: orderId,
        amount: amount.toString(),
        projectId: project.id,
        menteeId: finalMenteeId,
      };

      console.log('결제 요청 (토스 없이 바로 처리):', paymentData);
      
      try {
        // 결제 승인 API 호출 (백엔드에서 프로젝트 참여 자동 등록)
        const result = await confirmPayment(paymentData);
        console.log('✅ 결제 완료 및 DB 저장 성공:', result);
        
        // 결제 성공 시 멘티 ID 저장 (반드시 저장)
        await saveMenteeId(finalMenteeId);
        setMenteeId(finalMenteeId);
        console.log('✅ 결제 완료 후 멘티 ID 저장:', finalMenteeId);
        
        // 결제 완료한 프로젝트 ID 저장 (프론트엔드 캐시용)
        await addAppliedProjectId(project.id);
        console.log('✅ 결제 완료 프로젝트 ID 저장:', project.id);
      } catch (paymentError) {
        console.error('❌ 결제 처리 실패:', paymentError);
        Alert.alert(
          '결제 실패',
          paymentError.response?.data?.message || paymentError.message || '결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
          [{ text: '확인' }]
        );
        setIsProcessing(false);
        return;
      }
      
      // 결제 완료 후 PaymentComplete 화면으로 이동
      navigation.navigate('PaymentComplete', { 
        project: {
          ...project,
          id: project.id,
        }, 
        mentor 
      });
    } catch (error) {
      console.error('결제 실패:', error);
      Alert.alert(
        '결제 실패',
        error.response?.data?.message || error.message || '결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
        [{ text: '확인' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <BackArrowIcon width={24} height={24} color="#5D5D7A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>결제하기</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Project Info Card */}
        <View style={styles.projectCard}>
          <View style={styles.projectImageContainer}>
            <ContainerIcon width={80} height={80} />
          </View>
          <View style={styles.projectInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{project.category}</Text>
            </View>
            <Text style={styles.projectTitle} numberOfLines={2}>
              {project.title}
            </Text>
            <Text style={styles.mentorName}>{project.mentor}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 수단</Text>
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              const isSelected = selectedPaymentMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodButton,
                    isSelected && styles.paymentMethodButtonSelected,
                  ]}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentMethodIconContainer}>
                    <IconComponent
                      width={24}
                      height={24}
                      isSelected={isSelected}
                    />
                  </View>
                  <Text
                    style={[
                      styles.paymentMethodText,
                      isSelected && styles.paymentMethodTextSelected,
                    ]}
                  >
                    {method.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentInfoCard}>
          <Text style={styles.sectionTitle}>결제 정보</Text>
          <View style={styles.paymentInfoContent}>
            <View style={styles.paymentInfoRow}>
              <Text style={styles.paymentInfoLabel}>프로젝트 참가비</Text>
              <Text style={styles.paymentInfoValue}>{project.price}</Text>
            </View>
            <View style={styles.paymentInfoRow}>
              <Text style={styles.paymentInfoLabel}>할인</Text>
              <Text style={styles.paymentInfoDiscount}>-0원</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.paymentInfoRow}>
              <Text style={styles.paymentInfoTotalLabel}>총 결제금액</Text>
              <Text style={styles.paymentInfoTotalValue}>{project.price}</Text>
            </View>
          </View>
        </View>

        {/* Agreement Checkbox */}
        <View style={styles.agreementContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsAgreed(!isAgreed)}
            activeOpacity={0.7}
          >
            {isAgreed && (
              <CheckIcon width={16} height={16} color="#1E78FF" />
            )}
          </TouchableOpacity>
          <View style={styles.agreementTextContainer}>
            <Text style={styles.agreementMainText}>
              결제 정보 확인 및 구매 조건 동의
            </Text>
            <Text style={styles.agreementSubText}>
              환불 정책 및 이용약관에 동의합니다
            </Text>
          </View>
        </View>

        {/* Refund Policy */}
        <View style={styles.policyCard}>
          <Text style={styles.policyTitle}>TISHOO 프로젝트 환불 규정 안내</Text>
          <Text style={styles.policyItem}>
            • 중도 포기 / 중도 하차 시 환불 불가
          </Text>
          <Text style={styles.policyItem}>
            • 참여율과 진행률에 관계없이 동일하게 적용됩니다.
          </Text>
          <Text style={styles.policyItem}>
            • 멘토의 일정 문제·중단 등 운영 측 과실이 확인될 경우 전액 환불됩니다.
          </Text>
          <Text style={styles.policyItem}>
            • 멘티의 개인 사유는 환불 사유에 해당하지 않습니다.
          </Text>
          <Text style={styles.policyItem}>
            • 공유 계정 사용, 무단 자료 배포 등 부정 이용 시 강제 중도 종료 및 환불 불가가 적용됩니다.
          </Text>
        </View>

        {/* Project Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>프로젝트 참여 혜택</Text>
          <Text style={styles.benefitItem}>• 1:1 멘토링 및 피드백</Text>
          <Text style={styles.benefitItem}>• 프로젝트 완수 인증서</Text>
          <Text style={styles.benefitItem}>• 포트폴리오 제작 지원</Text>
        </View>
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            !isPaymentButtonEnabled && styles.paymentButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!isPaymentButtonEnabled}
          activeOpacity={0.7}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.paymentButtonText}>
              {project.price} 결제하기
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 15.994,
    paddingBottom: 15.994,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#e8e8f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 20.686,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  projectImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16.4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  projectInfo: {
    flex: 1,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#faf8ff',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8.18,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 21,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 25.6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    marginBottom: 12,
  },
  paymentMethodsContainer: {
    gap: 8,
  },
  paymentMethodButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.394,
    borderColor: '#e8e8f0',
    borderRadius: 16.4,
    height: 58.781,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17.388,
    paddingRight: 1.394,
    gap: 12,
  },
  paymentMethodButtonSelected: {
    borderColor: '#1e78ff',
    borderWidth: 1.394,
  },
  paymentMethodIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    lineHeight: 24,
  },
  paymentMethodTextSelected: {
    color: '#1e78ff',
  },
  paymentInfoCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 20.686,
    marginBottom: 24,
  },
  paymentInfoContent: {
    gap: 12,
  },
  paymentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfoLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 24,
  },
  paymentInfoValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
  },
  paymentInfoDiscount: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fb23cb',
    lineHeight: 24,
  },
  divider: {
    height: 0.991,
    backgroundColor: '#e8e8f0',
    marginVertical: 12,
  },
  paymentInfoTotalLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
  },
  paymentInfoTotalValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  agreementContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.394,
    borderColor: '#e8e8f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    borderColor: '#1e78ff',
    backgroundColor: '#ffffff',
  },
  agreementTextContainer: {
    flex: 1,
    gap: 4,
  },
  agreementMainText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 25.6,
  },
  agreementSubText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
  },
  policyCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    borderRadius: 16.4,
    padding: 16.69,
    marginBottom: 24,
    gap: 4,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 21,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  policyItem: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 21,
    letterSpacing: -0.3,
  },
  benefitsCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    borderRadius: 16.4,
    padding: 16.69,
    gap: 8,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 21,
    marginBottom: 4,
  },
  benefitItem: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 21,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e8e8f0',
    paddingTop: 24.693,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  paymentButton: {
    backgroundColor: '#1e78ff',
    height: 55.994,
    borderRadius: 16.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentButtonDisabled: {
    backgroundColor: '#1e78ff',
    opacity: 0.5,
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
});

