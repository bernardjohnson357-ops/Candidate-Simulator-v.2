// app/utils/audioUtils.ts

export function speak(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;       // normal speed
  utterance.pitch = 1;      // normal tone
  utterance.volume = 1;     // max volume

  // optional: choose a specific voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.toLowerCase().includes("female")) || voices[0];
  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.cancel(); // stop any ongoing speech
  window.speechSynthesis.speak(utterance);
}
