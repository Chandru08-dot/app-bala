// ============================================================
//  OnboardingScreen – Beautiful welcome slides
// ============================================================
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  ViewToken,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../theme';
import { useApp } from '../AppContext';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    emoji: '📖',
    title: 'Read with\nConfidence',
    subtitle:
      'Guided reading exercises designed to improve fluency, comprehension, and attention — one passage at a time.',
    gradient: ['#6C63FF', '#43CBFF'] as const,
  },
  {
    id: '2',
    emoji: '🧠',
    title: 'Track Your\nProgress',
    subtitle:
      'See real insights: words per minute, accuracy scores, and attention spans across every session.',
    gradient: ['#F093FB', '#F5576C'] as const,
  },
  {
    id: '3',
    emoji: '🏆',
    title: 'Earn\nAchievements',
    subtitle:
      'Stay motivated with streaks, badges, and milestones that celebrate every step of your reading journey.',
    gradient: ['#43E97B', '#38F9D7'] as const,
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <LinearGradient colors={item.gradient} style={styles.slide}>
            <View style={styles.slideContent}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </LinearGradient>
        )}
      />

      {/* Dots */}
      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />
            );
          })}
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.nextBtnText}>
            {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        {activeIndex < SLIDES.length - 1 && (
          <TouchableOpacity onPress={completeOnboarding} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: -80,
  },
  emoji: {
    fontSize: 90,
    marginBottom: 32,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: FontSize.xxxl * 1.2,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
    lineHeight: FontSize.lg * 1.55,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 52,
    paddingTop: 24,
    backgroundColor: 'rgba(13,11,30,0.65)',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.textPrimary,
  },
  nextBtn: {
    width: '100%',
    backgroundColor: Colors.textPrimary,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  nextBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.bgDark,
  },
  skipBtn: { paddingVertical: 8 },
  skipText: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: FontWeight.medium,
  },
});
