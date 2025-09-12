// global.d.ts

declare module "@neondatabase/serverless" {
  export function neon(connectionString: string): any;
}
// Declare both the type and the constructor globally
type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

declare var SpeechRecognition: any;
declare var webkitSpeechRecognition: any;

export {};
