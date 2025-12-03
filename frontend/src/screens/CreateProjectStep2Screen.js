import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

const DURATIONS = ['4주', '6주', '8주', '12주'];
const DIFFICULTIES = ['입문', '초급', '중급', '고급'];

export default function CreateProjectStep2Screen({ navigation, route }) {
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [recruitCount, setRecruitCount] = useState(1);

  const isFormValid = duration && difficulty && recruitCount > 0;

  const handleDecrease = () => {
    if (recruitCount > 1) {
      setRecruitCount(recruitCount - 1);
    }
  };

  const handleIncrease = () => {
    setRecruitCount(recruitCount + 1);
  };

  const handleNext = () => {
    if (isFormValid && navigation) {
      navigation.navigate('CreateProjectStep3', {
        ...route?.params,
        duration,
        difficulty,
        recruitCount,
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
              <View style={[styles.progressCircle, styles.progressCircleActive]}>
                <CreateProjectIcon2 width={20} height={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.progressLabel, styles.progressLabelActive]}>일정/인원</Text>
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
        {/* Project Duration */}
        <View style={styles.section}>
          <Text style={styles.label}>프로젝트 기간</Text>
          <View style={styles.optionsGrid}>
            {DURATIONS.map((dur) => (
              <TouchableOpacity
                key={dur}
                style={[
                  styles.optionButton,
                  duration === dur && styles.optionButtonActive,
                ]}
                onPress={() => setDuration(dur)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    duration === dur && styles.optionButtonTextActive,
                  ]}
                >
                  {dur}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Difficulty */}
        <View style={styles.section}>
          <Text style={styles.label}>난이도</Text>
          <View style={styles.optionsGrid}>
            {DIFFICULTIES.map((diff) => (
              <TouchableOpacity
                key={diff}
                style={[
                  styles.optionButton,
                  difficulty === diff && styles.optionButtonActive,
                ]}
                onPress={() => setDifficulty(diff)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    difficulty === diff && styles.optionButtonTextActive,
                  ]}
                >
                  {diff}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recruit Count */}
        <View style={styles.section}>
          <Text style={styles.label}>모집 인원</Text>
          <View style={styles.recruitContainer}>
            <TouchableOpacity
              style={styles.recruitButton}
              onPress={handleDecrease}
              activeOpacity={0.7}
              disabled={recruitCount <= 1}
            >
              <Text style={[styles.recruitButtonText, recruitCount <= 1 && styles.recruitButtonTextDisabled]}>
                -
              </Text>
            </TouchableOpacity>
            <View style={styles.recruitCountContainer}>
              <Text style={styles.recruitCountText}>{recruitCount}명</Text>
            </View>
            <TouchableOpacity
              style={styles.recruitButton}
              onPress={handleIncrease}
              activeOpacity={0.7}
            >
              <Text style={styles.recruitButtonText}>+</Text>
            </TouchableOpacity>
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
    fontWeight: '400',
    color: '#1A1A2E',
    lineHeight: 24,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    width: (SCREEN_WIDTH - 48 - 8) / 2,
    height: 50.79,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.394,
    borderColor: '#E8E8F0',
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonActive: {
    borderColor: '#FB23CB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  optionButtonTextActive: {
    color: '#2B2B2B',
  },
  recruitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  recruitButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E8E8F0',
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recruitButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  recruitButtonTextDisabled: {
    color: '#E8E8F0',
  },
  recruitCountContainer: {
    width: 225,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recruitCountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
    lineHeight: 25.2,
    letterSpacing: -0.18,
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

