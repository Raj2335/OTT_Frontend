import React, { useEffect, useRef, useState } from "react";
import sendMessage from "../services/botService";

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi — I am your support bot. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const doSend = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    try {
      console.log("ChatBot: sending to botService:", text);
      const botReply = await sendMessage(text);
      console.log("ChatBot: botService replied:", botReply);
      setMessages((m) => [...m, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("ChatBot: error calling botService:", err);
      const errMsg = err?.message || JSON.stringify(err) || "unknown error";
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `Sorry, something went wrong: ${errMsg}`,
        },
      ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-stretch">
        <div className="w-full h-full rounded-lg overflow-hidden border shadow-md bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col mx-auto">
          <div className="px-4 py-2 mt-2 font-semibold text-white bg-gradient-to-r text-center bg-emerald-800"
         
         >
            Support Chat
          </div>
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-3 bg-transparent"
              style={{
                background:
                  "radial-gradient(ellipse 100% 100% at 50% 30%, rgba(70, 192, 141, 0.25), transparent 70%), #000000",
              }}

          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    m.from === "user"
                      ? "bg-sky-500 text-white"
                      : "bg-white text-slate-900"
                  } max-w-[78%] px-3 py-2 rounded-xl break-words`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-4 bg-slate-900">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message... (Enter to send)"
              className="flex-1 h-8 p-1 rounded bg-slate-800 text-white border border-slate-700 resize-none text-sm"
            />
            <button
              onClick={doSend}
              className="bg-emerald-500 text-white px-3 py-1 rounded text-sm h-8"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
