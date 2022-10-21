import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CategoriesService } from 'src/services/categories.service';
import { AuthorizationGuard } from '../auth/authorization.guard';

interface ICreateCategory {
  category: string;
}

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('')
  @UseGuards(AuthorizationGuard)
  async createCategory(@Body() { category }: ICreateCategory) {
    return this.categoriesService.createCategory({ category });
  }
}
