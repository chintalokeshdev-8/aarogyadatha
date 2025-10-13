

'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Pencil, User, Heart, Droplets, Phone, Settings, CreditCard, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export default function ProfilePage() {

    return (
        <div className="space-y-8">
            <Card className="relative">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/70 flex-shrink-0">
                    <Pencil className="h-4 w-4" style={{color: 'hsl(var(--nav-profile))'}} />
                </Button>
                <CardContent className="p-4 sm:p-6 space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-4" style={{borderColor: 'hsl(var(--nav-profile))'}}>
                            <AvatarImage src="/images/profile.jpg" />
                            <AvatarFallback className="text-2xl">CL</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-xl font-bold whitespace-nowrap">Chinta Lokesh Babu</h1>
                            <p className="font-semibold text-foreground text-sm">Patient ID: PAT001</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground font-semibold">
                                <div className="flex items-center gap-1"><User className="h-3 w-3 text-muted-foreground" /> 27 years</div>
                                <div className="flex items-center gap-1"><Heart className="h-3 w-3 text-muted-foreground" /> Male</div>
                                <div className="flex items-center gap-1"><Droplets className="h-3 w-3 text-muted-foreground" /> O+</div>
                            </div>
                        </div>
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
        </div>
    );
}
