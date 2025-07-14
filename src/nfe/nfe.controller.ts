import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { NfeService } from './nfe.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NfeEntity } from '../../src/entity/nfe.entity';

@ApiTags('nfe')
@Controller('nfe')
export class NfeController {
  constructor(private readonly nfeService: NfeService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new NFE record' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new NFE record',
  })
  async createNote(@Body() nfe: NfeEntity) {
    try {
      const created = await this.nfeService.create(nfe);
      return created;
    } catch (error) {
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
        throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }
      return nfe;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('all')
  @ApiOperation({ summary: 'Delete all NFE records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted all NFE records',
  })
  async deleteAll() {
    try {
      const result = await this.nfeService.deleteAll();
      return result;
    } catch (error) {
      throw new HttpException(
        'Error deleting all invoices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
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
      if (!result.deleted) {
        throw new HttpException(result.message, HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error deleting invoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
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
        throw new HttpException(
          'Invoice not found for update',
          HttpStatus.NOT_FOUND,
        );
      }
      return updated;
    } catch (error) {
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
