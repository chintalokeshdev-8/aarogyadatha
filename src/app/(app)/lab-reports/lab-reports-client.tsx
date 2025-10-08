
'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, Eye, Upload, Search, MapPin, TestTube, Sparkles, Bone, Scan, FileText, Loader2, User, Calendar, Stethoscope as StethoscopeIcon, FlaskConical, ChevronDown, ChevronUp, Star, Phone, Globe, Share2, Map, Clock, Filter, X, Image as ImageIcon, File as FileIcon, View } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { analyzeReport, ReportAnalysisInput, ReportAnalysisOutput } from '@/ai/flows/ai-report-analysis';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';


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

const ReportTable = ({ reports, onAnalyze, onView }: { reports: any[], onAnalyze: (report: any) => void, onView: (report: any) => void }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Test/Prescription Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Ordered By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {reports.length > 0 ? reports.map((report, index) => (
                <TableRow key={index} className='border-b'>
                    <TableCell className="font-medium">{report.testName}</TableCell>
                    <TableCell>{format(new Date(report.date), 'dd-MMM-yyyy')}</TableCell>
                    <TableCell>{report.doctor}</TableCell>
                    <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(report.status)}>
                            {report.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        {report.status === "Completed" ? (
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm" onClick={() => onView(report)}>
                                    <View className="mr-2 h-4 w-4" /> View
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                         <Button variant="outline" size="sm">
                                            <FileDown className="mr-2 h-4 w-4" /> Download
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className='sm:max-w-md'>
                                        <DialogHeader>
                                            <DialogTitle>Download Report</DialogTitle>
                                            <DialogDescription>Choose a format to download your report.</DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-2">
                                            <Button style={{backgroundColor: 'hsl(var(--nav-diagnostics))'}}><FileIcon className="mr-2 h-4 w-4" /> Download as PDF</Button>
                                            <Button variant="secondary"><ImageIcon className="mr-2 h-4 w-4" /> Download as Image</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:text-primary hover:bg-primary/10" onClick={() => onAnalyze(report)}>
                                    <Sparkles className="mr-2 h-4 w-4" /> AI Analysis
                                </Button>
                            </div>
                        ) : (
                            <span className="text-xs text-muted-foreground">Not Available</span>
                        )}
                    </TableCell>
                </TableRow>
            )) : (
                 <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No reports found.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
);

const ReportViewer = ({ content }: { content: string }) => {
    const lines = content.trim().split('\n');
    const patientInfo: { [key: string]: string } = {};
    const testResults: any[] = [];
    const otherSections: {title: string, content: string[]}[] = [];
    let currentSection: {title: string, content: string[]} | null = null;
    let isParsingResults = false;
    let isParsingOtherSections = false;

    lines.forEach(line => {
        if (line.trim() === '') {
            if(!isParsingOtherSections && Object.keys(patientInfo).length > 0){
                isParsingResults = true;
            }
            return;
        }

        const sectionTitleMatch = line.match(/^([A-Z\s]+):$/);
         if (sectionTitleMatch && !line.includes(': ')) {
             isParsingResults = false;
             isParsingOtherSections = true;
            if(currentSection){
                otherSections.push(currentSection);
            }
            currentSection = { title: sectionTitleMatch[1].trim(), content: [] };
        } else if (currentSection && isParsingOtherSections) {
             currentSection.content.push(line.trim());
        } else if (!isParsingResults && !isParsingOtherSections) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                patientInfo[key.trim()] = valueParts.join(':').trim();
            }
        } else if(isParsingResults) {
            const resultMatch = line.match(/(.*?):\s*(.*?)\s*\((.*?)\)(.*)/);
            if (resultMatch) {
                const [, test, value, normalRange, remark] = resultMatch;
                const isAbnormal = remark && (remark.toLowerCase().includes('high') || remark.toLowerCase().includes('low'));
                testResults.push({
                    test: test.trim(),
                    value: value.trim(),
                    normalRange: `(${normalRange.trim()})`,
                    remark: remark.trim(),
                    isAbnormal
                });
            } else {
                 const simpleResultMatch = line.match(/(.*?):\s*(.*)/);
                 if(simpleResultMatch){
                    const [, test, value] = simpleResultMatch;
                    testResults.push({ test: test.trim(), value: value.trim(), normalRange: '', remark: '', isAbnormal: false });
                 }
            }
        }
    });

    if(currentSection) {
        otherSections.push(currentSection);
    }

    return (
        <div className="font-sans space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FlaskConical className="h-5 w-5 text-primary" style={{color: 'hsl(var(--nav-diagnostics))'}} /> {patientInfo['Test'] || 'Report Details'}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <strong>Patient:</strong> {patientInfo['Patient Name']}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <strong>Date:</strong> {patientInfo['Date'] ? format(new Date(patientInfo['Date']), 'dd-MMM-yyyy') : 'N/A'}
                    </div>
                    {patientInfo['Doctor'] && (
                         <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                            <StethoscopeIcon className="h-4 w-4 text-muted-foreground" />
                            <strong>Doctor:</strong> {patientInfo['Doctor']}
                        </div>
                    )}
                </CardContent>
            </Card>

            {testResults.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Test</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Normal Range</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testResults.map((result, index) => (
                            <TableRow key={index} className={cn('border-b', result.isAbnormal ? 'bg-red-50 dark:bg-red-900/20' : '')}>
                                <TableCell className="font-semibold">{result.test}</TableCell>
                                <TableCell className={`font-bold ${result.isAbnormal ? 'text-red-600' : ''}`}>
                                    {result.value} {result.remark && <span className="text-xs font-normal"> - {result.remark.replace('-','').trim()}</span>}
                                </TableCell>
                                <TableCell className="text-muted-foreground">{result.normalRange}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            
            {otherSections.map((section, index) => (
                <div key={index}>
                    <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                    <div className="text-muted-foreground space-y-1 text-sm">
                        {section.content.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                </div>
            ))}
        </div>
    );
};

interface LabReportsClientProps {
    labReports: any[];
    imagingReports: any[];
    diagnosticLabs: any[];
    dummyReportData: Record<string, { content: string, image?: string, dataAiHint?: string }>;
}

export function LabReportsClient({
    labReports,
    imagingReports,
    diagnosticLabs,
    dummyReportData
}: LabReportsClientProps) {
    const [isAnalyzeOpen, setAnalyzeOpen] = useState(false);
    const [isViewOpen, setViewOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<any | null>(null);
    const [analysisResult, setAnalysisResult] = useState<ReportAnalysisOutput | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [reportContent, setReportContent] = useState('');
    const [reportImage, setReportImage] = useState<string | undefined>(undefined);
    const [reportImageHint, setReportImageHint] = useState<string | undefined>(undefined);
    const [fileName, setFileName] = useState('');
    const [prescriptionFileName, setPrescriptionFileName] = useState('');
    
    // Filters for diagnostics
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [openLab, setOpenLab] = useState<string | null>(diagnosticLabs.length > 0 ? diagnosticLabs[0].name : null);

    const testCategories = useMemo(() => {
        const categories = new Set<string>();
        diagnosticLabs.forEach(lab => {
            lab.tests.forEach((test: any) => {
                categories.add(test.category);
            });
        });
        return ['All', ...Array.from(categories)];
    }, [diagnosticLabs]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName('');
        }
    };
    
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
        const reportKey = `${report.testName}-${report.date}`;
        const data = dummyReportData[reportKey] || { content: "Report details not found." };
        
        setSelectedReport(report);
        setReportContent(data.content);
        setReportImage(data.image);
        setReportImageHint(data.dataAiHint);
        setViewOpen(true);
    };

    const handleAnalyze = (report: any) => {
        const reportKey = `${report.testName}-${report.date}`;
        const data = dummyReportData[reportKey] || { content: "No content to analyze." };

        setSelectedReport(report);
        setReportContent(data.content);
        setAnalysisResult(null);
        setAnalyzeOpen(true);
    };

    const handleRunAnalysis = () => {
        if (!reportContent) return;

        startTransition(async () => {
            const result = await analyzeReport({ reportContent });
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

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-diagnostics))'}}>Diagnostics &amp; Reports</h1>
                <p className="text-muted-foreground">Find labs, book tests, and manage your reports.</p>
            </div>
            
            <Tabs defaultValue="find-lab" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="find-lab">Find a Lab</TabsTrigger>
                    <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
                    <TabsTrigger value="imaging-reports">Imaging Reports</TabsTrigger>
                </TabsList>

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
                <TabsContent value="lab-reports" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Lab Reports</CardTitle>
                            <CardDescription>All your pathology and blood test reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ReportTable reports={labReports} onAnalyze={handleAnalyze} onView={handleView} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="imaging-reports" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Imaging Reports</CardTitle>
                            <CardDescription>All your X-Ray, CT, and MRI scan reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ReportTable reports={imagingReports} onAnalyze={handleAnalyze} onView={handleView} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            <Dialog open={isViewOpen} onOpenChange={setViewOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>View Report: {selectedReport?.testName}</DialogTitle>
                        <DialogDescription>Date: {selectedReport ? format(new Date(selectedReport.date), 'dd-MMM-yyyy') : ''} | Ordered by: {selectedReport?.doctor}</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto p-1 space-y-4">
                        {reportImage && (
                            <div className="mb-6">
                                <Image 
                                    src={reportImage} 
                                    alt="Report Image" 
                                    width={600} 
                                    height={400} 
                                    className="rounded-lg border"
                                    data-ai-hint={reportImageHint || ''}
                                />
                            </div>
                        )}
                        <ReportViewer content={reportContent} />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isAnalyzeOpen} onOpenChange={setAnalyzeOpen}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-primary" style={{color: 'hsl(var(--nav-diagnostics))'}}><Sparkles /> AI Report Analysis</DialogTitle>
                        <DialogDescription>Analyzing: {selectedReport?.testName} from {selectedReport ? format(new Date(selectedReport.date), 'dd-MMM-yyyy') : ''}</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Original Report Content</h3>
                            <Textarea 
                                className="h-96 font-mono text-xs" 
                                value={reportContent} 
                                onChange={(e) => setReportContent(e.target.value)}
                            />
                            <Button onClick={handleRunAnalysis} disabled={isPending || !reportContent} className="w-full" style={{backgroundColor: 'hsl(var(--nav-diagnostics))'}}>
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

    

    