import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StatusBar,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserName } from '../utils/storage';
import { getAllProjects, getProjectsByMentor, getProjectDetail } from '../services/projectService';
import { getAllMentors } from '../services/mentorService';
import NotificationScreen from './NotificationScreen';
import TishooLogoIcon from '../components/TishooLogoIcon';
import NotificationIcon6 from '../components/NotificationIcon6';
import SearchIcon from '../components/SearchIcon';
import SearchFilterIcon from '../components/SearchFilterIcon';
import StarIcon from '../components/StarIcon';
import UsersIcon from '../components/UsersIcon';
import CalendarIcon from '../components/CalendarIcon';
import HeartIcon from '../components/HeartIcon';
import ShareIcon from '../components/ShareIcon';
import PlusIcon3 from '../components/PlusIcon3';
import MentorHomeIcon from '../components/MentorHomeIcon';
import MentorSearchIcon from '../components/MentorSearchIcon';
import MentorProjectIcon from '../components/MentorProjectIcon';
import ProjectCalendarIcon from '../components/ProjectCalendarIcon';
import MentorMyIcon from '../components/MentorMyIcon';
import PlusIcon2 from '../components/PlusIcon2';
import HeartIcon2 from '../components/HeartIcon2';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

const CATEGORIES = ['디자인', '개발', '기획', '마케팅', '데이터', 'PM'];
const TABS = ['멘토', '프로젝트', '자료'];

export default function MentorSearchScreen({ navigation }) {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('디자인');
  const [activeTab, setActiveTab] = useState('멘토');
  const [userName, setUserName] = useState('지윤');
  const [mentorProjects, setMentorProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

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

  // 멘토 개설 프로젝트 로드 함수
  const loadMentorProjects = useCallback(async () => {
    try {
      setLoadingProjects(true);
      // 현재 사용자(멘토)의 프로젝트 조회
      const userName = await getUserName();
      if (userName) {
        const mentors = await getAllMentors();
        const currentMentor = mentors?.find((m) => m.name === userName);
        if (currentMentor) {
          const projects = await getProjectsByMentor(currentMentor.id);
          if (projects && Array.isArray(projects)) {
            // 백엔드 응답 형식에 맞게 변환
            const formattedProjects = projects.map((project) => ({
              id: project.id,
              category: project.skills?.[0] || '개발',
              title: project.title,
              mentor: project.mentorName || userName,
              tags: project.skills || [],
              participants: '0/10명', // TODO: 백엔드에 참여자 수 필드 추가 시 사용
              duration: `${project.duration}주`,
              price: `${project.price.toLocaleString()}원`,
              imageUri: project.thumbnailUrl || null,
              description: project.description,
              curriculum: project.curriculum,
              skills: project.skills || [],
            }));
            setMentorProjects(formattedProjects);
          }
        }
      }
    } catch (error) {
      console.error('멘토 프로젝트 로드 실패:', error);
      // 에러 발생 시 기본 데이터 유지
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // 멘토 개설 프로젝트 로드
  useEffect(() => {
    loadMentorProjects();
  }, [loadMentorProjects]);

  // 화면 포커스 시 프로젝트 목록 새로고침
  useEffect(() => {
    const unsubscribe = navigation?.addListener?.('focus', () => {
      loadMentorProjects();
    });
    return unsubscribe;
  }, [navigation, loadMentorProjects]);

  const popularProjects = [
    {
      id: 1,
      title: 'React로 만드는 실시간 채팅 앱',
      mentor: '김민준',
      rating: 4.9,
    },
    {
      id: 2,
      title: '모바일 앱 UI/UX 디자인 프로젝트',
      mentor: '박서연',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'SaaS 제품 기획부터 런칭까지',
      mentor: '이준호',
      rating: 4.9,
    },
  ];

  // mentorProjects는 이제 API에서 로드됩니다

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9FB" />
      <Modal
        visible={notificationVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setNotificationVisible(false)}
      >
        <NotificationScreen
          onClose={() => setNotificationVisible(false)}
          navigation={navigation}
        />
      </Modal>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TishooLogoIcon width={77} height={23} />
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => setNotificationVisible(true)}
              activeOpacity={0.7}
            >
              <NotificationIcon6 width={24} height={24} color="#6c6c6c" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
          <Text style={styles.greeting}>안녕하세요, {userName}님</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>탐색</Text>
          
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <SearchIcon width={20} height={20} color="#9B9BAA" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="키워드, 분야, 스킬로 검색"
                placeholderTextColor="#9B9BAA"
              />
              <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                <SearchFilterIcon width={20} height={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <View style={styles.tabList}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.tabActive,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#FB23CB', '#FF6B9D', '#FFB3D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>새 프로젝트를 개설하세요</Text>
              <Text style={styles.bannerSubtitle}>
                식을 나누고 멘티들과 함께 성장해요!
              </Text>
              <TouchableOpacity
                style={styles.bannerButton}
                activeOpacity={0.7}
                onPress={() => navigation?.navigate('CreateProject')}
              >
                <PlusIcon3 width={20} height={20} color="#FFFFFF" />
                <Text style={styles.bannerButtonText}>프로젝트 개설하기</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Popular Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인기 프로젝트</Text>
          <View style={styles.popularProjectsList}>
            {popularProjects.map((project) => (
              <View key={project.id} style={styles.popularProjectCard}>
                <View style={styles.popularProjectContent}>
                  <Text style={styles.popularProjectTitle}>{project.title}</Text>
                  <Text style={styles.popularProjectMentor}>{project.mentor}</Text>
                </View>
                <View style={styles.popularProjectRating}>
                  <StarIcon width={16} height={16} color="#FFB020" />
                  <Text style={styles.popularProjectRatingText}>{project.rating}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Mentor Projects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>멘토 개설 프로젝트</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
          {loadingProjects ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#FB23CB" />
              <Text style={styles.loadingText}>로딩 중...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.projectsScroll}
              contentContainerStyle={styles.projectsContainer}
            >
              {mentorProjects.length > 0 ? (
                mentorProjects.map((project) => (
                  <View key={project.id} style={styles.projectCard}>
                {project.imageUri ? (
                  <Image
                    source={{ uri: project.imageUri }}
                    style={styles.projectImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.projectImage, styles.projectImagePlaceholder]} />
                )}
                <View style={styles.projectContent}>
                  <View style={styles.projectHeader}>
                    <View style={styles.projectCategory}>
                      <Text style={styles.projectCategoryText}>{project.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectMentor}>멘토: {project.mentor}</Text>
                  
                  <View style={styles.projectTags}>
                    {project.tags.map((tag, index) => (
                      <View key={index} style={styles.projectTag}>
                        <Text style={styles.projectTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.projectInfo}>
                    <View style={styles.projectInfoItem}>
                      <UsersIcon width={16} height={16} color="#9B9BAA" />
                      <Text style={styles.projectInfoText}>{project.participants}</Text>
                    </View>
                    <View style={styles.projectInfoItem}>
                      <CalendarIcon width={16} height={16} color="#9B9BAA" />
                      <Text style={styles.projectInfoText}>{project.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.projectFooter}>
                    <View style={styles.projectPriceContainer}>
                      <Text style={styles.projectPriceLabel}>참가비</Text>
                      <Text style={styles.projectPrice}>{project.price}</Text>
                    </View>
                    <View style={styles.projectActions}>
                      <TouchableOpacity style={styles.projectActionButton} activeOpacity={0.7}>
                        <HeartIcon2 width={20} height={20} color="#9B9BAA" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.projectActionButton} activeOpacity={0.7}>
                        <ShareIcon width={20} height={20} color="#9B9BAA" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.projectJoinButton, styles.projectJoinButtonDisabled]}
                        activeOpacity={0.5}
                        disabled={true}
                      >
                        <Text style={[styles.projectJoinButtonText, styles.projectJoinButtonTextDisabled]}>참여하기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>등록된 프로젝트가 없습니다.</Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation?.navigate('MentorHome')}
        >
          <MentorHomeIcon width={24} height={24} color="#6c6c6c" />
          <Text style={styles.navLabel}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <MentorSearchIcon width={24} height={24} color="#FB23CB" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>탐색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItemCenter}
          activeOpacity={0.7}
        >
          <View style={styles.navCenterButton}>
            <PlusIcon2 width={28} height={28} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          disabled={true}
        >
          <ProjectCalendarIcon width={24} height={24} color="#6c6c6c" />
          <Text style={styles.navLabel}>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation?.navigate('MentorMyPage')}
        >
          <MentorMyIcon width={24} height={24} color="#6c6c6c" />
          <Text style={styles.navLabel}>마이</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    right: 28,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FB23CB',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28,
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B2B2B',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE7FA',
    borderWidth: 1,
    borderColor: '#E6E6EA',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryScroll: {
    marginHorizontal: -24,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEE',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 7,
    height: 62,
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#FB23CB',
    borderColor: '#EBEBEE',
  },
  categoryChipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9BAA',
    lineHeight: 24,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  tabContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tabList: {
    backgroundColor: '#FAF8FF',
    borderRadius: 16.4,
    padding: 3.5,
    flexDirection: 'row',
    height: 36,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16.4,
    height: 29,
  },
  tabActive: {
    backgroundColor: 'rgba(229, 229, 229, 0.3)',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 20,
  },
  tabTextActive: {
    color: '#000000',
  },
  bannerContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  banner: {
    height: 180,
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerContent: {
    position: 'relative',
    zIndex: 1,
    gap: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 25.6,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#FB23CB',
    borderRadius: 16.4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.844 },
    shadowOpacity: 0.1,
    shadowRadius: 2.531,
    elevation: 2,
  },
  bannerButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  popularProjectsList: {
    gap: 12,
  },
  popularProjectCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.697,
    borderColor: '#E2E3E6',
    borderRadius: 16.4,
    padding: 16.69,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularProjectContent: {
    flex: 1,
    gap: 8,
  },
  popularProjectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    lineHeight: 24,
  },
  popularProjectMentor: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C6C6C',
    lineHeight: 25.6,
  },
  popularProjectRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularProjectRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6C6C',
    lineHeight: 21,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6A6A6A',
    lineHeight: 21,
  },
  projectsScroll: {
    marginHorizontal: -24,
  },
  projectsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  projectCard: {
    width: 324,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.697,
    borderColor: '#FFFFFF',
  },
  projectImage: {
    width: '100%',
    height: 192,
  },
  projectImagePlaceholder: {
    backgroundColor: '#FFE7FA',
  },
  projectContent: {
    padding: 20,
    gap: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectCategory: {
    backgroundColor: '#FFE7FA',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  projectCategoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FB23CB',
    lineHeight: 21,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  projectMentor: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 25.6,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  projectTag: {
    backgroundColor: '#FB23CB',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  projectTagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFE7FA',
    lineHeight: 21,
  },
  projectInfo: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  projectInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  projectInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  projectPriceContainer: {
    gap: 4,
  },
  projectPriceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  projectPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FB23CB',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  projectActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  projectActionButton: {
    width: 40,
    height: 40,
    borderRadius: 16.4,
    borderWidth: 0.697,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectJoinButton: {
    backgroundColor: '#FB23CB',
    borderRadius: 16.4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  projectJoinButtonDisabled: {
    backgroundColor: '#E5E5E5',
    opacity: 0.6,
  },
  projectJoinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  projectJoinButtonTextDisabled: {
    color: '#9B9BAA',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 81,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.697,
    borderTopColor: '#CBCBCB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 65,
  },
  navItemCenter: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCenterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FB23CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6C6C',
    lineHeight: 21,
  },
  navLabelActive: {
    color: '#FB23CB',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#9B9BAA',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9B9BAA',
  },
});

