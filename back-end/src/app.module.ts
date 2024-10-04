import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.DATABASE_URL,
        };
      },
    }),
    CoursesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
