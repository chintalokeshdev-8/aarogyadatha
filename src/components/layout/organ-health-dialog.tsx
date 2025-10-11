
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Minus, Info, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

const CircularProgress = dynamic(() => Promise.resolve(function CircularProgress({ percentage, children, size = 100, strokeWidth = 8, color } : { percentage: number | null, children: React.ReactNode, size?: number, strokeWidth?: number, color?: string }) {
    if (percentage === null) {
      return (
        <div className="relative flex items-center justify-center" style={{width: size, height: size}}>
           <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    className="text-muted/30"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={(size - strokeWidth) / 2}
                    cx={size/2}
                    cy={size/2}
                />
            </svg>
            <div className="absolute">{children}</div>
        </div>
      );
    }
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
}), { ssr: false, loading: () => <Skeleton className="h-20 w-20 rounded-full" /> });

const getStatusClass = (status: string) => {
    if (status.toLowerCase().includes('healthy') || status.toLowerCase().includes('good')) return "bg-green-100 text-green-800";
    if (status.toLowerCase().includes('monitoring')) return "bg-yellow-100 text-yellow-800";
    if (status.toLowerCase().includes('critical')) return "bg-red-100 text-red-800";
    return "bg-muted text-muted-foreground";
}

const getTestResultBadgeClass = (result: string) => {
    if (result.toLowerCase() === 'normal') return 'bg-green-100 text-green-800 border-green-200';
    if (result.toLowerCase() === 'abnormal') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
};


export function OrganHealthDialog({ organ, children }: { organ: any, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <CircularProgress percentage={organ.healthScore} size={60} strokeWidth={5} color={organ.color}>
                              <Image
                                src={organ.image}
                                alt={organ.name}
                                width={30}
                                height={30}
                                data-ai-hint={organ.dataAiHint}
                                className="rounded-full object-cover"
                            />
                        </CircularProgress>
                        <div>
                             <DialogTitle className="text-2xl">{organ.name} Health</DialogTitle>
                             <div className='flex items-center gap-2 mt-1'>
                                <p className='text-sm text-muted-foreground'>Status:</p>
                                <Badge className={cn("text-sm", getStatusClass(organ.status))}>{organ.status}</Badge>
                             </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="p-3 rounded-lg bg-muted/50">
                        <h4 className="font-semibold flex items-center gap-2 mb-2"><FileText className="h-4 w-4"/>Source of Analysis</h4>
                        <p className="text-sm text-muted-foreground">{organ.sourceOfAnalysis}</p>
                    </div>

                    {organ.relatedTests && organ.relatedTests.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2">Relevant Tests</h4>
                            <div className="space-y-2">
                                {organ.relatedTests.map((test: any, index: number) => (
                                    <div key={index} className="flex justify-between items-center p-2 rounded bg-background border">
                                        <div>
                                            <p className="font-medium text-sm">{test.name}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className='h-3 w-3'/> {format(new Date(test.date), 'dd-MMM-yyyy')}</p>
                                        </div>
                                        <Badge variant="outline" className={getTestResultBadgeClass(test.result)}>{test.result}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2"><Info className="h-4 w-4"/>Recommendations</h4>
                        <ul className="space-y-2">
                           {organ.recommendations.map((rec: string, index: number) => (
                               <li key={index} className="flex items-start gap-3">
                                   <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                                   <span className="text-sm text-muted-foreground">{rec}</span>
                               </li>
                           ))}
                        </ul>
                    </div>

                    {organ.status === 'Needs Critical Attention' && (
                         <div className="pt-4 border-t">
                            <Link href="/appointments" className="w-full">
                                <Button className="w-full" variant="destructive">
                                    <AlertCircle className="mr-2 h-4 w-4" /> Book an Appointment
                                </Button>
                            </Link>
                         </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
