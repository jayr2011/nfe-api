import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { NfeService } from '../services/nfe.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NfeEntity } from '../../entity/nfe.entity';
import { Logger } from '@nestjs/common';
import { NfeDto } from '../dto/nfeDto';
import { NfeMapper } from '../mappers/nfe.mapper';

@ApiTags('nfe')
@Controller('nfe')
export class NfeController {
  private readonly logger = new Logger(NfeController.name);
  constructor(private readonly nfeService: NfeService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new NFE record' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new NFE record',
  })
  async createNote(@Body() nfeDto: NfeDto) {
    try {
      const created = await this.nfeService.create(nfeDto);
      this.logger.log(`Invoice with ID: ${created.id} created successfully`);
      return NfeMapper.toDto(created);
    } catch (error) {
      this.logger.error('Error creating invoice', error);
      throw new HttpException(
        'Error creating invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Retrieve all NFE records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all NFE records',
  })
  findAll() {
    this.logger.log('Fetching all invoices');
    return this.nfeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific NFE record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the NFE record',
  })
  @ApiResponse({
    status: 404,
    description: 'NFE record not found',
  })
  async findOne(@Param('id') id: string) {
    try {
      const nfe = await this.nfeService.findOne(+id);
      if (!nfe) {
        this.logger.warn(`Invoice with ID: ${id} not found`);
        throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log(`Fetched invoice with ID: ${id}`);
      return nfe;
    } catch (error) {
      this.logger.error(`Error fetching invoice with ID: ${id}`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/all')
  @ApiOperation({ summary: 'Delete all NFE records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted all NFE records',
  })
  async deleteAll() {
    try {
      const result = await this.nfeService.deleteAll();
      this.logger.log('All invoices deleted successfully');
      return result;
    } catch (error) {
      this.logger.error('Error deleting all invoices', error);
      throw new HttpException(
        'Error deleting all invoices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a specific NFE record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the NFE record',
  })
  @ApiResponse({
    status: 404,
    description: 'NFE record not found',
  })
  async deleteOne(@Param('id') id: string) {
    try {
      const result = await this.nfeService.delete(+id);
      if (!result || result.deleted === false) {
        const message = result?.message ?? 'Invoice not found';
        this.logger.warn(`Invoice with ID: ${id} not found for deletion`);
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      this.logger.log(`Invoice with ID: ${id} deleted successfully`);
      return result;
    } catch (error) {
      this.logger.error(`Error deleting invoice with ID: ${id}`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error deleting invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a specific NFE record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the NFE record',
  })
  @ApiResponse({
    status: 404,
    description: 'NFE record not found for update',
  })
  async updateNote(@Param('id') id: string, @Body() nfe: NfeEntity) {
    try {
      const updated = await this.nfeService.update(+id, nfe);
      if (!updated) {
        this.logger.warn(`Invoice with ID: ${id} not found for update`);
        throw new HttpException(
          'Invoice not found for update',
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.log(`Invoice with ID: ${id} updated successfully`);
      return NfeMapper.toDto(updated);
    } catch (error) {
      this.logger.error(`Error updating invoice with ID: ${id}`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error updating invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
