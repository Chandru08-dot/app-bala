// ============================================================
//  App.tsx – Root navigator (no backend, no expo-router)
// ============================================================
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/AppContext';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LessonsScreen from './src/screens/LessonsScreen';
import ReadingSessionScreen from './src/screens/ReadingSessionScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BottomNav from './src/components/BottomNav';
import { Lesson } from './src/types';
import { Colors } from './src/theme';

type MainTab = 'home' | 'lessons' | 'progress' | 'profile';

function RootNavigator() {
  const { user, onboardingDone } = useApp();
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // ── Not yet onboarded → show onboarding slides ────────────
  if (!onboardingDone) {
    return <OnboardingScreen />;
  }

  // ── No user → show login ──────────────────────────────────
  if (!user) {
    return <LoginScreen />;
  }

  // ── Lesson session active → show full-screen reader ───────
  if (selectedLesson) {
    return (
      <ReadingSessionScreen
        lesson={selectedLesson}
        onFinish={() => {
          setSelectedLesson(null);
          setActiveTab('progress');
        }}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  // ── Main tabs ─────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <View style={styles.screenArea}>
        {activeTab === 'home' && (
          <HomeScreen onNavigateToLessons={() => setActiveTab('lessons')} />
        )}
        {activeTab === 'lessons' && (
          <LessonsScreen onSelectLesson={(lesson) => setSelectedLesson(lesson)} />
        )}
        {activeTab === 'progress' && <ProgressScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </View>
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView style={styles.safe} edges={['top']}>
          <StatusBar style="light" backgroundColor={Colors.bgDark} />
          <RootNavigator />
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgDark },
  container: { flex: 1, backgroundColor: Colors.bgDark },
  screenArea: { flex: 1 },
});
