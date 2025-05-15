
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Message, Star, Video } from 'lucide-react';

// Mock mentee data
const mentees = [
  {
    id: 1,
    name: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    field: 'UX Design',
    joinedDate: '2023-03-15',
    lastSession: '2023-05-28',
    progress: 'Good'
  },
  {
    id: 2,
    name: 'David Lee',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    field: 'Software Development',
    joinedDate: '2023-02-10',
    lastSession: '2023-05-30',
    progress: 'Excellent'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    field: 'Product Management',
    joinedDate: '2023-04-20',
    lastSession: '2023-05-25',
    progress: 'Needs improvement'
  },
  {
    id: 4,
    name: 'Michael Torres',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    field: 'Data Science',
    joinedDate: '2023-01-05',
    lastSession: '2023-05-29',
    progress: 'Good'
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    field: 'UI Design',
    joinedDate: '2023-03-30',
    lastSession: '2023-05-20',
    progress: 'Excellent'
  }
];

const MenteesPage = () => {
  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Mentees</h1>
          <p className="text-muted-foreground">Manage and track your mentees' progress.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mentees</CardTitle>
            <CardDescription>
              You are currently mentoring {mentees.length} mentees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentee</TableHead>
                  <TableHead>Field of Interest</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Session</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentees.map((mentee) => (
                  <TableRow key={mentee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={mentee.avatar} alt={mentee.name} />
                          <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{mentee.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{mentee.field}</TableCell>
                    <TableCell>{new Date(mentee.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(mentee.lastSession).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        mentee.progress === 'Excellent' ? 'bg-green-100 text-green-800' : 
                        mentee.progress === 'Good' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mentee.progress}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Message className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Video className="h-4 w-4" />
                          <span className="sr-only">Schedule Meeting</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Star className="h-4 w-4" />
                          <span className="sr-only">View Progress</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MenteesPage;
