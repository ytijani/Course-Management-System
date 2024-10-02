
'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Zod schema for registration validation
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register('username')}
              className="mt-1 block w-full"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              {...register('email')}
              className="mt-1 block w-full"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password')}
              className="mt-1 block w-full"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              className="mt-1 block w-full"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <div className="text-center mt-4">
            <a className="text-gray-500 hover:underline" >Already have an account? Sign In</a>
        </div>
      </motion.div>
  );
};

export default SignUp;
