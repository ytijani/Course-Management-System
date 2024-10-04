import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const host = process.env.DATABASE_HOST;
        const dbname = process.env.DATABASE_NAME;
        return {
          uri: `mongodb://${host}/${dbname}`,
        };
      },
    }),
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
