
import { LabReportsClient } from './lab-reports-client';

const labReports = [
  { testName: "Complete Blood Count", date: "2024-07-15", doctor: "Dr. Rajesh Kumar", status: "Completed" },
  { testName: "Liver Function Test", date: "2024-07-16", doctor: "Dr. Priya Sharma", status: "Completed" },
  { testName: "Lipid Profile", date: "2024-06-20", doctor: "Dr. Rajesh Kumar", status: "Completed" },
  { testName: "Thyroid Function Test", date: "2024-07-16", doctor: "Dr. Priya Sharma", status: "Processing" },
  { testName: "Urinalysis", date: "2024-07-17", doctor: "Dr. Rajesh Kumar", status: "Pending" },
  { testName: "HbA1c", date: "2024-06-20", doctor: "Dr. Rajesh Kumar", status: "Completed" },
  { testName: "Complete Blood Count", date: "2024-04-10", doctor: "Dr. Rajesh Kumar", status: "Completed" },
  { testName: "Liver Function Test", date: "2024-01-05", doctor: "Dr. Priya Sharma", status: "Completed" },
];

const imagingReports = [
    { testName: "Chest X-Ray", date: "2024-07-10", doctor: "Dr. Rajesh Kumar", status: "Completed", type: "x-ray" },
    { testName: "MRI Brain Scan", date: "2024-05-12", doctor: "Dr. Arjun Kumar", status: "Completed", type: "mri" },
    { testName: "Abdominal Ultrasound", date: "2024-07-18", doctor: "Dr. Priya Sharma", status: "Processing", type: "x-ray" },
    { testName: "CT Scan Abdomen", date: "2024-02-25", doctor: "Dr. Arjun Kumar", status: "Completed", type: "mri" },
]

const prescriptionReports = [
    { testName: "Fever & Cold Consultation", date: "2024-07-22", doctor: "Dr. Shashank", status: "Completed" },
    { testName: "Fever & Cold Consultation", date: "2024-07-15", doctor: "Dr. Shashank", status: "Completed" },
    { testName: "Regular Checkup", date: "2024-06-20", doctor: "Dr. Siva Parvathi", status: "Completed" },
    { testName: "Allergy Follow-up", date: "2024-07-18", doctor: "Dr. Ananya Sharma", status: "Completed" },
];

const diagnosticLabs = [
    { 
        name: "Apollo Diagnostics", 
        location: "Guntur & Hyderabad",
        logo: "https://picsum.photos/seed/apollo_logo/100/100",
        dataAiHint: "apollo hospital logo",
        tests: [
            { name: "Complete Blood Picture (CBP)", price: 300, category: "Blood" },
            { name: "Full Body Checkup", price: 2500, category: "Packages" },
            { name: "Urine Analysis", price: 250, category: "Blood" },
        ]
    },
    { 
        name: "Vijaya Diagnostics", 
        location: "Hyderabad",
        logo: "https://picsum.photos/seed/vijaya_logo/100/100",
        dataAiHint: "diagnostics lab logo",
        tests: [
            { name: "COVID-19 RT-PCR", price: 1200, category: "Pathology" },
            { name: "Vitamin D Test", price: 800, category: "Blood" },
            { name: "ECG", price: 400, category: "Cardiology" },
        ]
    },
    { 
        name: "Dr. Lal PathLabs", 
        location: "Guntur",
        logo: "https://picsum.photos/seed/lal_logo/100/100",
        dataAiHint: "pathology lab logo",
        tests: [
            { name: "Thyroid Profile (T3, T4, TSH)", price: 600, category: "Blood" },
            { name: "Diabetes Health Checkup", price: 1500, category: "Packages" },
        ]
    },
    { 
        name: "Yashoda Hospitals Lab", 
        location: "Hyderabad",
        logo: "https://picsum.photos/seed/yashoda_logo/100/100",
        dataAiHint: "hospital logo",
        tests: [
            { name: "MRI Brain Scan", price: 5000, category: "Imaging" },
            { name: "CT Scan (Chest)", price: 3500, category: "Imaging" },
        ]
    }
];

const dummyReportData: Record<string, { content: string, image?: string, dataAiHint?: string }> = {
    "Complete Blood Count-2024-07-15": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-07-15
Test: Complete Blood Count (CBC)

Hemoglobin: 13.5 g/dL (Normal: 13.0-17.0)
WBC Count: 11,500 /mcL (Normal: 4,000-11,000) - Slightly High
Platelet Count: 250,000 /mcL (Normal: 150,000-450,000)
RBC Count: 4.8 million/mcL (Normal: 4.5-5.5)
`
    },
    "Chest X-Ray-2024-07-10": {
        image: "https://picsum.photos/seed/xray/600/400",
        dataAiHint: "chest xray",
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-07-10
Test: Chest X-Ray (PA view)

TECHNIQUE:
Single postero-anterior view of the chest was obtained.

FINDINGS:
Lungs: The lungs are well-aerated. No focal consolidation, mass, or pneumothorax is seen.
Heart: The cardiomediastinal silhouette is within normal limits.
Pleura: No pleural effusion or thickening.
Bones: The visualized bony structures appear unremarkable.

IMPRESSION:
Normal chest X-ray.
`
    },
    "MRI Brain Scan-2024-05-12": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-05-12
Test: MRI Brain Scan

TECHNIQUE:
Multi-planar, multi-sequential MRI of the brain was performed without intravenous contrast.

FINDINGS:
Brain Parenchyma: No evidence of acute infarction, hemorrhage, or mass lesion. The gray-white matter differentiation is preserved.
Ventricles: The ventricular system is normal in size and configuration.
Cerebellum and Brainstem: Unremarkable.
Major Vascular Structures: Normal flow voids are seen.

IMPRESSION:
Unremarkable MRI of the brain.
`
    },
    "CT Scan Abdomen-2024-02-25": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-02-25
Test: CT Scan Abdomen (with contrast)

TECHNIQUE:
Axial CT images of the abdomen were obtained following the administration of oral and intravenous contrast.

FINDINGS:
Liver: Normal in size and attenuation. No focal lesions.
Gallbladder: Unremarkable. No stones or wall thickening.
Spleen, Pancreas, Kidneys, Adrenal Glands: All appear normal.
Bowel: No evidence of obstruction or inflammatory changes.
Aorta and IVC: Normal caliber.

IMPRESSION:
Normal CT scan of the abdomen.
`
    },
     "Fever & Cold Consultation-2024-07-22": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-07-22
Doctor: Dr. Shashank
Chief Complaint: Fever, cough, and running nose for 3 days.

DIAGNOSIS:
Viral Upper Respiratory Tract Infection

PRESCRIPTION:
1. Paracetamol 500mg - one tablet SOS for fever
2. Cetirizine 10mg - one tablet at night
3. Steam inhalation twice a day

ADVICE:
- Take adequate rest
- Stay hydrated
- Follow-up if symptoms persist after 3 days
`
    }
};

export default function DiagnosticsPage() {
    return (
      <LabReportsClient
        labReports={labReports}
        imagingReports={imagingReports}
        prescriptionReports={prescriptionReports}
        diagnosticLabs={diagnosticLabs}
        dummyReportData={dummyReportData}
      />
    );
}
