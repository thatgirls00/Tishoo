import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import TishooTextIcon from '../components/TishooTextIcon';
import ChatNotificationIcon from '../components/ChatNotificationIcon';
import HomeIcon from '../components/HomeIcon';
import SearchIcon from '../components/SearchIcon';
import ProjectIcon from '../components/ProjectIcon';
import MyIcon from '../components/MyIcon';
import ArrowLeftIcon from '../components/ArrowLeftIcon';
import DotsVerticalIcon from '../components/DotsVerticalIcon';
import ChatIcon3 from '../components/ChatIcon3';
import CalendarIcon2 from '../components/CalendarIcon2';
import ChartIcon from '../components/ChartIcon';
import ArrowIcon from '../components/ArrowIcon';
import CloseIcon from '../components/CloseIcon';
import EmptyCalendarIcon from '../components/EmptyCalendarIcon';
import ArrowRightIcon from '../components/ArrowRightIcon';
import ProgressRingIcon from '../components/ProgressRingIcon';
import FolderIcon3 from '../components/FolderIcon3';
import LinkIcon2 from '../components/LinkIcon2';
import CheckmarkIcon3 from '../components/CheckmarkIcon3';
import ProgressRingIcon2 from '../components/ProgressRingIcon2';
import UploadIcon from '../components/UploadIcon';
import ProgressRingIcon3 from '../components/ProgressRingIcon3';
import ExternalLinkIcon2 from '../components/ExternalLinkIcon2';
import SendIcon2 from '../components/SendIcon2';
import ChartIcon2 from '../components/ChartIcon2';
import ProgressRingIcon4 from '../components/ProgressRingIcon4';
import ExternalLinkIcon3 from '../components/ExternalLinkIcon3';

export default function MyProjectDetailScreen({ navigation, route }) {
  const project = route?.params?.project || {
    title: 'React로 만드는 실시간 채팅 앱',
    mentor: '김민준 멘토',
    progress: 50,
    startDate: '2025-11-08',
    endDate: '2025-12-20',
  };
  
  const reviewSubmittedFromRoute = route?.params?.reviewSubmitted || false;
  const activeTabFromRoute = route?.params?.activeTab || null;
  
  const [activeTab, setActiveTab] = useState(activeTabFromRoute || 'calendar'); // 'chat', 'calendar', 'progress'
  const [calendarView, setCalendarView] = useState('month'); // 'month' or 'list'
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(reviewSubmittedFromRoute);
  
  // route.params가 변경될 때 reviewSubmitted 상태 업데이트
  React.useEffect(() => {
    if (reviewSubmittedFromRoute) {
      setReviewSubmitted(true);
      if (activeTabFromRoute) {
        setActiveTab(activeTabFromRoute);
      }
    }
  }, [reviewSubmittedFromRoute, activeTabFromRoute]);

  // Sample events data - 날짜별 일정 데이터
  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // 11월 15일 예시 데이터
    if (date.getMonth() === 10 && date.getDate() === 15) {
      return [
        {
          id: 1,
          type: '피드백',
          typeColor: '#ffb4c8',
          title: '중간 피드백 세션',
          time: '19:00–20:00',
          description: '지금까지 진행 상황 공유 및 질의응답',
          progress: 0,
        },
      ];
    }
    return [];
  };

  // 리스트 보기용 일정 데이터 (날짜별 그룹화)
  const listViewEvents = [
    {
      date: new Date(2025, 10, 13), // 11월 13일
      progress: 80,
      events: [
        {
          id: 1,
          type: '멘토링 세션',
          typeColor: '#1e78ff',
          title: '멘토링 세션 3주차',
          time: '20:00–22:00',
          description: 'UI 컴포넌트 설계 리뷰 및 상태 관리 패턴',
          task: '[3주차] UI 시나리오 작성',
          submissionDate: '2025.11.15',
          links: [
            { type: 'zoom', label: 'Zoom 링크' },
            { type: 'note', label: '세션 노트' },
            { type: 'feedback', label: '피드백 있음', hasFeedback: true },
          ],
          progress: 100,
          progressVariant: 'full',
        },
        {
          id: 2,
          type: '과제 마감',
          typeColor: '#ffb84d',
          title: '과제: 로그인 페이지 구현',
          time: '23:59',
          description: '',
          task: '[3주차] 로그인 페이지 완성',
          deadline: '2025.11.20',
          links: [
            { type: 'assignment', label: '과제 설명' },
            { type: 'github', label: 'GitHub' },
          ],
          progress: 60,
          progressVariant: 'partial',
        },
      ],
    },
    {
      date: new Date(2025, 10, 15), // 11월 15일
      progress: 0,
      events: [
        {
          id: 3,
          type: '피드백',
          typeColor: '#ffb4c8',
          title: '중간 피드백 세션',
          time: '19:00–20:00',
          description: '지금까지 진행 상황 공유 및 질의응답',
          progress: 0,
          progressVariant: 'empty',
        },
      ],
    },
    {
      date: new Date(2025, 10, 18), // 11월 18일
      progress: 0,
      events: [
        {
          id: 4,
          type: '회고/리뷰',
          typeColor: '#9b9baa',
          title: '프로젝트 회고',
          time: '21:00–22:00',
          description: '3주차 회고 및 개선 포인트 논의',
          task: '[3주차] 회고록 작성',
          links: [],
          progress: 0,
          progressVariant: 'empty',
        },
      ],
    },
    {
      date: new Date(2025, 10, 20), // 11월 20일
      progress: 0,
      events: [
        {
          id: 5,
          type: '멘토링 세션',
          typeColor: '#1e78ff',
          title: '멘토링 세션 4주차',
          time: '20:00–22:00',
          description: 'API 연동 및 비동기 처리 패턴',
          links: [
            { type: 'zoom', label: 'Zoom 링크' },
          ],
          progress: 0,
          progressVariant: 'dashed',
        },
      ],
    },
    {
      date: new Date(2025, 10, 22), // 11월 22일
      progress: 0,
      events: [
        {
          id: 6,
          type: '과제 마감',
          typeColor: '#ffb84d',
          title: '과제: API 연동 완성',
          time: '23:59',
          description: '',
          links: [
            { type: 'figma', label: 'Figma 디자인' },
            { type: 'github', label: 'GitHub' },
          ],
          progress: 0,
          progressVariant: 'dashed',
        },
      ],
    },
  ];

  const formatListDate = (date) => {
    if (!date) return '';
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()];
    return `${month} ${day}일 (${weekDay})`;
  };

  // Chat messages data
  const chatMessages = [
    {
      id: 1,
      sender: '김민준 멘토',
      message: '안녕하세요! 첫 주차 과제를 확인해주세요',
      time: '14:23',
      isMentor: true,
    },
    {
      id: 2,
      sender: '나',
      message: '확인했습니다! 궁금한 점이 있어서 질문 드립니다',
      time: '14:25',
      isMentor: false,
    },
    {
      id: 3,
      sender: '김민준 멘토',
      message: '네 말씀해주세요',
      time: '14:26',
      isMentor: true,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // 메시지 전송 로직 (추후 구현)
      setMessageText('');
    }
  };

  // Format mentor name if it's an object
  const mentorName = typeof project?.mentor === 'object' 
    ? `${project.mentor.name} 멘토` 
    : project.mentor || '김민준 멘토';

  // Calendar data
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  
  // Generate calendar days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const calendarDays = getDaysInMonth(currentMonth);
  
  // Event dots for specific dates
  const getEventDots = (day) => {
    if (day === 13) return [{ color: '#1e78ff' }, { color: '#ffb84d' }];
    if (day === 15) return [{ color: '#ffb4c8' }];
    if (day === 18) return [{ color: '#9b9baa' }];
    if (day === 20) return [{ color: '#1e78ff' }];
    if (day === 22) return [{ color: '#ffb84d' }];
    return [];
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDatePress = (day) => {
    if (day === null) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setIsDateModalVisible(true);
  };

  const formatDateHeader = (date) => {
    if (!date) return '';
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()];
    return `${month} ${day}일 (${weekDay})`;
  };

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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon width={20} height={20} color="#666666" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>내 프로젝트</Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <DotsVerticalIcon width={24} height={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Project Info Card */}
        <View style={styles.projectCard}>
          <View style={styles.projectCardContent}>
            <Text style={styles.projectCardTitle}>{project.title || 'React로 만드는 실시간 채팅 앱'}</Text>
            <Text style={styles.projectCardMentor}>{mentorName || '김민준 멘토'}</Text>
          </View>
          <View style={styles.progressSectionCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>진행률</Text>
              <Text style={styles.progressPercent}>{project.progress || 50}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: `${project.progress || 50}%` }]} />
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.dateText}>시작일: {project.startDate || '2025-11-08'}</Text>
              <Text style={styles.dateText}>종료일: {project.endDate || '2025-12-20'}</Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'chat' && styles.tabButtonActive]}
            onPress={() => setActiveTab('chat')}
            activeOpacity={0.7}
          >
            <ChatIcon3 width={16.202} height={16.202} color={activeTab === 'chat' ? '#1e78ff' : '#999999'} />
            <Text style={[styles.tabText, activeTab === 'chat' && styles.tabTextActive]}>채팅</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'calendar' && styles.tabButtonActive]}
            onPress={() => setActiveTab('calendar')}
            activeOpacity={0.7}
          >
            <CalendarIcon2 width={16.186} height={16.186} color={activeTab === 'calendar' ? '#1e78ff' : '#999999'} />
            <Text style={[styles.tabText, activeTab === 'calendar' && styles.tabTextActive]}>캘린더</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'progress' && styles.tabButtonActive]}
            onPress={() => setActiveTab('progress')}
            activeOpacity={0.7}
          >
            <ChartIcon width={16.208} height={16.208} color={activeTab === 'progress' ? '#1e78ff' : '#999999'} />
            <Text style={[styles.tabText, activeTab === 'progress' && styles.tabTextActive]}>진척도</Text>
          </TouchableOpacity>
        </View>

        {/* Chat Section */}
        {activeTab === 'chat' && (
          <View style={styles.chatSection}>
            <ScrollView
              style={styles.chatScrollView}
              contentContainerStyle={styles.chatScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {chatMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.chatMessageContainer,
                    msg.isMentor ? styles.chatMessageLeft : styles.chatMessageRight,
                  ]}
                >
                  {msg.isMentor && (
                    <Text style={styles.chatSenderName}>{msg.sender}</Text>
                  )}
                  <View
                    style={[
                      styles.chatBubble,
                      msg.isMentor ? styles.chatBubbleMentor : styles.chatBubbleUser,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chatMessageText,
                        msg.isMentor ? styles.chatMessageTextMentor : styles.chatMessageTextUser,
                      ]}
                    >
                      {msg.message}
                    </Text>
                  </View>
                  <Text style={styles.chatTime}>{msg.time}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.chatInputContainer}>
              <View style={styles.chatInputWrapper}>
                <TextInput
                  style={styles.chatInput}
                  placeholder="메시지를 입력하세요"
                  placeholderTextColor="rgba(51, 51, 51, 0.5)"
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline={false}
                />
              </View>
              <TouchableOpacity
                style={styles.chatSendButton}
                onPress={handleSendMessage}
                activeOpacity={0.7}
              >
                <SendIcon2 width={20} height={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Calendar Section */}
        {activeTab === 'calendar' && (
          <View style={styles.calendarSection}>
            <Text style={styles.calendarTitle}>캘린더</Text>
            <View style={styles.viewModeContainer}>
              <TouchableOpacity
                style={[styles.viewModeButton, calendarView === 'month' && styles.viewModeButtonActive]}
                onPress={() => setCalendarView('month')}
                activeOpacity={0.7}
              >
                <Text style={[styles.viewModeText, calendarView === 'month' && styles.viewModeTextActive]}>
                  월간 보기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewModeButton, calendarView === 'list' && styles.viewModeButtonActive]}
                onPress={() => setCalendarView('list')}
                activeOpacity={0.7}
              >
                <Text style={[styles.viewModeText, calendarView === 'list' && styles.viewModeTextActive]}>
                  리스트 보기
                </Text>
              </TouchableOpacity>
            </View>

            {calendarView === 'month' && (
              <View style={styles.calendarContent}>
                {/* Month Navigation */}
                <View style={styles.monthNavigation}>
                  <TouchableOpacity
                    style={styles.monthNavButton}
                    onPress={() => navigateMonth(-1)}
                    activeOpacity={0.7}
                  >
                    <ArrowLeftIcon width={20} height={20} color="#666666" />
                  </TouchableOpacity>
                  <Text style={styles.monthText}>
                    {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
                  </Text>
                  <TouchableOpacity
                    style={styles.monthNavButton}
                    onPress={() => navigateMonth(1)}
                    activeOpacity={0.7}
                  >
                    <ArrowIcon width={20} height={20} color="#666666" />
                  </TouchableOpacity>
                </View>

                {/* Week Days Header */}
                <View style={styles.weekDaysHeader}>
                  {weekDays.map((day, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.weekDayText,
                        index === 0 && styles.weekDayTextSunday,
                        index === 6 && styles.weekDayTextSaturday,
                      ]}
                    >
                      {day}
                    </Text>
                  ))}
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarGrid}>
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <View key={`empty-${index}`} style={styles.calendarDay} />;
                    }
                    const eventDots = getEventDots(day);
                    const isSelected = day === 15;
                    return (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.calendarDay,
                          isSelected && styles.calendarDaySelected,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handleDatePress(day)}
                      >
                        <Text
                          style={[
                            styles.calendarDayText,
                            isSelected && styles.calendarDayTextSelected,
                          ]}
                        >
                          {day}
                        </Text>
                        {eventDots.length > 0 && (
                          <View style={styles.eventDotsContainer}>
                            {eventDots.map((dot, dotIndex) => (
                              <View
                                key={dotIndex}
                                style={[styles.eventDot, { backgroundColor: dot.color }]}
                              />
                            ))}
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {calendarView === 'list' && (
              <View style={styles.listViewContent}>
                <ScrollView
                  style={styles.listScrollView}
                  contentContainerStyle={styles.listScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  {listViewEvents.map((dateGroup, groupIndex) => (
                    <View key={groupIndex} style={styles.dateGroup}>
                      {/* Date Header */}
                      <View style={styles.dateGroupHeader}>
                        <Text style={styles.dateGroupTitle}>
                          {formatListDate(dateGroup.date)}
                        </Text>
                        <View style={styles.dateProgressContainer}>
                          <View style={styles.dateProgressBar}>
                            <View
                              style={[
                                styles.dateProgressBarFill,
                                { width: `${dateGroup.progress}%` },
                              ]}
                            />
                          </View>
                          <Text style={styles.dateProgressText}>{dateGroup.progress}%</Text>
                        </View>
                      </View>

                      {/* Events List */}
                      <View style={styles.eventsList}>
                        {dateGroup.events.map((event) => (
                          <TouchableOpacity
                            key={event.id}
                            style={styles.listEventCard}
                            activeOpacity={0.7}
                            onPress={() => {
                              setSelectedEvent(event);
                              setSelectedDate(dateGroup.date);
                              setIsDateModalVisible(true);
                            }}
                          >
                            <View style={styles.listEventContent}>
                              <View style={styles.listEventHeader}>
                                <View
                                  style={[
                                    styles.listEventTypeBadge,
                                    { backgroundColor: event.typeColor },
                                  ]}
                                >
                                  <Text style={styles.listEventTypeText}>{event.type}</Text>
                                </View>
                                <Text style={styles.listEventTitle}>{event.title}</Text>
                              </View>
                              {event.time && (
                                <Text style={styles.listEventTime}>{event.time}</Text>
                              )}
                              {event.submissionDate && (
                                <Text style={styles.listEventSubmissionDate}>
                                  제출: {event.submissionDate}
                                </Text>
                              )}
                              {event.description && (
                                <Text style={styles.listEventDescription}>{event.description}</Text>
                              )}
                              {event.task && (
                                <View style={styles.listEventTaskRow}>
                                  <FolderIcon3 width={12} height={12} color="#9b9baa" />
                                  <Text style={styles.listEventTaskText}>{event.task}</Text>
                                </View>
                              )}
                              {event.links && event.links.length > 0 && (
                                <View style={styles.listEventLinksRow}>
                                  {event.links.map((link, linkIndex) => (
                                    <TouchableOpacity
                                      key={linkIndex}
                                      style={[
                                        styles.listEventLinkButton,
                                        link.hasFeedback && styles.listEventLinkButtonFeedback,
                                      ]}
                                      activeOpacity={0.7}
                                    >
                                      {link.type === 'zoom' || link.type === 'github' || link.type === 'assignment' || link.type === 'note' || link.type === 'figma' ? (
                                        <LinkIcon2 width={12} height={12} color="#6a6a6a" />
                                      ) : null}
                                      {link.hasFeedback && (
                                        <CheckmarkIcon3 width={12} height={12} color="#1E78FF" />
                                      )}
                                      <Text
                                        style={[
                                          styles.listEventLinkText,
                                          link.hasFeedback && styles.listEventLinkTextFeedback,
                                        ]}
                                      >
                                        {link.label}
                                      </Text>
                                    </TouchableOpacity>
                                  ))}
                                </View>
                              )}
                            </View>
                            <View style={styles.listEventActionContainer}>
                              <View style={styles.listProgressRingContainer}>
                                <ProgressRingIcon2
                                  width={32}
                                  height={32}
                                  progress={event.progress}
                                  color="#1e78ff"
                                  variant={event.progressVariant || 'empty'}
                                />
                                {event.progressVariant === 'full' ? (
                                  <View style={styles.listProgressRingCheckmark}>
                                    <CheckmarkIcon3 width={12} height={12} color="#1E78FF" />
                                  </View>
                                ) : (
                                  <Text style={styles.listProgressRingText}>{event.progress}</Text>
                                )}
                              </View>
                              <ArrowRightIcon width={16} height={16} color="#666666" />
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {/* Progress Section */}
        {activeTab === 'progress' && (
          <View style={styles.progressSection}>
            {/* Overall Progress Card */}
            <View style={styles.overallProgressCard}>
              <Text style={styles.overallProgressTitle}>전체 진척도</Text>
              <View style={styles.progressRingContainer}>
                <ProgressRingIcon4 width={160} height={160} progress={project.progress || 50} />
                <View style={styles.progressRingTextContainer}>
                  <Text style={styles.progressRingPercent}>{project.progress || 50}%</Text>
                  <Text style={styles.progressRingLabel}>완료</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.detailReportButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('GrowthDashboard', { project })}
              >
                <ExternalLinkIcon3 width={20} height={20} color="#1e78ff" />
                <Text style={styles.detailReportButtonText}>상세 성장 리포트 보기</Text>
              </TouchableOpacity>
            </View>

            {/* Key Metrics Cards */}
            <View style={styles.keyMetricsContainer}>
              <View style={styles.keyMetricCard}>
                <View style={styles.keyMetricIconContainer}>
                  <ChartIcon2 width={24} height={24} color="#1e78ff" />
                </View>
                <Text style={styles.keyMetricValue}>87%</Text>
                <Text style={styles.keyMetricLabel}>피드백 수용률</Text>
              </View>
              <View style={styles.keyMetricCard}>
                <View style={styles.keyMetricIconContainer}>
                  <CheckmarkIcon3 width={24} height={24} color="#1e78ff" />
                </View>
                <Text style={styles.keyMetricValue}>2/4</Text>
                <Text style={styles.keyMetricLabel}>과제 완료</Text>
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.recentActivityCard}>
              <Text style={styles.recentActivityTitle}>최근 활동</Text>
              <View style={styles.recentActivityList}>
                <View style={styles.recentActivityItem}>
                  <View style={[styles.activityDot, { backgroundColor: '#fb23cb' }]} />
                  <Text style={styles.activityText}>와이어프레임 제작 완료</Text>
                </View>
                <View style={styles.recentActivityItem}>
                  <View style={[styles.activityDot, { backgroundColor: '#1e78ff' }]} />
                  <Text style={styles.activityText}>멘토 피드백 확인</Text>
                </View>
                <View style={styles.recentActivityItem}>
                  <View style={[styles.activityDot, { backgroundColor: '#ff6b6b' }]} />
                  <Text style={styles.activityText}>기획서 작성 완료</Text>
                </View>
              </View>
            </View>

            {/* Mentor Review Card */}
            <View style={styles.mentorReviewCard}>
              <Text style={styles.mentorReviewTitle}>
                {reviewSubmitted ? '리뷰 제출 완료' : '멘토 리뷰 작성하기'}
              </Text>
              <Text style={styles.mentorReviewDescription}>
                {reviewSubmitted
                  ? '멘토님께 리뷰를 남겨주셔서 감사합니다!'
                  : '프로젝트가 50% 이상 진행되었어요. 멘토님께 중간 리뷰를 남겨보세요!'}
              </Text>
              {!reviewSubmitted && (
                <TouchableOpacity
                  style={styles.mentorReviewButton}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('MentorReview', { project })}
                >
                  <ChatIcon3 width={20} height={20} color="#FFFFFF" />
                  <Text style={styles.mentorReviewButtonText}>리뷰 작성하기</Text>
                </TouchableOpacity>
              )}
              {reviewSubmitted && (
                <View style={styles.mentorReviewButtonCompleted}>
                  <CheckmarkIcon3 width={20} height={20} color="#1E78FF" />
                  <Text style={styles.mentorReviewButtonTextCompleted}>리뷰 제출 완료</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Date Detail Modal */}
      <Modal
        visible={isDateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsDateModalVisible(false);
          setSelectedEvent(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => {
              setIsDateModalVisible(false);
              setSelectedEvent(null);
            }}
          />
          <View style={styles.dateModal}>
            {/* Drag Handle */}
            <View style={styles.modalDragHandle} />
            
            {/* Modal Header */}
            <View style={styles.eventModalHeader}>
              <View style={styles.eventModalHeaderLeft}>
                <Text style={styles.eventModalDate}>
                  {selectedDate
                    ? formatListDate(selectedDate)
                    : '날짜'}
                </Text>
                <Text style={styles.eventModalCount}>
                  총 {selectedEvent ? 1 : getEventsForDate(selectedDate).length}개의 일정이 있습니다
                </Text>
              </View>
              <TouchableOpacity
                style={styles.eventModalCloseButton}
                onPress={() => {
                  setIsDateModalVisible(false);
                  setSelectedEvent(null);
                }}
                activeOpacity={0.7}
              >
                <CloseIcon width={20} height={20} color="#6a6a6a" />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView
              style={styles.eventModalContent}
              contentContainerStyle={styles.eventModalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              {selectedEvent ? (
                <>
                  {/* Event Card */}
                  <View style={styles.eventModalCard}>
                    <View style={styles.eventModalCardContent}>
                      <Text style={styles.eventModalCardTitle}>{selectedEvent.title}</Text>
                      <View style={styles.eventModalCardBadgeRow}>
                        <View
                          style={[
                            styles.eventModalCardBadge,
                            { backgroundColor: selectedEvent.typeColor },
                          ]}
                        >
                          <Text style={styles.eventModalCardBadgeText}>{selectedEvent.type}</Text>
                        </View>
                        {selectedEvent.deadline && (
                          <Text style={styles.eventModalCardDeadline}>
                            마감: {selectedEvent.deadline}
                          </Text>
                        )}
                      </View>
                      {selectedEvent.links && selectedEvent.links.length > 0 && (
                        <View style={styles.eventModalCardLinks}>
                          {selectedEvent.links.map((link, linkIndex) => (
                            <TouchableOpacity
                              key={linkIndex}
                              style={styles.eventModalCardLinkButton}
                              activeOpacity={0.7}
                            >
                              <LinkIcon2 width={12} height={12} color="#6a6a6a" />
                              <Text style={styles.eventModalCardLinkText}>{link.label}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                    <View style={styles.eventModalCardProgress}>
                      <ProgressRingIcon3
                        width={64}
                        height={64}
                        progress={selectedEvent.progress || 0}
                        color="#ffb4c8"
                      />
                      <View style={styles.eventModalCardProgressText}>
                        <Text style={styles.eventModalCardProgressNumber}>
                          {selectedEvent.progress || 0}
                        </Text>
                        <Text style={styles.eventModalCardProgressPercent}>%</Text>
                      </View>
                    </View>
                  </View>

                  {/* Upload Restriction Message */}
                  <View style={styles.eventModalUploadRestriction}>
                    <UploadIcon width={16} height={16} color="#9b9baa" />
                    <Text style={styles.eventModalUploadRestrictionText}>
                      모바일에서는 업로드 불가
                    </Text>
                  </View>

                  {/* PC Submission Card */}
                  <View style={styles.eventModalPCCard}>
                    <View style={styles.eventModalPCIconContainer}>
                      <Text style={styles.eventModalPCIcon}>💻</Text>
                    </View>
                    <View style={styles.eventModalPCContent}>
                      <Text style={styles.eventModalPCTitle}>PC에서 과제 제출하기</Text>
                      <Text style={styles.eventModalPCDescription}>
                        과제 파일 업로드는 PC 웹사이트에서만 가능합니다. 모바일에서는 제출 현황을 확인할 수 있어요.
                      </Text>
                      <TouchableOpacity
                        style={styles.eventModalPCButton}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.eventModalPCButtonText}>PC 웹사이트 열기</Text>
                        <ExternalLinkIcon2 width={16} height={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.emptyStateContainer}>
                  <EmptyCalendarIcon width={64} height={64} />
                  <Text style={styles.emptyStateText}>일정이 없습니다</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
          onPress={() => navigation.navigate('MyProject')}
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
    borderBottomWidth: 0.697,
    borderBottomColor: '#cbcbcb',
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
    height: 40,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 28,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 16,
  },
  projectCard: {
    backgroundColor: '#1e78ff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 0,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  projectCardContent: {
    gap: 8,
    zIndex: 11,
  },
  projectCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 25.2,
    zIndex: 12,
  },
  projectCardMentor: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 21,
    zIndex: 12,
  },
  progressSectionCard: {
    gap: 8,
    marginTop: 4,
    zIndex: 11,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 21,
    zIndex: 13,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 21,
    zIndex: 13,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 9999,
    overflow: 'hidden',
    zIndex: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 9999,
    zIndex: 13,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 21,
    zIndex: 13,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8f1ff',
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 0,
    marginBottom: 0,
    padding: 3.377,
    gap: 3.377,
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6.746,
    paddingVertical: 27.013,
    paddingHorizontal: 13.507,
    borderRadius: 8.442,
    backgroundColor: '#e8f1ff',
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2.1,
    elevation: 3,
  },
  tabButtonInactive: {
    backgroundColor: '#e8f1ff',
  },
  tabText: {
    fontSize: 14.182,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21.273,
  },
  tabTextActive: {
    color: '#1e78ff',
  },
  tabTextInactive: {
    color: '#999999',
  },
  calendarSection: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#e2e2e8',
    paddingTop: 15.395,
    paddingBottom: 0.697,
    paddingHorizontal: 16,
    zIndex: 0,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 25.2,
    letterSpacing: -0.36,
    marginBottom: 23.397,
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9fb',
    borderRadius: 8,
    padding: 4,
    gap: 4,
    marginBottom: 24,
  },
  viewModeButton: {
    flex: 1,
    height: 36.984,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  viewModeButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  viewModeTextActive: {
    fontWeight: '600',
    color: '#2e2e2e',
  },
  calendarContent: {
    backgroundColor: '#f5f9ff',
    padding: 24,
    paddingBottom: 0,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    height: 64,
  },
  monthNavButton: {
    width: 32,
    height: 32,
    backgroundColor: '#f9f9fb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 17,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9b9baa',
    lineHeight: 16.8,
    textAlign: 'center',
    flex: 1,
  },
  weekDayTextSunday: {
    color: '#ff5c5c',
  },
  weekDayTextSaturday: {
    color: '#1e78ff',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8.688,
    paddingHorizontal: 0.697,
    borderRadius: 8,
  },
  calendarDaySelected: {
    borderWidth: 0.697,
    borderColor: '#1e78ff',
  },
  calendarDayText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#2e2e2e',
    lineHeight: 16.8,
  },
  calendarDayTextSelected: {
    fontWeight: '700',
    color: '#1e78ff',
  },
  eventDotsContainer: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 6,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dateModal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 531,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
    overflow: 'hidden',
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e2e2e8',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  eventModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 16.697,
    borderBottomWidth: 0.697,
    borderBottomColor: '#e2e2e8',
  },
  eventModalHeaderLeft: {
    flex: 1,
    gap: 4,
  },
  eventModalDate: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  eventModalCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  eventModalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9fb',
    borderRadius: 8,
  },
  eventModalContent: {
    flex: 1,
  },
  eventModalContentContainer: {
    padding: 16,
    gap: 16,
  },
  eventModalCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 12,
    padding: 16.691,
    flexDirection: 'row',
    gap: 12,
    minHeight: 156,
  },
  eventModalCardContent: {
    flex: 1,
    gap: 8,
  },
  eventModalCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  eventModalCardBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  eventModalCardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    height: 24.78,
    justifyContent: 'center',
  },
  eventModalCardBadgeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 16.8,
  },
  eventModalCardDeadline: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  eventModalCardLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  eventModalCardLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f9f9fb',
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 0,
    borderRadius: 4,
    height: 24.78,
  },
  eventModalCardLinkText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 16.8,
  },
  eventModalCardProgress: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  eventModalCardProgressText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventModalCardProgressNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffb4c8',
    lineHeight: 21.6,
    textAlign: 'center',
  },
  eventModalCardProgressPercent: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 12,
  },
  eventModalUploadRestriction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f5f9ff',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 16,
  },
  eventModalUploadRestrictionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9b9baa',
    lineHeight: 24,
  },
  eventModalPCCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.3)',
    borderRadius: 16,
    padding: 24.693,
    flexDirection: 'row',
    gap: 16,
  },
  eventModalPCIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16.4,
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventModalPCIcon: {
    fontSize: 24,
    lineHeight: 32,
  },
  eventModalPCContent: {
    flex: 1,
    gap: 8,
  },
  eventModalPCTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  eventModalPCDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  eventModalPCButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1e78ff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 0,
    borderRadius: 10,
    height: 40,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  eventModalPCButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  eventsScrollView: {
    flex: 1,
  },
  eventsScrollContent: {
    gap: 12,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e2e8',
    borderRadius: 12,
    paddingTop: 12.695,
    paddingBottom: 0.697,
    paddingHorizontal: 16.691,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 96,
  },
  eventCardContent: {
    flex: 1,
    gap: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.1,
    marginBottom: 0,
  },
  eventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    height: 24.78,
    justifyContent: 'center',
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 16.8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  eventDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9b9baa',
    lineHeight: 16.8,
  },
  eventActionContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    paddingTop: 36,
  },
  progressRingContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressRingText: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 15,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  listViewContent: {
    backgroundColor: '#f5f9ff',
    flex: 1,
  },
  listScrollView: {
    flex: 1,
  },
  listScrollContent: {
    padding: 24,
    gap: 24,
  },
  dateGroup: {
    gap: 12,
  },
  dateGroupHeader: {
    gap: 8,
    paddingTop: 12,
  },
  dateGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
    letterSpacing: -0.16,
  },
  dateProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#f5f9ff',
    borderRadius: 2,
    overflow: 'hidden',
  },
  dateProgressBarFill: {
    height: '100%',
    backgroundColor: '#fb23cb',
    borderRadius: 2,
  },
  dateProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fb23cb',
    lineHeight: 16.8,
    width: 40,
    textAlign: 'right',
  },
  eventsList: {
    gap: 12,
  },
  listEventCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#f5f9ff',
    borderRadius: 12,
    paddingTop: 12.695,
    paddingBottom: 0.697,
    paddingHorizontal: 16.691,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 96,
  },
  listEventContent: {
    flex: 1,
    gap: 4,
  },
  listEventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.1,
    marginBottom: 0,
  },
  listEventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    height: 24.78,
    justifyContent: 'center',
  },
  listEventTypeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 16.8,
  },
  listEventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
    flex: 1,
  },
  listEventTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  listEventSubmissionDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  listEventDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9b9baa',
    lineHeight: 16.8,
  },
  listEventTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listEventTaskText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9b9baa',
    lineHeight: 16.8,
  },
  listEventLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  listEventLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f9ff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 0,
    borderRadius: 4,
    height: 24.78,
  },
  listEventLinkButtonFeedback: {
    backgroundColor: '#ffe7fa',
  },
  listEventLinkText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6a6a6a',
    lineHeight: 16.8,
  },
  listEventLinkTextFeedback: {
    color: '#2e2e2e',
  },
  listEventActionContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    paddingTop: 36,
  },
  listProgressRingContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  listProgressRingCheckmark: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listProgressRingText: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 15,
  },
  chatSection: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    zIndex: 0,
  },
  chatScrollView: {
    flex: 1,
  },
  chatScrollContent: {
    padding: 24,
    paddingTop: 16,
    gap: 4,
  },
  chatMessageContainer: {
    marginBottom: 4,
    maxWidth: '75%',
  },
  chatMessageLeft: {
    alignSelf: 'flex-start',
  },
  chatMessageRight: {
    alignSelf: 'flex-end',
  },
  chatSenderName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
    marginBottom: 4,
  },
  chatBubble: {
    paddingTop: 12.695,
    paddingBottom: 0.697,
    paddingHorizontal: 12.695,
    borderRadius: 16,
    borderWidth: 0.697,
    borderColor: '#f5f9ff',
  },
  chatBubbleMentor: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 3.6,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chatBubbleUser: {
    backgroundColor: '#1e78ff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 3.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chatMessageText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6,
  },
  chatMessageTextMentor: {
    color: '#333333',
  },
  chatMessageTextUser: {
    color: '#ffffff',
  },
  chatTime: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
    marginTop: 4,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16.69,
    paddingBottom: 0,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#f5f9ff',
  },
  chatInputWrapper: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    borderWidth: 0.697,
    borderColor: '#f5f9ff',
    borderRadius: 16.4,
    minHeight: 49.374,
    justifyContent: 'center',
  },
  chatInput: {
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 49.374,
  },
  chatSendButton: {
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    width: 49.374,
    height: 49.374,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    padding: 24,
    paddingTop: 24,
    gap: 16,
    zIndex: 0,
  },
  overallProgressCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e3e6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  overallProgressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 25.2,
  },
  progressRingContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingPercent: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e78ff',
    lineHeight: 32.4,
    letterSpacing: -0.24,
  },
  progressRingLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
    marginTop: 4,
  },
  detailReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 0.697,
    borderColor: '#1e78ff',
    borderRadius: 16.4,
    paddingHorizontal: 24.697,
    paddingVertical: 0.697,
    height: 49,
    justifyContent: 'center',
    width: '100%',
  },
  detailReportButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 24,
  },
  keyMetricsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  keyMetricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e3e6',
    borderRadius: 16,
    height: 145.358,
    alignItems: 'center',
    paddingTop: 16.69,
    gap: 8,
  },
  keyMetricIconContainer: {
    width: 47.992,
    height: 47.992,
    borderRadius: 16.4,
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyMetricValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  keyMetricLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    lineHeight: 21,
  },
  recentActivityCard: {
    backgroundColor: '#ffffff',
    borderWidth: 0.697,
    borderColor: '#e2e3e6',
    borderRadius: 16,
    padding: 20.686,
    paddingTop: 20.686,
    paddingBottom: 0.697,
    gap: 16,
  },
  recentActivityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 25.2,
  },
  recentActivityList: {
    gap: 12,
  },
  recentActivityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 7.991,
    height: 7.991,
    borderRadius: 3.996,
  },
  activityText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 25.6,
  },
  mentorReviewCard: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    borderWidth: 0.697,
    borderColor: 'rgba(30, 120, 255, 0.1)',
    borderRadius: 16,
    padding: 24.69,
    gap: 12,
    height: 196.594,
  },
  mentorReviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
  },
  mentorReviewDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  mentorReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1e78ff',
    borderRadius: 16.4,
    height: 48.003,
    justifyContent: 'center',
    marginTop: 8,
  },
  mentorReviewButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
    lineHeight: 24,
  },
  mentorReviewButtonCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16.4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1e78ff',
    justifyContent: 'center',
    minHeight: 49.374,
  },
  mentorReviewButtonTextCompleted: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 24,
  },
});

