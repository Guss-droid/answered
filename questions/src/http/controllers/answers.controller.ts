import { Controller, Post, UseGuards, Body, Param } from '@nestjs/common';
import { AnswersService } from 'src/services/answers.service';
import { CustomersService } from 'src/services/customers.service';
import { QuestionsService } from 'src/services/questions.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

interface ICreateAnswer {
  answer: string;
}

@Controller('answers')
export class AnswersController {
  constructor(
    private answersService: AnswersService,
    private customersService: CustomersService,
    private questionsService: QuestionsService,
  ) {}

  @Post('/:id')
  @UseGuards(AuthorizationGuard)
  async createAnswer(
    @CurrentUser() user: IAuthUser,
    @Body() { answer }: ICreateAnswer,
    @Param('id') id: string,
  ) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    if (!answer) {
      throw new Error('Is not possible send a empty answer!');
    }

    return await this.answersService.createAnswer({
      answer,
      id,
      email: customer.email,
    });
  }
}
