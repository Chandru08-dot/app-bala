// ============================================================
//  ReadingSessionScreen – Interactive reading with timer & WPM
// ============================================================
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../theme';
import { Lesson, LessonPassage, SessionRecord } from '../types';
import { useApp } from '../AppContext';

const { width } = Dimensions.get('window');

interface ReadingSessionScreenProps {
  lesson: Lesson;
  onFinish: () => void;
  onBack: () => void;
}

type Phase = 'intro' | 'reading' | 'complete';

function ProgressRing({
  progress,
  size = 80,
  color = Colors.primary,
}: {
  progress: number;
  size?: number;
  color?: string;
}) {
  const animProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animProgress, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const circumference = (size / 2 - 8) * 2 * Math.PI;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 6,
          borderColor: Colors.bgSurface,
          position: 'absolute',
        }}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 6,
          borderColor: color,
          position: 'absolute',
          transform: [
            {
              rotate: animProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
          borderTopColor: 'transparent',
          borderRightColor: progress > 0.25 ? color : 'transparent',
          borderBottomColor: progress > 0.5 ? color : 'transparent',
          borderLeftColor: progress > 0.75 ? color : 'transparent',
        }}
      />
    </View>
  );
}

export default function ReadingSessionScreen({
  lesson,
  onFinish,
  onBack,
}: ReadingSessionScreenProps) {
  const { addSession } = useApp();
  const [phase, setPhase] = useState<Phase>('intro');
  const [passageIndex, setPassageIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [sessionResult, setSessionResult] = useState<SessionRecord | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentPassage: LessonPassage = lesson.passages[passageIndex];
  const totalPassages = lesson.passages.length;
  const passageProgress = (passageIndex + 1) / totalPassages;

  // Timer
  useEffect(() => {
    if (phase === 'reading') {
      startTimeRef.current = Date.now() - elapsedSeconds * 1000;
      timerRef.current = setInterval(() => {
        setElapsedSeconds(Math.round((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextPassage = useCallback(() => {
    if (passageIndex < totalPassages - 1) {
      setPassageIndex((i) => i + 1);
    } else {
      // Complete session
      if (timerRef.current) clearInterval(timerRef.current);
      const totalWords = lesson.passages.reduce((s, p) => s + p.wordCount, 0);
      const wpm = elapsedSeconds > 0 ? Math.round((totalWords / elapsedSeconds) * 60) : 0;
      // Simulate accuracy & attention (90-98% range to demo success)
      const accuracyPct = Math.min(98, 88 + Math.round(Math.random() * 10));
      const attentionScore = Math.min(98, 85 + Math.round(Math.random() * 13));

      const record: SessionRecord = {
        id: `s-${Date.now()}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        completedAt: new Date().toISOString(),
        durationSeconds: elapsedSeconds,
        wordsRead: totalWords,
        wpm,
        accuracyPct,
        attentionScore,
      };
      setSessionResult(record);
      addSession(record);
      setPhase('complete');
    }
  }, [passageIndex, totalPassages, elapsedSeconds, lesson, addSession]);

  // ── Intro phase ────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <View style={styles.screen}>
        <LinearGradient colors={lesson.gradientColors} style={styles.introBanner}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.introBannerEmoji}>{lesson.coverEmoji}</Text>
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.introContent}>
          <Text style={styles.introCategory}>
            {lesson.category.toUpperCase()} · LEVEL {lesson.difficultyLevel}
          </Text>
          <Text style={styles.introTitle}>{lesson.title}</Text>
          <Text style={styles.introDesc}>{lesson.description}</Text>

          <View style={styles.introMeta}>
            <View style={styles.introMetaItem}>
              <Text style={styles.introMetaEmoji}>⏱</Text>
              <Text style={styles.introMetaValue}>{lesson.estimatedMinutes} min</Text>
              <Text style={styles.introMetaLabel}>Estimated</Text>
            </View>
            <View style={styles.introMetaItem}>
              <Text style={styles.introMetaEmoji}>📄</Text>
              <Text style={styles.introMetaValue}>{totalPassages}</Text>
              <Text style={styles.introMetaLabel}>Passages</Text>
            </View>
            <View style={styles.introMetaItem}>
              <Text style={styles.introMetaEmoji}>📝</Text>
              <Text style={styles.introMetaValue}>
                {lesson.passages.reduce((s, p) => s + p.wordCount, 0)}
              </Text>
              <Text style={styles.introMetaLabel}>Words</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.startSessionBtn}
            onPress={() => setPhase('reading')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={lesson.gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startSessionGradient}
            >
              <Ionicons name="play" size={20} color={Colors.textPrimary} />
              <Text style={styles.startSessionText}>Begin Reading</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── Complete phase ─────────────────────────────────────────
  if (phase === 'complete' && sessionResult) {
    const scoreColor =
      sessionResult.accuracyPct >= 90
        ? Colors.success
        : sessionResult.accuracyPct >= 75
        ? Colors.warning
        : Colors.error;

    return (
      <View style={styles.screen}>
        <LinearGradient colors={['#1E1B4B', '#0D0B1E']} style={styles.completeHeader}>
          <Text style={styles.completeHeaderTitle}>Session Complete! 🎉</Text>
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.completeContent}>
          {/* Big accuracy ring */}
          <View style={styles.scoreArea}>
            <View style={styles.bigRing}>
              <Text style={[styles.bigRingValue, { color: scoreColor }]}>
                {sessionResult.accuracyPct}%
              </Text>
              <Text style={styles.bigRingLabel}>Accuracy</Text>
            </View>
          </View>

          {/* Stats grid */}
          <View style={styles.completeGrid}>
            {[
              { label: 'Words Read', value: `${sessionResult.wordsRead}`, emoji: '📝' },
              { label: 'Speed', value: `${sessionResult.wpm} wpm`, emoji: '💨' },
              { label: 'Time', value: formatTime(sessionResult.durationSeconds), emoji: '⏱' },
              {
                label: 'Attention',
                value: `${sessionResult.attentionScore}%`,
                emoji: '🧠',
              },
            ].map((item) => (
              <View key={item.label} style={styles.completeGridItem}>
                <Text style={styles.completeGridEmoji}>{item.emoji}</Text>
                <Text style={styles.completeGridValue}>{item.value}</Text>
                <Text style={styles.completeGridLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Feedback message */}
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>
              {sessionResult.accuracyPct >= 90
                ? '🌟 Excellent work!'
                : sessionResult.accuracyPct >= 75
                ? '👍 Good progress!'
                : '💪 Keep practising!'}
            </Text>
            <Text style={styles.feedbackBody}>
              {sessionResult.accuracyPct >= 90
                ? `You read ${sessionResult.wordsRead} words at ${sessionResult.wpm} wpm with outstanding accuracy. Your reading is improving fast!`
                : sessionResult.accuracyPct >= 75
                ? `Solid session! You read ${sessionResult.wordsRead} words in ${formatTime(sessionResult.durationSeconds)}. Try to focus on each word as you go.`
                : `You completed the session — that takes courage! Try slowing down slightly to improve accuracy next time.`}
            </Text>
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={onFinish} activeOpacity={0.85}>
            <LinearGradient
              colors={['#6C63FF', '#43CBFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.doneBtnGradient}
            >
              <Text style={styles.doneBtnText}>Back to Library</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── Reading phase ──────────────────────────────────────────
  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <LinearGradient colors={['#1E1B4B', '#0D0B1E']} style={styles.readBar}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Quit Session?', 'Your progress will be lost.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Quit', style: 'destructive', onPress: onBack },
            ])
          }
        >
          <Ionicons name="close" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text style={styles.readBarTitle} numberOfLines={1}>
            {lesson.title}
          </Text>
          <View style={styles.readBarProgress}>
            <View
              style={[styles.readBarFill, { width: `${passageProgress * 100}%` }]}
            />
          </View>
        </View>
        <View style={styles.timerBadge}>
          <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.timerText}>{formatTime(elapsedSeconds)}</Text>
        </View>
      </LinearGradient>

      {/* Passage indicator */}
      <View style={styles.passageHeader}>
        <Text style={styles.passageLabel}>
          Passage {passageIndex + 1} of {totalPassages}
        </Text>
        <Text style={styles.passageWords}>{currentPassage.wordCount} words</Text>
      </View>

      {/* Text */}
      <ScrollView
        style={styles.textScroll}
        contentContainerStyle={styles.textContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.passageText}>{currentPassage.text}</Text>
      </ScrollView>

      {/* Next button */}
      <View style={styles.readFooter}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNextPassage}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={lesson.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextBtnGradient}
          >
            <Text style={styles.nextBtnText}>
              {passageIndex < totalPassages - 1 ? 'Next Passage' : 'Finish Session'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.textPrimary} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bgDark },

  // Intro
  introBanner: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
  },
  backBtn: { position: 'absolute', top: 16, left: 16, padding: 8 },
  introBannerEmoji: { fontSize: 72 },
  introContent: { padding: Spacing.lg, paddingBottom: 40 },
  introCategory: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primaryLight,
    letterSpacing: 1,
    marginBottom: 8,
  },
  introTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  introDesc: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.65,
    marginBottom: 28,
  },
  introMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  introMetaItem: { alignItems: 'center' },
  introMetaEmoji: { fontSize: 24, marginBottom: 4 },
  introMetaValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  introMetaLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  startSessionBtn: { borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.md },
  startSessionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  startSessionText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  // Reading bar
  readBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  readBarTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  readBarProgress: {
    height: 4,
    backgroundColor: Colors.bgMuted,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  readBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timerText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
  passageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  passageLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primaryLight,
  },
  passageWords: { fontSize: FontSize.sm, color: Colors.textMuted },
  textScroll: { flex: 1 },
  textContent: { padding: Spacing.lg, paddingBottom: 24 },
  passageText: {
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 32,
    letterSpacing: 0.3,
    fontWeight: FontWeight.regular,
  },
  readFooter: {
    padding: Spacing.md,
    paddingBottom: 28,
    backgroundColor: Colors.bgDark,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextBtn: { borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.md },
  nextBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  nextBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  // Complete
  completeHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  completeHeaderTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },
  completeContent: { padding: Spacing.lg, paddingBottom: 40 },
  scoreArea: { alignItems: 'center', marginBottom: 28 },
  bigRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
  },
  bigRingValue: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
  },
  bigRingLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  completeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  completeGridItem: {
    flex: 1,
    minWidth: (width - Spacing.lg * 2 - 12) / 2,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  completeGridEmoji: { fontSize: 28, marginBottom: 6 },
  completeGridValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  completeGridLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  feedbackCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  feedbackTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  feedbackBody: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.6,
  },
  doneBtn: { borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.md },
  doneBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
});
