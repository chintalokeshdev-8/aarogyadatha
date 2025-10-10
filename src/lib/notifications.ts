
import { CalendarCheck, FileText, Pill, Settings, Heart, TestTube, MessageSquare, Sparkles } from 'lucide-react';

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
        id: '9',
        title: 'AI Analysis Complete',
        description: 'The AI analysis for your recent blood test is complete. No major abnormalities found.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: false,
        icon: Sparkles,
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
        id: '10',
        title: 'Appointment Rescheduled',
        description: "Dr. Anjali's clinic has rescheduled your appointment to Aug 14 at 11:00 AM.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5),
        read: false,
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
        id: '11',
        title: 'Prescription Refill Reminder',
        description: 'Your prescription for Metformin is running low. Please consult your doctor for a refill.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.5),
        read: true,
        icon: Pill,
        href: '/medicines',
        category: 'Medications'
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
    },
    {
        id: '12',
        title: 'Password Changed',
        description: 'Your account password was successfully changed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
        read: true,
        icon: Settings,
        href: '/settings',
        category: 'Settings'
    },
    {
        id: '13',
        title: 'Daily Health Tip',
        description: 'Tip: Staying hydrated is key to good health. Aim for 8 glasses of water a day.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        read: true,
        icon: Heart,
        href: '/health-tracker',
        category: 'General'
    }
];
