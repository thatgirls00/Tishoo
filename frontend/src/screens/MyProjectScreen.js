import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TishooTextIcon from '../components/TishooTextIcon';
import ChatNotificationIcon from '../components/ChatNotificationIcon';
import HomeIcon from '../components/HomeIcon';
import SearchIcon from '../components/SearchIcon';
import ProjectIcon from '../components/ProjectIcon';
import MyIcon from '../components/MyIcon';
import ListViewIcon from '../components/ListViewIcon';
import GridViewIcon from '../components/GridViewIcon';
import { getMyProjects } from '../services/projectService';
import { getUserName, getUserRole, getMenteeId, getAppliedProjectIds } from '../utils/storage';
import { getAllMentors } from '../services/mentorService';

export default function MyProjectScreen({ navigation, route }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // route.params에서 전달된 프로젝트가 있으면 우선 사용
  const projectFromRoute = route?.params?.project;

  // 내 프로젝트 목록 로드 (항상 서버에서 최신 데이터 조회)
  const loadMyProjects = useCallback(async () => {
    // 로딩 중에도 기존 프로젝트를 유지하기 위해 setLoading(true)를 호출하지 않음
    // 단, 초기 로딩일 때만 loading을 true로 설정
    const isInitialLoad = projects.length === 0;
    if (isInitialLoad) {
      setLoading(true);
    }
    
    try {
      // 사용자 정보 가져오기
      const userName = await getUserName();
      const userRole = await getUserRole();
      
      if (!userName) {
        console.log('사용자 이름이 없습니다.');
        // route.params에 프로젝트가 있으면 그것만 사용
        if (projectFromRoute) {
          setProjects([projectFromRoute]);
        } else {
          setProjects([]);
        }
        setLoading(false);
        return;
      }
      
      // 멘티인 경우에만 내 프로젝트 조회
      if (userRole === 'mentee') {
        // 멘티 ID 가져오기 (반드시 await로 완료 대기)
        let menteeId = await getMenteeId();
        console.log('MyProjectScreen - 멘티 ID 조회 결과:', menteeId);
        
        if (!menteeId) {
          // 멘티 ID가 없으면 프로젝트 목록을 조회할 수 없음
          console.error('❌ MyProjectScreen - 멘티 ID가 없습니다. 프로필을 먼저 완성해주세요.');
          setProjects([]);
          setLoading(false);
          return;
        }
        
        // 멘티 ID 확인 후 멘토 목록 가져오기 (멘토 정보 매핑용)
        const mentors = await getAllMentors();
        
        console.log('내 프로젝트 조회 시작 - menteeId:', menteeId, 'role: MENTEE');
        
        // 항상 서버에서 최신 데이터를 불러옴 (캐시 무시)
        // 멘티 ID가 확실히 설정된 후에만 API 호출
        const myProjects = await getMyProjects(menteeId, 'MENTEE');
        
        console.log('내 프로젝트 조회 결과:', myProjects);
        console.log('프로젝트 개수:', myProjects?.length || 0);
        
        // 클라이언트 필터링 제거: 서버가 준 데이터를 그대로 사용
        // 서버의 /projects/my API가 이미 멘티가 신청한 프로젝트만 필터링해서 반환함
        if (myProjects && Array.isArray(myProjects) && myProjects.length > 0) {
          console.log('서버에서 받은 프로젝트 ID 목록:', myProjects.map(p => `${p.id}(${p.title})`));
          
          // 프로젝트 데이터 포맷팅 (필터링 없이 서버 데이터 그대로 사용)
          const formattedProjects = myProjects.map((proj) => {
            // 멘토 정보 찾기
            const projectMentor = mentors?.find((m) => m.id === proj.mentorId);
            
            return {
              id: proj.id,
              title: proj.title,
              mentor: projectMentor ? {
                name: projectMentor.name,
                initial: projectMentor.name?.charAt(0) || '멘',
              } : (proj.mentorName || '멘토'),
              status: '진행 중',
              progress: proj.progress || 0,
              imageUri: proj.thumbnailUrl || 'http://localhost:3845/assets/27c5b5af8541698db9668979820e9e8e4446374b.png',
              description: proj.description,
              duration: proj.duration,
              price: proj.price,
            };
          });
          
          console.log('포맷팅된 프로젝트:', formattedProjects);
          console.log('setProjects 호출 전 - 현재 projects:', projects.length);
          setProjects(formattedProjects);
          console.log('setProjects 호출 후 - formattedProjects:', formattedProjects.length);
        } else {
          // DB에 프로젝트가 없지만 route.params에 프로젝트가 있으면 그것 사용 (임시)
          if (projectFromRoute) {
            console.log('DB에 프로젝트 없음, route.params 프로젝트 사용 (임시)');
            setProjects([projectFromRoute]);
          } else {
            console.log('프로젝트 없음 - 빈 목록 표시');
            setProjects([]);
          }
        }
      } else {
        // 멘토가 아닌 경우 route.params에 프로젝트가 있으면 그것만 사용
        if (projectFromRoute) {
          setProjects([projectFromRoute]);
        } else {
          setProjects([]);
        }
      }
    } catch (error) {
      console.error('내 프로젝트 로드 실패:', error);
      console.error('에러 상세:', error.response?.data || error.message);
      
      // 에러 발생 시 route.params에 프로젝트가 있으면 그것 사용 (fallback)
      if (projectFromRoute) {
        console.log('에러 발생, route.params 프로젝트 사용 (fallback)');
        setProjects([projectFromRoute]);
      } else {
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  }, [projectFromRoute, projects.length]);

  // 화면 포커스 시 항상 최신 데이터를 서버에서 불러오기
  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때마다 프로젝트 목록을 서버에서 다시 불러옴
      console.log('MyProjectScreen - 화면 포커스, 프로젝트 목록 재조회');
      loadMyProjects();
      
      // Unfocus 시 정리 작업 (필요한 경우)
      return () => {
        // 정리 작업이 필요한 경우 여기에 작성
      };
    }, [loadMyProjects])
  );

  // 현재 표시할 프로젝트: 항상 서버에서 불러온 projects 배열에서 가져옴
  // projectFromRoute는 초기 로딩 중에만 임시로 사용하고, 서버 데이터가 로드되면 무시
  const currentProject = projects.length > 0 ? projects[0] : null;

  // 디버깅: projects state와 currentProject 확인
  React.useEffect(() => {
    console.log('MyProjectScreen - projects state 업데이트:', projects.length, '개');
    console.log('MyProjectScreen - currentProject:', currentProject ? currentProject.title : 'null');
  }, [projects, currentProject]);

  // Format mentor name if it's an object
  const mentorName = currentProject 
    ? (typeof currentProject.mentor === 'object' 
        ? `${currentProject.mentor.name} 멘토` 
        : currentProject.mentor || '멘토')
    : '멘토';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TishooTextIcon width={75.305} height={32} color="#1E78FF" />
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={0.7}
          >
            <ChatNotificationIcon width={24} height={24} color="#5D5D7A" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.headerTitle}>내 프로젝트</Text>
          <View style={styles.viewModeButtons}>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('list')}
              activeOpacity={0.7}
            >
              <ListViewIcon width={20} height={20} color={viewMode === 'list' ? '#1E78FF' : '#5D5D7A'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('grid')}
              activeOpacity={0.7}
            >
              <GridViewIcon width={20} height={20} color={viewMode === 'grid' ? '#1E78FF' : '#5D5D7A'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 디버깅: 렌더링 시점 확인 */}
        {(() => {
          console.log('렌더링 시점 - loading:', loading, 'projects.length:', projects.length);
          console.log('렌더링 시점 - projects:', JSON.stringify(projects, null, 2));
          return null;
        })()}
        
        {loading && projects.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1e78ff" />
            <Text style={styles.loadingText}>로딩 중...</Text>
          </View>
        ) : projects && Array.isArray(projects) && projects.length > 0 ? (
          /* Projects List - 모든 프로젝트 렌더링 */
          (() => {
            console.log('프로젝트 목록 렌더링 시작 - 개수:', projects.length);
            return projects.map((project, index) => {
              console.log(`프로젝트 ${index} 렌더링:`, project.title);
              const projectMentorName = typeof project.mentor === 'object' 
                ? `${project.mentor.name} 멘토` 
                : project.mentor || '멘토';
              
              return (
                <View 
                  key={project.id || `project-${index}`} 
                  style={styles.projectCard}
                >
                  <View style={styles.projectImageContainer}>
                    <Image
                      source={{ uri: project.imageUri || 'http://localhost:3845/assets/27c5b5af8541698db9668979820e9e8e4446374b.png' }}
                      style={styles.projectImage}
                      resizeMode="cover"
                      onError={(e) => {
                        console.log('이미지 로드 실패:', project.imageUri);
                      }}
                    />
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusBadgeText}>{project.status || '진행 중'}</Text>
                    </View>
                  </View>
                  <View style={styles.projectContent}>
                    <Text style={styles.projectTitle} numberOfLines={2}>
                      {project.title || '프로젝트 제목 없음'}
                    </Text>
                    <Text style={styles.mentorName} numberOfLines={1}>
                      {projectMentorName}
                    </Text>
                    <View style={styles.progressSection}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>진행률</Text>
                        <Text style={styles.progressPercent}>{project.progress || 0}%</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressBarFill, { width: `${project.progress || 0}%` }]} />
                      </View>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.viewProjectButton}
                        onPress={() => {
                          navigation.navigate('MyProjectDetail', { project });
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.viewProjectButtonText}>프로젝트 보기</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.writeReviewButton}
                        onPress={() => {
                          // Navigate to review screen
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.writeReviewButtonText}>후기 작성</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            });
          })()
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? '로딩 중...' : '참여 중인 프로젝트가 없습니다.'}
            </Text>
            <Text style={[styles.emptyText, { marginTop: 8, fontSize: 12, color: '#999' }]}>
              디버그: projects.length = {projects?.length || 0}
            </Text>
          </View>
        )}

        {/* New Project Card */}
        <View style={styles.newProjectCard}>
          <Text style={styles.newProjectTitle}>새로운 프로젝트를 시작해보세요</Text>
          <Text style={styles.newProjectSubtitle}>다양한 프로젝트가 준비되어 있어요</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.7}
          >
            <Text style={styles.browseButtonText}>프로젝트 둘러보기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('MenteeHome')}
          activeOpacity={0.7}
        >
          <HomeIcon width={24} height={24} color="#9b9baa" />
          <Text style={styles.navLabel}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <SearchIcon width={24} height={24} color="#9b9baa" />
          <Text style={styles.navLabel}>탐색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <ProjectIcon width={24} height={24} color="#1e78ff" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation?.navigate('MyPage')}
          activeOpacity={0.7}
        >
          <MyIcon width={24} height={24} color="#9b9baa" />
          <Text style={styles.navLabel}>마이</Text>
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
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e78ff',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28,
  },
  viewModeButtons: {
    flexDirection: 'row',
    gap: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  viewModeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewModeButtonActive: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f9f9fb',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    gap: 24,
    minHeight: '100%',
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  projectImageContainer: {
    height: 128,
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(30, 120, 255, 0.4)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8.176,
    height: 32,
    justifyContent: 'center',
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 21,
  },
  projectContent: {
    padding: 20,
    gap: 12,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 25.6,
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
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 21,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e8e8f0',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1e78ff',
    borderRadius: 9999,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  viewProjectButton: {
    flex: 1,
    backgroundColor: '#1e78ff',
    height: 49.396,
    borderRadius: 16.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewProjectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
  writeReviewButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#1e78ff',
    height: 49.396,
    borderRadius: 16.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeReviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
  },
  newProjectCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.75,
    borderColor: '#e8e8f0',
    borderRadius: 16,
    padding: 48,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 8,
  },
  newProjectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 24,
    textAlign: 'center',
  },
  newProjectSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 8,
  },
  browseButton: {
    backgroundColor: '#1e78ff',
    height: 48.003,
    borderRadius: 16.4,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 162.462,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#999999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
});
