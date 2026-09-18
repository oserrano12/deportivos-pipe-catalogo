export interface SizeInfo {
  id: string;
  gender: 'Dama' | 'Caballero';
  eur: string;
  col: string;
  us: string;
}

export const WOMEN_SIZES: SizeInfo[] = [
  { id: 'D-36', gender: 'Dama', eur: '36', col: '35', us: '5.5' },
  { id: 'D-37', gender: 'Dama', eur: '37', col: '36', us: '6.5' },
  { id: 'D-38', gender: 'Dama', eur: '38', col: '37', us: '7' },
  { id: 'D-39', gender: 'Dama', eur: '39', col: '38', us: '8' },
  { id: 'D-40', gender: 'Dama', eur: '40', col: '39', us: '8.5' },
];

export const MEN_SIZES: SizeInfo[] = [
  { id: 'C-40', gender: 'Caballero', eur: '40', col: '39', us: '7' },
  { id: 'C-41', gender: 'Caballero', eur: '41', col: '40', us: '8' },
  { id: 'C-42', gender: 'Caballero', eur: '42', col: '41', us: '8.5' },
  { id: 'C-43', gender: 'Caballero', eur: '43', col: '42', us: '9.5' },
  { id: 'C-44', gender: 'Caballero', eur: '44', col: '43', us: '10' },
];

export const ALL_SIZES = [...WOMEN_SIZES, ...MEN_SIZES];

export function getSizeInfo(id: string): SizeInfo | undefined {
  return ALL_SIZES.find(s => s.id === id);
}
