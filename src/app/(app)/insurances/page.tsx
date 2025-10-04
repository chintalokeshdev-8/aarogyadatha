
'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Hospital, Search, Eye, EyeOff, Download, Printer, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GovIdIcon } from "@/components/icons/gov-id-icon";
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const networkHospitals = [
  {
    name: "Ahalya Ivf And Nursing Home",
    address: "Backside Sivalayam, Kothapet ( City - Guntur )",
  },
  {
    name: "Ahalya Nursing Home",
    address: "12-12-54, Behind Sivalayam Temple, Kothapet ( City - Guntur )",
  },
  {
    name: "Amar Orthopaedic Hospital",
    address: "13-2-12, 1St Lane, Old Club Road, Near Gunturvarithita, Opposite Blood Bank, Kothapet, ( City - Guntur )",
  },
  {
    name: "Amaravathi Institute Of Medical Sciences Pvt Ltd",
    address: "D.No:13-4-74, M.N.R Plaza, Oldclub Road, Kothapet ( City - Guntur )",
  },
  {
    name: "American Oncology Insititute",
    address: "Mangalagiri Road, Nri Hospital Campus, Chinakakani ( City - Mangalagiri )",
  },
  {
    name: "American Oncology Institute - A Unit Of Cancer Treatment Services Hyderabad Pvt. Ltd",
    address: "Mangalagiri Road, Nri Hospital Campus, Chinakakani, Guntur, Andhra Pradesh",
  },
];

export default function InsurancesPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showUhid, setShowUhid] = React.useState(false);
    const [showAbha, setShowAbha] = React.useState(false);

    const filteredHospitals = networkHospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-profile))'}}>Health Insurance</h1>
                <p className="text-muted-foreground mt-2">Manage your insurance policies and network hospitals.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Health Insurance</CardTitle>
                    <CardDescription>Star Health - Family Plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 font-semibold text-lg">
                        <Shield style={{color: 'hsl(var(--nav-profile))'}}/> Status: <Badge className="bg-green-100 text-green-800 text-base">Active</Badge>
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className="p-0 h-auto text-base" style={{color: 'hsl(var(--nav-profile))'}}>View Network Hospitals</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Network Hospitals</DialogTitle>
                            </DialogHeader>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search hospital name or address..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="max-h-[400px] overflow-y-auto space-y-4 pr-3">
                                {filteredHospitals.map((hospital, index) => (
                                    <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                                        <div className="p-2 bg-muted rounded-full mt-1">
                                            <Hospital className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{hospital.name}</p>
                                            <p className="text-sm text-muted-foreground">{hospital.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            <Card id="gov-health-ids">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <GovIdIcon className="h-8 w-8" style={{color: 'hsl(var(--nav-profile))'}}/>
                        <div>
                            <CardTitle>Government Health IDs</CardTitle>
                            <CardDescription>Aarogyasri (UHID) & ABHA ID</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <CardHeader className="p-0">
                            <div className="flex justify-between items-center">
                                <CardTitle>Ayushman Bharat Health Account (ABHA)</CardTitle>
                                <div className="flex gap-2">
                                     <Button variant="outline" onClick={() => setShowAbha(!showAbha)}>
                                        {showAbha ? <EyeOff className="mr-2"/> : <Eye className="mr-2"/>}
                                        {showAbha ? "Hide Details" : "Show Card"}
                                     </Button>
                                </div>
                            </div>
                        </CardHeader>
                        {showAbha ? (
                             <div className="border rounded-lg p-4 bg-blue-50/50" style={{borderColor: 'hsl(var(--primary))'}}>
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-bold text-xs">National Health Authority</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-4">
                                             <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                                                <AvatarImage src="/images/profile.jpg" />
                                                <AvatarFallback className="text-2xl">CL</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Name/పేరు</p>
                                                <p className="text-lg font-bold">Chinta Lokesh Babu</p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div>
                                                <p className="text-xs text-muted-foreground">ABHA number/అభా నెంబరు</p>
                                                <p className="text-base font-semibold tracking-wider">24-0278-1857-2658</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">ABHA address/అభా చిరునామా</p>
                                                <p className="text-sm font-semibold">chinta1997@abdm</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pt-1">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Gender/లింగము</p>
                                                    <p className="font-semibold">Male/మగ</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">DOB/పుట్టిన తేదీ</p>
                                                    <p className="font-semibold">01-01-1997</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Mobile/చరవాణి</p>
                                                    <p className="font-semibold">8008334948</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center space-y-1 self-center pt-4 sm:pt-0">
                                        <div className="bg-white p-1 rounded-md border shadow-sm">
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" alt="ABHA QR Code" width={100} height={100} data-ai-hint="qr code" />
                                        </div>
                                        <p className="text-xs font-medium text-muted-foreground">Scan to verify</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2 justify-end">
                                    <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4"/> Print</Button>
                                    <Button size="sm" style={{backgroundColor: 'hsl(var(--primary))'}}><Download className="mr-2 h-4 w-4"/> Download</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/40 min-h-[200px]">
                                <ShieldAlert className="h-10 w-10 text-muted-foreground mb-2"/>
                                <h3 className="font-bold">ABHA Card Hidden</h3>
                                <p className="text-sm text-muted-foreground">Click "Show Card" to view your ABHA details.</p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <CardHeader className="p-0">
                           <div className="flex items-center gap-3">
                                <GovIdIcon className="h-8 w-8" style={{color: 'hsl(var(--primary))'}}/>
                                <div>
                                    <CardTitle>Aarogyasri Health Card (UHID)</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <div className="p-4 border rounded-lg bg-muted/40 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">Universal Health ID (UHID)</p>
                                <p className="text-base text-muted-foreground tracking-wider">
                                    {showUhid ? 'CB-1234-5678-9012' : 'CB-XXXX-XXXX-9012'}
                                </p>
                            </div>
                             <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" onClick={() => setShowUhid(!showUhid)}>
                                    {showUhid ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Verified</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
