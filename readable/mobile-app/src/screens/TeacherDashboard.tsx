import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { mockProgress, mockSessions } from '../data/mockData';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TeacherDashboard: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();
  const [students] = useState([
    { id: '1', name: 'Alice Johnson', progress: mockProgress },
    { id: '2', name: 'Bob Smith', progress: { ...mockProgress, averageAccuracy: 75, totalSessions: 8 } },
    { id: '3', name: 'Charlie Brown', progress: { ...mockProgress, averageAccuracy: 88, totalSessions: 12 } },
  ]);

  const handleStudentPress = (student: any) => {
    Alert.alert(
      `${student.name}'s Progress`,
      `Accuracy: ${student.progress.averageAccuracy}%\nSessions: ${student.progress.totalSessions}\nStreak: ${student.progress.currentStreak} days`,
      [{ text: 'OK' }]
    );
  };

  const handleUploadContent = () => {
    navigation.navigate('ContentUpload');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Teacher Dashboard</Text>
        <Text style={styles.subtitle}>Monitor student progress and manage content</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="people" size={30} color="#3B82F6" />
          <Text style={styles.statValue}>{students.length}</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="trending-up" size={30} color="#4CAF50" />
          <Text style={styles.statValue}>
            {Math.round(students.reduce((sum, s) => sum + s.progress.averageAccuracy, 0) / students.length)}%
          </Text>
          <Text style={styles.statLabel}>Avg Accuracy</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="book" size={30} color="#FF9800" />
          <Text style={styles.statValue}>
            {students.reduce((sum, s) => sum + s.progress.totalSessions, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </View>
      </View>

      {/* Student List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Progress</Text>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.studentCard}
              onPress={() => handleStudentPress(item)}
            >
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.studentStats}>
                  {item.progress.totalSessions} sessions • {item.progress.averageAccuracy}% accuracy
                </Text>
              </View>
              <View style={styles.studentProgress}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.progress.averageAccuracy}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{item.progress.averageAccuracy}%</Text>
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content Management</Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleUploadContent}>
          <Icon name="upload" size={24} color="white" />
          <Text style={styles.actionText}>Upload New Content</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Feature', 'Analytics coming soon!')}>
          <Icon name="analytics" size={24} color="white" />
          <Text style={styles.actionText}>View Detailed Analytics</Text>
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
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 5,
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
    width: 100,
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
  studentCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    marginBottom: 10,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  studentStats: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  studentProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 40,
    textAlign: 'right',
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TeacherDashboard;