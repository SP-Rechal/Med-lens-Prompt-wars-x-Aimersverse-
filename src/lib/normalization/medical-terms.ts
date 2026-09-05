export const termDictionary: Record<string, string> = {
  // Blood tests
  'hb': 'Hemoglobin',
  'hgb': 'Hemoglobin',
  'wbc': 'White Blood Cell Count',
  'rbc': 'Red Blood Cell Count',
  'plt': 'Platelets',
  'hct': 'Hematocrit',
  
  // Metabolic
  'fbs': 'Fasting Blood Sugar',
  'fbg': 'Fasting Blood Sugar',
  'hba1c': 'Glycated Hemoglobin',
  'bun': 'Blood Urea Nitrogen',
  
  // Liver
  'alt': 'Alanine Aminotransferase',
  'sgpt': 'Alanine Aminotransferase',
  'ast': 'Aspartate Aminotransferase',
  'sgot': 'Aspartate Aminotransferase',
  'alp': 'Alkaline Phosphatase',
  'alk phos': 'Alkaline Phosphatase',
  'ggt': 'Gamma-Glutamyl Transferase',
  'bil': 'Bilirubin',
  'tb': 'Total Bilirubin',
  
  // Kidney
  'cr': 'Creatinine',
  'creat': 'Creatinine',
  'egfr': 'Estimated Glomerular Filtration Rate',
  
  // Lipid
  'tc': 'Total Cholesterol',
  'chol': 'Total Cholesterol',
  'hdl': 'High-Density Lipoprotein',
  'ldl': 'Low-Density Lipoprotein',
  'tg': 'Triglycerides',
  'trig': 'Triglycerides',
  
  // Thyroid
  'tsh': 'Thyroid Stimulating Hormone',
  't3': 'Triiodothyronine',
  't4': 'Thyroxine',
  'ft3': 'Free Triiodothyronine',
  'ft4': 'Free Thyroxine',
  
  // CBC
  'mcv': 'Mean Corpuscular Volume',
  'mch': 'Mean Corpuscular Hemoglobin',
  'mchc': 'Mean Corpuscular Hemoglobin Concentration',
  'rdw': 'Red Cell Distribution Width',
  'mpv': 'Mean Platelet Volume',
  
  // Urine
  'ph': 'pH',
  'sg': 'Specific Gravity',
  'prot': 'Protein',
  'gluc': 'Glucose',
};

export function normalizeTestName(name: string): string {
  if (!name) return name;
  const lowerName = name.toLowerCase().trim();
  return termDictionary[lowerName] || name;
}

export function areEquivalentTerms(term1: string, term2: string): boolean {
  if (!term1 || !term2) return false;
  const norm1 = normalizeTestName(term1);
  const norm2 = normalizeTestName(term2);
  return norm1.toLowerCase() === norm2.toLowerCase();
}
