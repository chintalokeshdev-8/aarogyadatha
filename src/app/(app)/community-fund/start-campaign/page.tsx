
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GovIdIcon } from "@/components/icons/gov-id-icon";
import { FileText, Lock, PlusCircle, Sparkles, Upload, User, Video, Info, Calendar, ArrowRight } from "lucide-react";
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const StepCard = ({ step, title, children }: { step: number; title: string; children: React.ReactNode }) => (
    <Card className="border">
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">{step}</div>
                <div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {children}
        </CardContent>
    </Card>
);

export default function StartCampaignPage() {
    const { toast } = useToast();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-primary">Start Your Funding Campaign</h1>
                <p className="text-muted-foreground mt-2">Secure support from our community. Every application is instantly verified through your Arogyadhatha health records.</p>
            </div>

            <div className="space-y-8">
                {/* Step 1 */}
                <StepCard step={1} title="Patient Identity and Medical Need">
                    <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
                        <Lock className="h-4 w-4" />
                        <AlertTitle className="font-bold">Authenticity Lock</AlertTitle>
                        <AlertDescription>
                            This information is automatically pulled from the patient's verified Arogyadhatha profile to prevent fraudulent applications.
                        </AlertDescription>
                    </Alert>
                    <div className="p-4 border rounded-lg flex items-center gap-4">
                        <Image src="https://picsum.photos/seed/patient_lakshmi/100/100" alt="Patient" width={80} height={80} data-ai-hint="young girl smiling" className="rounded-full border-4 border-background shadow-md"/>
                        <div>
                            <p className="text-lg font-bold">Lakshmi</p>
                            <p className="text-muted-foreground">Age: 8</p>
                            <div className="flex items-center gap-2 mt-1">
                                <GovIdIcon className="h-5 w-5 text-primary"/>
                                <p className="font-semibold text-sm">Verified ABHA/UHID</p>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Link Diagnosis (Mandatory)</Label>
                        <Button variant="outline" className="w-full justify-start text-left border-dashed border-2">
                            <FileText className="mr-2 h-4 w-4"/>
                            <span>Link Diagnosis Report from Patient's Records</span>
                        </Button>
                         <p className="text-xs text-muted-foreground">Example: Select a verified report like "Liver Cirrhosis - 05/Oct/2025".</p>
                    </div>
                     <div className="space-y-2">
                        <Label>Treatment Urgency</Label>
                         <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the nature of the requirement" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="surgery">Immediate Surgery</SelectItem>
                                <SelectItem value="long-term">Long-term Treatment</SelectItem>
                                <SelectItem value="medication">Medication Costs</SelectItem>
                            </SelectContent>
                        </Select>
                         <p className="text-xs text-muted-foreground">Selecting 'Immediate Surgery' flags the campaign as urgent.</p>
                    </div>
                </StepCard>

                {/* Step 2 */}
                <StepCard step={2} title="Financial Transparency">
                     <Alert className="bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-600">
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle className="font-bold">AI-Powered Verification</AlertTitle>
                        <AlertDescription>
                            The app's AI will read the total estimated cost from the uploaded document, ensuring the goal is accurate. Donors can view the document.
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                        <Label>Upload Hospital Cost Estimate</Label>
                        <Button variant="outline" className="w-full justify-start text-left border-dashed border-2">
                            <Upload className="mr-2 h-4 w-4"/>
                            <span>Upload Cost Estimate / Prognosis Letter</span>
                        </Button>
                    </div>
                     <div className="space-y-2">
                        <Label>Insurance Coverage</Label>
                        <Input type="number" placeholder="Enter amount covered by insurance (e.g., 50000)" />
                        <p className="text-xs text-muted-foreground">Enter 0 or select "I have no coverage" if not applicable.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Net Funding Target</Label>
                            <Input value="₹13,50,000" disabled className="font-bold text-lg h-11"/>
                        </div>
                        <div className="space-y-2">
                             <Label>Campaign End Date</Label>
                            <Input type="date" />
                        </div>
                    </div>
                </StepCard>

                {/* Step 3 */}
                <StepCard step={3} title="The Story and Visuals">
                     <Alert className="bg-indigo-50 border-indigo-200 text-indigo-800 [&>svg]:text-indigo-600">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-bold">Tell a Compelling Story</AlertTitle>
                        <AlertDescription>
                            No need to be a writer! Just fill in the simple sections below to create an emotional and relatable narrative.
                        </AlertDescription>
                    </Alert>
                     <div className="space-y-2">
                        <Label>Campaign Title</Label>
                        <Input placeholder="e.g., Help Save My 6-Year-Old Daughter" />
                    </div>
                    <div className="space-y-2">
                        <Label>Current Struggle</Label>
                        <Textarea placeholder="Describe the patient's daily life and struggles now." />
                    </div>
                     <div className="space-y-2">
                        <Label>Hope for the Future</Label>
                        <Textarea placeholder="What will life look like after successful treatment?" />
                    </div>
                     <div className="space-y-2">
                        <Label>A Message to Donors</Label>
                        <Textarea placeholder="A simple, heartfelt 'thank you' and appeal." />
                    </div>
                    <Separator />
                     <div className="space-y-2">
                        <Label>Upload Photos/Videos (up to 3)</Label>
                        <p className="text-xs text-muted-foreground">A clear photo of the patient raises 7X more funds.</p>
                         <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="h-24 border-dashed"><PlusCircle className="h-6 w-6 text-muted-foreground"/></Button>
                            <Button variant="outline" className="h-24 border-dashed"><PlusCircle className="h-6 w-6 text-muted-foreground"/></Button>
                            <Button variant="outline" className="h-24 border-dashed"><PlusCircle className="h-6 w-6 text-muted-foreground"/></Button>
                         </div>
                    </div>
                </StepCard>

                 {/* Step 4 */}
                <Card className="border">
                    <CardHeader>
                        <CardTitle className="text-xl">Step 4: Launch and Commitment</CardTitle>
                         <CardDescription>Review and launch your campaign. Your commitment to transparency is a trust signal to donors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start space-x-2">
                            <input type="checkbox" id="terms" className="mt-1"/>
                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I confirm all information is correct and agree to the <Link href="/terms" className="text-primary underline">Terms of Service</Link>, including procedures for updates and fund withdrawal.
                            </label>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full h-12 text-lg" onClick={() => toast({ title: "Campaign Submitted!", description: "Your campaign is under review and will go live shortly."})}>
                            Launch My Verified Campaign <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
