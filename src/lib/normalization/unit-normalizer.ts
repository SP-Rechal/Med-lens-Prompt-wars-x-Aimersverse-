export const unitMap: Record<string, string> = {
  'mg/dl': 'mg/dL',
  'g/dl': 'g/dL',
  '10^3/ul': '×10³/µL',
  '10*3/ul': '×10³/µL',
  '10^6/ul': '×10⁶/µL',
  '10*6/ul': '×10⁶/µL',
  'u/l': 'U/L',
  'iu/l': 'IU/L',
  'meq/l': 'mEq/L',
  'mmol/l': 'mmol/L',
  'umol/l': 'µmol/L',
  'ug/dl': 'µg/dL',
  'pg/ml': 'pg/mL',
  'ng/ml': 'ng/mL',
  'ng/dl': 'ng/dL',
  'fmol/ml': 'fmol/mL',
  'g/l': 'g/L',
  'mg/l': 'mg/L',
  'miu/ml': 'mIU/mL',
  'ul': 'µL',
  'ml': 'mL',
  'dl': 'dL',
};

export function normalizeUnit(unit: string): string {
  if (!unit) return unit;
  const lowerUnit = unit.toLowerCase().trim();
  return unitMap[lowerUnit] || unit;
}
