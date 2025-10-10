
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notifications } from '@/lib/notifications';
import { format, isToday, isYesterday } from 'date-fns';
import { Bell, Clock } from 'lucide-react';
import Link from 'next/link';

const NotificationItem = ({ notification }: { notification: (typeof notifications)[0] }) => (
    <Link href={notification.href} key={notification.id} passHref>
        <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border-b last:border-b-0">
            <div className={`mt-1 p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                <notification.icon className={`h-6 w-6 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} style={{color: 'hsl(var(--nav-notifications))'}}/>
            </div>
            <div className="flex-1">
                <p className={`font-semibold ${notification.read ? 'text-muted-foreground' : ''}`}>{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {format(new Date(notification.timestamp), 'dd-MMM-yyyy, h:mm a')}
                </p>
            </div>
            {!notification.read && <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" style={{backgroundColor: 'hsl(var(--nav-notifications))'}} />}
        </div>
    </Link>
);


export default function NotificationsPage() {
    const [filter, setFilter] = useState('All');

    const filteredNotifications = useMemo(() => {
        if (filter === 'All') {
            return notifications;
        }
        return notifications.filter(n => n.category === filter);
    }, [filter]);

    const groupedNotifications = useMemo(() => {
        return filteredNotifications.reduce((acc, notification) => {
            const date = new Date(notification.timestamp);
            let group;
            if (isToday(date)) {
                group = 'Today';
            } else if (isYesterday(date)) {
                group = 'Yesterday';
            } else {
                group = format(date, 'MMMM d, yyyy');
            }
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(notification);
            return acc;
        }, {} as Record<string, typeof notifications>);
    }, [filteredNotifications]);

    const notificationCategories = ['All', 'Appointments', 'Reports', 'Medications', 'General', 'Settings'];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-notifications))'}}>Notifications</h1>
                <p className="text-muted-foreground mt-2">A complete history of your account alerts and updates.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filter Notifications</CardTitle>
                    <CardDescription>Select a category to view specific notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={filter} onValueChange={setFilter}>
                        <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto">
                            {notificationCategories.map(category => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {Object.keys(groupedNotifications).length > 0 ? (
                    Object.entries(groupedNotifications).map(([group, notifs]) => (
                        <Card key={group}>
                            <CardHeader>
                                <CardTitle className="text-lg">{group}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {notifs.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="text-center p-12">
                        <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No Notifications</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            You have no notifications in the "{filter}" category.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
