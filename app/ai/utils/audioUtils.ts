// app/utils/audioUtils.ts

/**
 * Simple text-to-speech wrapper using the Web Speech API
 * Narrator will read text aloud to the user.
 */
export function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Optional: choose a default voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    window.speechSynthesis.speak(utterance);
  }
}
