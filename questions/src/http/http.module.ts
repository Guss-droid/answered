import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

import { AnswersService } from 'src/services/answers.service';
import { AnswersController } from './controllers/answers.controller';

import { QuestionsService } from 'src/services/questions.service';
import { QuestionsController } from './controllers/questions.controller';

import { CustomersService } from 'src/services/customers.service';
import { CustomerController } from './controllers/customer.controller';

import { CategoriesService } from 'src/services/categories.service';
import { CategoriesController } from './controllers/categories.controller';

import { SavedQuestionsService } from 'src/services/savedQuestions.service';
import { SavedQuestionsController } from './controllers/savedQuestions.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [
    AnswersService,
    CustomersService,
    QuestionsService,
    CategoriesService,
    SavedQuestionsService,
  ],
  controllers: [
    AnswersController,
    CustomerController,
    QuestionsController,
    CategoriesController,
    SavedQuestionsController,
  ],
})
export class HttpModule {}
