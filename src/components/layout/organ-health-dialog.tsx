
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from '@/lib/utils';
import Image from 'next/image';

const CircularProgress = dynamic(() => Promise.resolve(function CircularProgress({ percentage, children, size = 100, strokeWidth = 8, color } : { percentage: number, children: React.ReactNode, size?: number, strokeWidth?: number, color?: string }) {
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
}), { ssr: false });


const getTrendIcon = (trend: 'stable' | 'improving' | 'declining') => {
    switch(trend) {
        case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
        case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
        default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
}

export function OrganHealthDialog({ organ, children }: { organ: any, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <CircularProgress percentage={organ.health} size={60} strokeWidth={5} color={organ.color}>
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
                             <DialogDescription>
                                Overall health score: <span className="font-bold" style={{color: organ.color}}>{organ.health}%</span>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <h3 className="font-semibold text-lg">Key Factors from Recent Reports</h3>
                    
                    {organ.details.abnormal.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-semibold text-destructive flex items-center gap-2"><AlertCircle className="h-4 w-4"/> Abnormal Findings</h4>
                            {organ.details.abnormal.map((item: any, index: number) => (
                                <div key={index} className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800/30">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{item.name}</p>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(item.trend)}
                                            <Badge variant="destructive">{item.value}</Badge>
                                        </div>
                                    </div>
                                    <p className="text-sm text-red-700 dark:text-red-400/80 mt-1">{item.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Normal: {item.normalRange}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {organ.details.normal.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-semibold text-green-600 flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> Normal Findings</h4>
                             {organ.details.normal.map((item: any, index: number) => (
                                <div key={index} className="p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800/30">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{item.name}</p>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(item.trend)}
                                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">{item.value}</Badge>
                                        </div>
                                    </div>
                                     <p className="text-xs text-muted-foreground mt-1">Normal: {item.normalRange}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
