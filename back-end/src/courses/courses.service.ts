import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schema/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ courses: Course[]; total: number }> {
    const [courses, total] = await Promise.all([
      this.courseModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.courseModel.countDocuments().exec(),
    ]);
    return { courses, total };
  }
}
