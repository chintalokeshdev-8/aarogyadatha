
'use client';

import React, { useState, useTransition, useMemo, useRef } from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpenCheck, Heart, FileText, Utensils, AlertTriangle, Search, ShieldAlert, TestTube2, Microscope, Brain } from 'lucide-react';
import { getDiseaseInfo, DiseaseInfoOutputSchema, type DiseaseInfoOutput } from '@/ai/flows/ai-disease-info';
import { getDeepDive, DeepDiveOutput } from '@/ai/flows/ai-deep-dive';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';


const diseaseCategories = [
    "Acne", "ADHD", "Allergic Rhinitis (Hay Fever)", "Allergies", "Alzheimer's Disease", "Anemia", "Ankylosing Spondylitis", 
    "Anxiety", "Appendicitis", "Arthritis", "Asthma", "Atherosclerosis", "Atrial Fibrillation", "Autism", "Back Pain", 
    "Bacterial Vaginosis", "Bell's Palsy", "Benign Prostatic Hyperplasia (BPH)", "Bipolar Disorder", "Bladder Cancer", 
    "Blood Clots", "Bone Cancer", "Brain Tumor", "Breast Cancer", "Bronchitis", "Bulimia Nervosa", "Bursitis", "Celiac Disease", 
    "Cervical Cancer", "Cervical Spondylosis", "Chikungunya", "Chlamydia", "Cholera", "Chronic Fatigue Syndrome", 
    "Chronic Kidney Disease", "Chronic Pain", "Cirrhosis", "Cluster Headaches", "Colitis", "Colon Cancer", "Common Cold", 
    "Congestive Heart Failure", "Conjunctivitis (Pink Eye)", "COPD", "Coronary Artery Disease", "COVID-19", "Crohn's Disease", 
    "Cushing's Syndrome", "Cystic Fibrosis", "Dandruff", "Deep Vein Thrombosis (DVT)", "Dehydration", "Dementia", "Dengue Fever", 
    "Depression", "Diabetes (Type 1 & 2)", "Diabetic Ketoacidosis", "Diabetic Neuropathy", "Diabetic Retinopathy", "Diarrhea", 
    "Down Syndrome", "Dry Eye", "Dysentery", "Dyslexia", "Ear Infection", "Eating Disorders", "Eczema (Atopic Dermatitis)", 
    "Endometriosis", "Epilepsy", "Erectile Dysfunction", "Esophageal Cancer", "Fatty Liver Disease", "Fibroids", "Fibromyalgia", 
    "Fistula", "Flu (Influenza)", "Food Poisoning", "Gallstones", "Gastroenteritis", "GERD (Acid Reflux)", "Gestational Diabetes", 
    "Glaucoma", "Goiter", "Gonorrhea", "Gout", "Graves' Disease", "Guillain-Barré Syndrome", "Gum Disease", "HIV/AIDS", 
    "Hair Loss", "Hashimoto's Thyroiditis", "Heart Attack", "Heart Failure", "Hepatitis (A, B, C)", "Hernia", "Herpes", 
    "High Cholesterol", "Hives", "Hodgkin's Lymphoma", "Human Papillomavirus (HPV)", "Huntington's Disease", 
    "Hypertension (High Blood Pressure)", "Hyperthyroidism", "Hypoglycemia", "Hypothyroidism", "Impetigo", "Insomnia", 
    "Irritable Bowel Syndrome (IBS)", "Jaundice", "Kidney Cancer", "Kidney Stones", "Klinefelter Syndrome", "Lactose Intolerance", 
    "Laryngitis", "Leukemia", "Lichen Planus", "Liver Cancer", "Lung Cancer", "Lupus", "Lyme Disease", "Lymphoma", "Macular Degeneration", 
    "Malaria", "Marfan Syndrome", "Measles", "Melanoma", "Meningitis", "Menopause", "Migraine", "Miscarriage", "Mononucleosis", 
    "Multiple Myeloma", "Multiple Sclerosis", "Mumps", "Muscle Spasms", "Muscular Dystrophy", "Myasthenia Gravis", "Narcolepsy", 
    "Obsessive-Compulsive Disorder (OCD)", "Obesity", "Oral Cancer", "Osteoarthritis", "Osteomyelitis", "Osteoporosis", "Ovarian Cancer", 
    "Ovarian Cysts", "Paget's Disease of Bone", "Pancreatic Cancer", "Pancreatitis", "Panic Disorder", "Parkinson's Disease", 
    "Pelvic Inflammatory Disease (PID)", "Peptic Ulcers", "Peripheral Artery Disease (PAD)", "Periodontitis", "Pharyngitis", 
    "Piles/Hemorrhoids", "Plague", "Pleurisy", "Pneumonia", "Polio", "Polycystic Ovary Syndrome (PCOS)", "Post-Traumatic Stress Disorder (PTSD)", 
    "Preeclampsia", "Premenstrual Syndrome (PMS)", "Prostate Cancer", "Psoriasis", "Psoriatic Arthritis", "Pulmonary Embolism", 
    "Rabies", "Raynaud's Disease", "Restless Legs Syndrome", "Retinal Detachment", "Rheumatic Fever", "Rheumatoid Arthritis", 
    "Ringworm", "Rosacea", "Rubella", "Sarcoidosis", "Scabies", "Scarlet Fever", "Schizophrenia", "Sciatica", "Scoliosis", "Sepsis", 
    "Shingles", "Sickle Cell Anemia", "Sinusitis", "Sjogren's Syndrome", "Skin Cancer", "Sleep Apnea", "Smallpox", "Spina Bifida", 
    "Sprains and Strains", "Stomach Cancer", "Stomach Ulcer", "Strep Throat", "Stroke", "Syphilis", "Tay-Sachs Disease", "Tetanus", 
    "Thalassemia", "Thyroid Cancer", "Tinnitus", "Tonsillitis", "Tourette Syndrome", "Toxic Shock Syndrome", "Trichomoniasis", 
    "Tuberculosis (TB)", "Turner Syndrome", "Typhoid Fever", "Ulcerative Colitis", "Urinary Tract Infection (UTI)", "Uterine Cancer", 
    "Varicose Veins", "Vertigo", "Vitiligo", "Vitamin B12 Deficiency", "Vitamin D Deficiency", "West Nile Virus", "Whooping Cough", 
    "Wilson's Disease", "Yeast Infection", "Yellow Fever", "Zika Virus"
].sort();

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function HealthKnowledgePage() {
    const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<DiseaseInfoOutput | null>(null);
    const [isPending, startTransition] = useTransition();

    const [deepDiveQuery, setDeepDiveQuery] = useState('');
    const [deepDiveResult, setDeepDiveResult] = useState<DeepDiveOutput | null>(null);
    const [isDeepDivePending, startDeepDiveTransition] = useTransition();

    const scrollRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

    const handleDiseaseClick = (disease: string) => {
        setSelectedDisease(disease);
        setAnalysisResult(null); 
        setDeepDiveResult(null);
        setDeepDiveQuery('');
        startTransition(async () => {
            const result = await getDiseaseInfo({ diseaseName: disease });
            setAnalysisResult(result);
        });
    };

    const handleDeepDive = (query?: string) => {
        const finalQuery = query || deepDiveQuery;
        if (!selectedDisease || !finalQuery) return;
        
        startDeepDiveTransition(async () => {
            const result = await getDeepDive({ diseaseName: selectedDisease, topic: finalQuery });
            setDeepDiveResult(result);
        });
    }

    const filteredDiseases = useMemo(() => {
        let diseases = diseaseCategories;
        if (activeLetter) {
            diseases = diseases.filter(disease => 
                disease.toUpperCase().startsWith(activeLetter)
            );
        }
        if (searchTerm) {
            diseases = diseases.filter(disease =>
                disease.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return diseases;
    }, [searchTerm, activeLetter]);

    const handleLetterClick = (letter: string) => {
        const newActiveLetter = activeLetter === letter ? null : letter;
        setActiveLetter(newActiveLetter);
        setSearchTerm(''); // Reset search term when a letter is clicked
    };

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
                        <div className="relative mb-2">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search diseases..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setActiveLetter(null); // Reset letter filter when searching
                                }}
                            />
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                            {alphabet.map(letter => (
                                <Button
                                    key={letter}
                                    variant={activeLetter === letter ? "default" : "outline"}
                                    size="icon"
                                    className="h-7 w-7 text-xs"
                                    style={activeLetter === letter ? {backgroundColor: 'hsl(var(--nav-profile))'} : {}}
                                    onClick={() => handleLetterClick(letter)}
                                >
                                    {letter}
                                </Button>
                            ))}
                        </div>
                        <ScrollArea className="h-[50vh] lg:h-[45vh]">
                            <div className="flex flex-wrap gap-2 pr-4">
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
                    <>
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
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Microscope className="h-5 w-5"/>Recommended Tests</h3>
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

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2" style={{color: 'hsl(var(--nav-profile))'}}><Sparkles /> Deep Dive Analysis</CardTitle>
                             <CardDescription>Ask for more detailed information on specific aspects of {selectedDisease}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="e.g., 'deep diet' or 'treatment options'"
                                    value={deepDiveQuery}
                                    onChange={(e) => setDeepDiveQuery(e.target.value)}
                                />
                                <Button onClick={() => handleDeepDive()} disabled={isDeepDivePending || !deepDiveQuery}>
                                    {isDeepDivePending ? <Loader2 className='h-4 w-4 animate-spin'/> : <Search className="h-4 w-4" />}
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Button variant="outline" size="sm" onClick={() => handleDeepDive("Deep Diet Plan")}>Deep Diet</Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeepDive("Deep Diagnostic Tests")}>Deep Tests</Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeepDive("Deep Organ Damage Details")}>Affected Organs</Button>
                            </div>

                            {isDeepDivePending && (
                                <div className="mt-4 flex items-center justify-center p-6">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" style={{color: 'hsl(var(--nav-profile))'}}/>
                                </div>
                            )}

                            {deepDiveResult && !isDeepDivePending && (
                                <div className="mt-6 space-y-4">
                                    <Separator />
                                    <h4 className="font-bold text-lg">{deepDiveResult.topic} for {selectedDisease}</h4>
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                                        {deepDiveResult.details.split('\n').map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    </>
                )}
            </div>
        </div>
    );
}
