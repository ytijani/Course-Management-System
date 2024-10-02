"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Input} from '@/components/ui/input'
import { FormError } from "../form/form-error";
import { FormSuccess } from "../form/form-success";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, {message : "Password is required"})
});

const SignInForm = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values)
    };

const isLoading = form.formState.isSubmitting
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      title="Sign In"
      backButtonLabel="Don't have account?"
      backButtiHref="/sign-up"
      showSocial
    >
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="john.dow@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passowrd</FormLabel>
                  <FormControl>
                    <Input
                     disabled={isLoading}
                     {...field}
                     placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message="" />
          <FormSuccess message=""/>
          <Button 
            disabled={isLoading}
            type="submit"
            className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignInForm;
