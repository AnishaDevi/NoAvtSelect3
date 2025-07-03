"use client";

import React from "react";


export type Message = {
  sender: "User" | "Bot";
  text: string;
};

type Props = {
  messages: Message[];
};

export default function TranscriptionPanel({ messages }: Props) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transcription</h2>
      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-400">No transcriptions yet...</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md ${
                msg.sender === "Bot"
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
