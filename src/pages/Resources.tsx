import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { BookOpen, Send, Plus, MessageSquare, FileText, Mail } from 'lucide-react';
import { NoteCard } from '@/components/resources/NoteCard';
import { ChatMessage } from '@/components/resources/ChatMessage';
import { MentorChatList } from '@/components/resources/MentorChatList';

// Mock data for shared notes
const initialNotes = [
  {
    id: 'n1',
    title: 'Interview Preparation Guide',
    author: 'Dr. Lisa Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '2 weeks ago',
    summary: 'A comprehensive guide covering common technical and behavioral interview questions with strategies for effective answers.',
    category: 'Career Development',
    likes: 24,
    comments: 5
  },
  {
    id: 'n2',
    title: 'Networking Best Practices',
    author: 'Marcus Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '1 month ago',
    summary: 'Key strategies for building and maintaining a professional network, including virtual networking tips.',
    category: 'Professional Growth',
    likes: 17,
    comments: 3
  },
  {
    id: 'n3',
    title: 'Resume and Cover Letter Templates',
    author: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    date: '2 months ago',
    summary: 'Collection of industry-specific resume and cover letter templates with customization guidelines.',
    category: 'Job Search',
    likes: 42,
    comments: 8
  }
];

// Mock data for chat messages
const initialMessages = [
  {
    id: 'm1',
    sender: 'Dr. Lisa Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Has anyone gone through the Product Management interview at Google recently? Would appreciate some insights!',
    timestamp: '10:30 AM',
    isCurrentUser: false
  },
  {
    id: 'm2',
    sender: 'Marcus Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'I went through it last month. The process has 5 rounds including a case study. Happy to share more details.',
    timestamp: '10:35 AM',
    isCurrentUser: false
  },
  {
    id: 'm3',
    sender: 'You',
    avatar: '',
    content: 'I would also be interested in hearing more about this. What kind of preparation would you recommend?',
    timestamp: '10:42 AM',
    isCurrentUser: true
  }
];

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
  }
];

const Resources = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [messages, setMessages] = useState(initialMessages);
  const [mentors, setMentors] = useState(initialMentors);
  const [newMessage, setNewMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [privateMessage, setPrivateMessage] = useState('');
  const [privateChats, setPrivateChats] = useState<Record<string, any[]>>({
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
    ]
  });
  const [newNote, setNewNote] = useState({
    title: '',
    summary: '',
    category: 'Career Development'
  });

  // Handler for sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `m${messages.length + 1}`,
      sender: 'You',
      avatar: '',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // Handler for creating a new note
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.summary) return;
    
    const createdNote = {
      id: `n${notes.length + 1}`,
      title: newNote.title,
      author: 'You',
      avatar: '',
      date: 'Just now',
      summary: newNote.summary,
      category: newNote.category,
      likes: 0,
      comments: 0
    };
    
    setNotes([createdNote, ...notes]);
    setNewNote({ title: '', summary: '', category: 'Career Development' });
    setIsDialogOpen(false);
  };

  // Handler for sending private messages
  const handleSendPrivateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateMessage.trim() || !selectedMentor) return;

    const newPrivateMsg = {
      id: `pm${Date.now()}`,
      sender: 'You',
      avatar: '',
      content: privateMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    // Update private chats
    setPrivateChats(prev => ({
      ...prev,
      [selectedMentor]: [...(prev[selectedMentor] || []), newPrivateMsg]
    }));

    // Update unread count - reset for selected mentor
    setMentors(prev => prev.map(mentor => 
      mentor.id === selectedMentor 
        ? { ...mentor, unread: 0 } 
        : mentor
    ));

    setPrivateMessage('');
  };

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

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resources & Community</h1>
          <p className="mt-2 text-lg text-gray-600">
            Share knowledge, ask questions, and connect with other professionals
          </p>
        </div>

        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="notes">
              <FileText className="h-4 w-4 mr-2" />
              Shared Notes
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Community Chat
            </TabsTrigger>
            <TabsTrigger value="private">
              <Mail className="h-4 w-4 mr-2" />
              Private Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Knowledge Library</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Share Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Share a New Note</DialogTitle>
                    <DialogDescription>
                      Create and share a document with the community. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateNote}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={newNote.title}
                          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                          className="col-span-3"
                          placeholder="Enter title"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="summary" className="text-right mt-2">
                          Content
                        </Label>
                        <Textarea
                          id="summary"
                          value={newNote.summary}
                          onChange={(e) => setNewNote({ ...newNote, summary: e.target.value })}
                          className="col-span-3"
                          placeholder="Write your note content"
                          required
                          rows={5}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <select
                          id="category"
                          value={newNote.category}
                          onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option>Career Development</option>
                          <option>Technical Skills</option>
                          <option>Job Search</option>
                          <option>Professional Growth</option>
                          <option>Work-Life Balance</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Share Note</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Discussion</CardTitle>
                <CardDescription>
                  Ask questions and share knowledge with mentors and mentees
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] p-4 overflow-y-auto flex flex-col space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" /> Send
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="private" className="mt-6">
            <Card className="h-[600px] flex">
              <div className="w-1/3 border-r overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Mentors</CardTitle>
                  <CardDescription>
                    Ask private questions to your mentors
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto flex-grow">
                  <MentorChatList 
                    mentors={mentors} 
                    selectedMentorId={selectedMentor} 
                    onSelectMentor={handleSelectMentor} 
                  />
                </CardContent>
              </div>
              <div className="w-2/3 flex flex-col">
                {selectedMentor ? (
                  <>
                    <CardHeader className="border-b pb-3">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage 
                            src={mentors.find(m => m.id === selectedMentor)?.avatar} 
                            alt={mentors.find(m => m.id === selectedMentor)?.name} 
                          />
                          <AvatarFallback>
                            {mentors.find(m => m.id === selectedMentor)?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            {mentors.find(m => m.id === selectedMentor)?.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {mentors.find(m => m.id === selectedMentor)?.title} at {mentors.find(m => m.id === selectedMentor)?.company}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow overflow-y-auto h-[400px] flex flex-col space-y-4">
                      {privateChats[selectedMentor]?.map((message, i) => (
                        <ChatMessage key={i} message={message} />
                      )) || (
                        <div className="text-center text-gray-500 mt-10">
                          No messages yet. Start the conversation!
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <form onSubmit={handleSendPrivateMessage} className="flex w-full gap-2">
                        <Input
                          value={privateMessage}
                          onChange={(e) => setPrivateMessage(e.target.value)}
                          placeholder="Type your private message..."
                          className="flex-1"
                        />
                        <Button type="submit" disabled={!privateMessage.trim()}>
                          <Send className="h-4 w-4 mr-2" /> Send
                        </Button>
                      </form>
                    </CardFooter>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-center p-8">
                    <div>
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Select a mentor</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Choose a mentor from the list to start a private conversation
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Resources;
