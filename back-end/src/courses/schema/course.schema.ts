import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  instructor: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  schedule: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
