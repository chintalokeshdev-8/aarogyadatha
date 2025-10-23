
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users2, HandHeart, Briefcase, Car, Stethoscope, FileText, UserPlus, Info, CheckCircle, Loader2, Search, Upload, User, Phone, MessageSquare, MapPin, Clock, Camera, Image as ImageIcon, ChevronDown, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';


const services = [
    { id: "attendant", name: "A-to-Z Assistance Package", description: "Complete hospital visit management: pickup, consultation, and drop-off." },
    { id: "nurse", name: "Nurse at Home", description: "Skilled nursing care for medical needs." },
    { id: "caretaker", name: "Caretaker", description: "Non-medical support for daily activities." },
    { id: "maid", name: "Maid Services", description: "Help with household chores." },
    { id: "companion", name: "Companion", description: "Someone to talk to and spend time with." },
    { id: "vehicle", name: "Vehicle Service", description: "Arrange a vehicle for appointments." },
];

const dailyUpdates = [
    {
        date: "July 26, 2024",
        updates: [
            { time: '10:00 AM', text: 'Reached patient\'s home. All is well.', image: 'https://picsum.photos/seed/update1/400/300', dataAiHint: "selfie indoor", location: 'Rentala Village' },
            { time: '11:15 AM', text: 'Helping with breakfast and morning medications.', image: 'https://picsum.photos/seed/update2/400/300', dataAiHint: "elderly person eating", location: 'Rentala Village' },
            { time: '12:30 PM', text: 'Reading the newspaper together.', image: 'https://picsum.photos/seed/update3/400/300', dataAiHint: "person reading newspaper", location: 'Rentala Village' },
            { time: '02:00 PM', text: 'Patient is resting now. No issues to report.', image: null, dataAiHint: null, location: 'Rentala Village' },
        ]
    },
    {
        date: "July 25, 2024",
        updates: [
            { time: '10:00 AM', text: 'Arrived on time. Patient is in good spirits.', image: 'https://picsum.photos/seed/update4/400/300', dataAiHint: "selfie smiling", location: 'Rentala Village' },
            { time: '12:00 PM', text: 'Assisted with lunch and had a nice chat.', image: null, dataAiHint: null, location: 'Rentala Village' },
            { time: '03:00 PM', text: 'Went for a short walk in the garden.', image: 'https://picsum.photos/seed/update5/400/300', dataAiHint: "walking in garden", location: 'Rentala Village' },
        ]
    }
];

export default function OldAgeAssistantPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [patientSearch, setPatientSearch] = useState('');
    const [patientDetails, setPatientDetails] = useState({ name: '', address: '', id: '' });
    const [serviceRequestStep, setServiceRequestStep] = useState(1);
    const [providerApplicationStatus, setProviderApplicationStatus] = useState('form');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePatientSearch = () => {
        if (patientSearch.toLowerCase().includes('lokesh')) {
            setPatientDetails({
                name: 'Chinta Lokesh Babu',
                address: 'Rentala village, Rentachintala mandal, Palnadu district, Andhra Pradesh, India',
                id: 'PAT001'
            });
        }
    };
    
    const handleSubmit = (e: React.FormEvent, formType: string) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            if(formType === 'service') {
                toast({
                    title: "Request Submitted Successfully!",
                    description: `Your service request has been received. Our team will contact you shortly.`,
                });
                setServiceRequestStep(2);
            } else { // provider application
                toast({
                    title: "Application Submitted Successfully!",
                    description: `Our team will review your application and contact you shortly.`,
                });
                setProviderApplicationStatus('submitted');
                 setTimeout(() => {
                    setProviderApplicationStatus('approved');
                }, 2000);
            }
        }, 1500);
    };

    if (!isClient) {
        return (
            <div className="space-y-6">
                <div className="w-full h-24 rounded-lg bg-muted animate-pulse"></div>
                <div className="w-full h-96 rounded-lg bg-muted animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <div className="inline-block p-3 bg-primary/10 rounded-full" style={{backgroundColor: 'hsla(var(--nav-old-age)/0.1)'}}>
                     <Users2 className="h-8 w-8" style={{color: 'hsl(var(--nav-old-age))'}} />
                </div>
                <h1 className="text-4xl font-bold" style={{color: 'hsl(var(--nav-old-age))'}}>Old Age Assistant</h1>
                <p className="text-muted-foreground text-lg">Comprehensive care and support for senior citizens.</p>
            </div>

            <Tabs defaultValue="book-service" className="w-full">
                <div className="p-1 border bg-muted rounded-lg">
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="book-service" className="font-bold">Book a Service</TabsTrigger>
                        <TabsTrigger value="become-provider" className="font-bold">Become a Provider</TabsTrigger>
                    </TabsList>
                </div>
                
                <TabsContent value="book-service" className="mt-6">
                    <Card className="border">
                        {serviceRequestStep === 1 ? (
                             <>
                                <CardHeader>
                                    <CardTitle>Book a Service for Your Parents</CardTitle>
                                    <CardDescription>Fill out the form below to request assistance.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     <form onSubmit={(e) => handleSubmit(e, "service")} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="patient-search">Search for Patient</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="patient-search"
                                                    placeholder="Enter patient name or ID"
                                                    className="border"
                                                    value={patientSearch}
                                                    onChange={(e) => setPatientSearch(e.target.value)}
                                                />
                                                <Button type="button" variant="outline" onClick={handlePatientSearch}>
                                                    <Search className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="parent-name">Patient Name *</Label>
                                            <Input id="parent-name" placeholder="Enter their full name" className="border" value={patientDetails.name} onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="service-type">Type of Service Required *</Label>
                                            <Select>
                                                <SelectTrigger id="service-type" className="border">
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {services.map(service => (
                                                        <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="client-contact">Your Contact Number (Requester) *</Label>
                                            <Input id="client-contact" type="tel" placeholder="Enter your phone number" className="border" />
                                        </div>
                                         <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                            <Info className="h-4 w-4" />
                                            <AlertTitle className="font-bold">How Tracking Works</AlertTitle>
                                            <AlertDescription>
                                                Once a provider is assigned, you can track their daily attendance and view hourly photo updates right here in the app.
                                            </AlertDescription>
                                        </Alert>
                                        <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-old-age))'}} disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <HandHeart className="mr-2 h-4 w-4" />}
                                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                        </Button>
                                    </form>
                                </CardContent>
                             </>
                        ) : (
                            <>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Family's View: Service Tracking</CardTitle>
                                            <CardDescription>Monitor the care being provided to your parents in real-time.</CardDescription>
                                        </div>
                                         <Button variant="outline" onClick={() => setServiceRequestStep(1)} className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:text-green-900">
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                            <Info className="h-4 w-4" />
                                            <AlertTitle className="font-bold">Service Activated for Chinta Lokesh Babu</AlertTitle>
                                            <AlertDescription>
                                                You are viewing the live tracking dashboard for the service requested for your parent. All updates from the provider appear here instantly.
                                            </AlertDescription>
                                        </Alert>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Assigned Provider</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-16 w-16">
                                                            <AvatarImage src="https://picsum.photos/seed/bala/100/100" data-ai-hint="male portrait" />
                                                            <AvatarFallback>BK</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <p className="font-bold text-lg">Bala Krishna</p>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                <Badge variant="outline"><Stethoscope className="h-3 w-3 mr-1" />Nurse</Badge>
                                                                <Badge variant="outline"><User className="h-3 w-3 mr-1" />Caretaker</Badge>
                                                                <Badge variant="outline"><Car className="h-3 w-3 mr-1" />Driver</Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                                        <Button variant="outline"><Phone className="h-4 w-4 mr-2" /> Call</Button>
                                                        <Button variant="outline"><MessageSquare className="h-4 w-4 mr-2" /> Chat</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Trust & Safety</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                                                        <div>
                                                            <p className="font-semibold">Provider Verified</p>
                                                            <p className="text-xs text-muted-foreground">Aadhar, professional certificates, and background checks are complete.</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="link" className="p-0 h-auto">View Verified Documents</Button>
                                                </CardContent>
                                            </Card>

                                        </div>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Tracking & History</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex justify-between items-center p-3 bg-green-50 text-green-800 border border-green-200 rounded-lg mb-4">
                                                    <p className="font-bold">Attendance: Present</p>
                                                    <p className="text-sm">Checked in at 9:55 AM</p>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    {dailyUpdates.map(day => (
                                                        <Collapsible key={day.date} className="border rounded-lg" defaultOpen={day.date.includes("July 26")}>
                                                            <CollapsibleTrigger className="w-full flex justify-between items-center p-3 hover:bg-muted/50">
                                                                <p className="font-bold">{day.date}</p>
                                                                <div className="flex items-center gap-4">
                                                                    <Badge variant="secondary">{day.updates.length} updates</Badge>
                                                                    <ChevronDown className="h-5 w-5 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                                                                </div>
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent className="border-t p-4 space-y-4">
                                                                {day.updates.map((update, index) => (
                                                                    <div key={index} className="flex gap-4">
                                                                        <div className="text-sm font-semibold text-muted-foreground w-20">{update.time}</div>
                                                                        <div className="flex-1 space-y-1">
                                                                            <p>{update.text}</p>
                                                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                                <p className="flex items-center gap-1"><MapPin className="h-3 w-3" />{update.location}</p>
                                                                                {update.image && (
                                                                                    <Dialog>
                                                                                        <DialogTrigger asChild>
                                                                                            <Button variant="link" size="sm" className="p-0 h-auto text-primary" style={{color: 'hsl(var(--nav-old-age))'}}>
                                                                                                <ImageIcon className="h-3 w-3 mr-1" /> View Photo
                                                                                            </Button>
                                                                                        </DialogTrigger>
                                                                                        <DialogContent>
                                                                                            <DialogHeader>
                                                                                                <DialogTitle>Photo at {update.time}</DialogTitle>
                                                                                            </DialogHeader>
                                                                                            <Image src={update.image} data-ai-hint={update.dataAiHint || 'update photo'} alt={`Update at ${update.time}`} width={800} height={600} className="rounded-lg border aspect-video object-cover" />
                                                                                        </DialogContent>
                                                                                    </Dialog>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </CollapsibleContent>
                                                        </Collapsible>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </>
                        )}
                    </Card>
                </TabsContent>

                <TabsContent value="become-provider" className="mt-6">
                    <Card className="border">
                        {providerApplicationStatus === 'form' && (
                            <>
                                <CardHeader>
                                    <CardTitle>Join as a Service Provider</CardTitle>
                                    <CardDescription>Apply to become a verified attendant, nurse, or driver.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={(e) => handleSubmit(e, "provider")} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="provider-name">Full Name *</Label>
                                                <Input id="provider-name" placeholder="e.g., Bala Krishna" className="border"/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="provider-skill">Primary Skill / Service *</Label>
                                                <Select>
                                                    <SelectTrigger id="provider-skill" className="border">
                                                        <SelectValue placeholder="Select your service type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="nurse">Nurse</SelectItem>
                                                        <SelectItem value="caretaker">Caretaker / Attendant</SelectItem>
                                                        <SelectItem value="driver">Driver</SelectItem>
                                                        <SelectItem value="maid">Maid</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="provider-contact">Your Contact Number *</Label>
                                                <Input id="provider-contact" type="tel" placeholder="Enter your phone number" className="border" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <Label>Verification Documents *</Label>
                                            <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                                <Info className="h-4 w-4" />
                                                <AlertTitle className="font-bold">Our Process</AlertTitle>
                                                <AlertDescription>
                                                    After you apply, our team will call you to verify these documents. Once verified, you will be added to our network of trusted providers.
                                                </AlertDescription>
                                            </Alert>
                                            <div className="space-y-2">
                                                <Label htmlFor="doc-aadhar">Aadhar Card</Label>
                                                <Button asChild variant="outline" className="w-full justify-start text-left border-dashed border-2">
                                                    <label htmlFor="doc-aadhar" className="cursor-pointer text-muted-foreground"><Upload className="mr-2 h-4 w-4" /> Upload Aadhar Card</label>
                                                </Button>
                                                <input id="doc-aadhar" type="file" className="hidden" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="doc-professional">Professional Certificate (for Nurses)</Label>
                                                <Button asChild variant="outline" className="w-full justify-start text-left border-dashed border-2">
                                                    <label htmlFor="doc-professional" className="cursor-pointer text-muted-foreground"><Upload className="mr-2 h-4 w-4" /> Upload Nursing/Other Certificate</label>
                                                </Button>
                                                <input id="doc-professional" type="file" className="hidden" />
                                            </div>
                                        </div>

                                        <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-old-age))'}} disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                                            {isSubmitting ? 'Submitting...' : 'Apply to Join'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </>
                        )}
                        
                        {providerApplicationStatus === 'submitted' && (
                            <CardContent className="text-center p-8">
                                <Loader2 className="h-12 w-12 text-muted-foreground animate-spin mx-auto"/>
                                <h3 className="text-xl font-bold mt-4">Application Submitted!</h3>
                                <p className="text-muted-foreground">Our team is reviewing your application. We will contact you shortly. Please wait while we set up your dashboard...</p>
                            </CardContent>
                        )}

                        {providerApplicationStatus === 'approved' && (
                            <>
                               <CardHeader>
                                    <div className="flex items-center justify-between">
                                       <div>
                                            <CardTitle>Provider Dashboard</CardTitle>
                                            <CardDescription>Update your status for assigned patients here.</CardDescription>
                                       </div>
                                        <Button variant="outline" onClick={() => setProviderApplicationStatus('form')} className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:text-green-900">
                                           <ArrowLeft className="mr-2 h-4 w-4" />
                                           Back
                                       </Button>
                                   </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <Alert className="bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-600">
                                        <CheckCircle className="h-4 w-4" />
                                        <AlertTitle className="font-bold">Welcome, Bala Krishna! (ID: PROV007)</AlertTitle>
                                        <AlertDescription>
                                            Your application is approved. You are now a verified Arogyadhatha provider.
                                        </AlertDescription>
                                    </Alert>
                                    
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Current Assignment</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p><span className='font-bold'>Patient:</span> Chinta Lokesh Babu</p>
                                            <p><span className='font-bold'>Service:</span> Daily Caretaker Package</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader><CardTitle>Submit Update</CardTitle></CardHeader>
                                        <CardContent className="space-y-4">
                                            <Alert variant="destructive">
                                                <AlertTitle className="font-bold">Legal Notice</AlertTitle>
                                                <AlertDescription>
                                                    Any misconduct, failure to provide updates, or theft will result in immediate account suspension and will be legally proceeded with according to the law.
                                                </AlertDescription>
                                            </Alert>
                                            <Textarea placeholder="Enter status update... e.g., Patient had lunch." rows={2} />
                                             <Button variant="outline" asChild className="w-full justify-start text-left border-dashed">
                                                <label className="cursor-pointer">
                                                    <Camera className="mr-2 h-4 w-4"/>
                                                    <span>Upload Photo (Optional)</span>
                                                    <input type="file" className="hidden" />
                                                </label>
                                            </Button>
                                            <Button className="w-full" style={{backgroundColor: 'hsl(var(--nav-old-age))'}}>Submit Update</Button>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </>
                        )}

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
