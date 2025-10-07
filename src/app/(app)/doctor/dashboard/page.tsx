
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, Calendar, Clock, FileText, Filter, Users, Video } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ChartContainer = dynamic(() => import('@/components/ui/chart').then(mod => mod.ChartContainer), { ssr: false, loading: () => <Skeleton className="h-[200px] w-full" /> });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const ChartTooltip = dynamic(() => import('@/components/ui/chart').then(mod => mod.ChartTooltip), { ssr: false });
const ChartTooltipContent = dynamic(() => import('@/components/ui/chart').then(mod => mod.ChartTooltipContent), { ssr: false });


const doctor = {
    name: "Dr. Ramesh Babu",
    specialty: "Nephrologist",
    avatar: "https://picsum.photos/seed/doc8/100/100",
    dataAiHint: "male doctor professional",
};

const stats = [
    { title: "Today's Appointments", value: 12, icon: Calendar },
    { title: "Total Patients", value: 480, icon: Users },
    { title: "Pending Reports", value: 4, icon: FileText },
];

const appointments = [
    { time: "10:00 AM", patient: "Chinta Lokesh Babu", type: "Follow-up", status: "Confirmed" },
    { time: "10:20 AM", patient: "Venkatesh", type: "New Patient", status: "Confirmed" },
    { time: "10:40 AM", patient: "Surya", type: "Follow-up", status: "Waiting" },
    { time: "11:00 AM", patient: "Pavan", type: "New Patient", status: "Waiting" },
    { time: "11:20 AM", patient: "K. Srinivas", type: "Follow-up", status: "Waiting" },
];

const queue = [
    { token: 19, name: "Bala Krishna", status: "Consulting" },
    { token: 20, name: "Ashok Kumar", status: "Waiting" },
    { token: 21, name: "Sreenu", status: "You are next" },
    { token: 22, name: "Sathyam", status: "Waiting" },
];

const chartData = [
  { day: "Mon", appointments: 18 },
  { day: "Tue", appointments: 22 },
  { day: "Wed", appointments: 25 },
  { day: "Thu", appointments: 19 },
  { day: "Fri", appointments: 23 },
  { day: "Sat", appointments: 28 },
  { day: "Sun", appointments: 15 },
];

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "hsl(var(--primary))",
  },
};

export default function DoctorDashboardPage() {
    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.avatar} data-ai-hint={doctor.dataAiHint} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {doctor.name}</h1>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Button><Bell className="mr-2 h-4 w-4" /> View Alerts</Button>
                </div>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Today's Appointments</CardTitle>
                        <CardDescription>You have {appointments.length} appointments scheduled for today.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appt, index) => (
                                    <TableRow key={index} className={appt.patient === 'Chinta Lokesh Babu' ? 'bg-primary/10' : ''}>
                                        <TableCell className="font-semibold">{appt.time}</TableCell>
                                        <TableCell>{appt.patient}</TableCell>
                                        <TableCell>
                                            <Badge variant={appt.type === 'Follow-up' ? 'secondary' : 'outline'}>{appt.type}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon"><Video className="h-5 w-5 text-primary" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Live Patient Queue</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {queue.map(patient => (
                            <div key={patient.token} className={`flex items-center justify-between p-3 rounded-lg ${patient.status === 'You are next' ? 'bg-primary/10 border-primary border' : 'bg-muted/40'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold text-lg ${patient.status === 'You are next' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                                        {patient.token}
                                    </div>
                                    <p className="font-semibold">{patient.name}</p>
                                </div>
                                <Badge variant={patient.status === 'Consulting' ? 'default' : 'outline'}
                                    className={patient.status === 'You are next' ? 'border-primary text-primary' : ''}
                                >
                                    {patient.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Analytics</CardTitle>
                    <CardDescription>A look at your consultation numbers for the past week.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="appointments" fill="var(--color-appointments)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    );
}
