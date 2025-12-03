import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TishooLogoLarge from '../components/TishooLogoLarge';
import HustlerIcon from '../components/HustlerIcon';
import HackerIcon from '../components/HackerIcon';
import HipsterIcon from '../components/HipsterIcon';
import ArrowIcon from '../components/ArrowIcon';
import BackgroundWave from '../components/BackgroundWave';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Image Section with Gradient Background */}
        <View style={styles.imageSection}>
          <LinearGradient
            colors={['#1a3eec', '#1e78ff', '#1a3eec']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            {/* Decorative wave patterns */}
            <View style={styles.waveContainer}>
              {/* Left Bottom Wave - node-id=1-8254 */}
              <View style={styles.waveLeftBottom}>
                <BackgroundWave width={179.125} height={301.909} opacity={0.1} />
              </View>
              {/* Center Wave - node-id=1-8255 */}
              <View style={styles.waveCenterTop}>
                <BackgroundWave width={179.125} height={301.909} opacity={0.1} />
              </View>
              {/* Right Top Wave - node-id=1-8256 */}
              <View style={styles.waveRightTop}>
                <BackgroundWave width={179.125} height={301.909} opacity={0.1} />
              </View>
            </View>
            
            {/* Central Logo/Circle */}
            <View style={styles.logoContainer}>
              <TishooLogoLarge width={214} height={214} />
            </View>
            
            {/* Character Icons and Labels */}
            <View style={styles.characterContainer}>
              {/* Hustler - Top Center */}
              <View style={styles.characterHustler}>
                <View style={styles.characterIcon}>
                  <HustlerIcon width={104} height={79} />
                </View>
                <Text style={styles.characterLabel}>Hustler</Text>
              </View>
              
              {/* Hacker - Top Right */}
              <View style={styles.characterHacker}>
                <View style={styles.characterIcon}>
                  <HackerIcon width={104} height={98} />
                </View>
                <Text style={styles.characterLabel}>Hacker</Text>
              </View>
              
              {/* Hipster - Bottom Right */}
              <View style={styles.characterHipster}>
                <View style={styles.characterIcon}>
                  <HipsterIcon width={106} height={79} />
                </View>
                <Text style={styles.characterLabel}>Hipster</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              나는 어떤 유형의 팀원일까요?
            </Text>
          </View>

          {/* Paragraph */}
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              팀을 움직이는 힘은 모두 다르니까.
            </Text>
            <Text style={styles.paragraph}>
              당신의 팀플 캐릭터를 선택해보세요!
            </Text>
          </View>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
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
                  navigation.navigate('Onboarding2');
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
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  waveContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  waveLeftBottom: {
    position: 'absolute',
    left: 0,
    width: (54.07 / 100) * width,
    top: (5.27 / 100) * 420,
    height: ((22.84 - 5.27) / 100) * 420,
    zIndex: 0,
  },
  waveRightTop: {
    position: 'absolute',
    left: (54.07 / 100) * width,
    width: ((100 - 54.07) / 100) * width,
    top: (4.77 / 100) * 420,
    height: ((23.35 - 4.77) / 100) * 420,
    zIndex: 0,
  },
  waveCenterTop: {
    position: 'absolute',
    left: (30.72 / 100) * width,
    width: ((100 - 30.72 - 23.35) / 100) * width,
    top: (5.68 / 100) * 420,
    height: ((22.44 - 5.68) / 100) * 420,
    zIndex: 0,
  },
  logoContainer: {
    position: 'absolute',
    left: (30.53 / SCREEN_WIDTH) * width,
    top: (180 / SCREEN_HEIGHT) * height, // 내림: 140.96 -> 180
    width: (213.87 / SCREEN_WIDTH) * width,
    height: (213.87 / SCREEN_WIDTH) * width,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  characterContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  characterHustler: {
    position: 'absolute',
    left: (151.27 / SCREEN_WIDTH) * width,
    top: (70.5 / SCREEN_HEIGHT) * height,
    alignItems: 'center',
  },
  characterHacker: {
    position: 'absolute',
    left: (287.41 / SCREEN_WIDTH) * width,
    top: (140 / SCREEN_HEIGHT) * height, // 올림: 165.9 -> 140
    alignItems: 'center',
  },
  characterHipster: {
    position: 'absolute',
    left: (244.43 / SCREEN_WIDTH) * width,
    top: (300 / SCREEN_HEIGHT) * height, // 더 올림: 320 -> 300
    alignItems: 'center',
  },
  characterIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  characterLabel: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
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
    fontFamily: 'Pretendard-Bold',
    color: '#2e2e2e',
    textAlign: 'center',
    fontWeight: '700',
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
    fontFamily: 'Pretendard-Medium',
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

