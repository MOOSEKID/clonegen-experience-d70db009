
import React from "react";
import { CreditCard, Fingerprint } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface AuthenticationFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const AuthenticationFields = ({ control }: AuthenticationFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="nfcCardId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><CreditCard size={16} /> NFC Card ID</FormLabel>
            <FormControl>
              <Input placeholder="NFC Card ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="fingerprintId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><Fingerprint size={16} /> Fingerprint ID</FormLabel>
            <FormControl>
              <Input placeholder="Fingerprint ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AuthenticationFields;
