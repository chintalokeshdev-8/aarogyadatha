
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HandHeart, ShieldCheck, Star, Heart, CheckCircle, Calendar, PlusCircle, Phone, Copy, FileText, Hospital, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";


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
    ngo: "Child Health Foundation",
    hospital: "Rainbow Children's Hospital, Hyderabad",
    doctor: "Dr. Ramesh Kumar",
    media: [
        { type: 'image', url: 'https://picsum.photos/seed/lakshmi_1/600/400', hint: 'young girl hospital bed' },
        { type: 'image', url: 'https://picsum.photos/seed/lakshmi_2/600/400', hint: 'medical report document' },
        { type: 'image', url: 'https://picsum.photos/seed/lakshmi_3/600/400', hint: 'doctor consulting child' },
        { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    story: "Lakshmi is a bright 8-year-old who loves to paint. Unfortunately, she was diagnosed with Biliary Atresia, a rare liver disease. Her only hope for survival is an urgent liver transplant. Her family, from a humble background, cannot afford the high cost of the surgery. Your support can give Lakshmi a second chance at life and let her paint her future.",
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
    ngo: null,
    hospital: "Guntur Kidney & Multispeciality Hospital",
    doctor: "Dr. V. Venkata Naidu",
    media: [
        { type: 'image', url: 'https://picsum.photos/seed/raju_1/600/400', hint: 'man looking worried' },
        { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    story: "Raju, the sole earner for his family of four, has been diagnosed with end-stage renal disease. He needs regular dialysis and an urgent kidney transplant. The mounting medical bills have exhausted his savings. Your donation can help him get the life-saving treatment he needs to support his family again."
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
    ngo: "Rare Disease Support",
    hospital: "KIMS Hospital, Secunderabad",
    doctor: "Dr. Sunitha",
    media: [
        { type: 'image', url: 'https://picsum.photos/seed/priya_1/600/400', hint: 'girl reading book' },
    ],
    story: "Priya is a bright student who was recently diagnosed with Multiple Sclerosis. The condition requires expensive medication to manage her symptoms and prevent progression. Her family is struggling to afford the treatment. Your support can ensure she continues her education and lives a full life."
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
    ngo: null,
    hospital: "Amar Orthopaedic Hospital",
    doctor: "Dr. G. Ravi Shankara Reddy",
    media: [
        { type: 'image', url: 'https://picsum.photos/seed/veeresh_1/600/400', hint: 'elderly man sitting' },
    ],
    story: "Veeresh, an elderly man with a BPL card, had a fall and requires immediate hip replacement surgery. Without the surgery, he faces a life of immobility and pain. With just a little more support, we can help him get back on his feet."
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

function CampaignDetailsDialog({ campaign, children }: { campaign: typeof campaigns[0], children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl p-0">
                <Carousel className="w-full">
                    <CarouselContent>
                        {campaign.media.map((item, index) => (
                            <CarouselItem key={index}>
                                {item.type === 'image' ? (
                                    <Image src={item.url} alt={`Campaign image ${index + 1}`} width={800} height={450} data-ai-hint={item.hint} className="w-full h-64 object-cover" />
                                ) : (
                                    <iframe src={item.url} title="Campaign video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-64"></iframe>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold">{campaign.name}, {campaign.age}</h2>
                    <p className="text-muted-foreground">{campaign.story}</p>
                    <Separator />
                    <div className="space-y-3">
                        <h3 className="font-semibold">Details</h3>
                        <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-primary" /> Doctor: <span className="font-medium">{campaign.doctor}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Hospital className="h-4 w-4 text-primary" /> Hospital: <span className="font-medium">{campaign.hospital}</span></div>
                        <Button variant="outline" className="w-full"><FileText className="mr-2 h-4 w-4" /> View Verified Reports</Button>
                    </div>
                     <Separator />
                    <Button className="w-full h-12 text-lg bg-primary">
                        Donate Now
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default function CommunityFundPage() {
    
  return (
    <div className="space-y-6">
        <div className="flex justify-end">
            <Button asChild variant="outline" className="h-auto p-2 border">
                <a href="tel:8008334948">
                    <Phone className="mr-1.5 h-4 w-4" /> Contact Us
                </a>
            </Button>
        </div>
      
        <Card className="border-0 shadow-none bg-transparent -mt-4">
            <CardHeader className="p-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary">Arogyadhatha Community Fund</h1>
                </div>
                <CardDescription className="text-sm text-muted-foreground max-w-3xl mt-2 mx-auto sm:mx-0">
                    All campaigns are Arogyadhatha Verified with doctor reports and BPL status to ensure every contribution supports a <span className="font-bold text-green-600">100% genuine need</span>. Your donation is also tax-deductible under Section 80G.
                </CardDescription>
            </CardHeader>
        </Card>
        
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
                    <CampaignDetailsDialog key={index} campaign={campaign}>
                        <Card className="overflow-hidden flex flex-col cursor-pointer transition-shadow hover:shadow-lg">
                            <CardHeader className="p-0 relative">
                                <Image src={campaign.imageUrl} data-ai-hint={campaign.dataAiHint} alt={campaign.name} width={400} height={250} className="w-full h-48 object-cover"/>
                                <Badge className={cn("absolute top-2 left-2 text-white text-xs py-1 px-2", campaign.statusColor)}>
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

                                <p className="text-sm text-muted-foreground mb-4 flex-grow">
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
                                </div>
                            </CardContent>
                        </Card>
                    </CampaignDetailsDialog>
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
