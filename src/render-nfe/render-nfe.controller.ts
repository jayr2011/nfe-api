import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { PdfService } from '../pdf/pdf.service';
import { NfeService } from '../nfe/services/nfe.service';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as Handlebars from 'handlebars';

@ApiTags('render-nfe')
@Controller('render-nfe')
export class RenderNfeController {
  constructor(
    private readonly NfeService: NfeService,
    private readonly pdfService: PdfService,
  ) {}

  @Get('pdf/:id')
  @ApiOperation({
    summary: 'Gerar PDF de uma NFe pelo ID',
    description:
      'Gera e retorna o PDF da nota fiscal eletrônica correspondente ao ID informado.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da nota fiscal a ser renderizada',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'PDF gerado com sucesso',
    content: {
      'application/pdf': { schema: { type: 'string', format: 'binary' } },
    },
  })
  @ApiResponse({ status: 404, description: 'Nota fiscal não encontrada' })
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    try {
      const nfseData = await this.NfeService.findOne(+id);

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
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).send('Erro ao gerar PDF: ' + errorMessage);
    }
  }
}
