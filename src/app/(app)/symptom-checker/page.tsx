
'use client';

import React, { useState, useTransition, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { analyzeSymptoms, SymptomAnalysisOutput } from '@/ai/flows/ai-symptom-check';
import { Loader2, Mic, Sparkles, Search, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const commonSymptoms = [
    { english: "Fever", telugu: "జ్వరం" },
    { english: "Headache", telugu: "తలనొప్పి" },
    { english: "Cough", telugu: "దగ్గు" },
    { english: "Cold", telugu: "జలుబు" },
    { english: "Stomach Pain", telugu: "కడుపునొప్పి" },
    { english: "Vomiting", telugu: "వాంతులు" },
    { english: "Body Pain", telugu: "శరీర నొప్పులు" },
    { english: "Breathing Issues", telugu: "శ్వాస సమస్య" },
    { english: "Chest Pain", telugu: "ఛాతీ నొప్పి" },
    { english: "Dizziness", telugu: "తల తిరుగుట" },
    { english: "Diarrhea", telugu: "విరేచనాలు" },
    { english: "Sore Throat", telugu: "గొంతు నొప్పి" },
    { english: "Fatigue", telugu: "అలసట" },
    { english: "Nausea", telugu: "వికారం" },
    { english: "Skin Rash", telugu: "చర్మపు దద్దుర్లు" },
    { english: "Muscle Pain", telugu: "కండరాల నొప్పి" },
];

export default function SymptomCheckerPage() {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [customSymptom, setCustomSymptom] = useState('');
    const [analysis, setAnalysis] = useState<SymptomAnalysisOutput | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isListening, setIsListening] = useState(false);
    
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onresult = (event) => {
                    let interimTranscript = '';
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    }
                    setCustomSymptom(prev => prev + finalTranscript);
                };

                recognition.onstart = () => {
                    setIsListening(true);
                };

                recognition.onend = () => {
                    setIsListening(false);
                };
                
                recognitionRef.current = recognition;
            } else {
                console.log("Speech Recognition not supported");
            }
        }
    }, []);

    const handleMicClick = () => {
        const recognition = recognitionRef.current;
        if (recognition) {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        }
    };


    const handleSymptomClick = (symptom: string) => {
        setSelectedSymptoms(prev => 
            prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
        );
    };

    const handleSubmit = async () => {
        const allSymptoms = [...selectedSymptoms, customSymptom].filter(s => s.trim() !== '').join(', ');
        if (!allSymptoms) {
            return;
        }

        startTransition(async () => {
            const result = await analyzeSymptoms({ symptoms: allSymptoms });
            setAnalysis(result);
        });
    };

    const getIconForTitle = (title: string) => {
        if (title.toLowerCase().includes('first aid')) return <Sparkles className="h-5 w-5" />;
        if (title.toLowerCase().includes('diet')) return <Sparkles className="h-5 w-5" />;
        if (title.toLowerCase().includes('tests')) return <Sparkles className="h-5 w-5" />;
        return <Sparkles className="h-5 w-5" />;
    }

    return (
        <div className="space-y-8">
            {isPending && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <Loader2 className="h-16 w-16 animate-spin mb-4" style={{color: 'hsl(var(--nav-symptoms))'}} />
                    <h2 className="text-2xl font-bold">Analyzing your symptoms...</h2>
                    <p className="text-muted-foreground">Our AI is working on it. This may take a moment.</p>
                </div>
            )}
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-symptoms))'}}>AI Symptom Checker</h1>
                <p className="text-muted-foreground mt-2">Describe your symptoms to get intelligent health guidance.</p>
            </div>
            
            <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/40">
                <CardContent className="p-4 flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-yellow-800 dark:text-yellow-300">Disclaimer (గమనిక)</h3>
                        <div className="text-sm text-yellow-700 dark:text-yellow-400/80 space-y-1 mt-1">
                           <p>This is for first-aid guidance only, not a medical diagnosis. Always consult a doctor.</p>
                           <p>ఇది ప్రథమ చికిత్స కోసం మాత్రమే, వైద్య నిర్ధారణ కాదు. ఎల్లప్పుడూ వైద్యుడిని సంప్రదించండి.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>1. Select Common Symptoms</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {commonSymptoms.map(symptom => (
                        <div
                            key={symptom.english}
                            onClick={() => handleSymptomClick(symptom.english)}
                            className={cn(
                                "cursor-pointer transition-all rounded-lg p-2 text-center border-2",
                                selectedSymptoms.includes(symptom.english) ? 'border-green-500 bg-green-500/10' : 'bg-muted/40 border-input hover:border-muted-foreground/20'
                            )}
                        >
                            <p className="font-semibold text-sm">{symptom.english}</p>
                            <p className="text-muted-foreground text-xs">{symptom.telugu}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>2. Describe Your Symptoms in Detail</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <Label htmlFor="custom-symptoms">Use the box below to add more details. You can type in English or Telugu.</Label>
                    <div className="relative">
                        <Textarea 
                            id="custom-symptoms"
                            placeholder="e.g., I have a mild fever and a dry cough since yesterday morning. I also feel tired." 
                            className="min-h-[120px] pr-12"
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                        />
                        <Button variant="ghost" size="icon" onClick={handleMicClick} className="absolute top-2 right-2">
                             <Mic className={cn("h-5 w-5", isListening ? "text-destructive animation-blink" : "text-primary")} style={isListening ? {} : {color: 'hsl(var(--nav-symptoms))'}}/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            

            {analysis && !isPending && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2" style={{color: 'hsl(var(--nav-symptoms))'}}>
                            <Sparkles /> AI Analysis Result
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {analysis.analysis.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2" style={{color: section.title.toLowerCase().includes('disclaimer') ? 'hsl(var(--destructive))' : 'hsl(var(--nav-symptoms))'}}>
                                     {section.title.toLowerCase().includes('disclaimer') ? <AlertTriangle/> : getIconForTitle(section.title)}
                                     {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
                                            <span className="text-muted-foreground">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4 bg-muted/40 p-4">
                         <div>
                            <h4 className="font-semibold">Next Steps</h4>
                            <p className="text-sm text-muted-foreground">
                                Based on the analysis, consider booking an appointment with a <span className="font-bold" style={{color: 'hsl(var(--nav-symptoms))'}}>{analysis.recommendedSpecialist}</span>.
                            </p>
                         </div>
                         <Link href="/appointments" className="w-full">
                            <Button className="w-full" style={{backgroundColor: 'hsl(var(--nav-symptoms))'}} disabled={isPending}>
                               {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : 'Book an Appointment'}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            )}

            <div className="p-4 sticky bottom-20">
                    <Button onClick={handleSubmit} disabled={isPending || (selectedSymptoms.length === 0 && customSymptom.trim() === '')} className="w-full h-12 text-lg font-bold" style={{backgroundColor: 'hsl(var(--nav-symptoms))'}}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                            <>
                            <Search className="mr-2 h-5 w-5" />
                            GET AI ANALYSIS ({selectedSymptoms.length + (customSymptom.trim() ? 1 : 0)})
                            </>
                    )}
                </Button>
            </div>
        </div>
    );
}
