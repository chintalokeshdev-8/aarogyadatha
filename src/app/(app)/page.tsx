
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartPulse, MessageSquare, Siren, Users, TestTube, FlaskConical, LifeBuoy, Stethoscope, Microscope, Pill, Headset, Phone, Link2, CalendarCheck, User, Heart, Baby, Leaf, Droplets, Wind, Brain, LayoutGrid, Activity, FileText, MapPin, UserPlus, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { PregnantLadyIcon } from '@/components/icons/pregnant-lady-icon';
import { GovIdIcon } from '@/components/icons/gov-id-icon';
import { formatDistanceToNow } from "date-fns";
import { HealthOverview } from './health-overview';
import { OrganHealthDialog } from '@/components/layout/organ-health-dialog';
import { organHealthData } from '@/lib/organ-health-data';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";


const quickAccessItems = [
  { href: '/symptom-checker', icon: HeartPulse, label: 'AI Symptom Checker', description: 'వైద్య లక్షణాలు తనిఖీ', color: 'hsl(var(--nav-symptoms))' },
  { href: '/appointments', icon: CalendarCheck, label: 'Appointments', description: 'సమయం నమోదు చేసుకోండి', color: 'hsl(var(--nav-appointments))' },
  { href: '/opd-queue', icon: MessageSquare, label: 'OP STATUS', description: 'OP స్థితి', color: 'hsl(var(--nav-chat))' },
  { href: '/lab-reports', icon: TestTube, label: 'Diagnostics', description: 'రిపోర్టులు చూడండి', color: 'hsl(var(--nav-diagnostics))' },
  { href: '/medicines', icon: Pill, label: 'My Medicines', description: 'మీ మందులు', color: 'hsl(var(--nav-medicines))' },
  { href: '/insurances', icon: Shield, label: 'Insurances', description: 'భీమా', color: 'hsl(var(--nav-profile))' },
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

const carouselSlides = [
    {
        title: "Daily Health Tip: Stay hydrated by drinking at least 8 glasses of water throughout the day!",
        buttonText: "Learn More",
        buttonIcon: Leaf,
        href: "/health-tracker",
        color: "bg-teal-500",
        textColor: "text-white"
    },
    {
        title: "New Feature: You can now link your Aarogyasri (UHID) and ABHA ID to manage all your health records in one place.",
        buttonText: "Link Now",
        buttonIcon: Link2,
        href: "/insurances",
        color: "bg-blue-600",
        textColor: "text-white"
    },
    {
        title: "Limited Time Offer: Get 20% off on all master health checkups this month!",
        buttonText: "Book Now",
        buttonIcon: TestTube,
        href: "/lab-reports",
        color: "bg-purple-600",
        textColor: "text-white"
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
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])


  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Quick Access</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2">
          {quickAccessItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Card 
                className="hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col items-center justify-center text-center p-2 border-2"
                style={{
                  backgroundColor: item.color.replace(')', ' / 0.1)'),
                  borderColor: item.color,
                  borderWidth: '2px'
                }}
              >
                <div className="p-1 rounded-full mb-1">
                    <item.icon className="h-5 w-5" style={{color: item.color}} />
                </div>
                <p className="font-bold text-[11px] leading-tight" style={{color: item.color}}>{item.label}</p>
                <p className="text-[10px] text-muted-foreground whitespace-normal">{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

       <Card className="bg-primary text-primary-foreground overflow-hidden">
          <div className="p-6">
              <h2 className="text-xl font-bold text-center sm:text-left">App Updates & Health Tips</h2>
              <div className="border-t border-primary-foreground/20 mt-4 -mx-6"></div>
          </div>
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            >
            <CarouselContent>
                {carouselSlides.map((slide, index) => (
                <CarouselItem key={index}>
                    <div className="p-6 pt-0">
                        <div className={cn("rounded-lg p-4 flex flex-col items-center justify-center gap-4 text-center min-h-[160px]", slide.color, slide.textColor)}>
                            <p className="font-bold text-lg flex-1 flex items-center">{slide.title}</p>
                            <Link href={slide.href}>
                                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold shrink-0">
                                    <slide.buttonIcon className="mr-2 h-4 w-4" /> {slide.buttonText}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
            <div className="flex justify-center gap-2 pb-4">
                {carouselSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                            "h-2 w-2 rounded-full transition-all",
                            current === index ? "w-4 bg-primary-foreground" : "bg-primary-foreground/50"
                        )}
                    />
                ))}
            </div>
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
