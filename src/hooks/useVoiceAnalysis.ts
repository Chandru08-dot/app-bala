import { useState, useEffect, useCallback, useRef } from 'react';

export const useVoiceAnalysis = (targetText: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [accuracy, setAccuracy] = useState(100);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const words = targetText.split(/\s+/).filter(Boolean);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const finalWord = event.results[i][0].transcript.trim().toLowerCase();
          setTranscript(prev => prev + ' ' + finalWord);
          matchWord(finalWord);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start(); // Auto-restart if we're supposed to be recording
      }
    };

    recognitionRef.current = recognition;
  }, [isRecording, targetText]);

  const matchWord = (spokenWord: string) => {
    // Simple matching logic: find the next word in the sequence that matches
    // This handles hesitations and repetitions roughly
    setCurrentWordIndex(prev => {
      const nextIndex = prev + 1;
      if (nextIndex < words.length) {
        const targetWord = words[nextIndex].toLowerCase().replace(/[.,!?;:]/g, '');
        if (spokenWord.includes(targetWord)) {
          return nextIndex;
        }
      }
      return prev;
    });
  };

  const startRecording = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        setError(null);
        setCurrentWordIndex(-1);
        setTranscript('');
      } catch (e) {
        console.error("Speech recognition start error:", e);
      }
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return {
    isRecording,
    currentWordIndex,
    accuracy,
    transcript,
    error,
    startRecording,
    stopRecording,
    words
  };
};
