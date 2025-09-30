
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  HeartPulse,
  MessageSquare,
  Siren,
  User,
  TestTube,
  Pill,
  CalendarCheck,
  LayoutGrid,
  Headset,
  Activity,
  ChevronRight,
  Heart,
  ChevronLeft,
  Droplets,
  LogOut,
  Settings,
  Search,
  ArrowLeft,
  Mail,
  MapPin,
  Shield,
  FileDown,
  Pencil,
  ShieldAlert,
  Users,
  Eye,
  EyeOff,
  Hospital,
  Link2,
  Download,
  Printer,
  Loader2,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { PregnantLadyIcon } from "../icons/pregnant-lady-icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme-toggle";
import { NotificationsDropdown } from "./notifications-dropdown";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { HealthOverview } from '@/app/(app)/health-overview';
import { GovIdIcon } from '@/components/icons/gov-id-icon';
import Image from 'next/image';


const menuItems = [
  { href: "/", label: "Home", telugu: "హోమ్", icon: LayoutGrid, color: "hsl(var(--nav-home))" },
  { href: "/symptom-checker", label: "AI Symptom Checker", telugu: "లక్షణాలు", icon: HeartPulse, color: "hsl(var(--nav-symptoms))" },
  { href: "/appointments", label: "Appointments", telugu: "నమోదులు", icon: CalendarCheck, color: "hsl(var(--nav-appointments))" },
  { href: "/opd-queue", label: "OP STATUS", telugu: "OP స్థితి", icon: MessageSquare, color: "hsl(var(--nav-chat))" },
  { href: "/lab-reports", label: "Diagnostics", telugu: "రిపోర్టులు", icon: TestTube, color: "hsl(var(--nav-diagnostics))" },
  { href: "/medicines", label: "Medicines", telugu: "మందులు", icon: Pill, color: "hsl(var(--nav-medicines))" },
  { href: "/blood-bank", label: "Blood Bank", telugu: "రక్త నిధి", icon: Droplets, color: "hsl(var(--nav-blood-bank))" },
  { href: "/health-tracker", label: "Health Tracker", telugu: "ఆరోగ్య ట్రాకర్", icon: Heart, color: "hsl(var(--nav-profile))" },
  { href: "/junior-doctors", label: "Jr. Doctors", telugu: "డాక్టర్లు", icon: Headset, color: "hsl(var(--nav-junior-doctors))" },
  { href: "/pregnancy-tracker", label: "Pregnancy Care", telugu: "గర్భం", icon: PregnantLadyIcon, color: "hsl(var(--nav-appointments))" },
  { href: "/emergency", label: "Emergency", telugu: "తక్షణ సహాయం", icon: Siren, color: "hsl(var(--destructive))" },
];

const recentVisits = [
  { date: "2024-07-15", reason: "Fever & Cold", doctor: "Dr. Shashank" },
  { date: "2024-06-20", reason: "Regular Checkup", doctor: "Dr. Siva Parvathi" },
  { date: "2024-03-10", reason: "Stomach Pain", doctor: "Dr. Nageswarao" },
];

const medicalReports = [
    { name: "Complete Blood Count", date: "2024-07-15" },
    { name: "Lipid Profile", date: "2024-06-20" },
    { name: "X-Ray Chest", date: "2023-11-05" },
]

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


function ProfileContent() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showUhid, setShowUhid] = React.useState(false);
    const [showAbha, setShowAbha] = React.useState(false);

    const filteredHospitals = networkHospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 p-4">
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-28 w-28 border-4" style={{borderColor: 'hsl(var(--nav-profile))'}}>
                            <AvatarImage src="/images/profile.jpg" />
                            <AvatarFallback className="text-3xl">CL</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold">Chinta Lokesh Babu</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-2 text-muted-foreground">
                                <div className="flex items-center gap-2"><User /> 27 years old</div>
                                <div className="flex items-center gap-2"><Heart /> Male</div>
                                <div className="flex items-center gap-2"><Droplets /> O+ Positive</div>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-2 text-muted-foreground">
                                <div className="flex items-center gap-2"><MapPin /> Rentachintala, Palnadu District</div>
                            </div>
                        </div>
                        <Button style={{backgroundColor: 'hsl(var(--nav-profile))'}}><Pencil className="mr-2 h-4 w-4" /> Edit Profile</Button>
                    </div>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-3"><Mail style={{color: 'hsl(var(--nav-profile))'}} className="h-5 w-5"/><span>lokeshbabu9298@gmail.com</span></div>
                        <div className="flex items-center gap-3"><Phone style={{color: 'hsl(var(--nav-profile))'}} className="h-5 w-5"/><span>+91 8008334948</span></div>
                        <div className="flex items-start gap-3"><MapPin style={{color: 'hsl(var(--nav-profile))'}} className="h-5 w-5 mt-1"/><span>Rentala village, Rentachintala mandal, Palnadu district, India</span></div>
                    </div>
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
                                        {showAbha ? "Hide Details" : "Show Details"}
                                     </Button>
                                </div>
                            </div>
                        </CardHeader>
                        {showAbha ? (
                             <div className="border-2 rounded-lg p-6 relative bg-blue-50" style={{borderColor: 'hsl(var(--primary))'}}>
                                <div className="flex justify-between items-start mb-4 sm:mb-12">
                                    <div className="flex items-center gap-2">
                                        <Image src="https://abdm.gov.in/assets/images/emblem_white_logo.svg" alt="National Health Authority" width={40} height={40} data-ai-hint="government logo" />
                                        <p className="font-bold text-sm">National Health Authority</p>
                                    </div>
                                    <Image src="https://abdm.gov.in/assets/images/abdm_logo.svg" alt="ABDM Logo" width={90} height={40} data-ai-hint="health mission logo" />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                    <div className="space-y-4 md:col-span-2">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
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
                                            <p className="text-lg font-semibold">chinta1997@abdm</p>
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
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Button variant="outline"><Printer className="mr-2"/> Print</Button>
                                    <Button><Download className="mr-2"/> Download</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/40 min-h-[200px]">
                                <ShieldAlert className="h-10 w-10 text-muted-foreground mb-2"/>
                                <h3 className="font-bold">ABHA Card Hidden</h3>
                                <p className="text-sm text-muted-foreground">Click "Show Details" to view your card.</p>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <section>
                        <h2 className="text-xl font-semibold mb-4">Health Overview</h2>
                        <HealthOverview />
                    </section>
                    <Card>
                        <CardHeader>
                            <CardTitle>Health Insurance</CardTitle>
                            <CardDescription>Star Health - Family Plan</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 font-semibold text-lg"><Shield style={{color: 'hsl(var(--nav-profile))'}}/> Status: <Badge className="bg-green-100 text-green-800 text-base">Active</Badge></div>
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
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Recent Visits</CardTitle></CardHeader>
                        <CardContent>
                           <ul className="space-y-4">
                             {recentVisits.map((visit, index) => (
                               <li key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                                   <div>
                                       <p className="font-semibold">{visit.reason}</p>
                                       <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                                   </div>
                                   <p className="text-sm font-medium">{visit.date}</p>
                               </li>
                             ))}
                           </ul>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>Medical Reports</CardTitle></CardHeader>
                        <CardContent>
                           <ul className="space-y-3">
                             {medicalReports.map((report, index) => (
                               <li key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                                   <div>
                                       <p className="font-semibold">{report.name}</p>
                                       <p className="text-sm text-muted-foreground">Date: {report.date}</p>
                                   </div>
                                   <Button variant="outline" size="sm"><FileDown className="mr-2 h-4 w-4" />Download</Button>
                               </li>
                             ))}
                           </ul>
                        </CardContent>
                    </Card>
                    <Button variant="destructive" className="w-full"><ShieldAlert className="mr-2 h-4 w-4" /> Manage Emergency Contacts</Button>
                </div>
            </div>
        </div>
    );
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const isMobile = useIsMobile();


  React.useEffect(() => {
    setIsClient(true);
  }, []);


  const handleScrollRight = () => {
    if (viewportRef.current) {
        const scrollAmount = 200;
        viewportRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (viewportRef.current) {
        const scrollAmount = -200;
        viewportRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <header className="sticky top-0 z-20 flex items-center justify-between p-3 bg-background border-b border-t-4 border-t-primary gap-4 h-16">
        {isMobile && isSearchOpen ? (
            <div className="flex items-center gap-2 w-full">
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for doctors, medicines, reports..." className="pl-10" autoFocus />
                </div>
            </div>
        ) : (
            <>
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary rounded-lg">
                        <Activity className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl font-bold">MedBridgee</h1>
                </div>

                <div className="hidden md:block flex-1 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for doctors, medicines, reports..." className="pl-10" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full md:hidden" onClick={() => setIsSearchOpen(true)}>
                        <Search className="h-5 w-5" />
                    </Button>
                    <NotificationsDropdown />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/images/profile.jpg" />
                                    <AvatarFallback>CL</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-screen max-w-sm md:max-w-md lg:max-w-lg" align="end" forceMount>
                             <ScrollArea className="h-[80vh]">
                                <ProfileContent />
                                <div className="p-4">
                                     <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link href="/settings" passHref>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <div className="flex items-center justify-center p-2">
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </>
        )}
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
          {children}
      </main>
      <footer className="sticky bottom-0 z-20 mt-auto bg-background border-t">
        <div className="relative">
            <div className="absolute top-0 left-0 h-full flex items-center pl-2 bg-gradient-to-r from-background to-transparent w-12 z-10">
                <Button variant="ghost" size="icon" className="bg-muted rounded-full h-8 w-8" onClick={handleScrollLeft}>
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                </Button>
            </div>
            <ScrollArea className="w-full" viewportRef={viewportRef}>
                <nav className="flex w-max p-2 px-12 justify-center">
                    {menuItems.map((item, index) => {
                        const isActive = isClient && pathname === item.href;
                        const isSpecial = item.label === 'Emergency' || item.label === 'Blood Bank';
                        const specialColor = item.label === 'Emergency' ? 'hsl(var(--destructive))' : 'hsl(var(--nav-blood-bank))';

                        return (
                           <Link href={item.href} key={item.label} className={cn("flex-shrink-0 flex items-center", index < menuItems.length - 1 && "border-r pr-2 mr-2")}>
                               <div className={cn(
                                   "flex flex-col items-center justify-center gap-1 rounded-lg transition-transform duration-200 ease-in-out w-[5.5rem] py-1",
                                   isActive ? "scale-105" : "scale-100",
                                   isSpecial ? 'bg-destructive/10' : '',
                                   item.label === 'Blood Bank' && 'bg-red-500/10'
                               )}>
                                   <div
                                        className="p-2 rounded-full"
                                        style={{
                                            backgroundColor: isActive && !isSpecial ? `${item.color.replace(')', ' / 0.1)')}` : 'transparent',
                                        }}
                                    >
                                       <item.icon className="h-5 w-5" style={{ color: isSpecial ? specialColor : item.color }} />
                                   </div>
                                   <div className="text-center leading-tight">
                                        <p className="text-xs font-bold whitespace-normal"
                                           style={{color: isActive || isSpecial ? (isSpecial ? specialColor : item.color) : 'hsl(var(--foreground))'}}>
                                           {item.label}
                                        </p>
                                        <p className="text-[11px] font-medium whitespace-normal"
                                           style={{color: isActive || isSpecial ? (isSpecial ? specialColor : item.color) : 'hsl(var(--muted-foreground))'}}>
                                           {item.telugu}
                                        </p>
                                   </div>
                               </div>
                           </Link>
                       );
                    })}
                </nav>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
             <div className="absolute top-0 right-0 h-full flex items-center pr-2 bg-gradient-to-l from-background to-transparent w-12">
                <Button variant="ghost" size="icon" className="bg-muted rounded-full h-8 w-8" onClick={handleScrollRight}>
                    <ChevronRight className="h-5 w-5 text-foreground" />
                </Button>
            </div>
        </div>
      </footer>
    </div>
  );
}

