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
} from 'react-native';
import { saveUserName, saveUserRole, saveMenteeId } from '../utils/storage';
import BackArrowIcon from '../components/BackArrowIcon';
import UserIcon from '../components/UserIcon';
import FolderIcon2 from '../components/FolderIcon2';
import ExpandIcon from '../components/ExpandIcon';
import UsersIcon from '../components/UsersIcon';
import TishooTextIcon from '../components/TishooTextIcon';
import CheckmarkIcon2 from '../components/CheckmarkIcon2';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

const COLLABORATION_STYLES = [
  '적극 소통형',
  '체계적 계획형',
  '빠른 실행형',
  '꼼꼼 분석형',
];

export default function MenteeProfileStep4Screen({ navigation, route }) {
  const profileData = route?.params || {};
  const [collaborationStyle, setCollaborationStyle] = useState(null);

  const isFormValid = collaborationStyle !== null;

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
          
          {/* Step 3 - Completed */}
          <View style={styles.progressIconActive}>
            <ExpandIcon width={20} height={20} color="#FFFFFF" />
          </View>
          <View style={styles.progressLineActive} />
          
          {/* Step 4 - Active */}
          <View style={styles.progressIconActive}>
            <UsersIcon width={20} height={20} color="#FFFFFF" />
          </View>
        </View>
        
        {/* Progress Labels */}
        <View style={styles.progressLabelsContainer}>
          <Text style={[styles.progressLabelActive, { left: 20 - 35 }]} numberOfLines={1}>기본정보</Text>
          <Text style={[styles.progressLabelActive, { left: 95.134 - 35 }]} numberOfLines={1}>학력/목표</Text>
          <Text style={[styles.progressLabelActive, { left: 170.268 - 35 }]} numberOfLines={1}>사용툴</Text>
          <Text style={[styles.progressLabelActive, { left: 245.402 - 35 }]} numberOfLines={1}>협업스타일</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Collaboration Style Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>나의 협업 스타일</Text>
            <View style={styles.collaborationStylesContainer}>
              <TouchableOpacity
                style={[
                  styles.collaborationStyleButton,
                  styles.collaborationStyleButtonRow1,
                  collaborationStyle === '적극 소통형' && styles.collaborationStyleButtonSelected,
                ]}
                onPress={() => setCollaborationStyle('적극 소통형')}
                activeOpacity={0.7}
              >
                <Text style={styles.collaborationStyleButtonText}>적극 소통형</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.collaborationStyleButton,
                  styles.collaborationStyleButtonRow2,
                  collaborationStyle === '체계적 계획형' && styles.collaborationStyleButtonSelected,
                ]}
                onPress={() => setCollaborationStyle('체계적 계획형')}
                activeOpacity={0.7}
              >
                <Text style={styles.collaborationStyleButtonText}>체계적 계획형</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.collaborationStyleButton,
                  styles.collaborationStyleButtonRow3,
                  collaborationStyle === '빠른 실행형' && styles.collaborationStyleButtonSelected,
                ]}
                onPress={() => setCollaborationStyle('빠른 실행형')}
                activeOpacity={0.7}
              >
                <Text style={styles.collaborationStyleButtonText}>빠른 실행형</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.collaborationStyleButton,
                  styles.collaborationStyleButtonRow4,
                  collaborationStyle === '꼼꼼 분석형' && styles.collaborationStyleButtonSelected,
                ]}
                onPress={() => setCollaborationStyle('꼼꼼 분석형')}
                activeOpacity={0.7}
              >
                <Text style={styles.collaborationStyleButtonText}>꼼꼼 분석형</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Preview */}
          <View style={styles.profilePreviewContainer}>
            <Text style={styles.profilePreviewTitle}>프로필 미리보기</Text>
            <View style={styles.profilePreviewContent}>
              <View style={styles.profileAvatar}>
                <TishooTextIcon width={27} height={28} color="#1E78FF" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileData.name || '이름'}</Text>
                <Text style={styles.profileRole}>프론트엔드 개발자</Text>
              </View>
            </View>
            <View style={styles.profileFieldContainer}>
              <Text style={styles.profileFieldLabel}>목표 분야</Text>
              <Text style={styles.profileFieldValue}>AI Agent</Text>
            </View>
            <View style={styles.profileTagContainer}>
              <View style={styles.profileTag}>
                <Text style={styles.profileTagText}>React</Text>
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
                // 이름 저장 (이미 저장되어 있을 수 있지만 다시 저장)
                if (profileData.name) {
                  await saveUserName(profileData.name);
                  await saveUserRole('mentee');
                }
                
                // 멘티 ID 생성 및 저장 (백엔드 API가 없으므로 임시로 타임스탬프 기반 ID 생성)
                // TODO: 백엔드에 멘티 생성 API가 추가되면 해당 API를 호출하여 menteeId를 받아서 저장
                const menteeId = Date.now() % 1000000; // 임시 ID 생성 (백엔드 API 연동 전까지)
                await saveMenteeId(menteeId);
                console.log('✅ 멘티 프로필 완성 - 멘티 ID 저장:', menteeId);
                
                // Navigate to home screen or complete profile
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MenteeHome' }],
                });
              } catch (error) {
                console.error('❌ 멘티 프로필 완성 실패:', error);
                Alert.alert('오류', '프로필 완성 중 오류가 발생했습니다.');
              }
            }
          }}
          disabled={!isFormValid}
          activeOpacity={0.7}
        >
          <CheckmarkIcon2 width={20} height={20} color="#FFFFFF" />
          <Text style={styles.completeButtonText}>프로필 완성</Text>
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
    alignItems: 'center',
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
  collaborationStylesContainer: {
    position: 'relative',
    width: '100%',
    height: 259.098,
  },
  collaborationStyleButton: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderWidth: 1.394,
    borderColor: '#e8e8f0',
    borderRadius: 16.4,
    paddingHorizontal: 15.99,
    paddingVertical: 15.08,
    height: 58.781,
    width: 324.096,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  collaborationStyleButtonRow1: {
    left: 0,
    top: 0,
  },
  collaborationStyleButtonRow2: {
    left: 0,
    top: 66.77,
  },
  collaborationStyleButtonRow3: {
    left: 0,
    top: 133.54,
  },
  collaborationStyleButtonRow4: {
    left: 0,
    top: 200.32,
  },
  collaborationStyleButtonSelected: {
    borderColor: '#1e78ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  collaborationStyleButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  profilePreviewContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    width: '100%',
    height: 264.379,
    padding: 24.69,
  },
  profilePreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
    marginBottom: 16,
  },
  profilePreviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15.994,
    marginBottom: 16,
  },
  profileAvatar: {
    width: 63.996,
    height: 63.996,
    borderRadius: 2000000,
    backgroundColor: '#bed8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
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
  profileFieldContainer: {
    marginBottom: 16,
  },
  profileFieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
    marginBottom: 4,
  },
  profileFieldValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
    lineHeight: 25.6,
  },
  profileTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  profileTag: {
    backgroundColor: '#fafbff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 2000000,
    paddingHorizontal: 12.695,
    paddingVertical: 8,
    height: 33.392,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
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

