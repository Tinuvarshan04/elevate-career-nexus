
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    author: string;
    avatar: string;
    date: string;
    summary: string;
    category: string;
    likes: number;
    comments: number;
  };
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{note.title}</CardTitle>
          <Badge variant="outline">{note.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={note.avatar} alt={note.author} />
            <AvatarFallback>{note.author[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{note.author}</span>
          <span className="text-xs text-gray-400">• {note.date}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{note.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="px-2 flex items-center text-gray-600">
            <ThumbsUp className="h-4 w-4 mr-1" /> {note.likes}
          </Button>
          <Button variant="ghost" size="sm" className="px-2 flex items-center text-gray-600">
            <MessageSquare className="h-4 w-4 mr-1" /> {note.comments}
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-1" /> Read
        </Button>
      </CardFooter>
    </Card>
  );
};
