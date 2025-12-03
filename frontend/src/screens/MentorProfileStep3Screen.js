import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import MentorIcon4 from '../components/MentorIcon4';
import MentorIcon3 from '../components/MentorIcon3';
import MentorIcon2 from '../components/MentorIcon2';
import MentorIcon1 from '../components/MentorIcon1';
import MentorIcon from '../components/MentorIcon';
import MentorIcon5 from '../components/MentorIcon5';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

const SKILL_OPTIONS = [
  'React',
  'Vue',
  'TypeScript',
  'Python',
  'Java',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'Jira',
];

export default function MentorProfileStep3Screen({ navigation, route }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const profileData = route?.params || {};

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const isFormValid = selectedSkills.length > 0 && portfolioUrl.trim().length > 0;

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
          
          {/* Step 3 - Active (스킬셋) */}
          <View style={styles.progressIconActive}>
            <MentorIcon1 width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLine} />
          
          {/* Step 4 (멘토링) */}
          <View style={styles.progressIcon}>
            <MentorIcon width={20} height={20} color="#9B9BAA" />
          </View>
        </View>
        
        {/* Progress Labels */}
        <View style={styles.progressLabelsContainer}>
          <Text style={[styles.progressLabelActive, { left: 20 - 35 }]} numberOfLines={1}>기본정보</Text>
          <Text style={[styles.progressLabelActive, { left: 95.134 - 35 }]} numberOfLines={1}>전문성</Text>
          <Text style={[styles.progressLabelActive, { left: 170.268 - 35 }]} numberOfLines={1}>스킬셋</Text>
          <Text style={[styles.progressLabel, { left: 245.402 - 35 }]} numberOfLines={1}>멘토링</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Skills Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>보유 스킬 (복수 선택)</Text>
            <View style={styles.chipsContainer}>
              {SKILL_OPTIONS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <TouchableOpacity
                    key={skill}
                    style={[
                      styles.chip,
                      isSelected && styles.chipSelected,
                    ]}
                    onPress={() => toggleSkill(skill)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {skill}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Portfolio URL Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>대표 프로젝트 / 포트폴리오</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="github.com/dohyun-dev"
                placeholderTextColor="#9B9BAA"
                value={portfolioUrl}
                onChangeText={setPortfolioUrl}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Text style={styles.hintText}>GitHub, Behance, 개인 사이트 등</Text>
          </View>
        </View>
      </ScrollView>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isFormValid && styles.nextButtonDisabled,
          ]}
          onPress={() => {
            if (isFormValid && navigation) {
              navigation.navigate('MentorProfileStep4', {
                ...profileData,
                selectedSkills,
                portfolioUrl,
              });
            }
          }}
          disabled={!isFormValid}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>다음</Text>
          <MentorIcon5 width={20} height={20} color="#FFFFFF" />
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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    width: '100%',
  },
  chip: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 100,
    paddingHorizontal: 15.99,
    paddingVertical: 7.08,
    height: 41.383,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 59.26,
  },
  chipSelected: {
    backgroundColor: '#fb23cb',
    borderColor: '#fb23cb',
    borderWidth: 0.697,
  },
  chipText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5d5d7a',
    lineHeight: 24,
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  textInputContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16.4,
    height: 49.374,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2b2b2b',
    padding: 0,
  },
  hintText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
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
  nextButton: {
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
  nextButtonDisabled: {
    backgroundColor: '#9b9baa',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 24,
  },
});

