
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

interface MentorFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function MentorFilters({ onFilterChange }: MentorFiltersProps) {
  const [industry, setIndustry] = React.useState<string>('');
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 200]);
  const [skills, setSkills] = React.useState<string[]>([]);
  const [availability, setAvailability] = React.useState<string>('');
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
    setIndustry('');
    setPriceRange([0, 200]);
    setSkills([]);
    setAvailability('');
    setRating(0);
    onFilterChange({});
  };

  // Apply filters automatically when any filter changes
  React.useEffect(() => {
    handleApplyFilters();
  }, [industry, priceRange, skills, availability, rating]);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8">
          <X className="h-4 w-4 mr-1" /> Clear all
        </Button>
      </div>

      <div className="space-y-4">
        {/* Industry Filter */}
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Industries</SelectItem>
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
              <SelectItem value="">Any Time</SelectItem>
              <SelectItem value="weekdays">Weekdays</SelectItem>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="mornings">Mornings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Removed the Apply Filter button since we're applying filters automatically */}
      </div>
    </div>
  );
}
