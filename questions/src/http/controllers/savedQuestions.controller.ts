import { Controller, Post, UseGuards, Param, Get } from '@nestjs/common';
import { CustomersService } from 'src/services/customers.service';
import { SavedQuestionsService } from 'src/services/savedQuestions.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

@Controller('save')
export class SavedQuestionsController {
  constructor(
    private savedQuestionsServices: SavedQuestionsService,
    private customersService: CustomersService,
  ) {}

  @Post('/:id')
  @UseGuards(AuthorizationGuard)
  async saveQuestion(@CurrentUser() user: IAuthUser, @Param('id') id: string) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return await this.savedQuestionsServices.saveQuestion({
      email: customer.email,
      questionId: id,
    });
  }

  @Get('')
  @UseGuards(AuthorizationGuard)
  async getSavesFromUser(@CurrentUser() user: IAuthUser) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return await this.savedQuestionsServices.getSavesByEmail({
      email: customer.email,
    });
  }
}
