import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import GroupIconMentee from '../components/GroupIconMentee';
import GroupIconMenteeSelected from '../components/GroupIconMenteeSelected';
import GroupIconMentor from '../components/GroupIconMentor';
import GroupIconMentorSelected from '../components/GroupIconMentorSelected';
import ArrowIcon from '../components/ArrowIcon';
import CheckIcon from '../components/CheckIcon';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

export default function RoleSelectionScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleStart = () => {
    if (selectedRole === 'mentee') {
      navigation.navigate('MenteeProfile');
    } else if (selectedRole === 'mentor') {
      navigation.navigate('MentorProfile');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>어떤 역할로 시작할까요?</Text>
            <Text style={styles.subheading}>언제든지 전환 가능해요</Text>
          </View>

          {/* Role Selection Cards */}
          <View style={styles.roleCardsContainer}>
            {/* Mentee Card */}
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'mentee' && styles.roleCardSelected,
              ]}
              onPress={() => handleRoleSelect('mentee')}
              activeOpacity={0.7}
            >
              <View style={styles.roleCardContent}>
                {/* Icon Container */}
                <View style={[
                  styles.iconContainer,
                  selectedRole === 'mentee' && styles.iconContainerSelected,
                ]}>
                  {selectedRole === 'mentee' ? (
                    <GroupIconMenteeSelected width={46} height={36} />
                  ) : (
                    <GroupIconMentor width={46} height={36} />
                  )}
                </View>

                {/* Text Content */}
                <View style={styles.textContent}>
                  <Text style={styles.roleTitle}>멘티로 시작하기</Text>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>프로젝트에 참여하고</Text>
                    <Text style={styles.description}>실전 경험을 쌓아요</Text>
                  </View>

                  {/* Tags */}
                  <View style={styles.tagsContainer}>
                    <View style={[styles.tag, styles.tagMentee]}>
                      <Text style={styles.tagText}>프로젝트 참여</Text>
                    </View>
                    <View style={[styles.tag, styles.tagMentee]}>
                      <Text style={styles.tagText}>스킬 성장</Text>
                    </View>
                  </View>
                </View>

                {/* Check Icon */}
                {selectedRole === 'mentee' && (
                  <View style={styles.checkIconContainer}>
                    <CheckIcon width={16} height={16} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Mentor Card */}
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'mentor' && styles.roleCardSelectedMentor,
              ]}
              onPress={() => handleRoleSelect('mentor')}
              activeOpacity={0.7}
            >
              <View style={styles.roleCardContent}>
                {/* Icon Container */}
                <View style={[
                  styles.iconContainer,
                  selectedRole === 'mentor' && styles.iconContainerSelectedMentor,
                ]}>
                  {selectedRole === 'mentor' ? (
                    <GroupIconMentorSelected width={46} height={36} />
                  ) : (
                    <GroupIconMentee width={46} height={36} />
                  )}
                </View>

                {/* Text Content */}
                <View style={styles.textContent}>
                  <Text style={styles.roleTitle}>멘토로 시작하기</Text>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>프로젝트를 개설하고</Text>
                    <Text style={styles.description}>지식을 나눠요</Text>
                  </View>

                  {/* Tags */}
                  <View style={styles.tagsContainer}>
                    <View style={[styles.tag, styles.tagMentor]}>
                      <Text style={styles.tagText}>프로젝트 개설</Text>
                    </View>
                    <View style={[styles.tag, styles.tagMentor]}>
                      <Text style={styles.tagText}>수익 창출</Text>
                    </View>
                  </View>
                </View>

                {/* Check Icon */}
                {selectedRole === 'mentor' && (
                  <View style={styles.checkIconContainerMentor}>
                    <CheckIcon width={16} height={16} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            styles.startButton,
            selectedRole === 'mentee' ? styles.startButtonActiveMentee : 
            selectedRole === 'mentor' ? styles.startButtonActiveMentor : 
            styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={!selectedRole}
          activeOpacity={0.7}
        >
          <Text style={styles.startButtonText}>시작하기</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentSection: {
    width: '100%',
    paddingTop: 105.39,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    marginBottom: 32,
    alignItems: 'center',
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e2e2e',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
    textAlign: 'center',
    lineHeight: 25.6,
  },
  roleCardsContainer: {
    width: '100%',
    gap: 16,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1.394,
    borderColor: '#e2e2e8',
    padding: 25.39,
    minHeight: 180.567,
  },
  roleCardSelected: {
    borderColor: '#1E78FF',
    borderWidth: 1.394,
  },
  roleCardSelectedMentor: {
    borderColor: '#FB23CB',
    borderWidth: 1.394,
  },
  roleCardContent: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    position: 'relative',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSelected: {
    backgroundColor: '#1E78FF',
  },
  iconContainerSelectedMentor: {
    backgroundColor: '#FB23CB',
  },
  checkIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E78FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkIconContainerMentor: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FB23CB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textContent: {
    flex: 1,
    gap: 8,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    marginBottom: 4,
  },
  descriptionContainer: {
    gap: 4,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 25.6,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 12.695,
    paddingVertical: 8,
    borderRadius: 20,
    height: 33.392,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagMentee: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.2)',
  },
  tagMentor: {
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
    borderWidth: 0.697,
    borderColor: 'rgba(251, 35, 203, 0.2)',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  buttonSection: {
    width: '100%',
    paddingTop: 24.693,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
    backgroundColor: '#ffffff',
  },
  startButton: {
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
  startButtonActiveMentee: {
    backgroundColor: '#1E78FF',
  },
  startButtonActiveMentor: {
    backgroundColor: '#FB23CB',
  },
  startButtonDisabled: {
    backgroundColor: '#9b9baa',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 24,
  },
});

