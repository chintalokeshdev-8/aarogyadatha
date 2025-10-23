
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
import { Users2, HandHeart, Briefcase, Car, Stethoscope, FileText, UserPlus, Info, CheckCircle, Loader2, Search, Upload, User, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';


const services = [
    { id: "attendant", name: "A-to-Z Assistance Package", description: "Complete hospital visit management: pickup, consultation, and drop-off." },
    { id: "nurse", name: "Nurse at Home", description: "Skilled nursing care for medical needs." },
    { id: "caretaker", name: "Caretaker", description: "Non-medical support for daily activities." },
    { id: "maid", name: "Maid Services", description: "Help with household chores." },
    { id: "companion", name: "Companion", description: "Someone to talk to and spend time with." },
    { id: "vehicle", name: "Vehicle Service", description: "Arrange a vehicle for appointments." },
];

const hourlyUpdates = [
    { time: '10:00 AM', text: 'Reached patient\'s home. All is well.', image: 'https://picsum.photos/seed/update1/400/300', dataAiHint: "selfie indoor", location: 'Rentala Village' },
    { time: '11:15 AM', text: 'Helping with breakfast and morning medications.', image: 'https://picsum.photos/seed/update2/400/300', dataAiHint: "elderly person eating", location: 'Rentala Village' },
    { time: '12:30 PM', text: 'Reading the newspaper together.', image: 'https://picsum.photos/seed/update3/400/300', dataAiHint: "person reading newspaper", location: 'Rentala Village' },
];

export default function OldAgeAssistantPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [patientSearch, setPatientSearch] = useState('');
    const [patientDetails, setPatientDetails] = useState({ name: '', address: '', id: '' });
    const [serviceRequestStep, setServiceRequestStep] = useState(1);
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
            } else {
                toast({
                    title: "Application Submitted Successfully!",
                    description: `Your provider application has been received. Our team will contact you shortly.`,
                });
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

            <Card className="border">
                <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Our Old Age Assistant program provides complete support for elderly individuals, especially for parents of those living abroad. From medical appointments to daily companionship, our trained and verified attendants are here to help.</p>
                    <p>You can book a complete package for hospital visits, request specific services like a nurse or caretaker, and even arrange for a vehicle. All updates and reports are shared in real-time through the app, giving you complete peace of mind.</p>
                </CardContent>
            </Card>

            <Tabs defaultValue="book-service" className="w-full">
                <div className="p-1 border bg-muted rounded-lg">
                    <TabsList className="grid w-full grid-cols-2">
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
                                            <Label htmlFor="patient-search">Search for Patient (if in app)</Label>
                                            <div className="flex gap-2">
                                                <Input 
                                                    id="patient-search" 
                                                    placeholder="Enter patient name or ID" 
                                                    className="border"
                                                    value={patientSearch}
                                                    onChange={(e) => setPatientSearch(e.target.value)}
                                                />
                                                <Button type="button" variant="outline" onClick={handlePatientSearch}><Search className="h-4 w-4 mr-2"/>Search</Button>
                                            </div>
                                        </div>
                                        
                                        {patientDetails.id && (
                                            <div className="space-y-2">
                                                <Label htmlFor="patient-id">Patient ID</Label>
                                                <Input id="patient-id" value={patientDetails.id} readOnly className="border bg-muted"/>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="parent-name">Parent's Name *</Label>
                                            <Input id="parent-name" placeholder="Enter their full name" className="border" value={patientDetails.name} onChange={e => setPatientDetails({...patientDetails, name: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="service-type">Type of Service Needed *</Label>
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
                                            <Label htmlFor="parent-address">Address & Contact *</Label>
                                            <Textarea id="parent-address" placeholder="Enter their full address and phone number" className="border" value={patientDetails.address} onChange={e => setPatientDetails({...patientDetails, address: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="client-contact">Your Contact Number (for confirmation) *</Label>
                                            <Input id="client-contact" type="tel" placeholder="Enter your phone number" className="border" />
                                        </div>
                                         <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                            <Info className="h-4 w-4" />
                                            <AlertTitle className="font-bold">Peace of Mind, Guaranteed</AlertTitle>
                                            <AlertDescription>
                                                Once a provider is assigned, you'll get access to their contact details and verified documents. You will receive daily attendance and hourly status updates (with photos and location) in the app.
                                            </AlertDescription>
                                        </Alert>
                                        <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-old-age))'}} disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                        </Button>
                                    </form>
                                </CardContent>
                             </>
                        ) : (
                            <div className="space-y-6 p-4">
                                 <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle className="font-bold">Peace of Mind, Guaranteed</AlertTitle>
                                    <AlertDescription>
                                        Your service request for <span className="font-bold">{patientDetails.name}</span> is active. You can monitor all activities below.
                                    </AlertDescription>
                                </Alert>

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
                                            <Button variant="outline"><Phone className="h-4 w-4 mr-2" /> Call Provider</Button>
                                            <Button variant="outline"><MessageSquare className="h-4 w-4 mr-2" /> Chat</Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Daily Tracking</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                         <div className="flex justify-between items-center p-3 bg-green-50 text-green-800 border border-green-200 rounded-lg">
                                            <p className="font-bold">Attendance: Present</p>
                                            <p className="text-sm">Checked in at 9:55 AM</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Hourly Updates</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {hourlyUpdates.map((update, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <p className="font-bold text-sm">{update.time}</p>
                                                    <div className="w-px flex-1 bg-border my-1"></div>
                                                </div>
                                                <div className="flex-1 pb-4">
                                                     <Image src={update.image} data-ai-hint={update.dataAiHint} alt={`Update at ${update.time}`} width={400} height={300} className="rounded-lg border aspect-[4/3] object-cover" />
                                                     <p className="text-sm text-muted-foreground mt-2">{update.text}</p>
                                                     <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{update.location}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                                 <Button onClick={() => setServiceRequestStep(1)} className="w-full mt-4" style={{backgroundColor: 'hsl(var(--nav-old-age))'}}>Book Another Service</Button>
                            </div>
                        )}
                    </Card>
                </TabsContent>

                <TabsContent value="become-provider" className="mt-6">
                    <Card className="border">
                        <CardHeader>
                            <CardTitle>Join as a Service Provider</CardTitle>
                            <CardDescription>Apply to become a verified attendant, nurse, or driver.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <form onSubmit={(e) => handleSubmit(e, "provider application")} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="provider-name">Full Name *</Label>
                                        <Input id="provider-name" placeholder="Enter your full name" className="border"/>
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
                                        <Label htmlFor="provider-experience">Years of Experience *</Label>
                                        <Input id="provider-experience" type="number" placeholder="e.g., 5" className="border"/>
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
                                        <Label htmlFor="doc-license">Driving License (for Drivers)</Label>
                                        <Button asChild variant="outline" className="w-full justify-start text-left border-dashed border-2">
                                            <label htmlFor="doc-license" className="cursor-pointer text-muted-foreground"><Upload className="mr-2 h-4 w-4" /> Upload Driving License</label>
                                        </Button>
                                        <input id="doc-license" type="file" className="hidden" />
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
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
