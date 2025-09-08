// global.d.ts

// This declares SpeechRecognition as a global type for TypeScript
declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof webkitSpeechRecognition;
}

export {};
