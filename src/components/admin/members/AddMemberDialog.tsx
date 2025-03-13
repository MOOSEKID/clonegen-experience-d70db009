
import * as React from "react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Member } from "@/types/memberTypes";
import { memberFormSchema, MemberFormValues } from "./form/MemberFormSchema";
import BasicInfoFields from "./form/BasicInfoFields";
import AuthenticationFields from "./form/AuthenticationFields";
import AddressField from "./form/AddressField";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">) => void;
}

const AddMemberDialog = ({ isOpen, onClose, onAddMember }: AddMemberDialogProps) => {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      membershipType: "Standard",
      status: "Active",
      dateOfBirth: undefined,
      gender: undefined,
      address: "",
      emergencyContact: "",
      membershipPlan: "Monthly",
      trainerAssigned: "",
      workoutGoals: "",
      medicalConditions: "",
      preferredWorkoutTime: [],
      paymentStatus: "",
      discountsUsed: "",
      notes: "",
      profilePicture: "",
      nfcCardId: "",
      fingerprintId: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: MemberFormValues) => {
    setIsSubmitting(true);
    try {
      onAddMember({
        ...values,
        status: values.status || "Active", // Ensure status is provided
      });
      onClose();
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Create a new member profile by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <BasicInfoFields control={form.control} />
            <AuthenticationFields control={form.control} />
            <AddressField control={form.control} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-gym-orange hover:bg-gym-orange/90">
                {isSubmitting ? "Submitting..." : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
