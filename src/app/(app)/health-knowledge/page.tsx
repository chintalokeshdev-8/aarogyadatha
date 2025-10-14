
'use client';

import React, { useState, useTransition, useMemo, useRef } from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpenCheck, Heart, FileText, Utensils, AlertTriangle, Search, ShieldAlert, TestTube2, Microscope, Brain, Globe } from 'lucide-react';
import { getDiseaseInfo } from '@/ai/flows/ai-disease-info';
import { getDeepDive } from '@/ai/flows/ai-deep-dive';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const DiseaseInfoOutputSchema = z.object({
  summary: z.string().describe("A simple, easy-to-understand summary of the disease."),
  symptoms: z.array(z.string()).describe("A list of common symptoms associated with the disease."),
  recommendedDiet: z.array(z.string()).describe("A list of recommended dietary habits or specific foods."),
  recommendedTests: z.array(z.string()).describe("A list of diagnostic tests a doctor might recommend."),
  affectedOrgans: z.string().describe("A summary of organs that may be damaged if the condition is neglected."),
});
export type DiseaseInfoOutput = z.infer<typeof DiseaseInfoOutputSchema>;

const DeepDiveOutputSchema = z.object({
  topic: z.string().describe("The specific topic that was analyzed."),
  details: z.string().describe("A detailed, in-depth explanation of the requested topic related to the disease. Formatted as a single string with newline characters for paragraphs."),
});
export type DeepDiveOutput = z.infer<typeof DeepDiveOutputSchema>;


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

const translations = {
    en: {
        title: "Health Library",
        description: "Look up health conditions from A-Z.",
        searchPlaceholder: "Search diseases...",
        welcomeTitle: "Welcome to the Health Library",
        welcomeDescription: "Select a health topic from the list to get started.",
        loading: "Loading information for",
        loadingSub: "Our AI is preparing the data for you.",
        summary: "Summary",
        symptoms: "Common Symptoms",
        diet: "Recommended Diet",
        tests: "Recommended Tests",
        organs: "Affected Organs (If Neglected)",
        disclaimerTitle: "Disclaimer",
        disclaimerText: "This AI-generated information is for educational purposes only. It is not a substitute for professional medical advice. Always consult a qualified doctor for diagnosis and treatment.",
        deepDiveTitle: "Deep Dive Analysis",
        deepDiveDescription: "Ask for more detailed information on specific aspects of",
        deepDivePlaceholder: "e.g., 'deep diet' or 'treatment options'",
        deepDiveButton: "Search",
        deepDiveTopicDiet: "Deep Diet",
        deepDiveTopicTests: "Deep Tests",
        deepDiveTopicOrgans: "Affected Organs",
        deepDiveLoading: "The AI is analyzing your request...",
        translateButton: "Translate to Telugu",
    },
    te: {
        title: "ఆరోగ్య గ్రంథాలయం",
        description: "A-Z వరకు ఆరోగ్య పరిస్థితులను చూడండి.",
        searchPlaceholder: "వ్యాధులను శోధించండి...",
        welcomeTitle: "ఆరోగ్య గ్రంథాలయానికి స్వాగతం",
        welcomeDescription: "ప్రారంభించడానికి జాబితా నుండి ఆరోగ్య అంశాన్ని ఎంచుకోండి.",
        loading: "సమాచారం లోడ్ అవుతోంది",
        loadingSub: "మా AI మీ కోసం డేటాను సిద్ధం చేస్తోంది.",
        summary: "సారాంశం",
        symptoms: "సాధారణ లక్షణాలు",
        diet: "సిఫార్సు చేయబడిన ఆహారం",
        tests: "సిఫార్సు చేయబడిన పరీక్షలు",
        organs: "ప్రభావిత అవయవాలు (నిర్లక్ష్యం చేస్తే)",
        disclaimerTitle: "నిరాకరణ",
        disclaimerText: "ఈ AI- రూపొందించిన సమాచారం విద్యా ప్రయోజనాల కోసం మాత్రమే. ఇది వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. రోగ నిర్ధారణ మరియు చికిత్స కోసం ఎల్లప్పుడూ అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.",
        deepDiveTitle: "లోతైన విశ్లేషణ",
        deepDiveDescription: "యొక్క నిర్దిష్ట అంశాలపై మరింత వివరమైన సమాచారం కోసం అడగండి",
        deepDivePlaceholder: "ఉదా., 'లోతైన ఆహారం' లేదా 'చికిత్స ఎంపికలు'",
        deepDiveButton: "వెతకండి",
        deepDiveTopicDiet: "లోతైన ఆహారం",
        deepDiveTopicTests: "లోతైన పరీక్షలు",
        deepDiveTopicOrgans: "ప్రభావిత అవయవాలు",
        deepDiveLoading: "AI మీ అభ్యర్థనను విశ్లేషిస్తోంది...",
        translateButton: "Translate to English",
    }
};

export default function HealthKnowledgePage() {
    const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<DiseaseInfoOutput | null>(null);
    const [isPending, startTransition] = useTransition();
    const [language, setLanguage] = useState<'en' | 'te'>('en');

    const [deepDiveQuery, setDeepDiveQuery] = useState('');
    const [deepDiveResult, setDeepDiveResult] = useState<DeepDiveOutput | null>(null);
    const [isDeepDivePending, startDeepDiveTransition] = useTransition();
    
    const t = translations[language];

    const handleDiseaseClick = (disease: string) => {
        setSelectedDisease(disease);
        setAnalysisResult(null); 
        setDeepDiveResult(null);
        setDeepDiveQuery('');
        startTransition(async () => {
            const result = await getDiseaseInfo({ diseaseName: disease, language });
            setAnalysisResult(result);
        });
    };

    const handleDeepDive = (query?: string) => {
        const finalQuery = query || deepDiveQuery;
        if (!selectedDisease || !finalQuery) return;
        
        startDeepDiveTransition(async () => {
            const result = await getDeepDive({ diseaseName: selectedDisease, topic: finalQuery, language });
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
        setSearchTerm(''); 
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'te' : 'en';
        setLanguage(newLang);
        if (selectedDisease) {
            handleDiseaseClick(selectedDisease);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2" style={{color: 'hsl(var(--nav-profile))'}}>
                                <BookOpenCheck /> {t.title}
                            </CardTitle>
                             <Button variant="ghost" onClick={toggleLanguage} className="gap-2">
                                <Globe className="h-5 w-5" />
                                <span className="text-sm font-bold">{t.translateButton}</span>
                            </Button>
                        </div>
                        <CardDescription>{t.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-2">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={t.searchPlaceholder}
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setActiveLetter(null); 
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
                            <div className="flex flex-col gap-1 pr-4">
                                {filteredDiseases.map((disease) => (
                                    <Button
                                        key={disease}
                                        variant={selectedDisease === disease ? "default" : "ghost"}
                                        size="sm"
                                        className={cn("text-sm h-auto py-1.5 px-2 justify-start", selectedDisease === disease ? "bg-primary" : "")}
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
                        <h2 className="text-xl font-bold">{t.loading} {selectedDisease}...</h2>
                        <p className="text-muted-foreground">{t.loadingSub}</p>
                    </Card>
                )}

                {!selectedDisease && !isPending && (
                    <Card className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
                        <BookOpenCheck className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-bold">{t.welcomeTitle}</h2>
                        <p className="text-muted-foreground">{t.welcomeDescription}</p>
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
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><FileText className="h-5 w-5"/>{t.summary}</h3>
                                <p className="text-muted-foreground">{analysisResult.summary}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Heart className="h-5 w-5"/>{t.symptoms}</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {analysisResult.symptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Utensils className="h-5 w-5"/>{t.diet}</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {analysisResult.recommendedDiet.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Microscope className="h-5 w-5"/>{t.tests}</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {analysisResult.recommendedTests.map((test, index) => <li key={index}>{test}</li>)}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><ShieldAlert className="h-5 w-5"/>{t.organs}</h3>
                                <p className="text-muted-foreground">{analysisResult.affectedOrgans}</p>
                            </div>

                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{t.disclaimerTitle}</AlertTitle>
                                <AlertDescription>
                                    {t.disclaimerText}
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2" style={{color: 'hsl(var(--nav-profile))'}}><Sparkles /> {t.deepDiveTitle}</CardTitle>
                             <CardDescription>{t.deepDiveDescription} {selectedDisease}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Input 
                                    placeholder={t.deepDivePlaceholder}
                                    value={deepDiveQuery}
                                    onChange={(e) => setDeepDiveQuery(e.target.value)}
                                />
                                <Button onClick={() => handleDeepDive()} disabled={isDeepDivePending || !deepDiveQuery}>
                                    {isDeepDivePending ? <Loader2 className='h-4 w-4 animate-spin'/> : <Search className="h-4 w-4" />}
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Button variant="outline" size="sm" onClick={() => handleDeepDive(t.deepDiveTopicDiet)}>{t.deepDiveTopicDiet}</Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeepDive(t.deepDiveTopicTests)}>{t.deepDiveTopicTests}</Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeepDive(t.deepDiveTopicOrgans)}>{t.deepDiveTopicOrgans}</Button>
                            </div>

                            {isDeepDivePending && (
                                <div className="mt-4 flex flex-col items-center justify-center p-6">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" style={{color: 'hsl(var(--nav-profile))'}}/>
                                    <p className="text-sm text-muted-foreground mt-2">{t.deepDiveLoading}</p>
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

