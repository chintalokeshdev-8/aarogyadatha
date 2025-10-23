
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users2, HandHeart, Briefcase, Car, Nurse, FileText, UserPlus, Info, CheckCircle, Loader2, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


const services = [
    { id: "attendant", name: "A-to-Z Assistance Package", description: "Complete hospital visit management: pickup, consultation, and drop-off." },
    { id: "nurse", name: "Nurse at Home", description: "Skilled nursing care for medical needs." },
    { id: "caretaker", name: "Caretaker", description: "Non-medical support for daily activities." },
    { id: "maid", name: "Maid Services", description: "Help with household chores." },
    { id: "companion", name: "Companion", description: "Someone to talk to and spend time with." },
    { id: "vehicle", name: "Vehicle Service", description: "Arrange a vehicle for appointments." },
];

export default function OldAgeAssistantPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [patientSearch, setPatientSearch] = useState('');
    const [patientDetails, setPatientDetails] = useState({ name: '', address: '', id: '' });
    const [serviceRequestStep, setServiceRequestStep] = useState(1);

    const handlePatientSearch = () => {
        // This is a mock search. In a real app, this would be an API call.
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
            toast({
                title: "Request Submitted Successfully!",
                description: `Your ${formType} request has been received. Our team will contact you shortly.`,
            });
            if(formType === 'service') {
                setServiceRequestStep(2);
            }
        }, 1500);
    };

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
                                <Button type="submit" className="w-full" style={{backgroundColor: 'hsl(var(--nav-old-age))'}} disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                </Button>
                            </form>
                             <Alert className="mt-6 bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                <Info className="h-4 w-4" />
                                <AlertTitle className="font-bold">How Provider Tracking Works</AlertTitle>
                                <AlertDescription>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Our assigned provider will mark their attendance daily via the app.</li>
                                        <li>For your peace of mind, the provider will upload an hourly status update, including a photo with your parent.</li>
                                        <li>You can view all these updates in real-time from your app.</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="become-provider" className="mt-6">
                    <Card className="border">
                        <CardHeader>
                            <CardTitle>Join as a Service Provider</CardTitle>
                            <CardDescription>Apply to become a verified attendant, nurse, or driver.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <form onSubmit={(e) => handleSubmit(e, "provider application")} className="space-y-4">
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
                                <div className="space-y-2">
                                    <Label>Verification Documents</Label>
                                    <p className="text-xs text-muted-foreground">Please be ready to provide documents like Aadhar, driving license, or nursing certificates upon call.</p>
                                </div>

                                <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle className="font-bold">Our Process</AlertTitle>
                                    <AlertDescription>
                                        After you apply, we will call you to verify your details and documents. Once verified, you will be added to our network of trusted providers.
                                    </AlertDescription>
                                </Alert>

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
