import { Injectable } from '@nestjs/common';
import { CreateChefDto } from './dto/create-chef.dto';
import { UpdateChefDto } from './dto/update-chef.dto';

@Injectable()
export class ChefsService {
  create(createChefDto: CreateChefDto) {
    return 'This action adds a new chef';
  }

  findAll() {
    return `This action returns all chefs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chef`;
  }

  update(id: number, updateChefDto: UpdateChefDto) {
    return `This action updates a #${id} chef`;
  }

  remove(id: number) {
    return `This action removes a #${id} chef`;
  }
}
