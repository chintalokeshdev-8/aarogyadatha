
'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, MapPin, HeartPulse, Bone, Brain, Stethoscope as StethoscopeIcon, Baby, Leaf, Phone, Globe, Share2, Copy, Loader2, Star, Calendar, History, ChevronDown, FileText, Pill, CheckCircle, XCircle, Filter, X, PartyPopper, MessageSquare, Upload, Printer, Download, View, XCircleIcon, ImageIcon, File as FileIcon, Sparkles, Map as MapIcon, Clock, PlusCircle, Pencil, Trash2, CreditCard, Lock, Sun, Moon, Separator as SeparatorIcon, ArrowLeft, ChevronRight, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { previousAppointments as initialAppointmentsData } from '@/lib/appointments-data';
import { dummyReportData } from '@/lib/dummy-report-data';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FlowerFall } from '@/components/ui/flower-fall';
import { analyzeReport, ReportAnalysisOutput } from '@/ai/flows/ai-report-analysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';


const hospitalsData: Record<string, { location: string; address: string; phone: string; website: string; }> = {
    "Apollo Hospital, Jubilee Hills": {
        location: "Hyderabad",
        address: "Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Jubilee Hills, Hyderabad, Telangana 500033",
        phone: "040 2360 7777",
        website: "https://apollohospitals.com/locations/india/hyderabad/jubilee-hills/"
    },
    "Care Hospital, Banjara Hills": {
        location: "Hyderabad",
        address: "Rd Number 1, Prem Nagar, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "040 3041 8888",
        website: "https://www.carehospitals.com/locations/hyderabad/banjara-hills/"
    },
    "Guntur Kidney & Multispeciality Hospital": {
        location: "Guntur",
        address: "Kothapet, Guntur, Andhra Pradesh 522001",
        phone: "8008334948",
        website: "https://gunturkidneyhospital.com"
    },
    "Padmavathy Super Speciality Hospital": {
        location: "Guntur",
        address: "4/1, Arundelpet, Guntur, Andhra Pradesh 522002",
        phone: "0863 223 4567",
        website: "https://padmavathyhospital.com"
    },
    "Yashoda Hospital, Secunderabad": {
        location: "Hyderabad",
        address: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad, Telangana 500003",
        phone: "040 4567 4567",
        website: "https://www.yashodahospitals.com/locations/secunderabad/"
    },
    "Lalitha Super Specialities Hospital": {
        location: "Guntur",
        address: "Brodipet, Guntur, Andhra Pradesh 522002",
        phone: "0863 224 5678",
        website: "https://lalithahospital.com"
    },
    "MaxCure Hospital, Madhapur": {
        location: "Hyderabad",
        address: "Behind Cyber Towers, Lane Next to McDonalds, Madhapur, Hyderabad, Telangana 500081",
        phone: "040 4242 4242",
        website: "https://maxcurehospitals.com/"
    },
    "Rainbow Children's Hospital, Banjara Hills": {
        location: "Hyderabad",
        address: "Rd Number 2, Sri Ram Nagar Colony, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "1800 212 2",
        website: "https://www.rainbowhospitals.in/locations/hyderabad/banjara-hills-flagship"
    },
    "KIMS Hospital, Secunderabad": {
        location: "Hyderabad",
        address: "1-8-31/1, Minister Rd, Krishna Nagar Colony, Begumpet, Secunderabad, Telangana 500003",
        phone: "040 4488 5000",
        website: "https://www.kimshospitals.com/secunderabad/"
    },
     "Continental Hospitals, Gachibowli": {
        location: "Hyderabad",
        address: "Plot No 3, Road No 2, Financial District, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032",
        phone: "040 6700 0000",
        website: "https://continentalhospitals.com/"
    },
    "Ahalya Ivf And Nursing Home": {
        location: "Guntur",
        address: "Backside Sivalayam, Kothapet, Guntur",
        phone: "N/A",
        website: "#"
    },
    "Amar Orthopaedic Hospital": {
        location: "Guntur",
        address: "13-2-12, 1st Lane, Old Club Road, Kothapet, Guntur",
        phone: "N/A",
        website: "#"
    },
    "Amaravathi Institute Of Medical Sciences Pvt Ltd": {
        location: "Guntur",
        address: "D.No:13-4-74, M.N.R Plaza, Oldclub Road, Kothapet, Guntur",
        phone: "N/A",
        website: "#"
    },
    "Sravani Hospital, Guntur": {
        location: "Guntur",
        address: "Gunturvari Thota Main Rd, Pottur Vari Thota, Guntur, Andhra Pradesh 522001",
        phone: "099661 77014",
        website: "#"
    }
};

const doctors = [
    {
        name: "Dr. Chinta Ramana",
        specialty: "Cardiologist",
        experience: "18 years",
        hospital: "Apollo Hospital, Jubilee Hills",
        surgeries: "600+ successful cardiac surgeries",
        mainDealing: "Complex angioplasty and valve replacements.",
        avatar: "https://picsum.photos/seed/doc1/100/100",
        dataAiHint: "male doctor portrait",
        opFee: 800,
    },
    {
        name: "Dr. Lakshmi Narasaiah",
        specialty: "Orthopedic Surgeon",
        experience: "14 years",
        hospital: "Care Hospital, Banjara Hills",
        surgeries: "900+ joint replacement surgeries",
        mainDealing: "Knee and hip replacements.",
        avatar: "https://picsum.photos/seed/doc2/100/100",
        dataAiHint: "female doctor",
        opFee: 700,
    },
     {
        name: "Dr. Ramesh Babu",
        specialty: "Nephrologist",
        experience: "20 years",
        hospital: "Guntur Kidney & Multispeciality Hospital",
        surgeries: "300+ kidney transplants",
        mainDealing: "Chronic kidney disease and dialysis.",
        avatar: "https://picsum.photos/seed/doc8/100/100",
        dataAiHint: "male doctor professional",
        opFee: 1000,
    },
    {
        name: "Dr. Padmavathi",
        specialty: "Gynaecologist",
        experience: "25 years",
        hospital: "Padmavathy Super Speciality Hospital",
        surgeries: "1000+ successful deliveries",
        mainDealing: "High-risk pregnancies and IVF.",
        avatar: "https://picsum.photos/seed/doc9/100/100",
        dataAiHint: "female doctor professional",
        opFee: 1200,
    },
    {
        name: "Dr. Rupa",
        specialty: "Neurologist",
        experience: "22 years",
        hospital: "Yashoda Hospital, Secunderabad",
        surgeries: "400+ successful brain surgeries",
        mainDealing: "Epilepsy and stroke treatment.",
        avatar: "https://picsum.photos/seed/doc3/100/100",
        dataAiHint: "female doctor professional",
        opFee: 900,
    },
     {
        name: "Dr. Gondi Siva Rama Krishna",
        specialty: "Nephrologist",
        experience: "15 years",
        hospital: "Guntur Kidney & Multispeciality Hospital",
        surgeries: "N/A",
        mainDealing: "Nephrology and kidney diseases.",
        avatar: "https://picsum.photos/seed/doc15/100/100",
        dataAiHint: "male doctor glasses",
        opFee: 850,
    },
    {
        name: "Dr. Posani Srinivasarao",
        specialty: "Gastroenterologist",
        experience: "20 years",
        hospital: "Sravani Hospital, Guntur",
        surgeries: "1 lakh+ Endoscopies &amp; other surgeries",
        mainDealing: "Gastroenterology, Liver diseases. Leads a dedicated team of doctors.",
        avatar: "https://picsum.photos/seed/doc16/100/100",
        dataAiHint: "male doctor senior",
        recommended: true,
        opFee: 1500,
    },
    {
        name: "Dr. Anjali",
        specialty: "General Physician",
        experience: "10 years",
        hospital: "MaxCure Hospital, Madhapur",
        surgeries: "N/A",
        mainDealing: "General health check-ups and infectious diseases.",
        avatar: "https://picsum.photos/seed/doc4/100/100",
        dataAiHint: "female doctor smile",
        opFee: 500,
    },
     {
        name: "Dr. Srinivas",
        specialty: "General Surgeon",
        experience: "12 years",
        hospital: "Lalitha Super Specialities Hospital",
        surgeries: "700+ various surgeries",
        mainDealing: "Laparoscopic and general surgery.",
        avatar: "https://picsum.photos/seed/doc10/100/100",
        dataAiHint: "male doctor serious",
        opFee: 750,
    },
    {
        name: "Dr. Anusha",
        specialty: "Pediatrician",
        experience: "9 years",
        hospital: "Rainbow Children's Hospital, Banjara Hills",
        surgeries: "N/A",
        mainDealing: "Child care and vaccinations.",
        avatar: "https://picsum.photos/seed/doc5/100/100",
        dataAiHint: "female doctor glasses",
        opFee: 600,
    },
    {
        name: "Dr. V. Venkata Naidu",
        specialty: "Urologist",
        experience: "25+ years",
        hospital: "Guntur Kidney & Multispeciality Hospital",
        surgeries: "20,000+ Successful Surgeries",
        mainDealing: "Urology, advanced surgical procedures, and successful kidney transplants.",
        avatar: "https://picsum.photos/seed/doc11/100/100",
        dataAiHint: "male doctor experienced",
        opFee: 1100,
    },
    {
        name: "Dr. G. Ravi Shankara Reddy",
        specialty: "Orthopaedics",
        experience: "12 years",
        hospital: "Guntur Kidney & Multispeciality Hospital",
        surgeries: "N/A",
        mainDealing: "Orthopaedic consultations and treatments.",
        avatar: "https://picsum.photos/seed/doc14/100/100",
        dataAiHint: "male doctor professional",
        opFee: 650,
    },
    {
        name: "Dr. Subbamma",
        specialty: "Dermatologist",
        experience: "7 years",
        hospital: "KIMS Hospital, Secunderabad",
        surgeries: "100+ cosmetic procedures",
        mainDealing: "Acne treatment and skin rejuvenation.",
        avatar: "https://picsum.photos/seed/doc6/100/100",
        dataAiHint: "female doctor professional",
        opFee: 550,
    },
    {
        name: "Dr. Murali",
        specialty: "Cardiologist",
        experience: "10 years",
        hospital: "Sravani Hospital, Guntur",
        surgeries: "300+ Angioplasties",
        mainDealing: "Interventional Cardiology.",
        avatar: "https://picsum.photos/seed/doc17/100/100",
        dataAiHint: "male doctor portrait",
        opFee: 800,
    },
    {
        name: "Dr. V. Sasikala",
        specialty: "Intensivist",
        experience: "10 years",
        hospital: "Guntur Kidney & Multispeciality Hospital",
        surgeries: "N/A",
        mainDealing: "Critical care and intensive medical treatment.",
        avatar: "https://picsum.photos/seed/doc12/100/100",
        dataAiHint: "female doctor serious",
        opFee: 950,
    },
    {
        name: "Dr. Jaya Lakshmi",
        specialty: "Gynaecologist",
        experience: "15 years",
        hospital: "Continental Hospitals, Gachibowli",
        surgeries: "500+ successful deliveries",
        mainDealing: "High-risk pregnancy and infertility.",
        avatar: "https://picsum.photos/seed/doc7/100/100",
        dataAiHint: "female doctor professional",
        opFee: 850,
    },
    {
        name: "Dr. Sunitha",
        specialty: "Neurologist",
        experience: "8 years",
        hospital: "Sravani Hospital, Guntur",
        surgeries: "N/A",
        mainDealing: "Stroke and Epilepsy management.",
        avatar: "https://picsum.photos/seed/doc18/100/100",
        dataAiHint: "female doctor professional",
        opFee: 700,
    },
    {
        name: "Dr. K. Sai Mounica Reddy",
        specialty: "General Physician",
        experience: "6 years",
        hospital: "Guntur Kidney & Multispeciality Hospital",
        surgeries: "N/A",
        mainDealing: "Diabetes management and general health.",
        avatar: "https://picsum.photos/seed/doc13/100/100",
        dataAiHint: "female doctor glasses",
        opFee: 450,
    },
];

const departments = [
    { value: "all", label: "All Departments", icon: StethoscopeIcon },
    { value: "Cardiologist", label: "Cardiology", icon: HeartPulse },
    { value: "Orthopedic Surgeon", label: "Orthopedics", icon: Bone },
    { value: "Orthopaedics", label: "Orthopedics", icon: Bone },
    { value: "Neurologist", label: "Neurology", icon: Brain },
    { value: "Gynaecologist", label: "Gynaecology", icon: Baby },
    { value: "Pediatrician", label: "Pediatrics", icon: Baby },
    { value: "Dermatologist", label: "Dermatology", icon: Leaf },
    { value: "General Physician", label: "General Physician", icon: StethoscopeIcon },
    { value: "Gastroenterologist", label: "Gastroenterology", icon: StethoscopeIcon },
    { value: "Nephrologist", label: "Nephrology", icon: StethoscopeIcon },
    { value: "Urologist", label: "Urology", icon: StethoscopeIcon },
    { value: "Intensivist", label: "Intensivist", icon: StethoscopeIcon },
    { value: "General Surgeon", label: "General Surgery", icon: StethoscopeIcon },
];

const uniqueDepartments = Array.from(new Map(departments.map(item => [item.label, item])).values());


const hospitals = [
    "All Hospitals",
    ...Object.keys(hospitalsData),
];

const getReportStatusBadge = (status: string) => {
    switch (status) {
        case 'Abnormal': return 'destructive';
        case 'Normal': return 'default';
        default: return 'secondary';
    }
};

function UploadDialog({ onUpload, trigger, appointmentId, prescriptionId }: { onUpload: (appointmentId: number, prescriptionId: number, newImage: { url: string; dataAiHint: string }, labName: string, reportDate: Date) => void, trigger: React.ReactNode, appointmentId: number, prescriptionId: number }) {
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [labName, setLabName] = useState('');
    const [reportDate, setReportDate] = useState<Date | undefined>();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files &amp;&amp; event.target.files[0]) {
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
                                !reportDate &amp;&amp; "text-muted-foreground"
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
                        {fileName &amp;&amp; <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
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
                                <>&lt;Loader2 className=&quot;mr-2 h-4 w-4 animate-spin&quot; /&gt; Analyzing...</>
                            ) : "Run AI Analysis"}
                        </Button>
                    </div>
                    <div className="space-y-4 relative">
                        <h3 className="font-semibold">AI Summary &amp; Findings</h3>
                        {isPending &amp;&amp; (
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
                            <Button variant="outline" className="w-full sm-w-auto"><Download className="mr-2 h-4 w-4" />Download</Button>
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

function FollowUpForm({ onSave, onCancel, appointmentId, existingFollowUp }: { onSave: (apptId: number, followUp: any) => void; onCancel: () => void; appointmentId: number; existingFollowUp?: any }) {
    const { toast } = useToast();
    const [title, setTitle] = useState(existingFollowUp?.title || '');
    const [doctor, setDoctor] = useState(existingFollowUp?.doctor || '');
    const [date, setDate] = useState(existingFollowUp?.date || '');
    const [status, setStatus] = useState(existingFollowUp?.status || 'Active');
    const [summary, setSummary] = useState(existingFollowUp?.summary || '');
    const [medicines, setMedicines] = useState(existingFollowUp?.medicines?.join(', ') || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newFollowUp = {
            title,
            doctor,
            date,
            status,
            summary,
            medicines: medicines.split(',').map(m => m.trim()).filter(m => m),
            prescriptionImages: existingFollowUp?.prescriptionImages || [],
            details: existingFollowUp?.details || [],
        };
        onSave(appointmentId, newFollowUp);
        toast({
            title: `Follow-up ${existingFollowUp ? 'Updated' : 'Added'}`,
            description: "Your changes have been saved successfully.",
        });
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fu-title">Follow-up Title</Label>
                <Input id="fu-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., 2nd Follow-up" required />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fu-doctor">Doctor</Label>
                    <Input id="fu-doctor" value={doctor} onChange={e => setDoctor(e.target.value)} placeholder="e.g., Dr. Anjali" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="fu-date">Date Range</Label>
                    <Input id="fu-date" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g., Aug 8, 2024 - Aug 15, 2024" required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="fu-status">Status</Label>
                 <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="fu-status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Improved">Improved</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Action Required">Action Required</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="fu-summary">Summary</Label>
                <Textarea id="fu-summary" value={summary} onChange={e => setSummary(e.target.value)} placeholder="Enter a brief summary of the consultation." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="fu-medicines">Medicines (comma-separated)</Label>
                <Input id="fu-medicines" value={medicines} onChange={e => setMedicines(e.target.value)} placeholder="e.g., Paracetamol, Cetirizine" />
            </div>
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit" style={{ backgroundColor: 'hsl(var(--nav-appointments))' }}>Save Changes</Button>
            </DialogFooter>
        </form>
    );
}

function TimeSlotSelector({ slots, selectedTime, onSelectTime, title, icon: Icon }: { slots: string[], selectedTime: string | null, onSelectTime: (time: string) => void, title: string, icon: React.ElementType }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2"><Icon className="h-5 w-5" />{title}</h4>
                <p className="text-xs text-muted-foreground">{slots.length} SLOTS</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {slots.map(time => (
                    <Button 
                        key={time} 
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn("font-semibold", selectedTime === time &amp;&amp; "text-primary-foreground")}
                        style={selectedTime === time ? { backgroundColor: 'hsl(var(--nav-appointments))' } : {}}
                        onClick={() => onSelectTime(time)}
                    >
                        {time}
                    </Button>
                ))}
            </div>
        </div>
    );
}

const DateSelector = ({ selectedDate, onSelectDate }: { selectedDate: Date, onSelectDate: (date: Date) => void }) => {
    const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {dates.map(date => (
                <button 
                    key={date.toISOString()}
                    onClick={() => onSelectDate(date)}
                    className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-lg border-2 w-16 shrink-0 transition-colors",
                        format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                            ? "bg-primary/10"
                            : "border-transparent hover:bg-muted"
                    )}
                    style={format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? { borderColor: 'hsl(var(--nav-appointments))' } : {}}
                >
                    <span className="text-xs font-bold uppercase">{format(date, 'EEE')}</span>
                    <span className="text-lg font-extrabold">{format(date, 'dd')}</span>
                    <span className="text-xs font-bold uppercase">{format(date, 'MMM')}</span>
                </button>
            ))}
        </div>
    );
};

function BookingDialog({ open, onOpenChange, doctor, onBookingComplete }: { open: boolean, onOpenChange: (open: boolean) => void, doctor: any | null, onBookingComplete: (details: any) => void }) {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleContinue = () => {
        if (!doctor || !selectedTime) return;
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };
    
    const handlePay = () => {
         onBookingComplete({
            doctor,
            date: selectedDate,
            time: selectedTime,
        });
        onOpenChange(false);
    }

    useEffect(() => {
        if (open) {
            setStep(1);
            setSelectedTime(null);
            setSelectedDate(addDays(new Date(), 1));
        }
    }, [open]);

    if (!doctor) return null;

    const gst = doctor.opFee * 0.18;
    const total = doctor.opFee + gst;
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 flex flex-col h-[90vh] sm:h-auto max-h-[90vh]">
                <DialogHeader className="p-4 border-b flex-row items-center">
                    {step === 2 &amp;&amp; (
                        <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    )}
                    <DialogTitle className={cn(step === 2 &amp;&amp; "text-center flex-1")}>
                        {step === 1 ? 'Book Online Consult' : 'Payment Summary'}
                    </DialogTitle>
                     <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="ml-auto">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    {step === 1 ? (
                         <div className="p-4 space-y-6">
                            <Card>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">Consultation Fee</h3>
                                        <p className="text-sm text-muted-foreground">For a 15-minute slot</p>
                                    </div>
                                    <p className="text-2xl font-bold" style={{color: 'hsl(var(--nav-appointments))'}}>₹{doctor.opFee}</p>
                                </CardContent>
                            </Card>
                            
                            <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                            
                            <TimeSlotSelector 
                                title="Afternoon"
                                icon={Sun}
                                slots={["12:00 PM", "12:10 PM", "12:20 PM", "12:30 PM", "12:40 PM"]}
                                selectedTime={selectedTime}
                                onSelectTime={setSelectedTime}
                            />

                            <TimeSlotSelector 
                                title="Evening"
                                icon={Moon}
                                slots={["03:00 PM", "03:10 PM", "03:20 PM", "03:30 PM", "03:40 PM", "03:50 PM"]}
                                selectedTime={selectedTime}
                                onSelectTime={setSelectedTime}
                            />

                            <p className="text-xs text-center text-muted-foreground pt-2">*Includes a free chat follow-up for 3 days post-consultation.</p>
                        </div>
                    ) : (
                         <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>{format(selectedDate, "eeee, d MMM")}</span>
                                <span>{selectedTime}</span>
                            </div>

                             <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-bold">1 Online Consultation</h3>
                                    <p className="text-sm text-muted-foreground">For Dr. {doctor.name}</p>
                                    <p className="text-xl font-bold text-right" style={{color: 'hsl(var(--nav-appointments))'}}>₹{doctor.opFee.toFixed(2)}</p>
                                </CardContent>
                            </Card>

                             <div className="space-y-2">
                                <h3 className="font-bold">Payment Details</h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <p className="text-muted-foreground">Consultation Fee</p>
                                        <p>₹{doctor.opFee.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-muted-foreground">Booking charge (inc. of GST)</p>
                                        <p>₹{gst.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Separator />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-lg">Your details</h3>
                                    <Button variant="link" className="p-0 h-auto">Edit</Button>
                                </div>
                                <Card>
                                    <CardContent className="p-4 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src="/images/profile.jpg" />
                                                <AvatarFallback>CL</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">Lokesh Babu chinta</p>
                                                <p className="text-sm text-muted-foreground">+91-8008334948</p>
                                            </div>
                                        </div>
                                         <p className="text-sm text-muted-foreground">lokeshbabu9298@gmail.com</p>
                                         <p className="text-sm text-muted-foreground">Andhra Pradesh</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <Link href="/terms" passHref>
                                <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                                        <p className="font-semibold">Terms and conditions</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </Link>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-semibold">Cancellation &amp; Reschedule Policy</p>
                                        <p className="text-sm text-muted-foreground">Please contact customer care for assistance.</p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    )}
                </div>

                <DialogFooter className="p-4 border-t bg-background">
                    {step === 1 ? (
                        <Button onClick={handleContinue} disabled={!selectedTime} className="w-full h-12 text-lg" style={{backgroundColor: 'hsl(var(--nav-appointments))'}}>
                            Continue
                        </Button>
                    ) : (
                         <div className="flex justify-between items-center w-full">
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Total Amount</p>
                                <p className="font-bold text-lg">₹{total.toFixed(2)}</p>
                            </div>
                            <Button className="h-12 px-6" style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={handlePay}>
                                <div className="flex flex-col items-end -my-1">
                                    <span className="text-lg font-bold leading-tight">Pay &amp; Confirm</span>
                                </div>
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function AppointmentsPage() {
    const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
    const [doctorForBooking, setDoctorForBooking] = useState<any | null>(null);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [isSharing, setIsSharing] = useState(false);

    // Doctor filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedHospital, setSelectedHospital] = useState('All Hospitals');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
    
    // History filters and state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDoctor, setFilterDoctor] = useState('all');
    const [filterDate, setFilterDate] = useState<Date>();
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFollowUp, setEditingFollowUp] = useState&lt;{apptIndex: number, pIndex?: number} | null&gt;(null);


    const [appointments, setAppointments] = useState(() =&gt; 
        initialAppointmentsData.map(appt =&gt; ({
            ...appt,
            prescriptions: appt.prescriptions.map(p =&gt; ({
                ...p,
                prescriptionImages: Array.isArray(p.prescriptionImages) ? p.prescriptionImages : (p.prescriptionImage ? [{ url: p.prescriptionImage, dataAiHint: p.dataAiHint || 'medical prescription' }] : [])
            }))
        }))
    );
    
    const handleSaveFollowUp = (apptIndex: number, followUp: any) => {
        setAppointments(prev =&gt; prev.map((appt, i) =&gt; {
            if (i === apptIndex) {
                let newPrescriptions;
                if(editingFollowUp &amp;&amp; editingFollowUp.pIndex !== undefined) {
                    // Editing existing
                     newPrescriptions = appt.prescriptions.map((p, p_idx) =&gt; p_idx === editingFollowUp.pIndex ? followUp : p);
                } else {
                    // Adding new
                    newPrescriptions = [...appt.prescriptions, followUp];
                }
                return { ...appt, prescriptions: newPrescriptions };
            }
            return appt;
        }));
    };
    
    const handleDeleteFollowUp = (apptIndex: number, pIndex: number) => {
        setAppointments(prev =&gt; prev.map((appt, i) =&gt; {
            if (i === apptIndex) {
                const newPrescriptions = appt.prescriptions.filter((_, p_idx) =&gt; p_idx !== pIndex);
                return { ...appt, prescriptions: newPrescriptions };
            }
            return appt;
        }));
        toast({ title: "Follow-up Deleted", description: "The entry has been removed from your history." });
    };

    const handleOpenForm = (apptIndex: number, pIndex?: number) => {
        setEditingFollowUp({ apptIndex, pIndex });
        setIsFormOpen(true);
    };


    const handleFilter = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = doctors.filter(doctor =&gt; {
            const nameMatch = doctor.name.toLowerCase().includes(lowercasedQuery);
            const hospitalMatch = doctor.hospital.toLowerCase().includes(lowercasedQuery);
            const searchMatch = nameMatch || hospitalMatch;

            const departmentMatch = selectedDepartment === 'all' || doctor.specialty === selectedDepartment;
            
            const hospitalFilterMatch = selectedHospital === 'All Hospitals' || doctor.hospital === selectedHospital;

            const hospitalDetails = hospitalsData[doctor.hospital];
            const locationMatch = selectedLocation === 'all' || (hospitalDetails &amp;&amp; hospitalDetails.location === selectedLocation);

            return searchMatch &amp;&amp; departmentMatch &amp;&amp; hospitalFilterMatch &amp;&amp; locationMatch;
        });
        setFilteredDoctors(filtered);
    };

    const handleViewProfile = (doctor: any) => {
        setSelectedDoctor(doctor);
        setProfileOpen(true);
    };
    
    const handleShare = (doctor: any) => {
        setIsSharing(true);
        const hospital = hospitalsData[doctor.hospital as keyof typeof hospitalsData];
        const shareText = `Check out Dr. ${doctor.name}, ${doctor.specialty} at ${doctor.hospital}.\nAddress: ${hospital.address}\nContact: ${hospital.phone}`;
        navigator.clipboard.writeText(shareText);
        toast({
            title: "Copied to Clipboard",
            description: "Doctor's details have been copied.",
        });
        setTimeout(() => setIsSharing(false), 1000);
    };

    const handleBookAppointment = (doctor: any) => {
        setProfileOpen(false); // Close profile dialog if open
        setDoctorForBooking(doctor);
        setIsBookingOpen(true);
    };

     const handleBookingComplete = (details: any) => {
        toast({
            title: "Appointment Booked!",
            description: `Your appointment with ${details.doctor.name} on ${format(details.date, "PPP")} at ${details.time} is confirmed.`,
        });
        // Optionally redirect or update UI
    };

    const allDoctors = useMemo(() => {
        const doctors = new Set&lt;string&gt;();
        appointments.forEach(appt =&gt; {
            doctors.add(appt.initialDoctor);
            appt.prescriptions.forEach(p =&gt; doctors.add(p.doctor));
        });
        return ['all', ...Array.from(doctors)];
    }, [appointments]);

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appt) =&gt; {
            const doctorMatch = filterDoctor === 'all' || appt.initialDoctor === filterDoctor || appt.prescriptions.some(p =&gt; p.doctor === filterDoctor);
            const dateMatch = !filterDate || format(new Date(appt.date), 'yyyy-MM-dd') === format(new Date(filterDate), 'yyyy-MM-dd');
    
            if (!searchTerm) {
                return doctorMatch &amp;&amp; dateMatch;
            }
    
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            
            // This is a placeholder for the index logic
            const baseIndex = appointments.indexOf(appt) + 1;
    
            const keywordMatch = (
                baseIndex.toString() === lowercasedSearchTerm ||
                appt.problem.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.initialDoctor.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.specialty.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.date.toLowerCase().includes(lowercasedSearchTerm) ||
                appt.prescriptions.some((p, pIndex) =&gt; {
                    const subSerialNumber = `${baseIndex}.${pIndex + 1}`;
                    return (
                        subSerialNumber === lowercasedSearchTerm ||
                        p.title.toLowerCase().includes(lowercasedSearchTerm) ||
                        p.doctor.toLowerCase().includes(lowercasedSearchTerm) ||
                        p.summary.toLowerCase().includes(lowercasedSearchTerm) ||
                        (p.medicines &amp;&amp; p.medicines.some(m =&gt; m.toLowerCase().includes(lowercasedSearchTerm))) ||
                        (p.details &amp;&amp; p.details.some(d =&gt; d.name.toLowerCase().includes(lowercasedSearchTerm)))
                    );
                })
            );
            return keywordMatch &amp;&amp; doctorMatch &amp;&amp; dateMatch;
        });
    }, [appointments, searchTerm, filterDoctor, filterDate]);


    const clearFilters = () => {
        setSearchTerm('');
        setFilterDoctor('all');
        setFilterDate(undefined);
    };

    const handleUpload = (appointmentId: number, prescriptionId: number, newImage: { url: string; dataAiHint: string }, labName: string, reportDate: Date) => {
        setAppointments(prevAppointments =&gt; {
            return prevAppointments.map((appt, apptIndex) =&gt; {
                if (apptIndex === appointmentId) {
                    const newPrescriptions = appt.prescriptions.map((p, pIndex) =&gt; {
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

    return (
        &lt;div className=&quot;space-y-6&quot;&gt;
            &lt;div className=&quot;text-left&quot;&gt;
                &lt;h1 className=&quot;text-2xl font-bold&quot; style={{color: 'hsl(var(--nav-appointments))'}}&gt;Find &amp;amp; Manage Appointments&lt;/h1&gt;
                &lt;p className=&quot;text-muted-foreground&quot;&gt;Find the right doctor for your needs and review your history.&lt;/p&gt;
            &lt;/div&gt;

            &lt;Tabs defaultValue=&quot;find-doctor&quot; className=&quot;w-full&quot;&gt;
                &lt;TabsList className=&quot;grid w-full grid-cols-2&quot;&gt;
                    &lt;TabsTrigger value=&quot;find-doctor&quot;&gt;Find a Doctor&lt;/TabsTrigger&gt;
                    &lt;TabsTrigger value=&quot;history&quot;&gt;Appointments History&lt;/TabsTrigger&gt;
                &lt;/TabsList&gt;
                &lt;TabsContent value=&quot;find-doctor&quot; className=&quot;mt-6&quot;&gt;
                    &lt;div className=&quot;space-y-6&quot;&gt;
                        &lt;Card className=&quot;shadow-sm&quot;&gt;
                             &lt;CardContent className=&quot;p-4 pt-4&quot;&gt;
                                &lt;div className=&quot;grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-end&quot;&gt;
                                    &lt;div className=&quot;relative sm:col-span-2 lg:col-span-1&quot;&gt;
                                        &lt;Search className=&quot;absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground&quot; /&gt;
                                        &lt;Input 
                                            placeholder=&quot;Doctor, hospital...&quot; 
                                            className=&quot;pl-10&quot; 
                                            value={searchQuery}
                                            onChange={(e) =&gt; setSearchQuery(e.target.value)}
                                        /&gt;
                                    &lt;/div&gt;
                                    &lt;Select value={selectedDepartment} onValueChange={setSelectedDepartment}&gt;
                                        &lt;SelectTrigger&gt;
                                            &lt;div className=&quot;flex items-center gap-2&quot;&gt;
                                                &lt;StethoscopeIcon className=&quot;h-4 w-4 text-muted-foreground&quot; /&gt;
                                                &lt;SelectValue placeholder=&quot;Department&quot; /&gt;
                                            &lt;/div&gt;
                                        &lt;/SelectTrigger&gt;
                                        &lt;SelectContent&gt;
                                            {uniqueDepartments.map(dep =&gt; (
                                                &lt;SelectItem key={dep.value} value={dep.value}&gt;
                                                    &lt;div className=&quot;flex items-center gap-2&quot;&gt;
                                                        &lt;dep.icon className=&quot;h-4 w-4&quot; /&gt;
                                                        {dep.label}
                                                    &lt;/div&gt;
                                                &lt;/SelectItem&gt;
                                            ))}
                                        &lt;/SelectContent&gt;
                                    &lt;/Select&gt;
                                     &lt;Select value={selectedLocation} onValueChange={setSelectedLocation}&gt;
                                         &lt;SelectTrigger&gt;
                                            &lt;div className=&quot;flex items-center gap-2&quot;&gt;
                                               &lt;MapPin className=&quot;h-4 w-4 text-muted-foreground&quot; /&gt;
                                               &lt;SelectValue placeholder=&quot;Location&quot; /&gt;
                                            &lt;/div&gt;
                                        &lt;/SelectTrigger&gt;
                                        &lt;SelectContent&gt;
                                            &lt;SelectItem value=&quot;all&quot;&gt;All Locations&lt;/SelectItem&gt;
                                            &lt;SelectItem value=&quot;Hyderabad&quot;&gt;Hyderabad&lt;/SelectItem&gt;
                                             &lt;SelectItem value=&quot;Guntur&quot;&gt;Guntur&lt;/SelectItem&gt;
                                        &lt;/SelectContent&gt;
                                    &lt;/Select&gt;
                                    &lt;Button className=&quot;w-full&quot; style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={handleFilter}&gt;Search&lt;/Button&gt;
                                &lt;/div&gt;
                            &lt;/CardContent&gt;
                        &lt;/Card&gt;

                        &lt;div className=&quot;grid grid-cols-1 lg:grid-cols-2 gap-6&quot;&gt;
                            {filteredDoctors.map((doctor, index) =&gt; {
                                const discountedFee = doctor.opFee * 0.5;
                                return (
                                    &lt;Card key={index} className=&quot;transition-shadow hover:shadow-md&quot;&gt;
                                        &lt;CardContent className=&quot;p-4&quot;&gt;
                                            &lt;div className=&quot;flex flex-row gap-4&quot;&gt;
                                                &lt;Avatar className=&quot;h-20 w-20 border-4 flex-shrink-0&quot; style={{borderColor: 'hsl(var(--nav-appointments))'}}&gt;
                                                    &lt;AvatarImage src={doctor.avatar} data-ai-hint={doctor.dataAiHint} /&gt;
                                                    &lt;AvatarFallback&gt;{doctor.name.split(' ').map(n =&gt; n[0]).join('')}&lt;/AvatarFallback&gt;
                                                &lt;/Avatar&gt;
                                                &lt;div className=&quot;flex-1&quot;&gt;
                                                    &lt;div className=&quot;flex items-center gap-2&quot;&gt;
                                                        &lt;h3 className=&quot;text-xl font-bold&quot;&gt;{doctor.name}&lt;/h3&gt;
                                                        {(doctor as any).recommended &amp;&amp; (
                                                            &lt;Badge className=&quot;bg-yellow-100 text-yellow-800 border-yellow-200 hidden sm:flex&quot;&gt;
                                                                &lt;Star className=&quot;h-3 w-3 mr-1&quot; /&gt;
                                                                Recommended
                                                            &lt;/Badge&gt;
                                                        )}
                                                    &lt;/div&gt;
                                                    &lt;p style={{color: 'hsl(var(--nav-appointments))'}} className=&quot;font-semibold text-sm&quot;&gt;{doctor.specialty}&lt;/p&gt;
                                                    &lt;p className=&quot;text-xs text-muted-foreground&quot;&gt;{doctor.experience} experience&lt;/p&gt;
                                                    &lt;p className=&quot;text-xs text-muted-foreground font-medium mt-1&quot;&gt;{doctor.hospital}&lt;/p&gt;
                                                &lt;/div&gt;
                                            &lt;/div&gt;
                                            &lt;div className=&quot;mt-4 space-y-2 text-sm&quot;&gt;
                                                &lt;p&gt;&lt;strong className=&quot;font-semibold&quot;&gt;Surgeries:&lt;/strong&gt; {doctor.surgeries}&lt;/p&gt;
                                                &lt;p&gt;&lt;strong className=&quot;font-semibold&quot;&gt;Focus:&lt;/strong&gt; {doctor.mainDealing}&lt;/p&gt;
                                            &lt;/div&gt;
                                             &lt;div className=&quot;mt-4 flex flex-col sm:flex-row justify-between items-center gap-4&quot;&gt;
                                                &lt;div className=&quot;text-center sm:text-left&quot;&gt;
                                                    &lt;p className=&quot;text-xs font-semibold&quot;&gt;Consultation Fee&lt;/p&gt;
                                                    &lt;div className=&quot;flex items-baseline gap-2&quot;&gt;
                                                        &lt;p className=&quot;text-xl font-bold&quot; style={{color: 'hsl(var(--nav-appointments))'}}&gt;₹{doctor.opFee}&lt;/p&gt;
                                                    &lt;/div&gt;
                                                &lt;/div&gt;
                                                &lt;div className=&quot;flex w-full sm:w-auto shrink-0 gap-2&quot;&gt;
                                                    &lt;Button variant=&quot;outline&quot; className=&quot;flex-1 sm:flex-auto&quot; onClick={() =&gt; handleViewProfile(doctor)}&gt;View Profile&lt;/Button&gt;
                                                    &lt;Button className=&quot;flex-1 sm:flex-auto&quot; style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={() =&gt; handleBookAppointment(doctor)}&gt;
                                                        Book Appointment
                                                    &lt;/Button&gt;
                                                &lt;/div&gt;
                                            &lt;/div&gt;
                                        &lt;/CardContent&gt;
                                    &lt;/Card&gt;
                                )
                            })}
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/TabsContent&gt;
                &lt;TabsContent value=&quot;history&quot; className=&quot;mt-6&quot;&gt;
                     &lt;Card&gt;
                        &lt;CardHeader&gt;
                             &lt;div className=&quot;flex items-center gap-2&quot;&gt;
                                &lt;History className=&quot;h-6 w-6&quot;/&gt;
                                &lt;h2 className=&quot;text-2xl font-bold&quot;&gt;Appointments History&lt;/h2&gt;
                            &lt;/div&gt;
                            &lt;Separator className=&quot;my-4&quot;/&gt;
                            &lt;div className=&quot;space-y-4&quot;&gt;
                                &lt;div className=&quot;space-y-2&quot;&gt;
                                     &lt;div className=&quot;flex justify-between items-center&quot;&gt;
                                        &lt;h3 className=&quot;font-semibold flex items-center gap-2&quot;&gt;&lt;Filter className=&quot;h-5 w-5&quot; /&gt; Filters&lt;/h3&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2&quot;&gt;
                                        &lt;div className=&quot;relative md:col-span-1&quot;&gt;
                                            &lt;Search className=&quot;absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground&quot; /&gt;
                                            &lt;Input 
                                                placeholder=&quot;Search...&quot; 
                                                className=&quot;pl-10&quot;
                                                value={searchTerm}
                                                onChange={(e) =&gt; setSearchTerm(e.target.value)}
                                            /&gt;
                                        &lt;/div&gt;
                                        &lt;Select value={filterDoctor} onValueChange={setFilterDoctor}&gt;
                                            &lt;SelectTrigger&gt;
                                                &lt;SelectValue placeholder=&quot;All Doctors&quot; /&gt;
                                            &lt;/SelectTrigger&gt;
                                            &lt;SelectContent&gt;
                                                {allDoctors.map(doc =&gt; &lt;SelectItem key={doc} value={doc}&gt;{doc === 'all' ? 'All Doctors' : doc}&lt;/SelectItem&gt;)}
                                            &lt;/SelectContent&gt;
                                        &lt;/Select&gt;
                                        &lt;Popover&gt;
                                            &lt;PopoverTrigger asChild&gt;
                                            &lt;Button
                                                variant={&quot;outline&quot;}
                                                className={cn(
                                                &quot;justify-start text-left font-normal&quot;,
                                                !filterDate &amp;&amp; &quot;text-muted-foreground&quot;
                                                )}
                                            &gt;
                                                &lt;CalendarIcon className=&quot;mr-2 h-4 w-4&quot; /&gt;
                                                {filterDate ? format(filterDate, &quot;dd-MMM-yyyy&quot;) : &lt;span&gt;Filter by date&lt;/span&gt;}
                                            &lt;/Button&gt;
                                            &lt;/PopoverTrigger&gt;
                                            &lt;PopoverContent className=&quot;w-auto p-0&quot;&gt;
                                            &lt;CalendarComponent
                                                mode=&quot;single&quot;
                                                selected={filterDate}
                                                onSelect={setFilterDate}
                                                initialFocus
                                            /&gt;
                                            &lt;/PopoverContent&gt;
                                        &lt;/Popover&gt;
                                    &lt;/div&gt;
                                     &lt;Button variant=&quot;ghost&quot; onClick={clearFilters} className=&quot;text-sm h-8 px-2 justify-start w-fit&quot;&gt;
                                        &lt;X className='mr-2 h-4 w-4' /&gt;
                                        Clear Filters
                                    &lt;/Button&gt;
                                &lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/CardHeader&gt;
                        &lt;CardContent&gt;
                             &lt;div className=&quot;grid grid-cols-1 gap-6&quot;&gt;
                                {filteredAppointments.length &gt; 0 ? filteredAppointments.map((appt, index) =&gt; (
                                    &lt;Collapsible key={index} className=&quot;border rounded-lg bg-background&quot;&gt;
                                        &lt;CollapsibleTrigger className=&quot;w-full p-4 hover:bg-muted/50 transition-colors flex items-start justify-between text-left&quot;&gt;
                                            &lt;div className=&quot;flex-1 flex items-start gap-3&quot;&gt;
                                                &lt;span className=&quot;text-2xl font-bold text-blue-900 dark:text-blue-400&quot;&gt;{filteredAppointments.indexOf(appt) + 1})&lt;/span&gt;
                                                &lt;div&gt;
                                                    &lt;p className=&quot;text-xl font-bold&quot;&gt;{appt.problem}&lt;/p&gt;
                                                    &lt;div className=&quot;text-base font-semibold text-muted-foreground mt-1&quot;&gt;{appt.specialty}&lt;/div&gt;
                                                    &lt;div className=&quot;text-sm text-muted-foreground mt-1 flex items-center gap-2&quot;&gt;&lt;Calendar className=&quot;h-4 w-4&quot;/&gt; First seen: {format(new Date(appt.date), 'dd-MMM-yyyy')} by {appt.initialDoctor}&lt;/div&gt;
                                                &lt;/div&gt;
                                            &lt;/div&gt;
                                            &lt;ChevronDown className=&quot;h-6 w-6 transition-transform duration-200 [&amp;[data-state=open]]:rotate-180 flex-shrink-0 mt-1&quot; /&gt;
                                        &lt;/CollapsibleTrigger&gt;
                                        &lt;CollapsibleContent className=&quot;p-4 border-t space-y-4 bg-muted/20&quot;&gt;
                                            &lt;div className=&quot;flex justify-between items-center&quot;&gt;
                                                &lt;h4 className=&quot;font-bold text-lg flex items-center gap-2&quot;&gt;&lt;FileText className=&quot;h-5 w-5&quot; /&gt; Prescription &amp;amp; Follow-up History&lt;/h4&gt;
                                                &lt;Button size=&quot;sm&quot; onClick={() =&gt; handleOpenForm(index)}&gt;
                                                    &lt;PlusCircle className=&quot;mr-2 h-4 w-4&quot; /&gt; Add Follow-up
                                                &lt;/Button&gt;
                                            &lt;/div&gt;
                                            {appt.prescriptions.length &gt; 0 ? (
                                                &lt;div className=&quot;space-y-4&quot;&gt;
                                                    {appt.prescriptions.map((item, pIndex) =&gt; (
                                                        &lt;div key={pIndex}&gt;
                                                            {item.title === 'Condition Status' &amp;&amp; item.status === 'Resolved' ? (
                                                                 &lt;div className='p-4 border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800 rounded-lg text-center relative overflow-hidden'&gt;
                                                                    &lt;FlowerFall /&gt;
                                                                    &lt;div className=&quot;relative z-10&quot;&gt;
                                                                        &lt;PartyPopper className=&quot;h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-2&quot;/&gt;
                                                                        &lt;p className=&quot;font-bold text-lg text-blue-800 dark:text-blue-300&quot;&gt;Congratulations on your recovery!&lt;/p&gt;
                                                                        &lt;p className=&quot;text-sm text-blue-700 dark:text-blue-400/80&quot;&gt;{item.summary}&lt;/p&gt;
                                                                    &lt;/div&gt;
                                                                 &lt;/div&gt;
                                                            ) : (
                                                                &lt;div className='p-4 border bg-background rounded-lg'&gt;
                                                                    &lt;div className=&quot;flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4&quot;&gt;
                                                                        &lt;div className=&quot;font-semibold text-sm flex items-center gap-2 flex-wrap&quot;&gt;
                                                                            &lt;span className=&quot;text-lg font-bold text-blue-900 dark:text-blue-400&quot;&gt;{filteredAppointments.indexOf(appt) + 1}.{pIndex + 1})&lt;/span&gt;
                                                                            &lt;span&gt;{item.title}&lt;/span&gt;
                                                                            &lt;span className=&quot;hidden sm:inline mx-1 text-muted-foreground&quot;&gt;•&lt;/span&gt;
                                                                            &lt;span className=&quot;font-bold&quot; style={{color: 'hsl(var(--nav-appointments))'}}&gt;{item.doctor}&lt;/span&gt;
                                                                            &lt;span className=&quot;hidden sm:inline mx-1 text-muted-foreground&quot;&gt;•&lt;/span&gt;
                                                                            &lt;span&gt;{item.date}&lt;/span&gt;
                                                                        &lt;/div&gt;
                                                                        &lt;Badge variant={item.status === 'Completed' ? 'secondary' : 'default'} className={cn('w-fit mt-2 sm:mt-0', item.status === 'Active' ? 'bg-green-100 text-green-800' : '', item.status === 'Improved' || item.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', item.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}&gt;{item.status}&lt;/Badge&gt;
                                                                    &lt;/div&gt;
                                                                    
                                                                    &lt;div className=&quot;flex items-center gap-2 flex-wrap overflow-x-auto pb-2&quot;&gt;
                                                                         &lt;Dialog&gt;
                                                                            &lt;DialogTrigger asChild&gt;
                                                                                &lt;Button size=&quot;sm&quot; style={{backgroundColor: 'hsl(var(--nav-appointments))'}}&gt;
                                                                                    &lt;View className=&quot;mr-2 h-4 w-4&quot; /&gt; View Details
                                                                                &lt;/Button&gt;
                                                                            &lt;/DialogTrigger&gt;
                                                                            &lt;DialogContent className=&quot;sm:max-w-xl max-h-[90vh] flex flex-col p-0&quot;&gt;
                                                                                &lt;DialogHeader className=&quot;p-6 pb-4&quot;&gt;
                                                                                    &lt;DialogTitle&gt;{item.title}&lt;/DialogTitle&gt;
                                                                                    &lt;DialogDescription&gt;
                                                                                        Follow-up from {item.date} by &lt;span className=&quot;font-bold&quot; style={{color: 'hsl(var(--nav-appointments))'}}&gt;{item.doctor}&lt;/span&gt;.
                                                                                    &lt;/DialogDescription&gt;
                                                                                &lt;/DialogHeader&gt;
                                                                                &lt;div className=&quot;overflow-y-auto px-6 pb-6 space-y-6 flex-1&quot;&gt;
                                                                                    
                                                                                    {item.prescriptionImages &amp;&amp; item.prescriptionImages.length &gt; 0 &amp;&amp; (
                                                                                        &lt;div&gt;
                                                                                            &lt;h4 className='font-semibold mb-2 text-base'&gt;Prescription Images&lt;/h4&gt;
                                                                                            &lt;div className=&quot;grid grid-cols-2 sm:grid-cols-3 gap-2&quot;&gt;
                                                                                                {item.prescriptionImages.map((img: any, imgIndex: number) =&gt; (
                                                                                                    &lt;div key={imgIndex} className=&quot;cursor-pointer group relative&quot; onClick={() =&gt; setZoomedImage(img.url)}&gt;
                                                                                                        &lt;Image 
                                                                                                            src={img.url} 
                                                                                                            alt={`Prescription for ${item.title} - Page ${imgIndex + 1}`}
                                                                                                            width={150}
                                                                                                            height={210}
                                                                                                            data-ai-hint={img.dataAiHint}
                                                                                                            className=&quot;rounded-lg border group-hover:opacity-80 transition-opacity w-full h-auto object-cover&quot;
                                                                                                        /&gt;
                                                                                                        &lt;div className=&quot;absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg&quot;&gt;
                                                                                                            &lt;Search className=&quot;text-white h-6 w-6&quot; /&gt;
                                                                                                        &lt;/div&gt;
                                                                                                    &lt;/div&gt;
                                                                                                ))}
                                                                                            &lt;/div&gt;
                                                                                            &lt;Separator className=&quot;my-4&quot; /&gt;
                                                                                        &lt;/div&gt;
                                                                                    )}
                                                                                    
                                                                                    {item.medicines &amp;&amp; item.medicines.length &gt; 0 &amp;&amp; (
                                                                                        &lt;div&gt;
                                                                                            &lt;h4 className='font-semibold mb-2 text-base'&gt;Medications&lt;/h4&gt;
                                                                                            &lt;div className=&quot;flex flex-wrap gap-2&quot;&gt;
                                                                                                {item.medicines.map((med: string) =&gt; &lt;Badge key={med} variant='secondary' className=&quot;text-sm&quot;&gt;{med}&lt;/Badge&gt;)}
                                                                                            &lt;/div&gt;
                                                                                             &lt;Separator className=&quot;my-4&quot; /&gt;
                                                                                        &lt;/div&gt;
                                                                                    )}
                                                                                    
                                                                                    {item.summary &amp;&amp; (
                                                                                        &lt;div&gt;
                                                                                            &lt;h4 className='font-semibold mb-2 text-base'&gt;Condition Summary&lt;/h4&gt;
                                                                                            &lt;p className='text-sm text-muted-foreground'&gt;{item.summary}&lt;/p&gt;
                                                                                             &lt;Separator className=&quot;my-4&quot; /&gt;
                                                                                        &lt;/div&gt;
                                                                                    )}
                                                                                    
                                                                                    {item.details &amp;&amp; item.details.length &gt; 0 &amp;&amp; (
                                                                                         &lt;div&gt;
                                                                                            &lt;h4 className='font-semibold mb-2 text-base'&gt;Test Results&lt;/h4&gt;
                                                                                            &lt;div className=&quot;space-y-2&quot;&gt;
                                                                                                {item.details.map((detail, dIndex) =&gt; (
                                                                                                    &lt;div key={dIndex} className=&quot;p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2&quot;&gt;
                                                                                                        &lt;div className='mb-2 sm:mb-0'&gt;
                                                                                                            &lt;p className=&quot;font-bold&quot;&gt;{detail.name}&lt;/p&gt;
                                                                                                            &lt;Badge variant={getReportStatusBadge(detail.status)}&gt;{detail.status}&lt;/Badge&gt;
                                                                                                        &lt;/div&gt;
                                                                                                        &lt;ViewReportDialog report={detail}&gt;
                                                                                                            &lt;Button variant=&quot;outline&quot; size=&quot;sm&quot;&gt;
                                                                                                                &lt;View className=&quot;mr-2 h-4 w-4&quot; /&gt; View Report
                                                                                                            &lt;/Button&gt;
                                                                                                        &lt;/ViewReportDialog&gt;
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
                                                                                &lt;Button variant=&quot;outline&quot; size=&quot;sm&quot;&gt;
                                                                                    &lt;Upload className=&quot;mr-2 h-4 w-4&quot; /&gt; Upload
                                                                                &lt;/Button&gt;
                                                                            }
                                                                            appointmentId={index}
                                                                            prescriptionId={pIndex}
                                                                            onUpload={handleUpload}
                                                                        /&gt;
                                                                        &lt;Button variant=&quot;outline&quot; size=&quot;sm&quot; onClick={() =&gt; handleOpenForm(index, pIndex)}&gt;
                                                                            &lt;Pencil className=&quot;mr-2 h-4 w-4&quot; /&gt; Edit
                                                                        &lt;/Button&gt;
                                                                        &lt;AlertDialog&gt;
                                                                            &lt;AlertDialogTrigger asChild&gt;
                                                                                &lt;Button variant=&quot;outline&quot; size=&quot;sm&quot; className=&quot;text-destructive border-destructive/50 hover:bg-destructive/10 hover:text-destructive&quot;&gt;
                                                                                    &lt;Trash2 className=&quot;mr-2 h-4 w-4&quot; /&gt; Delete
                                                                                &lt;/Button&gt;
                                                                            &lt;/AlertDialogTrigger&gt;
                                                                            &lt;AlertDialogContent&gt;
                                                                                &lt;AlertDialogHeader&gt;
                                                                                &lt;AlertDialogTitle&gt;Are you sure?&lt;/AlertDialogTitle&gt;
                                                                                &lt;AlertDialogDescription&gt;
                                                                                    This action cannot be undone. This will permanently delete the follow-up entry for &quot;{item.title}&quot;.
                                                                                &lt;/AlertDialogDescription&gt;
                                                                                &lt;/AlertDialogHeader&gt;
                                                                                &lt;AlertDialogFooter&gt;
                                                                                &lt;AlertDialogCancel&gt;Cancel&lt;/AlertDialogCancel&gt;
                                                                                &lt;AlertDialogAction onClick={() =&gt; handleDeleteFollowUp(index, pIndex)} className=&quot;bg-destructive hover:bg-destructive/90&quot;&gt;Delete&lt;/AlertDialogAction&gt;
                                                                                &lt;/AlertDialogFooter&gt;
                                                                            &lt;/AlertDialogContent&gt;
                                                                        &lt;/AlertDialog&gt;
                                                                    &lt;/div&gt;
                                                                &lt;/div&gt;
                                                            )}
                                                        &lt;/div&gt;
                                                    ))}
                                                &lt;/div&gt;
                                            ) : (
                                                &lt;p className=&quot;text-base text-muted-foreground text-center py-4&quot;&gt;No follow-ups recorded for this issue yet. Click &quot;Add Follow-up&quot; to start.&lt;/p&gt;
                                            )}
                                        &lt;/CollapsibleContent&gt;
                                    &lt;/Collapsible&gt;
                                )) : (
                                    &lt;div className=&quot;text-center p-8 text-muted-foreground&quot;&gt;No appointments match your filters.&lt;/div&gt;
                                )}
                            &lt;/div&gt;
                        &lt;/CardContent&gt;
                    &lt;/Card&gt;
                &lt;/TabsContent&gt;
            &lt;/Tabs&gt;
            
            &lt;BookingDialog
                open={isBookingOpen}
                onOpenChange={setIsBookingOpen}
                doctor={doctorForBooking}
                onBookingComplete={handleBookingComplete}
            /&gt;

            &lt;Dialog open={isProfileOpen} onOpenChange={setProfileOpen}&gt;
                &lt;DialogContent className=&quot;sm:max-w-2xl&quot;&gt;
                    {selectedDoctor &amp;&amp; (
                        &lt;&gt;
                            &lt;DialogHeader&gt;
                                &lt;div className=&quot;flex items-center gap-4&quot;&gt;
                                     &lt;Avatar className=&quot;h-20 w-20 border-4&quot; style={{borderColor: 'hsl(var(--nav-appointments))'}}&gt;
                                        &lt;AvatarImage src={selectedDoctor.avatar} data-ai-hint={selectedDoctor.dataAiHint} /&gt;
                                        &lt;AvatarFallback&gt;{selectedDoctor.name.split(' ').map((n: string) =&gt; n[0]).join('')}&lt;/AvatarFallback&gt;
                                    &lt;/Avatar&gt;
                                    &lt;div&gt;
                                        &lt;DialogTitle className=&quot;text-2xl&quot;&gt;{selectedDoctor.name}&lt;/DialogTitle&gt;
                                        &lt;DialogDescription className=&quot;text-base&quot; style={{color: 'hsl(var(--nav-appointments))'}}&gt;{selectedDoctor.specialty}&lt;/DialogDescription&gt;
                                        &lt;p className=&quot;text-sm text-muted-foreground&quot;&gt;{selectedDoctor.experience} of experience&lt;/p&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                            &lt;/DialogHeader&gt;
                            &lt;div className=&quot;space-y-4 py-4&quot;&gt;
                                &lt;div className=&quot;p-4 rounded-lg bg-muted/50&quot;&gt;
                                    &lt;h4 className=&quot;font-semibold text-lg mb-2&quot;&gt;{selectedDoctor.hospital}&lt;/h4&gt;
                                    &lt;div className=&quot;space-y-2 text-sm&quot;&gt;
                                        &lt;p className=&quot;flex items-start gap-2&quot;&gt;&lt;MapPin className=&quot;h-4 w-4 mt-1 flex-shrink-0&quot;/&gt; {hospitalsData[selectedDoctor.hospital as keyof typeof hospitalsData]?.address}&lt;/p&gt;
                                        &lt;p className=&quot;flex items-center gap-2&quot;&gt;&lt;Phone className=&quot;h-4 w-4&quot;/&gt; {hospitalsData[selectedDoctor.hospital as keyof typeof hospitalsData]?.phone}&lt;/p&gt;
                                        &lt;a href={hospitalsData[selectedDoctor.hospital as keyof typeof hospitalsData]?.website} target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot; className=&quot;flex items-center gap-2 text-primary hover:underline&quot;&gt;
                                            &lt;Globe className=&quot;h-4 w-4&quot;/&gt; Visit Website
                                        &lt;/a&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;div className=&quot;p-4 rounded-lg bg-muted/50&quot;&gt;
                                    &lt;h4 className=&quot;font-semibold text-lg mb-2&quot;&gt;Consultation Fee&lt;/h4&gt;
                                    &lt;div className=&quot;flex items-baseline gap-2&quot;&gt;
                                        &lt;p className=&quot;text-3xl font-bold&quot; style={{color: 'hsl(var(--nav-appointments))'}}&gt;₹{selectedDoctor.opFee}&lt;/p&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;div className=&quot;flex justify-end gap-2&quot;&gt;
                                    &lt;Button variant=&quot;outline&quot; onClick={() =&gt; handleShare(selectedDoctor)} disabled={isSharing}&gt;
                                        {isSharing ? &lt;Loader2 className=&quot;mr-2 h-4 w-4 animate-spin&quot; /&gt; : &lt;Copy className=&quot;mr-2 h-4 w-4&quot; /&gt;}
                                        {isSharing ? 'Copying...' : 'Copy Details'}
                                    &lt;/Button&gt;
                                     &lt;Button style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={() =&gt; handleBookAppointment(selectedDoctor)}&gt;
                                        Book Appointment
                                    &lt;/Button&gt;
                                &lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/&gt;
                    )}
                &lt;/DialogContent&gt;
            &lt;/Dialog&gt;

             &lt;Dialog open={zoomedImage !== null} onOpenChange={() =&gt; setZoomedImage(null)}&gt;
                &lt;DialogContent className=&quot;max-w-5xl h-[90vh] flex flex-col p-0 border-0&quot;&gt;
                     &lt;DialogHeader className=&quot;p-4 bg-background rounded-t-lg z-10 shadow-sm flex-row items-center justify-between&quot;&gt;
                        &lt;DialogTitle&gt;Prescription Viewer&lt;/DialogTitle&gt;
                        &lt;DialogDescription&gt;Full-size view of the prescription.&lt;/DialogDescription&gt;
                        &lt;DialogClose className=&quot;relative right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground&quot;&gt;
                            &lt;X className=&quot;h-6 w-6&quot; /&gt;
                            &lt;span className=&quot;sr-only&quot;&gt;Close&lt;/span&gt;
                        &lt;/DialogClose&gt;
                     &lt;/DialogHeader&gt;
                    &lt;div className=&quot;flex-1 relative bg-muted/20&quot;&gt;
                        {zoomedImage &amp;&amp; (
                            &lt;Image
                                src={zoomedImage}
                                alt=&quot;Zoomed Prescription&quot;
                                fill={true}
                                style={{objectFit: &quot;contain&quot;}}
                                className=&quot;p-4&quot;
                            /&gt;
                        )}
                    &lt;/div&gt;
                &lt;/DialogContent&gt;
            &lt;/Dialog&gt;

            &lt;Dialog open={isFormOpen} onOpenChange={setIsFormOpen}&gt;
                &lt;DialogContent&gt;
                    &lt;DialogHeader&gt;
                        &lt;DialogTitle&gt;{editingFollowUp?.pIndex !== undefined ? 'Edit Follow-up' : 'Add New Follow-up'}&lt;/DialogTitle&gt;
                        &lt;DialogDescription&gt;
                            {editingFollowUp?.pIndex !== undefined ? 'Update the details for this entry.' : `Add a new follow-up for &quot;${appointments[editingFollowUp?.apptIndex || 0]?.problem}&quot;.`}
                        &lt;/DialogDescription&gt;
                    &lt;/DialogHeader&gt;
                    {editingFollowUp &amp;&amp; (
                        &lt;FollowUpForm
                            appointmentId={editingFollowUp.apptIndex}
                            existingFollowUp={editingFollowUp.pIndex !== undefined ? appointments[editingFollowUp.apptIndex].prescriptions[editingFollowUp.pIndex] : undefined}
                            onSave={handleSaveFollowUp}
                            onCancel={() =&gt; setIsFormOpen(false)}
                        /&gt;
                    )}
                &lt;/DialogContent&gt;
            &lt;/Dialog&gt;

        &lt;/div&gt;
    );
}

    