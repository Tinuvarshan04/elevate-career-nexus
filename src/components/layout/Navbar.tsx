
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Calendar, 
  MessageSquare, 
  Bell 
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { AuthTabs } from '@/components/auth/AuthTabs';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-r from-mentor-primary to-mentor-secondary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
            </Link>
            <Link to="/" className="ml-3 text-xl font-bold text-gray-900">
              Mentor Connect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/discover" className="text-gray-600 hover:text-mentor-primary px-3 py-2">
              Find Mentors
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-mentor-primary px-3 py-2">
              How It Works
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-mentor-primary px-3 py-2">
              Resources
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-mentor-primary px-3 py-2">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </div>
            </Link>
            <div className="ml-4 space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Sign In</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogTitle>Sign In</DialogTitle>
                  <DialogDescription>Access your mentor or mentee account.</DialogDescription>
                  <AuthTabs />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-mentor-primary hover:bg-mentor-secondary">Join Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogTitle>Create Account</DialogTitle>
                  <DialogDescription>Join as a mentor or mentee today.</DialogDescription>
                  <AuthTabs defaultTab="sign-up" />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-mentor-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 space-y-2 border-t border-gray-200 fade-in">
          <Link 
            to="/discover" 
            className="block px-3 py-2 text-gray-600 hover:bg-mentor-light rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Mentors
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 text-gray-600 hover:bg-mentor-light rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/resources" 
            className="block px-3 py-2 text-gray-600 hover:bg-mentor-light rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <Link 
            to="/chat" 
            className="block px-3 py-2 text-gray-600 hover:bg-mentor-light rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </div>
          </Link>
          <div className="pt-2 space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-center">Sign In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>Access your mentor or mentee account.</DialogDescription>
                <AuthTabs />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full justify-center bg-mentor-primary hover:bg-mentor-secondary">Join Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>Join as a mentor or mentee today.</DialogDescription>
                <AuthTabs defaultTab="sign-up" />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </nav>
  );
}
