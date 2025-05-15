
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const Sessions = () => {
  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      mentorName: "Sarah Chen",
      topic: "Career Development Strategy",
      date: "2025-05-20",
      time: "10:00 AM - 11:00 AM",
    },
    {
      id: 2,
      mentorName: "Alex Johnson",
      topic: "Technical Interview Preparation",
      date: "2025-05-25",
      time: "2:00 PM - 3:00 PM",
    },
  ];

  // Mock past sessions
  const pastSessions = [
    {
      id: 3,
      mentorName: "David Wong",
      topic: "Resume Review",
      date: "2025-05-05",
      time: "11:00 AM - 12:00 PM",
      feedback: "Great session! Got actionable feedback on my resume."
    },
    {
      id: 4,
      mentorName: "Sarah Chen",
      topic: "Introduction Meeting",
      date: "2025-04-28",
      time: "3:00 PM - 4:00 PM",
      feedback: "Good initial meeting to set goals and expectations."
    },
  ];

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Sessions</h1>
          <p className="text-muted-foreground">Manage your mentoring sessions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>
              Your scheduled mentoring sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{session.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">No upcoming sessions scheduled</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Sessions</CardTitle>
            <CardDescription>
              Your completed mentoring sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pastSessions.length > 0 ? (
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <div key={session.id} className="flex flex-col p-4 border rounded-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">{session.topic}</h3>
                        <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{session.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm"><span className="font-medium">Feedback:</span> {session.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">No past sessions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
