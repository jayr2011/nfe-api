import { PdfService } from '../../../src/pdf/pdf.service';
import * as puppeteer from 'puppeteer';

describe('PdfService', () => {
  let pdfService: PdfService;

  beforeEach(() => {
    pdfService = new PdfService();
  });

  it('deve gerar um Buffer de PDF a partir de HTML', async () => {
    // Mock do puppeteer
    const browserMock = {
      newPage: jest.fn().mockResolvedValue({
        setContent: jest.fn().mockResolvedValue(undefined),
        pdf: jest.fn().mockResolvedValue(Buffer.from('mock-pdf')),
      }),
      close: jest.fn().mockResolvedValue(undefined),
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    jest.spyOn(puppeteer, 'launch').mockResolvedValue(browserMock as any);

    const html = '<html><body>Teste PDF</body></html>';
    const result = await pdfService.generatePdfFromHtml(html);
    expect(result).toBeInstanceOf(Buffer);
    expect(result.toString()).toBe('mock-pdf');
  });

  it('deve fechar o browser após gerar o PDF', async () => {
    const closeMock = jest.fn().mockResolvedValue(undefined);
    const browserMock = {
      newPage: jest.fn().mockResolvedValue({
        setContent: jest.fn().mockResolvedValue(undefined),
        pdf: jest.fn().mockResolvedValue(Buffer.from('mock-pdf')),
      }),
      close: closeMock,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    jest.spyOn(puppeteer, 'launch').mockResolvedValue(browserMock as any);

    await pdfService.generatePdfFromHtml('<html></html>');
    expect(closeMock).toHaveBeenCalled();
  });
});
