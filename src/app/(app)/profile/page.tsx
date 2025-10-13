

'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Pencil, User, Heart, Droplets, Phone, Settings, CreditCard } from "lucide-react";
import { allMenuItems, type MenuItem } from "@/lib/nav-config";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

function CustomizeNavigationCard() {
    const [navSettings, setNavSettings] = useState<Record<string, boolean>>({});
    const [isClient, setIsClient] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsClient(true);
        const savedSettings = localStorage.getItem('navSettings');
        if (savedSettings) {
            setNavSettings(JSON.parse(savedSettings));
        } else {
            const defaultSettings: Record<string, boolean> = {};
            allMenuItems.forEach(item => {
                defaultSettings[item.id] = item.defaultVisible;
            });
            setNavSettings(defaultSettings);
        }
    }, []);

    const handleToggle = (id: string, isEnabled: boolean) => {
        const newSettings = { ...navSettings, [id]: isEnabled };
        setNavSettings(newSettings);
        localStorage.setItem('navSettings', JSON.stringify(newSettings));
        toast({
            title: "Navigation Updated",
            description: "Changes will apply on the next page load.",
        });
    };

    if (!isClient) {
        return null; 
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings style={{color: 'hsl(var(--nav-profile))'}} /> Customize Navigation</CardTitle>
                <CardDescription>Choose which icons appear in the bottom navigation bar for quick access. Changes will apply on next page load.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {allMenuItems.filter(item => item.customizable).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                        <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" style={{ color: item.color }} />
                            <p className="font-semibold">{item.label}</p>
                        </div>
                        <Switch
                            checked={navSettings[item.id] === undefined ? item.defaultVisible : navSettings[item.id]}
                            onCheckedChange={(checked) => handleToggle(item.id, checked)}
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default function ProfilePage() {

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card border rounded-lg">
                <Avatar className="h-28 w-28 border-4" style={{borderColor: 'hsl(var(--nav-profile))'}}>
                    <AvatarImage src="/images/profile.jpg" />
                    <AvatarFallback className="text-3xl">CL</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <p className="font-semibold text-muted-foreground">S.No: 1</p>
                    <h1 className="text-3xl font-bold">Chinta Lokesh Babu</h1>
                    <p className="text-lg font-semibold text-muted-foreground">Patient ID: PAT001</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-2"><User /> 27 years old</div>
                        <div className="flex items-center gap-2"><Heart /> Male</div>
                        <div className="flex items-center gap-2"><Droplets /> O+ Positive</div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-2"><MapPin /> Rentachintala, Palnadu District</div>
                    </div>
                </div>
                <Button style={{backgroundColor: 'hsl(var(--nav-profile))'}}><Pencil className="mr-2 h-4 w-4" /> Edit Profile</Button>
            </div>
            <div className="p-6 bg-card border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-3"><Mail style={{color: 'hsl(var(--nav-profile))'}} className="h-5 w-5"/><span>lokeshbabu9298@gmail.com</span></div>
                    <div className="flex items-center gap-3"><Phone style={{color: 'hsl(var(--nav-profile))'}} className="h-5 w-5"/><span>+91 8008334948</span></div>
                    <div className="flex items-start gap-3"><MapPin style={{color: 'hsl(var(--nav-profile))'}} className="h-5 w-5 mt-1"/><span>Rentala village, Rentachintala mandal, Palnadu district, India</span></div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CreditCard style={{color: 'hsl(var(--nav-profile))'}} /> Identity Verification</CardTitle>
                        <CardDescription>Optionally link your Aadhar card for faster verification at hospitals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                            <div className="flex items-center gap-4">
                                <User className="h-6 w-6 text-muted-foreground" />
                                <p className="font-semibold">Aadhar Card</p>
                            </div>
                            <Button variant="outline">Add (Optional)</Button>
                        </div>
                    </CardContent>
                </Card>

                <CustomizeNavigationCard />
            </div>
        </div>
    );
}
