"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    if (user?.email) {
      const savedProfile = localStorage.getItem(`profile_${user.email}`);
      if (savedProfile) {
        setFormData(JSON.parse(savedProfile));
      } else {
        setFormData({
          name: user.displayName || '',
          email: user.email,
          phone: '',
          address: '',
          bio: '',
        });
      }
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      redirect('/auth/signin');
    }
  }, [loading, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.email) {
      try {
        localStorage.setItem(`profile_${user.email}`, JSON.stringify(formData));
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving user data:", error);
        toast({
          title: "Error",
          description: "Failed to save profile data. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-lg">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container max-w-4xl py-10 px-4 md:px-6">
      <div className="space-y-8">
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
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/blank-profile.jpg"
                      alt="Default Profile"
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

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter your address"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Enter your bio"
                      disabled={!isEditing}
                    />
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