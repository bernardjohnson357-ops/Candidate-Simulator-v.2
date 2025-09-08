// global.d.ts

// These tell TypeScript about the SpeechRecognition constructor on window
interface Window {
  SpeechRecognition: typeof window.SpeechRecognition | undefined;
  webkitSpeechRecognition: typeof window.webkitSpeechRecognition | undefined;
}

// Use `any` for the instance type
type SpeechRecognition = any;

export {};
