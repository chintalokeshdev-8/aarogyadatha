
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartPulse, MessageSquare, Siren, Users, TestTube, FlaskConical, LifeBuoy, Stethoscope, Microscope, Pill, Headset, Phone, Link2, CalendarCheck, User, Heart, Baby, Leaf, Droplets, Wind, Brain, LayoutGrid, Activity, FileText, MapPin, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { PregnantLadyIcon } from '@/components/icons/pregnant-lady-icon';
import { GovIdIcon } from '@/components/icons/gov-id-icon';
import { formatDistanceToNow } from "date-fns";
import { HealthOverview } from './health-overview';
import { OrganHealthDialog } from '@/components/layout/organ-health-dialog';
import { organHealthData } from '@/lib/organ-health-data';


const quickAccessItems = [
  { href: "/", icon: LayoutGrid, label: 'Dashboard', description: 'హోమ్', color: 'hsl(var(--nav-home))' },
  { href: '/symptom-checker', icon: HeartPulse, label: 'AI Symptom Checker', description: 'వైద్య లక్షణాలు తనిఖీ', color: 'hsl(var(--nav-symptoms))' },
  { href: '/appointments', icon: CalendarCheck, label: 'Appointments', description: 'సమయం నమోదు చేసుకోండి', color: 'hsl(var(--nav-appointments))' },
  { href: '/opd-queue', icon: MessageSquare, label: 'OP STATUS', description: 'OP స్థితి', color: 'hsl(var(--nav-chat))' },
  { href: '/lab-reports', icon: TestTube, label: 'Diagnostics', description: 'రిపోర్టులు చూడండి', color: 'hsl(var(--nav-diagnostics))' },
  { href: '/insurances', icon: GovIdIcon, label: 'My Health IDs', description: 'ఆరోగ్య ఐడి', color: 'hsl(var(--primary))' },
  { href: '/medicines', icon: Pill, label: 'My Medicines', description: 'మీ మందులు', color: 'hsl(var(--nav-medicines))' },
  { href: '/surgery-care', label: 'Surgery Care', telugu: 'సర్జరీ కేర్', icon: Stethoscope, color: 'hsl(var(--nav-appointments))'},
  { href: '/blood-bank', icon: Droplets, label: 'Blood Bank', description: 'రక్త నిధి', color: 'hsl(var(--nav-blood-bank))' },
  { href: '/health-tracker', label: 'Health Tracker', description: 'ఆరోగ్య ట్రాకర్', icon: Activity, color: 'hsl(var(--nav-profile))' },
  { href: '/junior-doctors', icon: Headset, label: '24/7 Jr. Doctors', description: 'ఉచిత సలహా', color: 'hsl(var(--nav-junior-doctors))' },
  { href: '/pregnancy-tracker', label: 'Pregnancy Care', description: 'గర్భం', icon: PregnantLadyIcon, color: 'hsl(var(--nav-appointments))' },
  { href: '/profile', icon: User, label: 'Profile', description: 'ప్రొఫైల్', color: 'hsl(var(--nav-profile))' },
  { href: '/emergency', icon: Siren, label: 'Emergency', description: 'తక్షణ సహాయం', color: 'hsl(var(--nav-emergency))' },
];

const medicineAssistanceItems = [
    { 
        icon: FlaskConical, 
        title: 'AI Medicine Assistant',
        description: 'Get instant answers about your medications.',
        buttonText: 'Ask AI',
        href: '/medicine-assistant'
    },
    { 
        icon: Users, 
        title: 'Pharmacist Consultation',
        description: 'Speak with a licensed pharmacist for expert advice.',
        buttonText: 'Consult',
        href: '#'
    },
];

const CircularProgress = ({ percentage, children, size = 100, strokeWidth = 8, color } : { percentage: number, children: React.ReactNode, size?: number, strokeWidth?: number, color?: string }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{width: size, height: size}}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    className="text-muted/30"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size/2}
                    cy={size/2}
                />
                <circle
                    stroke={color || "hsl(var(--primary))"}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    r={radius}
                    cx={size/2}
                    cy={size/2}
                />
            </svg>
            <div className="absolute">{children}</div>
        </div>
    );
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
       <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                      <Avatar className="h-16 w-16 border-2 border-primary-foreground/50">
                          <AvatarImage src="/images/profile.jpg" />
                          <AvatarFallback>CLB</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="text-sm opacity-80 font-semibold">S.No: 1</p>
                          <h2 className="text-xl font-bold">Chinta Lokesh Babu</h2>
                          <p className="text-sm opacity-80 font-semibold">Patient ID: PAT001</p>
                      </div>
                  </div>
              </div>
              <div className="border-t border-primary-foreground/20 my-4"></div>
              <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-primary-foreground/10 p-4 flex flex-col items-center justify-center gap-4 text-center">
                       <p className="font-bold text-lg">
                          Connect your insurances, Aarogyasri (UHID) or ABHA ID to securely access and manage your health records.
                      </p>
                       <Link href="/insurances">
                        <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shrink-0">
                            <Link2 className="mr-2 h-4 w-4" /> Link Now
                        </Button>
                    </Link>
                  </div>
                   <div className="rounded-lg bg-primary-foreground/10 p-4 flex flex-col items-center justify-center gap-4 text-center">
                       <p className="text-lg italic font-bold">
                          "Right disease for the right doctor is 100% cure"
                      </p>
                      <Link href="/appointments">
                        <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shrink-0">
                            <CalendarCheck className="mr-2 h-4 w-4" /> Book Appointment
                        </Button>
                    </Link>
                  </div>
              </div>
          </CardContent>
      </Card>


       <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{color: 'hsl(var(--primary))'}}><Heart style={{color: 'hsl(var(--primary))'}}/>Organ Health Overview</CardTitle>
                <div className="text-sm text-muted-foreground">
                    <p>A summary of your key organ health based on recent reports.</p>
                    <p>మీ గత నివేదికల(Reports) ప్రకారం, మీ ముఖ్య అవయవాల ఆరోగ్య స్థితి యొక్క సారాంశం ఇది.</p>
                </div>
          </CardHeader>
          <CardContent className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {organHealthData.map((organ) => (
                  <OrganHealthDialog key={organ.name} organ={organ}>
                    <Card className="p-2 flex flex-col items-center text-center cursor-pointer hover:bg-muted/50">
                        <CircularProgress percentage={organ.health} size={80} strokeWidth={6} color={organ.color}>
                            <Image
                                src={organ.image}
                                alt={organ.name}
                                width={40}
                                height={40}
                                data-ai-hint={organ.dataAiHint}
                                className="rounded-full object-cover"
                            />
                        </CircularProgress>
                        <p className="mt-2 text-sm font-bold">{organ.name}</p>
                        <p className="font-semibold text-base" style={{color: organ.color}}>{organ.health}%</p>
                        <p className="text-xs text-muted-foreground">Healthy</p>
                    </Card>
                  </OrganHealthDialog>
              ))}
          </CardContent>
      </Card>


      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {quickAccessItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Card className="text-center p-2 hover:bg-muted/50 transition-colors cursor-pointer h-full flex flex-col items-center justify-center aspect-square">
                <div className="p-2 rounded-full mb-2" style={{backgroundColor: `${item.color.replace(')', ' / 0.1)')}`}}>
                    <item.icon className="h-8 w-8" style={{color: item.color}} />
                </div>
                <p className="font-bold text-xs leading-tight">{item.label}</p>
                <p className="text-xs text-muted-foreground whitespace-normal">{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Health Overview</h2>
          <HealthOverview />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Medicine Assistance</h2>
          <div className="space-y-4">
            {medicineAssistanceItems.map((item) => (
               <Link key={item.title} href={item.href} passHref>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                              <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>

                          </div>
                          <Button size="sm" variant="ghost" style={{color: 'hsl(var(--nav-medicines))'}}>{item.buttonText}</Button>
                      </CardContent>
                  </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
