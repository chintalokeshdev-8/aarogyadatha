
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaymentOptionsPage() {
    const router = useRouter();
    const [appointmentDetails, setAppointmentDetails] = useState<any>(null);

    useEffect(() => {
        const storedDetails = localStorage.getItem('appointmentDetails');
        if (storedDetails) {
            setAppointmentDetails(JSON.parse(storedDetails));
        }
    }, []);

    const fee = appointmentDetails?.doctor?.opFee * 0.5 || 0;

    const handlePayment = () => {
        // Here you would integrate with a real payment gateway
        // For now, we'll just simulate success and navigate
        router.push('/opd-queue');
    };

    return (
        <div className="bg-muted/30 min-h-screen">
            <header className="bg-background shadow-sm p-4 flex items-center gap-4 sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-lg font-bold">Payment Options</h1>
                    <p className="text-sm font-semibold" style={{ color: 'hsl(var(--nav-appointments))' }}>₹{fee}</p>
                </div>
            </header>

            <main className="p-4 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">UPI Apps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_logo.svg/2560px-Google_Pay_logo.svg.png" width={48} height={24} alt="Google Pay" data-ai-hint="google pay logo" className="h-6 object-contain"/>
                                <span className="font-semibold">Google Pay</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                               <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/2560px-PhonePe_Logo.svg.png" width={48} height={24} alt="PhonePe" data-ai-hint="phonepe logo" className="h-6 object-contain"/>
                                <span className="font-semibold">PhonePe</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Paytm_Logo.svg/2560px-Paytm_Logo.svg.png" width={48} height={24} alt="Paytm" data-ai-hint="paytm logo" className="h-6 object-contain"/>
                                <span className="font-semibold">Paytm</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                         <button className="w-full flex items-center p-3 hover:bg-muted/50 rounded-lg text-left">
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-full border-2 border-dashed border-red-500 flex items-center justify-center">
                                    <PlusCircle className="h-5 w-5 text-red-500"/>
                                </div>
                                <div>
                                    <span className="font-semibold text-red-600">Add New UPI ID</span>
                                    <p className="text-xs text-muted-foreground">You need to have a registered UPI ID</p>
                                </div>
                            </div>
                        </button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Credit/Debit Cards</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <button className="w-full flex items-center p-3 hover:bg-muted/50 rounded-lg text-left">
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-full border-2 border-dashed border-red-500 flex items-center justify-center">
                                    <PlusCircle className="h-5 w-5 text-red-500"/>
                                </div>
                                <div>
                                    <span className="font-semibold text-red-600">Add New Card</span>
                                    <p className="text-xs text-muted-foreground">Save and Pay via Cards</p>
                                </div>
                            </div>
                        </button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
