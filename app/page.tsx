"use client";

import { useEffect, useState } from "react";
import InteractiveAvatar from "@/components/InteractiveAvatar";
import TranscriptionPanel, { Message } from "@/components/TranscriptionPanel";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Optional: Replace this with actual bot logic or HeyGen API
  



  // 🎤 Speech recognition logic
  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = async (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setMessages((prev) => [...prev, { sender: "User", text: transcript }]);

    };

    recognition.start();
    return () => recognition.stop();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row">
      {/* Avatar area - 75% */}
      <div className="w-3/4 h-full flex items-center justify-center bg-gray-100 text-gray-800">
        <InteractiveAvatar />
      </div>

      {/* Transcription panel - 25% */}
      <div className="w-1/4 h-full overflow-y-auto border-l border-gray-300 bg-white">
        <TranscriptionPanel messages={messages} />
      </div>
    </div>
  );
}
