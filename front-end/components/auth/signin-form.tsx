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
import { loginSchema } from "@/schemas/index";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";



const SignInForm = () => {
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
      try {
        const res = await axios.post("http://localhost:4000/auth/login", values, {withCredentials: true,});
        setSuccessMessage(res.data.message);
        form.reset();
        router.refresh()
  
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.message || "An error occurred");
        } else {
          setErrorMessage("An unknown error occurred");
        }
      }
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="john23"
                      type="username"
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
          <FormError message={errorMessage}/>
          <FormSuccess message={successMessage}/>
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
