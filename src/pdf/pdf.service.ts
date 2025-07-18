import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdfFromHtml(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10px', bottom: '10px', left: '10px', right: '10px' },
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
