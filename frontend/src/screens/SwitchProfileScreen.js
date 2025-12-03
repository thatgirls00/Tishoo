import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getUserName } from '../utils/storage';
import Group1171274790Icon from '../components/Group1171274790Icon';
import Group1Icon from '../components/Group1Icon';
import GroupIconNew from '../components/GroupIconNew';
import ArrowRightIcon3 from '../components/ArrowRightIcon3';
import Icon4 from '../components/Icon4';
import Icon10 from '../components/Icon10';
import Icon11 from '../components/Icon11';
import Icon12 from '../components/Icon12';
import Icon13 from '../components/Icon13';
import CalendarIcon2 from '../components/CalendarIcon2';
import UsersIcon3 from '../components/UsersIcon3';

export default function SwitchProfileScreen({ visible, onClose, navigation, currentRole = 'mentor' }) {
  const [userName, setUserName] = useState('이지윤');

  // 이름 불러오기
  useEffect(() => {
    if (visible) {
      const loadUserName = async () => {
        const name = await getUserName();
        if (name) {
          setUserName(name);
        }
      };
      loadUserName();
    }
  }, [visible]);

  const handleSwitchToMentee = () => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MenteeHome' }],
      });
    }
    onClose();
  };

  const handleSwitchToMentor = () => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MentorHome' }],
      });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>프로필 전환</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Icon4 width={24} height={24} color="#2B2B2B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Mentee Profile Card */}
            <TouchableOpacity
              style={[
                styles.profileCard,
                currentRole === 'mentee' && styles.profileCardActiveMentee
              ]}
              onPress={handleSwitchToMentee}
              activeOpacity={0.7}
            >
              <View style={styles.profileCardContent}>
                <View style={styles.profileAvatar}>
                  <GroupIconNew width={46} height={36} />
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.profileNameRow}>
                    <Text style={styles.profileName}>{userName} (개발자)</Text>
                    {currentRole === 'mentee' && (
                      <View style={[styles.tag, styles.tagActiveMentee]}>
                        <Text style={styles.tagTextActive}>사용 중</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.profileTags}>
                    <View style={[styles.tag, styles.tagMentee]}>
                      <Text style={styles.tagTextMentee}>멘티</Text>
                    </View>
                    <View style={[styles.tag, styles.tagCategory]}>
                      <Text style={styles.tagTextCategory}>개발</Text>
                    </View>
                  </View>
                  <View style={styles.skillsContainer}>
                    <View style={[styles.skillTag, styles.skillTagMentee]}>
                      <Text style={styles.skillTagText}>React</Text>
                    </View>
                    <View style={[styles.skillTag, styles.skillTagMentee]}>
                      <Text style={styles.skillTagText}>TypeScript</Text>
                    </View>
                    <View style={[styles.skillTag, styles.skillTagMentee]}>
                      <Text style={styles.skillTagText}>Node.js</Text>
                    </View>
                  </View>
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Icon10 width={12} height={12} color="#6C6C6C" />
                      <Text style={styles.statText}>진행 2</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon13 width={12} height={12} color="#6C6C6C" />
                      <Text style={styles.statText}>완료 1</Text>
                    </View>
                  </View>
                </View>
                {currentRole === 'mentee' ? (
                  <Icon12 width={20} height={20} color="#9C9C9C" />
                ) : (
                  <ArrowRightIcon3 width={20} height={20} color="#9C9C9C" />
                )}
              </View>
            </TouchableOpacity>

            {/* Mentor Profile Card */}
            <TouchableOpacity
              style={[
                styles.profileCard,
                currentRole === 'mentor' && styles.profileCardActiveMentor
              ]}
              onPress={handleSwitchToMentor}
              activeOpacity={0.7}
            >
              <View style={styles.profileCardContent}>
                <View style={styles.profileAvatar}>
                  <Group1171274790Icon width={48} height={38} />
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.profileNameRow}>
                    <Text style={styles.profileName}>{userName} 멘토</Text>
                    {currentRole === 'mentor' && (
                      <View style={[styles.tag, styles.tagActiveMentor]}>
                        <Text style={styles.tagTextActive}>사용 중</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.profileTags}>
                    <View style={[styles.tag, styles.tagMentor]}>
                      <Text style={styles.tagTextMentor}>멘토</Text>
                    </View>
                    <View style={[styles.tag, styles.tagCategoryMentor]}>
                      <Text style={styles.tagTextCategory}>개발</Text>
                    </View>
                  </View>
                  <View style={styles.skillsContainer}>
                    <View style={[styles.skillTag, styles.skillTagMentor]}>
                      <Text style={styles.skillTagText}>React</Text>
                    </View>
                    <View style={[styles.skillTag, styles.skillTagMentor]}>
                      <Text style={styles.skillTagText}>WebSocket</Text>
                    </View>
                    <View style={[styles.skillTag, styles.skillTagMentor]}>
                      <Text style={styles.skillTagText}>AWS</Text>
                    </View>
                    <View style={[styles.skillTag, styles.skillTagMentor]}>
                      <Text style={styles.skillTagText}>+1</Text>
                    </View>
                  </View>
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Icon10 width={12} height={12} color="#6C6C6C" />
                      <Text style={styles.statText}>진행 1</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon13 width={12} height={12} color="#6C6C6C" />
                      <Text style={styles.statText}>완료 3</Text>
                    </View>
                  </View>
                </View>
                {currentRole === 'mentor' ? (
                  <Icon12 width={20} height={20} color="#9C9C9C" />
                ) : (
                  <ArrowRightIcon3 width={20} height={20} color="#9C9C9C" />
                )}
              </View>
            </TouchableOpacity>

            {/* Create New Profile Button */}
            <TouchableOpacity style={styles.createProfileButton} activeOpacity={0.7}>
              <View style={styles.createProfileIconContainer}>
                <Icon11 width={28} height={28} color="#FB23CB" />
              </View>
              <View style={styles.createProfileTextContainer}>
                <Text style={styles.createProfileTitle}>새 프로필 만들기</Text>
                <Text style={styles.createProfileSubtitle}>
                  다른 역할이나 분야로 시작하기
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 649,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 24,
  },
  dragHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#E2E3E6',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 0.697,
    borderBottomColor: '#E2E3E6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B2B2B',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 10,
  },
  profileCard: {
    borderWidth: 1.394,
    borderColor: '#E2E3E6',
    borderRadius: 16,
    padding: 17.39,
    marginBottom: 16,
  },
  profileCardActiveMentee: {
    borderColor: '#1E78FF',
    backgroundColor: 'rgba(30, 120, 255, 0.05)',
  },
  profileCardActiveMentor: {
    borderColor: '#FB23CB',
    backgroundColor: 'rgba(251, 35, 203, 0.05)',
  },
  profileCardContent: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 16.4,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 8,
  },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  profileTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    height: 24,
    justifyContent: 'center',
  },
  tagMentee: {
    backgroundColor: '#1E78FF',
  },
  tagMentor: {
    backgroundColor: '#FB23CB',
  },
  tagCategory: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
  },
  tagCategoryMentor: {
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
  },
  tagActiveMentee: {
    backgroundColor: '#1E78FF',
  },
  tagActiveMentor: {
    backgroundColor: '#FB23CB',
  },
  tagTextMentee: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 16,
  },
  tagTextMentor: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 16,
  },
  tagTextCategory: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6C6C6C',
    lineHeight: 16,
  },
  tagTextActive: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillTag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 24,
    justifyContent: 'center',
  },
  skillTagMentee: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
  },
  skillTagMentor: {
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
  },
  skillTagText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9C9C9C',
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6C6C',
    lineHeight: 21,
  },
  createProfileButton: {
    borderWidth: 1.394,
    borderColor: '#E2E3E6',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  createProfileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16.4,
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createProfileTextContainer: {
    flex: 1,
    gap: 4,
  },
  createProfileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  createProfileSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6C6C',
    lineHeight: 21,
  },
});

