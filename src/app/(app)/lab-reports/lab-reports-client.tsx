
'use client';

import React, { useState, useTransition, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, Eye, Upload, Search, MapPin, TestTube, Sparkles, Bone, Scan, FileText, Loader2, User, Calendar, Stethoscope as StethoscopeIcon, FlaskConical, ChevronDown, ChevronUp, Star, Phone, Globe, Share2, Map, Clock, Filter, X, Image as ImageIcon, File as FileIcon, View, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { analyzeReport, ReportAnalysisInput, ReportAnalysisOutput } from '@/ai/flows/ai-report-analysis';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';


const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "Completed":
            return "bg-green-100 text-green-800 border-green-200";
        case "Processing":
            return "bg-blue-100 text-blue-800 border-blue-200";
        case "Pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
            return "";
    }
}

interface LabReportsClientProps {
    allReports: any[];
    diagnosticLabs: any[];
    dummyReportData: Record<string, { content: string, image?: string, dataAiHint?: string }>;
}

export function LabReportsClient({
    allReports: initialAllReports,
    diagnosticLabs,
    dummyReportData
}: LabReportsClientProps) {
    const [allReports, setAllReports] = useState(initialAllReports);
    
    const [isAnalyzeOpen, setAnalyzeOpen] = useState(false);
    const [isViewOpen, setViewOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<any | null>(null);
    const [analysisResult, setAnalysisResult] = useState<ReportAnalysisOutput | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [reportContent, setReportContent] = useState('');
    const [reportImage, setReportImage] = useState<string | undefined>(undefined);
    const [reportImageHint, setReportImageHint] = useState<string | undefined>(undefined);
    const [prescriptionFileName, setPrescriptionFileName] = useState('');
    const { toast } = useToast();
    
    // Filters for diagnostics
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [openLab, setOpenLab] = useState<string | null>(null);

    const testCategories = useMemo(() => {
        const categories = new Set<string>();
        diagnosticLabs.forEach(lab => {
            lab.tests.forEach((test: any) => {
                categories.add(test.category);
            });
        });
        return ['All', ...Array.from(categories)];
    }, [diagnosticLabs]);

    const handleAction = (action: Function) => {
        setIsSubmitting(true);
        setTimeout(() => {
            action();
            setIsSubmitting(false);
        }, 1000);
    };

    const handlePrescriptionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPrescriptionFileName(event.target.files[0].name);
        } else {
            setPrescriptionFileName('');
        }
    };

    const handleView = (report: any) => {
        setSelectedReport(report);
        setViewOpen(true);
    };

    const handleAnalyze = (reports: any[]) => {
        if (!reports || reports.length === 0) return;
        
        const combinedContent = reports.map(report => {
            const reportKey = `${report.testName}-${report.date}`;
            const data = dummyReportData[reportKey] || { content: `Content for ${report.testName} not found.` };
            return `--- Report: ${report.testName} ---\n${data.content}`;
        }).join('\n\n');

        setSelectedReport({ testName: `Analysis for ${format(parseISO(reports[0].date), 'dd-MMM-yyyy')}`, date: reports[0].date });
        setReportContent(combinedContent);
        setReportImage(dummyReportData[`${reports[0].testName}-${reports[0].date}`]?.image);
        setAnalysisResult(null);
        setAnalyzeOpen(true);
    };
    
    const fileToDataUri = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleRunAnalysis = () => {
        startTransition(async () => {
            let input: ReportAnalysisInput = {};
            if (reportImage) {
                // This is a simplified example. In a real app you'd get the image file.
                // For now, we fetch and convert the picsum URL to a data URI.
                try {
                    const response = await fetch(reportImage);
                    const blob = await response.blob();
                    const dataUrl = await new Promise<string>(resolve => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(blob);
                    });
                    input.photoDataUri = dataUrl;
                } catch (e) {
                    console.error("Error fetching image for analysis:", e);
                    input.reportContent = reportContent;
                }

            } else {
                 input.reportContent = reportContent;
            }

            const result = await analyzeReport(input);
            setAnalysisResult(result);
        });
    };

    const filteredLabs = useMemo(() => {
        return diagnosticLabs
            .filter(lab => 
                lab.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(lab => {
                const filteredTests = selectedCategory === 'All' 
                    ? lab.tests 
                    : lab.tests.filter((test: any) => test.category === selectedCategory);
                
                return { ...lab, tests: filteredTests };
            })
            .filter(lab => lab.tests.length > 0);
    }, [diagnosticLabs, searchTerm, selectedCategory]);
    
    const groupReportsByDate = (reports: any[]) => {
        const grouped = reports.reduce((acc, report) => {
            const date = report.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(report);
            return acc;
        }, {} as Record<string, any[]>);

        return Object.entries(grouped).sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime());
    };

    const groupedAllReports = groupReportsByDate(allReports);
    
    const handleUploadReport = (formData: any) => {
        const newReport = {
            ...formData,
            id: `rep${Date.now()}`, // simple unique id
            status: 'Completed',
        };
    
        setAllReports(prev => {
            const newReports = [...prev, newReport];
            return newReports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });

        toast({
            title: "Report Uploaded",
            description: `${formData.testName} has been added to your reports.`,
        });
    };
    
    const handleDeleteReport = (reportId: string) => {
        setAllReports(prev => prev.filter(report => report.id !== reportId));
        toast({
            variant: 'destructive',
            title: "Report Deleted",
            description: "The report has been removed from your history.",
        });
    }
    
    function UploadReportDialog({ onUpload, initialDate }: { onUpload: (data: any) => void; initialDate?: string; }) {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [testName, setTestName] = useState('');
        const [doctor, setDoctor] = useState('');
        const [date, setDate] = useState<Date | undefined>(initialDate ? parseISO(initialDate) : new Date());
        const [fileName, setFileName] = useState('');

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!testName || !doctor || !date || !fileName) {
                toast({ variant: 'destructive', title: 'Missing fields', description: 'Please fill out all fields to upload.' });
                return;
            }
            const formData = {
                testName,
                doctor,
                date: format(date, 'yyyy-MM-dd'),
            };
            onUpload(formData);
            setIsDialogOpen(false);
            // Reset form
            setTestName('');
            setDoctor('');
            setDate(initialDate ? parseISO(initialDate) : new Date());
            setFileName('');
        };
        
        return (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                     <Button variant={initialDate ? 'ghost' : 'outline'} size={initialDate ? 'sm' : 'default'} className={cn(initialDate && "text-xs")}>
                        <Upload className="mr-2 h-4 w-4" /> {initialDate ? 'Upload' : 'Upload New Report'}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload a New Report</DialogTitle>
                        <DialogDescription>Manually add a report from an image or PDF file.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="testName">Test Name</Label>
                            <Input id="testName" value={testName} onChange={e => setTestName(e.target.value)} placeholder="e.g., Complete Blood Count" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="doctor">Ordered By (Doctor)</Label>
                            <Input id="doctor" value={doctor} onChange={e => setDoctor(e.target.value)} placeholder="e.g., Dr. Rajesh Kumar" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Report Date</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    captionLayout="dropdown-buttons"
                                    fromYear={new Date().getFullYear() - 10}
                                    toYear={new Date().getFullYear()}
                                    initialFocus
                                    disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Report File</Label>
                            <div className="flex items-center gap-2">
                                <Button asChild variant="outline" className="flex-1">
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <Upload className="mr-2 h-4 w-4" />
                                        {fileName || 'Choose File'}
                                    </label>
                                </Button>
                                <input id="file-upload" type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} accept="image/*,.pdf" />
                            </div>
                        </div>
                        <DialogFooter className='pt-4'>
                            <Button type="submit" style={{ backgroundColor: 'hsl(var(--nav-diagnostics))' }}>
                                <Upload className="mr-2 h-4 w-4" /> Save Report
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
    
    const ReportsList = ({ groupedReports, onAnalyze, onView, onUpload, onDelete }: { groupedReports: [string, any[]][], onAnalyze: (reports: any[]) => void, onView: (report: any) => void, onUpload: (data: any) => void, onDelete: (id: string) => void }) => {
        
        const getDoctorsForDate = (reports: any[]) => {
            const doctors = new Set(reports.map(r => r.doctor));
            return Array.from(doctors).join(', ');
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-end">
                    <UploadReportDialog onUpload={onUpload} />
                </div>
                {groupedReports.length > 0 ? groupedReports.map(([date, reports]) => (
                    <Collapsible key={date} className="border rounded-lg bg-background">
                        <CollapsibleTrigger className="w-full p-4 hover:bg-muted/50 transition-colors">
                             <div className="flex justify-between items-center gap-2 flex-nowrap">
                                <div className='flex-1 text-left min-w-0'>
                                    <p className="text-base font-bold truncate">{format(parseISO(date), 'dd MMM, yyyy')}</p>
                                    <p className="text-sm text-muted-foreground truncate">{getDoctorsForDate(reports)}</p>
                                </div>
                                <div className='flex items-center gap-1 border rounded-lg p-1 flex-shrink-0'>
                                     <Button variant="ghost" size="sm" className="text-xs" onClick={(e) => { e.stopPropagation(); onAnalyze(reports)}}>
                                        <Sparkles className="mr-2 h-3 w-3" /> AI
                                    </Button>
                                    <UploadReportDialog onUpload={onUpload} initialDate={date} />
                                </div>
                                <ChevronDown className="h-5 w-5 transition-transform duration-200 [&[data-state=open]]:rotate-180 flex-shrink-0" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-t space-y-2 bg-muted/20">
                            <div className='divide-y'>
                                {reports.map((report) => (
                                    <div key={report.id} className="py-3 first:pt-0 last:pb-0">
                                        <div className="flex justify-between items-center gap-2">
                                            <p className="font-semibold truncate flex-1">{report.testName}</p>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <Badge variant="outline" className={cn("hidden sm:inline-flex", getStatusBadgeClass(report.status))}>
                                                    {report.status}
                                                </Badge>
                                                 {report.status === "Completed" && (
                                                     <div className="flex">
                                                        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => onView(report)}>
                                                            <View className="h-5 w-5" />
                                                        </Button>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit Report</DialogTitle>
                                                                </DialogHeader>
                                                                {/* Form would go here */}
                                                                <p>Edit form for {report.testName}</p>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                 <Button variant="ghost" size="icon" className="h-10 w-10">
                                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>This will permanently delete the report for "{report.testName}".</AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => onDelete(report.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={cn("sm:hidden mt-2", getStatusBadgeClass(report.status))}>
                                            {report.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )) : (
                    <div className="text-center p-8 text-muted-foreground">No reports found.</div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                 <div className="flex-1">
                    <h1 className="text-2xl font-bold" style={{color: 'hsl(var(--nav-diagnostics))'}}>Diagnostics & Reports</h1>
                 </div>
            </div>
            
            <Tabs defaultValue="my-reports" className="w-full">
                <div className="p-1 border bg-muted rounded-lg">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="find-lab">Find a Lab</TabsTrigger>
                        <TabsTrigger value="my-reports">My Reports</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="find-lab" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Find a Diagnostic Lab</CardTitle>
                            <CardDescription>Search for labs and the tests they offer.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input 
                                        placeholder="Search by lab name..." 
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Select onValueChange={setSelectedCategory} defaultValue="All">
                                    <SelectTrigger>
                                        <div className="flex items-center gap-2">
                                            <TestTube className="h-4 w-4" />
                                            <SelectValue placeholder="Filter by Test Type" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {testCategories.map(category => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <SelectValue placeholder="Location" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="guntur">Guntur</SelectItem>
                                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                                        <SelectItem value="vijayawada">Vijayawada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-4">
                                {filteredLabs.map(lab => (
                                    <Collapsible 
                                        key={lab.name} 
                                        open={openLab === lab.name}
                                        onOpenChange={() => setOpenLab(openLab === lab.name ? null : lab.name)}
                                        className="border rounded-lg"
                                    >
                                        <CollapsibleTrigger asChild>
                                            <div className="w-full p-4 flex justify-between items-center hover:bg-muted/50 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12 border">
                                                        <AvatarImage src={lab.logo} data-ai-hint={lab.dataAiHint} />
                                                        <AvatarFallback>{lab.name.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-lg text-left">{lab.name}</p>
                                                            {lab.recommended && (
                                                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                                                    <Star className="h-3 w-3 mr-1" />
                                                                    Recommended
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground text-left flex items-center gap-1"><MapPin className="h-3 w-3" /> {lab.location}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                                    {openLab === lab.name ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                                    <span className="sr-only">Toggle</span>
                                                </Button>
                                            </div>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="p-4 border-t">
                                            <div className="space-y-4 mb-6">
                                                <h4 className="font-semibold text-base">Lab Information</h4>
                                                <div className="space-y-2 text-sm text-muted-foreground">
                                                    <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 flex-shrink-0"/> {lab.address}</p>
                                                    <p className="flex items-center gap-2"><Phone className="h-4 w-4"/> {lab.phone}</p>
                                                    <p className="flex items-center gap-2"><Clock className="h-4 w-4"/> {lab.hours}</p>
                                                    <a href={lab.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline" style={{color: 'hsl(var(--nav-diagnostics))'}}>
                                                        <Globe className="h-4 w-4"/> Visit Website
                                                    </a>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleAction(() => {})}>
                                                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Share2 className="mr-2 h-4 w-4"/>} Share Directions
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => handleAction(() => {})}>
                                                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Map className="mr-2 h-4 w-4"/>} View Location
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="p-4 border rounded-lg bg-muted/30 mb-6">
                                                <h4 className="font-semibold text-base">Have a Prescription?</h4>
                                                <p className="text-sm text-muted-foreground mb-4">Upload your prescription to get exact prices from the lab reception.</p>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="w-full sm:w-auto bg-background">
                                                            <Upload className="mr-2 h-4 w-4" /> Upload Test Prescription
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Upload for {lab.name}</DialogTitle>
                                                            <DialogDescription>
                                                                Upload your test prescription to get an accurate price quote.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="prescription-file" className="text-right">File</Label>
                                                                <div className="col-span-3">
                                                                    <Button asChild variant="outline">
                                                                        <label htmlFor="prescription-upload" className="cursor-pointer w-full">
                                                                            <Upload className="mr-2 h-4 w-4" />
                                                                            {prescriptionFileName || 'Choose File'}
                                                                        </label>
                                                                    </Button>
                                                                    <input id="prescription-upload" type="file" className="hidden" onChange={handlePrescriptionFileChange} accept="image/*,.pdf" />
                                                                    {prescriptionFileName && <p className="text-xs text-muted-foreground mt-2">{prescriptionFileName}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-diagnostics))'}} onClick={() => handleAction(() => {})}>
                                                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 'Send to Lab'}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-semibold text-base mb-4">Available Tests</h4>
                                                {lab.tests.map((test: any) => (
                                                    <div key={test.name} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center border-t first:border-t-0">
                                                        <div className="mb-4 sm:mb-0">
                                                            <p className="font-semibold">{test.name}</p>
                                                            <Badge variant="outline" className="mt-1">{test.category}</Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <p className="text-lg font-bold" style={{color: 'hsl(var(--nav-diagnostics))'}}>₹{test.price}</p>
                                                            <Button style={{backgroundColor: 'hsl(var(--nav-diagnostics))'}} onClick={() => handleAction(() => {})}>
                                                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...</> : 'Book Now'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="my-reports" className="mt-6">
                    <ReportsList 
                        groupedReports={groupedAllReports}
                        onAnalyze={handleAnalyze}
                        onView={handleView}
                        onUpload={handleUploadReport}
                        onDelete={handleDeleteReport}
                    />
                </TabsContent>
            </Tabs>
            
            <Dialog open={isViewOpen} onOpenChange={setViewOpen}>
                <DialogContent className="sm:max-w-2xl">
                     <DialogHeader>
                        <DialogTitle>View Report: {selectedReport?.testName}</DialogTitle>
                         <DialogDescription>
                            From {selectedReport?.labName || 'N/A'} on {selectedReport ? format(new Date(selectedReport.date), 'dd-MMM-yyyy') : ''}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                        {dummyReportData[`${selectedReport?.testName}-${selectedReport?.date}`]?.image ? (
                             <div className="bg-muted/30 p-2 rounded-lg">
                                 <Image
                                    src={dummyReportData[`${selectedReport.testName}-${selectedReport.date}`].image!}
                                    alt={`Report for ${selectedReport?.testName}`}
                                    width={800}
                                    height={1100}
                                    data-ai-hint={dummyReportData[`${selectedReport.testName}-${selectedReport.date}`].dataAiHint || ''}
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
                        <Button variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:text-primary hover:bg-primary/10" onClick={() => { setViewOpen(false); handleAnalyze([selectedReport]); }}>
                            <Sparkles className="mr-2 h-4 w-4" /> AI Analysis
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full sm:w-auto"><FileDown className="mr-2 h-4 w-4" />Download</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xs">
                                <DialogHeader>
                                    <DialogTitle>Download Report</DialogTitle>
                                    <DialogDescription>Choose a format to download.</DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-2">
                                    <Button style={{ backgroundColor: 'hsl(var(--nav-diagnostics))' }}><FileIcon className="mr-2 h-4 w-4" /> PDF</Button>
                                    <Button variant="secondary"><ImageIcon className="mr-2 h-4 w-4" /> Image</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAnalyzeOpen} onOpenChange={setAnalyzeOpen}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-primary" style={{color: 'hsl(var(--nav-diagnostics))'}}><Sparkles /> AI Analysis</DialogTitle>
                        <DialogDescription>Analyzing: {selectedReport?.testName}</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Original Report Content</h3>
                            {reportImage ? (
                                <div className="p-2 border rounded-lg bg-muted/30">
                                    <Image 
                                        src={reportImage} 
                                        alt="Report to be analyzed"
                                        width={800}
                                        height={1100}
                                        className="rounded"
                                    />
                                </div>
                            ) : (
                                <Textarea 
                                    className="h-96 font-mono text-xs" 
                                    value={reportContent} 
                                    onChange={(e) => setReportContent(e.target.value)}
                                />
                            )}
                            <Button onClick={handleRunAnalysis} disabled={isPending || (!reportContent && !reportImage)} className="w-full" style={{backgroundColor: 'hsl(var(--nav-diagnostics))'}}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : "Run AI Analysis"}
                            </Button>
                        </div>
                        <div className="space-y-4 relative">
                             <h3 className="font-semibold">AI Summary &amp; Findings</h3>
                            {isPending && (
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary" style={{color: 'hsl(var(--nav-diagnostics))'}}/>
                                    <p className="mt-4 text-muted-foreground">The AI is analyzing your report...</p>
                                </div>
                            )}
                            {analysisResult ? (
                                <div className="space-y-4">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg">Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{analysisResult.summary}</p>
                                        </CardContent>
                                    </Card>
                                    {analysisResult.abnormalities.length > 0 ? (
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">Abnormal Findings</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {analysisResult.abnormalities.map((item, index) => (
                                                    <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
                                                        <div className="flex justify-between font-bold">
                                                            <p>{item.item}</p>
                                                            <p>{item.result}</p>
                                                        </div>
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
        </div>
    );
}
