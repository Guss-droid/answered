import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface ICreateQuestion {
  question: string;
  customerEmail: string;
  categoriesId: string;
}

interface ISearchQuestion {
  question: string;
}

interface IConcludedQuestion {
  email: string;
  id: string;
}

interface IEditQuestion {
  email: string;
  id: string;
  question: string;
}

interface IDeleteQuestion {
  email: string;
  id: string;
}

interface ISearchByCategory {
  categoriesId: string;
}

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async createQuestion({
    customerEmail,
    question,
    categoriesId,
  }: ICreateQuestion) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email: customerEmail,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist!');
    }

    const categoriesExists = await this.prisma.categories.findUnique({
      where: {
        id: categoriesId,
      },
    });

    if (!categoriesExists) {
      throw new Error('Category not found');
    }

    return await this.prisma.question.create({
      data: {
        question,
        customerEmail,
        categoriesId,
      },
    });
  }

  async searchByQuestion({ question }: ISearchQuestion) {
    const search = question
      ? {
          OR: [{ question: { contains: question } }],
        }
      : {};

    return await this.prisma.question.findMany({
      where: {
        ...search,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        question: true,
        answers: true,
        customerEmail: true,
        isConcluded: true,
        concludedAt: true,
        isEdited: true,
        editedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAllQuestions() {
    return await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        question: true,
        customerEmail: true,
        categoriesId: true,
        answers: true,
        isConcluded: true,
        concludedAt: true,
        isEdited: true,
        editedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async markConcluded({ email, id }: IConcludedQuestion) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('Users does not exist!');
    }

    const questionsExists = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!questionsExists) {
      throw new Error('Question not found!');
    }

    if (userExists.email !== questionsExists.customerEmail) {
      throw new Error('User not have a permission!');
    }

    return await this.prisma.question.update({
      where: {
        id,
      },
      data: {
        concludedAt: new Date().toISOString(),
        isConcluded: true,
      },
    });
  }

  async editQuestion({ email, id, question }: IEditQuestion) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('Users does not exist!');
    }

    const questionsExists = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!questionsExists) {
      throw new Error('Question not found!');
    }

    if (userExists.email !== questionsExists.customerEmail) {
      throw new Error('User not have a permission!');
    }

    if (questionsExists.isConcluded) {
      throw new Error('Is not possible to edit a question concluded!');
    }

    const answersExists = await this.prisma.answers.findMany({
      where: {
        questionId: id,
      },
    });

    if (answersExists.length >= 1) {
      throw new Error('Is not possible edit a questions with answer');
    }

    return await this.prisma.question.update({
      where: {
        id,
      },
      data: {
        editedAt: new Date().toISOString(),
        isEdited: true,
        question,
      },
    });
  }

  async deleteQuestion({ email, id }: IDeleteQuestion) {
    const userExists = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('Users does not exist!');
    }

    const questionsExists = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!questionsExists) {
      throw new Error('Question not found!');
    }

    if (userExists.email !== questionsExists.customerEmail) {
      throw new Error('User not have a permission!');
    }

    if (questionsExists.isConcluded) {
      throw new Error('Is not possible to delete a question concluded!');
    }

    const answersExists = await this.prisma.answers.findMany({
      where: {
        questionId: id,
      },
    });

    if (answersExists.length >= 1) {
      throw new Error('Is not possible remove a questions with answer');
    }

    await this.prisma.question.delete({
      where: {
        id,
      },
    });

    return { message: 'Delete successfully' };
  }

  async getQuestionById(id: string) {
    const questionExists = await this.prisma.question.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        question: true,
        customerEmail: true,
        answers: true,
        categoriesId: true,
        isConcluded: true,
        concludedAt: true,
        isEdited: true,
        editedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!questionExists) {
      throw new Error('Question not found!');
    }

    return questionExists;
  }

  async searchQuestionByCategory({ categoriesId }: ISearchByCategory) {
    const categoriesExists = await this.prisma.categories.findUnique({
      where: {
        id: categoriesId,
      },
    });

    if (!categoriesExists) {
      throw new Error('Category not found');
    }

    return await this.prisma.question.findMany({
      where: {
        categoriesId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
