import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import ArrowLeftIcon2 from '../components/ArrowLeftIcon2';
import StarFilledIcon from '../components/StarFilledIcon';
import StarEmptyIcon from '../components/StarEmptyIcon';
import ThumbsUpIcon2 from '../components/ThumbsUpIcon2';
import ThumbsDownIcon from '../components/ThumbsDownIcon';

export default function MentorReviewStep3Screen({ navigation, route }) {
  const { project, ratings, improvement } = route?.params || {};
  
  const projectTitle = project?.title || 'React로 만드는 실시간 채팅 앱';
  const mentorName = project?.mentor || '김민준 멘토';
  
  const [overallRating, setOverallRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isRecommended, setIsRecommended] = useState(null); // null, true (추천해요), false (추천 안해요)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isFormValid = overallRating > 0 && message.trim().length > 0 && isRecommended !== null;

  const handleSubmit = () => {
    if (isFormValid) {
      setIsModalVisible(true);
    }
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    // MyProjectDetailScreen의 진척도 탭으로 돌아가면서 리뷰 완료 상태 전달
    // 먼저 모든 리뷰 화면을 닫고 MyProjectDetail로 이동
    navigation.navigate('MyProjectDetail', {
      project,
      reviewSubmitted: true,
      activeTab: 'progress',
    });
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            style={styles.starButton}
            onPress={() => setOverallRating(star)}
            activeOpacity={0.7}
          >
            {star <= overallRating ? (
              <StarFilledIcon width={32} height={32} color="#1e78ff" />
            ) : (
              <StarEmptyIcon width={32} height={32} color="#E2E2E8" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.containerInner}>
        {/* Header */}
        <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon2 width={24} height={24} color="#9B9BAA" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>멘토 리뷰 작성</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { flex: 1 }]} />
            <View style={[styles.progressBarFill, { flex: 1 }]} />
            <View style={[styles.progressBarFill, { flex: 1 }]} />
          </View>
          <Text style={styles.progressLabel}>멘토링 평가</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mentor Info */}
        <View style={styles.mentorInfoSection}>
          <View style={styles.mentorAvatar}>
            <Text style={styles.mentorAvatarText}>김</Text>
          </View>
          <Text style={styles.mentorName}>{mentorName}</Text>
          <Text style={styles.projectTitle}>{projectTitle}</Text>
        </View>

        {/* Overall Rating Section */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingCardTitle}>전체 평점</Text>
          {renderStars()}
          <Text style={styles.ratingHint}>
            {overallRating > 0 ? '' : '별점을 선택해주세요'}
          </Text>
        </View>

        {/* Message Section */}
        <View style={styles.messageCard}>
          <Text style={styles.messageCardTitle}>멘토에게 한 마디</Text>
          <Text style={styles.messageHint}>
            감사 인사나 응원의 메시지를 남겨보세요
          </Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder=""
              placeholderTextColor="#9b9baa"
              multiline
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Recommendation Section */}
        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationTitle}>이 멘토를 추천하시겠어요?</Text>
          <View style={styles.recommendationButtons}>
            <TouchableOpacity
              style={[
                styles.recommendationButton,
                isRecommended === true && styles.recommendationButtonSelected,
              ]}
              onPress={() => setIsRecommended(true)}
              activeOpacity={0.7}
            >
              <View style={styles.recommendationButtonContent}>
                <ThumbsUpIcon2 
                  width={20} 
                  height={20} 
                  color={isRecommended === true ? '#1E78FF' : '#9CA3AF'} 
                />
                <Text
                  style={[
                    styles.recommendationButtonText,
                    isRecommended === true && styles.recommendationButtonTextSelected,
                  ]}
                >
                  추천해요
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.recommendationButton,
                isRecommended === false && styles.recommendationButtonSelected,
              ]}
              onPress={() => setIsRecommended(false)}
              activeOpacity={0.7}
            >
              <View style={styles.recommendationButtonContent}>
                <View style={styles.thumbsDownContainer}>
                  <ThumbsDownIcon 
                    width={20} 
                    height={20} 
                    color={isRecommended === false ? '#1E78FF' : '#9CA3AF'} 
                  />
                </View>
                <Text
                  style={[
                    styles.recommendationButtonText,
                    isRecommended === false && styles.recommendationButtonTextSelected,
                  ]}
                >
                  추천 안해요
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      </View>

      {/* Submit Button */}
      <SafeAreaView edges={['bottom']} style={styles.footerContainer}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!isFormValid}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>리뷰 제출하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Review Submission Complete Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>리뷰 제출 완료 ✔️</Text>
            <Text style={styles.modalMessage}>
              리뷰가 제출되었어요! 감사합니다 :)
            </Text>
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.modalConfirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
  },
  containerInner: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 16,
    paddingBottom: 16,
    borderBottomWidth: 0.697,
    borderBottomColor: '#000000',
    shadowColor: 'rgba(124, 107, 240, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    letterSpacing: -0.18,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 32,
    gap: 8,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    height: 4,
  },
  progressBarFill: {
    backgroundColor: '#1e78ff',
    borderRadius: 2,
    height: 4,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
    gap: 24,
  },
  footerContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
  },
  mentorInfoSection: {
    alignItems: 'center',
    gap: 7,
  },
  mentorAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#9b9baa',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(124, 107, 240, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  mentorAvatarText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#ffffff',
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
  },
  ratingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    padding: 24.69,
    minHeight: 170.986,
    alignItems: 'center',
    gap: 24,
  },
  ratingCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingHint: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9b9baa',
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    padding: 24.69,
    minHeight: 298.87,
    gap: 12,
  },
  messageCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
  },
  messageHint: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
  },
  textAreaContainer: {
    backgroundColor: '#cbe0ff',
    borderRadius: 16.4,
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    minHeight: 169.299,
    padding: 16,
  },
  textArea: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 24,
    minHeight: 169.299 - 32,
  },
  recommendationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    padding: 24.69,
    gap: 16,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
  },
  recommendationButtons: {
    flexDirection: 'row',
    gap: 12,
    height: 100.36,
  },
  recommendationButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16.4,
    borderWidth: 1.394,
    borderColor: '#e2e2e8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100.36,
  },
  recommendationButtonSelected: {
    borderColor: '#1e78ff',
    borderWidth: 1.394,
  },
  recommendationButtonContent: {
    alignItems: 'center',
    gap: 8,
  },
  thumbsDownContainer: {
    transform: [{ rotate: '180deg' }],
  },
  recommendationButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
  },
  recommendationButtonTextSelected: {
    color: '#1e78ff',
  },
  footer: {
    paddingTop: 24.69,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  submitButton: {
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    height: 55.994,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(124, 107, 240, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#e2e2e8',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: 279,
    height: 179,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 10,
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e2e2e',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1e78ff',
    textAlign: 'center',
    lineHeight: 25.6,
    width: 243,
  },
  modalConfirmButton: {
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    height: 43,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalConfirmButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
  },
});

