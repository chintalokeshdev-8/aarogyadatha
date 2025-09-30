
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Hospital, Loader2, MessageSquare, Search, ShieldCheck, UserCheck } from "lucide-react";
import { RupeeIcon } from '@/components/icons/rupee-icon';
import { InsuranceIcon } from '@/components/icons/insurance-icon';

const services = [
    { title: "Get An Expert Second Opinion", icon: UserCheck },
    { title: "Find Top Cashless Hospitals", icon: Hospital },
    { title: "Find Surgery Cost Estimate", icon: RupeeIcon },
    { title: "Verify Insurance Coverage", icon: InsuranceIcon },
];

export default function SurgeryCarePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{ color: 'hsl(var(--nav-appointments))' }}>Surgery Care</h1>
                <p className="text-muted-foreground mt-2">Explore surgery options and get expert guidance.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Services We Offer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {services.map((service, index) => (
                            <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="p-3 bg-primary/10 rounded-full mr-4">
                                    <service.icon className="h-6 w-6" style={{ color: 'hsl(var(--nav-appointments))' }} />
                                </div>
                                <p className="font-semibold text-lg">{service.title}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare style={{color: 'hsl(var(--nav-appointments))'}} /> Ask our Expert</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="Enter your phone number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Select>
                                    <SelectTrigger id="city">
                                        <SelectValue placeholder="Select your city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="guntur">Guntur</SelectItem>
                                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                                        <SelectItem value="vijayawada">Vijayawada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="query">Your Query</Label>
                                <Textarea id="query" placeholder="Tell us what you need help with..." />
                            </div>
                            <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--nav-appointments))' }} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : 'Submit Query'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
