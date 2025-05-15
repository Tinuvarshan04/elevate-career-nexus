
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MessageSquare, User, Bell, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Notifications = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'meeting',
      title: 'New Session Request',
      description: 'Sarah Chen requested a mentoring session on May 20, 2025 at 10:00 AM.',
      time: '10 minutes ago',
      read: false,
      actionable: true,
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      description: 'Alex Johnson sent you a message about your upcoming session.',
      time: '2 hours ago',
      read: false,
      actionable: true,
    },
    {
      id: 3,
      type: 'system',
      title: 'Profile View',
      description: 'Your profile was viewed by 5 new mentors this week.',
      time: 'Yesterday',
      read: true,
      actionable: false,
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Session Reminder',
      description: 'Your session with David Wong is tomorrow at 2:00 PM.',
      time: 'Yesterday',
      read: true,
      actionable: false,
    },
    {
      id: 5,
      type: 'system',
      title: 'Goal Achieved',
      description: 'Congratulations! You completed your "Resume Review" milestone.',
      time: '3 days ago',
      read: true,
      actionable: false,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Calendar className="h-5 w-5 text-mentor-primary" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your mentoring activities</p>
          </div>
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <Check className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="actionable">Actionable</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${notification.read ? '' : 'bg-muted/30'}`}
                    >
                      <div className="flex">
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          {notification.actionable && (
                            <div className="flex gap-2 mt-3">
                              <Button variant="default" size="sm" className="bg-mentor-primary">
                                {notification.type === 'meeting' ? 'Review Request' : 'View Message'}
                              </Button>
                              <Button variant="outline" size="sm">
                                Dismiss
                              </Button>
                            </div>
                          )}
                        </div>
                        {!notification.read && (
                          <div className="ml-2 mt-1.5">
                            <span className="w-2 h-2 bg-mentor-primary rounded-full block"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="unread" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div key={notification.id} className="p-4 bg-muted/30">
                      <div className="flex">
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          {notification.actionable && (
                            <div className="flex gap-2 mt-3">
                              <Button variant="default" size="sm" className="bg-mentor-primary">
                                {notification.type === 'meeting' ? 'Review Request' : 'View Message'}
                              </Button>
                              <Button variant="outline" size="sm">
                                Dismiss
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="ml-2 mt-1.5">
                          <span className="w-2 h-2 bg-mentor-primary rounded-full block"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="actionable" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {notifications.filter(n => n.actionable).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${notification.read ? '' : 'bg-muted/30'}`}
                    >
                      <div className="flex">
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button variant="default" size="sm" className="bg-mentor-primary">
                              {notification.type === 'meeting' ? 'Review Request' : 'View Message'}
                            </Button>
                            <Button variant="outline" size="sm">
                              Dismiss
                            </Button>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="ml-2 mt-1.5">
                            <span className="w-2 h-2 bg-mentor-primary rounded-full block"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
