import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { mockMissions } from '../data/mockData';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const MissionMapScreen: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();
  const [missions, setMissions] = useState(mockMissions);

  const handleMissionPress = (mission: any) => {
    if (!mission.unlocked) {
      Alert.alert('Mission Locked', 'Complete previous missions to unlock this one!');
      return;
    }

    navigation.navigate('Reading', { mission });
  };

  const renderPlanet = (mission: any, index: number) => {
    const isUnlocked = mission.unlocked;
    const isCompleted = mission.completed;

    return (
      <TouchableOpacity
        key={mission.id}
        style={[
          styles.planet,
          {
            backgroundColor: isCompleted ? '#4CAF50' : isUnlocked ? '#3B82F6' : '#ccc',
            left: (index % 2) * (width / 2 - 60),
            top: Math.floor(index / 2) * 120 + 100,
          },
        ]}
        onPress={() => handleMissionPress(mission)}
      >
        <Text style={styles.planetEmoji}>
          {isCompleted ? '🌟' : isUnlocked ? '🪐' : '🔒'}
        </Text>
        <Text style={styles.planetName}>{mission.planet}</Text>
        <Text style={styles.missionTitle} numberOfLines={2}>
          {mission.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Solar System Missions</Text>
        <Text style={styles.subtitle}>Explore planets and unlock reading adventures!</Text>
      </View>

      <ScrollView style={styles.mapContainer} contentContainerStyle={styles.mapContent}>
        <View style={styles.stars}>
          {[...Array(20)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.star,
                {
                  left: Math.random() * width,
                  top: Math.random() * 600,
                },
              ]}
            />
          ))}
        </View>

        {missions.map((mission, index) => renderPlanet(mission, index))}

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#ccc' }]} />
            <Text style={styles.legendText}>Locked</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.squirrelContainer}>
        <Text style={styles.squirrelText}>
          🐿️ "Click on planets to start missions! Complete them to unlock new worlds!"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
  mapContainer: {
    flex: 1,
  },
  mapContent: {
    padding: 20,
    paddingBottom: 100,
  },
  stars: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  planet: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  planetEmoji: {
    fontSize: 24,
  },
  planetName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  missionTitle: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    marginTop: 2,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    padding: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    color: 'white',
    fontSize: 14,
  },
  squirrelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    padding: 15,
  },
  squirrelText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default MissionMapScreen;