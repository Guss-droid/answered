import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getAllMyQuestions(email: string) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

    return await this.prisma.question.findMany({
      where: {
        customerEmail: email,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllMyAnswers(email: string) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

    return await this.prisma.answers.findMany({
      where: {
        customerEmail: email,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        answer: true,
        question: true,
        questionId: true,
        customerEmail: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createCustomer(email: string) {
    const userAlreadyExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('Customer already exists!');
    }

    return await this.prisma.customer.create({
      data: {
        email,
      },
    });
  }

  async getCustomerByEmail(email: string) {
    return await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });
  }

  async me(email: string) {
    return await this.prisma.customer.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        answers: true,
        questions: true,
        likesCustomer: true,
        savedQuestions: true,
      },
    });
  }
}
