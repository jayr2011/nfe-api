export function calculateTotalServiceValue(
  unitValue: string,
  quantity: number,
  discount: number,
): number {
  return Number(unitValue) * quantity - discount;
}

export function calculatePisPasep(
  totalServiceValue: number,
  pisRate: number,
): number {
  return (totalServiceValue * pisRate) / 100;
}

export function calculateCsll(
  totalServiceValue: number,
  csllRate: number,
): number {
  return (totalServiceValue * csllRate) / 100;
}

export function calculateCofins(
  totalServiceValue: number,
  cofinsRate: number,
): number {
  return (totalServiceValue * cofinsRate) / 100;
}

export function calculateIssqn(
  totalServiceValue: number,
  issqnRate: number,
): number {
  return (totalServiceValue * issqnRate) / 100;
}

export function calculateInss(
  totalServiceValue: number,
  inssRate: number,
): number {
  return (totalServiceValue * inssRate) / 100;
}

export function calculateIr(totalServiceValue: number, irRate: number): number {
  return (totalServiceValue * irRate) / 100;
}

export function calculateNetValue(
  totalServiceValue: number,
  pis: number,
  csll: number,
  cofins: number,
  issqn: number,
  inss: number,
  ir: number,
): number {
  return totalServiceValue - pis - csll - cofins - issqn - inss - ir;
}

export function calculateEstimatedTaxesValue(
  totalServiceValue: number,
  pisRate: number,
  csllRate: number,
  cofinsRate: number,
  issqnRate: number,
  inssRate: number,
  irRate: number,
) {
  const pis = calculatePisPasep(totalServiceValue, pisRate);
  const csll = calculateCsll(totalServiceValue, csllRate);
  const cofins = calculateCofins(totalServiceValue, cofinsRate);
  const issqn = calculateIssqn(totalServiceValue, issqnRate);
  const inss = calculateInss(totalServiceValue, inssRate);
  const ir = calculateIr(totalServiceValue, irRate);

  return pis + csll + cofins + issqn + inss + ir;
}
