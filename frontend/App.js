import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/OnboardingScreen3';
import OnboardingScreen4 from './src/screens/OnboardingScreen4';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import MenteeProfileScreen from './src/screens/MenteeProfileScreen';
import MenteeProfileStep2Screen from './src/screens/MenteeProfileStep2Screen';
import MenteeProfileStep3Screen from './src/screens/MenteeProfileStep3Screen';
import MenteeProfileStep4Screen from './src/screens/MenteeProfileStep4Screen';
import MentorProfileScreen from './src/screens/MentorProfileScreen';
import MentorProfileStep2Screen from './src/screens/MentorProfileStep2Screen';
import MentorProfileStep3Screen from './src/screens/MentorProfileStep3Screen';
import MentorProfileStep4Screen from './src/screens/MentorProfileStep4Screen';
import MenteeHomeScreen from './src/screens/MenteeHomeScreen';
import MentorHomeScreen from './src/screens/MentorHomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import MentorSearchScreen from './src/screens/MentorSearchScreen';
import CreateProjectScreen from './src/screens/CreateProjectScreen';
import CreateProjectStep2Screen from './src/screens/CreateProjectStep2Screen';
import CreateProjectStep3Screen from './src/screens/CreateProjectStep3Screen';
import CreateProjectStep4Screen from './src/screens/CreateProjectStep4Screen';
import MentorProjectDetailScreen from './src/screens/MentorProjectDetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import PaymentCompleteScreen from './src/screens/PaymentCompleteScreen';
import MyProjectScreen from './src/screens/MyProjectScreen';
import MyProjectDetailScreen from './src/screens/MyProjectDetailScreen';
import GrowthDashboardScreen from './src/screens/GrowthDashboardScreen';
import MentorReviewScreen from './src/screens/MentorReviewScreen';
import MentorReviewStep2Screen from './src/screens/MentorReviewStep2Screen';
import MentorReviewStep3Screen from './src/screens/MentorReviewStep3Screen';
import MyPageScreen from './src/screens/MyPageScreen';
import MentorMyPageScreen from './src/screens/MentorMyPageScreen';
import DevToolsScreen from './src/screens/DevToolsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
        <Stack.Screen name="Onboarding4" component={OnboardingScreen4} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="MenteeProfile" component={MenteeProfileScreen} />
        <Stack.Screen name="MenteeProfileStep2" component={MenteeProfileStep2Screen} />
        <Stack.Screen name="MenteeProfileStep3" component={MenteeProfileStep3Screen} />
        <Stack.Screen name="MenteeProfileStep4" component={MenteeProfileStep4Screen} />
        <Stack.Screen name="MentorProfile" component={MentorProfileScreen} />
        <Stack.Screen name="MentorProfileStep2" component={MentorProfileStep2Screen} />
        <Stack.Screen name="MentorProfileStep3" component={MentorProfileStep3Screen} />
        <Stack.Screen name="MentorProfileStep4" component={MentorProfileStep4Screen} />
        <Stack.Screen name="MenteeHome" component={MenteeHomeScreen} />
        <Stack.Screen name="MentorHome" component={MentorHomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MentorSearch" component={MentorSearchScreen} />
        <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
        <Stack.Screen name="CreateProjectStep2" component={CreateProjectStep2Screen} />
        <Stack.Screen name="CreateProjectStep3" component={CreateProjectStep3Screen} />
        <Stack.Screen name="CreateProjectStep4" component={CreateProjectStep4Screen} />
        <Stack.Screen name="MentorProjectDetail" component={MentorProjectDetailScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentComplete" component={PaymentCompleteScreen} />
        <Stack.Screen name="MyProject" component={MyProjectScreen} />
        <Stack.Screen name="MyProjectDetail" component={MyProjectDetailScreen} />
        <Stack.Screen name="GrowthDashboard" component={GrowthDashboardScreen} />
        <Stack.Screen name="MentorReview" component={MentorReviewScreen} />
        <Stack.Screen name="MentorReviewStep2" component={MentorReviewStep2Screen} />
        <Stack.Screen name="MentorReviewStep3" component={MentorReviewStep3Screen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen name="MentorMyPage" component={MentorMyPageScreen} />
        <Stack.Screen name="DevTools" component={DevToolsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

