
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingCalendar } from '@/components/calendar/BookingCalendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock,
  Globe,
  MapPin,
  MessageSquare,
  Star,
  User,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

// Mock mentor data
const mentorData = {
  id: '1',
  name: 'Dr. Lisa Johnson',
  title: 'Senior Product Manager',
  company: 'TechGiant Inc.',
  location: 'San Francisco, CA',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Product leader with 10+ years of experience in the tech industry. I\'ve led teams at startups and Fortune 500 companies, launching products used by millions. I\'m passionate about mentoring the next generation of product managers and helping them navigate their career growth.',
  rating: 4.9,
  reviewCount: 87,
  skills: [
    { id: 's1', name: 'Product Strategy' },
    { id: 's2', name: 'Leadership' },
    { id: 's3', name: 'UX Design' },
    { id: 's4', name: 'User Research' },
    { id: 's5', name: 'Product Development' },
    { id: 's6', name: 'Roadmapping' },
  ],
  languages: ['English', 'Spanish'],
  hourlyRate: 85,
  availability: 'Weekdays & evenings',
  experience: [
    {
      title: 'Senior Product Manager',
      company: 'TechGiant Inc.',
      duration: '2019 - Present',
      description: 'Leading product strategy and execution for enterprise SaaS products.'
    },
    {
      title: 'Product Manager',
      company: 'StartupLabs',
      duration: '2016 - 2019',
      description: 'Managed consumer-facing mobile applications from concept to launch.'
    },
    {
      title: 'Associate Product Manager',
      company: 'Digital Solutions Co.',
      duration: '2014 - 2016',
      description: 'Supported senior PMs in product development and user research.'
    }
  ],
  education: [
    {
      degree: 'MBA, Technology Management',
      school: 'Stanford University',
      year: '2014'
    },
    {
      degree: 'B.S. Computer Science',
      school: 'University of California, Berkeley',
      year: '2010'
    }
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Michael T.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: '3 weeks ago',
      content: 'Lisa provided actionable advice that helped me land a product role at a top tech company. Her insights on product strategy were invaluable during my interview process.'
    },
    {
      id: 'r2',
      name: 'Sarah W.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      date: '2 months ago',
      content: 'After working with Lisa for just three sessions, I gained enough confidence to lead my first product launch. She has an amazing ability to break down complex concepts into digestible advice.'
    },
    {
      id: 'r3',
      name: 'David K.',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      rating: 4,
      date: '4 months ago',
      content: 'Great mentor who shares practical examples from her own career. I particularly appreciated her feedback on my product portfolio which helped me improve my storytelling.'
    }
  ]
};

const MentorProfile = () => {
  const { mentorId } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  
  // In a real app, we would fetch the mentor data based on the mentorId
  const mentor = mentorData;
  
  if (!mentor) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold">Mentor not found</h2>
          <p className="mt-4 text-gray-600">The mentor you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-8 bg-mentor-primary hover:bg-mentor-secondary">
            <Link to="/discover">Back to Discover</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const initials = mentor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mentor Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={mentor.avatar} alt={mentor.name} />
            <AvatarFallback className="bg-mentor-primary text-white text-xl">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold">{mentor.name}</h1>
            <p className="text-xl text-gray-600">{mentor.title} at {mentor.company}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600">{mentor.location}</span>
              </div>
              
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600">{mentor.languages.join(', ')}</span>
              </div>
              
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="font-medium">{mentor.rating}</span>
                <span className="text-gray-500 ml-1">({mentor.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {mentor.skills.slice(0, 5).map((skill) => (
                <Badge key={skill.id} variant="secondary" className="bg-mentor-light text-mentor-secondary">
                  {skill.name}
                </Badge>
              ))}
              {mentor.skills.length > 5 && (
                <Badge variant="outline" className="text-gray-500">
                  +{mentor.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold">${mentor.hourlyRate}</div>
              <div className="text-gray-500">per hour</div>
            </div>
            <Button className="bg-mentor-primary hover:bg-mentor-secondary">
              Book a Session
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" /> Message
            </Button>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="booking">Book</TabsTrigger>
          </TabsList>
          
          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Bio</h2>
                  <p className="text-gray-700 whitespace-pre-line">{mentor.bio}</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Experience</h2>
                  <div className="space-y-6">
                    {mentor.experience.map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="mt-1">
                          <Briefcase className="h-6 w-6 text-mentor-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-mentor-secondary">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.duration}</p>
                          <p className="mt-1 text-gray-700">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Education</h2>
                  <div className="space-y-6">
                    {mentor.education.map((edu, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="mt-1">
                          <GraduationCap className="h-6 w-6 text-mentor-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-mentor-secondary">{edu.school}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-mentor-light rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="h-5 w-5 text-mentor-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-gray-600">{mentor.availability}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-mentor-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Session Duration</p>
                      <p className="text-gray-600">30, 45, or 60 minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-mentor-light rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="bg-white text-mentor-secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Reviews ({mentor.reviewCount})</h2>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(mentor.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium text-lg">{mentor.rating}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {mentor.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback className="bg-mentor-secondary text-white">
                            {review.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="flex mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Booking Tab */}
          <TabsContent value="booking" className="mt-6">
            <BookingCalendar mentorId={mentor.id} mentorName={mentor.name} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MentorProfile;
