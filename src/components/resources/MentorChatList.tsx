
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface MentorChatListProps {
  mentors: Mentor[];
  selectedMentorId: string | null;
  onSelectMentor: (id: string) => void;
}

export const MentorChatList: React.FC<MentorChatListProps> = ({ 
  mentors, 
  selectedMentorId, 
  onSelectMentor 
}) => {
  return (
    <div className="divide-y">
      {mentors.map((mentor) => (
        <div 
          key={mentor.id}
          className={cn(
            "flex items-start p-4 cursor-pointer hover:bg-gray-50 transition-colors",
            selectedMentorId === mentor.id && "bg-gray-100"
          )}
          onClick={() => onSelectMentor(mentor.id)}
        >
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={mentor.avatar} alt={mentor.name} />
              <AvatarFallback>{mentor.name[0]}</AvatarFallback>
            </Avatar>
            {mentor.unread > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-mentor-secondary"
              >
                {mentor.unread}
              </Badge>
            )}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="flex justify-between items-baseline">
              <p className="font-medium text-sm truncate">{mentor.name}</p>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{mentor.time}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1 truncate">{mentor.title} at {mentor.company}</p>
            <p className="text-xs text-gray-500 truncate">{mentor.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
