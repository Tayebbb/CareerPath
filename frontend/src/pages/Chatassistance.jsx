import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";

export default function Chatassistance() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hi! I'm a Gemini-powered chatbot. How can I help?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Add keyframe animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.7;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      
      @keyframes typing {
        0% {
          transform: translateY(0);
          opacity: 0.7;
        }
        20% {
          transform: translateY(-8px);
          opacity: 1;
        }
        40% {
          transform: translateY(0);
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Build history (excluding the current user message)
      const history = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Call backend
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      
      // Add bot response
      setMessages([...newMessages, { role: "model", content: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      setMessages([
        ...newMessages,
        { role: "model", content: "Sorry, something went wrong talking to the server." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <div style={styles.headerIcon}>
          <Sparkles size={24} style={{ color: '#A855F7' }} />
        </div>
        <div>
          <h1 style={styles.title}>AI Assistance</h1>
          <p style={styles.subtitle}>Powered by Gemini</p>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div ref={chatBoxRef} style={styles.chatBox}>
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                ...styles.messageRow,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "model" && (
                <div style={styles.avatar}>
                  <Bot size={18} style={{ color: '#A855F7' }} />
                </div>
              )}
              <div
                style={{
                  ...styles.messageBubble,
                  ...(msg.role === "user" ? styles.userBubble : styles.modelBubble),
                }}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div style={styles.avatarUser}>
                  <User size={18} style={{ color: '#FFFFFF' }} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ ...styles.messageRow, justifyContent: "flex-start" }}
          >
            <div style={styles.avatar}>
              <Bot size={18} style={{ color: '#A855F7' }} />
            </div>
            <div style={{ ...styles.messageBubble, ...styles.modelBubble, ...styles.typingIndicator }}>
              <span style={{...styles.dot, animationDelay: '0s'}}></span>
              <span style={{...styles.dot, animationDelay: '0.2s'}}></span>
              <span style={{...styles.dot, animationDelay: '0.4s'}}></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.inputArea}
      >
        <div style={styles.inputWrapper}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            style={styles.textarea}
            rows={1}
            disabled={loading}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage} 
            style={{
              ...styles.button,
              opacity: loading || !input.trim() ? 0.5 : 1,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
            }} 
            disabled={loading || !input.trim()}
          >
            <Send size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "Poppins, Inter, system-ui, sans-serif",
    height: "calc(100vh - 80px)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 24px",
    background: "rgba(17,21,43,0.6)",
    borderRadius: "16px",
    border: "1px solid rgba(168,85,247,0.12)",
    boxShadow: "0 4px 20px rgba(10,8,30,0.4)",
  },
  headerIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #A855F7, #7C3AED)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 20px rgba(168,85,247,0.3)",
  },
  title: {
    color: "#FFFFFF",
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    background: "linear-gradient(90deg, #A855F7, #D500F9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    color: "rgba(255,255,255,0.5)",
    margin: 0,
    fontSize: "14px",
    fontWeight: "400",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    background: "rgba(17,21,43,0.4)",
    borderRadius: "16px",
    border: "1px solid rgba(168,85,247,0.08)",
    minHeight: "400px",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(168,85,247,0.3) transparent",
  },
  messageRow: {
    display: "flex",
    marginBottom: "20px",
    alignItems: "flex-end",
    gap: "12px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(168,85,247,0.1)",
    border: "1px solid rgba(168,85,247,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarUser: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #A855F7, #7C3AED)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 0 15px rgba(168,85,247,0.3)",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "14px 18px",
    borderRadius: "16px",
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
    fontSize: "15px",
  },
  userBubble: {
    background: "linear-gradient(135deg, #A855F7, #7C3AED)",
    color: "#FFFFFF",
    borderBottomRightRadius: "4px",
    boxShadow: "0 4px 12px rgba(168,85,247,0.2)",
  },
  modelBubble: {
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    border: "1px solid rgba(168,85,247,0.08)",
    borderBottomLeftRadius: "4px",
  },
  typingIndicator: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    padding: "14px 20px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#A855F7",
    display: "inline-block",
    animation: "typing 1.4s infinite ease-in-out",
  },
  inputArea: {
    padding: "0",
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
    padding: "16px 20px",
    background: "rgba(17,21,43,0.6)",
    borderRadius: "16px",
    border: "1px solid rgba(168,85,247,0.12)",
    boxShadow: "0 4px 20px rgba(10,8,30,0.4)",
  },
  textarea: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(168,85,247,0.15)",
    fontSize: "15px",
    fontFamily: "Poppins, Inter, system-ui, sans-serif",
    resize: "none",
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    maxHeight: "120px",
    minHeight: "44px",
  },
  button: {
    padding: "12px 16px",
    background: "linear-gradient(135deg, #A855F7, #7C3AED)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(168,85,247,0.3)",
    transition: "all 0.2s",
    height: "44px",
    width: "44px",
  },
};
