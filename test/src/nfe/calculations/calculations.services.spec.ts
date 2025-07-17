import {
  calculateTotalServiceValue,
  calculatePisPasep,
  calculateCsll,
  calculateCofins,
  calculateIssqn,
  calculateInss,
  calculateIr,
  calculateNetValue,
  calculateEstimatedTaxesValue,
} from '../../../../src/nfe/calculations/calculations.services';

describe('Calculations Services', () => {
  it('should calculate total service value', () => {
    expect(calculateTotalServiceValue('100', 2, 10)).toBe(190);
  });

  it('should calculate PIS/PASEP', () => {
    expect(calculatePisPasep(200, 1.65)).toBeCloseTo(3.3);
  });

  it('should calculate CSLL', () => {
    expect(calculateCsll(200, 1)).toBe(2);
  });

  it('should calculate COFINS', () => {
    expect(calculateCofins(200, 3)).toBe(6);
  });

  it('should calculate ISSQN', () => {
    expect(calculateIssqn(200, 5)).toBe(10);
  });

  it('should calculate INSS', () => {
    expect(calculateInss(200, 2)).toBe(4);
  });

  it('should calculate IR', () => {
    expect(calculateIr(200, 1)).toBe(2);
  });

  it('should calculate net value', () => {
    expect(calculateNetValue(200, 2, 2, 2, 2, 10, 2)).toBe(180);
  });

  it('should calculate estimated taxes value', () => {
    const result = calculateEstimatedTaxesValue(200, 1, 1, 1, 1, 1, 1);
    expect(result).toBe(12);
  });
});
