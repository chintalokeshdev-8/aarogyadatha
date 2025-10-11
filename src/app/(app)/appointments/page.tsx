
'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, MapPin, HeartPulse, Bone, Brain, Stethoscope as StethoscopeIcon, Baby, Leaf, Phone, Globe, Share2, Copy, Loader2, Star, Calendar, History, ChevronDown, FileText, Pill, CheckCircle, XCircle, Filter, X, PartyPopper, MessageSquare, Upload, Printer, Download, View, XCircleIcon, ImageIcon, File as FileIcon, Sparkles, Map as MapIcon, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { previousAppointments as initialAppointmentsData } from '@/lib/appointments-data';
import { dummyReportData } from '@/lib/dummy-report-data';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FlowerFall } from '@/components/ui/flower_fall';
import { analyzeReport, ReportAnalysisOutput } from '@/ai/flows/ai-report-analysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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
    },
    {
        name: "Dr. Posani Srinivasarao",
        specialty: "Gastroenterologist",
        experience: "20 years",
        hospital: "Sravani Hospital, Guntur",
        surgeries: "1 lakh+ Endoscopies & other surgeries",
        mainDealing: "Gastroenterology, Liver diseases. Leads a dedicated team of doctors.",
        avatar: "https://picsum.photos/seed/doc16/100/100",
        dataAiHint: "male doctor senior",
        recommended: true,
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

export default function AppointmentsPage() {
    const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [bookingDoctor, setBookingDoctor] = useState<string | null>(null);
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

    const [appointments, setAppointments] = useState(() => 
        initialAppointmentsData.map(appt => ({
            ...appt,
            prescriptions: appt.prescriptions.map(p => ({
                ...p,
                prescriptionImages: Array.isArray(p.prescriptionImages) ? p.prescriptionImages : (p.prescriptionImage ? [{ url: p.prescriptionImage, dataAiHint: p.dataAiHint || 'medical prescription' }] : [])
            }))
        }))
    );


    const handleFilter = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = doctors.filter(doctor => {
            const nameMatch = doctor.name.toLowerCase().includes(lowercasedQuery);
            const hospitalMatch = doctor.hospital.toLowerCase().includes(lowercasedQuery);
            const searchMatch = nameMatch || hospitalMatch;

            const departmentMatch = selectedDepartment === 'all' || doctor.specialty === selectedDepartment;
            
            const hospitalFilterMatch = selectedHospital === 'All Hospitals' || doctor.hospital === selectedHospital;

            const hospitalDetails = hospitalsData[doctor.hospital];
            const locationMatch = selectedLocation === 'all' || (hospitalDetails && hospitalDetails.location === selectedLocation);

            return searchMatch && departmentMatch && hospitalFilterMatch && locationMatch;
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
        setBookingDoctor(doctor.name);
        setTimeout(() => {
            toast({
                title: "Appointment Confirmed!",
                description: `Your appointment with ${doctor.name} is booked. Check the OP Status page for live updates.`,
            });
            router.push('/opd-queue');
            setBookingDoctor(null);
        }, 1500);
    };

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

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-appointments))'}}>Find &amp; Manage Appointments</h1>
                <p className="text-muted-foreground mt-2">Find the right doctor for your needs and review your history.</p>
            </div>

            <Tabs defaultValue="find-doctor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-lg border bg-transparent p-0">
                    <TabsTrigger value="find-doctor" className="rounded-l-md rounded-r-none border-r data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">Find a Doctor</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-r-md rounded-l-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">Appointments History</TabsTrigger>
                </TabsList>
                <TabsContent value="find-doctor" className="mt-6">
                    <div className="space-y-6">
                        <Card className="p-4 shadow-sm">
                            <CardHeader className="p-2 pt-0">
                                <CardTitle>Find a Doctor</CardTitle>
                            </CardHeader>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="relative md:col-span-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input 
                                        placeholder="Doctor or hospital..." 
                                        className="pl-10" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {uniqueDepartments.map(dep => (
                                            <SelectItem key={dep.value} value={dep.value}>
                                                <div className="flex items-center gap-2">
                                                    <dep.icon className="h-4 w-4" />
                                                    {dep.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Hospital" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hospitals.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                 <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                     <SelectTrigger>
                                        <div className="flex items-center gap-2">
                                           <MapPin className="h-4 w-4" />
                                           <SelectValue placeholder="Location" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Locations</SelectItem>
                                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                                         <SelectItem value="Guntur">Guntur</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="md:col-start-5" style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={handleFilter}>Go</Button>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredDoctors.map((doctor, index) => {
                                const isBooking = bookingDoctor === doctor.name;
                                return (
                                    <Card key={index} className="transition-shadow hover:shadow-md">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                <Avatar className="h-28 w-28 border-4" style={{borderColor: 'hsl(var(--nav-appointments))'}}>
                                                    <AvatarImage src={doctor.avatar} data-ai-hint={doctor.dataAiHint} />
                                                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-2xl font-bold">{doctor.name}</h3>
                                                        {(doctor as any).recommended && (
                                                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                                                <Star className="h-3 w-3 mr-1" />
                                                                Recommended
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p style={{color: 'hsl(var(--nav-appointments))'}} className="font-semibold">{doctor.specialty}</p>
                                                    <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                                                    <p className="text-sm text-muted-foreground font-medium mt-1">{doctor.hospital}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 space-y-3 text-sm">
                                                <p><strong className="font-semibold">Successful Surgeries:</strong> {doctor.surgeries}</p>
                                                <p><strong className="font-semibold">Main Focus:</strong> {doctor.mainDealing}</p>
                                            </div>
                                             <div className="mt-6 flex justify-end gap-2">
                                                <Button variant="outline" onClick={() => handleViewProfile(doctor)}>View Profile</Button>
                                                <Button style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={() => handleBookAppointment(doctor)} disabled={isBooking}>
                                                    {isBooking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                    {isBooking ? 'Booking...' : 'Book Appointment'}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="history" className="mt-6">
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
                        <CardContent>
                             <div className="grid grid-cols-1 gap-6">
                                {filteredAppointments.length > 0 ? filteredAppointments.map((appt, index) => (
                                    <Collapsible key={index} className="border rounded-lg bg-background">
                                        <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors flex items-start justify-between text-left">
                                            <div className="flex-1 flex items-start gap-3">
                                                <span className="text-2xl font-bold text-blue-900 dark:text-blue-400">{index + 1}.</span>
                                                <div>
                                                    <p className="text-xl font-bold">{appt.problem}</p>
                                                    <div className="text-base font-semibold text-muted-foreground mt-1">{appt.specialty}</div>
                                                    <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2"><Calendar className="h-4 w-4"/> First seen: {format(new Date(appt.date), 'dd-MMM-yyyy')} by {appt.initialDoctor}</div>
                                                </div>
                                            </div>
                                            <ChevronDown className="h-6 w-6 transition-transform duration-200 [&[data-state=open]]:rotate-180 flex-shrink-0 mt-1" />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="p-4 border-t space-y-4 bg-muted/20">
                                            <h4 className="font-bold text-lg flex items-center gap-2"><FileText className="h-5 w-5" /> Prescription &amp; Follow-up History</h4>
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
                                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                                                                        <div className="font-semibold text-sm flex items-center gap-2 flex-wrap">
                                                                            <span className="text-lg font-bold text-blue-900 dark:text-blue-400">{index + 1}.{pIndex + 1}</span>
                                                                            <span>{item.title}</span>
                                                                            <span className="hidden sm:inline mx-1 text-muted-foreground">•</span>
                                                                            <span className="font-bold" style={{color: 'hsl(var(--nav-appointments))'}}>{item.doctor}</span>
                                                                            <span className="hidden sm:inline mx-1 text-muted-foreground">•</span>
                                                                            <span>{item.date}</span>
                                                                        </div>
                                                                        <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'} className={cn('w-fit mt-2 sm:mt-0', item.status === 'Active' ? 'bg-green-100 text-green-800' : '', item.status === 'Improved' || item.status === 'Resolved' ? 'bg-blue-100 text-blue-800' : '', item.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' : '')}>{item.status}</Badge>
                                                                    </div>
                                                                    
                                                                    <div className="flex items-center gap-2">
                                                                         <Dialog>
                                                                            <DialogTrigger asChild>
                                                                                <Button size="sm" style={{backgroundColor: 'hsl(var(--nav-appointments))'}}>
                                                                                    <View className="mr-2 h-4 w-4" /> View Details
                                                                                </Button>
                                                                            </DialogTrigger>
                                                                            <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col p-0">
                                                                                <DialogHeader className="p-6 pb-4">
                                                                                    <DialogTitle>{item.title}</DialogTitle>
                                                                                    <DialogDescription>
                                                                                        Follow-up from {item.date} by <span className="font-bold" style={{color: 'hsl(var(--nav-appointments))'}}>{item.doctor}</span>.
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
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            

            <Dialog open={isProfileOpen} onOpenChange={setProfileOpen}>
                <DialogContent className="sm:max-w-2xl">
                    {selectedDoctor && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-4">
                                     <Avatar className="h-20 w-20 border-4" style={{borderColor: 'hsl(var(--nav-appointments))'}}>
                                        <AvatarImage src={selectedDoctor.avatar} data-ai-hint={selectedDoctor.dataAiHint} />
                                        <AvatarFallback>{selectedDoctor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <DialogTitle className="text-2xl">{selectedDoctor.name}</DialogTitle>
                                        <DialogDescription className="text-base" style={{color: 'hsl(var(--nav-appointments))'}}>{selectedDoctor.specialty}</DialogDescription>
                                        <p className="text-sm text-muted-foreground">{selectedDoctor.experience} of experience</p>
                                    </div>
                                </div>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <h4 className="font-semibold text-lg mb-2">{selectedDoctor.hospital}</h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 flex-shrink-0"/> {hospitalsData[selectedDoctor.hospital as keyof typeof hospitalsData]?.address}</p>
                                        <p className="flex items-center gap-2"><Phone className="h-4 w-4"/> {hospitalsData[selectedDoctor.hospital as keyof typeof hospitalsData]?.phone}</p>
                                        <a href={hospitalsData[selectedDoctor.hospital as keyof typeof hospitalsData]?.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                                            <Globe className="h-4 w-4"/> Visit Website
                                        </a>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => handleShare(selectedDoctor)} disabled={isSharing}>
                                        {isSharing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Copy className="mr-2 h-4 w-4" />}
                                        {isSharing ? 'Copying...' : 'Copy Details'}
                                    </Button>
                                     <Button style={{backgroundColor: 'hsl(var(--nav-appointments))'}} onClick={() => handleBookAppointment(selectedDoctor)} disabled={bookingDoctor === selectedDoctor.name}>
                                        {bookingDoctor === selectedDoctor.name ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        {bookingDoctor === selectedDoctor.name ? 'Booking...' : 'Book Appointment'}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

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

    