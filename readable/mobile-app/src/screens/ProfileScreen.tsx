import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { mockProgress, mockSessions } from '../data/mockData';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen: React.FC = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleTeacherMode = () => {
    if (user?.role === 'teacher') {
      navigation.navigate('TeacherDashboard');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user?.role}</Text>
        </View>
      </View>

      {/* Reading Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reading Profile</Text>
        <View style={styles.profileCard}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Difficulty Level</Text>
            <Text style={styles.profileValue}>{user?.readingProfile?.difficulty}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Font Size</Text>
            <Text style={styles.profileValue}>{user?.readingProfile?.fontSize}px</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Line Spacing</Text>
            <Text style={styles.profileValue}>{user?.readingProfile?.lineSpacing}x</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Word Spacing</Text>
            <Text style={styles.profileValue}>{user?.readingProfile?.wordSpacing}em</Text>
          </View>
        </View>
      </View>

      {/* Progress Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Icon name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{mockProgress.averageAccuracy}%</Text>
            <Text style={styles.statLabel}>Avg Accuracy</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="local-fire" size={24} color="#FF9800" />
            <Text style={styles.statValue}>{mockProgress.longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="book" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{mockProgress.totalSessions}</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star" size={24} color="#9C27B0" />
            <Text style={styles.statValue}>{mockProgress.completedMissions.length}</Text>
            <Text style={styles.statLabel}>Missions Done</Text>
          </View>
        </View>
      </View>

      {/* Teacher Mode */}
      {user?.role === 'teacher' && (
        <View style={styles.section}>
          <TouchableOpacity style={styles.teacherButton} onPress={handleTeacherMode}>
            <Icon name="school" size={24} color="white" />
            <Text style={styles.teacherButtonText}>Teacher Dashboard</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3B82F6',
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#E3F2FD',
    marginBottom: 15,
  },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  roleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileLabel: {
    fontSize: 16,
    color: '#666',
  },
  profileValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  teacherButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teacherButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;