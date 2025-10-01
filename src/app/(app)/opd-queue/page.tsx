
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Bell, Send, Stethoscope, Briefcase, Plane, MapPin, Phone, Globe, Share2, Map, Award, Calendar, History, ChevronDown, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';


const queue = [
    { token: 19, name: "Bala Krishna", status: "Consulting" },
    { token: 20, name: "Ashok Kumar", status: "Waiting" },
    { token: 21, name: "Sreenu", status: "Waiting" },
    { token: 22, name: "Sathyam", status: "Waiting" },
    { token: 23, name: "Chinta Lokesh Babu", status: "You are here" },
    { token: 24, name: "s. narayana", status: "Waiting" },
];

const messages = [
    { sender: "doctor", text: "Hello Chinta, your turn is next. Please be ready.", time: "10:30 AM" },
    { sender: "user", text: "Okay, doctor. I have my reports ready.", time: "10:32 AM" },
    { sender: "doctor", text: "Excellent. I will call you in shortly.", time: "10:33 AM" },
];

const quickQuestions = [
    "How long is the wait?",
    "Is the doctor available?",
    "Can I share my reports?",
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
        name: "Guntur Kidney & Multispeciality Hospital",
        address: "Kothapet, Guntur, Andhra Pradesh 522001",
        phone: "8008334948",
        website: "https://gunturkidneyhospital.com",
        location: "Guntur",
    },
    status: "Available", // Can be "Available", "In Surgery", "On Leave"
};

const otherAppointments = [
    {
        doctor: "Dr. Dokku Vasu Babu",
        specialty: "Cardiologist",
        date: "2024-08-05",
        time: "11:00 AM",
    },
    {
        doctor: "Dr. Lakshmi Narasaiah",
        specialty: "Orthopedic Surgeon",
        date: "2024-08-12",
        time: "02:30 PM",
    }
];

const previousAppointments = [
    {
        doctor: "Dr. Anjali",
        specialty: "General Physician",
        date: "2024-07-15",
        notes: "Consultation for seasonal flu. Prescribed Paracetamol."
    },
    {
        doctor: "Dr. Subbamma",
        specialty: "Dermatologist",
        date: "2024-06-28",
        notes: "Follow-up on skin rash. Advised to continue medication."
    },
    {
        doctor: "Dr. Ramesh Babu",
        specialty: "Nephrologist",
        date: "2024-05-20",
        notes: "Regular kidney check-up. Reports were normal."
    }
];

const prescriptionHistoryData = [
    {
        title: "1st Follow-up Prescription",
        status: "Completed",
        date: "Jul 1, 2024 - Jul 14, 2024",
        doctor: "Dr. Rajesh Kumar",
        summary: "Prescription for initial viral infection treatment.",
        medicines: ["Paracetamol 500mg", "Cetirizine 10mg"]
    }
];


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
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-chat))'}}>Appointments &amp; History</h1>
                <p className="text-muted-foreground mt-2">
                    {today ? `Status for your appointments on ${today}.` : 'Loading date...'}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card className="border-primary/20" style={{backgroundColor: 'hsla(var(--nav-chat)/0.1)', borderColor: 'hsla(var(--nav-chat)/0.2)'}}>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base" style={{color: 'hsl(var(--nav-chat))'}}><User /> Your Token</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-4xl font-bold" style={{color: 'hsl(var(--nav-chat))'}}>#23</p>
                        <div className="flex items-center justify-center gap-2 mt-1 text-xs" style={{color: 'hsla(var(--nav-chat)/0.8)'}}>
                            <Clock className="w-3 h-3" />
                            <span className="font-semibold">Est. Wait: 5 mins</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Now Serving</CardTitle>
                        <CardDescription className="text-xs">Patient with the doctor</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-4xl font-bold">#19</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <Avatar className="h-24 w-24 border-4" style={{borderColor: 'hsl(var(--nav-chat))'}}>
                            <AvatarImage src={appointmentDetails.doctor.avatar} data-ai-hint={appointmentDetails.doctor.dataAiHint} />
                            <AvatarFallback>{appointmentDetails.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <CardTitle className="text-2xl">{appointmentDetails.doctor.name}</CardTitle>
                            <CardDescription className="font-semibold text-base" style={{color: 'hsl(var(--nav-chat))'}}>{appointmentDetails.doctor.specialty}</CardDescription>
                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
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
                    </div>
                </CardHeader>
            </Card>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>OP Status (డాక్టర్ స్థితి)</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className={`flex items-start gap-4 p-4 ${currentStatusInfo.color} rounded-lg border bg-background`}>
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
                        </CardContent>
                    </Card>

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
                                           className={patient.status === 'Consulting' ? 'bg-primary' : (patient.token === 23 ? 'border-primary text-primary' : '')}
                                           style={patient.status === 'Consulting' ? {backgroundColor: 'hsl(var(--nav-chat))'} : (patient.token === 23 ? {borderColor: 'hsl(var(--nav-chat))', color: 'hsl(var(--nav-chat))'} : {})}
                                        >
                                            {patient.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5"/>Previous Appointments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {previousAppointments.map((appt, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                                    <div>
                                        <p className="font-semibold">{appt.doctor}</p>
                                        <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                                         <p className="text-xs text-muted-foreground mt-2">{appt.notes}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4"/> {appt.date}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><History /> Prescription History</CardTitle>
                            <CardDescription>Review your past treatment plans.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {prescriptionHistoryData.map((item, index) => (
                                <Collapsible key={index} className="border rounded-lg">
                                    <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors flex items-center justify-between">
                                        <div className="text-left">
                                            <p className="text-lg font-bold">{item.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'}>{item.status}</Badge>
                                                <p className="text-sm font-semibold text-muted-foreground">{item.date}</p>
                                            </div>
                                        </div>
                                        <ChevronDown className="h-5 w-5 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 border-t space-y-4">
                                        <div>
                                            <p className="font-semibold text-base">Prescribed by:</p>
                                            <p className="text-muted-foreground">{item.doctor}</p>
                                        </div>
                                            <div>
                                            <p className="font-semibold text-base">Summary:</p>
                                            <p className="text-muted-foreground">{item.summary}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base">Medications in this plan:</p>
                                            <ul className="list-disc list-inside text-muted-foreground">
                                                {item.medicines.map(med => <li key={med}>{med}</li>)}
                                            </ul>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <FileText className="mr-2 h-4 w-4" /> View Full Prescription
                                        </Button>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                 <Card className="flex flex-col h-[70vh] lg:h-auto">
                    <CardHeader className="flex flex-row items-center gap-4 border-b">
                        <Avatar>
                            <AvatarImage src={appointmentDetails.doctor.avatar} data-ai-hint={appointmentDetails.doctor.dataAiHint} />
                            <AvatarFallback>{appointmentDetails.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{appointmentDetails.doctor.name}</CardTitle>
                            <p className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                                </span>
                                Online
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'justify-end ml-auto' : 'justify-start'}`}>
                                {msg.sender === 'doctor' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={appointmentDetails.doctor.avatar} data-ai-hint={appointmentDetails.doctor.dataAiHint} />
                                        <AvatarFallback>{appointmentDetails.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'text-primary-foreground' : 'bg-muted'}`}
                                 style={msg.sender === 'user' ? {backgroundColor: 'hsl(var(--nav-chat))'} : {}}>
                                    <p>{msg.text}</p>
                                    <p className={`text-xs mt-1 text-right ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>

                                </div>
                                {msg.sender === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/images/profile.jpg" />
                                        <AvatarFallback>CL</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="border-t p-4 space-y-4 flex-col items-start bg-muted/30">
                         <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((q, i) => (
                                 <Button key={i} variant="outline" size="sm" className="text-xs">{q}</Button>
                            ))}
                        </div>
                        <div className="flex w-full items-center space-x-2">
                            <Input type="text" placeholder="Type your message..." className="flex-1" />
                            <Button type="submit" size="icon" style={{backgroundColor: 'hsl(var(--nav-chat))'}}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

    
