import { Body, Controller, Post, UseGuards, Put, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../auth/currentUser';

interface IUser {
  email: string;
  name: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IChangePassword {
  password: string;
}

@Controller()
export class UsersControllers {
  constructor(private usersService: UsersService) {}

  @Post('users')
  createAccount(@Body() { email, name, password }: IUser) {
    if (!email || !name || !password) {
      throw new Error('Missing email or password');
    }

    return this.usersService.createUserAccount({ email, name, password });
  }

  @Post('login')
  login(@Body() { email, password }: ILogin) {
    if (!email || !password) {
      throw new Error('Email or password incorrect');
    }

    return this.usersService.loginUser({ email, password });
  }

  @Put('profile/password')
  @UseGuards(AuthorizationGuard)
  changePassword(
    @CurrentUser() user: IAuthUser,
    @Body() { password }: IChangePassword,
  ) {
    if (!password) {
      throw new Error('Password invalid');
    }

    return this.usersService.changePassword({
      id: user.sub,
      password,
    });
  }

  @Get('admin')
  @UseGuards(AuthorizationGuard)
  listAllUsers(@CurrentUser() user: IAuthUser) {
    return this.usersService.listAllUsers({ id: user.sub });
  }
}
