import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface IGiveLike {
  email: string;
  id: string;
}

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async giveLikeInQuestion({ email, id }: IGiveLike) {
    const likeAlreadyExists = await this.prisma.likesCustomer.findFirst({
      where: {
        customerEmail: email,
        questionId: id,
      },
    });

    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      throw new Error('Question not found!');
    }

    const customer = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer) {
      throw new Error('User does not exists!');
    }

    if (likeAlreadyExists) {
      await this.prisma.likesCustomer.delete({
        where: {
          id: likeAlreadyExists.id,
        },
      });

      return await this.prisma.question.update({
        where: {
          id: question.id,
        },
        data: {
          countLike: question.countLike - 1,
        },
      });
    }

    await this.prisma.likesCustomer.create({
      data: {
        customerEmail: customer.email,
        questionId: question.id,
      },
    });

    return await this.prisma.question.update({
      where: {
        id: question.id,
      },
      data: {
        countLike: question.countLike + 1,
      },
    });
  }

  async giveLikeInAnswer({ email, id }: IGiveLike) {
    const likeAlreadyExists = await this.prisma.likesCustomer.findFirst({
      where: {
        customerEmail: email,
        answersId: id,
      },
    });

    const answer = await this.prisma.answers.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      throw new Error('answer not found!');
    }

    const customer = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer) {
      throw new Error('User does not exists!');
    }

    if (likeAlreadyExists) {
      await this.prisma.likesCustomer.delete({
        where: {
          id: likeAlreadyExists.id,
        },
      });

      return await this.prisma.answers.update({
        where: {
          id: answer.id,
        },
        data: {
          count: answer.count - 1,
        },
      });
    }

    await this.prisma.likesCustomer.create({
      data: {
        customerEmail: customer.email,
        answersId: answer.id,
      },
    });

    return await this.prisma.answers.update({
      where: {
        id: answer.id,
      },
      data: {
        count: answer.count + 1,
      },
    });
  }
}
