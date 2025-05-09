
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ChatMessage } from '@/components/resources/ChatMessage';
import { MentorChatList } from '@/components/resources/MentorChatList';

// Mock data for mentors
const initialMentors = [
  {
    id: 'm1',
    name: 'Dr. Lisa Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Senior Product Manager',
    company: 'Google',
    lastMessage: 'Happy to help with your interview preparation questions!',
    time: '2 days ago',
    unread: 0
  },
  {
    id: 'm2',
    name: 'Marcus Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Software Engineer',
    company: 'Microsoft',
    lastMessage: 'Let me know if you have any technical questions about the process.',
    time: 'Yesterday',
    unread: 2
  },
  {
    id: 'm3',
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    title: 'UX Designer',
    company: 'Apple',
    lastMessage: 'I shared some resources for the design interview.',
    time: 'Just now',
    unread: 1
  },
  {
    id: 'm4',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    title: 'Data Scientist',
    company: 'Amazon',
    lastMessage: 'Here are the machine learning resources we discussed.',
    time: '3 days ago',
    unread: 0
  }
];

// Mock data for private chat messages
const initialPrivateChats = {
  m1: [
    {
      id: 'pm1',
      sender: 'Dr. Lisa Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'Hello! How can I help you today?',
      timestamp: '10:30 AM',
      isCurrentUser: false
    }
  ],
  m2: [
    {
      id: 'pm2',
      sender: 'Marcus Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Got your message about the technical interview. What specific topics are you struggling with?',
      timestamp: 'Yesterday',
      isCurrentUser: false
    },
    {
      id: 'pm3',
      sender: 'You',
      avatar: '',
      content: 'I need help with system design questions, particularly scalability.',
      timestamp: 'Yesterday',
      isCurrentUser: true
    },
  ],
  m3: [
    {
      id: 'pm4',
      sender: 'Emma Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      content: 'Here are some portfolio templates I mentioned. Let me know if you need help customizing them.',
      timestamp: 'Just now',
      isCurrentUser: false
    }
  ],
  m4: [
    {
      id: 'pm5',
      sender: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      content: 'I recommend focusing on these machine learning algorithms for your interview prep.',
      timestamp: '3 days ago',
      isCurrentUser: false
    }
  ]
};

const Chat = () => {
  const [mentors, setMentors] = useState(initialMentors);
  const [privateChats, setPrivateChats] = useState(initialPrivateChats);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Handler for selecting a mentor to chat with
  const handleSelectMentor = (mentorId: string) => {
    setSelectedMentor(mentorId);
    
    // Reset unread count for selected mentor
    setMentors(prev => prev.map(mentor => 
      mentor.id === mentorId 
        ? { ...mentor, unread: 0 } 
        : mentor
    ));
  };

  // Handler for sending private messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMentor) return;

    const newPrivateMsg = {
      id: `pm${Date.now()}`,
      sender: 'You',
      avatar: '',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    // Update private chats
    setPrivateChats(prev => ({
      ...prev,
      [selectedMentor]: [...(prev[selectedMentor] || []), newPrivateMsg]
    }));

    setNewMessage('');
  };

  // Get the selected mentor's name
  const getSelectedMentorName = () => {
    if (!selectedMentor) return '';
    const mentor = mentors.find(m => m.id === selectedMentor);
    return mentor ? mentor.name : '';
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mentor Chat</h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect and chat with your mentors
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Mentor List */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold text-gray-700">Your Mentors</h2>
              </div>
              <div className="overflow-y-auto h-[calc(600px-57px)]">
                <MentorChatList 
                  mentors={mentors}
                  selectedMentorId={selectedMentor}
                  onSelectMentor={handleSelectMentor}
                />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedMentor ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 bg-gray-50 border-b">
                    <h3 className="font-semibold text-gray-700">{getSelectedMentorName()}</h3>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {privateChats[selectedMentor]?.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        className="bg-mentor-primary hover:bg-mentor-secondary"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <div className="h-16 w-16 mx-auto bg-mentor-light rounded-full flex items-center justify-center mb-4">
                      <Send className="h-8 w-8 text-mentor-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a mentor to start chatting</h3>
                    <p className="text-gray-500">
                      Choose from your mentors list on the left to begin a conversation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
