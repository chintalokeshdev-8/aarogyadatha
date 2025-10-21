
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HandHeart, ShieldCheck, Star, Heart, CheckCircle, Calendar, PlusCircle, Phone, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { RupeeIcon } from "@/components/icons/rupee-icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const campaigns = [
  {
    name: "Lakshmi",
    age: 8,
    status: "Urgent",
    statusColor: "bg-red-500",
    imageUrl: "https://picsum.photos/seed/lakshmi/200/200",
    dataAiHint: "young girl smiling",
    tags: ["Organ Transplant", "Rare Disease", "BPL Priority"],
    suffering: "Suffering from Biliary Atresia, urgently needs Liver Transplant to survive.",
    raised: 1200000,
    goal: 3500000,
    daysLeft: 15,
    ngo: "Child Health Foundation"
  },
  {
    name: "Raju",
    age: 45,
    status: "Critical",
    statusColor: "bg-orange-500",
    imageUrl: "https://picsum.photos/seed/raju/200/200",
    dataAiHint: "middle-aged man portrait",
    tags: ["Organ Transplant", "BPL Priority"],
    suffering: "Daily wage worker diagnosed with Chronic Kidney Disease. Needs urgent dialysis and Kidney Transplant.",
    raised: 1850000,
    goal: 2200000,
    daysLeft: 7,
    ngo: null
  },
  {
    name: "Priya",
    age: 19,
    status: "New",
    statusColor: "bg-blue-500",
    imageUrl: "https://picsum.photos/seed/priya/200/200",
    dataAiHint: "teenage girl portrait",
    tags: ["Rare Disease"],
    suffering: "Battling Multiple Sclerosis. High-cost specialized medication required for next 6 months.",
    raised: 40000,
    goal: 500000,
    daysLeft: 40,
    ngo: "Rare Disease Support"
  },
  {
    name: "Veeresh",
    age: 62,
    status: "Closing Soon",
    statusColor: "bg-yellow-500",
    imageUrl: "https://picsum.photos/seed/veeresh/200/200",
    dataAiHint: "elderly man portrait",
    tags: ["BPL Priority"],
    suffering: "Elderly BPL card holder. Needs immediate hip replacement surgery due to an accident.",
    raised: 300000,
    goal: 350000,
    daysLeft: 3,
    ngo: null
  }
];

const FilterButton = ({ children }: { children: React.ReactNode }) => (
  <Button variant="outline" className="h-auto py-1.5 px-3 text-sm">{children}</Button>
);

function DonationDialog() {
    const { toast } = useToast();
    const bankDetails = {
        name: "Arogyadhatha Community Fund",
        acc: "123456789",
        ifsc: "SBIN0000LOKI",
        bank: "State Bank of India",
        upi: "arogyadhatha@sbi"
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `${field} Copied!`,
            description: `${text} has been copied to your clipboard.`,
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="w-full text-base h-10 bg-primary"><Heart className="mr-2 h-4 w-4" />Donate to Community</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Donate to the General Fund</DialogTitle>
                    <DialogDescription>
                        Your contribution supports all verified campaigns and helps us respond to urgent needs faster.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-1">
                        <Label>UPI ID</Label>
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-sm p-2 bg-muted rounded-md flex-1">{bankDetails.upi}</p>
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(bankDetails.upi, 'UPI ID')}><Copy className="h-4 w-4"/></Button>
                        </div>
                    </div>
                     <Separator />
                    <div className="space-y-2">
                        <Label>Bank Account Details</Label>
                        <div className="text-sm p-3 border rounded-lg bg-muted/50 space-y-2">
                           <div className="flex justify-between items-center">
                                <span>A/C No: <strong className="font-mono">{bankDetails.acc}</strong></span>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(bankDetails.acc, 'Account Number')}><Copy className="h-4 w-4"/></Button>
                           </div>
                           <div className="flex justify-between items-center">
                                <span>IFSC: <strong className="font-mono">{bankDetails.ifsc}</strong></span>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(bankDetails.ifsc, 'IFSC Code')}><Copy className="h-4 w-4"/></Button>
                           </div>
                           <p>Bank: {bankDetails.bank}</p>
                           <p>Name: {bankDetails.name}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function CommunityFundPage() {
    
  return (
    <div className="space-y-6">
      <div className="relative">
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0">
                 <div className="flex items-center justify-center text-center sm:text-left gap-3">
                    <div className="p-3 bg-primary/10 rounded-full w-fit flex-shrink-0">
                        <HandHeart className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-primary">Arogyadhatha Community Fund</CardTitle>
                    </div>
                </div>
                <CardDescription className="text-base text-muted-foreground max-w-3xl mx-auto text-center mt-4">
                    All campaigns are Arogyadhatha Verified. We confirm each case with doctor reports and BPL status to ensure every contribution goes to a genuine need. Your donation is tax-deductible under Section 80G.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="absolute top-0 right-0">
            <Button asChild variant="outline" className="h-auto p-2 border">
                <a href="tel:8008334948">
                    <Phone className="mr-1.5 h-4 w-4" /> Contact Us
                </a>
            </Button>
        </div>
      </div>
        
        <Card>
            <CardContent className="p-2 grid sm:grid-cols-2 gap-2">
                <DonationDialog />
                 <Button asChild className="w-full text-base h-10" variant="outline">
                    <Link href="/community-fund/start-campaign">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Start a Campaign
                    </Link>
                </Button>
            </CardContent>
        </Card>
        
        <div className="flex flex-wrap items-center gap-2">
            <FilterButton>All Critical Cases</FilterButton>
            <FilterButton>Organ Transplants</FilterButton>
            <FilterButton>Rare Diseases</FilterButton>
            <FilterButton>BPL Priority (High Need)</FilterButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((campaign, index) => {
                const progress = (campaign.raised / campaign.goal) * 100;
                return (
                    <Card key={index} className="overflow-hidden flex flex-col">
                        <CardHeader className="p-0 relative">
                            <Image src={campaign.imageUrl} data-ai-hint={campaign.dataAiHint} alt={campaign.name} width={400} height={250} className="w-full h-48 object-cover"/>
                            <Badge className={`absolute top-2 left-2 text-white text-xs py-1 px-2 ${campaign.statusColor}`}>
                                {campaign.status}
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-4 flex flex-col flex-grow">
                             <div className="flex items-center gap-3 mb-2">
                                <Avatar className="h-12 w-12 border-2 border-background">
                                    <AvatarImage src={campaign.imageUrl} />
                                    <AvatarFallback>{campaign.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{campaign.name}, {campaign.age}</h3>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {campaign.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <Badge variant="outline" className="w-fit my-3 bg-green-100 text-green-800 border-green-300">
                                <ShieldCheck className="mr-1.5 h-4 w-4" /> Arogyadhatha Verified
                            </Badge>

                            <p className="text-sm text-muted-foreground mb-4">
                                <strong className="text-foreground">Suffering:</strong> "{campaign.suffering}"
                            </p>

                            <div className="space-y-2 mt-auto">
                                <Progress value={progress} className="h-3" />
                                <div className="flex justify-between items-center text-sm">
                                    <p className="font-bold">
                                        <span className="text-primary">₹{campaign.raised.toLocaleString('en-IN')}</span> Raised
                                    </p>
                                    <p className="text-muted-foreground">Goal: ₹{campaign.goal.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="flex justify-between items-center text-xs text-muted-foreground font-semibold">
                                    <p className="flex items-center gap-1.5"><Calendar className="h-3 w-3"/> {campaign.daysLeft} days left</p>
                                    <p>{Math.round(progress)}% Funded</p>
                                </div>
                                
                                {campaign.ngo && (
                                    <div className="!mt-4 p-3 bg-muted/50 rounded-lg text-xs">
                                        <p className="font-bold flex items-center gap-2"><Heart className="h-4 w-4 text-primary"/> NGO Support:</p>
                                        <p className="text-muted-foreground">{campaign.ngo} is officially partnering to manage funds and oversee the treatment.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <div className="p-4 pt-0">
                            <Button className="w-full h-11 text-base bg-primary">
                                Donate Now & Save a Life
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </div>

        <Separator />
        <footer className="text-center text-muted-foreground text-sm py-4">
            <p>© 2025 Arogyadhatha. Health is a Shared Network.</p>
        </footer>
    </div>
  );
}
