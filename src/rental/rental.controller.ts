import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @Get(':customerId')
  findAllByCustomerId(@Param('customerId') customerId: string) {
    return this.rentalService.findAllByCustomerId(+customerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.rentalService.removeAll();
  }
}
