import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, TriangleAlert } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function generateUUID() {
  return uuidv4();
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Himanshu bot. How can I assist you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      const newSessionId = generateUUID();
      setSessionId(newSessionId);
    }
  }, [sessionId]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;

    const userInput = inputValue;
    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const BASE_URL = import.meta.env.VITE_ASK_HIMANSHU;

    try {
      const response = await fetch(`${BASE_URL}/api/AskHimanshu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Once streaming starts, hide typing indicator and create bot message
      setIsTyping(false);

      const botMessageId = Date.now() + 1;
      const botMessage = {
        id: botMessageId,
        text: "",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            try {
              const parsed = JSON.parse(data);

              if (parsed.done) {
                break;
              }

              if (parsed.content) {
                accumulatedText = parsed.content;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText }
                      : msg
                  )
                );
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      }

      // If no text was accumulated, show error
      if (!accumulatedText) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: "Sorry, I couldn't process that request." }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setIsTyping(false);

      const botMessageId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format markdown-style text to JSX
  const formatMessage = (text) => {
    const lines = text.split("\n");

    return lines.map((line, i) => {
      let formattedLine = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-green-400">$1</strong>'
      );
      formattedLine = formattedLine.replace(
        /__(.*?)__/g,
        '<strong class="font-semibold text-green-400">$1</strong>'
      );

      if (line.trim().startsWith("*") && !line.trim().startsWith("**")) {
        const bulletText = line.trim().substring(1).trim();
        const formattedBullet = bulletText.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold text-green-400">$1</strong>'
        );
        return (
          <div key={i} className="flex gap-2 ml-2 items-start">
            <span className="text-green-400 mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: formattedBullet }} />
          </div>
        );
      }

      if (line.trim()) {
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }

      return <div key={i} className="h-2" />;
    });
  };

  return (
    <>
      {/* Draggable Avatar Button */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        className="fixed bottom-40 left-6 z-50 cursor-move"
        whileHover={{ scale: isDragging ? 1 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={() => !isDragging && setIsOpen(true)}
          className="relative md:w-16 md:h-16 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 shadow-lg flex items-center justify-center text-white overflow-hidden group"
          animate={{
            boxShadow: [
              "0 4px 20px rgba(34,197,94,0.3)",
              "0 4px 30px rgba(59,130,246,0.5)",
              "0 4px 20px rgba(34,197,94,0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageCircle className="w-4 h-4 md:w-7 md:h-7 relative z-10" />

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed md:bottom-24 bottom-30 w-80 h-[500px] left-6 md:w-96 md:h-[600px] bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AskHimanshu</h3>
                  <p className="text-white/80 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
              <p className="flex items-start gap-2 p-2 bg-yellow-50 text-yellow-700 text-xs rounded-md border border-yellow-200 shadow-sm">
                <TriangleAlert className="mt-0.5 w-4 h-4 flex-shrink-0" />
                <span>
                  First response may take a little time due to free service
                  deployment of render.
                </span>
              </p>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-none"
                        : "bg-slate-800 text-gray-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <div className="text-sm leading-relaxed space-y-1">
                      {message.sender === "bot"
                        ? formatMessage(message.text)
                        : message.text}
                    </div>
                    {message.text && (
                      <p
                        className={`text-xs mt-1.5 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900 border-t border-slate-700">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 text-sm sm:text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="md:w-10 md:h-10 w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white shadow-md hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="md:w-5 md:h-5 w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;
