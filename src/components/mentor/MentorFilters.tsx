
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MentorFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function MentorFilters({ onFilterChange }: MentorFiltersProps) {
  const [industry, setIndustry] = React.useState<string>('all');
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 200]);
  const [skills, setSkills] = React.useState<string[]>([]);
  const [availability, setAvailability] = React.useState<string>('all');
  const [rating, setRating] = React.useState<number>(0);

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({
      industry,
      priceRange,
      skills,
      availability,
      rating,
    });
  };

  const handleClearFilters = () => {
    setIndustry('all');
    setPriceRange([0, 200]);
    setSkills([]);
    setAvailability('all');
    setRating(0);
    onFilterChange({});
  };

  const handleRemoveFilter = (filterType: string, filterValue?: string) => {
    switch (filterType) {
      case 'industry':
        setIndustry('all');
        break;
      case 'priceRange':
        setPriceRange([0, 200]);
        break;
      case 'skill':
        if (filterValue) {
          setSkills((prev) => prev.filter((s) => s !== filterValue));
        }
        break;
      case 'availability':
        setAvailability('all');
        break;
      case 'rating':
        setRating(0);
        break;
      default:
        break;
    }
  };

  // Apply filters automatically when any filter changes
  React.useEffect(() => {
    handleApplyFilters();
  }, [industry, priceRange, skills, availability, rating]);

  // Get active filters to display
  const activeFilters = React.useMemo(() => {
    const filters = [];
    
    if (industry !== 'all') {
      filters.push({ type: 'industry', label: `Industry: ${industry}` });
    }
    
    if (priceRange[0] > 0 || priceRange[1] < 200) {
      filters.push({ type: 'priceRange', label: `Price: $${priceRange[0]} - $${priceRange[1]}` });
    }
    
    skills.forEach(skill => {
      filters.push({ type: 'skill', label: `Skill: ${skill}`, value: skill });
    });
    
    if (availability !== 'all') {
      filters.push({ type: 'availability', label: `Availability: ${availability}` });
    }
    
    if (rating > 0) {
      filters.push({ type: 'rating', label: `Min Rating: ${rating}★` });
    }
    
    return filters;
  }, [industry, priceRange, skills, availability, rating]);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8">
          <X className="h-4 w-4 mr-1" /> Clear all
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-gray-500">Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge 
                key={`${filter.type}-${index}`}
                variant="outline" 
                className="flex items-center gap-1 bg-gray-50"
              >
                {filter.label}
                <button 
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5" 
                  onClick={() => handleRemoveFilter(filter.type, filter.value)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Industry Filter */}
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex justify-between items-center">
            <Label>Price Range</Label>
            <span className="text-sm text-gray-500">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
        </div>

        {/* Skills Filter */}
        <div>
          <Label className="mb-2 block">Skills</Label>
          <div className="grid grid-cols-2 gap-2">
            {['Leadership', 'Communication', 'Technical', 'Strategy', 'Design', 'Marketing'].map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={skills.includes(skill)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                />
                <Label htmlFor={`skill-${skill}`} className="text-sm">
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger id="availability">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="weekdays">Weekdays</SelectItem>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="mornings">Mornings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
