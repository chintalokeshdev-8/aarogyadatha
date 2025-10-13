
'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles, Loader2, BookOpenCheck, Heart, Brain, Bone, Leaf, Droplets, Wind } from 'lucide-react';
import { HealthAnalysisOutput, analyzeHealthIssue } from '@/ai/flows/ai-health-knowledge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const healthCategories = [
    { name: "Heart Health", icon: Heart },
    { name: "Diabetes Care", icon: Droplets },
    { name: "Skin Problems", icon: Leaf },
    { name: "Mental Wellness", icon: Brain },
    { name: "Bone & Joint", icon: Bone },
    { name: "Digestive Issues", icon: Wind },
];

export default function HealthKnowledgePage() {
    const [userQuery, setUserQuery] = useState('');
    const [fileName, setFileName] = useState('');
    const [analysisResult, setAnalysisResult] = useState<HealthAnalysisOutput | null>(null);
    const [isPending, startTransition] = useTransition();
    const [dataUri, setDataUri] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setDataUri(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRunAnalysis = () => {
        if (!userQuery && !dataUri) return;
        startTransition(async () => {
            const result = await analyzeHealthIssue({ 
                query: userQuery,
                documentDataUri: dataUri || undefined,
                category: selectedCategory || undefined
            });
            setAnalysisResult(result);
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{ color: 'hsl(var(--nav-profile))' }}>Health Knowledge AI</h1>
                <p className="text-muted-foreground mt-2">Your personal AI to search, study, and understand any health topic.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles style={{ color: 'hsl(var(--nav-profile))' }} /> AI-Powered Health Explorer
                    </CardTitle>
                    <CardDescription>Ask a question or upload a document to get a simple, AI-driven analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div>
                        <Label>First, select a category (optional)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {healthCategories.map((category) => (
                                <Button
                                    key={category.name}
                                    variant="outline"
                                    className={cn(
                                        "h-auto py-3 flex-col gap-2 border-2",
                                        selectedCategory === category.name ? "border-primary bg-primary/10" : ""
                                    )}
                                    onClick={() => setSelectedCategory(prev => prev === category.name ? null : category.name)}
                                >
                                    <category.icon className="h-6 w-6" style={{ color: selectedCategory === category.name ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }} />
                                    <span className="font-semibold text-sm">{category.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="health-issue">Then, describe your health concern or question</Label>
                        <Textarea
                            id="health-issue"
                            placeholder="e.g., What are the benefits of a Mediterranean diet for heart health?"
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                        />
                    </div>
                    <div className="text-center text-sm font-semibold text-muted-foreground">OR</div>
                    <div className="space-y-2">
                        <Label>Upload a health document for analysis</Label>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" className="flex-1">
                                <label htmlFor="health-doc-upload" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" />
                                    {fileName || 'Choose File'}
                                </label>
                            </Button>
                            <input id="health-doc-upload" type="file" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleRunAnalysis} disabled={isPending || (!userQuery && !fileName)} style={{ backgroundColor: 'hsl(var(--nav-profile))' }} className="w-full">
                        {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Get AI Analysis</>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {isPending && (
                <div className="flex items-center justify-center rounded-lg border bg-muted/50 p-8">
                    <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'hsl(var(--nav-profile))' }} />
                </div>
            )}

            {analysisResult && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">AI Analysis Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Summary</h3>
                            <p className="text-muted-foreground">{analysisResult.summary}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Potential Next Steps</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                {analysisResult.nextSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        </div>
                        <Alert variant="destructive">
                            <BookOpenCheck className="h-4 w-4" />
                            <AlertTitle>Disclaimer</AlertTitle>
                            <AlertDescription>
                                This AI analysis is for informational purposes only and is not a substitute for professional medical advice. Always consult a qualified doctor.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
