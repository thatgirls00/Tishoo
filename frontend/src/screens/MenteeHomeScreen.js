import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { getUserName } from '../utils/storage';
import { getRecommendedMentors } from '../services/mentorService';
import NotificationScreen from './NotificationScreen';
import TishooTextIcon from '../components/TishooTextIcon';
import NotificationIcon6 from '../components/NotificationIcon6';
import UnionIcon from '../components/UnionIcon';
import Group266Icon from '../components/Group266Icon';
import Rectangle22Icon from '../components/Rectangle22Icon';
import ArrowIcon from '../components/ArrowIcon';
import StarIcon from '../components/StarIcon';
import HomeIcon from '../components/HomeIcon';
import SearchIcon from '../components/SearchIcon';
import ProjectIcon from '../components/ProjectIcon';
import ProjectCalendarIcon from '../components/ProjectCalendarIcon';
import MyIcon from '../components/MyIcon';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

export default function MenteeHomeScreen({ navigation }) {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [userName, setUserName] = useState('지윤');

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

  // 프로젝트 데이터
  const ongoingProjects = [
    {
      id: 1,
      title: '이커머스 앱 디자인',
      deadline: 'D-5',
      progress: 65,
      currentTask: 'UI 시안 최종 검토',
      mentor: '김멘토',
      mentorInitial: '김',
    },
    {
      id: 2,
      title: 'React 포트폴리오 사이트',
      deadline: 'D-12',
      progress: 42,
      currentTask: '컴포넌트 구조 설계',
      mentor: '박개발',
      mentorInitial: '박',
    },
  ];

  // 추천 멘토 데이터
  const [recommendedMentor, setRecommendedMentor] = useState({
    name: '이수현',
    role: '시니어 UX 디자이너 @ 카카오',
    tags: ['UX/UI', 'Product Design', 'Figma'],
    rating: 0.0,
    reviewCount: 0,
  });
  const [loadingMentor, setLoadingMentor] = useState(true);

  // 추천 멘토 로드
  useEffect(() => {
    const loadRecommendedMentor = async () => {
      try {
        setLoadingMentor(true);
        const mentors = await getRecommendedMentors();
        if (mentors && Array.isArray(mentors) && mentors.length > 0) {
          const firstMentor = mentors[0];
          setRecommendedMentor({
            name: firstMentor.name,
            role: firstMentor.title || firstMentor.specialty || '멘토',
            tags: firstMentor.specialty ? [firstMentor.specialty] : ['개발'],
            rating: 0.0, // 새로 등록된 멘토는 별점 0.0
            reviewCount: 0,
          });
        }
      } catch (error) {
        console.error('추천 멘토 로드 실패:', error);
        // 에러 발생 시 기본 데이터 유지
      } finally {
        setLoadingMentor(false);
      }
    };
    loadRecommendedMentor();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <TishooTextIcon width={75.305} height={32} color="#1E78FF" />
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => setNotificationVisible(true)}
              activeOpacity={0.7}
            >
              <NotificationIcon6 width={24} height={24} color="#9B9BAA" />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <View style={styles.notificationBadgeDot} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>안녕하세요, {userName}님</Text>
          <Text style={styles.sessionText}>오늘 2개의 세션</Text>
        </View>

        {/* Promotional Banner */}
        <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9}>
          <View style={styles.promoContent}>
            <View style={styles.promoLeft}>
              <Text style={styles.promoTitle} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.8}>
                D-1 오늘까지 특가!
              </Text>
              <Text style={styles.promoSubtitle}>
                TISHOO 회원한정{'\n'}인프런 40%혜택
              </Text>
            </View>
            <View style={styles.promoRight}>
              <View style={styles.promoIconsContainer}>
                <View style={styles.promoIconWrapper}>
                  <UnionIcon width={85} height={122} />
                </View>
                <View style={styles.promoIconWrapper2}>
                  <Rectangle22Icon width={71} height={70} />
                </View>
                <View style={styles.promoIconWrapper3}>
                  <Group266Icon width={83} height={61} />
                </View>
              </View>
              <Text style={styles.promoPercent}>40%</Text>
              <View style={styles.promoIndicator}>
                <Text style={styles.promoIndicatorText}>4/4</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* New Feedback Section */}
        <TouchableOpacity style={styles.feedbackCard} activeOpacity={0.7}>
          <Text style={styles.feedbackText}>새 피드백 2개</Text>
          <ArrowIcon width={20} height={20} color="#9B9BAA" />
        </TouchableOpacity>

        {/* Ongoing Projects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>진행 중인 프로젝트</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsContainer}
          >
            {ongoingProjects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle} numberOfLines={1}>
                    {project.title}
                  </Text>
                  <View
                    style={[
                      styles.deadlineChip,
                      project.deadline === 'D-5'
                        ? styles.deadlineChipRed
                        : styles.deadlineChipYellow,
                    ]}
                  >
                    <Text
                      style={[
                        styles.deadlineText,
                        project.deadline === 'D-5'
                          ? styles.deadlineTextRed
                          : styles.deadlineTextYellow,
                      ]}
                    >
                      {project.deadline}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>진행률</Text>
                    <Text style={styles.progressPercent}>{project.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${project.progress}%` },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.projectFooter}>
                  <Text style={styles.currentTask}>{project.currentTask}</Text>
                  <View style={styles.mentorInfo}>
                    <View style={styles.mentorAvatar}>
                      <Text style={styles.mentorInitial}>
                        {project.mentorInitial}
                      </Text>
                    </View>
                    <Text style={styles.mentorName}>{project.mentor}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Mentor Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>이번 주 추천 멘토</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>더보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mentorCard}>
            <View style={styles.mentorCardContent}>
              <View style={styles.mentorAvatarLarge}>
                <View style={styles.mentorAvatarPlaceholder} />
              </View>
              <View style={styles.mentorInfoSection}>
                <Text style={styles.mentorNameLarge}>{recommendedMentor.name}</Text>
                <Text style={styles.mentorRole}>{recommendedMentor.role}</Text>
              </View>
            </View>
            <View style={styles.mentorTags}>
              {recommendedMentor.tags.map((tag, index) => (
                <View key={index} style={styles.mentorTag}>
                  <Text style={styles.mentorTagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <View style={styles.mentorFooter}>
              <View style={styles.mentorRating}>
                <StarIcon width={14} height={14} color="#FFB020" />
                <Text style={styles.mentorRatingText}>{recommendedMentor.rating}</Text>
                <Text style={styles.mentorReviewCount}>후기 {recommendedMentor.reviewCount}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Start Section */}
        <View style={styles.quickStartSection}>
          <Text style={styles.quickStartTitle}>빠르게 시작하기</Text>
          <View style={styles.quickStartButtons}>
            <TouchableOpacity style={styles.quickStartButton} activeOpacity={0.7}>
              <Text style={styles.quickStartButtonText}>새 프로젝트</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickStartButton} activeOpacity={0.7}>
              <Text style={styles.quickStartButtonText}>멘토 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickStartButton} activeOpacity={0.7}>
              <Text style={styles.quickStartButtonText}>가이드</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <HomeIcon width={24} height={24} color="#1E78FF" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation?.navigate('Search')}
        >
          <SearchIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>탐색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('MyProject')}
          activeOpacity={0.7}
        >
          <ProjectCalendarIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('MyPage')}
          activeOpacity={0.7}
        >
          <MyIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>마이</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationVisible}
        onRequestClose={() => setNotificationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <NotificationScreen onClose={() => setNotificationVisible(false)} />
        </View>
      </Modal>
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24,
    paddingBottom: 16,
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e78ff',
    lineHeight: 32,
  },
  notificationButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e78ff',
  },
  notificationBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e78ff',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28,
  },
  sessionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
  },
  promoBanner: {
    marginHorizontal: 24,
    marginBottom: 22,
    height: 122,
    borderRadius: 16,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#e2e3e6',
    overflow: 'hidden',
    position: 'relative',
  },
  promoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  promoLeft: {
    gap: 4,
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  promoSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    lineHeight: 20,
  },
  promoRight: {
    alignItems: 'flex-end',
    gap: 8,
    position: 'relative',
    width: 150,
    height: 122,
  },
  promoIconsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 150,
    height: 122,
  },
  promoIconWrapper: {
    position: 'absolute',
    left: 0,
    top: -30.56,
    width: 85,
    height: 122,
  },
  promoIconWrapper2: {
    position: 'absolute',
    left: 42.44,
    top: 11.2,
    width: 71,
    height: 70,
    zIndex: 2,
  },
  promoIconWrapper3: {
    position: 'absolute',
    left: 42.44,
    top: 37.66,
    width: 83,
    height: 61,
    zIndex: 1,
  },
  promoPercent: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    position: 'absolute',
    right: 0,
    top: 17.55,
    zIndex: 10,
  },
  promoIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: 0,
  },
  promoIndicatorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e3e6',
  },
  feedbackCard: {
    marginHorizontal: 24,
    marginBottom: 22,
    paddingHorizontal: 17,
    paddingVertical: 17,
    borderRadius: 16,
    backgroundColor: '#e8f1ff',
    borderWidth: 1,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 23.8,
  },
  sectionLink: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
  },
  projectsContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 16,
  },
  projectCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    gap: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 23.8,
  },
  deadlineChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minHeight: 36,
    justifyContent: 'center',
  },
  deadlineChipRed: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  deadlineChipYellow: {
    backgroundColor: 'rgba(255, 176, 32, 0.1)',
  },
  deadlineText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24,
  },
  deadlineTextRed: {
    color: '#ff6b6b',
  },
  deadlineTextYellow: {
    color: '#ffb020',
  },
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
  },
  progressPercent: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e78ff',
    lineHeight: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(30, 120, 255, 0.2)',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1e78ff',
    borderRadius: 9999,
  },
  projectFooter: {
    borderTopWidth: 1,
    borderTopColor: '#cbcbcb',
    paddingTop: 9,
    gap: 8,
  },
  currentTask: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
  },
  mentorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mentorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mentorInitial: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e78ff',
    lineHeight: 24,
  },
  mentorName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
  },
  mentorCard: {
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    gap: 16,
  },
  mentorCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  mentorAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  mentorAvatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#9b9baa',
  },
  mentorInfoSection: {
    flex: 1,
    gap: 4,
  },
  mentorNameLarge: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 23.8,
  },
  mentorRole: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
  },
  mentorTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mentorTag: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mentorTagText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
  },
  mentorFooter: {
    borderTopWidth: 1,
    borderTopColor: '#c4c4c4',
    paddingTop: 1,
  },
  mentorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mentorRatingText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
  },
  mentorReviewCount: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 24,
    marginLeft: 16,
  },
  quickStartSection: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 16,
  },
  quickStartTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 23.8,
  },
  quickStartButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  quickStartButton: {
    flex: 1,
    backgroundColor: '#e8f1ff',
    borderWidth: 1,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    height: 53,
  },
  quickStartButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 81,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e2e3e6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingTop: 0,
  },
  navIcon: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  navLabelActive: {
    color: '#1e78ff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-end',
  },
});

