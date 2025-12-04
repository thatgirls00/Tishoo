import React, { useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import { getUserName } from '../utils/storage';
import NotificationScreen from './NotificationScreen';
import { getRecommendedMentors, getAllMentors } from '../services/mentorService';
import { getAllProjects, getProjectDetail } from '../services/projectService';
import TishooTextIcon from '../components/TishooTextIcon';
import NotificationIcon6 from '../components/NotificationIcon6';
import SearchFolderIcon from '../components/SearchFolderIcon';
import SearchFilterIcon from '../components/SearchFilterIcon';
import SearchStarIcon from '../components/SearchStarIcon';
import SearchUsersIcon from '../components/SearchUsersIcon';
import UsersIcon2 from '../components/UsersIcon2';
import CalendarIcon from '../components/CalendarIcon';
import IconCalendar from '../components/IconCalendar';
import Ellipse28Icon from '../components/Ellipse28Icon';
import Rectangle58Icon from '../components/Rectangle58Icon';
import HeartIcon from '../components/HeartIcon';
import HeartIcon2 from '../components/HeartIcon2';
import BookmarkIcon from '../components/BookmarkIcon';
import ShareIcon from '../components/ShareIcon';
import HomeIcon from '../components/HomeIcon';
import SearchIcon from '../components/SearchIcon';
import ProjectIcon from '../components/ProjectIcon';
import ProjectCalendarIcon from '../components/ProjectCalendarIcon';
import MyIcon from '../components/MyIcon';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

const CATEGORIES = ['디자인', '개발', '기획', '마케팅', '데이터', 'PM'];
const TABS = ['멘토', '프로젝트', '자료'];

export default function SearchScreen({ navigation }) {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('디자인');
  const [activeTab, setActiveTab] = useState('멘토');
  const [bannerIndex, setBannerIndex] = useState(0);
  
  // API 데이터 상태
  const [recommendedMentors, setRecommendedMentors] = useState([]);
  const [mentorProjects, setMentorProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // API 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // 추천 멘토 조회
      const mentors = await getRecommendedMentors();
      if (mentors && Array.isArray(mentors)) {
        // 백엔드 응답 형식에 맞게 변환
        const formattedMentors = mentors.map((mentor, index) => ({
          id: mentor.id,
          name: mentor.name,
          role: mentor.title || mentor.specialty || '멘토',
          initial: mentor.name ? mentor.name.charAt(0) : '?',
          rating: 0.0, // 새로 등록된 멘토는 별점 0.0
          reviews: 0, // TODO: 백엔드에 리뷰 수 필드 추가 시 사용
        }));
        setRecommendedMentors(formattedMentors);
      }

      // 프로젝트 목록 조회
      const projects = await getAllProjects();
      if (projects && Array.isArray(projects)) {
        // 백엔드 응답 형식에 맞게 변환
        const formattedProjects = projects.map((project) => ({
          id: project.id,
          category: project.skills?.[0] || '개발',
          title: project.title,
          mentor: project.mentorName || '멘토',
          tags: project.skills || [],
          participants: '0/10명', // TODO: 백엔드에 참여자 수 필드 추가 시 사용
          duration: `${project.duration}주`,
          difficulty: '중급',
          price: `${project.price.toLocaleString()}원`,
          imageUri: project.thumbnailUrl || null,
          goal: project.description,
          methods: project.curriculum ? JSON.parse(project.curriculum) : [],
        }));
        setMentorProjects(formattedProjects);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      Alert.alert('오류', '데이터를 불러오는데 실패했습니다. 서버 연결을 확인해주세요.');
      // 에러 발생 시 기본 데이터 사용
      setRecommendedMentors([
        { id: 1, name: '박서연', role: 'UX/UI 디자이너', initial: '박', rating: 4.8, reviews: 98 },
        { id: 2, name: '김민준', role: '프론트엔드 개발자', initial: '김', rating: 4.9, reviews: 124 },
        { id: 3, name: '이준호', role: '프로덕트 매니저', initial: '이', rating: 4.9, reviews: 156 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // mentorProjects는 이제 API에서 로드됩니다

  const freeProjects = [
    {
      id: 1,
      category: '개발',
      subcategory: '커뮤니티',
      title: '토이 프로젝트로 배우는 React',
      description: '개발 스터디',
      participants: '12/20명',
      duration: '4주',
      imageUri: 'http://localhost:3845/assets/ff7c8c12ae069322bb865b86931cdb1d73ec6987.png', // Container4
    },
    {
      id: 2,
      category: '디자인',
      subcategory: '커뮤니티',
      title: 'UI/UX 포트폴리오 스터디',
      description: '디자인 모임',
      participants: '8/15명',
      duration: '6주',
      imageUri: 'http://localhost:3845/assets/45ef74f3b4853bafe9bb277d201bfe3f4946d20a.png', // Container5
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24 }]}>
          <View style={styles.headerTop}>
            <TishooTextIcon width={75.305} height={32} color="#1e78ff" />
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => setNotificationVisible(true)}
              activeOpacity={0.7}
            >
              <NotificationIcon6 width={24} height={24} color="#9B9BAA" />
              <View style={styles.notificationBadge}>
                <View style={styles.notificationBadgeDot} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>안녕하세요, {userName}님</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>탐색</Text>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchInputContainer}>
              <View style={styles.searchIconWrapper}>
                <SearchFolderIcon width={20} height={20} color="#9C9C9C" />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="키워드, 분야, 스킬로 검색"
                placeholderTextColor="#9B9BAA"
              />
            </View>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
              <SearchFilterIcon width={20} height={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Category Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
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
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerBackground}>
              <View style={styles.bannerBlurCircle1} />
              <View style={styles.bannerBlurCircle2} />
            </View>
            <View style={styles.bannerContent}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>인기</Text>
              </View>
              <Text style={styles.bannerTitle}>{userName || '지윤'}님, AI에 관심 있으시죠?</Text>
              <Text style={styles.bannerSubtitle}>AI와 함께하는 실전 프로젝트</Text>
            </View>
            <View style={styles.bannerIconContainer}>
              <View style={styles.bannerIconWrapper}>
                <Rectangle58Icon width={94} height={94} />
                <View style={styles.bannerIconInner}>
                  <Ellipse28Icon width={57} height={57} />
                  <View style={styles.bannerPlusIcon}>
                    <View style={styles.bannerPlusHorizontal} />
                    <View style={styles.bannerPlusVertical} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bannerIndicator}>
              <Text style={styles.bannerIndicatorText}>4/4</Text>
            </View>
          </View>
          <View style={styles.bannerDots}>
            <View style={[styles.bannerDot, styles.bannerDotActive]} />
            <View style={styles.bannerDot} />
            <View style={styles.bannerDot} />
            <View style={styles.bannerDot} />
          </View>
        </View>

        {/* Recommended Mentors Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>추천 멘토</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.sectionLink}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mentorsContainer}
          >
            {recommendedMentors.map((mentor) => (
              <TouchableOpacity
                key={mentor.id}
                style={styles.mentorCard}
                activeOpacity={0.7}
              >
                <View style={styles.mentorAvatar}>
                  <Text style={styles.mentorInitial}>{mentor.initial}</Text>
                </View>
                <Text style={styles.mentorName}>{mentor.name}</Text>
                <Text style={styles.mentorRole}>{mentor.role}</Text>
                <View style={styles.mentorStats}>
                  <View style={styles.mentorStat}>
                    <SearchStarIcon width={16} height={16} color="#FFD2A1" />
                    <Text style={styles.mentorStatText}>{mentor.rating}</Text>
                  </View>
                  <View style={styles.mentorStat}>
                    <SearchUsersIcon width={16} height={16} color="#9B9BAA" />
                    <Text style={styles.mentorStatText}>{mentor.reviews}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mentor Projects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>멘토 개설 프로젝트</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.sectionLink}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsContainer}
          >
            {mentorProjects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <View style={styles.projectImageContainer}>
                  {project.imageUri ? (
                    <Image
                      source={{ uri: project.imageUri }}
                      style={styles.projectImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.projectImagePlaceholder} />
                  )}
                </View>
                <View style={styles.projectContent}>
                  <View style={styles.projectCategoryBadge}>
                    <Text style={styles.projectCategoryText}>{project.category}</Text>
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
                      <SearchUsersIcon width={16} height={16} color="#9B9BAA" />
                      <Text style={styles.projectInfoText}>{project.participants}</Text>
                    </View>
                    <View style={styles.projectInfoItem}>
                      <IconCalendar width={16} height={16} color="#9B9BAA" />
                      <Text style={styles.projectInfoText}>{project.duration}</Text>
                    </View>
                  </View>
                  <View style={styles.projectFooter}>
                    <View>
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
                        style={styles.projectJoinButton}
                        activeOpacity={0.7}
                        onPress={async () => {
                          if (!navigation) return;
                          try {
                            // 프로젝트 상세 정보 가져오기
                            const projectDetail = await getProjectDetail(project.id);
                            
                            // 멘토 정보 가져오기
                            const mentors = await getAllMentors();
                            const projectMentor = mentors?.find((m) => m.name === project.mentor || m.id === projectDetail.mentorId);
                            
                            const mentor = {
                              id: projectMentor?.id || 2,
                              name: project.mentor || projectMentor?.name || '멘토',
                              role: projectMentor?.title || '시니어 개발 전문가',
                              initial: (project.mentor || projectMentor?.name || '멘')?.charAt(0) || '멘',
                              rating: 0.0, // 새로 등록된 멘토는 0.0
                              reviews: 0,
                              description: projectMentor?.intro || '5년 이상의 실무 경험을 바탕으로 실전 중심의 멘토링을 제공합니다.',
                              tags: projectMentor?.specialty ? [projectMentor.specialty] : ['실무 중심', '체계적 피드백'],
                            };
                            
                            // 커리큘럼 정규화 함수 (완전히 새로운 객체로 생성)
                            const normalizeCurriculum = (curriculumData) => {
                              if (!curriculumData) return [];
                              
                              let raw = [];
                              try {
                                if (typeof curriculumData === 'string') {
                                  raw = JSON.parse(curriculumData);
                                  if (!Array.isArray(raw)) raw = [raw];
                                } else if (Array.isArray(curriculumData)) {
                                  raw = curriculumData;
                                } else if (typeof curriculumData === 'object' && !Array.isArray(curriculumData)) {
                                  raw = [curriculumData];
                                }
                              } catch (e) {
                                console.error('커리큘럼 파싱 실패:', e);
                                return [];
                              }
                              
                              // 정규화: content를 description으로 변환하고 모든 필드를 안전하게 변환
                              // 완전히 새로운 객체 배열로 생성 (원본 참조 완전히 제거)
                              return raw.map((item, index) => {
                                if (!item || typeof item !== 'object' || Array.isArray(item)) {
                                  return { 
                                    week: index + 1, 
                                    title: `주차 ${index + 1}`, 
                                    description: '' 
                                  };
                                }
                                
                                // week 추출
                                let weekValue = index + 1;
                                if (item.week !== undefined && item.week !== null) {
                                  if (typeof item.week === 'number') {
                                    weekValue = item.week;
                                  } else if (typeof item.week === 'string') {
                                    const parsed = parseInt(item.week, 10);
                                    if (!isNaN(parsed)) weekValue = parsed;
                                  }
                                }
                                
                                // title 추출
                                let titleValue = `주차 ${weekValue}`;
                                if (item.title !== undefined && item.title !== null) {
                                  if (typeof item.title === 'string' && item.title.trim() !== '') {
                                    titleValue = item.title;
                                  } else if (item.title !== null && item.title !== undefined) {
                                    titleValue = String(item.title);
                                  }
                                }
                                
                                // description 추출 (content 우선, 없으면 description)
                                let descValue = '';
                                if (item.description !== undefined && item.description !== null) {
                                  if (typeof item.description === 'string') {
                                    descValue = item.description;
                                  } else if (typeof item.description === 'object') {
                                    descValue = JSON.stringify(item.description);
                                  } else {
                                    descValue = String(item.description);
                                  }
                                } else if (item.content !== undefined && item.content !== null) {
                                  if (typeof item.content === 'string') {
                                    descValue = item.content;
                                  } else if (typeof item.content === 'object') {
                                    descValue = JSON.stringify(item.content);
                                  } else {
                                    descValue = String(item.content);
                                  }
                                }
                                
                                // 완전히 새로운 객체 반환 (원본 참조 완전히 제거)
                                return {
                                  week: Number(weekValue) || (index + 1),
                                  title: String(titleValue || `주차 ${weekValue}`),
                                  description: String(descValue || ''),
                                };
                              });
                            };
                            
                            // 프로젝트 데이터 병합 (멘토 화면과 동일한 방식)
                            const normalizedCurriculum = normalizeCurriculum(projectDetail.curriculum);
                            
                            // 디버깅: 정규화된 curriculum 확인
                            if (__DEV__) {
                              console.log('SearchScreen - 정규화된 curriculum:', JSON.stringify(normalizedCurriculum, null, 2));
                            }
                            
                            const fullProject = {
                              ...project,
                              ...projectDetail,
                              description: projectDetail.description || project.description,
                              curriculum: normalizedCurriculum, // 이미 정규화된 curriculum 사용
                              skills: projectDetail.skills || project.tags || [],
                              duration: projectDetail.duration ? `${projectDetail.duration}주` : project.duration,
                              price: projectDetail.price ? `${projectDetail.price.toLocaleString()}원` : project.price,
                            };
                            
                            // 디버깅: 전달하는 fullProject 확인
                            if (__DEV__) {
                              console.log('SearchScreen - fullProject.curriculum:', JSON.stringify(fullProject.curriculum, null, 2));
                            }
                            
                            navigation.navigate('MentorProjectDetail', { mentor, project: fullProject });
                          } catch (error) {
                            console.error('프로젝트 상세 정보 로드 실패:', error);
                            // 에러 발생 시 기본 데이터로 이동
                            const mentor = recommendedMentors?.find(m => m.name === project.mentor) || {
                              id: 2,
                              name: project.mentor,
                              role: '시니어 개발 전문가',
                              initial: project.mentor?.charAt(0) || '김',
                              rating: 0.0,
                              reviews: 0,
                              description: '5년 이상의 실무 경험을 바탕으로 실전 중심의 멘토링을 제공합니다.',
                              tags: ['실무 중심', '체계적 피드백'],
                            };
                            navigation.navigate('MentorProjectDetail', { mentor, project });
                          }
                        }}
                      >
                        <Text style={styles.projectJoinButtonText}>참여하기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Free Projects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>무료 프로젝트</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.sectionLink}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.freeProjectsSubtitle}>
            커뮤니티 기반 · 멘토 없음 · 함께 성장하는 프로젝트
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.freeProjectsContainer}
          >
            {freeProjects.map((project) => (
              <View key={project.id} style={styles.freeProjectCard}>
                <View style={styles.freeProjectImageContainer}>
                  {project.imageUri ? (
                    <Image
                      source={{ uri: project.imageUri }}
                      style={styles.freeProjectImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.freeProjectImagePlaceholder} />
                  )}
                </View>
                <View style={styles.freeProjectContent}>
                  <View style={styles.freeProjectCategories}>
                    <View style={styles.freeProjectCategoryBadge}>
                      <Text style={styles.freeProjectCategoryText}>{project.category}</Text>
                    </View>
                    <View style={styles.freeProjectCategoryBadge}>
                      <Text style={styles.freeProjectCategoryText}>{project.subcategory}</Text>
                    </View>
                  </View>
                  <Text style={styles.freeProjectTitle}>{project.title}</Text>
                  <Text style={styles.freeProjectDescription}>{project.description}</Text>
                  <View style={styles.freeProjectFooter}>
                    <View style={styles.freeProjectInfo}>
                      <View style={styles.freeProjectInfoItem}>
                        <UsersIcon2 width={16} height={16} color="#9B9BAA" />
                        <Text style={styles.freeProjectInfoText}>{project.participants}</Text>
                      </View>
                      <View style={styles.freeProjectInfoItem}>
                        <IconCalendar width={16} height={16} color="#9B9BAA" />
                        <Text style={styles.freeProjectInfoText}>{project.duration}</Text>
                      </View>
                    </View>
                    <View style={styles.freeProjectActions}>
                      <TouchableOpacity style={styles.freeProjectActionButton} activeOpacity={0.7}>
                        <HeartIcon width={20} height={20} color="#9B9BAA" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.freeProjectActionButton} activeOpacity={0.7}>
                        <BookmarkIcon width={20} height={20} color="#9B9BAA" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.freeProjectJoinButton} activeOpacity={0.7}>
                        <Text style={styles.freeProjectJoinButtonText}>참여하기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation?.navigate('MenteeHome')}
          activeOpacity={0.7}
        >
          <HomeIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <SearchIcon width={24} height={24} color="#1E78FF" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>탐색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation?.navigate('MyProject')}
          activeOpacity={0.7}
        >
          <ProjectCalendarIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#e2e2e8',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
  searchSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28,
  },
  searchBarContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cbe0ff',
    borderWidth: 1,
    borderColor: '#e6e6ea',
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    height: 48,
    position: 'relative',
  },
  searchIconWrapper: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 24,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#e6e6ea',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
  },
  categoryChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ebebee',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 7,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#1e78ff',
    borderColor: '#1e78ff',
  },
  categoryChipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9BAA',
    lineHeight: 24,
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#faf8ff',
    borderRadius: 16.4,
    padding: 3.5,
    gap: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#737373',
    lineHeight: 20,
  },
  tabTextActive: {
    color: '#000000',
  },
  bannerContainer: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  banner: {
    height: 180,
    borderRadius: 16,
    backgroundColor: '#9B9BAA',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  bannerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  bannerBlurCircle1: {
    position: 'absolute',
    left: 196.1,
    top: 0,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
  bannerBlurCircle2: {
    position: 'absolute',
    left: 0,
    top: 84,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
  bannerContent: {
    position: 'absolute',
    left: 16,
    top: 24,
    right: 130,
    gap: 4,
    zIndex: 1,
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  bannerIconContainer: {
    position: 'absolute',
    right: 24,
    top: 24,
    width: 94,
    height: 94,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  bannerIconWrapper: {
    width: 94,
    height: 94,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIconInner: {
    position: 'absolute',
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPlusIcon: {
    position: 'absolute',
    width: 43.309,
    height: 43.309,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPlusHorizontal: {
    position: 'absolute',
    width: 43.309,
    height: 9.281,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    transform: [{ rotate: '90deg' }],
  },
  bannerPlusVertical: {
    position: 'absolute',
    width: 43.309,
    height: 9.281,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  bannerBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 21,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 20,
    letterSpacing: -0.16,
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  bannerIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bannerIndicatorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e3e6',
    lineHeight: 21,
  },
  bannerDots: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e2e8',
  },
  bannerDotActive: {
    width: 24,
    backgroundColor: '#1e78ff',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 21,
  },
  mentorsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 24,
  },
  mentorCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#959595',
    borderRadius: 16,
    width: 160,
    padding: 16.69,
    alignItems: 'center',
    gap: 8,
  },
  mentorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 120, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mentorInitial: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 25.2,
  },
  mentorRole: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
  },
  mentorStats: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  mentorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mentorStatText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  projectsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 24,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#ffffff',
    borderRadius: 16,
    width: 324,
    overflow: 'hidden',
  },
  projectImageContainer: {
    width: '100%',
    height: 192,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  projectImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffe7fa',
  },
  projectContent: {
    padding: 20,
    gap: 12,
  },
  projectCategoryBadge: {
    backgroundColor: '#cbe0ff',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  projectCategoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1e78ff',
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
    backgroundColor: '#1e78ff',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  projectTagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#cbe0ff',
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
  projectPriceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  projectPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  projectActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  projectActionButton: {
    width: 32,
    height: 32,
    borderWidth: 0.697,
    borderColor: '#E5E5E5',
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectJoinButton: {
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectJoinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 20,
  },
  freeProjectsSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 21,
    marginBottom: 16,
  },
  freeProjectsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 24,
  },
  freeProjectCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 16,
    width: 324,
    overflow: 'hidden',
  },
  freeProjectImageContainer: {
    width: '100%',
    height: 128,
    overflow: 'hidden',
  },
  freeProjectImage: {
    width: '100%',
    height: '100%',
  },
  freeProjectImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#9B9BAA',
  },
  freeProjectContent: {
    padding: 16,
    gap: 12,
  },
  freeProjectCategories: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  freeProjectCategoryBadge: {
    backgroundColor: '#cbe0ff',
    borderWidth: 0.697,
    borderColor: '#cbe0ff',
    borderRadius: 9999,
    paddingHorizontal: 8.688,
    paddingVertical: 8.873,
    height: 33.392,
  },
  freeProjectCategoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  freeProjectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  freeProjectDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 25.6,
  },
  freeProjectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  freeProjectInfo: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  freeProjectInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  freeProjectInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9B9BAA',
    lineHeight: 21,
  },
  freeProjectActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  freeProjectActionButton: {
    width: 32,
    height: 32,
    borderWidth: 0.697,
    borderColor: '#E5E5E5',
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeProjectJoinButton: {
    backgroundColor: '#1e78ff',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 0,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  freeProjectJoinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 20,
  },
  bottomNavigation: {
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
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navButtonCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
  },
  navCenterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fb23cb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00b8b0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  navLabelActive: {
    color: '#1E78FF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-end',
  },
  loadingContainer: {
    padding: 20,
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

