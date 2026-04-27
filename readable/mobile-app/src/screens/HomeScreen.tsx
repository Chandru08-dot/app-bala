import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { mockProgress, mockSessions } from '../data/mockData';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();

  const recentSession = mockSessions[mockSessions.length - 1];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, {user?.name}!</Text>
        <Text style={styles.subtitle}>Ready for your next reading adventure?</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="trending-up" size={30} color="#4CAF50" />
          <Text style={styles.statValue}>{mockProgress.averageAccuracy}%</Text>
          <Text style={styles.statLabel}>Avg Accuracy</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="local-fire" size={30} color="#FF9800" />
          <Text style={styles.statValue}>{mockProgress.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="book" size={30} color="#2196F3" />
          <Text style={styles.statValue}>{mockProgress.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>

      {/* Recent Session */}
      {recentSession && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Mission Review</Text>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewTitle}>Mission Complete! 🎉</Text>
            <View style={styles.metrics}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Accuracy</Text>
                <Text style={styles.metricValue}>{recentSession.accuracy}%</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Speed</Text>
                <Text style={styles.metricValue}>{recentSession.speed} WPM</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Focus</Text>
                <Text style={styles.metricValue}>{recentSession.focus}%</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{recentSession.review}</Text>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Missions')}
          >
            <Icon name="map" size={24} color="white" />
            <Text style={styles.actionText}>Explore Missions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Reading')}
          >
            <Icon name="play-arrow" size={24} color="white" />
            <Text style={styles.actionText}>Start Reading</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Squirrel Mascot */}
      <View style={styles.mascotContainer}>
        <Text style={styles.mascotText}>🐿️ "Keep reading, you're doing amazing!"</Text>
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
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: -20,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: (width - 60) / 3,
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reviewCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: (width - 50) / 2,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  mascotContainer: {
    alignItems: 'center',
    padding: 20,
  },
  mascotText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default HomeScreen;