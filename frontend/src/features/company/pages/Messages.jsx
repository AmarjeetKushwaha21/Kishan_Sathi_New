import { useEffect, useState } from 'react';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import messageService from '../services/messageService';

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState('CONV-1');
  const [newText, setNewText] = useState('');

  const loadConversations = () => {
    messageService.getConversations().then((data) => {
      setConversations(data);
    });
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newText.trim() || !activeConv) return;
    await messageService.sendMessage(activeConv.id, newText.trim());
    setNewText('');
    loadConversations();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Farmer Direct Communications
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Discuss crop specifications, moisture results, and loading schedules directly with growers.
        </p>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-12 min-h-[520px]">
        {/* Left: Conversation List */}
        <div className="border-b border-gray-200 p-3 dark:border-gray-800 md:col-span-4 md:border-b-0 md:border-r">
          <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Active Chats ({conversations.length})
          </span>
          <div className="mt-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setActiveConvId(conv.id)}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                  activeConvId === conv.id
                    ? 'bg-primary-50 dark:bg-primary-950/60'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <img
                  src={conv.avatar}
                  alt={conv.farmerName}
                  className="h-10 w-10 rounded-full object-cover shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate text-xs font-bold text-gray-900 dark:text-white">
                      {conv.farmerName}
                    </h3>
                    <span className="text-[10px] text-gray-400">{conv.time}</span>
                  </div>
                  <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                    {conv.crop}
                  </p>
                  <p className="truncate text-[11px] text-gray-600 dark:text-gray-300">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[9px] font-bold text-white">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Message Window */}
        <div className="flex flex-col justify-between p-4 sm:p-6 md:col-span-8">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConv.avatar}
                    alt={activeConv.farmerName}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">
                      {activeConv.farmerName}
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      {activeConv.location} • Lot: {activeConv.crop}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Bubbles */}
              <div className="flex-1 space-y-3 overflow-y-auto py-4">
                {activeConv.messages.map((m, idx) => {
                  const isMe = m.sender === 'company';
                  return (
                    <div
                      key={idx}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-2xl px-4 py-2.5 text-xs shadow-sm sm:max-w-md ${
                          isMe
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span
                          className={`mt-1 block text-[9px] text-right ${
                            isMe ? 'text-primary-200' : 'text-gray-400'
                          }`}
                        >
                          {m.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <input
                  type="text"
                  placeholder={`Reply to ${activeConv.farmerName}…`}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="focus-ring flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
                />
                <button
                  type="submit"
                  className="focus-ring flex items-center justify-center rounded-xl bg-primary-600 px-4 text-white hover:bg-primary-700 active:bg-primary-800"
                >
                  <FiSend className="text-base" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
