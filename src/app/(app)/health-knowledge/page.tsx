
'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpenCheck, Heart, Brain, Bone, Leaf, Droplets, Wind, User, Baby, Smile, Eye, Stethoscope, FileText, Utensils, AlertTriangle, Search, ShieldAlert } from 'lucide-react';
import { getDiseaseInfo, DiseaseInfoOutput } from '@/ai/flows/ai-disease-info';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const diseaseCategories = [
    "Acne", "Allergies", "Alzheimer's", "Anemia", "Anxiety", "Appendicitis", "Arthritis", "Asthma",
    "Back Pain", "Blood Pressure", "Bronchitis", "Cancer", "Cataract", "Cholesterol", "Cirrhosis",
    "Common Cold", "COPD", "COVID-19", "Dandruff", "Dengue Fever", "Depression", "Diabetes", "Diarrhea",
    "Eczema", "Epilepsy", "Fatty Liver", "Fibromyalgia", "Flu (Influenza)", "Food Poisoning", "Gallstones",
    "GERD (Acid Reflux)", "Glaucoma", "Gout", "Hair Loss", "Headache", "Heart Attack", "Hepatitis",
    "Hernia", "Herpes", "HIV/AIDS", "Hypothyroidism", "Hyperthyroidism", "IBS", "Insomnia",
    "Jaundice", "Kidney Stones", "Leukemia", "Lung Cancer", "Lupus", "Malaria", "Measles", "Meningitis",
    "Migraine", "Multiple Sclerosis", "Obesity", "Osteoporosis", "Pancreatitis", "Parkinson's",
    "Piles (Hemorrhoids)", "Pneumonia", "Polio", "Psoriasis", "Rabies", "Rheumatoid Arthritis",
    "Sinusitis", "Skin Cancer", "Stroke", "Tonsillitis", "Tuberculosis", "Typhoid", "Ulcers",
    "UTI", "Varicose Veins", "Vertigo", "Vitamin D Deficiency", "Whooping Cough"
];


export default function HealthKnowledgePage() {
    const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [analysisResult, setAnalysisResult] = useState<DiseaseInfoOutput | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDiseaseClick = (disease: string) => {
        setSelectedDisease(disease);
        setAnalysisResult(null); 
        startTransition(async () => {
            const result = await getDiseaseInfo({ diseaseName: disease });
            setAnalysisResult(result);
        });
    };

    const filteredDiseases = useMemo(() => {
        return diseaseCategories.filter(disease =>
            disease.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2" style={{color: 'hsl(var(--nav-profile))'}}>
                            <BookOpenCheck /> Health Encyclopedia
                        </CardTitle>
                        <CardDescription>Select a topic to learn more.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-4">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search diseases..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="h-[60vh]">
                            <div className="flex flex-wrap gap-2">
                                {filteredDiseases.map((disease) => (
                                    <Button
                                        key={disease}
                                        variant={selectedDisease === disease ? "default" : "outline"}
                                        size="sm"
                                        className={cn("text-xs h-auto py-1 px-2", selectedDisease === disease ? "bg-primary" : "")}
                                        style={selectedDisease === disease ? {backgroundColor: 'hsl(var(--nav-profile))'} : {}}
                                        onClick={() => handleDiseaseClick(disease)}
                                        disabled={isPending && selectedDisease === disease}
                                    >
                                        {isPending && selectedDisease === disease ? <Loader2 className="mr-2 h-3 w-3 animate-spin"/> : null}
                                        {disease}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
                {isPending && (
                    <Card className="flex flex-col items-center justify-center p-8 min-h-[50vh]">
                        <Loader2 className="h-12 w-12 animate-spin mb-4" style={{ color: 'hsl(var(--nav-profile))' }} />
                        <h2 className="text-xl font-bold">Loading information for {selectedDisease}...</h2>
                        <p className="text-muted-foreground">Our AI is preparing the data for you.</p>
                    </Card>
                )}

                {!selectedDisease && !isPending && (
                    <Card className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
                        <BookOpenCheck className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-bold">Welcome to the Health Encyclopedia</h2>
                        <p className="text-muted-foreground">Select a disease from the list to get started.</p>
                    </Card>
                )}

                {analysisResult && !isPending && selectedDisease && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold" style={{color: 'hsl(var(--nav-profile))'}}>{selectedDisease}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><FileText className="h-5 w-5"/>Summary</h3>
                                <p className="text-muted-foreground">{analysisResult.summary}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Heart className="h-5 w-5"/>Common Symptoms</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {analysisResult.symptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Utensils className="h-5 w-5"/>Recommended Diet</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {analysisResult.recommendedDiet.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Stethoscope className="h-5 w-5"/>Recommended Tests</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {analysisResult.recommendedTests.map((test, index) => <li key={index}>{test}</li>)}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><ShieldAlert className="h-5 w-5"/>Affected Organs (If Neglected)</h3>
                                <p className="text-muted-foreground">{analysisResult.affectedOrgans}</p>
                            </div>

                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Disclaimer</AlertTitle>
                                <AlertDescription>
                                    This AI-generated information is for educational purposes only. It is not a substitute for professional medical advice. Always consult a qualified doctor for diagnosis and treatment.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
