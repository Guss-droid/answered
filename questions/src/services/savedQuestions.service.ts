import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface ISaveQuestion {
  email: string;
  questionId: string;
}

interface IGetAllSavesFromUser {
  email: string;
}

@Injectable()
export class SavedQuestionsService {
  constructor(private prisma: PrismaService) {}

  async saveQuestion({ email, questionId }: ISaveQuestion) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    const questionExists = await this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!questionExists) {
      throw new Error('Question not found!');
    }

    const saveAlreadyExists = await this.prisma.savedQuestions.findFirst({
      where: {
        questionId,
        customerEmail: userExists.email,
      },
    });

    if (saveAlreadyExists) {
      await this.prisma.savedQuestions.delete({
        where: {
          id: saveAlreadyExists.id,
        },
      });

      return { message: 'Deletado com sucesso' };
    }

    return await this.prisma.savedQuestions.create({
      data: {
        customerEmail: userExists.email,
        questionId: questionExists.id,
      },
    });
  }

  async getSavesByEmail({ email }: IGetAllSavesFromUser) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist!');
    }

    return await this.prisma.savedQuestions.findMany({
      where: {
        customerEmail: email,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        customerEmail: true,
        questionId: true,
        question: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
