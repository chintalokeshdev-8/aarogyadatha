
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <div className="inline-block p-3 bg-primary/10 rounded-full">
                     <Activity className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">About medibridge</h1>
                <p className="text-muted-foreground text-lg">Your Comprehensive Health Companion</p>
            </div>

            <Card className="border-2">
                <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        medibridge is an all-in-one digital health platform designed to empower users by providing easy access to a wide range of healthcare services and information. In a world where managing health can be complex and fragmented, medibridge serves as a single, user-friendly bridge between patients and the healthcare ecosystem. Our mission is to make healthcare simple, accessible, and personalized for everyone.
                    </p>
                     <p>
                        The app is built with a mobile-first approach, featuring a clean interface and intuitive navigation. It also includes bilingual support (English and Telugu) to cater to a diverse user base.
                    </p>
                </CardContent>
            </Card>

             <Card className="border-2">
                <CardHeader>
                    <CardTitle>Core Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg">1. AI Symptom Checker</h3>
                        <p className="text-muted-foreground">An intelligent tool that allows users to input their health symptoms and receive an AI-generated analysis, providing immediate, preliminary guidance and specialist recommendations.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg">2. Health & Activity Tracker</h3>
                        <p className="text-muted-foreground">A personal dashboard to monitor key health vitals like BMI, blood pressure, and daily physical activity, helping users stay proactive about their health.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg">3. Appointments</h3>
                        <p className="text-muted-foreground">A streamlined system for finding and booking appointments with doctors across various specialties and hospitals, simplifying the process of getting medical consultations.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg">4. Chat & OPD Queue</h3>
                        <p className="text-muted-foreground">A live chat feature and a real-time queue tracking system to reduce uncertainty and wait times for outpatient appointments.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg">5. Diagnostics & Reports</h3>
                        <p className="text-muted-foreground">A centralized hub to manage all medical reports, book diagnostic tests, and understand complex results with AI-powered analysis.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg">6. My Medicines</h3>
                        <p className="text-muted-foreground">A personal medication management tool that tracks schedules and dosages, with an AI assistant for drug information.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
