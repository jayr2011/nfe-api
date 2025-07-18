import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from '../pdf/pdf.service';
import { NfeService } from '../nfe/services/nfe.service';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as Handlebars from 'handlebars';

@Controller('render-nfe')
export class RenderNfeController {
  constructor(
    private readonly NfeService: NfeService,
    private readonly pdfService: PdfService,
  ) {}

  @Get('pdf/:id')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const nfseData = await this.NfeService.findOne(+id); // ajuste conforme seu método real

    if (!nfseData) {
      return res.status(404).send('Nota fiscal não encontrada');
    }
    const templatePath = join(process.cwd(), 'views', 'nfes.hbs');
    const templateFile = readFileSync(templatePath, 'utf8');

    const template = Handlebars.compile(templateFile);
    const html = template(nfseData);
    const pdfBuffer = await this.pdfService.generatePdfFromHtml(html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=nfes_${id}.pdf`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
