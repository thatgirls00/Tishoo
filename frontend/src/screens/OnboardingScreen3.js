import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ArrowIcon from '../components/ArrowIcon';
import NotificationIcon2 from '../components/NotificationIcon2';
import BellIcon from '../components/BellIcon';
import ChatIcon from '../components/ChatIcon';
import SendIcon from '../components/SendIcon';
import FolderIcon from '../components/FolderIcon';
import ExternalLinkIcon from '../components/ExternalLinkIcon';
import DotsIcon from '../components/DotsIcon';
import CheckmarkIcon from '../components/CheckmarkIcon';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

export default function OnboardingScreen3({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Section with Blue Background */}
        <View style={styles.imageSection}>
          <LinearGradient
            colors={['#1a3eec', '#1e78ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            {/* Rotated Phone Mockup (left side) */}
            <View style={styles.phoneMockupContainer}>
              <View style={styles.phoneMockup}>
                {/* Phone Screen Content - Similar to Screen 2 but with blue theme */}
                <View style={styles.phoneScreen}>
                  {/* Header */}
                  <View style={styles.phoneHeader}>
                    <View style={styles.headerTop}>
                      <Text style={[styles.logoText, { color: '#1e78ff' }]}>TISHOO</Text>
                      <View style={styles.notificationContainer}>
                        <BellIcon width={24} height={24} color="#999999" />
                        <View style={styles.notificationBadge} />
                      </View>
                    </View>
                    <View style={styles.headerBottom}>
                      <TouchableOpacity style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                      </TouchableOpacity>
                      <Text style={styles.headerTitle}>내 프로젝트</Text>
                      <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuIcon}>⋮</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Project Card */}
                  <View style={styles.projectCard}>
                    <Text style={styles.projectTitle}>
                      React로 만드는 실시간 채팅 앱
                    </Text>
                    <Text style={styles.mentorName}>김민준 멘토</Text>
                    
                    {/* Progress Section */}
                    <View style={styles.progressSection}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>진행률</Text>
                        <Text style={styles.progressValue}>50%</Text>
                      </View>
                      <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarFill} />
                      </View>
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>시작일: 2025-11-08</Text>
                        <Text style={styles.dateText}>종료일: 2025-12-20</Text>
                      </View>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.actionButton, styles.actionButtonActive]}>
                      <CheckmarkIcon width={13.492} height={13.492} color="#1e78ff" />
                      <Text style={[styles.actionText, { color: '#1e78ff' }]}>채팅</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <DotsIcon width={13.498} height={13.498} color="#999999" />
                      <Text style={styles.actionText}>캘린더</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <DotsIcon width={13.498} height={13.498} color="#999999" />
                      <Text style={styles.actionText}>체크리스트</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <DotsIcon width={13.498} height={13.498} color="#999999" />
                      <Text style={styles.actionText}>진척도</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Chat Messages Preview */}
                  <View style={styles.chatPreview}>
                    <View style={styles.messageContainer}>
                      <Text style={styles.messageSender}>김민준 멘토</Text>
                      <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>
                          안녕하세요! 첫 주차 과제를 확인해주세요
                        </Text>
                      </View>
                      <Text style={styles.messageTime}>14:23</Text>
                    </View>
                    <View style={[styles.messageContainer, styles.messageContainerRight]}>
                      <View style={[styles.messageBubble, { backgroundColor: '#1e78ff' }]}>
                        <Text style={[styles.messageText, styles.messageTextRight]}>
                          확인했습니다! 궁금한 점이 있어서 질문 드립니다
                        </Text>
                      </View>
                      <Text style={[styles.messageTime, styles.messageTimeRight]}>14:25</Text>
                    </View>
                    <View style={styles.messageContainer}>
                      <Text style={styles.messageSender}>김민준 멘토</Text>
                      <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>네 말씀해주세요</Text>
                      </View>
                      <Text style={styles.messageTime}>14:26</Text>
                    </View>
                  </View>

                  {/* Chat Input */}
                  <View style={styles.chatInputContainer}>
                    <View style={styles.chatInput}>
                      <Text style={styles.chatInputPlaceholder}>메시지를 입력하세요</Text>
                    </View>
                    <TouchableOpacity style={[styles.sendButton, { backgroundColor: '#1e78ff' }]}>
                      <SendIcon width={19.989} height={19.989} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Rotated Calendar Event Cards */}
            <View style={styles.calendarCardsContainer}>
              <View style={styles.calendarCards}>
                {/* Mentoring Session Card */}
                <View style={styles.eventCard}>
                  <View style={styles.eventCardContent}>
                    <View style={styles.eventHeader}>
                      <View style={[styles.eventBadge, { backgroundColor: '#1e78ff' }]}>
                        <Text style={styles.eventBadgeText}>멘토링 세션</Text>
                      </View>
                      <Text style={styles.eventTitle}>멘토링 세션 3주차</Text>
                    </View>
                    <Text style={styles.eventTime}>20:00–22:00</Text>
                    <Text style={styles.eventDescription}>
                      UI 컴포넌트 설계 리뷰 및 상태 관리 패턴
                    </Text>
                    <View style={styles.eventLinkRow}>
                      <View style={styles.eventLinkItem}>
                        <ExternalLinkIcon width={11.998} height={11.998} color="#9B9BAA" />
                        <Text style={styles.eventLinkText}>[3주차] UI 시나리오 작성</Text>
                      </View>
                    </View>
                    <View style={styles.eventLinks}>
                      <TouchableOpacity style={styles.eventLinkButton}>
                        <FolderIcon width={11.998} height={11.998} color="#6a6a6a" />
                        <Text style={styles.eventLinkButtonText}>Zoom 링크</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.eventLinkButton}>
                        <FolderIcon width={11.998} height={11.998} color="#6a6a6a" />
                        <Text style={styles.eventLinkButtonText}>세션 노트</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.eventProgressContainer}>
                    <View style={styles.eventProgressRing} />
                    <View style={styles.checkmarkContainer}>
                      <CheckmarkIcon width={15.994} height={15.994} color="#000000" />
                    </View>
                  </View>
                </View>

                {/* Assignment Deadline Card */}
                <View style={[styles.eventCard, styles.eventCardSmall]}>
                  <View style={styles.eventCardContent}>
                    <View style={styles.eventHeader}>
                      <View style={[styles.eventBadge, { backgroundColor: '#ffb84d' }]}>
                        <Text style={styles.eventBadgeText}>과제 마감</Text>
                      </View>
                      <Text style={styles.eventTitle}>과제: 로그인 페이지 구현</Text>
                    </View>
                    <Text style={styles.eventTime}>23:59</Text>
                    <View style={styles.eventLinkRow}>
                      <View style={styles.eventLinkItem}>
                        <ExternalLinkIcon width={11.998} height={11.998} color="#9B9BAA" />
                        <Text style={styles.eventLinkText}>[3주차] 로그인 페이지 완성</Text>
                      </View>
                    </View>
                    <View style={styles.eventLinks}>
                      <TouchableOpacity style={styles.eventLinkButton}>
                        <FolderIcon width={11.998} height={11.998} color="#6a6a6a" />
                        <Text style={styles.eventLinkButtonText}>과제 설명</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.eventLinkButton}>
                        <FolderIcon width={11.998} height={11.998} color="#6a6a6a" />
                        <Text style={styles.eventLinkButtonText}>GitHub</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.eventProgressContainer}>
                    <View style={styles.eventProgressRing} />
                    <View style={styles.progressTextContainer}>
                      <Text style={styles.eventProgressText}>60</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              내 성장을 끝까지 챙겨주는 멘토
            </Text>
          </View>

          {/* Paragraph */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              커리큘럼·일정·작업물 관리까지,
            </Text>
            <Text style={styles.paragraph}>
              멘토가 이끄는 프로젝트 시스템을 제공합니다.
            </Text>
          </View>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={() => {
                // Navigate to next screen
                if (navigation) {
                  navigation.navigate('Onboarding4');
                }
              }}
            >
              <Text style={styles.nextButtonText}>다음</Text>
              <ArrowIcon width={20} height={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  imageSection: {
    width: '100%',
    height: (420 / SCREEN_HEIGHT) * height,
    minHeight: 420,
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneMockupContainer: {
    position: 'absolute',
    left: -400,
    top: 80,
    width: 596.144,
    height: 980.103,
    transform: [{ rotate: '15deg' }],
  },
  phoneMockup: {
    width: 372,
    height: 915,
    backgroundColor: '#f5f9ff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    padding: 24,
    paddingBottom: 0,
  },
  phoneHeader: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: '#333',
  },
  projectCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#1e78ff', // 파란색 배경 명시적으로 설정
    overflow: 'hidden', // 내부 요소가 카드 밖으로 나가지 않도록
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  mentorName: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 12,
  },
  progressSection: {
    gap: 8,
    backgroundColor: 'transparent', // 흰색 배경 제거, 투명하게 설정
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent', // 배경 투명하게
  },
  progressLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  progressValue: {
    fontSize: 14,
    color: '#ffffff',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // 배경 투명하게
  },
  dateText: {
    fontSize: 14,
    color: '#ffffff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 3.377,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f5f9ff',
    borderRadius: 8.442,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#f5f9ff',
    borderRadius: 8.442,
    paddingVertical: 27.013,
    paddingHorizontal: 13.507,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3.377,
    width: 78.491,
    height: 78.491,
  },
  actionButtonActive: {
    backgroundColor: '#ffffff',
    borderRadius: 8.436,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.844 },
    shadowOpacity: 0.1,
    shadowRadius: 2.531,
    elevation: 2,
    paddingVertical: 26.994,
    paddingHorizontal: 13.497,
    gap: 6.741,
    width: 78.434,
    height: 78.434,
  },
  actionIcon: {
    fontSize: 16,
    width: 13.492,
    height: 13.492,
  },
  actionText: {
    fontSize: 11.818,
    color: '#999999',
    lineHeight: 17.728,
  },
  chatPreview: {
    flex: 1,
    gap: 4,
    marginBottom: 16,
  },
  messageContainer: {
    gap: 4,
    maxWidth: '70%',
  },
  messageContainerRight: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageSender: {
    fontSize: 14,
    color: '#999999',
  },
  messageBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    borderWidth: 0.7,
    borderColor: '#f5f9ff',
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
  },
  messageTextRight: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 14,
    color: '#999999',
  },
  messageTimeRight: {
    textAlign: 'right',
  },
  chatInputContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 0.7,
    borderTopColor: '#f5f9ff',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 49,
  },
  chatInputPlaceholder: {
    fontSize: 16,
    color: 'rgba(51, 51, 51, 0.5)',
  },
  sendButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  calendarCardsContainer: {
    position: 'absolute',
    left: 150,
    top: 50,
    width: 405.696,
    height: 376.079,
    transform: [{ rotate: '345deg' }],
  },
  calendarCards: {
    gap: 11.998,
    width: 340.1,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 0.697,
    borderColor: '#f5f9ff',
    paddingTop: 12.695,
    paddingBottom: 0.697,
    paddingHorizontal: 16.691,
    flexDirection: 'row',
    width: 340.1,
    height: 153.501,
  },
  eventCardSmall: {
    height: 132.717,
  },
  eventCardContent: {
    flex: 1,
    gap: 0,
    minHeight: 128.112,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 24.78,
    marginBottom: 4,
  },
  eventBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  eventBadgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '400',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    marginLeft: 8,
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    marginTop: 4,
  },
  eventDescription: {
    fontSize: 12,
    color: '#9b9baa',
    marginTop: 4,
  },
  eventLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.996,
    marginTop: 4,
    height: 16.788,
  },
  eventLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.996,
  },
  eventLinkIcon: {
    fontSize: 12,
  },
  eventLinkText: {
    fontSize: 12,
    color: '#9b9baa',
    lineHeight: 16.8,
  },
  eventLinks: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  eventLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.996,
    backgroundColor: '#f5f9ff',
    paddingLeft: 7.991,
    paddingRight: 0,
    paddingVertical: 0,
    height: 24.78,
    borderRadius: 4,
  },
  eventLinkButtonIcon: {
    fontSize: 12,
  },
  eventLinkButtonText: {
    fontSize: 12,
    color: '#6a6a6a',
    lineHeight: 16.8,
    marginLeft: 0,
  },
  eventProgressContainer: {
    width: 31.998,
    height: 51.987,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11.998,
    position: 'relative',
  },
  eventProgressRing: {
    width: 31.998,
    height: 31.998,
    borderRadius: 16,
    borderWidth: 0.697,
    borderColor: '#1e78ff',
    backgroundColor: '#f5f9ff',
    position: 'absolute',
    top: 0,
  },
  checkmarkContainer: {
    position: 'absolute',
    left: 8,
    top: 35.99,
  },
  progressTextContainer: {
    position: 'absolute',
    left: 9.64,
    top: 8.5,
    width: 12.716,
    height: 14.992,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventProgressIcon: {
    fontSize: 12,
    color: '#1e78ff',
  },
  eventProgressText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 15,
  },
  contentSection: {
    width: '100%',
    paddingHorizontal: (22.5 / SCREEN_WIDTH) * width,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  headingContainer: {
    width: '100%',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e2e2e',
    textAlign: 'center',
    lineHeight: 31.2,
    letterSpacing: -0.48,
  },
  paragraphContainer: {
    width: '100%',
    marginBottom: 60,
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
    textAlign: 'center',
    lineHeight: 25.6,
    marginBottom: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 60,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e2e8',
  },
  progressDotActive: {
    width: 32,
    backgroundColor: '#000000',
  },
  buttonSection: {
    width: '100%',
    height: 104,
    paddingTop: 24.693,
    paddingHorizontal: 24,
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#000000',
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
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 24,
  },
});

