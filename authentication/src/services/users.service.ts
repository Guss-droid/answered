import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IChangePassword {
  password: string;
  id: string;
}

interface IListUsersAdmin {
  id: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUserAccount({ email, name, password }: ICreateUser) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 12);

    return await this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });
  }

  async loginUser({ email, password }: ILoginUser) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('Email or password incorrect');
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
        data: {
          sub: userExists.id,
          email: userExists.email,
        },
      },
      process.env.TOKEN_SECRET,
    );

    return { token: token };
  }

  async changePassword({ password, id }: IChangePassword) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exist!');
    }

    const passwordHash = await hash(password, 12);

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: passwordHash,
      },
    });

    return { message: 'Password updated successfully!' };
  }

  async listAllUsers({ id }: IListUsersAdmin) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User is invalid!');
    }

    if (!userExists.isAdmin) {
      throw new Error('User no have permission');
    }

    return await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
        email: true,
        id: true,
        isAdmin: true,
        name: true,
        updatedAt: true,
        password: false,
      },
    });
  }
}
