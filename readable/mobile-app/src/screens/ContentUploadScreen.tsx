import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContentUploadScreen: React.FC = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setSelectedFile(result);
        // In a real app, you'd process the file content here
        setContent('Sample content from uploaded file...');
      }
    } catch (err) {
      console.error('Document picker error:', err);
    }
  };

  const handleUpload = () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please fill in title and content');
      return;
    }

    // Mock upload - in real app, this would send to backend
    Alert.alert(
      'Success!',
      'Content uploaded successfully! Students can now access this lesson.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Content</Text>
        <Text style={styles.subtitle}>Create new reading lessons for your students</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Lesson Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Lesson Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <View style={styles.difficultyContainer}>
          <Text style={styles.label}>Difficulty Level:</Text>
          <View style={styles.difficultyButtons}>
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.difficultyButton,
                  difficulty === level && styles.difficultyButtonActive,
                ]}
                onPress={() => setDifficulty(level)}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    difficulty === level && styles.difficultyTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.fileButton} onPress={pickDocument}>
          <Icon name="attach-file" size={20} color="#3B82F6" />
          <Text style={styles.fileButtonText}>
            {selectedFile ? selectedFile.name : 'Select File (PDF or Text)'}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Or paste content directly here..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Icon name="cloud-upload" size={20} color="white" />
          <Text style={styles.uploadButtonText}>Upload Lesson</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  form: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyButtonActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },
  difficultyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  difficultyTextActive: {
    color: 'white',
  },
  fileButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 10,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ContentUploadScreen;