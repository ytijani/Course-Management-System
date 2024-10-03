import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const user = process.env.DATABASE_USER;
        const password = process.env.DATABASE_PASSWORD;
        const host = process.env.DATABASE_HOST;

        return {
          uri: `mongodb://${user}:${password}@${host}`,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
