import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from 'src/services/users.service';
import { UsersControllers } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  providers: [UsersService],
  controllers: [UsersControllers],
})
export class HttpModule {}
