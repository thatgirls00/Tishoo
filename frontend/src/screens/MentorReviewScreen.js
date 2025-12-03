import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import ArrowLeftIcon from '../components/ArrowLeftIcon';
import FeedbackQualityIcon from '../components/FeedbackQualityIcon';
import CommunicationIcon from '../components/CommunicationIcon';
import TimeManagementIcon from '../components/TimeManagementIcon';
import StarFilledIcon from '../components/StarFilledIcon';
import StarEmptyIcon from '../components/StarEmptyIcon';

export default function MentorReviewScreen({ navigation, route }) {
  const project = route?.params?.project || {
    title: 'React로 만드는 실시간 채팅 앱',
    mentor: '김민준 멘토',
  };

  const [feedbackRating, setFeedbackRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [timeManagementRating, setTimeManagementRating] = useState(0);

  const isFormValid = feedbackRating > 0 && communicationRating > 0 && timeManagementRating > 0;

  const handleNext = () => {
    if (isFormValid) {
      // 다음 단계로 이동 (추후 구현)
      navigation.navigate('MentorReviewStep2', {
        project,
        ratings: {
          feedback: feedbackRating,
          communication: communicationRating,
          timeManagement: timeManagementRating,
        },
      });
    }
  };

  const renderStars = (rating, onPress) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            style={styles.starButton}
            onPress={() => onPress(star)}
            activeOpacity={0.7}
          >
            {star <= rating ? (
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon width={24} height={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>멘토 리뷰 작성</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { flex: 1 }]} />
            <View style={[styles.progressBarEmpty, { flex: 1 }]} />
            <View style={[styles.progressBarEmpty, { flex: 1 }]} />
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
          <Text style={styles.mentorName}>{project.mentor || '김민준 멘토'}</Text>
          <Text style={styles.projectTitle}>{project.title}</Text>
        </View>

        {/* Rating Cards */}
        <View style={styles.ratingCardsContainer}>
          {/* Feedback Quality */}
          <View style={styles.ratingCard}>
            <View style={styles.ratingCardHeader}>
              <View style={[styles.ratingIconContainer, { backgroundColor: 'rgba(30, 120, 255, 0.1)' }]}>
                <FeedbackQualityIcon width={20} height={20} color="#1e78ff" />
              </View>
              <View style={styles.ratingCardContent}>
                <Text style={styles.ratingCardTitle}>피드백의 질</Text>
                <Text style={styles.ratingCardDescription}>
                  멘토의 피드백이 얼마나 도움이 되었나요?
                </Text>
              </View>
            </View>
            {renderStars(feedbackRating, setFeedbackRating)}
          </View>

          {/* Communication & Attitude */}
          <View style={styles.ratingCard}>
            <View style={styles.ratingCardHeader}>
              <View style={[styles.ratingIconContainer, { backgroundColor: 'rgba(251, 35, 203, 0.1)' }]}>
                <CommunicationIcon width={20} height={20} color="#FB23CB" />
              </View>
              <View style={styles.ratingCardContent}>
                <Text style={styles.ratingCardTitle}>소통 & 태도</Text>
                <Text style={styles.ratingCardDescription}>
                  멘토와의 소통은 원활했나요?
                </Text>
              </View>
            </View>
            {renderStars(communicationRating, setCommunicationRating)}
          </View>

          {/* Time Management */}
          <View style={styles.ratingCard}>
            <View style={styles.ratingCardHeader}>
              <View style={[styles.ratingIconContainer, { backgroundColor: 'rgba(255, 180, 200, 0.1)' }]}>
                <TimeManagementIcon width={20} height={20} color="#FFB4C8" />
              </View>
              <View style={styles.ratingCardContent}>
                <Text style={styles.ratingCardTitle}>시간 관리</Text>
                <Text style={styles.ratingCardDescription}>
                  일정과 시간 약속을 잘 지켰나요?
                </Text>
              </View>
            </View>
            {renderStars(timeManagementRating, setTimeManagementRating)}
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          activeOpacity={0.7}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#000000',
    shadowColor: 'rgba(124, 107, 240, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 16,
    paddingBottom: 16,
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
    lineHeight: 25.2,
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
  progressBarEmpty: {
    backgroundColor: '#e2e2e8',
    borderRadius: 2,
    height: 4,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 24,
    gap: 32,
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
    lineHeight: 32,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 25.6,
  },
  ratingCardsContainer: {
    gap: 16,
  },
  ratingCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 16,
    padding: 24.693,
    paddingTop: 24.693,
    paddingBottom: 0.697,
    gap: 16,
  },
  ratingCardHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  ratingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 16.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingCardContent: {
    flex: 1,
    gap: 4.181,
  },
  ratingCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  ratingCardDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
    paddingTop: 24.693,
    paddingBottom: 24.693,
    paddingHorizontal: 24,
  },
  nextButton: {
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(124, 107, 240, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  nextButtonDisabled: {
    backgroundColor: '#e2e2e8',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
});

