// ============================================================
//  ProfileScreen – User info, settings (all local)
// ============================================================
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../theme';
import { useApp } from '../AppContext';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: IoniconsName;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <Ionicons name={icon} size={18} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useApp();
  if (!user) return null;

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const unlockedBadges = user.earnedBadges.length;
  const joinDate = new Date(user.joinedAt).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient colors={['#1E1B4B', '#0D0B1E']} style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar card */}
        <View style={styles.avatarCard}>
          <LinearGradient colors={['#6C63FF', '#43CBFF']} style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{user.avatarInitials}</Text>
          </LinearGradient>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.joinedDate}>Member since {joinDate}</Text>

          {/* Quick stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>{user.currentStreak}</Text>
              <Text style={styles.quickStatLabel}>Streak 🔥</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>{user.totalSessions}</Text>
              <Text style={styles.quickStatLabel}>Sessions</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>{unlockedBadges}</Text>
              <Text style={styles.quickStatLabel}>Badges 🏆</Text>
            </View>
          </View>
        </View>

        {/* Reading Stats */}
        <Text style={styles.sectionTitle}>Reading Stats</Text>
        <View style={styles.infoCard}>
          <InfoRow
            icon="time-outline"
            label="Total Reading Time"
            value={`${user.totalMinutesRead} minutes`}
          />
          <View style={styles.divider} />
          <InfoRow
            icon="trending-up-outline"
            label="Longest Streak"
            value={`${user.longestStreak} days`}
          />
          <View style={styles.divider} />
          <InfoRow
            icon="checkmark-circle-outline"
            label="Sessions Completed"
            value={`${user.totalSessions}`}
          />
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.infoCard}>
          <InfoRow icon="person-outline" label="Full Name" value={user.fullName} />
          <View style={styles.divider} />
          <InfoRow icon="mail-outline" label="Email" value={user.email} />
          <View style={styles.divider} />
          <InfoRow
            icon="shield-checkmark-outline"
            label="Data Storage"
            value="Local device only"
          />
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>About Readable</Text>
        <View style={styles.infoCard}>
          <InfoRow icon="information-circle-outline" label="Version" value="2.0.0" />
          <View style={styles.divider} />
          <InfoRow
            icon="heart-outline"
            label="Built for"
            value="Readers of all levels"
          />
          <View style={styles.divider} />
          <InfoRow
            icon="lock-closed-outline"
            label="Privacy"
            value="No data sent to any server"
          />
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

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
  scrollContent: { padding: Spacing.lg, paddingBottom: 40 },
  avatarCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.md,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    ...Shadow.sm,
  },
  avatarInitials: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  joinedDate: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.lg,
    paddingVertical: 14,
  },
  quickStatItem: { alignItems: 'center' },
  quickStatValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  quickStatLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  quickStatDivider: { width: 1, backgroundColor: Colors.border, height: '100%' },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  infoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginBottom: 2 },
  infoValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 48 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    marginTop: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.error + '40',
  },
  signOutText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.error,
  },
});
