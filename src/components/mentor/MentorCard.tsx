
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
}

export interface MentorProps {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  rating: number;
  skills: Skill[];
  hourlyRate?: number;
  availability: string;
}

export function MentorCard({ mentor }: { mentor: MentorProps }) {
  const { id, name, title, company, avatar, rating, skills, hourlyRate, availability } = mentor;
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-mentor-primary text-white">{initials}</AvatarFallback>
        </Avatar>
        <div className="grid">
          <Link to={`/mentor/${id}`} className="font-medium hover:text-mentor-primary">
            {name}
          </Link>
          <p className="text-sm text-gray-500">
            {title} at {company}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-3">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill.id} variant="secondary" className="bg-mentor-light text-mentor-secondary">
              {skill.name}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-gray-500">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{availability}</span>
        </div>
        {hourlyRate && (
          <div className="mt-2 text-sm font-medium">
            ${hourlyRate}/hour
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-mentor-primary hover:bg-mentor-secondary">
          Book Session
        </Button>
      </CardFooter>
    </Card>
  );
}
