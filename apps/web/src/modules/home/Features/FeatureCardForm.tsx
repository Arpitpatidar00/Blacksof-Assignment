"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Label } from "@/components/base/Input";
import { FileUpload } from "@/components/base/FileUpload";
import { useCreateFeature, useUpdateFeature } from "@/hooks/use-features";
import type { FeatureCard } from "@blacksof/types";
import { Button } from "@/components/base/Button";

const featureCardSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  heading: z.string().min(4, "Heading is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.union([z.string().min(1, "Icon is required"), z.instanceof(File, { message: "Icon is required" })]),
  image: z.union([z.string().min(1, "Image is required"), z.instanceof(File, { message: "Image is required" })]),
  cta: z.string().min(1, "CTA text is required"),
  features: z.string().min(1, "Enter at least one feature (one per line)"),
});

type FormValues = z.infer<typeof featureCardSchema>;

interface FeatureCardFormProps {
  /** Pass a card to edit; omit to create a new one */
  defaultValues?: FeatureCard;
  onSuccess: () => void;
}

const Textarea = ({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) => (
  <textarea
    className={`flex min-h-[100px] w-full rounded-[15px] border border-black/10 bg-white/50 px-4 py-3 text-[16px] ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 transition-all resize-none ${className}`}
    {...props}
  />
);

export const FeatureCardForm = ({ defaultValues, onSuccess }: FeatureCardFormProps) => {
  const isEditing = !!defaultValues;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(featureCardSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      heading: defaultValues?.heading ?? "",
      description: defaultValues?.description ?? "",
      icon: defaultValues?.icon ?? "",
      image: defaultValues?.image ?? "",
      cta: defaultValues?.cta ?? "See how it works",
      features: defaultValues?.features ? [...defaultValues.features].join("\n") : "",
    },
  });

  // Keep form in sync if defaultValues change (e.g. opening a different card to edit)
  useEffect(() => {
    reset({
      title: defaultValues?.title ?? "",
      heading: defaultValues?.heading ?? "",
      description: defaultValues?.description ?? "",
      icon: defaultValues?.icon ?? "",
      image: defaultValues?.image ?? "",
      cta: defaultValues?.cta ?? "See how it works",
      features: defaultValues?.features ? [...defaultValues.features].join("\n") : "",
    });
  }, [defaultValues, reset]);

  const createMutation = useCreateFeature();
  const updateMutation = useUpdateFeature();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("heading", data.heading);
    formData.append("description", data.description);
    formData.append("cta", data.cta);
    formData.append("order", String(defaultValues?.order ?? 0));

    // Stringify features array for the backend middleware to parse
    const featuresArray = data.features.split("\n").map((f) => f.trim()).filter(Boolean);
    formData.append("features", JSON.stringify(featuresArray));

    if (data.icon instanceof File) formData.append("icon", data.icon);
    else formData.append("icon", data.icon); // existing string URL

    if (data.image instanceof File) formData.append("image", data.image);
    else formData.append("image", data.image); // existing string URL

    if (isEditing && defaultValues) {
      await updateMutation.mutateAsync({ id: defaultValues.id, data: formData as unknown as Partial<FeatureCard> });
    } else {
      await createMutation.mutateAsync(formData as unknown as Omit<FeatureCard, "id">);
    }

    onSuccess();
  };

  const isPending = isSubmitting || createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
      {/* Title */}
      <div>
        <Label htmlFor="fc-title">Card Title</Label>
        <Input
          id="fc-title"
          placeholder="Smart Analytics & Reporting"
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-[12px] mt-1">{errors.title.message}</p>}
      </div>

      {/* Heading */}
      <div>
        <Label htmlFor="fc-heading">Heading</Label>
        <Input
          id="fc-heading"
          placeholder="From raw data to real decisions in real time"
          {...register("heading")}
          className={errors.heading ? "border-red-500" : ""}
        />
        {errors.heading && <p className="text-red-500 text-[12px] mt-1">{errors.heading.message}</p>}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="fc-description">Description</Label>
        <Textarea
          id="fc-description"
          placeholder="An analytics engine that turns operational data..."
          {...register("description")}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-red-500 text-[12px] mt-1">{errors.description.message}</p>}
      </div>

      {/* Features — one per line */}
      <div>
        <Label htmlFor="fc-features">Features (one per line)</Label>
        <Textarea
          id="fc-features"
          placeholder={"Auto-generated insights\n360° visibility\nBuilt-in intelligence"}
          {...register("features")}
          className={errors.features ? "border-red-500" : ""}
        />
        {errors.features && <p className="text-red-500 text-[12px] mt-1">{errors.features.message}</p>}
      </div>

      {/* Icon + Image side-by-side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Icon</Label>
          <Controller
            control={control}
            name="icon"
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                label="Drop icon here"
                maxSize={5 * 1024 * 1024} // 5MB
              />
            )}
          />
          {errors.icon && <p className="text-red-500 text-[12px] mt-1">{errors.icon.message}</p>}
        </div>
        <div>
          <Label>Image</Label>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                label="Drop image here"
                maxSize={10 * 1024 * 1024} // 10MB
              />
            )}
          />
          {errors.image && <p className="text-red-500 text-[12px] mt-1">{errors.image.message}</p>}
        </div>
      </div>

      {/* CTA */}
      <div>
        <Label htmlFor="fc-cta">CTA Button Text</Label>
        <Input
          id="fc-cta"
          placeholder="See how it works"
          {...register("cta")}
          className={errors.cta ? "border-red-500" : ""}
        />
        {errors.cta && <p className="text-red-500 text-[12px] mt-1">{errors.cta.message}</p>}
      </div>

      <Button
        type="submit"
        variant="cta"
        disabled={isPending}
        className="mt-4"
      >
        <span className="text-gradient-cta font-heading font-medium text-[16px]">
          {isPending ? "Saving..." : defaultValues?.title ? "Save Changes" : "Add Card"}
        </span>
      </Button>
    </form>
  );
};
