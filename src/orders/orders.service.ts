import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { ...createOrderDto, user_id: userId },
    });
    return order;
  }

  async findAll(userId: string) {
    const orders = await this.prisma.order.findMany({ where: { id: userId } });
    return orders;
  }

  async findOne(userId: string, id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
