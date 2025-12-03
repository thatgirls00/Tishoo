import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ArrowLeftIcon from '../components/ArrowLeftIcon';
import ChartIcon2 from '../components/ChartIcon2';
import CheckmarkIcon3 from '../components/CheckmarkIcon3';
import ExternalLinkIcon3 from '../components/ExternalLinkIcon3';
import CharacterIcon from '../components/CharacterIcon';
import StarIcon3 from '../components/StarIcon3';
import ThumbsUpIcon from '../components/ThumbsUpIcon';

export default function GrowthDashboardScreen({ navigation, route }) {
  const project = route?.params?.project || {
    title: 'React로 만드는 실시간 채팅 앱',
  };

  const skills = [
    { name: 'React', progress: 85 },
    { name: 'TypeScript', progress: 70 },
    { name: 'UI/UX', progress: 65 },
    { name: 'Git', progress: 80 },
    { name: '협업', progress: 90 },
  ];

  const badges = [
    { icon: 'thumbs', text: '적극적 참여', opacity: 0.06 },
    { icon: 'chart', text: '성장 속도 빠름', opacity: 0.1 },
    { icon: 'star', text: '과제 완성도 우수', opacity: 0.2 },
  ];

  const achievements = [
    { text: '프로젝트 셋업 완료', time: '2주 전' },
    { text: 'UI 컴포넌트 3개 완성', time: '1주 전' },
    { text: '멘토 피드백 반영 완료', time: '3일 전' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1e78ff', '#1e78ff']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>← 돌아가기</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>성장 대시보드</Text>
          <Text style={styles.headerSubtitle}>{project.title}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelLeft}>
              <CharacterIcon width={50.801} height={50.801} />
              <View style={styles.levelInfo}>
                <Text style={styles.levelNumber}>레벨 3</Text>
                <Text style={styles.levelTitle}>도전자</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.levelUpButton} activeOpacity={0.7}>
              <Text style={styles.levelUpButtonText}>레벨업 효과 보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>다음 레벨까지</Text>
              <Text style={styles.progressPercent}>65%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={['#7c6bf0', '#00b8b0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: '65%' }]}
              />
            </View>
            <View style={styles.xpRow}>
              <Text style={styles.xpText}>6500 XP</Text>
              <Text style={styles.xpText}>10000 XP</Text>
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <CheckmarkIcon3 width={20} height={20} color="#1e78ff" />
            </View>
            <Text style={styles.metricValue}>45%</Text>
            <Text style={styles.metricLabel}>완료율</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <ExternalLinkIcon3 width={20} height={20} color="#1e78ff" />
            </View>
            <Text style={styles.metricValue}>92%</Text>
            <Text style={styles.metricLabel}>참여도</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <ChartIcon2 width={20} height={20} color="#1e78ff" />
            </View>
            <Text style={styles.metricValue}>88%</Text>
            <Text style={styles.metricLabel}>피드백</Text>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.skillsCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>☆</Text>
            <Text style={styles.sectionTitle}>스킬업 현황</Text>
          </View>
          <View style={styles.skillsList}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillPercent}>{skill.progress}%</Text>
                </View>
                <View style={styles.skillProgressBarContainer}>
                  <View
                    style={[
                      styles.skillProgressBarFill,
                      { width: `${skill.progress}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🏅</Text>
            <Text style={styles.sectionTitle}>멘토 평가 배지</Text>
          </View>
          <View style={styles.badgesList}>
            {badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  styles.badgeItem,
                  { backgroundColor: `rgba(30, 120, 255, ${badge.opacity})` },
                ]}
              >
                {badge.icon === 'thumbs' && (
                  <ThumbsUpIcon width={20} height={20} color="#5d5d7a" />
                )}
                {badge.icon === 'chart' && (
                  <ChartIcon2 width={20} height={20} color="#5d5d7a" />
                )}
                {badge.icon === 'star' && (
                  <StarIcon3 width={20} height={20} color="#5d5d7a" />
                )}
                <Text style={styles.badgeText}>{badge.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>최근 성과</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <View style={styles.achievementDot} />
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementText}>{achievement.text}</Text>
                  <Text style={styles.achievementTime}>{achievement.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 25.6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 24,
    gap: 16,
  },
  levelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: 'rgba(124, 107, 240, 0.16)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
    gap: 24,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  levelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelInfo: {
    gap: 4,
  },
  levelNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e78ff',
    lineHeight: 25.6,
  },
  levelUpButton: {
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    borderRadius: 16.4,
    paddingHorizontal: 16,
    paddingVertical: 12.172,
  },
  levelUpButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
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
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e78ff',
    lineHeight: 21,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#cbe0ff',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16.4,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'rgba(124, 107, 240, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 16.4,
    backgroundColor: 'rgba(30, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e78ff',
    lineHeight: 24,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
  skillsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: 'rgba(124, 107, 240, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    lineHeight: 25.2,
    letterSpacing: -0.18,
  },
  skillsList: {
    gap: 12,
  },
  skillItem: {
    gap: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6a6a6a',
    lineHeight: 21,
  },
  skillPercent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e78ff',
    lineHeight: 21,
  },
  skillProgressBarContainer: {
    height: 8,
    backgroundColor: '#cbe0ff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillProgressBarFill: {
    height: '100%',
    backgroundColor: '#1e78ff',
    borderRadius: 4,
  },
  badgesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: 'rgba(124, 107, 240, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  badgesList: {
    gap: 12,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16.4,
  },
  badgeIcon: {
    fontSize: 20,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5d5d7a',
    lineHeight: 25.6,
  },
  achievementsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: 'rgba(124, 107, 240, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  achievementsList: {
    gap: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e78ff',
    marginTop: 8,
  },
  achievementContent: {
    flex: 1,
    gap: 8,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e2e2e',
    lineHeight: 25.6,
  },
  achievementTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9b9baa',
    lineHeight: 21,
  },
});

