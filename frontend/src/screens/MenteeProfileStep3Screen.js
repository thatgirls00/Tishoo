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
import BackArrowIcon from '../components/BackArrowIcon';
import UserIcon from '../components/UserIcon';
import FolderIcon2 from '../components/FolderIcon2';
import ExpandIcon from '../components/ExpandIcon';
import UsersIcon from '../components/UsersIcon';
import ArrowIcon from '../components/ArrowIcon';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

const SKILL_LEVELS = ['입문', '초급', '중급', '고급'];

export default function MenteeProfileStep3Screen({ navigation, route }) {
  const profileData = route?.params || {};
  const [selectedTools, setSelectedTools] = useState([]);

  const isToolSelected = (toolName) => selectedTools.includes(toolName);
  const [field, setField] = useState('');
  const [skillLevel, setSkillLevel] = useState(null);

  const toggleTool = (toolName) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter((t) => t !== toolName));
    } else {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  const isFormValid = selectedTools.length > 0 && field.trim().length > 0 && skillLevel !== null;

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
          <BackArrowIcon width={24} height={24} color="#5D5D7A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>멘티 프로필 작성</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressIconsContainer}>
          {/* Step 1 - Completed */}
          <View style={styles.progressIconActive}>
            <UserIcon width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLineActive} />
          
          {/* Step 2 - Completed */}
          <View style={styles.progressIconActive}>
            <FolderIcon2 width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLineActive} />
          
          {/* Step 3 - Active */}
          <View style={styles.progressIconActive}>
            <ExpandIcon width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLine} />
          
          {/* Step 4 */}
          <View style={styles.progressIcon}>
            <UsersIcon width={20} height={20} color="#9B9BAA" />
          </View>
        </View>
        
        {/* Progress Labels */}
        <View style={styles.progressLabelsContainer}>
          <Text style={[styles.progressLabelActive, { left: 20 - 35 }]} numberOfLines={1}>기본정보</Text>
          <Text style={[styles.progressLabelActive, { left: 95.134 - 35 }]} numberOfLines={1}>학력/목표</Text>
          <Text style={[styles.progressLabelActive, { left: 170.268 - 35 }]} numberOfLines={1}>사용툴</Text>
          <Text style={[styles.progressLabel, { left: 245.402 - 35 }]} numberOfLines={1}>협업스타일</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Tools Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>사용 가능한 툴 (복수 선택)</Text>
            <View style={styles.toolsContainer}>
              {/* Row 1 */}
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow1Col1,
                  isToolSelected('Figma') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Figma')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Figma') && styles.toolButtonTextSelected,
                  ]}
                >
                  Figma
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow1Col2,
                  isToolSelected('Adobe XD') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Adobe XD')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Adobe XD') && styles.toolButtonTextSelected,
                  ]}
                >
                  Adobe XD
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow1Col3,
                  isToolSelected('Photoshop') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Photoshop')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Photoshop') && styles.toolButtonTextSelected,
                  ]}
                >
                  Photoshop
                </Text>
              </TouchableOpacity>

              {/* Row 2 */}
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow2Col1,
                  isToolSelected('Illustrator') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Illustrator')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Illustrator') && styles.toolButtonTextSelected,
                  ]}
                >
                  Illustrator
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow2Col2,
                  isToolSelected('React') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('React')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('React') && styles.toolButtonTextSelected,
                  ]}
                >
                  React
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow2Col3,
                  isToolSelected('Vue') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Vue')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Vue') && styles.toolButtonTextSelected,
                  ]}
                >
                  Vue
                </Text>
              </TouchableOpacity>

              {/* Row 3 */}
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow3Col1,
                  isToolSelected('TypeScript') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('TypeScript')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('TypeScript') && styles.toolButtonTextSelected,
                  ]}
                >
                  TypeScript
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow3Col2,
                  isToolSelected('Python') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Python')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Python') && styles.toolButtonTextSelected,
                  ]}
                >
                  Python
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow3Col3,
                  isToolSelected('Java') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Java')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Java') && styles.toolButtonTextSelected,
                  ]}
                >
                  Java
                </Text>
              </TouchableOpacity>

              {/* Row 4 */}
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow4Col1,
                  isToolSelected('Notion') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Notion')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Notion') && styles.toolButtonTextSelected,
                  ]}
                >
                  Notion
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow4Col2,
                  isToolSelected('Jira') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Jira')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Jira') && styles.toolButtonTextSelected,
                  ]}
                >
                  Jira
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow4Col3,
                  isToolSelected('Slack') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('Slack')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('Slack') && styles.toolButtonTextSelected,
                  ]}
                >
                  Slack
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toolButton,
                  styles.toolButtonRow4Col4,
                  isToolSelected('GitHub') && styles.toolButtonSelected,
                ]}
                onPress={() => toggleTool('GitHub')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.toolButtonText,
                    isToolSelected('GitHub') && styles.toolButtonTextSelected,
                  ]}
                >
                  GitHub
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Field Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>참여 희망 분야</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="참여 희망 분야를 입력하세요"
                placeholderTextColor="#9B9BAA"
                value={field}
                onChangeText={setField}
              />
            </View>
          </View>

          {/* Skill Level Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>현재 역량 수준</Text>
            <View style={styles.skillLevelContainer}>
              <TouchableOpacity
                style={[
                  styles.skillLevelButton,
                  styles.skillLevelButtonRow1Col1,
                  skillLevel === '입문' && styles.skillLevelButtonSelected,
                ]}
                onPress={() => setSkillLevel('입문')}
                activeOpacity={0.7}
              >
                <Text style={styles.skillLevelButtonText}>입문</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.skillLevelButton,
                  styles.skillLevelButtonRow1Col2,
                  skillLevel === '초급' && styles.skillLevelButtonSelected,
                ]}
                onPress={() => setSkillLevel('초급')}
                activeOpacity={0.7}
              >
                <Text style={styles.skillLevelButtonText}>초급</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.skillLevelButton,
                  styles.skillLevelButtonRow2Col1,
                  skillLevel === '중급' && styles.skillLevelButtonSelected,
                ]}
                onPress={() => setSkillLevel('중급')}
                activeOpacity={0.7}
              >
                <Text style={styles.skillLevelButtonText}>중급</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.skillLevelButton,
                  styles.skillLevelButtonRow2Col2,
                  skillLevel === '고급' && styles.skillLevelButtonSelected,
                ]}
                onPress={() => setSkillLevel('고급')}
                activeOpacity={0.7}
              >
                <Text style={styles.skillLevelButtonText}>고급</Text>
              </TouchableOpacity>
            </View>
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
              navigation.navigate('MenteeProfileStep4', {
                ...profileData,
                selectedTools,
                field,
                skillLevel,
              });
            }
          }}
          disabled={!isFormValid}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>다음</Text>
          <ArrowIcon width={20} height={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
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
    backgroundColor: '#1e78ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLine: {
    height: 2.147,
    width: 35.134,
    backgroundColor: '#e8e8f0',
    marginHorizontal: 0,
  },
  progressLineActive: {
    height: 2.147,
    width: 35.134,
    backgroundColor: '#1e78ff',
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
    color: '#1e78ff',
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
  toolsContainer: {
    position: 'relative',
    width: '100%',
    height: 189.506,
  },
  toolButton: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 2000000,
    paddingHorizontal: 15.99,
    paddingVertical: 7.08,
    height: 41.383,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolButtonRow1Col1: {
    left: 0,
    top: 0,
    width: 76.952,
  },
  toolButtonRow1Col2: {
    left: 84.94,
    top: 0,
    width: 103.866,
  },
  toolButtonRow1Col3: {
    left: 196.8,
    top: 0,
    width: 110.801,
  },
  toolButtonRow2Col1: {
    left: 0,
    top: 49.37,
    width: 100.632,
  },
  toolButtonRow2Col2: {
    left: 108.62,
    top: 49.37,
    width: 74.35,
  },
  toolButtonRow2Col3: {
    left: 190.96,
    top: 49.37,
    width: 61.394,
  },
  toolButtonRow3Col1: {
    left: 0,
    top: 98.75,
    width: 110.747,
  },
  toolButtonRow3Col2: {
    left: 118.74,
    top: 98.75,
    width: 84.094,
  },
  toolButtonRow3Col3: {
    left: 210.82,
    top: 98.75,
    width: 66.642,
  },
  toolButtonRow4Col1: {
    left: 0,
    top: 148.12,
    width: 80.839,
  },
  toolButtonRow4Col2: {
    left: 88.83,
    top: 148.12,
    width: 59.26,
  },
  toolButtonRow4Col3: {
    left: 156.08,
    top: 148.12,
    width: 71.889,
  },
  toolButtonRow4Col4: {
    left: 235.96,
    top: 148.12,
    width: 83.942,
  },
  toolButtonSelected: {
    backgroundColor: '#1e78ff',
    borderColor: '#1e78ff',
  },
  toolButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5d5d7a',
    lineHeight: 24,
  },
  toolButtonTextSelected: {
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
    color: '#000000',
    padding: 0,
  },
  skillLevelContainer: {
    position: 'relative',
    width: '100%',
    height: 109.571,
  },
  skillLevelButton: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderWidth: 1.394,
    borderColor: '#e8e8f0',
    borderRadius: 16.4,
    paddingHorizontal: 12,
    paddingVertical: 11.09,
    height: 50.79,
    width: 168.504,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillLevelButtonRow1Col1: {
    left: 0,
    top: 0,
  },
  skillLevelButtonRow1Col2: {
    left: 176.5,
    top: 0,
  },
  skillLevelButtonRow2Col1: {
    left: 0,
    top: 58.78,
  },
  skillLevelButtonRow2Col2: {
    left: 176.5,
    top: 58.78,
  },
  skillLevelButtonSelected: {
    borderColor: '#1e78ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.844,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.531,
    elevation: 3,
  },
  skillLevelButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 24,
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
    backgroundColor: '#1e78ff',
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

