
'use client';

import React, { useState, useTransition, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDiseaseInfo, DiseaseInfoOutput } from '@/ai/flows/ai-disease-info';
import { Loader2, Mic, Sparkles, Search, AlertTriangle, CheckCircle2, Globe, Heart, Utensils, FileText, Microscope, Stethoscope, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const commonTopics = [
    { english: "Fever", telugu: "జ్వరం" },
    { english: "Headache", telugu: "తలనొప్పి" },
    { english: "Cough", telugu: "దగ్గు" },
    { english: "Diabetes", telugu: "మధుమేహం" },
    { english: "Hypertension", telugu: "అధిక రక్తపోటు" },
    { english: "Stomach Pain", telugu: "కడుపునొప్పి" },
    { english: "Skin Rash", telugu: "చర్మపు దద్దుర్లు" },
    { english: "Acne", telugu: "మొటిమలు" },
    { english: "Back Pain", telugu: "వీపు నొప్పి" },
    { english: "Dengue", telugu: "డెంగ్యూ" },
    { english: "Typhoid", telugu: "టైఫాయిడ్" },
    { english: "Malaria", telugu: "మలేరియా" },
];

export default function SymptomCheckerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [analysis, setAnalysis] = useState<DiseaseInfoOutput | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState<'en' | 'te'>('en');
    
    const recognitionRef = useRef<any>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const translations = {
        en: {
            title: "AI Health Library",
            description: "Describe symptoms or search for a health condition to get AI-powered information.",
            searchPlaceholder: "e.g., 'fever and headache' or 'Diabetes'",
            commonTopics: "Common Topics",
            getAnalysis: "Get AI Analysis",
            analyzing: "Analyzing...",
            analysisResult: "AI Analysis Result",
            nextSteps: "Next Steps",
            bookAppointment: "Book an Appointment",
            specialistRec: "Based on the analysis, consider booking an appointment with a",
            disclaimerTitle: "Disclaimer",
            disclaimerText: "This is for informational purposes only, not a medical diagnosis. Always consult a doctor.",
            summary: "Summary",
            initialAnalysis: "Initial Analysis",
            symptoms: "Symptoms",
            firstAid: "Suggested First Aid",
            diet: "Recommended Diet",
            tests: "Recommended Tests",
            affectedOrgans: "Affected Organs",
            specialist: "Recommended Specialist",
            language: "తెలుగు"
        },
        te: {
            title: "AI హెల్త్ లైబ్రరీ",
            description: "AI-ఆధారిత సమాచారం పొందడానికి లక్షణాలను వివరించండి లేదా ఆరోగ్య పరిస్థితి కోసం శోధించండి.",
            searchPlaceholder: "ఉదా., 'జ్వరం మరియు తలనొప్పి' లేదా 'డయాబెటిస్'",
            commonTopics: "సాధారణ అంశాలు",
            getAnalysis: "AI విశ్లేషణ పొందండి",
            analyzing: "విశ్లేషిస్తోంది...",
            analysisResult: "AI విశ్లేషణ ఫలితం",
            nextSteps: "తదుపరి చర్యలు",
            bookAppointment: "అపాయింట్‌మెంట్ బుక్ చేసుకోండి",
            specialistRec: "విశ్లేషణ ఆధారంగా, ఒకరితో అపాయింట్‌మెంట్ బుక్ చేసుకోవడాన్ని పరిగణించండి",
            disclaimerTitle: "గమనిక",
            disclaimerText: "ఇది సమాచార ప్రయోజనాల కోసం మాత్రమే, వైద్య నిర్ధారణ కాదు. ఎల్లప్పుడూ వైద్యుడిని సంప్రదించండి.",
            summary: "సారాంశం",
            initialAnalysis: "ప్రారంభ విశ్లేషణ",
            symptoms: "లక్షణాలు",
            firstAid: "సూచించబడిన ప్రథమ చికిత్స",
            diet: "సిఫార్సు చేయబడిన ఆహారం",
            tests: "సిఫార్సు చేయబడిన పరీక్షలు",
            affectedOrgans: "ప్రభావిత అవయవాలు",
            specialist: "సిఫార్సు చేయబడిన నిపుణులు",
            language: "English"
        }
    };

    const t = translations[language];

    useEffect(() => {
        // Speech recognition setup
    }, []);

    const handleSearch = (term: string) => {
        if (!term) return;
        setSearchTerm(term);

        startTransition(async () => {
            setAnalysis(null);
            const result = await getDiseaseInfo({ diseaseName: term, language });
            setAnalysis(result);
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });
    };
    
    const handleTopicClick = (topic: string) => {
        handleSearch(topic);
    };

    const getSectionTitle = (key: string, isDisease: boolean) => {
        if (key === 'summary') return t.summary;
        if (key === 'symptoms' && !isDisease) return t.firstAid;
        if (key === 'symptoms' && isDisease) return t.symptoms;
        if (key === 'recommendedDiet') return t.diet;
        if (key === 'recommendedTests') return t.tests;
        if (key === 'affectedOrgans') return t.affectedOrgans;
        if (key === 'recommendedSpecialist') return t.specialist;
        return key;
    };
    
    const getSectionIcon = (key: string) => {
        switch(key) {
            case 'summary': return <Heart className="h-5 w-5"/>;
            case 'symptoms': return <Stethoscope className="h-5 w-5"/>;
            case 'recommendedDiet': return <Utensils className="h-5 w-5"/>;
            case 'recommendedTests': return <Microscope className="h-5 w-5"/>;
            case 'affectedOrgans': return <AlertTriangle className="h-5 w-5"/>;
            case 'recommendedSpecialist': return <User className="h-5 w-5"/>;
            default: return <Sparkles className="h-5 w-5"/>;
        }
    };


    return (
        <div className="space-y-6">
            {isPending && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <Loader2 className="h-16 w-16 animate-spin mb-4" style={{color: 'hsl(var(--nav-symptoms))'}} />
                    <h2 className="text-2xl font-bold">{t.analyzing}</h2>
                </div>
            )}
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-symptoms))'}}>{t.title}</h1>
                <p className="text-muted-foreground mt-2">{t.description}</p>
            </div>
            
            <Card className="border sticky top-16 z-10">
                <CardContent className="p-4 space-y-4">
                    <div className="relative">
                        <Textarea 
                            placeholder={t.searchPlaceholder}
                            className="min-h-[80px] pr-24 text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch(searchTerm); }}}
                        />
                        <div className='absolute top-2 right-2 flex flex-col gap-2'>
                            <Button variant="ghost" size="icon" onClick={() => {}}>
                                 <Mic className={cn("h-5 w-5", isListening ? "text-destructive animation-blink" : "")} style={{color: 'hsl(var(--nav-symptoms))'}}/>
                            </Button>
                        </div>
                    </div>
                     <Button onClick={() => handleSearch(searchTerm)} disabled={isPending || !searchTerm.trim()} className="w-full h-11 text-base">
                        {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                        {t.getAnalysis}
                    </Button>
                </CardContent>
            </Card>
            
            <Card className="border">
                 <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>{t.commonTopics}</CardTitle>
                    </div>
                    <Button variant="outline" onClick={() => setLanguage(lang => lang === 'en' ? 'te' : 'en')} className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t.language}
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {commonTopics.map(topic => (
                        <Button
                            key={topic.english}
                            variant="outline"
                            size="sm"
                            className="h-auto"
                            onClick={() => handleTopicClick(language === 'en' ? topic.english : topic.telugu)}
                        >
                            <div className="text-center p-1">
                                <p className="font-semibold text-sm">{language === 'en' ? topic.english : topic.telugu}</p>
                            </div>
                        </Button>
                    ))}
                </CardContent>
            </Card>

            <div ref={resultsRef}>
            {analysis && !isPending && (
                <Card className="border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2" style={{color: 'hsl(var(--nav-symptoms))'}}>
                            <Sparkles /> {t.analysisResult}: {analysis.diseaseName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {Object.entries(analysis).map(([key, value]) => {
                            if (['isDisease', 'diseaseName'].includes(key) || !value || (Array.isArray(value) && value.length === 0)) return null;

                            const sectionTitle = getSectionTitle(key, analysis.isDisease);
                            const icon = getSectionIcon(key);

                            return (
                                <div key={key}>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2" style={{color: 'hsl(var(--nav-symptoms))'}}>
                                         {icon} {sectionTitle}
                                    </h3>
                                    {Array.isArray(value) ? (
                                        <ul className="space-y-2">
                                            {(value as string[]).map((point, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">{value.toString()}</p>
                                    )}
                                </div>
                            );
                        })}
                    </CardContent>
                    {!analysis.isDisease && analysis.recommendedSpecialist && (
                        <CardFooter className="flex-col items-start gap-4 bg-muted/40 p-4">
                            <div>
                                <h4 className="font-semibold">{t.nextSteps}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t.specialistRec} <span className="font-bold" style={{color: 'hsl(var(--nav-symptoms))'}}>{analysis.recommendedSpecialist}</span>.
                                </p>
                            </div>
                            <Link href="/appointments" className="w-full">
                                <Button className="w-full" style={{backgroundColor: 'hsl(var(--nav-symptoms))'}}>
                                   {t.bookAppointment}
                                </Button>
                            </Link>
                        </CardFooter>
                    )}
                </Card>
            )}
            </div>

            <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/40 border">
                <CardContent className="p-4 flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-yellow-800 dark:text-yellow-300">{t.disclaimerTitle}</h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400/80 mt-1">
                           {t.disclaimerText}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
