
'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea';
import { Upload, Sparkles, Loader2, BookOpenCheck, Youtube, Heart, Brain, Bone, Leaf, CheckCircle } from 'lucide-react';
import { analyzeHealthIssue, HealthAnalysisOutput } from '@/ai/flows/ai-health-knowledge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const healthTips = [
    "Drink at least 8 glasses of water a day to stay hydrated.",
    "Aim for 30 minutes of moderate exercise most days of the week.",
    "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
    "Get 7-9 hours of quality sleep each night.",
    "Practice mindfulness or meditation to manage stress."
];

const videoCategories = [
    { name: "General Health", icon: Leaf, videoId: "Jk_kM4vJ3yY" },
    { name: "Heart Health", icon: Heart, videoId: "qK3n2sI4yvU" },
    { name: "Diabetes Care", icon: Brain, videoId: "w28o31t33yE" },
    { name: "Bone & Joint", icon: Bone, videoId: "gAloMM2t3_g" },
];

export default function HealthKnowledgePage() {
    const [userQuery, setUserQuery] = useState('');
    const [fileName, setFileName] = useState('');
    const [analysisResult, setAnalysisResult] = useState<HealthAnalysisOutput | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        }
    };

    const handleRunAnalysis = () => {
        if (!userQuery && !fileName) return;
        startTransition(async () => {
            const result = await analyzeHealthIssue({ query: userQuery });
            setAnalysisResult(result);
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{ color: 'hsl(var(--nav-profile))' }}>Health Knowledge</h1>
                <p className="text-muted-foreground mt-2">Empower yourself with health tips, expert advice, and AI analysis.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle style={{ color: 'hsl(var(--nav-profile))' }} /> Daily Health Tips
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {healthTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Leaf className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
                                <span className="text-muted-foreground">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Youtube style={{ color: 'hsl(var(--nav-profile))' }} /> Doctor's Advice
                    </CardTitle>
                    <CardDescription>Watch videos from trusted doctors on various health topics.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {videoCategories.map((category) => (
                        <div key={category.name} className="space-y-2">
                            <h3 className="font-semibold flex items-center gap-2"><category.icon className="h-5 w-5" /> {category.name}</h3>
                            <div className="aspect-video rounded-lg overflow-hidden border">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${category.videoId}`}
                                    title={`YouTube video player - ${category.name}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles style={{ color: 'hsl(var(--nav-profile))' }} /> AI-Powered Health Analysis
                    </CardTitle>
                    <CardDescription>Upload a health issue or document to get an AI-driven analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="health-issue">Describe your health concern or question</Label>
                        <Textarea
                            id="health-issue"
                            placeholder="e.g., I've been feeling tired for a week, what could be the reason?"
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
                    <Button onClick={handleRunAnalysis} disabled={isPending || (!userQuery && !fileName)} style={{ backgroundColor: 'hsl(var(--nav-profile))' }}>
                        {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Run AI Analysis</>
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
