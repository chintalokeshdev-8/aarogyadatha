
import { CalendarCheck, FileText, Pill, Settings, Heart, TestTube, MessageSquare } from 'lucide-react';

export const notifications = [
    {
        id: '5',
        title: 'Navigation Updated',
        description: 'Your changes will be applied on the next page load.',
        timestamp: new Date(),
        read: false,
        icon: Settings,
        href: '/profile',
        category: 'Settings'
    },
    {
        id: '1',
        title: 'Appointment Reminder',
        description: 'Your appointment with Dr. Ramesh Babu is tomorrow at 10:00 AM.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        icon: CalendarCheck,
        href: '/opd-queue',
        category: 'Appointments'
    },
    {
        id: '2',
        title: 'Report Ready',
        description: 'Your Complete Blood Count report is ready to view.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        icon: FileText,
        href: '/lab-reports',
        category: 'Reports'
    },
    {
        id: '3',
        title: 'Medication Time',
        description: "It's time to take your Metformin.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        read: true,
        icon: Pill,
        href: '/medicines',
        category: 'Medications'
    },
     {
        id: '4',
        title: 'Appointment Confirmed',
        description: 'Your booking with Dr. Lakshmi Narasaiah for Aug 12 is confirmed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        read: true,
        icon: CalendarCheck,
        href: '/opd-queue',
        category: 'Appointments'
    },
    {
        id: '6',
        title: 'New Message from Clinic',
        description: 'Dr. Ramesh Babu\'s clinic sent you a message regarding your follow-up.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        read: true,
        icon: MessageSquare,
        href: '/opd-queue',
        category: 'Appointments'
    },
    {
        id: '7',
        title: 'Test Results Uploaded',
        description: 'Your Liver Function Test results have been added to your record.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        read: true,
        icon: TestTube,
        href: '/lab-reports',
        category: 'Reports'
    },
    {
        id: '8',
        title: 'Health Tracker Summary',
        description: 'You met your activity goals for 5 days last week. Keep it up!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        read: true,
        icon: Heart,
        href: '/health-tracker',
        category: 'General'
    }
];
