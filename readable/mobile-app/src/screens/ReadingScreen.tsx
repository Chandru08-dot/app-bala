import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const ReadingScreen: React.FC = ({ route, navigation }: any) => {
  const { mission } = route.params;
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [sessionData, setSessionData] = useState({
    accuracy: 0,
    speed: 0,
    focus: 0,
    hesitations: 0,
    startTime: new Date(),
  });

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const audioPermission = await Audio.requestPermissionsAsync();
    const cameraPerm = await Camera.requestCameraPermissionsAsync();
    setHasPermission(audioPermission.status === 'granted');
    setCameraPermission(cameraPerm.status === 'granted');
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();

    // Mock analysis - in real app, this would analyze the audio
    const mockAnalysis = {
      accuracy: Math.floor(Math.random() * 20) + 80, // 80-100%
      speed: Math.floor(Math.random() * 30) + 90, // 90-120 WPM
      focus: Math.floor(Math.random() * 20) + 80, // 80-100%
      hesitations: Math.floor(Math.random() * 5), // 0-4 hesitations
    };

    setSessionData(prev => ({
      ...prev,
      ...mockAnalysis,
      endTime: new Date(),
    }));

    const uri = recording.getURI();
    console.log('Recording saved at:', uri);
  };

  const completeSession = () => {
    const review = generateReview(sessionData);
    Alert.alert(
      'Mission Complete! 🎉',
      review,
      [
        {
          text: 'View Review',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const generateReview = (data: any) => {
    let review = `Great job on "${mission.title}"!\n\n`;
    review += `📊 Accuracy: ${data.accuracy}%\n`;
    review += `⚡ Speed: ${data.speed} words/min\n`;
    review += `🎯 Focus: ${data.focus}%\n`;

    if (data.accuracy > 90) {
      review += '\n🌟 Excellent reading! You nailed the pronunciation.';
    } else if (data.accuracy > 80) {
      review += '\n👍 Good work! Practice those tricky words a bit more.';
    } else {
      review += '\n💪 Keep practicing! You\'re getting better with each session.';
    }

    if (data.hesitations > 2) {
      review += '\n💡 Tip: Try reading more slowly and confidently.';
    }

    return review;
  };

  const adaptiveTextStyle = {
    fontSize: user?.readingProfile?.fontSize || 16,
    lineHeight: (user?.readingProfile?.fontSize || 16) * (user?.readingProfile?.lineSpacing || 1.5),
    letterSpacing: user?.readingProfile?.wordSpacing || 0.2,
  };

  return (
    <View style={styles.container}>
      {/* Camera for Eye Tracking */}
      {cameraPermission && (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={Camera.Constants.Type.front} />
          <View style={styles.overlay}>
            <Text style={styles.eyeTrackingText}>👁️ Eye tracking active</Text>
          </View>
        </View>
      )}

      {/* Reading Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.missionTitle}>{mission.title}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.readingText, adaptiveTextStyle]}>
            {mission.content}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recording]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={!hasPermission}
        >
          <Icon
            name={isRecording ? 'stop' : 'mic'}
            size={30}
            color="white"
          />
          <Text style={styles.recordText}>
            {isRecording ? 'Stop Recording' : 'Start Reading'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={completeSession}
        >
          <Text style={styles.completeText}>Complete Mission</Text>
        </TouchableOpacity>
      </View>

      {/* Squirrel Guide */}
      <View style={styles.squirrelContainer}>
        <Text style={styles.squirrelText}>
          🐿️ "{isRecording ? 'Reading in progress... Keep going!' : 'Ready to read? Press the mic button!'}"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cameraContainer: {
    height: 200,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
    borderRadius: 5,
  },
  eyeTrackingText: {
    color: 'white',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readingText: {
    color: '#333',
    textAlign: 'left',
  },
  controls: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  recordButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  recording: {
    backgroundColor: '#EF4444',
  },
  recordText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  squirrelContainer: {
    backgroundColor: '#FFF8E1',
    padding: 15,
    alignItems: 'center',
  },
  squirrelText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ReadingScreen;