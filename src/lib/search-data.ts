
import {
  Activity,
  Bell,
  Brain,
  CalendarCheck,
  Droplets,
  FileText,
  FlaskConical,
  Headset,
  Heart,
  HeartPulse,
  LayoutGrid,
  MessageSquare,
  Pill,
  Siren,
  TestTube,
  User,
} from 'lucide-react';
import { PregnantLadyIcon } from '@/components/icons/pregnant-lady-icon';

export const searchData = [
  {
    heading: 'Pages',
    items: [
      {
        href: '/',
        title: 'Dashboard',
        icon: LayoutGrid,
        keywords: 'home main screen',
      },
      {
        href: '/symptom-checker',
        title: 'AI Symptom Checker',
        icon: HeartPulse,
        keywords: 'symptoms ai check',
      },
      {
        href: '/appointments',
        title: 'Appointments',
        icon: CalendarCheck,
        keywords: 'book doctor visit',
      },
      {
        href: '/opd-queue',
        title: 'OPD Queue / Chat',
        icon: MessageSquare,
        keywords: 'op status live chat doctor',
      },
      {
        href: '/lab-reports',
        title: 'Diagnostics & Reports',
        icon: TestTube,
        keywords: 'labs tests reports results',
      },
      {
        href: '/medicines',
        title: 'My Medicines',
        icon: Pill,
        keywords: 'medication schedule plan',
      },
      {
        href: '/blood-bank',
        title: 'Blood Bank',
        icon: Droplets,
        keywords: 'donate request blood',
      },
      {
        href: '/health-tracker',
        title: 'Health Tracker',
        icon: Activity,
        keywords: 'bmi activity steps tracker',
      },
      {
        href: '/junior-doctors',
        title: '24/7 Junior Doctors',
        icon: Headset,
        keywords: 'free consultation jr doctor',
      },
      {
        href: '/pregnancy-tracker',
        title: 'Pregnancy Care',
        icon: PregnantLadyIcon,
        keywords: 'pregnancy tracker mother baby',
      },
      {
        href: '/profile',
        title: 'Profile',
        icon: User,
        keywords: 'my account details',
      },
       {
        href: '/settings',
        title: 'Settings',
        icon: User,
        keywords: 'options preferences theme',
      },
      {
        href: '/emergency',
        title: 'Emergency',
        icon: Siren,
        keywords: 'ambulance help urgent',
      },
    ],
  },
  {
    heading: 'Doctors',
    items: [
      { href: '/appointments', title: 'Dr. Ramesh Babu (Nephrologist)', icon: User },
      { href: '/appointments', title: 'Dr. Anjali (General Physician)', icon: User },
      { href: '/appointments', title: 'Dr. Padmavathi (Gynaecologist)', icon: User },
    ],
  },
   {
    heading: 'Reports',
    items: [
      { href: '/lab-reports', title: 'Complete Blood Count (July 15)', icon: FileText },
      { href: '/lab-reports', title: 'Chest X-Ray (July 10)', icon: FileText },
    ],
  },
];
