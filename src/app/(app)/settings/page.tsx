
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileDown, Lock, Palette, Trash2, Loader2, HelpCircle, FileText, Info, Phone } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {

    const [isDownloading, setIsDownloading] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDownloadData = () => {
        setIsDownloading(true);
        setTimeout(() => {
            // Logic to gather and download data
            setIsDownloading(false);
        }, 1500);
    };

    const handleDeleteAccount = () => {
        setIsDeleting(true);
        setTimeout(() => {
            // Logic to delete account
            setIsDeleting(false);
        }, 2000);
    };


    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-profile))'}}>Settings</h1>
            </div>

            <Card className="border-2">
                <CardContent className="p-4 space-y-2">
                     <Button variant="outline" className="w-full justify-start gap-3 border-2 text-base py-6">
                        <Lock className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                        <span>Change Password</span>
                    </Button>
                    <Link href="/notifications">
                        <Button variant="outline" className="w-full justify-start gap-3 border-2 text-base py-6">
                            <Bell className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                            <span>Manage Notifications</span>
                        </Button>
                    </Link>
                    <div className="flex items-center justify-between p-3 rounded-lg border-2">
                        <div className="flex items-center gap-3">
                           <Palette className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                           <span className="font-semibold text-base">Theme</span>
                        </div>
                       <ThemeToggle />
                    </div>
                     <Link href="/terms">
                        <Button variant="outline" className="w-full justify-start gap-3 border-2 text-base py-6">
                            <FileText className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                            <span>Terms & Conditions</span>
                        </Button>
                    </Link>
                     <Link href="/about">
                        <Button variant="outline" className="w-full justify-start gap-3 border-2 text-base py-6">
                            <Info className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                            <span>About medibridge</span>
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={handleDownloadData} disabled={isDownloading} className="w-full justify-start gap-3 border-2 text-base py-6">
                       {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>}
                       <span>{isDownloading ? 'Downloading...' : 'Export My Data'}</span>
                    </Button>
                     <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting} className="w-full justify-start gap-3 border-2 text-base py-6">
                       {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="h-5 w-5"/>}
                       <span>{isDeleting ? 'Deleting...' : 'Delete Account'}</span>
                   </Button>
                </CardContent>
            </Card>
        </div>
    );
}
