import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CustomersService } from 'src/services/customers.service';
import { LikesService } from 'src/services/likes.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

interface IGiveLike {
  id: string;
}

@Controller('likes')
export class LikesController {
  constructor(
    private likesService: LikesService,
    private customersService: CustomersService,
  ) {}

  @Post('question')
  @UseGuards(AuthorizationGuard)
  async postLikeInQuestion(
    @Body() { id }: IGiveLike,
    @CurrentUser() user: IAuthUser,
  ) {
    if (!id) {
      throw new Error('Missing id!');
    }

    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return await this.likesService.giveLikeInQuestion({
      email: customer.email,
      id,
    });
  }

  @Post('answer')
  @UseGuards(AuthorizationGuard)
  async postLikeInAnswer(
    @Body() { id }: IGiveLike,
    @CurrentUser() user: IAuthUser,
  ) {
    if (!id) {
      throw new Error('Missing id!');
    }

    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return await this.likesService.giveLikeInAnswer({
      email: customer.email,
      id,
    });
  }
}
