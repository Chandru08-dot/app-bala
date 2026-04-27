// ============================================================
//  ProgressScreen – Charts, trends, achievements
// ============================================================
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../theme';
import { useApp } from '../AppContext';
import { buildAchievements } from '../data';

const { width } = Dimensions.get('window');
const BAR_MAX_WIDTH = width - Spacing.lg * 2 - 60;

function AnimatedBar({
  value,
  maxValue,
  color,
  delay,
}: {
  value: number;
  maxValue: number;
  color: string;
  delay: number;
}) {
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: maxValue > 0 ? (value / maxValue) * BAR_MAX_WIDTH : 0,
      duration: 700,
      delay,
      useNativeDriver: false,
    }).start();
  }, [value, maxValue]);

  return (
    <Animated.View
      style={{
        height: 10,
        width: barWidth,
        backgroundColor: color,
        borderRadius: Radius.full,
      }}
    />
  );
}

function AchievementBadge({
  title,
  emoji,
  description,
  unlocked,
  progress,
  delay,
}: {
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  progress: number;
  delay: number;
}) {
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, delay, useNativeDriver: true, damping: 14 }),
      Animated.timing(opacity, { toValue: 1, delay, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.achievementCard, { transform: [{ scale }], opacity }]}>
      <View style={[styles.achievementIconWrap, !unlocked && styles.achievementLocked]}>
        <Text style={[styles.achievementEmoji, !unlocked && { opacity: 0.4 }]}>{emoji}</Text>
        {unlocked && (
          <View style={styles.achievementCheck}>
            <Text style={{ fontSize: 10, color: Colors.textPrimary }}>✓</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.achievementTitle, !unlocked && styles.achievementTitleLocked]}>
          {title}
        </Text>
        <Text style={styles.achievementDesc}>{description}</Text>
        {!unlocked && (
          <View style={styles.achievementProgressBar}>
            <View
              style={[
                styles.achievementProgressFill,
                { width: `${Math.round(progress * 100)}%` },
              ]}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
}

export default function ProgressScreen() {
  const { user, sessions } = useApp();
  if (!user) return null;

  const avgAccuracy = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.accuracyPct, 0) / sessions.length)
    : 0;
  const avgWpm = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.wpm, 0) / sessions.length)
    : 0;
  const avgAttention = sessions.length
    ? Math.round(sessions.reduce((s, r) => s + r.attentionScore, 0) / sessions.length)
    : 0;

  const recentFive = sessions.slice(0, 5);
  const maxWpm = recentFive.length ? Math.max(...recentFive.map((s) => s.wpm)) : 1;

  const achievements = buildAchievements(
    sessions,
    user.currentStreak,
    user.earnedBadges,
  );
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#1E1B4B', '#0D0B1E']} style={styles.header}>
        <Text style={styles.headerTitle}>Progress</Text>
        <Text style={styles.headerSub}>
          {user.totalSessions} session{user.totalSessions !== 1 ? 's' : ''} ·{' '}
          {user.totalMinutesRead} min read
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview metrics */}
        <Text style={styles.sectionTitle}>Averages</Text>
        {[
          { label: 'Accuracy', value: avgAccuracy, max: 100, unit: '%', color: Colors.primary },
          { label: 'Speed (WPM)', value: avgWpm, max: 120, unit: '', color: Colors.accent },
          { label: 'Attention', value: avgAttention, max: 100, unit: '%', color: Colors.success },
        ].map((m, i) => (
          <View key={m.label} style={styles.metricRow}>
            <View style={styles.metricLabelWrap}>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text style={styles.metricValue}>
                {m.value}
                {m.unit}
              </Text>
            </View>
            <View style={styles.barTrack}>
              <AnimatedBar value={m.value} maxValue={m.max} color={m.color} delay={i * 150} />
            </View>
          </View>
        ))}

        {/* Recent sessions chart */}
        {recentFive.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: Spacing.lg }]}>
              Recent WPM
            </Text>
            <View style={styles.chartCard}>
              <View style={styles.barsRow}>
                {recentFive.map((s, i) => {
                  const barHeight = maxWpm > 0 ? (s.wpm / maxWpm) * 80 : 0;
                  return (
                    <View key={s.id} style={styles.barCol}>
                      <Text style={styles.barValueLabel}>{s.wpm}</Text>
                      <View style={styles.barWrapper}>
                        <LinearGradient
                          colors={['#6C63FF', '#43CBFF']}
                          style={[styles.barEl, { height: barHeight }]}
                        />
                      </View>
                      <Text style={styles.barDateLabel}>
                        {new Date(s.completedAt).toLocaleDateString('en', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        {/* Achievements */}
        <View style={styles.achievementsHeader}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsCount}>
            <Text style={styles.achievementsCountText}>
              {unlockedCount}/{achievements.length}
            </Text>
          </View>
        </View>

        {achievements.map((a, i) => (
          <AchievementBadge
            key={a.id}
            title={a.title}
            emoji={a.emoji}
            description={a.description}
            unlocked={a.unlocked}
            progress={a.progress ?? 0}
            delay={i * 60}
          />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bgDark },
  header: { paddingHorizontal: Spacing.lg, paddingTop: 12, paddingBottom: 20 },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  metricRow: { marginBottom: 16 },
  metricLabelWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  metricValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  barTrack: {
    height: 10,
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  chartCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  barCol: { alignItems: 'center', gap: 4 },
  barValueLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  barWrapper: {
    width: 28,
    justifyContent: 'flex-end',
    height: 80,
  },
  barEl: {
    width: 28,
    borderRadius: 6,
  },
  barDateLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: Spacing.lg,
  },
  achievementsCount: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  achievementsCountText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 10,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  achievementIconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  achievementLocked: { backgroundColor: Colors.bgMuted },
  achievementEmoji: { fontSize: 24 },
  achievementCheck: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  achievementTitleLocked: { color: Colors.textMuted },
  achievementDesc: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    lineHeight: FontSize.xs * 1.5,
    marginBottom: 6,
  },
  achievementProgressBar: {
    height: 4,
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
});
