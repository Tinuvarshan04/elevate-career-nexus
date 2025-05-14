
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Filter
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for meeting requests
const meetingRequests = [
  {
    id: 'req1',
    menteeName: 'Sarah Williams',
    menteeAvatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    date: '2023-06-10',
    time: '10:00 AM',
    duration: 30,
    topic: 'Career Transition to Tech',
    status: 'pending',
    message: 'I need guidance on how to transition from marketing to UX design.',
  },
  {
    id: 'req2',
    menteeName: 'David Lee',
    menteeAvatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    date: '2023-06-12',
    time: '2:30 PM',
    duration: 45,
    topic: 'Resume Review',
    status: 'pending',
    message: 'I would appreciate your feedback on my resume before I apply for software engineering roles.',
  },
  {
    id: 'req3',
    menteeName: 'Alex Johnson',
    menteeAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    date: '2023-06-15',
    time: '4:00 PM',
    duration: 60,
    topic: 'Interview Preparation',
    status: 'pending',
    message: 'I have an interview next week and would like to practice some common questions.',
  },
  {
    id: 'req4',
    menteeName: 'Michael Torres',
    menteeAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    date: '2023-06-18',
    time: '11:00 AM',
    duration: 30,
    topic: 'Career Advice',
    status: 'accepted',
    message: 'I would like to discuss potential career paths in data science.',
  },
  {
    id: 'req5',
    menteeName: 'Emma Rodriguez',
    menteeAvatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    date: '2023-06-20',
    time: '3:00 PM',
    duration: 45,
    topic: 'Portfolio Review',
    status: 'declined',
    message: 'I would appreciate feedback on my UX design portfolio.',
  }
];

const MeetingRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(meetingRequests);
  const [filter, setFilter] = useState('all');
  
  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const handleAccept = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
    toast({
      title: "Meeting Accepted",
      description: "The meeting request has been accepted and the mentee has been notified.",
    });
  };

  const handleDecline = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'declined' } : req
    ));
    toast({
      title: "Meeting Declined",
      description: "The meeting request has been declined.",
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Meeting Requests</h1>
            <p className="text-muted-foreground">Manage your incoming meeting requests from mentees.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meeting Requests</CardTitle>
            <CardDescription>
              You have {requests.filter(r => r.status === 'pending').length} pending meeting requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentee</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={request.menteeAvatar} alt={request.menteeName} />
                            <AvatarFallback>{request.menteeName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.menteeName}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{request.message}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.topic}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-sm">{formatDate(request.date)}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-sm">{request.time}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.duration} min</TableCell>
                      <TableCell>
                        <Badge className={
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                          request.status === 'accepted' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === 'pending' ? (
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-red-600 hover:text-red-700"
                              onClick={() => handleDecline(request.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Decline
                            </Button>
                            <Button
                              size="sm"
                              className="flex items-center bg-mentor-primary hover:bg-mentor-secondary"
                              onClick={() => handleAccept(request.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Accept
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {request.status === 'accepted' ? 'Meeting scheduled' : 'Request declined'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No meeting requests found matching the current filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MeetingRequests;
