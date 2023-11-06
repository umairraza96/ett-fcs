import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DishesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: string, createDishDto: CreateDishDto) {
    console.log(user);
    const dish = await this.prisma.dish.create({
      data: { ...createDishDto, chef_id: user },
    });
    return dish;
  }

  async findAll() {
    const dishes = await this.prisma.dish.findMany();
    return dishes;
  }

  async findOne(id: string) {
    const dish = this.prisma.dish.findUnique({ where: { id } });
    return dish;
  }

  async update(user: string, id: string, updateDishDto: UpdateDishDto) {
    const checkDish = await this.prisma.dish.findUnique({ where: { id } });
    if (checkDish!.chef_id !== user) {
      throw new Error('You are not authorized to edit this dish');
    }
    const dish = await this.prisma.dish.update({
      where: { id },
      data: updateDishDto,
    });
    return dish;
  }

  async remove(id: string) {
    const dish = await this.prisma.dish.delete({ where: { id } });
    return dish;
  }
}
