
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Stethoscope, Briefcase, Plane, MapPin, Phone, Globe, Share2, Map, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const queue = [
    { token: 19, name: "Bala Krishna", status: "Consulting" },
    { token: 20, name: "Ashok Kumar", status: "Waiting" },
    { token: 21, name: "Sreenu", status: "Waiting" },
    { token: 22, name: "Sathyam", status: "Waiting" },
    { token: 23, name: "Chinta Lokesh Babu", status: "You are here" },
    { token: 24, name: "s. narayana", status: "Waiting" },
];

const appointmentDetails = {
    doctor: {
        name: "Dr. Ramesh Babu",
        specialty: "Nephrologist",
        avatar: "https://picsum.photos/seed/doc8/100/100",
        dataAiHint: "male doctor professional",
        surgeries: "300+ kidney transplants",
        mainDealing: "Chronic kidney disease and dialysis.",
    },
    hospital: {
        name: "Guntur Kidney &amp; Multispeciality Hospital",
        address: "Kothapet, Guntur, Andhra Pradesh 522001",
        phone: "8008334948",
        website: "https://gunturkidneyhospital.com",
        location: "Guntur",
    },
    status: "Available", // Can be "Available", "In Surgery", "On Leave"
};

const getStatusInfo = (status: string) => {
    switch (status) {
        case "Available":
            return {
                icon: Stethoscope,
                color: "border-green-200",
                textColor: "text-green-800",
                indicator: true,
                details: "The doctor is available for consultation.",
                teluguStatus: "అందుబాటులో ఉన్నారు",
                teluguDetails: "డాక్టర్ సంప్రదింపులకు అందుబాటులో ఉన్నారు."
            };
        case "In Surgery":
            return {
                icon: Briefcase,
                color: "border-yellow-200",
                textColor: "text-yellow-800",
                details: "Estimated back in 2 hours",
                indicator: false,
                teluguStatus: "శస్త్రచికిత్సలో ఉన్నారు",
                teluguDetails: "సుమారు 2 గంటలలో తిరిగి వస్తారు"
            };
        case "On Leave":
            return {
                icon: Plane,
                color: "border-red-200",
                textColor: "text-red-800",
                details: "Doctor will be back tomorrow.",
                indicator: false,
                teluguStatus: "సెలవులో ఉన్నారు",
                teluguDetails: "డాక్టర్ రేపు తిరిగి వస్తారు."
            };
        default:
            return {
                icon: Stethoscope,
                color: "border-muted",
                textColor: "text-foreground",
                indicator: false,
                details: "Status unavailable",
                teluguStatus: "స్థితి అందుబాటులో లేదు",
                teluguDetails: "దయచేసి తర్వాత ప్రయత్నించండి."
            };
    }
};

export default function OpdQueuePage() {
    const [today, setToday] = useState('');
    
    useEffect(() => {
        setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    const currentStatusInfo = getStatusInfo(appointmentDetails.status);
    const StatusIcon = currentStatusInfo.icon;
    
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-chat))'}}>Live OPD Status</h1>
                <p className="text-muted-foreground mt-2">
                    {today ? `Live status for your appointments on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.` : 'Loading date...'}
                </p>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex justify-around items-center">
                    <div className="text-center">
                        <CardTitle className="flex items-center justify-center gap-2 text-base text-blue-800"><User /> Your Token</CardTitle>
                        <p className="text-4xl font-bold mt-2 text-blue-800">#23</p>
                        <div className="flex items-center justify-center gap-2 mt-1 text-xs text-blue-700">
                            <Clock className="w-3 h-3" />
                            <span className="font-semibold">Est. Wait: 5 mins</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <CardTitle className="text-base text-blue-800">Now Serving</CardTitle>
                        <CardDescription className="text-xs text-blue-700">Patient with the doctor</CardDescription>
                        <p className="text-4xl font-bold mt-2 text-blue-800">#19</p>
                    </div>
                </div>
            </Card>

            <div className="grid lg:grid-cols-1 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Live Queue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {queue.map(patient => (
                                <div key={patient.token} className={`flex items-center justify-between p-3 rounded-lg ${patient.token === 23 ? 'bg-primary/10' : 'bg-muted/40'}`} style={patient.token === 23 ? {backgroundColor: 'hsla(var(--nav-chat)/0.1)'} : {}}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold text-lg ${patient.token === 23 ? 'text-primary-foreground' : 'bg-muted'}`} style={patient.token === 23 ? {backgroundColor: 'hsl(var(--nav-chat))'} : {}}>
                                            {patient.token}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{patient.name}</p>
                                        </div>
                                    </div>
                                    <Badge variant={patient.status === 'Consulting' ? 'default' : (patient.token === 23 ? 'outline' : 'secondary')}
                                    className={cn('w-fit')}
                                    style={patient.status === 'Consulting' ? {backgroundColor: 'hsl(var(--nav-chat))'} : (patient.token === 23 ? {borderColor: 'hsl(var(--nav-chat))', color: 'hsl(var(--nav-chat))'} : {})}
                                    >
                                        {patient.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

             <Card>
                 <CardHeader className="flex flex-col sm:flex-row items-start gap-6">
                    <Avatar className="h-24 w-24 border-4" style={{borderColor: 'hsl(var(--nav-chat))'}}>
                        <AvatarImage src={appointmentDetails.doctor.avatar} data-ai-hint={appointmentDetails.doctor.dataAiHint} />
                        <AvatarFallback>{appointmentDetails.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-2xl">{appointmentDetails.doctor.name}</CardTitle>
                        <CardDescription className="font-semibold text-base" style={{color: 'hsl(var(--nav-chat))'}}>{appointmentDetails.doctor.specialty}</CardDescription>
                        
                        <div className={`mt-4 flex items-start gap-4 p-4 ${currentStatusInfo.color} rounded-lg border bg-background`}>
                            <StatusIcon className={`h-6 w-6 ${currentStatusInfo.textColor} mt-1`}/>
                            <div className="flex-1">
                                <p className={`font-bold ${currentStatusInfo.textColor} flex items-center gap-2`}>
                                    {appointmentDetails.status} ({currentStatusInfo.teluguStatus})
                                </p>
                                <p className={`text-sm ${currentStatusInfo.textColor}/80`}>{currentStatusInfo.details}</p>
                                <p className={`text-sm ${currentStatusInfo.textColor}/80`}>{currentStatusInfo.teluguDetails}</p>
                            </div>
                            {currentStatusInfo.indicator && (
                                <span className="relative flex h-4 w-4 mt-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-600"></span>
                                </span>
                            )}
                        </div>
                        
                        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" style={{color: 'hsl(var(--nav-chat))'}}/><strong>Successful Surgeries:</strong> {appointmentDetails.doctor.surgeries}</p>
                            <p className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" style={{color: 'hsl(var(--nav-chat))'}}/><strong>Main Focus:</strong> {appointmentDetails.doctor.mainDealing}</p>
                        </div>
                            <div className="mt-4 space-y-2 text-sm">
                            <p className="font-bold text-lg">{appointmentDetails.hospital.name}</p>
                            <p className="flex items-start gap-2 text-muted-foreground"><MapPin className="h-4 w-4 mt-1 flex-shrink-0"/> {appointmentDetails.hospital.address}</p>
                            <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4"/> {appointmentDetails.hospital.phone}</p>
                            <a href={appointmentDetails.hospital.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline" style={{color: 'hsl(var(--nav-chat))'}}>
                                <Globe className="h-4 w-4"/> Visit Website
                            </a>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm">
                                    <Share2 className="mr-2 h-4 w-4"/> Share Directions
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Map className="mr-2 h-4 w-4"/> View Location
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
