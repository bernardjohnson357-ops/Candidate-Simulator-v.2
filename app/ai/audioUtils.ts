// app/ai/audioUtils.ts
export function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";  // change language if needed
    utterance.rate = 1;        // 1 = normal speed
    utterance.pitch = 1;       // 1 = normal tone
    window.speechSynthesis.speak(utterance);
  }
}
