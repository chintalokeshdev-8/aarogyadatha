
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Bell, Send, Stethoscope, Briefcase, Plane, MapPin, Phone, Globe, Share2, Map, Award, Calendar, History, ChevronDown, FileText, Pill, CheckCircle, XCircle, Search, Filter, X, PartyPopper } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlowerFall } from '@/components/ui/flower-fall';
import { previousAppointments } from '@/lib/appointments-data';


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
        name: "Guntur Kidney & Multispeciality Hospital",
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

const getReportStatusBadge = (status: string) => {
    switch (status) {
        case 'Abnormal': return 'destructive';
        case 'Normal': return 'default';
        default: return 'secondary';
    }
};

export default function OpdQueuePage() {
    const [today, setToday] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDoctor, setFilterDoctor] = useState('all');
    const [filterDate, setFilterDate] = useState<Date | undefined>();

    useEffect(() => {
        setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);
    
    const allDoctors = useMemo(() => {
        const doctors = new Set<string>();
        previousAppointments.forEach(appt => {
            doctors.add(appt.initialDoctor);
            appt.prescriptions.forEach(p => doctors.add(p.doctor));
        });
        return ['all', ...Array.from(doctors)];
    }, []);

    const filteredAppointments = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    
    return previousAppointments.filter(appt => {
        const doctorMatch = filterDoctor === 'all' || appt.initialDoctor === filterDoctor || appt.prescriptions.some(p => p.doctor === filterDoctor);
        const dateMatch = !filterDate || format(new Date(appt.date), 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd');

        if (!searchTerm) {
            return doctorMatch && dateMatch;
        }

        const keywordMatch = 
            appt.problem.toLowerCase().includes(lowercasedSearchTerm) ||
            appt.initialDoctor.toLowerCase().includes(lowercasedSearchTerm) ||
            appt.specialty.toLowerCase().includes(lowercasedSearchTerm) ||
            appt.date.toLowerCase().includes(lowercasedSearchTerm) ||
            appt.prescriptions.some(p => 
                p.title.toLowerCase().includes(lowercasedSearchTerm) ||
                p.doctor.toLowerCase().includes(lowercasedSearchTerm) ||
                p.summary.toLowerCase().includes(lowercasedSearchTerm) ||
                p.medicines.some(m => m.toLowerCase().includes(lowercasedSearchTerm)) ||
                p.details.some(d => d.name.toLowerCase().includes(lowercasedSearchTerm))
            );

        return keywordMatch && doctorMatch && dateMatch;
    });
}, [previousAppointments, searchTerm, filterDoctor, filterDate]);


    const clearFilters = () => {
        setSearchTerm('');
        setFilterDoctor('all');
        setFilterDate(undefined);
    };

    const currentStatusInfo = getStatusInfo(appointmentDetails.status);
    const StatusIcon = currentStatusInfo.icon;
    
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-chat))'}}>Appointments & History</h1>
                <p className="text-muted-foreground mt-2">
                    {today ? `Status for your appointments on ${format(new Date(), 'dd-MMM-yyyy')}.` : 'Loading date...'}
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
             </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl"><History />Appointments History</CardTitle>
                     <CardDescription>
                        Review your past consultations and prescriptions, grouped by health concern.
                        <br />
                        మీ గత సంప్రదింపులు మరియు ప్రిస్క్రిప్షన్‌లను, ఆరోగ్య సమస్యల వారీగా సమీక్షించండి.
                    </CardDescription>
                    <div className="border-t mt-4 pt-4">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5"/>
                                <h3 className="text-lg font-semibold">Filters</h3>
                            </div>
                             <Button variant="ghost" onClick={clearFilters} className="text-sm h-8 px-2">
                                <X className='mr-2 h-4 w-4' />
                                Clear Filters
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                            <div className="relative lg:col-span-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Search by reason, doctor, test..." 
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by Doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allDoctors.map(doc => <SelectItem key={doc} value={doc}>{doc === 'all' ? 'All Doctors' : doc}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "justify-start text-left font-normal",
                                    !filterDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {filterDate ? format(filterDate, "dd-MMM-yyyy") : <span>Filter by date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                    mode="single"
                                    selected={filterDate}
                                    onSelect={setFilterDate}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {filteredAppointments.length > 0 ? filteredAppointments.map((appt, index) => (
                        <Collapsible key={index} className="border rounded-lg">
                            <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors flex items-start justify-between text-left">
                                <div className="flex items-start gap-4">
                                    <div className="text-5xl font-extrabold text-blue-800 dark:text-blue-300">
                                        {index + 1}.
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xl font-bold">{appt.problem}</p>
                                        <div className="text-base font-semibold text-muted-foreground mt-1">{appt.specialty}</div>
                                        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2"><Calendar className="h-4 w-4"/> First seen: {format(new Date(appt.date), 'dd-MMM-yyyy')} by {appt.initialDoctor}</div>
                                    </div>
                                </div>
                                <ChevronDown className="h-6 w-6 transition-transform duration-200 [&[data-state=open]]:rotate-180 flex-shrink-0 mt-1" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 border-t space-y-4 bg-muted/20">
                                <h4 className="font-bold text-lg flex items-center gap-2"><FileText className="h-5 w-5" /> Prescription & Follow-up History</h4>
                                {appt.prescriptions.length > 0 ? (
                                    <div className="space-y-4">
                                        {appt.prescriptions.map((item, pIndex) => (
                                            <Dialog key={pIndex}>
                                                {item.title === 'Condition Status' && item.status === 'Resolved' ? (
                                                     <div className='p-4 border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800 rounded-lg text-center relative overflow-hidden'>
                                                        <FlowerFall />
                                                        <div className="relative z-10">
                                                            <PartyPopper className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-2"/>
                                                            <p className="font-bold text-lg text-blue-800 dark:text-blue-300">Congratulations on your recovery!</p>
                                                            <p className="text-sm text-blue-700 dark:text-blue-400/80">{item.summary}</p>
                                                        </div>
                                                     </div>
                                                ) : (
                                                    <div className='p-4 border bg-background rounded-lg'>
                                                        <div className='mb-4'>
                                                            <p className="font-bold text-lg">{item.title}</p>
                                                            <div className="text-sm text-muted-foreground">by <span className="font-bold" style={{color: 'hsl(var(--nav-chat))'}}>{item.doctor}</span></div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'} className={cn(item.status === 'Active' ? 'bg-green-100 text-green-800' : '', item.status === 'Improved' || item.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', item.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}>{item.status}</Badge>
                                                                <p className="text-sm font-medium text-muted-foreground">{item.date}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {item.medicines.length > 0 && (
                                                            <div className='mb-4'>
                                                                <h5 className="font-semibold text-base mb-2">Medications</h5>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {item.medicines.map(med => <Badge key={med} variant='outline'>{med}</Badge>)}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-2 mt-4">
                                                            {(item.details.length > 0 || item.summary) && item.title !== 'Liver Transplant Readiness' && (
                                                                <DialogTrigger asChild>
                                                                    <Button variant="link" className="p-0 h-auto">View Details</Button>
                                                                </DialogTrigger>
                                                            )}
                                                            {item.title === 'Liver Transplant Readiness' && (
                                                                <Link href="/surgery-care">
                                                                    <Button style={{backgroundColor: 'hsl(var(--nav-appointments))'}}>
                                                                        Enquire for Transplant Estimate
                                                                    </Button>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <DialogContent className="sm:max-w-xl">
                                                    <DialogHeader>
                                                        <DialogTitle>{item.title}</DialogTitle>
                                                        <DialogDescription>
                                                            Follow-up from {item.date} by <span className="font-bold" style={{color: 'hsl(var(--nav-chat))'}}>{item.doctor}</span>.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="max-h-[60vh] overflow-y-auto p-1 space-y-4">
                                                        {item.summary && (
                                                            <div>
                                                                <h4 className='font-semibold mb-2'>Condition Summary</h4>
                                                                <p className='text-sm text-muted-foreground'>{item.summary}</p>
                                                            </div>
                                                        )}
                                                        {item.details.length > 0 && (
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>Test/Marker</TableHead>
                                                                        <TableHead>Status</TableHead>
                                                                        <TableHead>Result</TableHead>
                                                                        <TableHead className="text-right">Action</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {item.details.map((detail, dIndex) => (
                                                                        <TableRow key={dIndex}>
                                                                            <TableCell className="font-bold">{detail.name}</TableCell>
                                                                            <TableCell><Badge variant={getReportStatusBadge(detail.status)}>{detail.status}</Badge></TableCell>
                                                                            <TableCell><Badge variant="outline">{detail.result}</Badge></TableCell>
                                                                            <TableCell className="text-right">
                                                                                <DialogTrigger asChild>
                                                                                    <Button variant="link" className="h-auto p-0">View</Button>
                                                                                </DialogTrigger>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        )}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-base text-muted-foreground text-center py-4">No prescriptions found for this appointment.</p>
                                )}
                            </CollapsibleContent>
                        </Collapsible>
                    )) : (
                        <div className="text-center p-8 text-muted-foreground">No appointments match your filters.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
