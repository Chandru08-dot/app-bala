// ============================================================
//  BottomNav – Premium dark tab bar
// ============================================================
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Radius } from '../theme';

type MainTab = 'home' | 'lessons' | 'progress' | 'profile';

const TABS: {
  key: MainTab;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconActive: React.ComponentProps<typeof Ionicons>['name'];
}[] = [
  { key: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { key: 'lessons', label: 'Library', icon: 'book-outline', iconActive: 'book' },
  { key: 'progress', label: 'Progress', icon: 'bar-chart-outline', iconActive: 'bar-chart' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

interface BottomNavProps {
  activeTab: MainTab;
  onTabPress: (tab: MainTab) => void;
}

function TabItem({
  tab,
  isActive,
  onPress,
}: {
  tab: (typeof TABS)[number];
  isActive: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const indicatorScale = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(indicatorScale, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: true,
      damping: 16,
    }).start();
  }, [isActive]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.85, useNativeDriver: true, damping: 10 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 10 }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={tab.label}
    >
      <Animated.View style={[styles.tabInner, { transform: [{ scale }] }]}>
        {/* Active pill indicator */}
        <Animated.View
          style={[
            styles.activePill,
            {
              transform: [{ scaleX: indicatorScale }],
              opacity: indicatorScale,
            },
          ]}
        />

        <Ionicons
          name={isActive ? tab.iconActive : tab.icon}
          size={22}
          color={isActive ? Colors.primary : Colors.textMuted}
        />
        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map((tab) => (
        <TabItem
          key={tab.key}
          tab={tab}
          isActive={activeTab === tab.key}
          onPress={() => onTabPress(tab.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabInner: {
    alignItems: 'center',
    paddingVertical: 4,
    minWidth: 56,
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    top: -4,
    width: 40,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
    marginTop: 4,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
});
