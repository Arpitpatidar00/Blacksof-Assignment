"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Label } from "@/components/base/Input";
import { Button } from "@/components/base/Button";
import { Textarea } from "@/components/base/Textarea";
import { ApiClient } from "@blacksof/services";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company name is required." }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const RequestDemoForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await ApiClient.post("/demo", data);
      reset();
      onSuccess?.();
    } catch {
      // Error toast is handled globally by ApiClient
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-[12px] mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            placeholder="Acme Corp"
            {...register("company")}
            className={errors.company ? "border-red-500" : ""}
          />
          {errors.company && (
            <p className="text-red-500 text-[12px] mt-1">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Work Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@company.com"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-[12px] mt-1">{errors.email.message}</p>
        )}
      </div>



      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="How can we help?"
          {...register("message")}
          className={errors.message ? "border-red-500" : " "}
        />
        {errors.message && (
          <p className="text-red-500 text-[12px] mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="cta"
        disabled={isSubmitting}
        className="mt-6"
      >
        <span className="text-gradient-cta font-heading font-medium text-[18px]">
          {isSubmitting ? "Submitting..." : "Send Request"}
        </span>
      </Button>
    </form>
  );
};
