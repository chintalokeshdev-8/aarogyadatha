
'use client';

import React, { useState, useTransition, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpenCheck, Heart, FileText, Utensils, AlertTriangle, Search, ShieldAlert, TestTube2, Microscope, Brain, Globe, Dumbbell, Zap, Wind, Waves } from 'lucide-react';
import { getDiseaseInfo, DiseaseInfoOutput } from '@/ai/flows/ai-disease-info';
import { getDeepDive, DeepDiveOutput } from '@/ai/flows/ai-deep-dive';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';


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

const HealthKnowledgeCategory = ({ icon: Icon, title, description, children, color }: { icon: React.ElementType, title: string, description: string, children: React.ReactNode, color: string }) => (
    <Card className="border">
        <Collapsible>
            <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center gap-4 text-left">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-8 w-8" style={{ color }} />
                    </div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <CardContent>
                    {children}
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
    </Card>
);

const PlaceholderContent = ({ featureName }: { featureName: string }) => (
    <div className="text-center p-8 bg-muted/40 rounded-lg">
        <p className="font-semibold">Content for {featureName} is coming soon!</p>
        <p className="text-sm text-muted-foreground">This section is under development.</p>
    </div>
);

export default function HealthKnowledgePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const resultsRef = useRef<HTMLDivElement>(null);
    
    const filteredDiseases = useMemo(() => {
        if (!searchTerm) {
            return diseaseCategories;
        }
        return diseaseCategories.filter(disease =>
            disease.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-profile))'}}>Health Knowledge</h1>
                <p className="text-muted-foreground mt-2">Explore various health topics to stay informed.</p>
            </div>

            <div className="space-y-4">
                <HealthKnowledgeCategory 
                    icon={BookOpenCheck} 
                    title="Health Library" 
                    description="Look up information on various diseases and conditions."
                    color="hsl(var(--nav-profile))"
                >
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search diseases..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="h-[40vh]">
                            <div className="flex flex-row flex-wrap gap-2 pr-4">
                                {filteredDiseases.map((disease) => (
                                    <Button
                                        key={disease}
                                        variant="ghost"
                                        size="sm"
                                        className="text-sm h-auto py-1.5 px-2 justify-start bg-muted/50"
                                    >
                                        {disease}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </HealthKnowledgeCategory>

                 <HealthKnowledgeCategory 
                    icon={Zap} 
                    title="Wellness & Lifestyle" 
                    description="Tips for stress management, sleep, and overall well-being."
                    color="hsl(var(--nav-symptoms))"
                >
                    <PlaceholderContent featureName="Wellness & Lifestyle" />
                </HealthKnowledgeCategory>
                
                 <HealthKnowledgeCategory 
                    icon={Dumbbell} 
                    title="Fitness & Workouts" 
                    description="Guides for gym, yoga, and home workout routines."
                    color="hsl(var(--nav-medicines))"
                >
                    <PlaceholderContent featureName="Fitness & Workouts" />
                </HealthKnowledgeCategory>

                <HealthKnowledgeCategory 
                    icon={Heart} 
                    title="Sexual Health" 
                    description="Information on reproductive health and wellness."
                    color="hsl(var(--nav-blood-bank))"
                >
                    <PlaceholderContent featureName="Sexual Health" />
                </HealthKnowledgeCategory>
                
                <HealthKnowledgeCategory 
                    icon={Brain} 
                    title="Organs Health" 
                    description="Learn about keeping your vital organs healthy."
                    color="hsl(var(--nav-junior-doctors))"
                >
                     <PlaceholderContent featureName="Organs Health" />
                </HealthKnowledgeCategory>
            </div>

            <div ref={resultsRef} className="lg:col-span-2 space-y-6">
                {/* Analysis results will be handled in a future step */}
            </div>
        </div>
    );
}
