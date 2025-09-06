// pages/index.tsx
import { useState, useRef, useEffect } from "react";

type Message = {
role: "user" | "assistant" | "system";
content: string;
};

export default function Home() {
const [messages, setMessages] = useState<Message[]>([
{ role: "assistant", content: "Welcome to the Candidate Simulator! Type 'start' to begin Module 0." }
]);
const [input, setInput] = useState("");
const [candidateCoins, setCandidateCoins] = useState(50); // default starting coins
const messagesEndRef = useRef<HTMLDivElement>(null);

// Scroll to the latest message
useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const sendMessage = async () => {
if (!input.trim()) return;

const newMessages: Message[] = [...messages, { role: "user", content: input }];  
setMessages(newMessages);  
setInput("");  

try {  
  const res = await fetch("/api/simulator", {  
    method: "POST",  
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify({  
      messages: newMessages,  
      currentModule: messages.length, // optional tracking  
      candidateCoins  
    }),  
  });  

  const data = await res.json();  

  setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);  
  if (data.candidateCoins !== undefined) setCandidateCoins(data.candidateCoins);  
} catch (err) {  
  console.error(err);  
  setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error: Could not get a response." }]);  
}

};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
if (e.key === "Enter") sendMessage();
};

return (
<main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", background: "#000", padding: "1rem" }}>
<h1>Candidate Simulator AI</h1>

<div className="bg-white border border-gray-300 rounded-lg p-4 w-[90%] max-w-3xl h-[80vh] min-h-[400px] overflow-y-auto mx-auto">

{messages.map((m, i) => (
<div key={i} className="my-2 whitespace-pre-wrap">
<strong>{m.role === "assistant" ? "Simulator" : "You"}:</strong> {m.content}
</div>
))}

  <div ref={messagesEndRef} />  
</div>  <div style={{ display: "flex", width: "100%", maxWidth: "700px" }}>  
    <input  
      type="text"  
      value={input}  
      onChange={e => setInput(e.target.value)}  
      onKeyDown={handleKeyDown}  
      style={{ flex: 1, padding: "0.5rem" }}  
      placeholder="Type your response..."  
    />  
    <button onClick={sendMessage} style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>Send</button>  
  </div>  
</main>

);
}


