
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const generateTimeSlots = (): TimeSlot[] => {
  // Generate mock time slots for demo purposes
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour <= endHour; hour++) {
    const morning = `${hour}:00`;
    const afternoon = `${hour}:30`;
    
    slots.push({
      id: `slot-${morning}`,
      time: morning,
      available: Math.random() > 0.3, // 70% chance of being available
    });
    
    slots.push({
      id: `slot-${afternoon}`,
      time: afternoon,
      available: Math.random() > 0.3,
    });
  }

  return slots;
};

interface BookingCalendarProps {
  mentorId?: string;
  mentorName?: string;
}

export function BookingCalendar({ mentorId = '1', mentorName = 'John Mentor' }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    // In a real application, we would fetch time slots for the selected date
    setTimeSlots(generateTimeSlots());
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleBookSession = () => {
    if (!selectedSlot) return;
    
    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      
      toast({
        title: "Session booked successfully!",
        description: `Your session with ${mentorName} has been scheduled.`,
      });
      
      // In a real app, we would navigate to a confirmation page or update UI
    }, 1500);
  };

  const selectedSlotTime = selectedSlot 
    ? timeSlots.find(slot => slot.id === selectedSlot)?.time 
    : null;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Book a Session with {mentorName}</CardTitle>
        <CardDescription>Select a date and time for your mentoring session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">1. Select a Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="border rounded-md p-4"
              disabled={(date) => {
                // Disable past dates and weekends for demo
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return date < today || day === 0 || day === 6;
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">2. Select a Time Slot</h3>
            {date ? (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot === slot.id ? "default" : "outline"}
                    className={`justify-start ${
                      !slot.available
                        ? "opacity-50 cursor-not-allowed"
                        : selectedSlot === slot.id
                        ? "bg-mentor-primary hover:bg-mentor-secondary"
                        : ""
                    }`}
                    disabled={!slot.available}
                    onClick={() => handleSlotSelect(slot.id)}
                  >
                    {slot.time}
                    {selectedSlot === slot.id && <CheckCircle2 className="ml-auto h-4 w-4" />}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Please select a date first</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {selectedSlot && (
          <div className="w-full p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium">Your Selected Session</h4>
            <p className="text-gray-600">
              {date?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              at {selectedSlotTime}
            </p>
          </div>
        )}
        <Button 
          onClick={handleBookSession}
          disabled={!selectedSlot || isBooking}
          className="w-full bg-mentor-primary hover:bg-mentor-secondary"
        >
          {isBooking ? 'Booking...' : 'Book Session'}
        </Button>
      </CardFooter>
    </Card>
  );
}
