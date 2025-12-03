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
} from 'react-native';
import ArrowLeftIcon from '../components/ArrowLeftIcon';

export default function MentorReviewStep2Screen({ navigation, route }) {
  const { project, ratings } = route?.params || {};
  
  const [improvementText, setImprovementText] = useState('');

  const isFormValid = improvementText.trim().length > 0;

  const handleNext = () => {
    if (isFormValid) {
      // 다음 단계로 이동 (추후 구현)
      navigation.navigate('MentorReviewStep3', {
        project,
        ratings,
        improvement: improvementText,
      });
    }
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
            <View style={[styles.progressBarEmpty, { flex: 1 }]} />
            <View style={[styles.progressBarFill, { flex: 1 }]} />
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
          <Text style={styles.mentorName}>{project?.mentor || '김민준 멘토'}</Text>
          <Text style={styles.projectTitle}>{project?.title || 'React로 만드는 실시간 채팅 앱'}</Text>
        </View>

        {/* Improvement Input Card */}
        <View style={styles.improvementCard}>
          <Text style={styles.improvementTitle}>개선이 필요한 부분</Text>
          <Text style={styles.improvementDescription}>
            멘토에게 도움이 될 수 있는 솔직한 의견을 남겨주세요
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="예: 과제 피드백을 조금 더 빨리 받을 수 있으면&#10;좋겠어요"
              placeholderTextColor="rgba(46, 46, 46, 0.5)"
              value={improvementText}
              onChangeText={setImprovementText}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 건설적인 피드백은 멘토가 더 나은 멘토링을 제공하는 데 큰 도움이 됩니다
          </Text>
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
  improvementCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 16,
    padding: 24.69,
    gap: 16,
    minHeight: 372.447,
  },
  improvementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  improvementDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  textInputContainer: {
    backgroundColor: '#cbe0ff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 16.4,
    minHeight: 217.269,
    padding: 12,
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 24,
    minHeight: 193.269,
    textAlignVertical: 'top',
  },
  tipCard: {
    backgroundColor: 'rgba(30, 120, 255, 0.05)',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    borderRadius: 16.4,
    padding: 21.568,
    paddingTop: 21.568,
    paddingBottom: 0.697,
    paddingHorizontal: 16.69,
    paddingRight: 26.075,
    minHeight: 84.595,
  },
  tipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
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
    backgroundColor: '#1e78ff',
    opacity: 0.5,
    shadowOpacity: 0.3,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
});

