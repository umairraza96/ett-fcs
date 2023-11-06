import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { CurrentUser } from 'src/common/decorators/currentuser.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('dishes')
export class DishesController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly dishesService: DishesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['chef'])
  async create(
    @CurrentUser() user: string,
    @Body() createDishDto: CreateDishDto,
  ) {
    await this.cacheManager.del('/dishes');
    return this.dishesService.create(user, createDishDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishesService.findOne(id);
  }

  @Roles(['chef'])
  @Patch(':id')
  update(
    @CurrentUser() user: string,
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
  ) {
    return this.dishesService.update(user, id, updateDishDto);
  }

  @Roles(['chef'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishesService.remove(id);
  }
}
