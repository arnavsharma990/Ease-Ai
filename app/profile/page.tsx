"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Camera, Pencil, Save } from "lucide-react";
import Image from "next/image";

// Helper function to get stored profile data
const getStoredProfileData = (email: string) => {
  try {
    const savedData = localStorage.getItem(`profile-${email}`);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved data when component mounts and user is authenticated
  useEffect(() => {
    if (session?.user?.email && !isInitialized) {
      const storedData = getStoredProfileData(session.user.email);
      if (storedData) {
        setFormData(storedData);
      } else {
        // If no saved data, initialize with user's name from session
        setFormData(prev => ({
          ...prev,
          name: session.user?.name || "",
        }));
      }
      setIsInitialized(true);
    }
  }, [session, isInitialized]);

  // Save data whenever formData changes
  useEffect(() => {
    if (session?.user?.email && isInitialized) {
      localStorage.setItem(`profile-${session.user.email}`, JSON.stringify(formData));
    }
  }, [formData, session?.user?.email, isInitialized]);

  if (status === "loading") {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-lg">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user?.email) {
      // Data is already saved in the useEffect hook
      console.log("Form submitted:", formData);
    }
    setIsEditing(false);
  };

  return (
    <div className="container max-w-4xl py-10 px-4 md:px-6">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 md:mt-0"
            variant={isEditing ? "destructive" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Picture Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/blank-profile.jpg"
                      alt=""
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority
                    />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        disabled={!isEditing}
                        className="pr-10"
                      />
                      {isEditing && <Pencil className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Email Field (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  {/* Age Field */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter your age"
                      disabled={!isEditing}
                      min="0"
                      max="120"
                    />
                  </div>

                  {/* Gender Field */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Country Field */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isEditing && (
                  <Button type="submit" className="w-full mt-6" size="lg">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 