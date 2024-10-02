'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignIn = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center">Hello Again!</h1>
      <p className="text-sm text-center text-gray-600">Welcome Back</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={isLoading}
                    className="border-gray-300  text-black py-5 rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={isLoading}
                    className="border-gray-300  text-black py-5 rounded-md "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all disabled:bg-blue-300"
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </Button>
        </form>
      </Form>

      {/* Forgot Password */}
      <div className="flex justify-between items-center text-sm mt-4 rounded-md">
        <p className="text-gray-500">
          Don’t have an account?{' '}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
