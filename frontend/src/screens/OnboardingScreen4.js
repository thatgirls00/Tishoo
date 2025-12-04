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
import Group1Icon from '../components/Group1Icon';
import Group2Icon from '../components/Group2Icon';
import Group3Icon from '../components/Group3Icon';
import Group4Icon from '../components/Group4Icon';
import Group5Icon from '../components/Group5Icon';
import GroupIcon from '../components/GroupIcon';
import Vector1Icon from '../components/Vector1Icon';
import Vector2Icon from '../components/Vector2Icon';
import VectorIcon from '../components/VectorIcon';
import ProgressCardIcon from '../components/ProgressCardIcon';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

export default function OnboardingScreen4({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Section with Black Background */}
        <View style={styles.imageSection}>
          <View style={styles.blackBackground}>
            {/* Group Icons Container */}
            <View style={styles.groupIconsContainer}>
              {/* Group (music notes) - 메시지 아이콘 (벡터 뒤에) */}
              <View style={styles.groupContainer}>
                <GroupIcon width={146} height={77} />
              </View>
              
              {/* Group 4 and 5 (overlapping) - 사람 아이콘 (오른쪽) */}
              <View style={styles.group45Container}>
                <View style={styles.group5Back}>
                  <Group5Icon width={125} height={129} />
                </View>
                <View style={styles.group4Front}>
                  <Group4Icon width={125} height={129} />
                </View>
              </View>
              
              {/* Group 2 and 3 (overlapping) */}
              <View style={styles.group23Container}>
                <View style={styles.group2Back}>
                  <Group2Icon width={145} height={116} />
                </View>
                <View style={styles.group3Front}>
                  <Group3Icon width={145} height={116} />
                </View>
              </View>
              
              {/* Vector1 - Large blue triangle (중앙) */}
              <View style={styles.vector1Container}>
                <Vector1Icon width={200.155} height={166.671} />
              </View>
              
              {/* Progress Card with Text - Vector1 안에 (기울기 적용) */}
              <View style={styles.progressCardContainer}>
                <ProgressCardIcon width={453} height={387} />
                <View style={styles.progressCardTextContainer}>
                  <Text style={styles.progressCardText}>PROGRESS</Text>
                </View>
              </View>
              
              {/* Vector2 - White gradient arrow (Progress 오른쪽) */}
              <View style={styles.vector2Container}>
                <Vector2Icon width={72} height={175} />
              </View>
              
              {/* Group 1 - 코드 아이콘 (더 아래로) */}
              <View style={styles.group1Container}>
                <Group1Icon width={106} height={144} />
              </View>
              
              {/* Vector (blue gradient bar) */}
              <View style={styles.vectorContainer}>
                <VectorIcon width={181} height={86} />
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              함께 성장하는
            </Text>
            <Text style={styles.heading}>
              프로젝트, TISHOO
            </Text>
          </View>

          {/* Paragraph */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              멘토와 멘티가 만나
            </Text>
            <Text style={styles.paragraph}>
              실전 경험을 쌓고 성장하는 플랫폼
            </Text>
          </View>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={() => {
                if (navigation) {
                  navigation.navigate('RoleSelection');
                }
              }}
            >
              <Text style={styles.nextButtonText}>시작하기</Text>
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
  blackBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
    position: 'relative',
    zIndex: 0, // 맨 뒤로
  },
  vector1Container: {
    position: 'absolute',
    left: (width / 2) - (200.155 / 2) - 3, // Figma: calc(50% - 3px) - (width/2)
    top: 150, // 위로 올림 (204 -> 150)
    zIndex: 2, // 앞으로
  },
  vector2Container: {
    position: 'absolute',
    right: 20, // 더 오른쪽으로
    top: 150 + (166.671 / 2) - (175 / 2), // Progress와 같은 높이
    zIndex: 3,
  },
  groupIconsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  group23Container: {
    position: 'absolute',
    left: (width / 2) + 20, // 왼쪽으로 이동 (오른쪽에서 중앙으로)
    top: 50, // 위로 올림
    zIndex: 2, // 앞으로
  },
  group2Back: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  group3Front: {
    position: 'absolute',
    left: 20, // 겹치지 않도록
    top: 20, // 상대 위치
    zIndex: 2,
  },
  group45Container: {
    position: 'absolute',
    left: (7.34 / 100) * width, // 코드 아이콘 위치로 이동
    top: (39.62 / 100) * 420, // 코드 아이콘 위치로 이동
    zIndex: 0, // 벡터 뒤로 (그룹 3처럼)
  },
  group5Back: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  group4Front: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  group1Container: {
    position: 'absolute',
    left: (45.33 / 100) * width, // 그룹 4,5 위치로 이동
    top: (53.29 / 100) * 420 + 50, // 조금 더 아래로 (30 -> 50)
    transform: [{ rotate: '359.84deg' }], // 시계방향으로 5도 더 회전 (354.84 + 5)
    zIndex: 3, // 보이도록 zIndex 높임
  },
  groupContainer: {
    position: 'absolute',
    left: (74.42 / 100) * width, // Figma: 74.42%
    top: 50, // 위로 올림
    zIndex: 1, // 앞으로
  },
  vectorContainer: {
    position: 'absolute',
    left: (width / 2) - (181 / 2), // 중앙 정렬
    top: 150 + (166.671 / 2) + 20, // Progress 문구 밑으로, 위로 올림
    zIndex: 2, // 앞으로
  },
  progressCardContainer: {
    position: 'absolute',
    left: (width / 2) - (453 / 2),
    top: 33, // Figma: top-[33px]
    zIndex: 3, // Vector1 위에
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCardTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  contentSection: {
    width: '100%',
    paddingHorizontal: (22.5 / SCREEN_WIDTH) * width,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  headingContainer: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e2e2e',
    textAlign: 'center',
    lineHeight: 31.2,
    letterSpacing: -0.48,
    marginBottom: 4,
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
    paddingBottom: 20,
    borderTopWidth: 0.697,
    borderTopColor: '#e2e2e8',
    backgroundColor: '#ffffff',
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
