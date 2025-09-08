// app/types/global.d.ts

// Tell TypeScript about the speech recognition constructors
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

type SpeechRecognition = any;

export {};
