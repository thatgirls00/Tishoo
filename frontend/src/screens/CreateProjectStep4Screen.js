import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getUserName } from '../utils/storage';
import { createProject } from '../services/projectService';
import { getAllMentors } from '../services/mentorService';
import ArrowLeftIcon3 from '../components/ArrowLeftIcon3';
import CreateProjectIcon1 from '../components/CreateProjectIcon1';
import CreateProjectIcon2 from '../components/CreateProjectIcon2';
import CurriculumIcon from '../components/CurriculumIcon';
import PriceIcon from '../components/PriceIcon';
import CheckIcon2 from '../components/CheckIcon2';
import HeartIcon3 from '../components/HeartIcon3';
import CalendarIcon2 from '../components/CalendarIcon2';
import UsersIcon3 from '../components/UsersIcon3';
import ShareIcon from '../components/ShareIcon';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

const formatCurrency = (value) => {
  if (!value) return '';
  const numValue = value.replace(/,/g, '');
  return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function CreateProjectStep4Screen({ navigation, route }) {
  const projectData = route?.params || {};
  const [projectPrice, setProjectPrice] = useState('');
  const [skills, setSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mentorId, setMentorId] = useState(null);
  const [userName, setUserName] = useState('');

  // 멘토 ID 가져오기 (이름으로 찾기)
  useEffect(() => {
    const loadMentorId = async () => {
      try {
        const name = await getUserName();
        if (name) {
          setUserName(name);
          const mentors = await getAllMentors();
          const mentor = mentors?.find((m) => m.name === name);
          if (mentor) {
            setMentorId(mentor.id);
          }
        }
      } catch (error) {
        console.error('멘토 ID 로드 실패:', error);
      }
    };
    loadMentorId();
  }, []);

  const handlePriceChange = (text) => {
    // Remove "원" and non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setProjectPrice(formatCurrency(numericValue));
  };

  const isFormValid = projectPrice.trim() && skills.trim();

  const handleCreateProject = async () => {
    if (isFormValid && navigation) {
      if (!mentorId) {
        Alert.alert('오류', '멘토 정보를 찾을 수 없습니다. 다시 시도해주세요.');
        return;
      }

      try {
        setIsSubmitting(true);

        // 커리큘럼 데이터 준비
        const curriculumData = projectData.curriculumWeeks || [];
        const curriculum = JSON.stringify(
          curriculumData.map((week) => ({
            week: week.week,
            title: week.title,
            content: week.content,
          }))
        );

        // 스킬 배열 준비
        const skillsArray = skills
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        // 프로젝트 개설 API 호출
        const projectRequest = {
          mentorId: mentorId,
          title: projectData.projectTitle || '',
          description: projectData.projectDescription || '',
          curriculum: curriculum,
          skills: skillsArray,
          price: parseInt(projectPrice.replace(/,/g, ''), 10),
          duration: parseInt(projectData.duration?.replace('주', '') || '4', 10),
          thumbnailUrl: '', // TODO: 썸네일 이미지 업로드 기능 추가 시
        };

        await createProject(projectRequest);

        // 성공 시 탐색 화면으로 이동
        navigation.reset({
          index: 0,
          routes: [{ name: 'MentorSearch' }],
        });
      } catch (error) {
        console.error('프로젝트 개설 실패:', error);
        Alert.alert(
          '프로젝트 개설 실패',
          error.message || '프로젝트 개설에 실패했습니다. 다시 시도해주세요.',
          [{ text: '확인' }]
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Extract skills from skills text for preview
  const skillTags = skills
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFBFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon3 width={24} height={24} color="#5D5D7A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>프로젝트 개설</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressSteps}>
            <View style={styles.progressStep}>
              <View style={[styles.progressCircle, styles.progressCircleCompleted]}>
                <CreateProjectIcon1 width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelCompleted]}>기본정보</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={[styles.progressCircle, styles.progressCircleCompleted]}>
                <CreateProjectIcon2 width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelCompleted]}>일정/인원</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={[styles.progressCircle, styles.progressCircleCompleted]}>
                <CurriculumIcon width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelCompleted]}>커리큘럼</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={[styles.progressCircle, styles.progressCircleActive]}>
                <PriceIcon width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelActive]}>가격설정</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Project Price */}
        <View style={styles.section}>
          <Text style={styles.label}>프로젝트 참가비 (원)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={projectPrice}
              onChangeText={handlePriceChange}
              placeholder="참가비를 입력하세요"
              placeholderTextColor="rgba(43, 43, 43, 0.5)"
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.feeNote}>TISHOO 수수료 10% 별도</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.label}>습득 가능한 스킬</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={skills}
              onChangeText={setSkills}
              placeholder="예: React, WebSocket, Node.js"
              placeholderTextColor="rgba(43, 43, 43, 0.5)"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Project Preview */}
        <View style={styles.section}>
          <Text style={styles.label}>프로젝트 미리보기</Text>
          <View style={styles.previewCard}>
            {/* Preview Image Placeholder */}
            <View style={styles.previewImageContainer}>
              <View style={styles.previewImagePlaceholder} />
            </View>

            {/* Preview Content */}
            <View style={styles.previewContent}>
              <View style={styles.previewHeader}>
                <View style={styles.previewCategory}>
                  <Text style={styles.previewCategoryText}>
                    {projectData.selectedCategory || '개발'}
                  </Text>
                </View>
                <Text style={styles.previewTitle}>
                  {projectData.projectTitle || '프로젝트 제목'}
                </Text>
                <Text style={styles.previewMentor}>멘토: {userName || '멘토'}</Text>
              </View>

              {/* Skill Tags */}
              {skillTags.length > 0 && (
                <View style={styles.previewTags}>
                  {skillTags.map((skill, index) => (
                    <View key={index} style={styles.previewTag}>
                      <Text style={styles.previewTagText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Preview Info */}
              <View style={styles.previewInfo}>
                <View style={styles.previewInfoItem}>
                  <UsersIcon3 width={16} height={16} color="#9CA3AF" />
                  <Text style={styles.previewInfoText}>
                    0/{projectData.recruitCount || 10}명
                  </Text>
                </View>
                <View style={styles.previewInfoItem}>
                  <CalendarIcon2 width={16} height={16} color="#9CA3AF" />
                  <Text style={styles.previewInfoText}>
                    {projectData.duration || '6주'}
                  </Text>
                </View>
              </View>

              {/* Preview Footer */}
              <View style={styles.previewFooter}>
                <View style={styles.previewPriceContainer}>
                  <Text style={styles.previewPriceLabel}>참가비</Text>
                  <Text style={styles.previewPrice}>
                    {projectPrice ? `${projectPrice}원` : '0원'}
                  </Text>
                </View>
                <View style={styles.previewActions}>
                  <TouchableOpacity style={styles.previewActionButton} activeOpacity={0.7}>
                    <HeartIcon3 width={20} height={20} color="#9CA3AF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.previewActionButton} activeOpacity={0.7}>
                    <ShareIcon width={20} height={20} color="#9CA3AF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.previewJoinButton} activeOpacity={0.7}>
                    <Text style={styles.previewJoinButtonText}>참여하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            !isFormValid && styles.createButtonDisabled,
          ]}
          onPress={handleCreateProject}
          activeOpacity={0.7}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <CheckIcon2 width={20} height={20} color="#FFFFFF" />
              <Text style={styles.createButtonText}>프로젝트 개설하기</Text>
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
    backgroundColor: '#FAFBFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.697,
    borderBottomColor: '#E8E8F0',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleActive: {
    backgroundColor: '#FB23CB',
  },
  progressCircleCompleted: {
    backgroundColor: '#FB23CB',
  },
  progressLine: {
    width: 35,
    height: 2.147,
    backgroundColor: '#E8E8F0',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 21,
    marginTop: 8,
    textAlign: 'center',
  },
  progressLabelActive: {
    color: '#FB23CB',
  },
  progressLabelCompleted: {
    color: '#FB23CB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A2E',
    lineHeight: 24,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 16.4,
    height: 49.374,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2B2B',
    lineHeight: 24,
    marginTop: 4,
  },
  feeNote: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 21,
    marginTop: 8,
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 16.4,
    height: 91,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2B2B',
    lineHeight: 24,
    flex: 1,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewImageContainer: {
    height: 192,
    width: '100%',
    backgroundColor: '#E8E8F0',
  },
  previewImagePlaceholder: {
    flex: 1,
    backgroundColor: '#E8E8F0',
  },
  previewContent: {
    padding: 20,
  },
  previewHeader: {
    marginBottom: 12,
  },
  previewCategory: {
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  previewCategoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FB23CB',
    lineHeight: 21,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    marginBottom: 8,
  },
  previewMentor: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 25.6,
  },
  previewTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  previewTag: {
    backgroundColor: '#FB23CB',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  previewTagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 21,
  },
  previewInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  previewInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  previewInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  previewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  previewPriceContainer: {
    flex: 1,
  },
  previewPriceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 21,
    marginBottom: 4,
  },
  previewPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FB23CB',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  previewActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  previewActionButton: {
    width: 40,
    height: 40,
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewJoinButton: {
    backgroundColor: '#FB23CB',
    borderRadius: 16.4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  previewJoinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.697,
    borderTopColor: '#E8E8F0',
    paddingTop: 24.693,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  createButton: {
    backgroundColor: '#FB23CB',
    borderRadius: 16.4,
    height: 55.994,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#E8E8F0',
    opacity: 0.5,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

