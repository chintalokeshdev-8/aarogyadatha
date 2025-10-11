
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartPulse, MessageSquare, Siren, Users, TestTube, FlaskConical, LifeBuoy, Stethoscope, Microscope, Pill, Headset, Phone, Link2, CalendarCheck, User, Heart, Baby, Leaf, Droplets, Wind, Brain, LayoutGrid, Activity, FileText, MapPin, UserPlus, Shield, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Separator } from '@/components/ui/separator';


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
        title: "Right doctor for right disease is 100% cure.",
        buttonText: "Find a Doctor",
        buttonIcon: CheckCircle,
        href: "/appointments",
        textColor: "text-white",
        bgImage: "https://picsum.photos/seed/slideNew1/800/400"
    },
    {
        title: "Daily Health Tip: Stay hydrated by drinking at least 8 glasses of water throughout the day!",
        buttonText: "Learn More",
        buttonIcon: Leaf,
        href: "/health-tracker",
        textColor: "text-white",
        bgImage: "https://picsum.photos/seed/slide2/800/400"
    },
    {
        title: "New Feature: Link your Aarogyasri & ABHA ID to manage all health records in one place.",
        buttonText: "Link Now",
        buttonIcon: Link2,
        href: "/insurances#gov-health-ids",
        textColor: "text-white",
        bgImage: "https://picsum.photos/seed/slide3/800/400"
    },
    {
        title: "Limited Time Offer: Get 20% off on all master health checkups this month!",
        buttonText: "Book Now",
        buttonIcon: TestTube,
        href: "/lab-reports",
        textColor: "text-white",
        bgImage: "https://picsum.photos/seed/slide4/800/400"
    },
];

export default function DashboardPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-52 bg-primary -z-10 rounded-b-[3rem]"></div>
      <div className="space-y-8">
        <section>
          <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center sm:text-left">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {quickAccessItems.map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <div
                      className="transition-colors hover:bg-primary/10 cursor-pointer h-full flex flex-col items-center justify-start text-center gap-2 p-2 rounded-lg"
                    >
                      <div className="p-3 rounded-full mb-1 bg-primary/10">
                        <item.icon className="h-7 w-7" style={{ color: item.color }} />
                      </div>
                      <p className="font-semibold text-sm leading-tight text-foreground">{item.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />
        
        <section>
          <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center sm:text-left">Organ Health Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
               <p className="text-sm text-muted-foreground mb-4">A summary of your key organ health based on recent reports.</p>
               <HealthOverview />
            </CardContent>
          </Card>
        </section>

        <Separator />

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-center sm:text-left">App Updates & Health Tips</h2>
          <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              className="w-full border rounded-lg overflow-hidden"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
          >
              <CarouselContent>
                  {carouselSlides.map((slide, index) => (
                      <CarouselItem key={index}>
                          <div 
                              className={cn("p-6 flex items-center justify-center text-center min-h-[220px] relative", slide.textColor)}
                          >
                              <Image
                                  src={slide.bgImage}
                                  alt={slide.title}
                                  fill
                                  style={{objectFit:"cover"}}
                                  className="absolute inset-0 z-0"
                                  data-ai-hint="abstract background"
                              />
                              <div className="absolute inset-0 bg-black/50 z-10"></div>
                               <div className="space-y-4 z-20 flex flex-col items-center justify-center h-full">
                                  <p className="font-bold text-2xl drop-shadow-md max-w-lg mx-auto">{slide.title}</p>
                                  <Link href={slide.href}>
                                      <Button variant="outline" className="bg-background/80 hover:bg-background font-bold shrink-0 border-current text-foreground">
                                          <slide.buttonIcon className="mr-2 h-4 w-4" /> {slide.buttonText}
                                      </Button>
                                  </Link>
                              </div>
                          </div>
                      </CarouselItem>
                  ))}
              </CarouselContent>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-30">
                  {carouselSlides.map((_, index) => (
                      <button
                          key={index}
                          onClick={() => api?.scrollTo(index)}
                          className={cn(
                              "h-2 w-2 rounded-full transition-all bg-white/50",
                              current === index + 1 ? "w-4 bg-white" : "hover:bg-white/80"
                          )}
                          aria-label={`Go to slide ${index + 1}`}
                      />
                  ))}
              </div>
          </Carousel>
        </div>

        <Separator />

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
        
        <Separator />

        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Download The App</h2>
          <div className="flex justify-center gap-4">
            <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={180}
                height={60}
                data-ai-hint="google play badge"
              />
            </Link>
            <Link href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"
                alt="Download on the App Store"
                width={160}
                height={60}
                data-ai-hint="app store badge"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

    