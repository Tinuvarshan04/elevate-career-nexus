
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  message: {
    id: string;
    sender: string;
    avatar: string;
    content: string;
    timestamp: string;
    isCurrentUser: boolean;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2 max-w-[80%]",
        message.isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        {!message.isCurrentUser && message.avatar ? (
          <AvatarImage src={message.avatar} alt={message.sender} />
        ) : null}
        <AvatarFallback className={message.isCurrentUser ? "bg-mentor-primary text-white" : ""}>
          {message.sender[0]}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col",
        message.isCurrentUser ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{message.sender}</span>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <div className={cn(
          "mt-1 rounded-lg px-3 py-2 text-sm",
          message.isCurrentUser 
            ? "bg-mentor-primary text-white" 
            : "bg-gray-100 text-gray-800"
        )}>
          {message.content}
        </div>
      </div>
    </div>
  );
};
