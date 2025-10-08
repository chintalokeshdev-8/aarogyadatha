
export const dummyReportData: Record<string, { content: string, image?: string, dataAiHint?: string }> = {
    "Complete Blood Count-2024-07-15": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-07-15
Test: Complete Blood Count (CBC)
Doctor: Dr. Rajesh Kumar

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
Doctor: Dr. Rajesh Kumar

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
Doctor: Dr. Arjun Kumar

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
Doctor: Dr. Arjun Kumar

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
    },
    "Widal Test for Typhoid-2024-08-02": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-08-02
Test: Widal Test for Typhoid
Doctor: Dr. Anjali

RESULTS:
Salmonella typhi O: 1:160 (Positive)
Salmonella typhi H: 1:320 (Positive)

IMPRESSION:
The serological results are suggestive of Typhoid fever (Enteric fever). Clinical correlation is advised.
`
    },
    "Echocardiogram-2024-08-10": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-08-10
Test: 2D Echocardiogram
Doctor: Ashok kumar chintha

FINDINGS:
Left Ventricle: Mildly dilated, normal wall thickness.
Ejection Fraction (EF): 50% (Mildly reduced, Normal > 55%).
Valves: Mitral valve shows mild regurgitation.
Pericardium: No pericardial effusion.

IMPRESSION:
Mild left ventricular systolic dysfunction with mild mitral regurgitation. Findings may be related to recent viral illness. Follow-up is recommended.
`
    },
    "Troponin-I-2024-08-10": {
        content: `
Patient Name: Chinta Lokesh Babu
Date: 2024-08-10
Test: Troponin-I Level
Doctor: Ashok kumar chintha

RESULT:
Troponin-I: 0.8 ng/mL (Normal < 0.04 ng/mL) - High

IMPRESSION:
Elevated Troponin-I level indicates some degree of cardiac muscle injury, likely due to post-viral myocarditis. Requires monitoring.
`
    }
};
