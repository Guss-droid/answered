import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomersService } from 'src/services/customers.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

@Controller('user')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get('/questions')
  @UseGuards(AuthorizationGuard)
  async getMyQuestions(@CurrentUser() user: IAuthUser) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return this.customersService.getAllMyQuestions(customer.email);
  }

  @Get('/answers')
  @UseGuards(AuthorizationGuard)
  async getMyAnswers(@CurrentUser() user: IAuthUser) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return this.customersService.getAllMyAnswers(customer.email);
  }
}
