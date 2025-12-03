import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import CheckmarkIconLarge from '../components/CheckmarkIconLarge';
import StarIcon2 from '../components/StarIcon2';
import UsersIcon2 from '../components/UsersIcon2';
import CalendarIcon from '../components/CalendarIcon';
import DifficultyLevelIcon from '../components/DifficultyLevelIcon';

export default function PaymentCompleteScreen({ navigation, route }) {
  const mentor = route?.params?.mentor || null;
  const project = route?.params?.project || {
    title: 'React로 만드는 실시간 채팅 앱',
    participants: '8/10명',
    duration: '6주',
    difficulty: '중급',
  };
  
  // mentor 정보가 별도로 전달된 경우 project.mentor를 업데이트
  const mentorInfo = mentor || project.mentor || {
    name: '김민준',
    initial: '김',
    rating: 4.9,
    reviews: 128,
  };
  
  // mentor가 객체가 아닌 문자열인 경우 처리
  const mentorName = typeof mentorInfo === 'string' 
    ? mentorInfo.replace(' 멘토', '') 
    : (mentorInfo?.name || '김민준');
  const mentorInitial = typeof mentorInfo === 'string'
    ? mentorInfo.charAt(0)
    : (mentorInfo?.initial || mentorName?.charAt(0) || '김');
  const mentorRating = typeof mentorInfo === 'object' ? (mentorInfo?.rating || 4.9) : 4.9;
  const mentorReviews = typeof mentorInfo === 'object' ? (mentorInfo?.reviews || 128) : 128;

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MenteeHome' }],
    });
  };

  const handleGoToMyProject = () => {
    navigation.navigate('MyProject', { project });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>예약완료</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <CheckmarkIconLarge width={64} height={64} color="#1E78FF" />
        </View>

        {/* Success Message */}
        <Text style={styles.successMessage}>신청이 완료되었어요!</Text>

        {/* Project Info Card */}
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <View style={styles.mentorInfo}>
            <View style={styles.mentorAvatar}>
              <Text style={styles.mentorInitial}>
                {mentorInitial}
              </Text>
            </View>
            <View style={styles.mentorDetails}>
              <Text style={styles.mentorName}>
                {mentorName}
              </Text>
              <View style={styles.mentorRating}>
                <StarIcon2 width={16} height={16} color="#FFB4C8" />
                <Text style={styles.ratingText}>
                  {mentorRating} ({mentorReviews})
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.projectDetails}>
            <View style={styles.detailItem}>
              <UsersIcon2 width={16} height={16} color="#6a6a6a" />
              <Text style={styles.detailText}>{project.participants || '8/10명'}</Text>
            </View>
            <View style={styles.detailItem}>
              <CalendarIcon width={16} height={16} color="#6a6a6a" />
              <Text style={styles.detailText}>{project.duration || '6주'}</Text>
            </View>
            <View style={styles.detailItem}>
              <DifficultyLevelIcon width={16} height={16} color="#6a6a6a" />
              <Text style={styles.detailText}>{project.difficulty || '중급'}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.myProjectButton}
            onPress={handleGoToMyProject}
            activeOpacity={0.7}
          >
            <Text style={styles.myProjectButtonText}>내 프로젝트로 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoHome}
            activeOpacity={0.7}
          >
            <Text style={styles.homeButtonText}>홈으로</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ff',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 15.994,
    paddingBottom: 15.994,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#e8e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  successIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successMessage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 31.2,
    marginBottom: 24,
    textAlign: 'center',
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 24,
    gap: 12,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  mentorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mentorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 120, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mentorInitial: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  mentorDetails: {
    gap: 4,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
    lineHeight: 25.6,
  },
  mentorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 21,
  },
  divider: {
    height: 0.697,
    backgroundColor: '#e8e8f0',
    marginVertical: 4,
  },
  projectDetails: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 16.691,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  myProjectButton: {
    backgroundColor: '#1e78ff',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  myProjectButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
  homeButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  homeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
  },
});

