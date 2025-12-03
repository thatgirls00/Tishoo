import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getUserName } from '../utils/storage';
import { createMentor } from '../services/mentorService';
import MentorIcon4 from '../components/MentorIcon4';
import MentorIcon3 from '../components/MentorIcon3';
import MentorIcon2 from '../components/MentorIcon2';
import MentorIcon1 from '../components/MentorIcon1';
import MentorIcon from '../components/MentorIcon';
import MentorIcon5 from '../components/MentorIcon5';
import MentorGroupIcon from '../components/MentorGroupIcon';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

const MENTORING_STYLES = [
  '실습 중심 코칭',
  '이론과 실무 병행',
  '자율학습 가이드',
  '집중 피드백형',
];

export default function MentorProfileStep4Screen({ navigation, route }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [userName, setUserName] = useState('박도현'); // 기본값
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profileData = route?.params || {};

  // 이름 불러오기
  React.useEffect(() => {
    const loadUserName = async () => {
      const name = profileData.name || route?.params?.name || await getUserName();
      if (name) {
        setUserName(name);
      }
    };
    loadUserName();
  }, [profileData.name, route?.params?.name]);

  const toggleStyle = (style) => {
    if (selectedStyle === style) {
      setSelectedStyle(null);
    } else {
      setSelectedStyle(style);
    }
  };

  const isFormValid = selectedStyle !== null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 15.994 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation) {
              navigation.goBack();
            }
          }}
        >
          <MentorIcon4 width={24} height={24} color="#5D5D7A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>멘토 프로필 작성</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressIconsContainer}>
          {/* Step 1 (기본정보) */}
          <View style={styles.progressIconActive}>
            <MentorIcon3 width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLine} />
          
          {/* Step 2 (전문성) */}
          <View style={styles.progressIconActive}>
            <MentorIcon2 width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLine} />
          
          {/* Step 3 (스킬셋) */}
          <View style={styles.progressIconActive}>
            <MentorIcon1 width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLine} />
          
          {/* Step 4 - Active (멘토링) */}
          <View style={styles.progressIconActive}>
            <MentorIcon width={20} height={20} color="#FFFFFF" />
          </View>
        </View>
        
        {/* Progress Labels */}
        <View style={styles.progressLabelsContainer}>
          <Text style={[styles.progressLabelActive, { left: 20 - 35 }]} numberOfLines={1}>기본정보</Text>
          <Text style={[styles.progressLabelActive, { left: 95.134 - 35 }]} numberOfLines={1}>전문성</Text>
          <Text style={[styles.progressLabelActive, { left: 170.268 - 35 }]} numberOfLines={1}>스킬셋</Text>
          <Text style={[styles.progressLabelActive, { left: 245.402 - 35 }]} numberOfLines={1}>멘토링</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Mentoring Style Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>멘토링 스타일</Text>
            <View style={styles.styleOptionsContainer}>
              {MENTORING_STYLES.map((style) => {
                const isSelected = selectedStyle === style;
                return (
                  <TouchableOpacity
                    key={style}
                    style={[
                      styles.styleOption,
                      isSelected && styles.styleOptionSelected,
                    ]}
                    onPress={() => toggleStyle(style)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.styleOptionText,
                        isSelected && styles.styleOptionTextSelected,
                      ]}
                    >
                      {style}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Mentor Card Preview */}
          <View style={styles.previewCard}>
            <Text style={styles.previewCardTitle}>멘토 카드 미리보기</Text>
            
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <MentorGroupIcon width={38} height={30} color="#FFFFFF" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileRole}>스타트업 프론트엔드 개발자</Text>
              </View>
            </View>

            {/* Mentoring Style Section */}
            <View style={styles.mentoringStyleSection}>
              <Text style={styles.mentoringStyleLabel}>멘토링 스타일</Text>
              <Text style={styles.mentoringStyleValue}>
                {selectedStyle || '선택해주세요'}
              </Text>
            </View>

            {/* Skill Tag */}
            <View style={styles.skillTagContainer}>
              <View style={styles.skillTag}>
                <Text style={styles.skillTagText}>Figma</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            !isFormValid && styles.completeButtonDisabled,
          ]}
          onPress={async () => {
            if (isFormValid && navigation) {
              try {
                setIsSubmitting(true);
                
                // 멘토 등록 API 호출
                const mentorData = {
                  name: profileData.name || userName,
                  title: profileData.career || '멘토', // 주요 경력을 title로 사용
                  profileImageUrl: profileData.portfolioUrl || '', // 포트폴리오 URL을 프로필 이미지로 사용
                  intro: profileData.introduction || '',
                  specialty: profileData.selectedExpertise || '개발',
                  price: 50000, // 기본 가격 (나중에 설정 가능)
                };

                await createMentor(mentorData);
                
                // 성공 시 홈으로 이동
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MentorHome' }],
                });
              } catch (error) {
                console.error('멘토 등록 실패:', error);
                Alert.alert(
                  '등록 실패',
                  error.message || '멘토 등록에 실패했습니다. 다시 시도해주세요.',
                  [{ text: '확인' }]
                );
              } finally {
                setIsSubmitting(false);
              }
            }
          }}
          disabled={!isFormValid || isSubmitting}
          activeOpacity={0.7}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <MentorIcon5 width={20} height={20} color="#FFFFFF" />
              <Text style={styles.completeButtonText}>프로필 완성</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbff',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#000000',
    paddingHorizontal: 24,
    paddingBottom: 0.697,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  progressIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320.694,
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fb23cb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLine: {
    height: 2.147,
    width: 35.134,
    backgroundColor: '#e8e8f0',
    marginHorizontal: 0,
  },
  progressLabelsContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 320.694,
    marginTop: 8,
    paddingHorizontal: 0,
    position: 'relative',
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
    position: 'absolute',
    textAlign: 'center',
    width: 70,
  },
  progressLabelActive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fb23cb',
    lineHeight: 21,
    position: 'absolute',
    textAlign: 'center',
    width: 70,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentSection: {
    width: '100%',
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#fafbff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1a1a2e',
    lineHeight: 24,
  },
  styleOptionsContainer: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  styleOption: {
    backgroundColor: '#ffffff',
    borderWidth: 1.394,
    borderColor: '#e8e8f0',
    borderRadius: 16.4,
    height: 58.781,
    paddingHorizontal: 17.39,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  styleOptionSelected: {
    borderColor: '#fb23cb',
    borderWidth: 1.394,
  },
  styleOptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2b2b2b',
    lineHeight: 24,
  },
  styleOptionTextSelected: {
    color: '#2b2b2b',
  },
  previewCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 24.69,
    minHeight: 264.379,
  },
  previewCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffdcf7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
  },
  profileRole: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  mentoringStyleSection: {
    marginBottom: 16,
    gap: 4,
  },
  mentoringStyleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  mentoringStyleValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
    lineHeight: 25.6,
  },
  skillTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#fafbff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 100,
    paddingHorizontal: 12.695,
    paddingVertical: 8.873,
    height: 33.392,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c6c6c',
    lineHeight: 21,
  },
  buttonSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingTop: 24.693,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
    backgroundColor: '#ffffff',
  },
  completeButton: {
    backgroundColor: '#fb23cb',
    borderRadius: 12,
    paddingVertical: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.844,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.531,
    elevation: 3,
  },
  completeButtonDisabled: {
    backgroundColor: '#9b9baa',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 24,
  },
});

