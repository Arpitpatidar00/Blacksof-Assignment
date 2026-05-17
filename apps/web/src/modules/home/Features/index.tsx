"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { FEATURES_HEADER } from "@/constants";
import { FeatureCard } from "./FeatureCard";
import dynamic from "next/dynamic";
const FeatureCardForm = dynamic(() => import("./FeatureCardForm").then((m) => m.FeatureCardForm));
import { Button } from "@/components/base/Button";
import { useFeatures, useDeleteFeature } from "@/hooks/use-features";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/base/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/base/AlertDialog";
import type { FeatureCard as FeatureCardType } from "@blacksof/types";

export const Features = () => {
  const { data: featureCards, isLoading, isError } = useFeatures();
  const deleteMutation = useDeleteFeature();

  const [createOpen, setCreateOpen] = useState(false);
  const [editCard, setEditCard] = useState<FeatureCardType | null>(null);

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <section className="relative w-full px-[100px] py-[86px]">
      {/* Decorative line */}
      <Image
        src="/images/hero-line-decoration.svg"
        alt=""
        width={1542}
        height={1}
        className="absolute left-[125px] top-1/2 opacity-10"
        style={{ width: "auto", height: "auto" }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex justify-between items-start mb-[143px]">
        <div className="flex flex-col gap-[33px] max-w-[1587px]">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <Image src="/images/dejoule-badge.svg" alt="" width={14} height={21} style={{ width: "auto", height: "auto" }} aria-hidden="true" />
            <span className="font-body text-[20px] leading-[110%] uppercase text-primary tracking-[-0.05em]">
              {FEATURES_HEADER.badge}
            </span>
          </div>

          {/* Heading */}
          <div className="flex gap-[288px] items-start">
            <h2 className="max-w-[641px]">
              <span className="font-heading font-medium text-[48px] leading-[118%] tracking-[-0.04em] text-foreground">
                {FEATURES_HEADER.heading}{" "}
              </span>
              <span className="font-heading font-medium text-[48px] leading-[118%] tracking-[-0.04em] text-foreground">
                {FEATURES_HEADER.headingHighlight}
              </span>
            </h2>
            <p className="max-w-[577px] font-heading text-[20px] leading-[141%] tracking-[-0.05em] text-muted mt-1">
              {FEATURES_HEADER.description}{" "}
              <span className="font-medium text-foreground">{FEATURES_HEADER.descriptionBold}</span>
            </p>
          </div>
        </div>

        {/* Add Card Button */}
        <Button
          id="add-feature-card-btn"
          variant="see-how"
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 rounded-full px-6 h-[52px] border border-primary/20 cursor-pointer transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="font-heading font-medium text-[16px] text-primary">Add Card</span>
        </Button>
      </div>

      {/* Feature Cards — Stacked */}
      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 font-medium py-10">
            Failed to load features. Please try again later.
          </div>
        )}

        {featureCards?.map((card: FeatureCardType, i: number) => (
          <div
            key={card.id}
            className="sticky group"
            style={{
              top: `${143 + i * 80}px`,
              marginBottom: i < featureCards.length - 1 ? "40px" : "0",
            }}
          >
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                id={`edit-card-${card.id}`}
                variant="panel"
                size="sm"
                onClick={() => setEditCard(card)}
                className="flex items-center gap-1.5 hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="font-body text-[13px] font-medium">Edit</span>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    id={`delete-card-${card.id}`}
                    variant="panel"
                    size="sm"
                    className="flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:border-red-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="font-body text-[13px] font-medium">Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the feature card &quot;{card.title}&quot; and remove its image from the server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(card.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Yes, delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <FeatureCard
              icon={card.icon}
              title={card.title}
              heading={card.heading}
              description={card.description}
              features={card.features}
              image={card.image}
              cta={card.cta}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[660px] p-4">
          <DialogHeader>
            <DialogTitle>Add Feature Card</DialogTitle>
            <DialogDescription>
              Fill in the details for the new feature card. It will appear at the bottom of the stack.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <FeatureCardForm onSuccess={() => setCreateOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editCard} onOpenChange={(open) => !open && setEditCard(null)}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Edit Feature Card</DialogTitle>
            <DialogDescription>
              Update the details for{" "}
              <span className="font-medium text-foreground">{editCard?.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {editCard && (
              <FeatureCardForm
                defaultValues={editCard}
                onSuccess={() => setEditCard(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Features;
