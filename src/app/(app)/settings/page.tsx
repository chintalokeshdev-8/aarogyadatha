
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileDown, Lock, Palette, Trash2, User, Loader2, HelpCircle, FileText, Info, Phone } from "lucide-react";
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
                <p className="text-muted-foreground mt-2">Manage your account and application settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Manage your public profile and account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-3 border-2">
                            <User className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                            <span>Edit Profile Information</span>
                        </Button>
                         <Button variant="outline" className="w-full justify-start gap-3 border-2">
                            <Lock className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                            <span>Change Password</span>
                        </Button>
                    </CardContent>
                </Card>

                 <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Choose how you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-3 border-2">
                            <Bell className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                            <span>Manage Notifications</span>
                        </Button>
                    </CardContent>
                </Card>
                
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the app.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border-2">
                            <div className="flex items-center gap-3">
                               <Palette className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                               <p className="font-semibold">Theme</p>
                            </div>
                           <ThemeToggle />
                        </div>
                    </CardContent>
                </Card>

                 <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Help & Support</CardTitle>
                        <CardDescription>Get help and view our policies.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Link href="/terms">
                            <Button variant="outline" className="w-full justify-start gap-3 border-2">
                                <FileText className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                                <span>Terms & Conditions</span>
                            </Button>
                        </Link>
                         <Link href="/about">
                            <Button variant="outline" className="w-full justify-start gap-3 border-2">
                                <Info className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                                <span>About medibridge</span>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Data &amp; Privacy</CardTitle>
                        <CardDescription>Export or delete your personal data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border-2">
                            <div className="flex items-center gap-3">
                               <FileDown className="h-5 w-5" style={{color: 'hsl(var(--nav-profile))'}}/>
                               <p className="font-semibold">Export My Data</p>
                            </div>
                           <Button variant="outline" size="sm" onClick={handleDownloadData} disabled={isDownloading} className="border-2">
                               {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                               {isDownloading ? 'Downloading...' : 'Download'}
                           </Button>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border-2">
                            <div className="flex items-center gap-3">
                               <Trash2 className="h-5 w-5 text-destructive"/>
                               <p className="font-semibold">Delete Account</p>
                            </div>
                           <Button variant="destructive" size="sm" onClick={handleDeleteAccount} disabled={isDeleting}>
                               {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                               {isDeleting ? 'Deleting...' : 'Delete Account'}
                           </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
