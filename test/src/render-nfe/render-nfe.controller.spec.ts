/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RenderNfeController } from '../../../src/render-nfe/render-nfe.controller';
import { PdfService } from '../../../src/pdf/pdf.service';
import { NfeService } from '../../../src/nfe/services/nfe.service';
import { Response } from 'express';
import * as Handlebars from 'handlebars';

describe('RenderNfeController', () => {
  let controller: RenderNfeController;
  let pdfService: PdfService;
  let nfeService: NfeService;
  let res: Response;

  beforeEach(() => {
    pdfService = {
      generatePdfFromHtml: jest.fn().mockResolvedValue(Buffer.from('mock-pdf')),
    } as any;
    nfeService = { findOne: jest.fn() } as any;
    res = {
      set: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    controller = new RenderNfeController(nfeService, pdfService);
  });

  it('deve retornar 404 se nota não encontrada', async () => {
    (nfeService.findOne as jest.Mock).mockResolvedValue(null);
    await controller.generatePdf('1', res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Nota fiscal não encontrada');
  });

  it('deve gerar PDF e enviar resposta', async () => {
    const nfseData = { campo: 'valor' };
    (nfeService.findOne as jest.Mock).mockResolvedValue(nfseData);
    jest
      .spyOn(Handlebars, 'compile')
      .mockReturnValue(() => '<html>mock</html>');
    await controller.generatePdf('1', res);
    expect(pdfService.generatePdfFromHtml).toHaveBeenCalledWith(
      '<html>mock</html>',
    );
    expect(res.set).toHaveBeenCalledWith(
      expect.objectContaining({ 'Content-Type': 'application/pdf' }),
    );
    expect(res.end).toHaveBeenCalledWith(Buffer.from('mock-pdf'));
  });
});
