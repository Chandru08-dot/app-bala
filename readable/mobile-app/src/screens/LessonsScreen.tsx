// ============================================================
//  LessonsScreen – Browse & filter all lessons
// ============================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../theme';
import { Lesson } from '../types';
import { LESSONS } from '../data';

type Category = 'all' | 'story' | 'science' | 'history' | 'adventure' | 'poetry';

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '📚' },
  { key: 'story', label: 'Stories', emoji: '📖' },
  { key: 'science', label: 'Science', emoji: '🔬' },
  { key: 'history', label: 'History', emoji: '🏛️' },
  { key: 'adventure', label: 'Adventure', emoji: '🗺️' },
  { key: 'poetry', label: 'Poetry', emoji: '🖊️' },
];

interface LessonsScreenProps {
  onSelectLesson: (lesson: Lesson) => void;
}

export default function LessonsScreen({ onSelectLesson }: LessonsScreenProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = LESSONS.filter((l) => {
    const matchesCategory = activeCategory === 'all' || l.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelectLesson(item)}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={item.gradientColors}
        style={styles.cardBanner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.cardEmoji}>{item.coverEmoji}</Text>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>
            ★ {'★'.repeat(item.difficultyLevel - 1)}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.cardBody}>
        <Text style={styles.cardCategory}>
          {item.category.toUpperCase()} · {item.estimatedMinutes} MIN
        </Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPassages}>
            {item.passages.length} passage{item.passages.length > 1 ? 's' : ''}
          </Text>
          <View style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient colors={['#1E1B4B', '#0D0B1E']} style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <Text style={styles.headerSub}>
          {LESSONS.length} lessons · Pick your next read
        </Text>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lessons..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {!!searchQuery && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Category filter */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(c) => c.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        style={styles.categoryBar}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              activeCategory === item.key && styles.categoryChipActive,
            ]}
            onPress={() => setActiveCategory(item.key)}
            activeOpacity={0.8}
          >
            <Text style={styles.categoryEmoji}>{item.emoji}</Text>
            <Text
              style={[
                styles.categoryLabel,
                activeCategory === item.key && styles.categoryLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Lessons list */}
      <FlatList
        data={filtered}
        keyExtractor={(l) => l.id}
        renderItem={renderLesson}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No lessons found</Text>
          </View>
        }
      />
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
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  categoryBar: { maxHeight: 60, backgroundColor: Colors.bgDark },
  categoryList: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 5,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryEmoji: { fontSize: 14 },
  categoryLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  categoryLabelActive: { color: Colors.textPrimary },
  list: { paddingHorizontal: Spacing.md, paddingBottom: 24 },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.xl,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.md,
  },
  cardBanner: {
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 16,
  },
  cardEmoji: { fontSize: 52 },
  cardBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardBadgeText: { fontSize: FontSize.xs, color: Colors.textPrimary },
  cardBody: { padding: 16 },
  cardCategory: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primaryLight,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.55,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPassages: { fontSize: FontSize.sm, color: Colors.textMuted },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  startBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: FontSize.lg, color: Colors.textSecondary },
});
