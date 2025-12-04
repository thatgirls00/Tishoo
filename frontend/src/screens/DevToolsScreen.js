import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { seedTestData } from '../utils/seedTestData';

/**
 * 개발자 도구 화면
 * 테스트 데이터를 생성하거나 기타 개발용 유틸리티를 실행할 수 있습니다.
 */
export default function DevToolsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const handleSeedData = async () => {
    try {
      setLoading(true);
      setLastResult(null);

      const result = await seedTestData();

      setLastResult({
        success: true,
        mentor: result.mentor,
        project: result.project,
      });

      Alert.alert(
        '성공! 🎉',
        `멘토 "${result.mentor.name}"와 프로젝트 "${result.project.title}"가 생성되었습니다!`,
        [{ text: '확인' }]
      );
    } catch (error) {
      console.error('데이터 생성 실패:', error);
      setLastResult({
        success: false,
        error: error.message || '알 수 없는 오류',
      });

      Alert.alert(
        '오류 발생',
        `데이터 생성에 실패했습니다.\n\n${error.message || '알 수 없는 오류'}`,
        [{ text: '확인' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개발자 도구</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 테스트 데이터 생성 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>테스트 데이터 생성</Text>
          <Text style={styles.sectionDescription}>
            멘토 "멘토테스트"와 프로젝트 "테참잘"을 생성합니다.
          </Text>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSeedData}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>데이터 생성하기</Text>
            )}
          </TouchableOpacity>

          {lastResult && (
            <View
              style={[
                styles.resultBox,
                lastResult.success ? styles.resultSuccess : styles.resultError,
              ]}
            >
              <Text style={styles.resultTitle}>
                {lastResult.success ? '✅ 생성 완료!' : '❌ 생성 실패'}
              </Text>
              {lastResult.success ? (
                <View style={styles.resultContent}>
                  <Text style={styles.resultText}>
                    멘토: {lastResult.mentor.name} (ID: {lastResult.mentor.id})
                  </Text>
                  <Text style={styles.resultText}>
                    프로젝트: {lastResult.project.title} (ID: {lastResult.project.id})
                  </Text>
                  <Text style={styles.resultText}>
                    가격: {lastResult.project.price.toLocaleString()}원
                  </Text>
                  <Text style={styles.resultText}>
                    기간: {lastResult.project.duration}주
                  </Text>
                </View>
              ) : (
                <Text style={styles.resultErrorText}>
                  오류: {lastResult.error}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* 데이터 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>생성될 데이터 정보</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>멘토: 멘토테스트</Text>
            <Text style={styles.infoText}>
              • 직함: 시니어 소프트웨어 엔지니어 @ 네이버
            </Text>
            <Text style={styles.infoText}>• 전문분야: 풀스택 개발</Text>
            <Text style={styles.infoText}>• 가격: 500,000원</Text>
            <Text style={styles.infoText}>
              • 상세한 소개 및 멘토링 특징 포함
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>프로젝트: 테참잘</Text>
            <Text style={styles.infoText}>
              • 제목: 테스트 잘 하는 집 : 테참잘
            </Text>
            <Text style={styles.infoText}>• 가격: 450,000원</Text>
            <Text style={styles.infoText}>• 기간: 6주</Text>
            <Text style={styles.infoText}>
              • 스킬: Jest, React Testing Library, Cypress, TDD 등
            </Text>
            <Text style={styles.infoText}>
              • 상세한 커리큘럼 (6주차 구성)
            </Text>
            <Text style={styles.infoText}>• 체계적인 학습 내용 및 과제</Text>
          </View>
        </View>

        {/* 안내 사항 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>안내 사항</Text>
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ 이 기능은 개발 및 테스트 용도입니다.
            </Text>
            <Text style={styles.warningText}>
              • 백엔드 서버가 실행 중이어야 합니다.
            </Text>
            <Text style={styles.warningText}>
              • 같은 데이터를 여러 번 생성하면 중복될 수 있습니다.
            </Text>
            <Text style={styles.warningText}>
              • 생성 후 앱의 멘토 검색 및 프로젝트 탐색에서 확인할 수 있습니다.
            </Text>
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e3e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 60,
  },
  backButtonText: {
    fontSize: 16,
    color: '#1e78ff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e3e6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 15,
    color: '#9b9baa',
    marginBottom: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#1e78ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#9b9baa',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultBox: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  resultSuccess: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  resultError: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000000',
  },
  resultContent: {
    gap: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
  },
  resultErrorText: {
    fontSize: 14,
    color: '#c62828',
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e3e6',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 4,
  },
  warningBox: {
    backgroundColor: '#fff8e1',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  warningText: {
    fontSize: 14,
    color: '#f57c00',
    lineHeight: 22,
    marginBottom: 4,
  },
});
