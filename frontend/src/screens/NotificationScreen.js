import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import CloseIcon from '../components/CloseIcon';
import BarChartIcon from '../components/BarChartIcon';
import CalendarEmptyIcon from '../components/CalendarEmptyIcon';
import AlarmIcon from '../components/AlarmIcon';
import ArrowIcon from '../components/ArrowIcon';
import ChatIcon2 from '../components/ChatIcon2';

const { width } = Dimensions.get('window');

const notifications = [
  {
    id: 1,
    type: 'growth',
    title: '프로젝트 성장이 20% 증가했어요!',
    message: '축하해요! 🎉 멘토님의 긍정적인 피드백을 받았어요',
    time: '방금 전',
    unread: true,
    iconColor: '#1e78ff',
  },
  {
    id: 2,
    type: 'feedback',
    title: '멘토가 피드백을 남겼어요!',
    message: 'React 프로젝트 2주차 과제에 새로운 피드백이 도착했습니다',
    time: '1시간 전',
    unread: true,
    iconColor: '#fb23cb',
  },
  {
    id: 3,
    type: 'schedule',
    title: '프로젝트 일정이 곧 시작됩니다',
    message: '오늘 오후 2시 Zoom 멘토링 세션이 예정되어 있어요',
    time: '2시간 전',
    unread: true,
    iconColor: '#1e78ff',
  },
  {
    id: 4,
    type: 'deadline',
    title: '과제 마감 2시간 전',
    message: 'UI 디자인 프로젝트 3주차 과제를 제출해주세요',
    time: '3시간 전',
    unread: true,
    iconColor: '#1e78ff',
  },
  {
    id: 5,
    type: 'material',
    title: '멘토가 자료를 업데이트했어요',
    message: '새로운 학습 자료와 참고 링크가 추가되었습니다',
    time: '1일 전',
    unread: false,
    iconColor: '#fb23cb',
  },
];

export default function NotificationScreen({ onClose }) {
  const [unreadCount, setUnreadCount] = useState(3);

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  const getNotificationIcon = (type, iconColor) => {
    switch (type) {
      case 'growth':
        return <BarChartIcon width={24} height={24} color={iconColor} />;
      case 'schedule':
        return <CalendarEmptyIcon width={24} height={24} color={iconColor} />;
      case 'deadline':
        return <AlarmIcon width={24} height={24} color={iconColor} />;
      case 'feedback':
      case 'material':
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>알림</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <CloseIcon width={24} height={24} color="#9B9BAA" />
          </TouchableOpacity>
        </View>
        <Text style={styles.unreadCountText}>
          읽지 않은 알림 {unreadCount}개
        </Text>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              notification.unread
                ? styles.notificationCardUnread
                : styles.notificationCardRead,
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.notificationContent}>
              {notification.type === 'feedback' ? (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: notification.iconColor },
                  ]}
                >
                  <ChatIcon2 width={24} height={24} color="white" />
                </View>
              ) : notification.type === 'material' ? (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: 'rgba(251, 35, 203, 0.1)' },
                  ]}
                >
                  <Text style={styles.materialIconText}>📚</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: notification.iconColor },
                  ]}
                >
                  {getNotificationIcon(notification.type, 'white')}
                </View>
              )}
              <View style={styles.notificationTextContainer}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle} numberOfLines={1}>
                    {notification.title}
                  </Text>
                  {notification.unread && (
                    <View style={styles.unreadDot} />
                  )}
                </View>
                <Text style={styles.notificationMessage} numberOfLines={2}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
              <ArrowIcon width={20} height={20} color="#9B9BAA" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.markAllReadButton}
          onPress={handleMarkAllRead}
          activeOpacity={0.7}
        >
          <Text style={styles.markAllReadText}>모두 읽음으로 표시</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 25,
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.697,
    borderBottomColor: '#e2e2e8',
    padding: 24,
    paddingBottom: 13,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  unreadCountText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 8,
  },
  notificationCard: {
    borderRadius: 16.4,
    padding: 16.69,
    marginBottom: 8,
    borderWidth: 0.697,
  },
  notificationCardUnread: {
    backgroundColor: 'rgba(30, 120, 255, 0.05)',
    borderColor: 'rgba(30, 120, 255, 0.3)',
  },
  notificationCardRead: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e2e8',
  },
  notificationContent: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chatIconText: {
    fontSize: 20,
  },
  materialIconText: {
    fontSize: 20,
  },
  notificationTextContainer: {
    flex: 1,
    gap: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 24,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e78ff',
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 25.6,
  },
  notificationTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
    padding: 16,
    paddingTop: 16.69,
  },
  markAllReadButton: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markAllReadText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1e78ff',
    lineHeight: 24,
  },
});

