
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, HeartPulse, Pill } from 'lucide-react';
import { getAllVisits } from '@/lib/appointments-data';
import { format, isValid } from 'date-fns';

const allVisits = getAllVisits();

const healthOverviewItems = {
  totalVisits: {
    value: allVisits.length.toString(),
    label: "Total Visits",
    icon: Users,
    data: allVisits
  },
  activeConditions: {
    value: "2",
    label: "Active Conditions",
    icon: HeartPulse,
    data: [
        { condition: "Fever & Cold", since: "2024-07-15", status: "Improving" },
        { condition: "Allergic Rhinitis", since: "2024-01-01", status: "Ongoing" },
    ]
  },
  medications: {
    value: "4",
    label: "Medications",
    icon: Pill,
    data: [
        { name: "Paracetamol", dosage: "500mg", frequency: "As needed" },
        { name: "Cetirizine", dosage: "10mg", frequency: "Once a day" },
        { name: "Metformin", dosage: "1000mg", frequency: "Twice a day" },
        { name: "Vitamin D3", dosage: "60000 IU", frequency: "Once a week" },
    ]
  },
};


export function HealthOverview() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-muted/50 rounded-full">
                                    <Users className="h-6 w-6" style={{color: 'hsl(var(--nav-profile))'}} />
                                </div>
                                <p className="text-lg font-bold">Total Visits</p>
                            </div>
                            <p className="text-3xl font-extrabold">{healthOverviewItems.totalVisits.value}</p>
                        </div>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><Users />Total Visits</DialogTitle>
                        <DialogDescription>Your recent appointment history.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {healthOverviewItems.totalVisits.data.map((visit, index) => {
                            const visitDate = new Date(visit.date);
                            return (
                                <div key={index} className="p-3 border rounded-lg">
                                    <p className="font-semibold">{visit.reason}</p>
                                    <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                                    {isValid(visitDate) && (
                                        <p className="text-xs text-muted-foreground mt-1">{format(visitDate, 'dd-MMM-yyyy')}</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-muted/50 rounded-full">
                                    <HeartPulse className="h-6 w-6" style={{color: 'hsl(var(--nav-profile))'}} />
                                </div>
                                <p className="text-lg font-bold">Active Conditions</p>
                            </div>
                            <p className="text-3xl font-extrabold">{healthOverviewItems.activeConditions.value}</p>
                        </div>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><HeartPulse />Active Conditions</DialogTitle>
                        <DialogDescription>Your current health conditions.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {healthOverviewItems.activeConditions.data.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                                <div>
                                    <p className="font-semibold">{item.condition}</p>
                                    <p className="text-sm text-muted-foreground">Since: {item.since}</p>
                                </div>
                                <Badge variant="outline">{item.status}</Badge>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

                <Dialog>
                <DialogTrigger asChild>
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-muted/50 rounded-full">
                                    <Pill className="h-6 w-6" style={{color: 'hsl(var(--nav-profile))'}} />
                                </div>
                                <p className="text-lg font-bold">Medications</p>
                            </div>
                            <p className="text-3xl font-extrabold">{healthOverviewItems.medications.value}</p>
                        </div>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><Pill />Medications</DialogTitle>
                        <DialogDescription>Your current medication plan.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {healthOverviewItems.medications.data.map((med, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                                <p className="font-semibold">{med.name}</p>
                                <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
