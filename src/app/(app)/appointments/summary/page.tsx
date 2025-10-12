
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AppointmentSummaryPage() {
    const router = useRouter();
    const [appointmentDetails, setAppointmentDetails] = useState<any>(null);

    useEffect(() => {
        const storedDetails = localStorage.getItem('appointmentDetails');
        if (storedDetails) {
            setAppointmentDetails(JSON.parse(storedDetails));
        } else {
            // router.push('/appointments');
        }
    }, [router]);

    if (!appointmentDetails) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading appointment details...</p>
            </div>
        );
    }

    const { doctor, date, time } = appointmentDetails;
    const fee = doctor.opFee * 0.5;

    return (
        <div className="bg-muted/30 min-h-screen">
            <header className="bg-background shadow-sm p-4 flex items-center gap-4 sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold">Summary</h1>
            </header>

            <main className="p-4 space-y-4 pb-28">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <Avatar className="w-20 h-20 border-2">
                                <AvatarImage src={doctor.avatar} data-ai-hint={doctor.dataAiHint} />
                                <AvatarFallback>{doctor.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Badge className="bg-blue-100 text-blue-800 mb-1">ON TIME GUARANTEE</Badge>
                                <h2 className="text-lg font-bold">{doctor.name}</h2>
                                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                <p className="text-sm text-muted-foreground">{doctor.experience} EXP • {doctor.hospital}</p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                            <p className="font-semibold text-blue-800">ONLINE CONSULT</p>
                            <div className="flex items-center gap-2 font-semibold">
                                <Calendar className="h-4 w-4" />
                                {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} | {time}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-bold text-lg">Patient's Contact Number</h3>
                        <p className="text-sm text-muted-foreground mb-2">Help us to reach you faster</p>
                        <Label htmlFor="phone">You will receive the call on:</Label>
                         <div className="relative">
                            <Input id="phone" value="+91 8008334948" readOnly className="pr-10" />
                            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-4">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input id="patientName" value="Lokesh Babu Chinta" readOnly />
                         <div className="mt-4">
                            <p className="text-sm text-muted-foreground">Consult for:</p>
                             <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-blue-500 text-white">LB</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">LOKESH BABU</p>
                                        <p className="text-sm text-muted-foreground">Male, 28</p>
                                    </div>
                                </div>
                                <Button variant="link" className="text-blue-600">Change</Button>
                            </div>
                         </div>
                    </CardContent>
                </Card>
            </main>

            <footer className="fixed bottom-0 w-full bg-background border-t p-4 flex justify-between items-center">
                 <div>
                    <p className="text-xl font-bold">₹{fee}</p>
                    <p className="text-sm text-muted-foreground">To Pay</p>
                </div>
                <Button 
                    className="h-12 px-8 text-lg" 
                    style={{backgroundColor: 'hsl(var(--nav-appointments))'}}
                    onClick={() => router.push('/opd-queue')}
                >
                    Pay & Confirm
                </Button>
            </footer>
        </div>
    );
}
