
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, QrCode, Download, Edit, Settings, Trash2, KeyRound, ShieldCheck, PhoneOff, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { GovIdIcon } from '@/components/icons/gov-id-icon';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const sidebarNavItems = [
    { label: "ABHA Card", icon: User },
    { label: "Edit Profile", icon: Edit },
    { label: "Set Password", icon: KeyRound },
    { label: "Re-KYC Verification", icon: ShieldCheck },
    { label: "Deactivate/Delete", icon: Trash2, variant: 'destructive' },
    { label: "Delink Mobile Number", icon: PhoneOff, variant: 'destructive' },
];

export default function MyHealthIdsPage() {
    const [activeTab, setActiveTab] = useState("ABHA Card");

    return (
        <div className="space-y-8">
             <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--primary))'}}>My Health IDs</h1>
                <p className="text-muted-foreground mt-2">Manage your Aarogyasri and ABHA accounts.</p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <Card className="lg:col-span-1 hidden lg:block">
                    <CardContent className="p-2">
                        <nav className="space-y-1">
                            {sidebarNavItems.map(item => (
                                <Button 
                                    key={item.label}
                                    variant={activeTab === item.label ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        item.variant === 'destructive' && 'text-destructive hover:bg-destructive/10 hover:text-destructive'
                                    )}
                                    onClick={() => setActiveTab(item.label)}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    <span>{item.label}</span>
                                </Button>
                            ))}
                        </nav>
                    </CardContent>
                </Card>

                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Ayushman Bharat Health Account (ABHA)</CardTitle>
                                <div className="flex gap-2">
                                     <Button variant="outline"><Printer className="mr-2"/> Print</Button>
                                    <Button><Download className="mr-2"/> Download</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <div className="border-2 rounded-lg p-6 relative bg-blue-50" style={{borderColor: 'hsl(var(--primary))'}}>
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <Image src="https://abdm.gov.in/assets/images/emblem_white_logo.svg" alt="National Health Authority" width={40} height={40} data-ai-hint="government logo" />
                                    <div>
                                        <p className="font-bold text-sm">National Health Authority</p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Image src="https://abdm.gov.in/assets/images/abdm_logo.svg" alt="ABDM Logo" width={90} height={40} data-ai-hint="health mission logo" />
                                </div>
                                
                                <div className="mt-20 grid md:grid-cols-3 gap-6 items-center">
                                    <div className="space-y-4 md:col-span-2">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                                <AvatarImage src="/images/profile.jpg" />
                                                <AvatarFallback className="text-3xl">CL</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Name/పేరు</p>
                                                <p className="text-2xl font-bold">Chinta Lokesh Babu</p>
                                                <p className="text-xl font-semibold">చింతా లోకేష్ బాబు</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">ABHA number/అభా నెంబరు</p>
                                            <p className="text-xl font-bold tracking-wider">24-0278-1857-2658</p>
                                        </div>
                                         <div>
                                            <p className="text-sm text-muted-foreground">ABHA address/అభా చిరునామా</p>
                                            <p className="text-lg font-semibold">lokeshl1996@abdm</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Gender/లింగము</p>
                                                <p className="text-lg font-semibold">Male/మగ</p>
                                            </div>
                                             <div>
                                                <p className="text-sm text-muted-foreground">Date of birth/పుట్టిన తేదీ</p>
                                                <p className="text-lg font-semibold">01-01-1997</p>
                                            </div>
                                             <div>
                                                <p className="text-sm text-muted-foreground">Mobile/చరవాణి</p>
                                                <p className="text-lg font-semibold">8008334948</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <div className="bg-white p-2 rounded-lg border shadow-sm">
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" alt="ABHA QR Code" width={150} height={150} data-ai-hint="qr code" />
                                        </div>
                                        <p className="text-sm font-medium">Scan QR to verify</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className="my-8"/>

                     <Card>
                        <CardHeader>
                           <div className="flex items-center gap-3">
                                <GovIdIcon className="h-8 w-8" style={{color: 'hsl(var(--primary))'}}/>
                                <div>
                                    <CardTitle>Aarogyasri Health Card (UHID)</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg bg-muted/40">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-lg">Universal Health ID (UHID)</p>
                                        <p className="text-base text-muted-foreground tracking-wider">YS-1234-5678-9012</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Verified</Badge>
                                </div>
                            </div>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full sm:w-auto"><Trash2 className="mr-2 h-4 w-4" /> Unlink Card</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will unlink your Aarogyasri card from your MedBridgee account. You can link it again later.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
