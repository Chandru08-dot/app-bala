// ============================================================
//  HomeScreen – Dashboard with stats, streaks, recent activity
// ============================================================
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../theme';
import { useApp } from '../AppContext';
import { LESSONS } from '../data';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNavigateToLessons: () => void;
}

function StatCard({
  label,
  value,
  emoji,
  gradient,
  delay,
}: {
  label: string;
  value: string;
  emoji: string;
  gradient: readonly [string, string];
  delay: number;
}) {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, delay, useNativeDriver: true, damping: 12 }),
      Animated.timing(opacity, { toValue: 1, delay, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }], opacity, flex: 1 }}>
      <LinearGradient colors={gradient} style={styles.statCard}>
        <Text style={styles.statEmoji}>{emoji}</Text>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

export default function HomeScreen({ onNavigateToLessons }: HomeScreenProps) {
  const { user, sessions } = useApp();
  if (!user) return null;

  const avgAccuracy = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.accuracyPct, 0) / sessions.length)
    : 0;
  const avgWpm = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.wpm, 0) / sessions.length)
    : 0;

  const recentSessions = sessions.slice(0, 3);
  const suggestedLessons = LESSONS.slice(0, 3);

  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerSlide, { toValue: 0, useNativeDriver: true, damping: 14 }),
      Animated.timing(headerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.screen}>
      {/* Header gradient */}
      <LinearGradient colors={['#1E1B4B', '#0D0B1E']} style={styles.headerBg}>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerSlide }], opacity: headerOpacity },
          ]}
        >
          <View>
            <Text style={styles.greeting}>Good day,</Text>
            <Text style={styles.userName}>{user.fullName.split(' ')[0]} 👋</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user.avatarInitials}</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak banner */}
        <LinearGradient
          colors={['#F093FB', '#F5576C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.streakBanner}
        >
          <Text style={styles.streakEmoji}>🔥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.streakTitle}>{user.currentStreak}-Day Streak!</Text>
            <Text style={styles.streakSub}>Keep it up — you're on fire!</Text>
          </View>
          <Text style={styles.streakBest}>Best: {user.longestStreak}d</Text>
        </LinearGradient>

        {/* Stats row */}
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsRow}>
          <StatCard
            label="Accuracy"
            value={`${avgAccuracy}%`}
            emoji="🎯"
            gradient={['#6C63FF', '#43CBFF']}
            delay={100}
          />
          <View style={{ width: 10 }} />
          <StatCard
            label="Avg WPM"
            value={`${avgWpm}`}
            emoji="💨"
            gradient={['#43E97B', '#38F9D7']}
            delay={200}
          />
          <View style={{ width: 10 }} />
          <StatCard
            label="Sessions"
            value={`${user.totalSessions}`}
            emoji="📚"
            gradient={['#F6D365', '#FDA085']}
            delay={300}
          />
        </View>

        {/* Suggested lessons */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          <TouchableOpacity onPress={onNavigateToLessons}>
            <Text style={styles.viewAll}>View all →</Text>
          </TouchableOpacity>
        </View>

        {suggestedLessons.map((lesson, i) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={onNavigateToLessons}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={lesson.gradientColors}
              style={styles.lessonCover}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.lessonEmoji}>{lesson.coverEmoji}</Text>
            </LinearGradient>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonCategory}>
                {lesson.category.toUpperCase()}
              </Text>
              <Text style={styles.lessonTitle} numberOfLines={2}>
                {lesson.title}
              </Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonMetaText}>
                  ⏱ {lesson.estimatedMinutes} min
                </Text>
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>
                    {'★'.repeat(lesson.difficultyLevel)}
                    {'☆'.repeat(5 - lesson.difficultyLevel)}
                  </Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        {/* Recent activity */}
        {recentSessions.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: Spacing.lg }]}>
              Recent Activity
            </Text>
            {recentSessions.map((s) => (
              <View key={s.id} style={styles.activityRow}>
                <View style={styles.activityDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle} numberOfLines={1}>
                    {s.lessonTitle}
                  </Text>
                  <Text style={styles.activityMeta}>
                    {s.wpm} wpm · {s.accuracyPct}% accuracy ·{' '}
                    {new Date(s.completedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bgDark },
  headerBg: { paddingTop: 12, paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  greeting: { fontSize: FontSize.md, color: Colors.textSecondary },
  userName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: 12,
    ...Shadow.md,
  },
  streakEmoji: { fontSize: 32 },
  streakTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  streakSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  streakBest: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: Spacing.lg,
  },
  viewAll: {
    fontSize: FontSize.sm,
    color: Colors.primaryLight,
    fontWeight: FontWeight.semibold,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  statCard: {
    borderRadius: Radius.lg,
    padding: 14,
    alignItems: 'center',
    ...Shadow.sm,
  },
  statEmoji: { fontSize: 26, marginBottom: 6 },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  lessonCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  lessonCover: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  lessonEmoji: { fontSize: 28 },
  lessonInfo: { flex: 1 },
  lessonCategory: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primaryLight,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  lessonMetaText: { fontSize: FontSize.xs, color: Colors.textMuted },
  difficultyBadge: {
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  difficultyText: { fontSize: FontSize.xs, color: Colors.warning },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
    paddingLeft: 4,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    marginTop: 5,
  },
  activityTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  activityMeta: { fontSize: FontSize.sm, color: Colors.textMuted },
});
