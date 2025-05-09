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
import { BookOpen, Send, Plus, MessageSquare, FileText, Mail, Book, Archive, File, Folder } from 'lucide-react';
import { NoteCard } from '@/components/resources/NoteCard';
import { ChatMessage } from '@/components/resources/ChatMessage';
import { MentorChatList } from '@/components/resources/MentorChatList';

// Mock data for saved study materials
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

// Mock data for study files
const studyFiles = [
  {
    id: 'f1',
    title: 'Data Structures and Algorithms',
    type: 'PDF',
    size: '2.4 MB',
    uploadedDate: '05/01/2023',
    category: 'Technical Skills'
  },
  {
    id: 'f2',
    title: 'System Design Interview Handbook',
    type: 'PDF',
    size: '5.1 MB',
    uploadedDate: '04/15/2023',
    category: 'Technical Skills'
  },
  {
    id: 'f3',
    title: 'Leadership Skills Workshop Slides',
    type: 'PPTX',
    size: '8.7 MB',
    uploadedDate: '03/22/2023',
    category: 'Soft Skills'
  },
  {
    id: 'f4',
    title: 'Financial Modeling Excel Templates',
    type: 'XLSX',
    size: '1.2 MB',
    uploadedDate: '02/10/2023',
    category: 'Finance'
  }
];

// Mock data for study collections/folders
const studyCollections = [
  {
    id: 'c1',
    title: 'Technical Interview Prep',
    description: 'Materials for technical interview preparation',
    itemCount: 12,
    lastUpdated: '3 days ago'
  },
  {
    id: 'c2',
    title: 'Career Development',
    description: 'Resources for career advancement and planning',
    itemCount: 8,
    lastUpdated: '1 week ago'
  },
  {
    id: 'c3',
    title: 'Mentor Recommendations',
    description: 'Study materials recommended by my mentors',
    itemCount: 5,
    lastUpdated: '2 weeks ago'
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
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter study materials based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = studyFiles.filter(file => 
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCollections = studyCollections.filter(collection => 
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Study Materials Library</h1>
          <p className="mt-2 text-lg text-gray-600">
            Store, organize and access your learning resources
          </p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search study materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="materials">
              <BookOpen className="h-4 w-4 mr-2" />
              Study Notes
            </TabsTrigger>
            <TabsTrigger value="files">
              <File className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="collections">
              <Folder className="h-4 w-4 mr-2" />
              Collections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Study Notes</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add a New Study Note</DialogTitle>
                    <DialogDescription>
                      Create and save your study notes for easy reference.
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
                      <Button type="submit" className="bg-mentor-primary hover:bg-mentor-secondary">Save Note</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Book className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No study notes found</h3>
                <p className="text-gray-500 mt-2 mb-4">
                  {searchQuery ? "No results match your search criteria" : "Add your first study note to get started"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsDialogOpen(true)} className="bg-mentor-primary hover:bg-mentor-secondary">
                    <Plus className="h-4 w-4 mr-2" /> Add Note
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="files" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Files</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Upload File
              </Button>
            </div>

            {filteredFiles.length > 0 ? (
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="grid grid-cols-5 font-medium text-sm p-4 border-b bg-gray-50">
                  <div className="col-span-2">Name</div>
                  <div>Type</div>
                  <div>Size</div>
                  <div>Date</div>
                </div>
                {filteredFiles.map((file) => (
                  <div key={file.id} className="grid grid-cols-5 p-4 border-b hover:bg-gray-50 text-sm">
                    <div className="col-span-2 font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-mentor-primary" />
                      {file.title}
                    </div>
                    <div className="flex items-center">{file.type}</div>
                    <div className="flex items-center">{file.size}</div>
                    <div className="flex items-center">{file.uploadedDate}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Archive className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No files found</h3>
                <p className="text-gray-500 mt-2 mb-4">
                  {searchQuery ? "No results match your search criteria" : "Upload your first file to get started"}
                </p>
                {!searchQuery && (
                  <Button className="bg-mentor-primary hover:bg-mentor-secondary">
                    <Plus className="h-4 w-4 mr-2" /> Upload File
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="collections" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Collections</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Create Collection
              </Button>
            </div>

            {filteredCollections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((collection) => (
                  <Card key={collection.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <Folder className="h-5 w-5 mr-2 text-mentor-primary" />
                        {collection.title}
                      </CardTitle>
                      <CardDescription>{collection.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <div className="text-sm text-gray-500">
                        <span className="mr-3">{collection.itemCount} items</span>
                        <span>Last updated: {collection.lastUpdated}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View Collection</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Folder className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No collections found</h3>
                <p className="text-gray-500 mt-2 mb-4">
                  {searchQuery ? "No results match your search criteria" : "Create your first collection to organize your study materials"}
                </p>
                {!searchQuery && (
                  <Button className="bg-mentor-primary hover:bg-mentor-secondary">
                    <Plus className="h-4 w-4 mr-2" /> Create Collection
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Resources;
