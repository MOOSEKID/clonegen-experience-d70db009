
import React from "react";
import { Lock, AtSign, MessageSquare } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control, useWatch } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface AuthenticationSetupFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const AuthenticationSetupFields = ({ control }: AuthenticationSetupFieldsProps) => {
  const membershipCategory = useWatch({
    control,
    name: "membershipCategory",
  });
  
  const generateUsername = useWatch({
    control,
    name: "generateUsername",
    defaultValue: true
  });
  
  const generateTemporaryPassword = useWatch({
    control,
    name: "generateTemporaryPassword",
    defaultValue: true
  });
  
  // Don't show for companies
  if (membershipCategory === "Company") {
    return (
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800">Company Account Setup</h4>
        <p className="text-xs text-blue-600 mt-1">
          For company memberships, user accounts can be set up after registration from the company management panel.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
        <h3 className="text-sm font-medium text-orange-800">Account Creation</h3>
        <p className="text-xs text-orange-600 mt-1">
          A user account will be automatically created for this member, allowing them to log in to the member dashboard.
        </p>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormField
            control={control}
            name="generateUsername"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Auto-generate Username</FormLabel>
                  <FormDescription>
                    Creates username using first.lastname format
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {!generateUsername && (
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="flex items-center gap-2">
                    <AtSign size={16} /> Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>
                    Username must be unique across all members
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        
        <div>
          <FormField
            control={control}
            name="generateTemporaryPassword"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Auto-generate Password</FormLabel>
                  <FormDescription>
                    Creates a secure temporary password
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {!generateTemporaryPassword && (
            <FormField
              control={control}
              name="temporaryPassword"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="flex items-center gap-2">
                    <Lock size={16} /> Temporary Password
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter temporary password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Member will be asked to change on first login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
      
      <FormField
        control={control}
        name="sendCredentials"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel className="flex items-center gap-2">
                <MessageSquare size={16} /> Send Login Credentials
              </FormLabel>
              <FormDescription>
                Automatically send login details via email and SMS
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AuthenticationSetupFields;
