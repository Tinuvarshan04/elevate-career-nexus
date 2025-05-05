
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Bell, 
  MessageSquare, 
  Users, 
  CheckCircle2,
  BookOpen,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Define types for the dashboard data structures
interface MenteeDashboardData {
  upcomingSessions: Array<{
    id: string;
    mentorName: string;
    mentorAvatar: string;
    date: string;
    time: string;
    topic: string;
    status: string;
  }>;
  recommendedMentors: Array<{
    id: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
    rating: number;
    specialties: string[];
  }>;
  recentMessages: Array<{
    id: string;
    from: string;
    avatar: string;
    message: string;
    time: string;
    unread: boolean;
  }>;
  completedSessions: number;
  hoursSpent: number;
  notifications: number;
}

interface MentorDashboardData {
  upcomingSessions: Array<{
    id: string;
    menteeName: string;
    menteeAvatar: string;
    date: string;
    time: string;
    topic: string;
    status: string;
  }>;
  mentees: Array<{
    id: string;
    name: string;
    avatar: string;
    sessions: number;
    lastSession: string;
  }>;
  recentMessages: Array<{
    id: string;
    from: string;
    avatar: string;
    message: string;
    time: string;
    unread: boolean;
  }>;
  completedSessions: number;
  hoursMentored: number;
  earnings: number;
  rating: number;
  reviewCount: number;
  notifications: number;
}

// Mentee dashboard data
const menteeDashboardData: MenteeDashboardData = {
  upcomingSessions: [
    {
      id: 's1',
      mentorName: 'Dr. Lisa Johnson',
      mentorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '2023-05-10',
      time: '3:00 PM',
      topic: 'Career Transition Strategy',
      status: 'confirmed'
    },
    {
      id: 's2',
      mentorName: 'Marcus Chen',
      mentorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2023-05-15',
      time: '4:30 PM',
      topic: 'Technical Interview Preparation',
      status: 'pending'
    }
  ],
  recommendedMentors: [
    {
      id: 'm1',
      name: 'James Wilson',
      title: 'Data Science Lead',
      company: 'DataInsight',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      rating: 4.9,
      specialties: ['Machine Learning', 'Python', 'Data Analysis']
    },
    {
      id: 'm2',
      name: 'Emma Rodriguez',
      title: 'UX/UI Design Lead',
      company: 'CreativeLabs',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4.6,
      specialties: ['UI Design', 'User Research', 'Prototyping']
    },
    {
      id: 'm3',
      name: 'Robert Kim',
      title: 'Finance Director',
      company: 'Global Investments',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4.8,
      specialties: ['Financial Planning', 'Investment Strategy', 'Risk Management']
    }
  ],
  recentMessages: [
    {
      id: 'msg1',
      from: 'Dr. Lisa Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'Looking forward to our session next week! Let me know if you have specific topics you want to cover.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 'msg2',
      from: 'Marcus Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'I\'ve shared some resources on React performance optimization. Check them out before our call.',
      time: '1 day ago',
      unread: false
    }
  ],
  completedSessions: 5,
  hoursSpent: 8,
  notifications: 3
};

// Mentor dashboard data
const mentorDashboardData: MentorDashboardData = {
  upcomingSessions: [
    {
      id: 's1',
      menteeName: 'Michael Torres',
      menteeAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
      date: '2023-05-10',
      time: '3:00 PM',
      topic: 'Career Transition Strategy',
      status: 'confirmed'
    },
    {
      id: 's2',
      menteeName: 'Sarah Williams',
      menteeAvatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      date: '2023-05-15',
      time: '4:30 PM',
      topic: 'Technical Interview Preparation',
      status: 'confirmed'
    },
    {
      id: 's3',
      menteeName: 'David Lee',
      menteeAvatar: 'https://randomuser.me/api/portraits/men/34.jpg',
      date: '2023-05-18',
      time: '10:00 AM',
      topic: 'Resume Review',
      status: 'pending'
    }
  ],
  mentees: [
    {
      id: 'mentee1',
      name: 'Michael Torres',
      avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
      sessions: 3,
      lastSession: '3 days ago',
    },
    {
      id: 'mentee2',
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      sessions: 1,
      lastSession: '1 week ago',
    },
    {
      id: 'mentee3',
      name: 'David Lee',
      avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
      sessions: 0,
      lastSession: 'N/A',
    }
  ],
  recentMessages: [
    {
      id: 'msg1',
      from: 'Michael Torres',
      avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
      message: 'Thanks for the feedback on my portfolio! I\'ve made the changes you suggested.',
      time: '3 hours ago',
      unread: true
    },
    {
      id: 'msg2',
      from: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
      message: 'I have some questions about the resources you shared. Can we discuss them in our next session?',
      time: '1 day ago',
      unread: true
    },
    {
      id: 'msg3',
      from: 'David Lee',
      avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
      message: 'Looking forward to our first session! I\'ve prepared some questions about career transitions.',
      time: '2 days ago',
      unread: false
    }
  ],
  completedSessions: 15,
  hoursMentored: 22,
  earnings: 1870,
  rating: 4.9,
  reviewCount: 12,
  notifications: 5
};

interface DashboardProps {
  userType?: 'mentor' | 'mentee';
}

const Dashboard: React.FC<DashboardProps> = ({ userType = 'mentee' }) => {
  // Properly type the data variable based on the userType
  const data = userType === 'mentor' ? mentorDashboardData : menteeDashboardData;

  // Create type guards to help TypeScript understand when we're working with which data type
  const isMentorData = (data: MentorDashboardData | MenteeDashboardData): data is MentorDashboardData => {
    return userType === 'mentor';
  };

  const isMenteeData = (data: MentorDashboardData | MenteeDashboardData): data is MenteeDashboardData => {
    return userType === 'mentee';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-8">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {userType === 'mentor' ? 'John Mentor' : 'Jane Mentee'}!
          </h1>
          <p className="text-muted-foreground">
            {userType === 'mentor' 
              ? 'Here\'s an overview of your mentoring activities and upcoming sessions.' 
              : 'Here\'s an overview of your mentoring journey and upcoming sessions.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isMenteeData(data) ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-mentor-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.completedSessions}</div>
                  <p className="text-xs text-muted-foreground">sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours of Mentoring</CardTitle>
                  <Clock className="h-4 w-4 text-mentor-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.hoursSpent}</div>
                  <p className="text-xs text-muted-foreground">hours total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-mentor-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.recentMessages.filter(m => m.unread).length}
                  </div>
                  <p className="text-xs text-muted-foreground">messages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                  <Bell className="h-4 w-4 text-mentor-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.notifications}</div>
                  <p className="text-xs text-muted-foreground">unread notifications</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-mentor-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.completedSessions}</div>
                  <p className="text-xs text-muted-foreground">sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Mentored</CardTitle>
                  <Clock className="h-4 w-4 text-mentor-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.hoursMentored}</div>
                  <p className="text-xs text-muted-foreground">hours total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Earnings</CardTitle>
                  <div className="h-4 w-4 text-mentor-primary">$</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${data.earnings}</div>
                  <p className="text-xs text-muted-foreground">total earnings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <div className="flex">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.rating}</div>
                  <p className="text-xs text-muted-foreground">from {data.reviewCount} reviews</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  Your scheduled mentoring sessions
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/schedule">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">View all sessions</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isMenteeData(data) ? (
                data.upcomingSessions.length > 0 ? (
                  <ul className="space-y-4">
                    {data.upcomingSessions.map((session) => (
                      <li key={session.id} className="flex items-start gap-4 p-3 rounded-lg border">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={session.mentorAvatar} 
                            alt={session.mentorName} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{session.mentorName}</p>
                              <p className="text-sm text-gray-600">{session.topic}</p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              session.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-gray-600 mr-3">{formatDate(session.date)}</span>
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-gray-600">{session.time}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="font-medium text-lg">No upcoming sessions</h3>
                    <p className="text-gray-500 mt-1">
                      Book your first mentoring session
                    </p>
                    <Button className="mt-4 bg-mentor-primary hover:bg-mentor-secondary">
                      <Link to="/discover">Find Mentors</Link>
                    </Button>
                  </div>
                )
              ) : (
                data.upcomingSessions.length > 0 ? (
                  <ul className="space-y-4">
                    {data.upcomingSessions.map((session) => (
                      <li key={session.id} className="flex items-start gap-4 p-3 rounded-lg border">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={session.menteeAvatar} 
                            alt={session.menteeName} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{session.menteeName}</p>
                              <p className="text-sm text-gray-600">{session.topic}</p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              session.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-gray-600 mr-3">{formatDate(session.date)}</span>
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-gray-600">{session.time}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="font-medium text-lg">No upcoming sessions</h3>
                    <p className="text-gray-500 mt-1">
                      Your schedule is currently clear
                    </p>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Stay in touch with your {userType === 'mentor' ? 'mentees' : 'mentors'}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/messages">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">View all messages</span>
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {data.recentMessages.length > 0 ? (
                <ul className="space-y-4">
                  {data.recentMessages.map((message) => (
                    <li key={message.id} className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={message.avatar} 
                          alt={message.from} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="font-medium">
                            {message.from}
                            {message.unread && (
                              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-mentor-primary"></span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">{message.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{message.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="font-medium text-lg">No messages</h3>
                  <p className="text-gray-500 mt-1">
                    You don't have any messages yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Sections */}
        {isMenteeData(data) ? (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Mentors</CardTitle>
              <CardDescription>
                Based on your interests and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.recommendedMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{mentor.name}</h3>
                          <p className="text-sm text-gray-600">
                            {mentor.title} at {mentor.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3 text-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= Math.floor(mentor.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs">{mentor.rating}</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {mentor.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-mentor-light text-mentor-secondary px-2 py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto p-3 pt-0">
                      <Button className="w-full bg-mentor-primary hover:bg-mentor-secondary">
                        <Link to={`/mentor/${mentor.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Your Mentees</CardTitle>
              <CardDescription>
                People you are currently mentoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.mentees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.mentees.map((mentee) => (
                    <div
                      key={mentee.id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img
                              src={mentee.avatar}
                              alt={mentee.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{mentee.name}</h3>
                            <p className="text-sm text-gray-600">
                              {mentee.sessions} {mentee.sessions === 1 ? 'session' : 'sessions'}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          <p>Last session: {mentee.lastSession}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            <MessageSquare className="h-4 w-4 mr-1" /> Message
                          </Button>
                          <Button className="flex-1 bg-mentor-primary hover:bg-mentor-secondary">
                            <Calendar className="h-4 w-4 mr-1" /> Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="font-medium text-lg">No mentees yet</h3>
                  <p className="text-gray-500 mt-1">
                    You don't have any mentees assigned to you yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Resources Section for Mentees */}
        {userType === 'mentee' && (
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Curated materials to help advance your career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                      alt="Career Development" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Career Development Guide</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Essential strategies for advancing your professional journey
                    </p>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" /> Read Guide
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Interview Skills" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Interview Mastery</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Techniques to excel in technical and behavioral interviews
                    </p>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" /> Read Guide
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Networking" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Networking Strategies</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Building meaningful professional connections that last
                    </p>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" /> Read Guide
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
