
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Check, Upload, User } from 'lucide-react';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-4 w-full max-w-xl">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage how your profile appears to others on the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile picture" />
                    <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Change avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Mentee" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" defaultValue="Software Engineering Student" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" rows={4} defaultValue="I'm a computer science student passionate about software engineering and looking to build my career in tech. I'm interested in web development and machine learning." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                  
                  <Button className="w-fit bg-mentor-primary">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>
                  List your skills and areas of interest to match with the right mentors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (separated by commas)</Label>
                  <Input id="skills" defaultValue="JavaScript, React, Node.js, Python" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Areas of interest</Label>
                  <Input id="interests" defaultValue="Web Development, Machine Learning, Career Growth" />
                </div>
                
                <Button className="w-fit bg-mentor-primary">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Account Tab */}
          <TabsContent value="account" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Update your account email and password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="mentee@example.com" />
                </div>

                <div className="space-y-4">
                  <Label>Change Password</Label>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Current password" />
                  </div>
                  <div className="space-y-2">
                    <Input type="password" placeholder="New password" />
                  </div>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                
                <Button className="w-fit bg-mentor-primary">Update Account</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                  Set your general availability for mentoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Accept new mentoring requests</Label>
                        <p className="text-xs text-muted-foreground">
                          Toggle off to temporarily stop receiving new requests
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Preferred session length</Label>
                      <RadioGroup defaultValue="30">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="30" id="30min" />
                          <Label htmlFor="30min">30 minutes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="45" id="45min" />
                          <Label htmlFor="45min">45 minutes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="60" id="60min" />
                          <Label htmlFor="60min">60 minutes</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <Button className="w-fit bg-mentor-primary">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email me about:</Label>
                    
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-messages" className="text-sm">New messages</Label>
                        <Switch id="new-messages" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="session-reminders" className="text-sm">Session reminders</Label>
                        <Switch id="session-reminders" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="session-requests" className="text-sm">New session requests</Label>
                        <Switch id="session-requests" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="platform-updates" className="text-sm">Platform updates</Label>
                        <Switch id="platform-updates" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-emails" className="text-sm">Marketing emails</Label>
                        <Switch id="marketing-emails" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-mentor-primary">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and visibility on the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Show Online Status</Label>
                      <p className="text-sm text-muted-foreground">Display when you're online to others</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Allow Contact Requests</Label>
                      <p className="text-sm text-muted-foreground">Let others request to connect with you</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Appear in Search Results</Label>
                      <p className="text-sm text-muted-foreground">Be discoverable in platform searches</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button className="bg-mentor-primary">Save Privacy Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
