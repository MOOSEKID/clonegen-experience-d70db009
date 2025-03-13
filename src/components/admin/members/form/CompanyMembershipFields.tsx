
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Users, Briefcase, CreditCard, FileText, Percent, UploadCloud } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface CompanyMembershipFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
  visible: boolean;
}

const CompanyMembershipFields = ({ control, visible }: CompanyMembershipFieldsProps) => {
  if (!visible) return null;

  const subscriptionModel = control._formValues.subscriptionModel || 'Fixed Fee';

  return (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg border">
      <h3 className="text-sm font-medium">Company Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building size={16} /> Company Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyContactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact person name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input placeholder="company@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Phone</FormLabel>
              <FormControl>
                <Input placeholder="+250788123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter company address" 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyTIN"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText size={16} /> Tax ID Number (TIN)
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter company TIN number" {...field} />
              </FormControl>
              <FormDescription>Required for tax-compliant invoicing</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="companyLogo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <UploadCloud size={16} /> Company Logo
            </FormLabel>
            <FormControl>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  // In a real app, you would upload the file to a server
                  // and get back a URL to store
                  const file = e.target.files?.[0];
                  if (file) {
                    // Simulating a file URL for demonstration
                    field.onChange(`company_logo_${file.name}`);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="companyMembershipPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Briefcase size={16} /> Company Plan
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="membersCovered"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users size={16} /> Members Covered
              </FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Number of members" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="billingCycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Cycle</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annually">Annually</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="paymentMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <CreditCard size={16} /> Payment Mode
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Company Invoice">Company Invoice</SelectItem>
                  <SelectItem value="Direct Payment">Direct Payment</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="subscriptionModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FileText size={16} /> Subscription Model
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subscription model" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Fixed Fee">Fixed Fee (Standard bulk pricing)</SelectItem>
                <SelectItem value="Per-Signature">Per-Signature (Pay per attendance)</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              {field.value === "Per-Signature" 
                ? "Company will be billed based on actual employee attendance" 
                : "Company will pay a fixed fee regardless of attendance"}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Corporate Discount Settings */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-medium mb-2">Corporate Discount</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="corporateDiscount.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Percent size={16} /> Discount Type
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Fixed Percentage">Fixed Percentage</SelectItem>
                    <SelectItem value="Tiered">Tiered Pricing</SelectItem>
                    <SelectItem value="Custom">Custom Discount</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="corporateDiscount.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Value (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g. 10 for 10%" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {subscriptionModel === 'Per-Signature' && (
        <div className="bg-orange-50 p-3 rounded-md border border-orange-200 mt-4">
          <p className="text-sm text-orange-700">
            <strong>Per-Signature Model:</strong> The company will be billed based on actual gym usage. 
            Attendance tracking will be used to generate invoices. You can view and export attendance 
            reports from the Company Dashboard.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyMembershipFields;
