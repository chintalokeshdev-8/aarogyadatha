

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
  Shield,
  Users,
  CheckCircle,
  Briefcase,
  Sparkles,
  Loader2,
  Send,
  Stethoscope,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { PregnantLadyIcon } from "../icons/pregnant-lady-icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NotificationsDropdown } from "./notifications-dropdown";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AnimatedActivityIcon } from "../icons/animated-activity-icon";
import { askAiAssistant, AiAssistantOutput } from '@/ai/flows/ai-assistant';
import { Textarea } from "../ui/textarea";
import { allMenuItems, type MenuItem } from "@/lib/nav-config";
import { Switch } from "../ui/switch";
import { useToast } from "@/hooks/use-toast";


const familyAccounts = [
    { name: "Chinta Lokesh Babu", avatar: "/images/profile.jpg", fallback: "CL", isCurrentUser: true },
    { name: "Lakshmi Narayana", avatar: "https://picsum.photos/seed/user3/100/100", fallback: "LN", isCurrentUser: false },
    { name: "Chinta Ashok", avatar: "https://picsum.photos/seed/user4/100/100", fallback: "CA", isCurrentUser: false },
    { name: "Shiva Parvathi", avatar: "https://picsum.photos/seed/user5/100/100", fallback: "SP", isCurrentUser: false },
];

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

function AiAssistantDialog() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [conversation, setConversation] = React.useState<ChatMessage[]>([]);
    const [input, setInput] = React.useState('');
    const [isPending, startTransition] = React.useTransition();
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(scrollToBottom, [conversation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isPending) return;

        const newConversation: ChatMessage[] = [...conversation, { role: 'user', content: input }];
        setConversation(newConversation);
        const question = input;
        setInput('');

        startTransition(async () => {
            const result = await askAiAssistant({ question });
            setConversation(prev => [...prev, { role: 'assistant', content: result.answer }]);
        });
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-24 right-4 h-16 w-16 rounded-full shadow-lg z-30" style={{backgroundColor: 'hsl(var(--primary))'}}>
                    <Sparkles className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-primary"><Sparkles /> AI Assistant</DialogTitle>
                    <DialogDescription>Ask anything about your health data.</DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-lg">
                    {conversation.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.role === 'assistant' && (
                                <Avatar className="h-8 w-8 border-2 border-primary">
                                    <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn("max-w-sm rounded-lg px-4 py-2", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border')}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                             {msg.role === 'user' && (
                                <Avatar className="h-8 w-8 border-2 border-muted-foreground">
                                   <AvatarImage src="/images/profile.jpg" />
                                    <AvatarFallback>CL</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                     {isPending && (
                        <div className="flex items-start gap-3 justify-start">
                            <Avatar className="h-8 w-8 border-2 border-primary">
                               <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-sm rounded-lg px-4 py-2 bg-background border flex items-center">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., What was my last blood pressure reading?"
                        className="flex-1 resize-none"
                        rows={1}
                        disabled={isPending}
                    />
                    <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function LanguageSwitcherDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [selectedLanguage, setSelectedLanguage] = React.useState('en');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle>Select Language</DialogTitle>
                </DialogHeader>
                <div className="flex justify-around py-4">
                    <Button
                        variant={selectedLanguage === 'en' ? 'default' : 'outline'}
                        onClick={() => setSelectedLanguage('en')}
                    >
                        English
                    </Button>
                    <Button
                        variant={selectedLanguage === 'te' ? 'default' : 'outline'}
                        onClick={() => setSelectedLanguage('te')}
                    >
                        తెలుగు
                    </Button>
                </div>
                <DialogDescription className="text-center text-xs">
                    Language preference will be updated across the app.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const [visibleMenuItems, setVisibleMenuItems] = React.useState<MenuItem[]>([]);
  const [navSettings, setNavSettings] = React.useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const [isLangSwitcherOpen, setLangSwitcherOpen] = React.useState(false);


  React.useEffect(() => {
    setIsClient(true);
    const savedNavSettings = localStorage.getItem('navSettings');
    let settings: Record<string, boolean>;
    if (savedNavSettings) {
        settings = JSON.parse(savedNavSettings);
    } else {
        settings = {};
        allMenuItems.forEach(item => {
            settings[item.id] = item.defaultVisible;
        });
    }
    setNavSettings(settings);

    const finalVisibleItems = allMenuItems.filter(item => settings[item.id] !== false);
    setVisibleMenuItems(finalVisibleItems);

  }, [pathname]); // Rerun on path change to allow settings to apply

  const handleToggle = (id: string, isEnabled: boolean) => {
    const newSettings = { ...navSettings, [id]: isEnabled };
    setNavSettings(newSettings);
    localStorage.setItem('navSettings', JSON.stringify(newSettings));
    
    toast({
        title: "Navigation Updated",
        description: "Changes will apply on the next page load.",
    });
    
    // Optimistically update the visible menu items for instant feedback
    const finalVisibleItems = allMenuItems.filter(item => newSettings[item.id] !== false);
    setVisibleMenuItems(finalVisibleItems);
  };


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
  
  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-20 flex items-center justify-between p-3 bg-primary text-primary-foreground gap-4 h-16">
              <Link href="/" className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary-foreground rounded-lg">
                      <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="text-xl font-bold">medibridge</h1>
              </Link>
          </header>
          <main className="flex-1 pb-40">
              {children}
          </main>
      </div>
    );
  }


  const showMobileSearch = isMobile && isSearchOpen;

  const handleNavItemClick = (href: string, e: React.MouseEvent) => {
    if (href === '#') {
        e.preventDefault();
        setLangSwitcherOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-20 flex items-center justify-between p-3 bg-primary text-primary-foreground gap-4 h-16">
        {showMobileSearch ? (
            <div className="flex items-center gap-2 w-full">
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for doctors, medicines, reports..." className="pl-10 text-foreground" autoFocus />
                </div>
            </div>
        ) : (
            <>
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary-foreground rounded-lg">
                        <AnimatedActivityIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-primary-foreground">medibridge</h1>
                </Link>

                <div className="hidden md:block flex-1 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/70" />
                        <Input placeholder="Search for doctors, medicines, reports..." className="pl-10 bg-primary-foreground/10 border-primary-foreground/30 placeholder:text-primary-foreground/70 text-primary-foreground focus:bg-primary-foreground/20" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isMobile && (
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-primary-foreground" onClick={() => setIsSearchOpen(true)}>
                            <Search className="h-5 w-5" />
                        </Button>
                    )}
                    <NotificationsDropdown />
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                                    <Avatar className="h-10 w-10 border-2 border-primary-foreground/50">
                                        <AvatarImage src="/images/profile.jpg" />
                                        <AvatarFallback className="bg-primary-foreground text-primary">CL</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal p-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/images/profile.jpg" />
                                        <AvatarFallback>CL</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-lg font-bold">Chinta Lokesh Babu</p>
                                        <div className="space-y-0.5 text-xs text-muted-foreground">
                                            <p>Patient ID: PAT001</p>
                                            <p>Blood Group: O+ Positive</p>
                                        </div>
                                    </div>
                                </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="p-1">
                                    <Link href="/profile" passHref>
                                        <DropdownMenuItem className="p-3">
                                            <User className="mr-3 text-primary" />
                                            <span className="font-semibold">Profile</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem className="p-3">
                                            <Users className="mr-3 text-primary" />
                                            <span className="font-semibold">Switch Account</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    
                                    {allMenuItems.filter(item => ['surgery', 'language', 'bloodBank', 'healthTracker', 'jrDoctors', 'pregnancy', 'insurances'].includes(item.id)).map(item => (
                                        <Link href={item.href} key={item.id} passHref>
                                            <DropdownMenuItem className="p-3" onClick={(e) => handleNavItemClick(item.href, e)}>
                                                <item.icon className="mr-3" style={{color: item.color}} />
                                                <span className="font-semibold">{item.label}</span>
                                            </DropdownMenuItem>
                                        </Link>
                                    ))}
                                    
                                    <Link href="/settings" passHref>
                                        <DropdownMenuItem className="p-3">
                                            <Settings className="mr-3 text-primary" />
                                            <span className="font-semibold">Settings</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem className="p-3">
                                        <a href="tel:+918008443938" className="flex items-center w-full">
                                            <Phone className="mr-3 text-primary" />
                                            <span className="font-semibold">Customer Support</span>
                                        </a>
                                    </DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator />
                                <div className="p-1">
                                    <DropdownMenuItem className="p-3 text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-900/50 dark:focus:text-red-500">
                                        <LogOut className="mr-3" />
                                        <span className="font-semibold">Sign out</span>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Switch Account</DialogTitle>
                                <DialogDescription>
                                    Select a profile to continue.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3">
                                {familyAccounts.map((account, index) => (
                                    <div key={index} className={cn("p-3 rounded-lg flex items-center justify-between", account.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50")}>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={account.avatar} />
                                                <AvatarFallback>{account.fallback}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold">{account.name}</p>
                                        </div>
                                        {account.isCurrentUser ? (
                                            <div className="flex items-center gap-2 text-primary font-semibold">
                                                <CheckCircle className="h-5 w-5" />
                                                Current
                                            </div>
                                        ) : (
                                            <Button variant="outline" size="sm">Switch</Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </>
        )}
      </header>
      <main className="flex-1 bg-muted/20">
        <div className="p-4 sm:p-6 lg:p-8 pb-40">
          {children}
        </div>
      </main>
      <AiAssistantDialog />
      <LanguageSwitcherDialog open={isLangSwitcherOpen} onOpenChange={setLangSwitcherOpen} />
      <footer className="fixed bottom-0 z-20 w-full bg-background border-t">
        <div className="relative">
            <div className="absolute top-0 left-0 h-full flex items-center pl-2 bg-gradient-to-r from-background via-background to-transparent w-12 z-10">
                <Button variant="ghost" size="icon" className="bg-background hover:bg-muted rounded-full h-8 w-8" onClick={handleScrollLeft}>
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                </Button>
            </div>
            <ScrollArea className="w-full" viewportRef={viewportRef}>
                <nav className="flex w-max py-1 px-12 justify-center">
                    {visibleMenuItems.map((item, index) => {
                        const isActive = isClient && pathname === item.href;
                        const isSpecial = item.label === 'Emergency' || item.label === 'Blood Bank';
                        const specialColor = item.label === 'Emergency' ? 'hsl(var(--destructive))' : 'hsl(var(--nav-blood-bank))';

                        return (
                           <Link href={item.href} key={item.label} passHref onClick={(e) => handleNavItemClick(item.href, e)}>
                               <div className={cn(
                                   "flex flex-col items-center justify-center gap-1 rounded-lg transition-transform duration-200 ease-in-out w-24 py-1.5",
                                   isActive ? "scale-105" : "scale-100",
                               )}>
                                   <div
                                        className={cn(
                                            "p-2 rounded-full transition-colors",
                                            isActive ? `bg-primary/10` : ''
                                        )}
                                    >
                                       <item.icon className="h-6 w-6" style={{ color: isActive ? 'hsl(var(--primary))' : (isSpecial ? specialColor : 'hsl(var(--muted-foreground))') }} />
                                   </div>
                                   <div className="text-center leading-tight">
                                        <p className="text-xs font-bold whitespace-normal transition-colors"
                                           style={{color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}}>
                                           {item.label}
                                        </p>
                                   </div>
                               </div>
                           </Link>
                       );
                    })}
                </nav>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
             <div className="absolute top-0 right-0 h-full flex items-center pr-2 bg-gradient-to-l from-background via-background to-transparent w-12 z-10">
                <Button variant="ghost" size="icon" className="bg-background hover:bg-muted rounded-full h-8 w-8" onClick={handleScrollRight}>
                    <ChevronRight className="h-5 w-5 text-foreground" />
                </Button>
            </div>
        </div>
      </footer>
    </div>
  );
}
