
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  CameraIcon, 
  FingerPrintIcon, 
  NfcIcon,
  PhoneIcon, 
  Upload, 
  Clock
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Member } from "@/hooks/useMembers";
import { cn } from "@/lib/utils";

// Define schema with required fields to match Member type
const memberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  membershipType: z.string().min(1, { message: "Please select a membership type" }),
  status: z.string().min(1, { message: "Please select a status" }),
  // New fields
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  membershipPlan: z.string().min(1, { message: "Please select a membership plan" }),
  trainerAssigned: z.string().optional(),
  workoutGoals: z.string().optional(),
  medicalConditions: z.string().optional(),
  preferredWorkoutTime: z.array(z.string()).optional(),
  paymentStatus: z.string().optional(),
  discountsUsed: z.string().optional(),
  notes: z.string().optional(),
  profilePicture: z.string().optional(),
  nfcCardId: z.string().optional(),
  fingerprintId: z.string().optional(),
  year: z.string().optional(),
  day: z.number().min(1).max(31).optional(),
});

// This ensures our form values type matches exactly what's expected
type MemberFormValues = z.infer<typeof memberSchema>;

// Generate array of years for the dropdown (from 1940 to current year)
const years = Array.from({ length: new Date().getFullYear() - 1940 + 1 }, (_, i) => 
  (new Date().getFullYear() - i).toString()
);

// Generate array of days 1-31 for the dropdown
const days = Array.from({ length: 31 }, (_, i) => i + 1);

// Workout time options
const workoutTimeOptions = [
  { id: "morning", label: "Morning (6AM-10AM)" },
  { id: "afternoon", label: "Afternoon (11AM-3PM)" },
  { id: "evening", label: "Evening (4PM-8PM)" },
  { id: "night", label: "Night (9PM-12AM)" },
  { id: "anytime", label: "Anytime" },
];

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">) => void;
}

const AddMemberDialog = ({ isOpen, onClose, onAddMember }: AddMemberDialogProps) => {
  const [profilePreview, setProfilePreview] = React.useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = React.useState<string>("January");
  const [autoSaveStatus, setAutoSaveStatus] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+250 ",
      membershipType: "Standard",
      status: "Active",
      gender: "Prefer not to say",
      membershipPlan: "Monthly",
      paymentStatus: "Pending",
      preferredWorkoutTime: [],
      year: new Date().getFullYear().toString(),
      day: 1,
    }
  });

  // Set up auto-save functionality
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      // Only save if at least name and email exist
      if (value.name && value.email) {
        setAutoSaveStatus("Auto-saving...");
        // Simulate auto-save with timeout
        const timeout = setTimeout(() => {
          setAutoSaveStatus("All changes saved");
          // Hide status message after a while
          setTimeout(() => setAutoSaveStatus(""), 2000);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle file upload
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        form.setError("profilePicture", {
          type: "manual",
          message: "Image size must be less than 5MB",
        });
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        form.setError("profilePicture", {
          type: "manual",
          message: "Only JPEG and PNG formats are allowed",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setProfilePreview(dataUrl);
        form.setValue("profilePicture", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle date construction from separate year/month/day fields
  const constructDate = () => {
    const year = form.getValues("year");
    const month = selectedMonth;
    const day = form.getValues("day");
    
    if (year && month && day) {
      const monthIndex = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"].indexOf(month);
      
      const date = new Date(parseInt(year), monthIndex, day);
      form.setValue("dateOfBirth", date);
    }
  };

  // Handle NFC registration simulation
  const handleNfcRegistration = () => {
    // Simulate NFC reading process
    setAutoSaveStatus("Scanning NFC card...");
    setTimeout(() => {
      const mockNfcId = "NFC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      form.setValue("nfcCardId", mockNfcId);
      setAutoSaveStatus("NFC card registered successfully");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    }, 1500);
  };

  // Handle fingerprint registration simulation
  const handleFingerprintRegistration = () => {
    // Simulate fingerprint scanning process
    setAutoSaveStatus("Scanning fingerprint...");
    setTimeout(() => {
      const mockFingerprintId = "FP-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      form.setValue("fingerprintId", mockFingerprintId);
      setAutoSaveStatus("Fingerprint registered successfully");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    }, 1500);
  };

  const handleSubmit = (values: MemberFormValues) => {
    // Create a properly typed object for the onAddMember function
    const formattedValues: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      membershipType: values.membershipType,
      status: values.status,
      dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, 'yyyy-MM-dd') : undefined,
      gender: values.gender,
      address: values.address,
      emergencyContact: values.emergencyContact,
      membershipPlan: values.membershipPlan,
      trainerAssigned: values.trainerAssigned,
      workoutGoals: values.workoutGoals,
      medicalConditions: values.medicalConditions,
      preferredWorkoutTime: values.preferredWorkoutTime,
      paymentStatus: values.paymentStatus,
      discountsUsed: values.discountsUsed,
      notes: values.notes,
      profilePicture: values.profilePicture,
      nfcCardId: values.nfcCardId,
      fingerprintId: values.fingerprintId,
    };

    // Submit the member data
    onAddMember(formattedValues);
    form.reset();
    setProfilePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new gym member.
          </DialogDescription>
        </DialogHeader>

        {autoSaveStatus && (
          <div className="py-1 px-2 text-xs bg-green-50 text-green-600 rounded-sm">
            {autoSaveStatus}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
                
                {/* Profile Picture Upload */}
                <div className="mb-4 flex flex-col items-center">
                  <div 
                    className="h-24 w-24 rounded-full bg-gym-orange/10 flex items-center justify-center mb-2 relative overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profilePreview ? (
                      <img 
                        src={profilePreview} 
                        alt="Profile preview" 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <CameraIcon className="h-8 w-8 text-gym-orange" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleProfilePictureChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Photo
                  </Button>
                  <FormMessage>
                    {form.formState.errors.profilePicture?.message}
                  </FormMessage>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.smith@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PhoneIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input placeholder="+250 78123456" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth with Year Dropdown & Day Picker */}
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            constructDate();
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        setSelectedMonth(value);
                        constructDate();
                      }}
                      defaultValue={selectedMonth}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"].map((month) => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(parseInt(value));
                            constructDate();
                          }}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {days.map((day) => (
                              <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-binary">Non-binary</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Gym Street, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Name: (123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Membership Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Membership Details</h3>
                
                <FormField
                  control={form.control}
                  name="membershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Type *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a membership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="membershipPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Plan *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Quarterly">Quarterly (3 months)</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainerAssigned"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trainer Assigned</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a trainer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="John Doe">John Doe</SelectItem>
                          <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                          <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workoutGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Goals</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select goals" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                          <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                          <SelectItem value="General Fitness">General Fitness</SelectItem>
                          <SelectItem value="Endurance">Endurance</SelectItem>
                          <SelectItem value="Strength">Strength</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Workout Time - Multi-select with checkboxes */}
                <FormField
                  control={form.control}
                  name="preferredWorkoutTime"
                  render={() => (
                    <FormItem>
                      <FormLabel>Preferred Workout Time</FormLabel>
                      <div className="space-y-2">
                        {workoutTimeOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="preferredWorkoutTime"
                            render={({ field }) => {
                              // Special case for "Anytime" to clear other selections
                              const handleCheckboxChange = (checked: boolean) => {
                                if (option.id === "anytime" && checked) {
                                  field.onChange(["anytime"]);
                                } else if (option.id === "anytime" && !checked) {
                                  field.onChange([]);
                                } else {
                                  const currentValue = field.value || [];
                                  const updatedValue = checked
                                    ? [...currentValue.filter(val => val !== "anytime"), option.id]
                                    : currentValue.filter(val => val !== option.id);
                                  field.onChange(updatedValue);
                                }
                              };
                              
                              return (
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`workout-time-${option.id}`}
                                    checked={field.value?.includes(option.id) || false}
                                    onCheckedChange={handleCheckboxChange}
                                    className="data-[state=checked]:bg-gym-orange data-[state=checked]:border-gym-orange"
                                  />
                                  <label
                                    htmlFor={`workout-time-${option.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountsUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discounts/Promotions</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select discount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="New Member">New Member (10% off)</SelectItem>
                          <SelectItem value="Family">Family Package (15% off)</SelectItem>
                          <SelectItem value="Student">Student Discount (20% off)</SelectItem>
                          <SelectItem value="Corporate">Corporate Partner (25% off)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* NST Authentication Section */}
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Smart Access Authentication (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="nfcCardId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel>NFC Card ID</FormLabel>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={handleNfcRegistration}
                            className="h-8"
                          >
                            <NfcIcon className="h-4 w-4 mr-1" />
                            Register Card
                          </Button>
                        </div>
                        <FormControl>
                          <Input placeholder="Scan NFC card to register" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="fingerprintId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel>Fingerprint ID</FormLabel>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={handleFingerprintRegistration}
                            className="h-8"
                          >
                            <FingerPrintIcon className="h-4 w-4 mr-1" />
                            Scan Fingerprint
                          </Button>
                        </div>
                        <FormControl>
                          <Input placeholder="Scan fingerprint to register" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium text-gray-500">Additional Information</h3>
              
              <FormField
                control={form.control}
                name="medicalConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Conditions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List any medical conditions or allergies..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes / Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional notes about the member..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2 text-xs text-gray-500">* Required fields</div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gym-orange hover:bg-gym-orange/90">
                Add Member
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
