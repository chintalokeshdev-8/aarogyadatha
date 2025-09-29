
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Droplets, MapPin, UserPlus, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


const bloodRequestsData = [
    { patientName: "lokesh chinta", bloodType: "O+", city: "guntur", contactInfo: "lokesh@email.com", postedAt: new Date(Date.now() - 1000 * 60 * 5) },
    { patientName: "venkatesh", bloodType: "A+", city: "hyderabad", contactInfo: "venky@email.com", postedAt: new Date(Date.now() - 1000 * 60 * 30) },
    { patientName: "surya", bloodType: "B-", city: "guntur", contactInfo: "surya@email.com", postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { patientName: "pavan", bloodType: "AB+", city: "vijayawada", contactInfo: "pavan@email.com", postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5) },
];

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const cities = ["All", "guntur", "hyderabad", "vijayawada", "mumbai", "bangalore"];

export default function BloodBankPage() {
    const [bloodRequests, setBloodRequests] = useState<any[]>([]);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent, successMessage: string) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: "Success!",
                description: successMessage,
            });
        }, 1500);
    };

    useEffect(() => {
        // This runs only on the client, after hydration
        setBloodRequests(bloodRequestsData.map(req => ({
            ...req,
            postedAtString: formatDistanceToNow(req.postedAt, { addSuffix: true })
        })));
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-extrabold text-2xl" style={{color: 'hsl(var(--nav-blood-bank))'}}><Droplets/> Blood Bank</CardTitle>
                <CardDescription>Connect with donors or request blood in critical moments.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="find" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-auto p-1">
                        <TabsTrigger value="find" className="text-sm font-semibold h-14">
                            Find a Donor
                        </TabsTrigger>
                        <TabsTrigger value="request" className="text-sm font-semibold h-14 whitespace-normal text-center">
                            Request Blood
                        </TabsTrigger>
                        <TabsTrigger value="register" className="text-sm font-semibold h-14 whitespace-normal text-center flex-col gap-1">
                            <div className='flex items-center gap-2'><UserPlus className="h-4 w-4"/>Become a Donor</div>
                        </TabsTrigger>
                    </TabsList>
                    <div className="mt-6">
                        <TabsContent value="find" className="mt-0">
                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by Blood Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bloodGroups.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3 max-h-96 overflow-y-auto p-1">
                                    {bloodRequests.length === 0 && (
                                        <div className="text-center p-8 text-muted-foreground">Loading...</div>
                                    )}
                                    {bloodRequests.map((req, index) => (
                                        <Card key={index} className="p-4 shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-extrabold text-lg flex items-center gap-2">
                                                        <User className="h-4 w-4"/> {req.patientName}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <Badge variant="destructive" className="text-base font-bold px-3 py-1" style={{backgroundColor: 'hsl(var(--nav-blood-bank))'}}>{req.bloodType}</Badge>
                                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                            <MapPin className="h-4 w-4"/> {req.city}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Button className="bg-green-600 hover:bg-green-700">Contact</Button>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        {req.postedAtString}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="request" className="mt-0">
                            <form className="space-y-4" onSubmit={(e) => handleSubmit(e, "Your blood request has been posted successfully.")}>
                                <div className="space-y-2">
                                    <Label htmlFor="patientName">Patient Name</Label>
                                    <Input id="patientName" placeholder="Enter patient's name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bloodType">Blood Group</Label>
                                        <Select>
                                            <SelectTrigger id="bloodType">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bloodGroups.slice(1).map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                         <Select>
                                            <SelectTrigger id="city">
                                                <SelectValue placeholder="Select City" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.slice(1).map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactInfo">Contact Info (Phone or Email)</Label>
                                    <Input id="contactInfo" placeholder="Enter contact details" />
                                </div>
                                <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-blood-bank))'}} disabled={isSubmitting}>
                                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...</> : 'Post Blood Request'}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="register" className="mt-0">
                            <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "You have been registered as a donor. Thank you!")}>
                                <div className="space-y-2">
                                    <Label htmlFor="donorName">Full Name</Label>
                                    <Input id="donorName" placeholder="Enter your full name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="donorBloodType">Blood Group</Label>
                                        <Select>
                                            <SelectTrigger id="donorBloodType">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bloodGroups.slice(1).map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="donorCity">City</Label>
                                         <Select>
                                            <SelectTrigger id="donorCity">
                                                <SelectValue placeholder="Select City" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.slice(1).map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="donorContact">Contact Info (Phone or Email)</Label>
                                    <Input id="donorContact" placeholder="Enter contact details" />
                                </div>
                                 <div className="flex items-center space-x-4 rounded-md border p-4">
                                    <UserPlus className="h-6 w-6"/>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">Available to Donate</p>
                                        <p className="text-sm text-muted-foreground">
                                            Enable this to appear in searches for nearby donation requests.
                                        </p>
                                    </div>
                                    <Switch id="availability-mode" />
                                </div>
                                <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-blood-bank))'}} disabled={isSubmitting}>
                                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : 'Register as a Donor'}
                                </Button>
                            </form>
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}

    