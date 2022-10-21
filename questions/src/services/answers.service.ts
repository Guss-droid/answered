import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface ICreateAnswer {
  id: string;
  email: string;
  answer: string;
}

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async createAnswer({ answer, email, id }: ICreateAnswer) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist!');
    }

    const questionExists = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!questionExists) {
      throw new Error('Question not found!');
    }

    if (questionExists.isConcluded) {
      throw new Error('Question already concluded!');
    }

    return await this.prisma.answers.create({
      data: {
        customerEmail: email,
        answer,
        questionId: questionExists.id,
      },
    });
  }
}
