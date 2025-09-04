// simulatorClient.ts
export async function sendToSimulator(messages: { role: string; content: string }[]) {
  try {
    const response = await fetch("/api/simulator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Simulator request failed:", error);
    return { role: "assistant", content: "⚠️ Error contacting simulator API" };
  }
}
