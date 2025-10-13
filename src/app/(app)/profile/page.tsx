

'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Pencil, User, Heart, Droplets, Phone, Settings, CreditCard, Shield } from "lucide-react";
import { allMenuItems, type MenuItem } from "@/lib/nav-config";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";


function CustomizeNavigationCard() {
    const [navSettings, setNavSettings] = React.useState<Record<string, boolean>>({});
    const [isClient, setIsClient] = React.useState(false);
    const { toast } = useToast();

    React.useEffect(() => {
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
            <Card>
                <CardContent className="p-4 sm:p-6 space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between gap-4">
                         <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4" style={{borderColor: 'hsl(var(--nav-profile))'}}>
                                <AvatarImage src="/images/profile.jpg" />
                                <AvatarFallback className="text-3xl">CL</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h1 className="text-xl font-bold">Chinta Lokesh Babu</h1>
                                <p className="font-semibold text-muted-foreground text-sm">Patient ID: PAT001</p>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1"><User className="h-3 w-3" /> 27 years</div>
                                    <div className="flex items-center gap-1"><Heart className="h-3 w-3" /> Male</div>
                                    <div className="flex items-center gap-1"><Droplets className="h-3 w-3" /> O+</div>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <Pencil className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}} />
                        </Button>
                    </div>

                    <Separator />

                    {/* Address and Contact */}
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                            <MapPin style={{color: 'hsl(var(--nav-profile))'}}/> Address & Contact
                        </h3>
                        <div className="grid grid-cols-1 gap-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail style={{color: 'hsl(var(--nav-profile))'}} className="h-4 w-4 flex-shrink-0"/>
                                <span className="text-muted-foreground">lokeshbabu9298@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone style={{color: 'hsl(var(--nav-profile))'}} className="h-4 w-4 flex-shrink-0"/>
                                <span className="text-muted-foreground">+91 8008334948</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin style={{color: 'hsl(var(--nav-profile))'}} className="h-4 w-4 mt-1 flex-shrink-0"/>
                                <span className="text-muted-foreground">Rentala village, Rentachintala mandal, Palnadu district, Andhra Pradesh, India</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Identity Verification */}
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                            <CreditCard style={{color: 'hsl(var(--nav-profile))'}} /> Identity Verification
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                            <div className="space-y-1">
                                <p className="font-semibold">Aadhar Card</p>
                                <p className="text-sm text-muted-foreground">Optionally link your Aadhar for faster verification at hospitals.</p>
                            </div>
                            <Button variant="outline">Add</Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
            
            <CustomizeNavigationCard />
        </div>
    );
}

