
import { CalendarCheck, FileText, Pill } from 'lucide-react';

export const notifications = [
    {
        id: '1',
        title: 'Appointment Reminder',
        description: 'Your appointment with Dr. Ramesh Babu is tomorrow at 10:00 AM.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        icon: CalendarCheck,
        href: '/opd-queue',
    },
    {
        id: '2',
        title: 'Report Ready',
        description: 'Your Complete Blood Count report is ready to view.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        icon: FileText,
        href: '/lab-reports',
    },
    {
        id: '3',
        title: 'Medication Time',
        description: "It's time to take your Metformin.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        read: true,
        icon: Pill,
        href: '/medicines',
    },
     {
        id: '4',
        title: 'Appointment Confirmed',
        description: 'Your booking with Dr. Lakshmi Narasaiah for Aug 12 is confirmed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        read: true,
        icon: CalendarCheck,
        href: '/opd-queue',
    }
];
