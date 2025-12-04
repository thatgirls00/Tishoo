import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import BackArrowIcon from '../components/BackArrowIcon';
import HeartIcon2 from '../components/HeartIcon2';
import ShareIcon2 from '../components/ShareIcon2';
import StarIcon2 from '../components/StarIcon2';
import UsersIcon2 from '../components/UsersIcon2';
import CalendarIcon from '../components/CalendarIcon';
import DifficultyLevelIcon from '../components/DifficultyLevelIcon';
import HomeIcon from '../components/HomeIcon';
import SearchIcon from '../components/SearchIcon';
import ProjectIcon from '../components/ProjectIcon';
import MyIcon from '../components/MyIcon';
import ChartIcon from '../components/ChartIcon';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = 390;

const TABS = ['소개', '멘토', '커리큘럼', '스킬업', '후기'];

export default function MentorProjectDetailScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('소개');
  
  const defaultMentor = {
    id: 2,
    name: '김민준',
    role: '시니어 개발 전문가',
    initial: '김',
    rating: 4.9,
    reviews: 128,
    description: '5년 이상의 실무 경험을 바탕으로 실전 중심의 멘토링을 제공합니다.',
    tags: ['실무 중심', '체계적 피드백'],
  };

  const defaultProject = {
    id: 1,
    title: 'React로 만드는 실시간 채팅 앱',
    participants: '8/10명',
    duration: '6주',
    difficulty: '중급',
    price: '180,000원',
    category: '개발',
    imageUri: 'http://localhost:3845/assets/27c5b5af8541698db9668979820e9e8e4446374b.png',
    goal: 'React와 WebSocket을 활용하여 실시간 채팅 애플리케이션을 제작하는 프로젝트입니다.',
    methods: [
      '주 1회 온라인 세션 (2시간)',
      '주차별 실습 과제 및 피드백',
      '실시간 채팅 및 Q&A 지원',
    ],
  };

  const mentor = route?.params?.mentor || defaultMentor;
  const project = route?.params?.project || { ...defaultProject, mentor };

  // 커리큘럼 파싱 및 정규화를 useMemo로 메모이제이션
  const curriculum = useMemo(() => {
    // 디버깅: 받은 project.curriculum 확인
    if (__DEV__) {
      console.log('MentorProjectDetailScreen - 받은 project.curriculum:', JSON.stringify(project.curriculum, null, 2));
    }
    
    // 항상 완전히 정규화된 curriculum 반환 (content 필드 완전히 제거)
    const normalizeItem = (item, index) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return {
          week: index + 1,
          title: `주차 ${index + 1}`,
          description: '',
        };
      }
      
      // week 추출
      let weekValue = index + 1;
      if (item.week !== undefined && item.week !== null) {
        if (typeof item.week === 'number' && !isNaN(item.week)) {
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
        } else if (typeof item.title !== 'object') {
          titleValue = String(item.title);
        }
      }
      
      // description 추출 (content 우선, 없으면 description)
      let descValue = '';
      if (item.content !== undefined && item.content !== null) {
        if (typeof item.content === 'string' && item.content.trim() !== '') {
          descValue = item.content;
        } else if (typeof item.content !== 'object') {
          descValue = String(item.content);
        }
      } else if (item.description !== undefined && item.description !== null) {
        if (typeof item.description === 'string' && item.description.trim() !== '') {
          descValue = item.description;
        } else if (typeof item.description !== 'object') {
          descValue = String(item.description);
        }
      }
      
      // 완전히 새로운 객체 반환 (content 필드 제거, week, title, description만 포함)
      return {
        week: Number(weekValue) || (index + 1),
        title: String(titleValue || `주차 ${weekValue}`),
        description: String(descValue || ''),
      };
    };
    
    // 이미 정규화된 curriculum인지 확인 (week, title, description만 있는 배열)
    if (Array.isArray(project.curriculum) && project.curriculum.length > 0) {
      const firstItem = project.curriculum[0];
      // 이미 정규화된 형태인지 확인 (week, title, description만 있고 content가 없음)
      if (firstItem && typeof firstItem === 'object' && !Array.isArray(firstItem) &&
          typeof firstItem.week === 'number' && 
          typeof firstItem.title === 'string' && 
          typeof firstItem.description === 'string' &&
          !('content' in firstItem) &&
          Object.keys(firstItem).length === 3) { // week, title, description만 있어야 함
        // 이미 정규화된 curriculum이지만, 안전을 위해 다시 정규화
        const normalized = project.curriculum.map((item, index) => normalizeItem(item, index));
        
        if (__DEV__) {
          console.log('MentorProjectDetailScreen - 정규화된 curriculum:', JSON.stringify(normalized, null, 2));
        }
        
        return normalized;
      }
    }
    
    // 정규화되지 않은 curriculum인 경우 파싱 및 정규화
    let rawCurriculum = [];
    try {
      if (project.curriculum) {
        if (typeof project.curriculum === 'string') {
          try {
            const parsed = JSON.parse(project.curriculum);
            // 파싱된 결과가 배열인지 확인
            if (Array.isArray(parsed)) {
              rawCurriculum = parsed;
            } else if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              // 단일 객체인 경우 배열로 변환
              rawCurriculum = [parsed];
            }
          } catch (parseError) {
            console.error('커리큘럼 JSON 파싱 실패:', parseError);
            rawCurriculum = [];
          }
        } else if (Array.isArray(project.curriculum)) {
          rawCurriculum = project.curriculum;
        } else if (project.curriculum && typeof project.curriculum === 'object' && !Array.isArray(project.curriculum)) {
          // 단일 객체인 경우 배열로 변환
          rawCurriculum = [project.curriculum];
        }
      }
    } catch (error) {
      console.error('커리큘럼 파싱 실패:', error);
      rawCurriculum = [];
    }

    // 기본 커리큘럼 (파싱 실패 시)
    if (!rawCurriculum || rawCurriculum.length === 0) {
      rawCurriculum = [
        {
          week: 1,
          title: '프로젝트 셋업 및 환경 구성',
          description: '프로젝트 초기 세팅과 개발 환경 구축',
        },
        {
          week: 2,
          title: '기본 기능 구현',
          description: '핵심 기능 개발',
        },
      ];
    }

    // 커리큘럼 데이터 정규화 (normalizeItem 함수 재사용)
    let normalizedCurriculum = rawCurriculum.map((item, index) => normalizeItem(item, index));
    
    // 최종 검증: 모든 항목이 올바른 형태인지 확인하고 완전히 새로운 배열 생성
    normalizedCurriculum = normalizedCurriculum
      .filter((item) => {
        return item && 
               typeof item === 'object' &&
               !Array.isArray(item) &&
               typeof item.week === 'number' && 
               typeof item.title === 'string' && 
               typeof item.description === 'string';
      })
      .map((item) => {
        // 완전히 새로운 객체로 복사 (모든 참조 제거)
        return {
          week: Number(item.week),
          title: String(item.title),
          description: String(item.description),
        };
      });
    
    // 디버깅: 최종 정규화된 curriculum 확인
    if (__DEV__) {
      console.log('최종 정규화된 커리큘럼:', JSON.stringify(normalizedCurriculum, null, 2));
    }
    
    return normalizedCurriculum;
  }, [project.curriculum]);

  // 스킬 파싱
  const skills = project.skills || project.tags || ['React', 'WebSocket', 'Node.js', 'TypeScript'];

  const expectedEffects = [
    '실전 프로젝트 포트폴리오 완성',
    '현업 수준의 협업 경험',
    '멘토의 1:1 피드백으로 빠른 성장',
  ];

  const reviews = [
    {
      id: 1,
      name: '김*민',
      initial: '김',
      date: '2025-10-15',
      rating: 5,
      comment: '체계적인 커리큘럼과 친절한 피드백이 정말 좋았어요!',
    },
    {
      id: 2,
      name: '박*연',
      initial: '박',
      date: '2025-10-10',
      rating: 5,
      comment: '실무 중심의 프로젝트로 포트폴리오를 완성할 수 있었습니다.',
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
        <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 16 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <BackArrowIcon width={24} height={24} color="#5D5D7A" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <HeartIcon2 width={24} height={24} color="#5D5D7A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <ShareIcon2 width={24} height={24} color="#5D5D7A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Project Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: project?.imageUri || 'http://localhost:3845/assets/27c5b5af8541698db9668979820e9e8e4446374b.png' }}
            style={styles.projectImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.imageBadges}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🔥 마감 임박</Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{project?.category || '개발'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Project Info Card - 이미지 아래, 탭 위에 표시 */}
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>{project?.title || '프로젝트 제목'}</Text>
          <View style={styles.mentorInfo}>
            <View style={styles.mentorAvatar}>
              <Text style={styles.mentorInitial}>{mentor?.initial || '김'}</Text>
            </View>
            <View style={styles.mentorDetails}>
              <Text style={styles.mentorName}>{mentor?.name || '김민준'}</Text>
              <View style={styles.mentorRating}>
                <StarIcon2 width={16} height={16} color="#FFB4C8" />
                <Text style={styles.ratingText}>{mentor?.rating || 4.9} ({mentor?.reviews || 128})</Text>
              </View>
            </View>
          </View>
          <View style={styles.projectInfo}>
            <View style={styles.projectInfoItem}>
              <UsersIcon2 width={16} height={16} color="#6a6a6a" />
              <Text style={styles.projectInfoText}>{project?.participants || '8/10명'}</Text>
            </View>
            <View style={styles.projectInfoItem}>
              <CalendarIcon width={16} height={16} color="#6a6a6a" />
              <Text style={styles.projectInfoText}>
                {typeof project?.duration === 'number' 
                  ? `${project.duration}주` 
                  : project?.duration || '6주'}
              </Text>
            </View>
            <View style={styles.projectInfoItem}>
              <DifficultyLevelIcon width={16} height={16} color="#6a6a6a" />
              <Text style={styles.projectInfoText}>{project?.difficulty || '중급'}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content - 소개 탭 */}
        {activeTab === '소개' && (
          <>
            {/* Project Goal */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>프로젝트 목표</Text>
              <Text style={styles.sectionText}>{project?.description || project?.goal || '프로젝트 목표 정보가 없습니다.'}</Text>
            </View>

            {/* Project Methods */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>진행 방식</Text>
              {(project?.methods || [
                '주 1회 온라인 세션',
                '주차별 실습 과제 및 피드백',
                '실시간 채팅 및 Q&A 지원',
              ]).map((method, index) => {
                // method가 객체가 아닌 문자열인지 확인
                const methodText = typeof method === 'string' ? method : String(method || '');
                return (
                  <View key={index} style={styles.methodItem}>
                    <View style={styles.methodNumber}>
                      <Text style={styles.methodNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.methodText}>{methodText}</Text>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Tab Content - 멘토 탭 */}
        {activeTab === '멘토' && (
          <View style={styles.mentorSection}>
            <View style={styles.mentorCardLarge}>
              <View style={styles.mentorHeader}>
                <View style={styles.mentorAvatarLarge}>
                  <Text style={styles.mentorInitialLarge}>{mentor?.initial || '김'}</Text>
                </View>
                <View style={styles.mentorInfoLarge}>
                  <Text style={styles.mentorNameLarge}>{mentor?.name || '김민준'}</Text>
                  <Text style={styles.mentorRoleLarge}>{mentor?.role || '시니어 개발 전문가'}</Text>
                </View>
              </View>
              <Text style={styles.mentorDescription}>{mentor?.description || '5년 이상의 실무 경험을 바탕으로 실전 중심의 멘토링을 제공합니다.'}</Text>
              <View style={styles.mentorTags}>
                {(mentor?.tags || ['실무 중심', '체계적 피드백']).map((tag, index) => (
                  <View key={index} style={styles.mentorTag}>
                    <Text style={styles.mentorTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Tab Content - 커리큘럼 탭 */}
        {activeTab === '커리큘럼' && (() => {
          // 렌더링 시점에 한 번 더 안전하게 처리
          if (!curriculum || !Array.isArray(curriculum) || curriculum.length === 0) {
            return (
              <View style={styles.curriculumSection}>
                <View style={styles.curriculumCard}>
                  <Text style={styles.curriculumDescription}>커리큘럼 정보가 없습니다.</Text>
                </View>
              </View>
            );
          }
          
          // 각 아이템을 완전히 새로운 변수로 추출 (원본 참조 완전히 제거)
          const safeCurriculum = curriculum.map((item, index) => {
            // 디버깅: 렌더링 시점의 item 확인
            if (__DEV__ && index === 0) {
              console.log('렌더링 시점 curriculum[0] 원본:', JSON.stringify(item));
            }
            
            // 완전히 새로운 변수로 추출 (모든 경우 처리)
            let weekValue = index + 1;
            let titleValue = `주차 ${weekValue}`;
            let descriptionValue = '커리큘럼 내용이 없습니다.';
            
            if (item && typeof item === 'object' && !Array.isArray(item)) {
              // week 처리
              if (item.week !== undefined && item.week !== null) {
                if (typeof item.week === 'number' && !isNaN(item.week)) {
                  weekValue = item.week;
                } else if (typeof item.week === 'string') {
                  const parsed = parseInt(item.week, 10);
                  if (!isNaN(parsed)) weekValue = parsed;
                }
              }
              
              // title 처리
              if (item.title !== undefined && item.title !== null) {
                if (typeof item.title === 'string' && item.title.trim() !== '') {
                  titleValue = item.title;
                } else if (typeof item.title !== 'object') {
                  titleValue = String(item.title);
                }
              }
              
              // description 처리 (content 우선, 없으면 description)
              if (item.content !== undefined && item.content !== null) {
                if (typeof item.content === 'string' && item.content.trim() !== '') {
                  descriptionValue = item.content;
                } else if (typeof item.content !== 'object') {
                  descriptionValue = String(item.content);
                }
              } else if (item.description !== undefined && item.description !== null) {
                if (typeof item.description === 'string' && item.description.trim() !== '') {
                  descriptionValue = item.description;
                } else if (typeof item.description !== 'object') {
                  descriptionValue = String(item.description);
                }
              }
            }
            
            // 최종 안전한 값 반환 (모든 값이 문자열/숫자로 보장)
            return {
              week: Number(weekValue) || (index + 1),
              title: String(titleValue || `주차 ${weekValue}`),
              description: String(descriptionValue || ''),
            };
          });
          
          // 디버깅: 안전하게 처리된 curriculum 확인
          if (__DEV__ && safeCurriculum.length > 0) {
            console.log('안전하게 처리된 curriculum[0]:', JSON.stringify(safeCurriculum[0]));
          }
          
          return (
            <View style={styles.curriculumSection}>
              {safeCurriculum.map((safeItem, index) => (
                <View key={`curriculum-${index}`} style={styles.curriculumCard}>
                  <View style={styles.curriculumHeader}>
                    <View style={styles.weekBadge}>
                      <Text style={styles.weekBadgeText}>{safeItem.week}주차</Text>
                    </View>
                    <Text style={styles.curriculumTitle}>{safeItem.title}</Text>
                  </View>
                  <Text style={styles.curriculumDescription}>{safeItem.description}</Text>
                </View>
              ))}
            </View>
          );
        })()}

        {/* Tab Content - 스킬업 탭 */}
        {activeTab === '스킬업' && (
          <View style={styles.skillsSection}>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>습득 가능한 스킬</Text>
              <View style={styles.skillsTagsContainer}>
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => {
                    // skill이 문자열인지 확인
                    const skillText = typeof skill === 'string' ? skill : String(skill || '');
                    return (
                      <View key={index} style={styles.skillTag}>
                        <Text style={styles.skillTagText}>{skillText}</Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.skillTag}>
                    <Text style={styles.skillTagText}>스킬 정보가 없습니다.</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.expectedEffectsCard}>
              <View style={styles.expectedEffectsHeader}>
                <ChartIcon width={20} height={20} color="#1E78FF" />
                <Text style={styles.expectedEffectsTitle}>기대 효과</Text>
              </View>
              <View style={styles.expectedEffectsList}>
                {expectedEffects.map((effect, index) => (
                  <Text key={index} style={styles.expectedEffectItem}>
                    • {effect}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Tab Content - 후기 탭 */}
        {activeTab === '후기' && (
          <View style={styles.reviewsSection}>
            <View style={styles.ratingSummaryCard}>
              <View style={styles.ratingSummaryHeader}>
                <StarIcon2 width={32} height={32} color="#FFB4C8" />
                <Text style={styles.ratingNumber}>4.9</Text>
              </View>
              <Text style={styles.reviewCount}>128개의 후기</Text>
            </View>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}>
                      <Text style={styles.reviewerInitial}>{review.initial}</Text>
                    </View>
                    <View style={styles.reviewerDetails}>
                      <Text style={styles.reviewerName}>{review.name}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewStars}>
                    {[...Array(5)].map((_, index) => (
                      <StarIcon2
                        key={index}
                        width={16}
                        height={16}
                        color="#FFB4C8"
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>참가비</Text>
          <Text style={styles.price}>{project?.price || '180,000원'}</Text>
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Payment', { project, mentor })}
        >
          <Text style={styles.joinButtonText}>프로젝트 참여하기</Text>
        </TouchableOpacity>
      </View>

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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation?.navigate('Search')}
          activeOpacity={0.7}
        >
          <SearchIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>탐색</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <ProjectIcon width={24} height={24} color="#1E78FF" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <MyIcon width={24} height={24} color="#9B9BAA" />
          <Text style={styles.navLabel}>마이</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#e8e8f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 413,
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  imageBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#ffffff',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 18,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1.39,
    borderBottomColor: '#e8e8f0',
  },
  tab: {
    flex: 1,
    height: 49.396,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabActive: {
    borderBottomWidth: 1.39,
    borderBottomColor: '#1e78ff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  tabTextActive: {
    color: '#1e78ff',
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginTop: -100,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    zIndex: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 25.2,
    letterSpacing: -0.18,
    marginBottom: 12,
  },
  mentorInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  mentorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 120, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mentorInitial: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  mentorDetails: {
    flex: 1,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
    lineHeight: 25.6,
    marginBottom: 4,
  },
  mentorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 21,
  },
  projectInfo: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 0.697,
    borderTopColor: '#e8e8f0',
  },
  projectInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 26,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  methodNumber: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodNumberText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 16,
  },
  methodText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 25.6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 81,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e8e8f0',
    gap: 16,
  },
  priceSection: {
    minWidth: 110,
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9b9baa',
    lineHeight: 18,
    marginBottom: 2,
  },
  price: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  joinButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e2e3e6',
    height: 81,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
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
  mentorSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  mentorCardLarge: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 24.693,
    gap: 16,
  },
  mentorHeader: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  mentorAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 120, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mentorInitialLarge: {
    fontSize: 24,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 32,
  },
  mentorInfoLarge: {
    flex: 1,
  },
  mentorNameLarge: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
    marginBottom: 4,
  },
  mentorRoleLarge: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 25.6,
  },
  mentorDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 25.6,
  },
  mentorTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  mentorTag: {
    backgroundColor: '#fafbff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 9999,
    paddingHorizontal: 12.695,
    paddingVertical: 8.873,
    height: 33.392,
    justifyContent: 'center',
  },
  mentorTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  curriculumSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  curriculumCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 20.686,
    gap: 12,
  },
  curriculumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weekBadge: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8.176,
    height: 32,
    justifyContent: 'center',
  },
  weekBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  curriculumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
    flex: 1,
  },
  curriculumDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 25.6,
  },
  skillsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 24,
  },
  skillsContainer: {
    gap: 16,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
  },
  skillsTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
  },
  skillTag: {
    backgroundColor: '#1e78ff',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 7.08,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillTagText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  expectedEffectsCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.2)',
    borderRadius: 16,
    padding: 24.693,
    gap: 12,
  },
  expectedEffectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expectedEffectsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 24,
  },
  expectedEffectsList: {
    gap: 8,
  },
  expectedEffectItem: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5d5d7a',
    lineHeight: 24,
  },
  reviewsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  ratingSummaryCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    height: 113.381,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ratingSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  reviewCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 20.686,
    gap: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#e8e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewerInitial: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  reviewerDetails: {
    gap: 4.181,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
    lineHeight: 25.6,
  },
  reviewDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewComment: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 25.6,
  },
});

