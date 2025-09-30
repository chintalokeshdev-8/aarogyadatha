
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
import Image from 'next/image';

const services = [
    { title: "Get An Expert Second Opinion", icon: UserCheck },
    { title: "Find Top Cashless Hospitals", icon: Hospital },
    { title: "Find Surgery Cost Estimate", icon: RupeeIcon },
    { title: "Verify Insurance Coverage", icon: InsuranceIcon },
];

const surgeriesOffered = [
    { name: 'ACL/PCL-Injuries', imageUrl: 'https://picsum.photos/seed/acl/100/100', dataAiHint: 'knee joint' },
    { name: 'Knee-Replacement', imageUrl: 'https://picsum.photos/seed/knee/100/100', dataAiHint: 'knee bone' },
    { name: 'Hysterectomy', imageUrl: 'https://picsum.photos/seed/hysterectomy/100/100', dataAiHint: 'uterus organ' },
    { name: 'Natural/C-Section', imageUrl: 'https://picsum.photos/seed/csection/100/100', dataAiHint: 'baby womb' },
    { name: 'Gallstones', imageUrl: 'https://picsum.photos/seed/gallstones/100/100', dataAiHint: 'gallbladder stones' },
    { name: 'Hernia', imageUrl: 'https://picsum.photos/seed/hernia/100/100', dataAiHint: 'abdominal hernia' },
    { name: 'Circumcision', imageUrl: 'https://picsum.photos/seed/circumcision/100/100', dataAiHint: 'urology icon' },
    { name: 'Kidney-Stones', imageUrl: 'https://picsum.photos/seed/kidneystone/100/100', dataAiHint: 'kidney stones' },
    { name: 'Varicose Veins', imageUrl: 'https://picsum.photos/seed/varicose/100/100', dataAiHint: 'leg veins' },
    { name: 'Cataract', imageUrl: 'https://picsum.photos/seed/cataract/100/100', dataAiHint: 'eye icon' },
    { name: 'Lasik', imageUrl: 'https://picsum.photos/seed/lasik/100/100', dataAiHint: 'eye laser icon' },
    { name: 'Tonsillectomy', imageUrl: 'https://picsum.photos/seed/tonsillectomy/100/100', dataAiHint: 'throat icon' },
];

const surgeryCategories = ["Top Surgeries", "Aesthetics", "Cardiology", "ENT"];

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
                <p className="text-muted-foreground mt-2">50+ Surgical Conditions Covered.</p>
            </div>

            <div className="flex justify-center flex-wrap gap-2">
                {surgeryCategories.map((category) => (
                    <Button key={category} variant="outline">{category}</Button>
                ))}
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Surgeries Offered</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {surgeriesOffered.map((surgery) => (
                        <Card key={surgery.name} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <Image
                                src={surgery.imageUrl}
                                alt={`${surgery.name} icon`}
                                width={60}
                                height={60}
                                data-ai-hint={surgery.dataAiHint}
                                className="mx-auto rounded-lg mb-2"
                            />
                            <p className="font-semibold text-sm">{surgery.name}</p>
                        </Card>
                    ))}
                </CardContent>
            </Card>

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
