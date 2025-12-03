import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { getUserName } from '../utils/storage';
import TishooLogoIcon from '../components/TishooLogoIcon';
import NotificationIcon6 from '../components/NotificationIcon6';
import Group1171274790Icon from '../components/Group1171274790Icon';
import ArrowRightIcon2 from '../components/ArrowRightIcon2';
import ArrowRightIconWhite from '../components/ArrowRightIconWhite';
import MoonIcon from '../components/MoonIcon';
import MentorHomeIcon from '../components/MentorHomeIcon';
import MentorSearchIcon from '../components/MentorSearchIcon';
import ProjectCalendarIcon from '../components/ProjectCalendarIcon';
import MyIconPink from '../components/MyIconPink';
import SwitchProfileScreen from './SwitchProfileScreen';

export default function MentorMyPageScreen({ navigation }) {
  const [switchProfileVisible, setSwitchProfileVisible] = useState(false);
  const [userName, setUserName] = useState('이지윤');

  // 이름 불러오기
  useEffect(() => {
    const loadUserName = async () => {
      const name = await getUserName();
      if (name) {
        setUserName(name);
      }
    };
    loadUserName();
  }, []);

  const menuItems = [
    { id: 1, title: '프로필 수정', icon: 'edit' },
    { id: 2, title: '성장 리포트', icon: 'report' },
    { id: 3, title: '새 프로필 만들기', icon: 'new' },
    { id: 4, title: '결제 내역', icon: 'payment' },
    { id: 5, title: '설정', icon: 'settings' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TishooLogoIcon width={77} height={32} />
        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.7}
          onPress={() => navigation?.navigate('Notification')}
        >
          <NotificationIcon6 width={24} height={24} color="#9B9BAA" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <View style={styles.pageTitleContainer}>
            <MoonIcon width={20} height={20} color="#FFFFFF" />
            <Text style={styles.pageTitle}>마이페이지</Text>
          </View>
          <TouchableOpacity style={styles.themeToggle} activeOpacity={0.7}>
            <MoonIcon width={20} height={20} color="#9B9BAA" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Group1171274790Icon width={48} height={38} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userName}</Text>
              <View style={styles.roleTag}>
                <Text style={styles.roleTagText}>멘토</Text>
              </View>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>개설</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>완료</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, styles.statNumberEmpty]}>-</Text>
              <Text style={styles.statLabel}>평점</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.switchProfileButton}
            activeOpacity={0.7}
            onPress={() => {
              console.log('프로필 전환 버튼 클릭됨 (멘토)');
              setSwitchProfileVisible(true);
            }}
          >
            <Text style={styles.switchProfileButtonText}>프로필 전환하기</Text>
            <ArrowRightIconWhite width={20} height={20} color="#FFFFFF" />
          </TouchableOpacity>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
              <ArrowRightIcon2 width={20} height={20} color="#9B9BAA" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('MentorHome')}
          activeOpacity={0.7}
        >
          <MentorHomeIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('MentorSearch')}
          activeOpacity={0.7}
        >
          <MentorSearchIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>탐색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          disabled={true}
        >
          <ProjectCalendarIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <MyIconPink width={24} height={24} color="#FB23CB" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>마이</Text>
        </TouchableOpacity>
      </View>

      {/* Switch Profile Modal */}
      <SwitchProfileScreen
        visible={switchProfileVisible}
        onClose={() => setSwitchProfileVisible(false)}
        navigation={navigation}
        currentRole="mentor"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FB23CB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#9b9baa',
    minHeight: 141,
    marginBottom: -70,
    zIndex: 1,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.18,
  },
  themeToggle: {
    width: 37.366,
    height: 37.366,
    borderRadius: 16.4,
    backgroundColor: '#fff4fd',
    borderWidth: 0.697,
    borderColor: '#e2e3e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginTop: -20,
    marginBottom: 24,
    gap: 24,
    shadowColor: 'rgba(251, 35, 203, 0.16)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 5,
    zIndex: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e2e2e2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 3,
  },
  profileInfo: {
    gap: 7,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    letterSpacing: -0.18,
  },
  roleTag: {
    backgroundColor: 'rgba(251, 35, 203, 0.1)',
    borderWidth: 0.697,
    borderColor: 'rgba(251, 35, 203, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 13.11,
    paddingVertical: 3.5,
    alignSelf: 'flex-start',
  },
  roleTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    height: 72.009,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff4fd',
    borderRadius: 16.4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: 72.009,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FB23CB',
    lineHeight: 24,
  },
  statNumberEmpty: {
    color: '#ffb4c8',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  switchProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FB23CB',
    borderRadius: 16.4,
    height: 56,
    marginBottom: 12,
    zIndex: 10,
  },
  switchProfileButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 16.4,
    paddingHorizontal: 16.691,
    paddingVertical: 16.691,
    height: 57,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e2e3e6',
    paddingTop: 0.697,
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
    paddingHorizontal: 0,
    height: 81,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  navLabelActive: {
    color: '#FB23CB',
  },
});

