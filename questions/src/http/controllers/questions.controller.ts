import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomersService } from 'src/services/customers.service';
import { QuestionsService } from 'src/services/questions.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

interface ICreateQuestion {
  question: string;
  categoriesId: string;
}

@Controller('questions')
export class QuestionsController {
  constructor(
    private questionsService: QuestionsService,
    private customersService: CustomersService,
  ) {}

  @Post('')
  @UseGuards(AuthorizationGuard)
  async createQuestion(
    @Body() { question, categoriesId }: ICreateQuestion,
    @CurrentUser() user: IAuthUser,
  ) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return await this.questionsService.createQuestion({
      customerEmail: customer.email,
      question,
      categoriesId,
    });
  }

  @Get('')
  @UseGuards(AuthorizationGuard)
  async getAllQuestions() {
    return await this.questionsService.getAllQuestions();
  }

  @Post('search')
  @UseGuards(AuthorizationGuard)
  async searchByQuestion(@Body() { question }: ICreateQuestion) {
    return await this.questionsService.searchByQuestion({ question });
  }

  @Post('concluded/:id')
  @UseGuards(AuthorizationGuard)
  async markConcluded(@CurrentUser() user: IAuthUser, @Param('id') id: string) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return this.questionsService.markConcluded({ email: customer.email, id });
  }

  @Put('edit/:id')
  @UseGuards(AuthorizationGuard)
  async editQuestion(
    @CurrentUser() user: IAuthUser,
    @Param('id') id: string,
    @Body() { question }: ICreateQuestion,
  ) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    if (!question) {
      throw new Error('Question has required!');
    }

    return this.questionsService.editQuestion({
      id,
      question,
      email: customer.email,
    });
  }

  @Delete('delete/:id')
  @UseGuards(AuthorizationGuard)
  async deleteQuestion(
    @CurrentUser() user: IAuthUser,
    @Param('id') id: string,
  ) {
    let customer = await this.customersService.getCustomerByEmail(user.email);

    if (!customer) {
      customer = await this.customersService.createCustomer(user.email);
    }

    return this.questionsService.deleteQuestion({ email: customer.email, id });
  }

  @Get('/:id')
  @UseGuards(AuthorizationGuard)
  async getPageQuestionById(@Param('id') id: string) {
    return await this.questionsService.getQuestionById(id);
  }
}
