
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MentorCard, MentorProps } from '@/components/mentor/MentorCard';
import { MentorFilters } from '@/components/mentor/MentorFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LayoutGrid, 
  LayoutList, 
  Search, 
  Filter as FilterIcon
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for mentors
const mockMentors: MentorProps[] = [
  {
    id: '1',
    name: 'Dr. Lisa Johnson',
    title: 'Senior Product Manager',
    company: 'TechGiant Inc.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.9,
    skills: [
      { id: 's1', name: 'Product Strategy' },
      { id: 's2', name: 'Leadership' },
      { id: 's3', name: 'UX Design' },
      { id: 's4', name: 'User Research' },
    ],
    hourlyRate: 85,
    availability: 'Weekdays & evenings',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Staff Engineer',
    company: 'CodeWorks',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.7,
    skills: [
      { id: 's1', name: 'React' },
      { id: 's2', name: 'Node.js' },
      { id: 's3', name: 'System Architecture' },
    ],
    hourlyRate: 90,
    availability: 'Weekends',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    title: 'Marketing Director',
    company: 'BrandBuilder',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.8,
    skills: [
      { id: 's1', name: 'Digital Marketing' },
      { id: 's2', name: 'SEO' },
      { id: 's3', name: 'Content Strategy' },
      { id: 's4', name: 'Analytics' },
    ],
    hourlyRate: 75,
    availability: 'Flexible schedule',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Data Science Lead',
    company: 'DataInsight',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 4.9,
    skills: [
      { id: 's1', name: 'Machine Learning' },
      { id: 's2', name: 'Python' },
      { id: 's3', name: 'Statistics' },
      { id: 's4', name: 'Data Visualization' },
    ],
    hourlyRate: 100,
    availability: 'Weekday evenings',
  },
  {
    id: '5',
    name: 'Emma Rodriguez',
    title: 'UX/UI Design Lead',
    company: 'CreativeLabs',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.6,
    skills: [
      { id: 's1', name: 'UI Design' },
      { id: 's2', name: 'User Research' },
      { id: 's3', name: 'Prototyping' },
      { id: 's4', name: 'Figma' },
    ],
    hourlyRate: 80,
    availability: 'Weekends & evenings',
  },
  {
    id: '6',
    name: 'Robert Kim',
    title: 'Finance Director',
    company: 'Global Investments',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.8,
    skills: [
      { id: 's1', name: 'Financial Planning' },
      { id: 's2', name: 'Investment Strategy' },
      { id: 's3', name: 'Risk Management' },
    ],
    hourlyRate: 95,
    availability: 'Weekday mornings',
  },
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState<MentorProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Simulate API fetch
    const fetchMentors = () => {
      setTimeout(() => {
        setMentors(mockMentors);
        setLoading(false);
      }, 800);
    };

    fetchMentors();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter based on the search term
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, this would filter mentors based on the selected filters
    console.log('Applied filters:', newFilters);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
          <p className="text-gray-600 mt-2">
            Browse our network of experienced professionals ready to guide your career journey.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, skill, or industry"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </form>
          
          <div className="flex space-x-2">
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden flex items-center">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down mentors based on your preferences
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <MentorFilters onFilterChange={handleFilterChange} />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button className="w-full bg-mentor-primary hover:bg-mentor-secondary">
                      Apply Filters
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            
            {/* View Toggle */}
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={`rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <LayoutGrid size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={`rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <LayoutList size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <MentorFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Mentors List */}
          <div className={`lg:col-span-3 ${loading ? 'flex justify-center items-center min-h-[400px]' : ''}`}>
            {loading ? (
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-mentor-primary border-r-transparent" />
                <p className="mt-2 text-gray-600">Loading mentors...</p>
              </div>
            ) : mentors.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {mentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No mentors found matching your criteria.</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Discover;
