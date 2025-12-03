import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ArrowIcon from '../components/ArrowIcon';
import NotificationIcon2 from '../components/NotificationIcon2';
import ChatIcon from '../components/ChatIcon';
import SendIcon from '../components/SendIcon';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

export default function OnboardingScreen2({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Section with Pink Background */}
        <View style={styles.imageSection}>
          <LinearGradient
            colors={['#d662bc', '#fb23cb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            {/* Rotated Phone Mockup */}
            <View style={styles.phoneMockupContainer}>
              <View style={styles.phoneMockup}>
                {/* Phone Screen Content */}
                <View style={styles.phoneScreen}>
                  {/* Header */}
                  <View style={styles.phoneHeader}>
                    <View style={styles.headerTop}>
                      <Text style={styles.logoText}>TISHOO</Text>
                      <View style={styles.notificationContainer}>
                        <NotificationIcon2 width={24} height={24} color="#999999" />
                        <View style={styles.notificationBadge} />
                      </View>
                    </View>
                    <View style={styles.headerBottom}>
                      <TouchableOpacity style={styles.backButton}>
                        {/* Back arrow icon */}
                        <Text style={styles.backIcon}>←</Text>
                      </TouchableOpacity>
                      <Text style={styles.headerTitle}>내 프로젝트</Text>
                      <TouchableOpacity style={styles.menuButton}>
                        {/* Menu icon */}
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
                      <ChatIcon width={13.492} height={13.492} color="#fb23cb" />
                      <Text style={[styles.actionText, styles.actionTextActive]}>채팅</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionIcon}>📅</Text>
                      <Text style={styles.actionText}>캘린더</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionIcon}>✓</Text>
                      <Text style={styles.actionText}>체크리스트</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionIcon}>📊</Text>
                      <Text style={styles.actionText}>진척도</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Chat Messages Preview */}
                  <View style={styles.chatPreview}>
                    <View style={styles.messageContainer1}>
                      <Text style={styles.messageSender}>김민준 멘토</Text>
                      <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>
                          안녕하세요! 첫 주차 과제를 확인해주세요
                        </Text>
                      </View>
                      <Text style={styles.messageTime}>14:23</Text>
                    </View>
                    <View style={styles.messageContainer2}>
                      <View style={[styles.messageBubble, styles.messageBubbleRight]}>
                        <Text style={[styles.messageText, styles.messageTextRight]}>
                          확인했습니다! 궁금한 점이 있어서 질문 드립니다
                        </Text>
                      </View>
                      <Text style={[styles.messageTime, styles.messageTimeRight]}>14:25</Text>
                    </View>
                    <View style={styles.messageContainer3}>
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
                    <TouchableOpacity style={styles.sendButton}>
                      <SendIcon width={19.989} height={19.989} color="#FFFFFF" />
                    </TouchableOpacity>
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
              내 경험이 프로젝트를 이끌어요!
            </Text>
          </View>

          {/* Paragraph */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              예비 디자이너·개발자·마케터들이
            </Text>
            <Text style={styles.paragraph}>
              실제로 성장하는 과정을 함께하세요.
            </Text>
          </View>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={() => {
                // Navigate to next screen
                if (navigation) {
                  navigation.navigate('Onboarding3');
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
    left: 50,
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
    color: '#fb23cb',
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
    backgroundColor: '#fb23cb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
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
    marginTop: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionTextActive: {
    color: '#fb23cb',
    fontSize: 11.81,
    lineHeight: 17.715,
  },
  chatPreview: {
    flex: 1,
    position: 'relative',
    marginBottom: 82.058,
    minHeight: 400,
  },
  messageContainer1: {
    position: 'absolute',
    left: 24,
    top: 15.99,
    width: 243.072,
    gap: 4,
  },
  messageContainer2: {
    position: 'absolute',
    left: 105.02,
    top: 158.59,
    width: 243.072,
    gap: 4,
    alignItems: 'flex-end',
  },
  messageContainer3: {
    position: 'absolute',
    left: 24,
    top: 274.79,
    width: 126.239,
    gap: 4,
  },
  messageSender: {
    fontSize: 14,
    color: '#999999',
  },
  messageBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderBottomLeftRadius: 3.6,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12.695,
    paddingBottom: 0.697,
    paddingHorizontal: 12.695,
    borderWidth: 0.697,
    borderColor: '#f5f9ff',
  },
  messageBubbleRight: {
    backgroundColor: '#fb23cb',
    borderBottomRightRadius: 3.6,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 25.6,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 7.991,
    paddingTop: 16.69,
    paddingHorizontal: 24,
    paddingBottom: 0,
    borderTopWidth: 0.697,
    borderTopColor: '#f5f9ff',
    backgroundColor: '#ffffff',
    height: 82.058,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    borderRadius: 16.4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 49.374,
    borderWidth: 0.697,
    borderColor: '#f5f9ff',
  },
  chatInputPlaceholder: {
    fontSize: 16,
    color: 'rgba(51, 51, 51, 0.5)',
  },
  sendButton: {
    width: 49.374,
    height: 49.374,
    backgroundColor: '#fb23cb',
    borderRadius: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 19.989,
    height: 19.989,
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

