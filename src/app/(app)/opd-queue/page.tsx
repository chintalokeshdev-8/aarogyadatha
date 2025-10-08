
'use client';

import { useState, useEffect, useMemo, useTransition } from 'react';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
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
import { Separator } from '@/components/ui/separator';


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

function UploadDialog({ onUpload, trigger, appointmentId, prescriptionId }: { onUpload: (appointmentId: number, prescriptionId: number, newImage: { url: string; dataAiHint: string }, labName: string, reportDate: Date) => void, trigger: React.ReactNode, appointmentId: number, prescriptionId: number }) {
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [labName, setLabName] = useState('');
    const [reportDate, setReportDate] = useState<Date | undefined>();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        }
    };

    const handleUpload = () => {
        if (!reportDate) return;
        setIsUploading(true);
        setTimeout(() => {
            const newImage = {
                url: `https://picsum.photos/seed/newrx${Date.now()}/800/1100`,
                dataAiHint: 'medical prescription document',
            };
            onUpload(appointmentId, prescriptionId, newImage, labName, reportDate);
            setIsUploading(false);
            setFileName('');
            setLabName('');
            setReportDate(undefined);
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
                    <DialogTitle>Upload Prescription or Report</DialogTitle>
                    <DialogDescription>
                        Upload a photo or PDF of your paper document. Add the lab name and date.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="lab-name">Lab/Clinic Name</Label>
                        <Input id="lab-name" value={labName} onChange={(e) => setLabName(e.target.value)} placeholder="e.g., Yoda Diagnostics" />
                    </div>
                     <div className="space-y-2">
                        <Label>Report Date</Label>
                         <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !reportDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {reportDate ? format(reportDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                                mode="single"
                                selected={reportDate}
                                onSelect={setReportDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prescription-file">File</Label>
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
                </div>
                <DialogFooter>
                    <Button onClick={handleUpload} disabled={!fileName || !reportDate || !labName || isUploading} className="w-full" style={{ backgroundColor: 'hsl(var(--nav-chat))' }}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ReportAnalysisDialog({ report, trigger, children }: { report: any, trigger?: React.ReactNode, children?: React.ReactNode }) {
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
                {trigger || children}
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

function ViewReportDialog({ report, trigger, children }: { report: any; trigger?: React.ReactNode; children?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                {trigger || children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>View Report: {report.name}</DialogTitle>
                    <DialogDescription>
                        From {report.labName} on {format(new Date(report.date), 'dd-MMM-yyyy')}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                    {report.reportImage ? (
                         <div className="bg-muted/30 p-2 rounded-lg">
                             <Image
                                src={report.reportImage.url}
                                alt={`Report for ${report.name}`}
                                width={800}
                                height={1100}
                                data-ai-hint={report.reportImage.dataAiHint}
                                className="rounded-md border w-full h-auto object-contain"
                            />
                         </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                            <p className="text-muted-foreground">No image available for this report.</p>
                        </div>
                    )}
                </div>
                <DialogFooter className="pt-4 border-t flex-col sm:flex-row gap-2">
                    <ReportAnalysisDialog report={report}>
                        <Button variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:text-primary hover:bg-primary/10">
                            <Sparkles className="mr-2 h-4 w-4" /> AI Analysis
                        </Button>
                    </ReportAnalysisDialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4" />Download</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xs">
                            <DialogHeader>
                                <DialogTitle>Download Report</DialogTitle>
                                <DialogDescription>Choose a format to download.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2">
                                <Button style={{ backgroundColor: 'hsl(var(--nav-chat))' }}><FileIcon className="mr-2 h-4 w-4" /> PDF</Button>
                                <Button variant="secondary"><ImageIcon className="mr-2 h-4 w-4" /> Image</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function OpdQueuePage() {
    const [today, setToday] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDoctor, setFilterDoctor] = useState('all');
    const [filterDate, setFilterDate] = useState<Date>();
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const [appointments, setAppointments] = useState(() => 
        initialAppointmentsData.map(appt => ({
            ...appt,
            prescriptions: appt.prescriptions.map(p => ({
                ...p,
                prescriptionImages: Array.isArray(p.prescriptionImages) ? p.prescriptionImages : (p.prescriptionImage ? [{ url: p.prescriptionImage, dataAiHint: p.dataAiHint || 'medical prescription' }] : [])
            }))
        }))
    );


    useEffect(() => {
        setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);
    
    const allDoctors = useMemo(() => {
        const doctors = new Set<string>();
        appointments.forEach(appt => {
            doctors.add(appt.initialDoctor);
            appt.prescriptions.forEach(p => doctors.add(p.doctor));
        });
        return ['all', ...Array.from(doctors)];
    }, [appointments]);

    const filteredAppointments = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        
        return appointments.filter(appt => {
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
                    (p.medicines && p.medicines.some(m => m.toLowerCase().includes(lowercasedSearchTerm))) ||
                    (p.details && p.details.some(d => d.name.toLowerCase().includes(lowercasedSearchTerm)))
                );

            return keywordMatch && doctorMatch && dateMatch;
        });
    }, [appointments, searchTerm, filterDoctor, filterDate]);


    const clearFilters = () => {
        setSearchTerm('');
        setFilterDoctor('all');
        setFilterDate(undefined);
    };

    const handleUpload = (appointmentId: number, prescriptionId: number, newImage: { url: string; dataAiHint: string }, labName: string, reportDate: Date) => {
        setAppointments(prevAppointments => {
            return prevAppointments.map((appt, apptIndex) => {
                if (apptIndex === appointmentId) {
                    const newPrescriptions = appt.prescriptions.map((p, pIndex) => {
                        if (pIndex === prescriptionId) {
                            // Check if it's a prescription image or a report
                            if(p.prescriptionImages){
                                return {
                                    ...p,
                                    prescriptionImages: [...p.prescriptionImages, newImage]
                                };
                            } else { // This part is for adding new test results
                                 const newDetails = [...p.details, {
                                     name: "Uploaded Report",
                                     date: format(reportDate, 'yyyy-MM-dd'),
                                     status: 'Pending Review',
                                     labName: labName,
                                     reportImage: newImage,
                                 }];
                                 return {...p, details: newDetails};
                            }
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
                                    className={cn('w-fit', patient.status === 'Active' ? 'bg-green-100 text-green-800' : '', patient.status === 'Improved' || patient.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', patient.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}
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
                        <Collapsible key={index} className="border rounded-lg bg-background">
                            <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors flex items-start justify-between text-left">
                                <div className="flex items-start gap-4">
                                    <div className="text-5xl font-extrabold" style={{ color: 'hsl(var(--nav-chat))' }}>
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
                                            <div key={pIndex}>
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
                                                        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                                                                <div className="font-bold text-base flex items-baseline gap-x-2 flex-wrap">
                                                                    <span>{item.title}</span>
                                                                    <span className="text-sm text-muted-foreground font-normal">by</span>
                                                                    <span className="font-bold text-base" style={{color: 'hsl(var(--nav-chat))'}}>{item.doctor}</span>
                                                                    <span className="text-sm text-muted-foreground font-normal">on</span>
                                                                    <span className="font-semibold text-base">{item.date}</span>
                                                                </div>
                                                            <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'} className={cn('w-fit', item.status === 'Active' ? 'bg-green-100 text-green-800' : '', item.status === 'Improved' || item.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', item.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}>{item.status}</Badge>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2">
                                                             <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button size="sm" style={{backgroundColor: 'hsl(var(--nav-chat))'}}>
                                                                        <View className="mr-2 h-4 w-4" /> View Details
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col p-0">
                                                                    <DialogHeader className="p-6 pb-4">
                                                                        <DialogTitle>{item.title}</DialogTitle>
                                                                        <DialogDescription>
                                                                            Follow-up from {item.date} by <span className="font-bold" style={{color: 'hsl(var(--nav-chat))'}}>{item.doctor}</span>.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="overflow-y-auto px-6 pb-6 space-y-6 flex-1">
                                                                        
                                                                        {item.prescriptionImages && item.prescriptionImages.length > 0 && (
                                                                            <div>
                                                                                <h4 className='font-semibold mb-2 text-base'>Prescription Images</h4>
                                                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                                                    {item.prescriptionImages.map((img: any, imgIndex: number) => (
                                                                                        <div key={imgIndex} className="cursor-pointer group relative" onClick={() => setZoomedImage(img.url)}>
                                                                                            <Image 
                                                                                                src={img.url} 
                                                                                                alt={`Prescription for ${item.title} - Page ${imgIndex + 1}`}
                                                                                                width={150}
                                                                                                height={210}
                                                                                                data-ai-hint={img.dataAiHint}
                                                                                                className="rounded-lg border group-hover:opacity-80 transition-opacity w-full h-auto object-cover"
                                                                                            />
                                                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                                                                <Search className="text-white h-6 w-6" />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <Separator className="my-4" />
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {item.medicines && item.medicines.length > 0 && (
                                                                            <div>
                                                                                <h4 className='font-semibold mb-2 text-base'>Medications</h4>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {item.medicines.map((med: string) => <Badge key={med} variant='secondary' className="text-sm">{med}</Badge>)}
                                                                                </div>
                                                                                 <Separator className="my-4" />
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {item.summary && (
                                                                            <div>
                                                                                <h4 className='font-semibold mb-2 text-base'>Condition Summary</h4>
                                                                                <p className='text-sm text-muted-foreground'>{item.summary}</p>
                                                                                 <Separator className="my-4" />
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {item.details && item.details.length > 0 && (
                                                                             <div>
                                                                                <h4 className='font-semibold mb-2 text-base'>Test Results</h4>
                                                                                <div className="space-y-2">
                                                                                    {item.details.map((detail, dIndex) => (
                                                                                        <div key={dIndex} className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                                                            <div className='mb-2 sm:mb-0'>
                                                                                                <p className="font-bold">{detail.name}</p>
                                                                                                <Badge variant={getReportStatusBadge(detail.status)}>{detail.status}</Badge>
                                                                                            </div>
                                                                                            <ViewReportDialog report={detail}>
                                                                                                <Button variant="outline" size="sm">
                                                                                                    <View className="mr-2 h-4 w-4" /> View Report
                                                                                                </Button>
                                                                                            </ViewReportDialog>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <DialogFooter className="p-6 pt-4 border-t">
                                                                        
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>

                                                           <UploadDialog
                                                                trigger={
                                                                    <Button variant="outline" size="sm">
                                                                        <Upload className="mr-2 h-4 w-4" /> Upload
                                                                    </Button>
                                                                }
                                                                appointmentId={index}
                                                                prescriptionId={pIndex}
                                                                onUpload={handleUpload}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
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

             {zoomedImage && (
                <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
                    <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 border-0">
                         <DialogHeader className="p-4 bg-background rounded-t-lg z-10 shadow-sm flex-row items-center justify-between">
                            <DialogTitle>Prescription Viewer</DialogTitle>
                            <DialogDescription>Full-size view of the prescription.</DialogDescription>
                            <DialogClose className="relative right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                         </DialogHeader>
                        <div className="flex-1 relative bg-muted/20">
                            <Image
                                src={zoomedImage}
                                alt="Zoomed Prescription"
                                fill={true}
                                style={{objectFit: "contain"}}
                                className="p-4"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}

        </div>
    );
}
