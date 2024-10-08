import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async getCourses(
    page: number,
    limit: number,
    search?: string,
    instructor?: string,
    schedule?: string,
  ): Promise<{
    courses: Course[];
    totalCourses: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query: any = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (instructor) {
      query.instructor = { $regex: instructor, $options: 'i' };
    }

    if (schedule) {
      const trimmedSchedule = schedule.trim();
      query.schedule = { $regex: new RegExp(trimmedSchedule, 'i') };
    }

    const courses = await this.courseModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalCourses = await this.courseModel.countDocuments(query).exec();

    return {
      courses,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
    };
  }
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    // Check if a course with the same title already exists
    const existingCourse = await this.courseModel
      .findOne({ title: createCourseDto.title })
      .exec();
    if (existingCourse) {
      throw new ConflictException('Course with this title already exists');
    }

    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }
}
