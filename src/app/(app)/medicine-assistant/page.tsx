
'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { aiMedicineAssistant, AiMedicineAssistantOutput } from '@/ai/flows/ai-medicine-assistant';
import { Loader2, Sparkles, Pill, AlertTriangle, FileText } from 'lucide-react';

export default function MedicineAssistantPage() {
    const [medicineName, setMedicineName] = useState('');
    const [result, setResult] = useState<AiMedicineAssistantOutput | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!medicineName) return;

        startTransition(async () => {
            const res = await aiMedicineAssistant({ medicineName });
            setResult(res);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
             {isPending && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <Loader2 className="h-16 w-16 animate-spin mb-4" style={{color: 'hsl(var(--nav-medicines))'}} />
                    <h2 className="text-2xl font-bold">Fetching Medicine Data...</h2>
                    <p className="text-muted-foreground">Our AI is preparing the information for you.</p>
                </div>
            )}
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-medicines))'}}>AI Medicine Assistant</h1>
                <p className="text-muted-foreground">Get information about medications, dosages, and side effects.</p>
            </div>

            <Card className="overflow-hidden border-2">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Enter Medicine Name</CardTitle>
                        <CardDescription>Our AI will provide detailed information about the drug.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="e.g., Paracetamol"
                            value={medicineName}
                            onChange={(e) => setMedicineName(e.target.value)}
                            disabled={isPending}
                            className="border-2"
                        />
                    </CardContent>
                    <CardFooter className="bg-muted/30 px-6 py-4">
                        <Button type="submit" disabled={isPending || !medicineName} style={{backgroundColor: 'hsl(var(--nav-medicines))'}}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Fetching...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Get Information
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {result && !isPending && (
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-2xl" style={{color: 'hsl(var(--nav-medicines))'}}>{result.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Pill /> Dosage</h3>
                            <p className="text-muted-foreground">{result.dosage}</p>
                        </div>
                         <hr/>
                        <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><AlertTriangle /> Side Effects</h3>
                            <p className="text-muted-foreground">{result.sideEffects}</p>
                        </div>
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-6">
                           <div className="flex items-start gap-3">
                                <FileText className="h-5 w-5 text-yellow-700 mt-1"/>
                                <div>
                                    <h4 className="font-semibold text-yellow-800">Disclaimer</h4>
                                    <p className="text-sm text-yellow-700">
                                        This information is AI-generated and for informational purposes only. It is not a substitute for professional medical advice. Always consult with a qualified healthcare provider before making any decisions about your health or treatment.
                                    </p>
                                </div>
                           </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
