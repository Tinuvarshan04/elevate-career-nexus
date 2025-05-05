
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock progress data
const progressData = [
  { month: 'Jan', sessions: 2, goals: 1, hoursSpent: 3 },
  { month: 'Feb', sessions: 4, goals: 2, hoursSpent: 6 },
  { month: 'Mar', sessions: 3, goals: 2, hoursSpent: 5 },
  { month: 'Apr', sessions: 5, goals: 3, hoursSpent: 8 },
  { month: 'May', sessions: 7, goals: 4, hoursSpent: 10 }
];

// Mock milestone events for the calendar
const milestoneEvents = [
  { date: new Date(2025, 0, 15), title: "First Mentoring Session" },
  { date: new Date(2025, 1, 10), title: "Career Goal Planning" },
  { date: new Date(2025, 2, 20), title: "Resume Workshop" },
  { date: new Date(2025, 3, 5), title: "Mock Interview" },
  { date: new Date(2025, 4, 12), title: "Networking Workshop" }
];

const About: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  
  // Get events for current selected date
  const currentDateEvents = milestoneEvents.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Your Mentoring Journey</h1>
          <p className="text-lg text-gray-600">
            Track your progress and visualize your growth over time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Milestone Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  milestone: milestoneEvents.map(event => event.date)
                }}
                modifiersStyles={{
                  milestone: { 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(80, 64, 175, 0.1)',
                    borderBottom: '2px solid var(--mentor-primary, #5040AF)' 
                  }
                }}
              />
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Events on Selected Date:</h4>
                {currentDateEvents.length > 0 ? (
                  <ul className="space-y-2">
                    {currentDateEvents.map((event, idx) => (
                      <li key={idx} className="p-2 bg-mentor-light rounded-md">
                        {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No events scheduled for this day</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Progress Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                </TabsList>
                <TabsContent value="chart">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={progressData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sessions" name="Completed Sessions" fill="#5040AF" />
                        <Bar dataKey="goals" name="Goals Achieved" fill="#2DD4BF" />
                        <Bar dataKey="hoursSpent" name="Hours Spent" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="table">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">Month</th>
                          <th scope="col" className="px-6 py-3">Sessions</th>
                          <th scope="col" className="px-6 py-3">Goals Achieved</th>
                          <th scope="col" className="px-6 py-3">Hours Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progressData.map((item, idx) => (
                          <tr key={idx} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium">{item.month}</td>
                            <td className="px-6 py-4">{item.sessions}</td>
                            <td className="px-6 py-4">{item.goals}</td>
                            <td className="px-6 py-4">{item.hoursSpent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section with Progress Focus */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-xl text-gray-600">
              Understanding your mentoring journey and progress
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-mentor-light flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-mentor-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Set Your Goals</h3>
                <p className="text-gray-600">
                  Define what you want to achieve with mentorship and establish clear milestones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-mentor-light flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-mentor-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Schedule Sessions</h3>
                <p className="text-gray-600">
                  Book mentoring sessions with experts who can help you reach your goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-mentor-light flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-mentor-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your development over time with our visual progress tracking tools.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-mentor-light flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-mentor-primary">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Celebrate Success</h3>
                <p className="text-gray-600">
                  Acknowledge achievements and milestones as you progress in your career journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
