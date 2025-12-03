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
import CurriculumIcon from '../components/CurriculumIcon';
import PriceIcon from '../components/PriceIcon';
import ArrowRightIcon3 from '../components/ArrowRightIcon3';
import PlusIcon4 from '../components/PlusIcon4';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

export default function CreateProjectStep3Screen({ navigation, route }) {
  const [curriculumWeeks, setCurriculumWeeks] = useState([
    { id: 1, week: 1, title: '', content: '' },
  ]);

  const addWeek = () => {
    const newWeek = {
      id: curriculumWeeks.length + 1,
      week: curriculumWeeks.length + 1,
      title: '',
      content: '',
    };
    setCurriculumWeeks([...curriculumWeeks, newWeek]);
  };

  const updateWeek = (id, field, value) => {
    setCurriculumWeeks(
      curriculumWeeks.map((week) =>
        week.id === id ? { ...week, [field]: value } : week
      )
    );
  };

  const isFormValid = curriculumWeeks.every(
    (week) => week.title.trim() && week.content.trim()
  ) && curriculumWeeks.length > 0;

  const handleNext = () => {
    if (isFormValid && navigation) {
      navigation.navigate('CreateProjectStep4', {
        ...route?.params,
        curriculumWeeks,
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
              <View style={[styles.progressCircle, styles.progressCircleActive]}>
                <CurriculumIcon width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelActive]}>커리큘럼</Text>
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
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>주차별 커리큘럼</Text>
          <TouchableOpacity
            style={styles.addWeekButton}
            onPress={addWeek}
            activeOpacity={0.7}
          >
            <PlusIcon4 width={16} height={16} color="#FFFFFF" />
            <Text style={styles.addWeekButtonText}>주차 추가</Text>
          </TouchableOpacity>
        </View>

        {/* Curriculum Weeks */}
        {curriculumWeeks.map((week) => (
          <View key={week.id} style={styles.weekCard}>
            <View style={styles.weekLabel}>
              <Text style={styles.weekLabelText}>{week.week}주차</Text>
            </View>
            <View style={styles.weekInputContainer}>
              <TextInput
                style={styles.weekTitleInput}
                value={week.title}
                onChangeText={(value) => updateWeek(week.id, 'title', value)}
                placeholder="주차 제목"
                placeholderTextColor="rgba(43, 43, 43, 0.5)"
              />
            </View>
            <View style={styles.weekTextAreaContainer}>
              <TextInput
                style={styles.weekContentInput}
                value={week.content}
                onChangeText={(value) => updateWeek(week.id, 'content', value)}
                placeholder="학습 내용 및 과제"
                placeholderTextColor="rgba(43, 43, 43, 0.5)"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        ))}
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
    backgroundColor: '#FDFCFD',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    lineHeight: 24,
  },
  addWeekButton: {
    backgroundColor: '#FB23CB',
    borderRadius: 10,
    height: 36.984,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  addWeekButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 21,
  },
  weekCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 16,
    padding: 16.69,
    marginBottom: 16,
  },
  weekLabel: {
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  weekLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6C6C',
    lineHeight: 21,
  },
  weekInputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 10,
    height: 41.361,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    marginBottom: 12,
  },
  weekTitleInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  weekTextAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 10,
    height: 89.331,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  weekContentInput: {
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
    backgroundColor: 'rgba(251, 35, 203, 0.5)',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

