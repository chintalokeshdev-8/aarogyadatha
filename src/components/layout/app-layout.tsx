
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
  Pencil,
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
                        <DropdownMenuContent className="w-[22rem] border-primary/50" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal p-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/images/profile.jpg" />
                                        <AvatarFallback className="text-xl">CL</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-lg font-semibold leading-none">Chinta Lokesh Babu</p>
                                        <div className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                                            <span>27 years old</span>
                                            <span>Male</span>
                                            <span>O+ Positive</span>
                                        </div>
                                         <p className="text-sm text-muted-foreground">Rentachintala, Palnadu District</p>

                                        <div className="text-base text-muted-foreground space-y-2 pt-2">
                                            <div className="flex items-center gap-3">
                                                <Mail className="h-4 w-4" style={{color: 'hsl(var(--nav-profile))'}} />
                                                <span>lokeshbabu9298@gmail.com</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="h-4 w-4" style={{color: 'hsl(var(--nav-profile))'}}/>
                                                <span>+91 8008334948</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                             <DropdownMenuSeparator />
                             <DropdownMenuGroup className="p-2">
                                <Link href="/profile" passHref>
                                    <DropdownMenuItem>
                                        <User />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/settings" passHref>
                                    <DropdownMenuItem>
                                        <Settings />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                     <a href="tel:+918008443938" className="flex items-center gap-2">
                                        <Phone />
                                        <span>Customer Support</span>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut />
                                <span>Sign out</span>
                            </DropdownMenuItem>
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
                           <Link href={item.href} key={item.label} className={cn("flex-shrink-0 flex items-center", (index < menuItems.length - 1 && item.href !== '/profile') && "border-r pr-2 mr-2", item.href === '/profile' ? 'hidden' : '')}>
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
