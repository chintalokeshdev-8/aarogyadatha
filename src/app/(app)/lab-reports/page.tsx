
import { LabReportsClient } from './lab-reports-client';
import { labReports } from '@/lib/lab-reports-data';
import { imagingReports } from '@/lib/imaging-reports-data';
import { dummyReportData } from '@/lib/dummy-report-data';

const diagnosticLabs = [
    { 
        name: "Yoda Diagnostics", 
        location: "Kothapeta, Guntur",
        address: "D.No: 12-12, 36/1, Old Club Rd, opp. Manasa hospital, Kothapeta, Guntur, Andhra Pradesh 522001",
        phone: "096405 75575",
        website: "https://yodadiagnostics.com/",
        hours: "Open ⋅ Closes 11 pm",
        logo: "https://picsum.photos/seed/yoda_logo/100/100",
        dataAiHint: "modern lab logo",
        recommended: true,
        tests: [
            { name: "Master Health Checkup", price: 3000, category: "Packages" },
            { name: "Cardiac Wellness Package", price: 5000, category: "Packages" },
            { name: "Fasting Blood Sugar", price: 150, category: "Blood" },
            { name: "Kidney Function Test", price: 450, category: "Blood" },
            { name: "Ultrasound Abdomen", price: 1200, category: "Imaging" },
            { name: "Digital X-Ray Chest", price: 500, category: "Imaging" },
        ]
    },
    { 
        name: "Apollo Diagnostics", 
        location: "Guntur & Hyderabad",
        address: "5-88-10, 1st Floor, Lakshmipuram Main Road, Guntur, Andhra Pradesh 522007",
        phone: "0863 222 2108",
        website: "https://www.apollodiagnostics.in/",
        hours: "Open 24 hours",
        logo: "https://picsum.photos/seed/apollo_logo/100/100",
        dataAiHint: "apollo hospital logo",
        tests: [
            { name: "Complete Blood Picture (CBP)", price: 300, category: "Blood" },
            { name: "Lipid Profile", price: 600, category: "Blood" },
            { name: "Full Body Checkup", price: 2500, category: "Packages" },
            { name: "Women's Health Package", price: 3500, category: "Packages" },
            { name: "Urine Analysis", price: 250, category: "Blood" },
            { name: "X-Ray Chest", price: 450, category: "Imaging" },
        ]
    },
    { 
        name: "Vijaya Diagnostics", 
        location: "Hyderabad",
        address: "3-6-272, Himayatnagar, Hyderabad, Telangana 500029",
        phone: "040 2342 0400",
        website: "https://www.vijayadiagnostic.com/",
        hours: "Open ⋅ Closes 10 pm",
        logo: "https://picsum.photos/seed/vijaya_logo/100/100",
        dataAiHint: "diagnostics lab logo",
        tests: [
            { name: "COVID-19 RT-PCR", price: 1200, category: "Pathology" },
            { name: "Vitamin D Test", price: 800, category: "Blood" },
            { name: "Advanced Full Body Checkup", price: 4500, category: "Packages" },
            { name: "MRI Knee", price: 4000, category: "Imaging" },
            { name: "ECG", price: 400, category: "Cardiology" },
        ]
    },
    { 
        name: "Dr. Lal PathLabs", 
        location: "Guntur",
        address: "1st Floor, Hindu College Down, 5/1, Arundelpet, Guntur, Andhra Pradesh 522002",
        phone: "07961204892",
        website: "https://www.lalpathlabs.com/",
        hours: "Open ⋅ Closes 8 pm",
        logo: "https://picsum.photos/seed/lal_logo/100/100",
        dataAiHint: "pathology lab logo",
        tests: [
            { name: "Thyroid Profile (T3, T4, TSH)", price: 600, category: "Blood" },
            { name: "Dengue Panel", price: 1100, category: "Pathology" },
            { name: "Diabetes Health Checkup", price: 1500, category: "Packages" },
            { name: "Fever Panel", price: 2000, category: "Packages" },
            { name: "CT Scan Head", price: 2500, category: "Imaging" },
        ]
    },
    { 
        name: "Yashoda Hospitals Lab", 
        location: "Hyderabad",
        address: "Raj Bhavan Road, Somajiguda, Hyderabad, Telangana 500082",
        phone: "040 4567 4567",
        website: "https://www.yashodahospitals.com/yashoda-diagnostics/",
        hours: "Open 24 hours",
        logo: "https://picsum.photos/seed/yashoda_logo/100/100",
        dataAiHint: "hospital logo",
        tests: [
            { name: "MRI Brain Scan", price: 5000, category: "Imaging" },
            { name: "CT Scan (Chest)", price: 3500, category: "Imaging" },
            { name: "Executive Health Checkup", price: 6000, category: "Packages" },
            { name: "Lipid Profile", price: 700, category: "Blood" },
            { name: "Liver Function Test", price: 550, category: "Blood" },
        ]
    }
];

export default function DiagnosticsPage() {
    return (
      <LabReportsClient
        labReports={labReports}
        imagingReports={imagingReports}
        diagnosticLabs={diagnosticLabs}
        dummyReportData={dummyReportData}
      />
    );
}
