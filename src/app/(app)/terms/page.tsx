
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                 <div className="inline-block p-3 bg-primary/10 rounded-full">
                     <FileText className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">Terms & Conditions</h1>
                <p className="text-muted-foreground text-lg">Last updated: July 25, 2024</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6 text-muted-foreground">
                    <section className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to MedBridgee ("App", "Service"). These Terms & Conditions ("Terms") govern your use of our application and services. By accessing or using the Service, you agree to be bound by these Terms.
                        </p>
                    </section>
                     <section className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">2. Medical Disclaimer</h2>
                        <p>
                            The information provided by MedBridgee, including but not limited to the AI Symptom Checker, is for informational purposes only and does not constitute medical advice. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </section>
                     <section className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
                        <p>
                            To use certain features of the App, you may be required to create an account. You are responsible for safeguarding your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>
                     <section className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">4. Privacy Policy</h2>
                        <p>
                            Our Privacy Policy describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use of this information.
                        </p>
                    </section>
                    <section className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">5. Limitation of Liability</h2>
                        <p>
                            In no event shall MedBridgee, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>
                    <section className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">6. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                        </p>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
