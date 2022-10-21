import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { CategoriesService } from 'src/services/categories.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

interface ICreateCategory {
  category: string;
}

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('')
  @UseGuards(AuthorizationGuard)
  async createCategory(
    @Body() { category }: ICreateCategory,
    @CurrentUser() user: IAuthUser,
  ) {
    if (!category) {
      throw new Error('Is not possible to create a category empty');
    }

    if (!user.isAdmin) {
      throw new Error('User does not have permission');
    }

    return await this.categoriesService.createCategory({ category });
  }

  @Get('')
  @UseGuards(AuthorizationGuard)
  async getCategories() {
    return await this.categoriesService.allCategories();
  }
}
