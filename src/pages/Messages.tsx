
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Search, SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Messages = () => {
  // Mock conversation data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      lastMessage: 'Looking forward to our session tomorrow!',
      time: '10:30 AM',
      unread: true,
    },
    {
      id: 2,
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      lastMessage: 'Thanks for your advice yesterday.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 3,
      name: 'David Wong',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      lastMessage: 'I'll send you the resources we discussed.',
      time: 'Yesterday',
      unread: false,
    },
  ];

  // Mock messages for the active conversation
  const messages = [
    {
      id: 1,
      sender: 'Sarah Chen',
      content: 'Hi there! How are your preparations going for the interview?',
      time: '10:15 AM',
      isSelf: false,
    },
    {
      id: 2,
      sender: 'You',
      content: 'I've been practicing algorithm questions and reviewing system design concepts.',
      time: '10:20 AM',
      isSelf: true,
    },
    {
      id: 3,
      sender: 'Sarah Chen',
      content: 'That's great! Do you want me to conduct a mock interview in our next session?',
      time: '10:25 AM',
      isSelf: false,
    },
    {
      id: 4,
      sender: 'You',
      content: 'That would be extremely helpful, thank you!',
      time: '10:28 AM',
      isSelf: true,
    },
    {
      id: 5,
      sender: 'Sarah Chen',
      content: 'Looking forward to our session tomorrow!',
      time: '10:30 AM',
      isSelf: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communication with your mentors and mentees</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-[500px]">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`flex items-center p-3 hover:bg-muted cursor-pointer ${
                      conversation.id === 1 ? 'bg-muted' : ''
                    }`}
                  >
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <span className="w-2 h-2 bg-mentor-primary rounded-full ml-2"></span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card className="md:col-span-2 flex flex-col">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Sarah Chen</CardTitle>
                  <CardDescription className="text-xs">Mentor • Software Engineering</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto flex-grow">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isSelf 
                          ? 'bg-mentor-primary text-white' 
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isSelf ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" className="bg-mentor-primary">
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
