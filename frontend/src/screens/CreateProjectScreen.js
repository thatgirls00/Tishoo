import React, { useState } from 'react';
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
} from 'react-native';
import ArrowLeftIcon3 from '../components/ArrowLeftIcon3';
import CreateProjectIcon1 from '../components/CreateProjectIcon1';
import CreateProjectIcon2 from '../components/CreateProjectIcon2';
import CreateProjectIcon3 from '../components/CreateProjectIcon3';
import CurriculumIcon from '../components/CurriculumIcon';
import PriceIcon from '../components/PriceIcon';
import ArrowRightIcon3 from '../components/ArrowRightIcon3';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

const CATEGORIES = [
  '디자인',
  '개발',
  '기획',
  '마케팅',
  '데이터',
  'PM',
  'UX/UI',
  '브랜딩',
];

export default function CreateProjectScreen({ navigation }) {
  const [projectTitle, setProjectTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const isFormValid = projectTitle.trim() && selectedCategory && projectDescription.trim();

  const handleNext = () => {
    if (isFormValid && navigation) {
      navigation.navigate('CreateProjectStep2', {
        projectTitle,
        selectedCategory,
        projectDescription,
      });
    }
  };

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
              <View style={[styles.progressCircle, styles.progressCircleActive]}>
                <CreateProjectIcon1 width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelActive]}>기본정보</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={styles.progressCircle}>
                <CreateProjectIcon2 width={20} height={20} color="#9B9BAA" />
              </View>
              <Text style={styles.progressLabel}>일정/인원</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={styles.progressCircle}>
                <CurriculumIcon width={20} height={20} color="#9B9BAA" />
              </View>
              <Text style={styles.progressLabel}>커리큘럼</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={styles.progressCircle}>
                <PriceIcon width={20} height={20} color="#9B9BAA" />
              </View>
              <Text style={styles.progressLabel}>가격설정</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Project Title */}
        <View style={styles.section}>
          <Text style={styles.label}>프로젝트 제목</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={projectTitle}
              onChangeText={setProjectTitle}
              placeholder="프로젝트 제목을 입력하세요"
              placeholderTextColor="#9B9BAA"
            />
          </View>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>카테고리</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Project Description */}
        <View style={styles.section}>
          <Text style={styles.label}>프로젝트 소개</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={projectDescription}
              onChangeText={setProjectDescription}
              placeholder="프로젝트에 대해 자세히 설명해주세요"
              placeholderTextColor="#9B9BAA"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isFormValid && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          activeOpacity={0.7}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>다음</Text>
          <ArrowRightIcon3 width={20} height={20} color="#FFFFFF" />
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
    fontWeight: '400',
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
    color: '#000000',
    lineHeight: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.3,
    borderColor: '#E8E8F0',
    borderRadius: 100,
    paddingHorizontal: 13.3,
    paddingVertical: 7.3,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#FB23CB',
    borderColor: '#FB23CB',
  },
  categoryChipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5D5D7A',
    lineHeight: 24,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E7E6F0',
    borderRadius: 16.4,
    height: 217.269,
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
  nextButton: {
    backgroundColor: '#FB23CB',
    borderRadius: 16.4,
    height: 55.994,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#E8E8F0',
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

