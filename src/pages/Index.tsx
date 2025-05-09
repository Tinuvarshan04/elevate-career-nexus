import React from 'react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthTabs } from '@/components/auth/AuthTabs';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MessageSquare, Search, Star, User, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="h-12 w-12 rounded-full bg-mentor-light flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard = ({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="mb-4 flex">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 flex-grow">{quote}</p>
      <div className="flex items-center mt-6">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mentor-primary to-mentor-secondary text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Connect with Industry Experts to Accelerate Your Career Growth
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Mentor Connect helps students and early-career professionals connect with 
                seasoned mentors who can guide your professional journey.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-mentor-primary hover:bg-white hover:text-mentor-secondary">
                      Get Started
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <AuthTabs />
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-mentor-primary">
                  <Link to="/discover" className="flex items-center">
                    Find Mentors <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Mentoring Session"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Track your progress and visualize your mentoring journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="h-6 w-6 text-mentor-primary" />}
              title="Find the Right Mentor"
              description="Search for mentors by industry, expertise, or availability to find the perfect match for your needs."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6 text-mentor-primary" />}
              title="Monitor Your Progress"
              description="View your journey through our interactive calendar and track how your skills develop month by month."
            />
            <FeatureCard
              icon={<Video className="h-6 w-6 text-mentor-primary" />}
              title="Achieve Your Goals"
              description="Set milestones, connect with mentors, and watch your progress as you reach each career objective."
            />
          </div>
          <div className="text-center mt-8">
            <Button className="bg-mentor-primary hover:bg-mentor-secondary">
              <Link to="/about" className="flex items-center">
                View Your Progress Calendar <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to have meaningful mentoring experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <User className="h-10 w-10 p-2 bg-mentor-light rounded-lg text-mentor-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Mentors</h3>
                <p className="text-gray-600">
                  Connect with verified professionals across various industries with real-world experience.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Calendar className="h-10 w-10 p-2 bg-mentor-light rounded-lg text-mentor-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-gray-600">
                  Book sessions with an intuitive calendar that syncs with mentor availability in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Video className="h-10 w-10 p-2 bg-mentor-light rounded-lg text-mentor-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Video Conferencing</h3>
                <p className="text-gray-600">
                  Enjoy seamless video calls with screen sharing and chat functionality built right into the platform.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <MessageSquare className="h-10 w-10 p-2 bg-mentor-light rounded-lg text-mentor-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Messaging</h3>
                <p className="text-gray-600">
                  Direct messaging allows for continued communication and follow-ups between sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Star className="h-10 w-10 p-2 bg-mentor-light rounded-lg text-mentor-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Reviews & Ratings</h3>
                <p className="text-gray-600">
                  Read reviews and ratings from other mentees to help you choose the right mentor.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Search className="h-10 w-10 p-2 bg-mentor-light rounded-lg text-mentor-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Advanced Search</h3>
                <p className="text-gray-600">
                  Filter mentors by industry, expertise, languages, availability, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from mentees who have found success through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="My mentor helped me navigate a difficult career transition. Their guidance was invaluable in helping me land my dream job."
              name="Sarah Johnson"
              role="UX Designer"
              avatar="https://randomuser.me/api/portraits/women/8.jpg"
            />
            <TestimonialCard
              quote="I was struggling with technical interviews, but after working with my mentor, I felt confident and prepared. I've now received multiple offers!"
              name="Michael Chen"
              role="Software Developer"
              avatar="https://randomuser.me/api/portraits/men/22.jpg"
            />
            <TestimonialCard
              quote="The feedback on my portfolio from my mentor helped me understand exactly what employers are looking for. I'm so grateful for their expertise."
              name="Priya Sharma"
              role="Marketing Specialist"
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mentor-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who are transforming their careers through mentorship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-mentor-primary hover:bg-white hover:text-mentor-secondary">
                  Sign Up Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthTabs />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-mentor-primary">
              <Link to="/discover">Browse Mentors</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
