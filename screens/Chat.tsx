
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Check, Sparkles, Image as ImageIcon, Mic } from 'lucide-react';
import { ChatSession, ChatMessage, Property } from '../types';
import { generateSmartReply } from '../services/gemini';
import { Input, Button } from '../components/UI';

interface ChatListProps {
  chats: ChatSession[];
}

export const ChatListScreen: React.FC<ChatListProps> = ({ chats }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-white pb-20">
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate('/')} className="mr-4 p-2 hover:bg-gray-50 rounded-full"><ArrowLeft size={20}/></button>
        <h1 className="font-bold text-xl">Messages</h1>
      </div>

      <div className="p-4 space-y-2">
        {chats.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No conversations yet.</p>
            <p className="text-xs mt-2">Start chatting from a property page.</p>
          </div>
        ) : (
          chats.map(chat => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            return (
              <motion.div 
                key={chat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer"
              >
                <div className="relative">
                  <img src={chat.owner.avatar} alt={chat.owner.name} className="w-14 h-14 rounded-full object-cover border border-gray-100" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-900 truncate">{chat.owner.name}</h3>
                    <span className="text-xs text-gray-400">{lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                  </div>
                  <p className={`text-sm truncate ${lastMsg?.isRead ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>
                    {lastMsg?.text || 'Start a conversation'}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

interface ChatDetailProps {
  chats: ChatSession[];
  onSendMessage: (chatId: string, text: string) => void;
}

export const ChatDetailScreen: React.FC<ChatDetailProps> = ({ chats, onSendMessage }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chat = chats.find(c => c.id === id);
  const [inputText, setInputText] = useState('');
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (chat && chat.messages.length > 0) {
      const lastMsg = chat.messages[chat.messages.length - 1];
      // Generate smart replies if last message was from 'other'
      if (lastMsg.sender === 'other') {
        setLoadingReplies(true);
        const history = chat.messages.slice(-5).map(m => `${m.sender === 'user' ? 'Me' : 'Owner'}: ${m.text}`);
        generateSmartReply(history).then(replies => {
          setSmartReplies(replies);
          setLoadingReplies(false);
        });
      } else {
        setSmartReplies([]);
      }
    }
  }, [chat?.messages.length, id]);

  if (!chat) return <div>Chat not found</div>;

  const handleSend = (text: string = inputText) => {
    if (!text.trim()) return;
    onSendMessage(chat.id, text);
    setInputText('');
    setSmartReplies([]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
             <img src={chat.owner.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold text-sm">{chat.owner.name}</h2>
            <p className="text-xs text-green-600 font-medium">Online</p>
          </div>
        </div>
        <div className="flex gap-2 text-gray-600">
          <button className="p-2 hover:bg-gray-100 rounded-full"><Phone size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><Video size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center text-xs text-gray-400 my-4">Today</div>
        {chat.messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] px-4 py-3 shadow-sm text-sm leading-relaxed
                ${msg.sender === 'user' 
                  ? 'bg-primary text-text rounded-2xl rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-2xl rounded-tl-none'
                }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.sender === 'user' ? 'text-green-900/60' : 'text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                {msg.sender === 'user' && <Check size={12} />}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Smart Replies & Input */}
      <div className="bg-white p-4 border-t border-gray-100 shrink-0 pb-safe">
        <AnimatePresence>
          {(smartReplies.length > 0 || loadingReplies) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex gap-2 overflow-x-auto no-scrollbar mb-3"
            >
               {loadingReplies ? (
                 <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full text-xs text-gray-400">
                   <Sparkles size={12} className="animate-spin" /> Thinking...
                 </div>
               ) : (
                 <>
                   <div className="flex items-center gap-1 px-2 text-primary">
                      <Sparkles size={16} fill="currentColor" />
                   </div>
                   {smartReplies.map((reply, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(reply)}
                        className="px-4 py-2 bg-card border border-blue-100 text-blue-800 text-xs font-medium rounded-full whitespace-nowrap hover:bg-blue-50 transition-colors"
                      >
                        {reply}
                      </button>
                   ))}
                 </>
               )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <ImageIcon size={22} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full pl-4 pr-10 py-3 outline-none transition-all text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mic size={18} />
            </button>
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-3 bg-primary text-text rounded-full shadow-lg shadow-primary/30 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
