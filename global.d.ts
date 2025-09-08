// global.d.ts

// Make SpeechRecognition available globally to TypeScript
declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof webkitSpeechRecognition;
}

export {};
