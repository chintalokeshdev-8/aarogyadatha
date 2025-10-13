
'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Pencil, User, Heart, Droplets, Phone, Settings, CreditCard, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    const [profileData, setProfileData] = useState({
        name: "Chinta Lokesh Babu",
        patientId: "PAT001",
        age: "27",
        gender: "Male",
        bloodGroup: "O+",
        email: "lokeshbabu9298@gmail.com",
        phone: "+91 8008334948",
        address: "Rentala village, Rentachintala mandal, Palnadu district, Andhra Pradesh, India",
        aadhar: ""
    });

    const [formData, setFormData] = useState(profileData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        setProfileData(formData);
    };

    return (
        <div className="space-y-8">
            <Card className="relative">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-muted/70 flex-shrink-0">
                            <Pencil className="h-4 w-4" style={{color: 'hsl(var(--nav-profile))'}} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" value={formData.address} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="aadhar">Aadhar Number</Label>
                                <Input id="aadhar" value={formData.aadhar} onChange={handleInputChange} placeholder="Enter 12-digit Aadhar number"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" onClick={handleSave} style={{ backgroundColor: 'hsl(var(--nav-profile))' }}>Save Changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                
                <CardContent className="p-4 sm:p-6 space-y-4">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-4" style={{borderColor: 'hsl(var(--nav-profile))'}}>
                            <AvatarImage src="/images/profile.jpg" />
                            <AvatarFallback className="text-2xl">CL</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-xl font-bold whitespace-nowrap">{profileData.name}</h1>
                            <p className="font-semibold text-sm text-foreground">Patient ID: {profileData.patientId}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground font-semibold">
                                <div className="flex items-center gap-1"><User className="h-3 w-3 text-muted-foreground" /> {profileData.age} years</div>
                                <div className="flex items-center gap-1"><Heart className="h-3 w-3 text-muted-foreground" /> {profileData.gender}</div>
                                <div className="flex items-center gap-1"><Droplets className="h-3 w-3 text-muted-foreground" /> {profileData.bloodGroup}</div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Address and Contact */}
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                            <MapPin style={{color: 'hsl(var(--nav-profile))'}}/> Address & Contact
                        </h3>
                        <div className="grid grid-cols-1 gap-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail style={{color: 'hsl(var(--nav-profile))'}} className="h-4 w-4 flex-shrink-0"/>
                                <span className="text-muted-foreground">{profileData.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone style={{color: 'hsl(var(--nav-profile))'}} className="h-4 w-4 flex-shrink-0"/>
                                <span className="text-muted-foreground">{profileData.phone}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin style={{color: 'hsl(var(--nav-profile))'}} className="h-4 w-4 mt-1 flex-shrink-0"/>
                                <span className="text-muted-foreground">{profileData.address}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Identity Verification */}
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                            <CreditCard style={{color: 'hsl(var(--nav-profile))'}} /> Identity Verification
                        </h3>
                        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                            <div className="space-y-1">
                                <p className="font-semibold">Aadhar Card</p>
                                <p className="text-sm text-muted-foreground">
                                    {profileData.aadhar ? `**** **** ${profileData.aadhar.slice(-4)}` : "Not linked"}
                                </p>
                            </div>
                             {profileData.aadhar ? (
                                <Button variant="outline" disabled>Linked</Button>
                             ) : (
                                <Button variant="outline" disabled>Add</Button>
                             )}
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
