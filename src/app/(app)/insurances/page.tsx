
'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Hospital, Search, Eye, EyeOff, Download, Printer, ShieldAlert, Upload, Loader2, FileUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    address: "12-12-54, Behind Sivalayam Temple, Kothapet, ( City - Guntur )",
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

function UploadIdDialog() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [fileName, setFileName] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            // Typically you'd close the dialog and show a toast message here.
        }, 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                    <Upload className="mr-2 h-4 w-4" /> Upload ID
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Health ID</DialogTitle>
                    <DialogDescription>
                        Upload a photo or PDF of your government health ID card.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="id-type">ID Type</Label>
                        <Select>
                            <SelectTrigger id="id-type" className="border">
                                <SelectValue placeholder="Select ID Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="abha">ABHA Card</SelectItem>
                                <SelectItem value="aarogyasri">Aarogyasri Card</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="id-number">ID Number (Optional)</Label>
                        <Input id="id-number" placeholder="Enter the number on your card" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="id-file">Card Photo/PDF</Label>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" className="flex-1">
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <FileUp className="mr-2 h-4 w-4" />
                                    {fileName || 'Choose File'}
                                </label>
                            </Button>
                            <input id="file-upload" type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} accept="image/*,.pdf" />
                        </div>
                        {fileName && <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="submit" style={{ backgroundColor: 'hsl(var(--primary))' }} disabled={isSubmitting || !fileName}>
                            {isSubmitting ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
                            ) : <><Upload className="mr-2 h-4 w-4" /> Upload Document</>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function InsurancesPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showUhid, setShowUhid] = React.useState(false);
    const [showAbha, setShowAbha] = React.useState(false);

    const filteredHospitals = networkHospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--primary))'}}>Insurances</h1>
                <p className="text-muted-foreground mt-2">Manage your insurance policies and network hospitals.</p>
            </div>
            
            <Card className="border">
                <CardHeader>
                    <CardTitle>Health Insurance</CardTitle>
                    <CardDescription>Star Health - Family Plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 font-semibold text-lg">
                        <Shield style={{color: 'hsl(var(--primary))'}}/> Status: <Badge className="bg-green-100 text-green-800 text-base">Active</Badge>
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className="p-0 h-auto text-base" style={{color: 'hsl(var(--primary))'}}>View Network Hospitals</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px] border">
                            <DialogHeader>
                                <DialogTitle>Network Hospitals</DialogTitle>
                            </DialogHeader>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search hospital name or address..."
                                    className="pl-10 border"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="max-h-[400px] overflow-y-auto space-y-4 pr-3">
                                {filteredHospitals.map((hospital, index) => (
                                    <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                                        <div className="p-2 bg-muted rounded-full mt-1">
                                            <Hospital className="h-5 w-5" style={{color: 'hsl(var(--primary))'}}/>
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

            <Card id="gov-health-ids" className="border">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <GovIdIcon className="h-8 w-8" style={{color: 'hsl(var(--primary))'}}/>
                            <div>
                                <CardTitle>Government Health IDs</CardTitle>
                                <CardDescription>Aarogyasri (UHID) & ABHA ID</CardDescription>
                            </div>
                        </div>
                        <UploadIdDialog />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <CardHeader className="p-0">
                            <div className="flex justify-between items-center">
                                <CardTitle>Ayushman Bharat Health Account (ABHA)</CardTitle>
                                <div className="flex gap-2">
                                     <Button variant="outline" onClick={() => setShowAbha(!showAbha)} className="border">
                                        {showAbha ? <EyeOff className="mr-2"/> : <Eye className="mr-2"/>}
                                        {showAbha ? "Hide Card" : "Show Card"}
                                     </Button>
                                </div>
                            </div>
                        </CardHeader>
                        {showAbha ? (
                             <div className="border rounded-lg p-4 bg-blue-50/50" style={{borderColor: 'hsl(var(--primary))'}}>
                                <Image src="https://abdm.gov.in/assets/img/ABHA_Card_new.png" alt="ABHA Card" width={856} height={540} className="rounded-lg shadow-md w-full" data-ai-hint="ABHA card"/>
                                <div className="mt-4 flex gap-2 justify-end">
                                    <Button variant="outline" size="sm" className="border"><Printer className="mr-2 h-4 w-4"/> Print</Button>
                                    <Button size="sm" style={{backgroundColor: 'hsl(var(--primary))'}}><Download className="mr-2 h-4 w-4"/> Download</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/40 min-h-[200px]">
                                <ShieldAlert className="h-10 w-10 text-muted-foreground mb-2"/>
                                <h3 className="font-bold">ABHA Card Hidden</h3>
                                <p className="text-sm text-muted-foreground">Click "Show Card" to view your ABHA details.</p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <CardHeader className="p-0">
                           <div className="flex justify-between items-center">
                                <CardTitle>Aarogyasri Health Card (UHID)</CardTitle>
                                <Button variant="outline" onClick={() => setShowUhid(!showUhid)} className="border">
                                    {showUhid ? <EyeOff className="mr-2"/> : <Eye className="mr-2"/>}
                                    {showUhid ? "Hide Card" : "Show Card"}
                                </Button>
                            </div>
                        </CardHeader>
                        {showUhid ? (
                             <div className="border rounded-lg p-4 bg-green-50/50" style={{borderColor: 'hsl(var(--primary))'}}>
                                <Image src="https://picsum.photos/seed/aarogyasri/856/540" alt="Aarogyasri Card" width={856} height={540} className="rounded-lg shadow-md w-full" data-ai-hint="Aarogyasri card"/>
                                 <div className="mt-4 flex gap-2 justify-end">
                                    <Button variant="outline" size="sm" className="border"><Printer className="mr-2 h-4 w-4"/> Print</Button>
                                    <Button size="sm" style={{backgroundColor: 'hsl(var(--primary))'}}><Download className="mr-2 h-4 w-4"/> Download</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/40 min-h-[200px]">
                                <ShieldAlert className="h-10 w-10 text-muted-foreground mb-2"/>
                                <h3 className="font-bold">Aarogyasri Card Hidden</h3>
                                <p className="text-sm text-muted-foreground">Click "Show Card" to view your Aarogyasri details.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
