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

export default function MenteeProfileStep2Screen({ navigation, route }) {
  const profileData = route?.params || {};
  const [education, setEducation] = useState('');
  const [projectGoal, setProjectGoal] = useState('');

  const isFormValid = education.trim().length > 0 && projectGoal.trim().length > 0;

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
          
          {/* Step 2 - Active */}
          <View style={styles.progressIconActive}>
            <FolderIcon2 width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLine} />
          
          {/* Step 3 */}
          <View style={styles.progressIcon}>
            <ExpandIcon width={20} height={20} color="#9B9BAA" />
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
          <Text style={[styles.progressLabel, { left: 170.268 - 35 }]} numberOfLines={1}>사용툴</Text>
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
          {/* Education Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>학력</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="학력을 입력하세요"
                placeholderTextColor="#9B9BAA"
                value={education}
                onChangeText={setEducation}
              />
            </View>
          </View>

          {/* Project Goal Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>프로젝트 참여 목표</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="프로젝트 참여 목표를 입력하세요"
                placeholderTextColor="#9B9BAA"
                value={projectGoal}
                onChangeText={setProjectGoal}
                multiline
                textAlignVertical="top"
              />
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
              navigation.navigate('MenteeProfileStep3', {
                ...profileData,
                education,
                projectGoal,
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
    marginBottom: 16,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1a1a2e',
    lineHeight: 24,
  },
  textInputContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#d6e4eb',
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
  textAreaContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16.4,
    minHeight: 169.299,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 24,
    padding: 0,
    minHeight: 145,
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

