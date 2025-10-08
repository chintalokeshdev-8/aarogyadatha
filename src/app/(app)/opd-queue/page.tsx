
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Bell, Send, Stethoscope, Briefcase, Plane, MapPin, Phone, Globe, Share2, Map, Award, Calendar, History, ChevronDown, FileText, Pill, CheckCircle, XCircle, Search, Filter, X, PartyPopper, MessageSquare, Upload, Printer, Download, View, Loader2, XCircleIcon, ImageIcon, File as FileIcon, Sparkles } from "lucide-react";
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
import { previousAppointments as initialAppointmentsData } from '@/lib/appointments-data';
import { Label } from '@/components/ui/label';
import { analyzeReport, ReportAnalysisOutput } from '@/ai/flows/ai-report-analysis';
import { dummyReportData } from '@/lib/dummy-report-data';
import { Textarea } from '@/components/ui/textarea';


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

const getReportStatusBadge = (status: string) => {
    switch (status) {
        case 'Abnormal': return 'destructive';
        case 'Normal': return 'default';
        default: return 'secondary';
    }
};

interface ChatMessage {
    sender: 'patient' | 'clinic';
    message: string;
    time: string;
}

const quickReplies = [
    "How much longer will it be?",
    "Is the doctor available now?",
    "I'm running 10 minutes late.",
    "Can I get a water bottle?",
];

function UploadDialog({ onUpload, trigger, appointmentId, prescriptionId }: { onUpload: (appointmentId: number, prescriptionId: number, newImage: { url: string; dataAiHint: string }) => void, trigger: React.ReactNode, appointmentId: number, prescriptionId: number }) {
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        }
    };

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            const newImage = {
                url: `https://picsum.photos/seed/newrx${Date.now()}/800/1100`,
                dataAiHint: 'medical prescription document',
            };
            onUpload(appointmentId, prescriptionId, newImage);
            setIsUploading(false);
            setFileName('');
            setIsDialogOpen(false); 
        }, 1500);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Prescription</DialogTitle>
                    <DialogDescription>
                        Upload a photo or PDF of your paper prescription.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Label htmlFor="prescription-file" className="text-right">
                        Prescription File
                    </Label>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline" className="flex-1">
                            <label htmlFor={`file-upload-${appointmentId}-${prescriptionId}`} className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" />
                                {fileName || 'Choose File'}
                            </label>
                        </Button>
                        <input id={`file-upload-${appointmentId}-${prescriptionId}`} type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                    </div>
                    {fileName && <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
                </div>
                <div className="p-6 pt-0">
                    <Button onClick={handleUpload} disabled={!fileName || isUploading} className="w-full" style={{ backgroundColor: 'hsl(var(--nav-chat))' }}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ReportAnalysisDialog({ report, trigger }: { report: any, trigger: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ReportAnalysisOutput | null>(null);
    const [isPending, startTransition] = useTransition();
    const [reportContent, setReportContent] = useState('');

    const handleOpen = () => {
        const data = dummyReportData[`${report.name}-${report.date}`] || { content: "No content to analyze." };
        setReportContent(data.content);
        setAnalysisResult(null);
        setIsOpen(true);
    };

    const handleRunAnalysis = () => {
        if (!reportContent) return;

        startTransition(async () => {
            const result = await analyzeReport({ reportContent });
            setAnalysisResult(result);
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild onClick={handleOpen}>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-primary" style={{ color: 'hsl(var(--nav-chat))' }}><Sparkles /> AI Report Analysis</DialogTitle>
                    <DialogDescription>Analyzing: {report.name} from {format(new Date(report.date), 'dd-MMM-yyyy')}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Original Report Content</h3>
                        <Textarea
                            className="h-96 font-mono text-xs"
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                        />
                        <Button onClick={handleRunAnalysis} disabled={isPending || !reportContent} className="w-full" style={{ backgroundColor: 'hsl(var(--nav-chat))' }}>
                            {isPending ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                            ) : "Run AI Analysis"}
                        </Button>
                    </div>
                    <div className="space-y-4 relative">
                        <h3 className="font-semibold">AI Summary &amp; Findings</h3>
                        {isPending && (
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
                                <Loader2 className="h-10 w-10 animate-spin text-primary" style={{ color: 'hsl(var(--nav-chat))' }} />
                                <p className="mt-4 text-muted-foreground">The AI is analyzing your report...</p>
                            </div>
                        )}
                        {analysisResult ? (
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-lg">Summary</CardTitle></CardHeader>
                                    <CardContent><p className="text-sm text-muted-foreground">{analysisResult.summary}</p></CardContent>
                                </Card>
                                {analysisResult.abnormalities.length > 0 ? (
                                    <Card>
                                        <CardHeader className="pb-2"><CardTitle className="text-lg">Abnormal Findings</CardTitle></CardHeader>
                                        <CardContent className="space-y-3">
                                            {analysisResult.abnormalities.map((item, index) => (
                                                <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
                                                    <div className="flex justify-between font-bold"><p>{item.item}</p><p>{item.result}</p></div>
                                                    <p className="text-xs text-muted-foreground">Normal Range: {item.normalRange}</p>
                                                    <p className="text-sm mt-2">{item.explanation}</p>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card>
                                        <CardContent className="p-4 text-center">
                                            <p className="font-semibold text-green-600">No major abnormalities were found in this report.</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-96 rounded-lg bg-muted/50 border border-dashed">
                                <p className="text-muted-foreground">AI analysis results will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function OpdQueuePage() {
    const [today, setToday] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDoctor, setFilterDoctor] = useState('all');
    const [filterDate, setFilterDate] = useState&lt;Date | undefined&gt;();
    const [zoomedImage, setZoomedImage] = useState&lt;string | null&gt;(null);

    const [appointments, setAppointments] = useState(() =&gt; 
        initialAppointmentsData.map(appt =&gt; ({
            ...appt,
            prescriptions: appt.prescriptions.map(p =&gt; ({
                ...p,
                prescriptionImages: Array.isArray(p.prescriptionImages) ? p.prescriptionImages : (p.prescriptionImage ? [{ url: p.prescriptionImage, dataAiHint: p.dataAiHint || 'medical prescription' }] : [])
            }))
        }))
    );


    useEffect(() =&gt; {
        setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);
    
    const allDoctors = useMemo(() =&gt; {
        const doctors = new Set&lt;string&gt;();
        appointments.forEach(appt =&gt; {
            doctors.add(appt.initialDoctor);
            appt.prescriptions.forEach(p =&gt; doctors.add(p.doctor));
        });
        return ['all', ...Array.from(doctors)];
    }, [appointments]);

    const filteredAppointments = useMemo(() =&gt; {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        
        return appointments.filter(appt =&gt; {
            const doctorMatch = filterDoctor === 'all' || appt.initialDoctor === filterDoctor || appt.prescriptions.some(p =&gt; p.doctor === filterDoctor);
            const dateMatch = !filterDate || format(new Date(appt.date), 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd');

            if (!searchTerm) {
                return doctorMatch &amp;&amp; dateMatch;
            }

            const keywordMatch = 
                appt.problem.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.initialDoctor.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.specialty.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.date.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.prescriptions.some(p =&gt; 
                    p.title.toLowerCase().includes(lowercasedSearchTerm) ||
                    p.doctor.toLowerCase().includes(lowercasedSearchTerm) ||
                    p.summary.toLowerCase().includes(lowercasedSearchTerm) ||
                    (p.medicines &amp;&amp; p.medicines.some(m =&gt; m.toLowerCase().includes(lowercasedSearchTerm))) ||
                    (p.details &amp;&amp; p.details.some(d =&gt; d.name.toLowerCase().includes(lowercasedSearchTerm)))
                );

            return keywordMatch &amp;&amp; doctorMatch &amp;&amp; dateMatch;
        });
    }, [appointments, searchTerm, filterDoctor, filterDate]);


    const clearFilters = () =&gt; {
        setSearchTerm('');
        setFilterDoctor('all');
        setFilterDate(undefined);
    };

    const handleUploadPrescription = (appointmentId: number, prescriptionId: number, newImage: { url: string; dataAiHint: string }) =&gt; {
        setAppointments(prevAppointments =&gt; {
            return prevAppointments.map((appt, apptIndex) =&gt; {
                if (apptIndex === appointmentId) {
                    const newPrescriptions = appt.prescriptions.map((p, pIndex) =&gt; {
                        if (pIndex === prescriptionId) {
                            return {
                                ...p,
                                prescriptionImages: [...p.prescriptionImages, newImage]
                            };
                        }
                        return p;
                    });
                    return { ...appt, prescriptions: newPrescriptions };
                }
                return appt;
            });
        });
    };

    const currentStatusInfo = getStatusInfo(appointmentDetails.status);
    const StatusIcon = currentStatusInfo.icon;
    
    return (
        &lt;div className="space-y-8"&gt;
            &lt;div className="text-center"&gt;
                &lt;h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-chat))'}}&gt;Appointments &amp; History&lt;/h1&gt;
                &lt;p className="text-muted-foreground mt-2"&gt;
                    {today ? `Status for your appointments on ${format(new Date(), 'dd-MMM-yyyy')}.` : 'Loading date...'}&lt;/p&gt;
            &lt;/div&gt;

            &lt;Card className="p-4 bg-blue-50 border-blue-200"&gt;
                &lt;div className="flex justify-around items-center"&gt;
                    &lt;div className="text-center"&gt;
                        &lt;CardTitle className="flex items-center justify-center gap-2 text-base text-blue-800"&gt;&lt;User /&gt; Your Token&lt;/CardTitle&gt;
                        &lt;p className="text-4xl font-bold mt-2 text-blue-800"&gt;#23&lt;/p&gt;
                        &lt;div className="flex items-center justify-center gap-2 mt-1 text-xs text-blue-700"&gt;
                            &lt;Clock className="w-3 h-3" /&gt;
                            &lt;span className="font-semibold"&gt;Est. Wait: 5 mins&lt;/span&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div className="text-center"&gt;
                        &lt;CardTitle className="text-base text-blue-800"&gt;Now Serving&lt;/CardTitle&gt;
                        &lt;CardDescription className="text-xs text-blue-700"&gt;Patient with the doctor&lt;/CardDescription&gt;
                        &lt;p className="text-4xl font-bold mt-2 text-blue-800"&gt;#19&lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/Card&gt;

            &lt;div className="grid lg:grid-cols-1 gap-8"&gt;
                &lt;Card&gt;
                    &lt;CardHeader&gt;
                        &lt;CardTitle&gt;Live Queue&lt;/CardTitle&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent&gt;
                        &lt;div className="space-y-3"&gt;
                            {queue.map(patient =&gt; (
                                &lt;div key={patient.token} className={`flex items-center justify-between p-3 rounded-lg ${patient.token === 23 ? 'bg-primary/10' : 'bg-muted/40'}`} style={patient.token === 23 ? {backgroundColor: 'hsla(var(--nav-chat)/0.1)'} : {}}&gt;
                                    &lt;div className="flex items-center gap-3"&gt;
                                        &lt;div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold text-lg ${patient.token === 23 ? 'text-primary-foreground' : 'bg-muted'}`} style={patient.token === 23 ? {backgroundColor: 'hsl(var(--nav-chat))'} : {}}&gt;
                                            {patient.token}
                                        &lt;/div&gt;
                                        &lt;div&gt;
                                            &lt;p className="font-semibold"&gt;{patient.name}&lt;/p&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;Badge variant={patient.status === 'Consulting' ? 'default' : (patient.token === 23 ? 'outline' : 'secondary')}
                                    className={cn('w-fit', patient.status === 'Active' ? 'bg-green-100 text-green-800' : '', patient.status === 'Improved' || patient.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', patient.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}
                                    style={patient.status === 'Consulting' ? {backgroundColor: 'hsl(var(--nav-chat))'} : (patient.token === 23 ? {borderColor: 'hsl(var(--nav-chat))', color: 'hsl(var(--nav-chat))'} : {})}
                                    &gt;
                                        {patient.status}
                                    &lt;/Badge&gt;
                                &lt;/div&gt;
                            ))}
                        &lt;/div&gt;
                    &lt;/CardContent&gt;
                &lt;/Card&gt;
            &lt;/div&gt;

             &lt;Card&gt;
                 &lt;CardHeader className="flex flex-col sm:flex-row items-start gap-6"&gt;
                    &lt;Avatar className="h-24 w-24 border-4" style={{borderColor: 'hsl(var(--nav-chat))'}}&gt;
                        &lt;AvatarImage src={appointmentDetails.doctor.avatar} data-ai-hint={appointmentDetails.doctor.dataAiHint} /&gt;
                        &lt;AvatarFallback&gt;{appointmentDetails.doctor.name.split(' ').map(n =&gt; n[0]).join('')}&lt;/AvatarFallback&gt;
                    &lt;/Avatar&gt;
                    &lt;div className="flex-1"&gt;
                        &lt;CardTitle className="text-2xl"&gt;{appointmentDetails.doctor.name}&lt;/CardTitle&gt;
                        &lt;CardDescription className="font-semibold text-base" style={{color: 'hsl(var(--nav-chat))'}}&gt;{appointmentDetails.doctor.specialty}&lt;/CardDescription&gt;
                        
                        &lt;div className={`mt-4 flex items-start gap-4 p-4 ${currentStatusInfo.color} rounded-lg border bg-background`}&gt;
                            &lt;StatusIcon className={`h-6 w-6 ${currentStatusInfo.textColor} mt-1`}/&gt;
                            &lt;div className="flex-1"&gt;
                                &lt;p className={`font-bold ${currentStatusInfo.textColor} flex items-center gap-2`}&gt;
                                    {appointmentDetails.status} ({currentStatusInfo.teluguStatus})
                                &lt;/p&gt;
                                &lt;p className={`text-sm ${currentStatusInfo.textColor}/80`}&gt;{currentStatusInfo.details}&lt;/p&gt;
                                &lt;p className={`text-sm ${currentStatusInfo.textColor}/80`}&gt;{currentStatusInfo.teluguDetails}&lt;/p&gt;
                            &lt;/div&gt;
                            {currentStatusInfo.indicator &amp;&amp; (
                                &lt;span className="relative flex h-4 w-4 mt-1"&gt;
                                    &lt;span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"&gt;&lt;/span&gt;
                                    &lt;span className="relative inline-flex rounded-full h-4 w-4 bg-green-600"&gt;&lt;/span&gt;
                                &lt;/span&gt;
                            )}
                        &lt;/div&gt;
                        
                        &lt;div className="mt-4 space-y-1 text-sm text-muted-foreground"&gt;
                            &lt;p className="flex items-center gap-2"&gt;&lt;Award className="h-4 w-4 text-primary" style={{color: 'hsl(var(--nav-chat))'}}/&gt;&lt;strong&gt;Successful Surgeries:&lt;/strong&gt; {appointmentDetails.doctor.surgeries}&lt;/p&gt;
                            &lt;p className="flex items-center gap-2"&gt;&lt;Stethoscope className="h-4 w-4 text-primary" style={{color: 'hsl(var(--nav-chat))'}}/&gt;&lt;strong&gt;Main Focus:&lt;/strong&gt; {appointmentDetails.doctor.mainDealing}&lt;/p&gt;
                        &lt;/div&gt;
                            &lt;div className="mt-4 space-y-2 text-sm"&gt;
                            &lt;p className="font-bold text-lg"&gt;{appointmentDetails.hospital.name}&lt;/p&gt;
                            &lt;p className="flex items-start gap-2 text-muted-foreground"&gt;&lt;MapPin className="h-4 w-4 mt-1 flex-shrink-0"/&gt; {appointmentDetails.hospital.address}&lt;/p&gt;
                            &lt;p className="flex items-center gap-2 text-muted-foreground"&gt;&lt;Phone className="h-4 w-4"/&gt; {appointmentDetails.hospital.phone}&lt;/p&gt;
                            &lt;a href={appointmentDetails.hospital.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline" style={{color: 'hsl(var(--nav-chat))'}}&gt;
                                &lt;Globe className="h-4 w-4"/&gt; Visit Website
                            &lt;/a&gt;
                            &lt;div className="flex gap-2 pt-2"&gt;
                                &lt;Button variant="outline" size="sm"&gt;
                                    &lt;Share2 className="mr-2 h-4 w-4"/&gt; Share Directions
                                &lt;/Button&gt;
                                &lt;Button variant="outline" size="sm"&gt;
                                    &lt;Map className="mr-2 h-4 w-4"/&gt; View Location
                                &lt;/Button&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/CardHeader&gt;
            &lt;/Card&gt;

             &lt;Card&gt;
                &lt;CardHeader&gt;
                    &lt;CardTitle className="flex items-center gap-2 text-2xl"&gt;&lt;History /&gt;Appointments History&lt;/CardTitle&gt;
                     &lt;CardDescription&gt;
                        Review your past consultations and prescriptions, grouped by health concern.
                        &lt;br /&gt;
                        మీ గత సంప్రదింపులు మరియు ప్రిస్క్రిప్షన్‌లను, ఆరోగ్య సమస్యల వారీగా సమీక్షించండి.
                    &lt;/CardDescription&gt;
                    &lt;div className="border-t mt-4 pt-4"&gt;
                        &lt;div className="flex items-center justify-between mb-4"&gt;
                           &lt;div className="flex items-center gap-2"&gt;
                                &lt;Filter className="h-5 w-5"/&gt;
                                &lt;h3 className="text-lg font-semibold"&gt;Filters&lt;/h3&gt;
                            &lt;/div&gt;
                             &lt;Button variant="ghost" onClick={clearFilters} className="text-sm h-8 px-2"&gt;
                                &lt;X className='mr-2 h-4 w-4' /&gt;
                                Clear Filters
                            &lt;/Button&gt;
                        &lt;/div&gt;
                        &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"&gt;
                            &lt;div className="relative lg:col-span-2"&gt;
                                &lt;Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /&gt;
                                &lt;Input 
                                    placeholder="Search by reason, doctor, test..." 
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) =&gt; setSearchTerm(e.target.value)}
                                /&gt;
                            &lt;/div&gt;
                            &lt;Select value={filterDoctor} onValueChange={setFilterDoctor}&gt;
                                &lt;SelectTrigger&gt;
                                    &lt;SelectValue placeholder="Filter by Doctor" /&gt;
                                &lt;/SelectTrigger&gt;
                                &lt;SelectContent&gt;
                                    {allDoctors.map(doc =&gt; &lt;SelectItem key={doc} value={doc}&gt;{doc === 'all' ? 'All Doctors' : doc}&lt;/SelectItem&gt;)}
                                &lt;/SelectContent&gt;
                            &lt;/Select&gt;
                            &lt;Popover&gt;
                                &lt;PopoverTrigger asChild&gt;
                                &lt;Button
                                    variant={"outline"}
                                    className={cn(
                                    "justify-start text-left font-normal",
                                    !filterDate &amp;&amp; "text-muted-foreground"
                                    )}
                                &gt;
                                    &lt;CalendarIcon className="mr-2 h-4 w-4" /&gt;
                                    {filterDate ? format(filterDate, "dd-MMM-yyyy") : &lt;span&gt;Filter by date&lt;/span&gt;}
                                &lt;/Button&gt;
                                &lt;/PopoverTrigger&gt;
                                &lt;PopoverContent className="w-auto p-0"&gt;
                                &lt;CalendarComponent
                                    mode="single"
                                    selected={filterDate}
                                    onSelect={setFilterDate}
                                    initialFocus
                                /&gt;
                                &lt;/PopoverContent&gt;
                            &lt;/Popover&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/CardHeader&gt;
                &lt;CardContent className="space-y-4"&gt;
                    {filteredAppointments.length &gt; 0 ? filteredAppointments.map((appt, index) =&gt; (
                        &lt;Collapsible key={index} className="border rounded-lg bg-background"&gt;
                            &lt;CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors flex items-start justify-between text-left"&gt;
                                &lt;div className="flex items-start gap-4"&gt;
                                    &lt;div className="text-5xl font-extrabold" style={{ color: 'hsl(var(--nav-chat))' }}&gt;
                                        {index + 1}.
                                    &lt;/div&gt;
                                    &lt;div className="flex-1"&gt;
                                        &lt;p className="text-xl font-bold"&gt;{appt.problem}&lt;/p&gt;
                                        &lt;div className="text-base font-semibold text-muted-foreground mt-1"&gt;{appt.specialty}&lt;/div&gt;
                                        &lt;div className="text-sm text-muted-foreground mt-1 flex items-center gap-2"&gt;&lt;Calendar className="h-4 w-4"/&gt; First seen: {format(new Date(appt.date), 'dd-MMM-yyyy')} by {appt.initialDoctor}&lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;ChevronDown className="h-6 w-6 transition-transform duration-200 [&amp;[data-state=open]]:rotate-180 flex-shrink-0 mt-1" /&gt;
                            &lt;/CollapsibleTrigger&gt;
                            &lt;CollapsibleContent className="p-4 border-t space-y-4 bg-muted/20"&gt;
                                &lt;h4 className="font-bold text-lg flex items-center gap-2"&gt;&lt;FileText className="h-5 w-5" /&gt; Prescription &amp; Follow-up History&lt;/h4&gt;
                                {appt.prescriptions.length &gt; 0 ? (
                                    &lt;div className="space-y-4"&gt;
                                        {appt.prescriptions.map((item, pIndex) =&gt; (
                                            &lt;div key={pIndex}&gt;
                                                {item.title === 'Condition Status' &amp;&amp; item.status === 'Resolved' ? (
                                                     &lt;div className='p-4 border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800 rounded-lg text-center relative overflow-hidden'&gt;
                                                        &lt;FlowerFall /&gt;
                                                        &lt;div className="relative z-10"&gt;
                                                            &lt;PartyPopper className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-2"/&gt;
                                                            &lt;p className="font-bold text-lg text-blue-800 dark:text-blue-300"&gt;Congratulations on your recovery!&lt;/p&gt;
                                                            &lt;p className="text-sm text-blue-700 dark:text-blue-400/80"&gt;{item.summary}&lt;/p&gt;
                                                        &lt;/div&gt;
                                                     &lt;/div&gt;
                                                ) : (
                                                    &lt;div className='p-4 border bg-background rounded-lg'&gt;
                                                        &lt;div className="flex items-center justify-between gap-2 mb-4 flex-wrap"&gt;
                                                                &lt;div className="font-bold text-base flex items-baseline gap-x-2 flex-wrap"&gt;
                                                                    &lt;span&gt;{item.title}&lt;/span&gt;
                                                                    &lt;span className="text-sm text-muted-foreground font-normal"&gt;by&lt;/span&gt;
                                                                    &lt;span className="font-bold text-base" style={{color: 'hsl(var(--nav-chat))'}}&gt;{item.doctor}&lt;/span&gt;
                                                                    &lt;span className="text-sm text-muted-foreground font-normal"&gt;on&lt;/span&gt;
                                                                    &lt;span className="font-semibold text-base"&gt;{item.date}&lt;/span&gt;
                                                                &lt;/div&gt;
                                                            &lt;Badge variant={item.status === 'Completed' ? 'secondary' : 'default'} className={cn('w-fit', item.status === 'Active' ? 'bg-green-100 text-green-800' : '', item.status === 'Improved' || item.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', item.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}&gt;{item.status}&lt;/Badge&gt;
                                                        &lt;/div&gt;
                                                        
                                                        &lt;div className="flex items-center gap-2"&gt;
                                                             &lt;Dialog&gt;
                                                                &lt;DialogTrigger asChild&gt;
                                                                    &lt;Button size="sm" style={{backgroundColor: 'hsl(var(--nav-chat))'}} className="animate-ping once"&gt;
                                                                        &lt;View className="mr-2 h-4 w-4" /&gt; View Details
                                                                    &lt;/Button&gt;
                                                                &lt;/DialogTrigger&gt;
                                                                &lt;DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col p-0"&gt;
                                                                    &lt;DialogHeader className="p-6 pb-0"&gt;
                                                                        &lt;DialogTitle&gt;{item.title}&lt;/DialogTitle&gt;
                                                                        &lt;DialogDescription&gt;
                                                                            Follow-up from {item.date} by &lt;span className="font-bold" style={{color: 'hsl(var(--nav-chat))'}}&gt;{item.doctor}&lt;/span&gt;.
                                                                        &lt;/DialogDescription&gt;
                                                                    &lt;/DialogHeader&gt;
                                                                    &lt;div className="overflow-y-auto px-6 pb-6 space-y-6 flex-1"&gt;
                                                                        
                                                                        {item.prescriptionImages &amp;&amp; item.prescriptionImages.length &gt; 0 &amp;&amp; (
                                                                            &lt;div&gt;
                                                                                &lt;h4 className='font-semibold mb-2 text-base'&gt;Prescription Images&lt;/h4&gt;
                                                                                &lt;div className="grid grid-cols-2 sm:grid-cols-3 gap-2"&gt;
                                                                                    {item.prescriptionImages.map((img: any, imgIndex: number) =&gt; (
                                                                                        &lt;div key={imgIndex} className="cursor-pointer group relative" onClick={() =&gt; setZoomedImage(img.url)}&gt;
                                                                                            &lt;Image 
                                                                                                src={img.url} 
                                                                                                alt={`Prescription for ${item.title} - Page ${imgIndex + 1}`}
                                                                                                width={150}
                                                                                                height={210}
                                                                                                data-ai-hint={img.dataAiHint}
                                                                                                className="rounded-lg border group-hover:opacity-80 transition-opacity w-full h-auto object-cover"
                                                                                            /&gt;
                                                                                            &lt;div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"&gt;
                                                                                                &lt;Search className="text-white h-6 w-6" /&gt;
                                                                                            &lt;/div&gt;
                                                                                        &lt;/div&gt;
                                                                                    ))}
                                                                                &lt;/div&gt;
                                                                            &lt;/div&gt;
                                                                        )}
                                                                        
                                                                        {item.medicines &amp;&amp; item.medicines.length &gt; 0 &amp;&amp; (
                                                                            &lt;div&gt;
                                                                                &lt;h4 className='font-semibold mb-2 text-base'&gt;Medications&lt;/h4&gt;
                                                                                &lt;div className="flex flex-wrap gap-2"&gt;
                                                                                    {item.medicines.map((med: string) =&gt; &lt;Badge key={med} variant='secondary' className="text-sm"&gt;{med}&lt;/Badge&gt;)}
                                                                                &lt;/div&gt;
                                                                            &lt;/div&gt;
                                                                        )}
                                                                        
                                                                        {item.summary &amp;&amp; (
                                                                            &lt;div&gt;
                                                                                &lt;h4 className='font-semibold mb-2 text-base'&gt;Condition Summary&lt;/h4&gt;
                                                                                &lt;p className='text-sm text-muted-foreground'&gt;{item.summary}&lt;/p&gt;
                                                                            &lt;/div&gt;
                                                                        )}
                                                                        
                                                                        {item.details &amp;&amp; item.details.length &gt; 0 &amp;&amp; (
                                                                            &lt;div&gt;
                                                                                &lt;h4 className='font-semibold mb-2 text-base'&gt;Test Results&lt;/h4&gt;
                                                                                &lt;div className="space-y-2"&gt;
                                                                                    {item.details.map((detail, dIndex) =&gt; (
                                                                                        &lt;div key={dIndex} className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"&gt;
                                                                                            &lt;div className='mb-2 sm:mb-0'&gt;
                                                                                                &lt;p className="font-bold"&gt;{detail.name}&lt;/p&gt;
                                                                                                &lt;Badge variant={getReportStatusBadge(detail.status)}&gt;{detail.status}&lt;/Badge&gt;
                                                                                            &lt;/div&gt;
                                                                                            &lt;div className="flex items-center gap-2 self-end sm:self-center"&gt;
                                                                                                &lt;ReportAnalysisDialog 
                                                                                                    report={detail}
                                                                                                    trigger={
                                                                                                        &lt;Button variant="outline" size="sm" className="border-primary/50 text-primary hover:text-primary hover:bg-primary/10"&gt;
                                                                                                            &lt;Sparkles className="mr-2 h-4 w-4" /&gt; AI Analysis
                                                                                                        &lt;/Button&gt;
                                                                                                    }
                                                                                                /&gt;
                                                                                                 &lt;Dialog&gt;
                                                                                                    &lt;DialogTrigger asChild&gt;&lt;Button variant="outline" size="sm"&gt;&lt;Download className="mr-2 h-4 w-4" /&gt;&lt;/Button&gt;&lt;/DialogTrigger&gt;
                                                                                                    &lt;DialogContent className="sm:max-w-xs"&gt;
                                                                                                        &lt;DialogHeader&gt;
                                                                                                            &lt;DialogTitle&gt;Download Report&lt;/DialogTitle&gt;
                                                                                                            &lt;DialogDescription&gt;Choose a format to download.&lt;/DialogDescription&gt;
                                                                                                        &lt;/DialogHeader&gt;
                                                                                                        &lt;div className="flex flex-col gap-2"&gt;
                                                                                                            &lt;Button style={{backgroundColor: 'hsl(var(--nav-chat))'}}&gt;&lt;FileIcon className="mr-2 h-4 w-4" /&gt; PDF&lt;/Button&gt;
                                                                                                            &lt;Button variant="secondary"&gt;&lt;ImageIcon className="mr-2 h-4 w-4" /&gt; Image&lt;/Button&gt;
                                                                                                        &lt;/div&gt;
                                                                                                    &lt;/DialogContent&gt;
                                                                                                &lt;/Dialog&gt;
                                                                                            &lt;/div&gt;
                                                                                        &lt;/div&gt;
                                                                                    ))}
                                                                                &lt;/div&gt;
                                                                            &lt;/div&gt;
                                                                        )}
                                                                    &lt;/div&gt;
                                                                &lt;/DialogContent&gt;
                                                            &lt;/Dialog&gt;

                                                           &lt;UploadDialog
                                                                trigger={
                                                                    &lt;Button variant="outline" size="sm"&gt;
                                                                        &lt;Upload className="mr-2 h-4 w-4" /&gt; Upload
                                                                    &lt;/Button&gt;
                                                                }
                                                                appointmentId={index}
                                                                prescriptionId={pIndex}
                                                                onUpload={handleUploadPrescription}
                                                            /&gt;
                                                        &lt;/div&gt;
                                                    &lt;/div&gt;
                                                )}
                                            &lt;/div&gt;
                                        ))}
                                    &lt;/div&gt;
                                ) : (
                                    &lt;p className="text-base text-muted-foreground text-center py-4"&gt;No prescriptions found for this appointment.&lt;/p&gt;
                                )}
                            &lt;/CollapsibleContent&gt;
                        &lt;/Collapsible&gt;
                    )) : (
                        &lt;div className="text-center p-8 text-muted-foreground"&gt;No appointments match your filters.&lt;/div&gt;
                    )}
                &lt;/CardContent&gt;
            &lt;/Card&gt;

             {zoomedImage &amp;&amp; (
                &lt;Dialog open={!!zoomedImage} onOpenChange={() =&gt; setZoomedImage(null)}&gt;
                    &lt;DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 border-0"&gt;
                         &lt;DialogHeader className="p-4 bg-background rounded-t-lg z-10 shadow-sm"&gt;
                            &lt;DialogTitle&gt;Prescription Viewer&lt;/DialogTitle&gt;
                            &lt;DialogDescription&gt;Full-size view of the prescription.&lt;/DialogDescription&gt;
                        &lt;/DialogHeader&gt;
                        &lt;div className="flex-1 relative bg-muted/20"&gt;
                            &lt;Image
                                src={zoomedImage}
                                alt="Zoomed Prescription"
                                fill={true}
                                style={{objectFit: "contain"}}
                                className="p-4"
                            /&gt;
                        &lt;/div&gt;
                    &lt;/DialogContent&gt;
                &lt;/Dialog&gt;
            )}

        &lt;/div&gt;
    );
}
