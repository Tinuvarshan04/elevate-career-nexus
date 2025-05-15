
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthTabsProps {
  defaultTab?: 'sign-in' | 'sign-up';
}

export function AuthTabs({ defaultTab = 'sign-in' }: AuthTabsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<'mentee' | 'mentor'>('mentee');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check for dummy mentor credentials
    if (email === 'mentor@example.com' && password === '12345678') {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Success!",
          description: "You've successfully signed in as a mentor.",
        });
        navigate('/mentor-dashboard');
      }, 1500);
    } 
    // Check for dummy mentee credentials
    else if (email === 'mentee@example.com' && password === '12345678') {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Success!",
          description: "You've successfully signed in as a mentee.",
        });
        navigate('/dashboard');
      }, 1500);
    }
    // Default sign in
    else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Please use mentor@example.com/12345678 for mentor access or mentee@example.com/12345678 for mentee access.",
        });
      }, 1500);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Redirect based on user type
      if (userType === 'mentor') {
        toast({
          title: "Mentor account created!",
          description: "You've successfully created a mentor account.",
        });
        navigate('/mentor-dashboard');
      } else {
        toast({
          title: "Mentee account created!",
          description: "You've successfully created a mentee account.",
        });
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <Tabs defaultValue={defaultTab} className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <form onSubmit={handleSignIn} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-mentor-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="text-sm text-gray-500 italic">
            <p>Mentor login: mentor@example.com / 12345678</p>
            <p>Mentee login: mentee@example.com / 12345678</p>
          </div>
          <Button type="submit" className="w-full bg-mentor-primary hover:bg-mentor-secondary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </TabsContent>
      <TabsContent value="sign-up">
        <form onSubmit={handleSignUp} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <Input id="email-signup" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <Input id="password-signup" type="password" required />
          </div>
          <div className="space-y-2">
            <Label>I want to join as</Label>
            <RadioGroup defaultValue={userType} onValueChange={(value) => setUserType(value as 'mentee' | 'mentor')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mentee" id="mentee" />
                <Label htmlFor="mentee" className="cursor-pointer">Mentee (seeking guidance)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mentor" id="mentor" />
                <Label htmlFor="mentor" className="cursor-pointer">Mentor (offering expertise)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-mentor-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-mentor-primary hover:underline">
              Privacy Policy
            </a>
            .
          </div>
          <Button type="submit" className="w-full bg-mentor-primary hover:bg-mentor-secondary" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
