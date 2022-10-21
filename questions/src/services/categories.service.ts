import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface ICreateCategory {
  category: string;
}

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory({ category }: ICreateCategory) {
    const categoryAlreadyExists = await this.prisma.categories.findUnique({
      where: {
        category,
      },
    });

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!');
    }

    return await this.prisma.categories.create({
      data: {
        category,
      },
    });
  }
}
