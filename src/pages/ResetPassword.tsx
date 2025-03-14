
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const passwordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const resetSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { resetPassword, updatePassword } = useAuth();
  const [isResetMode, setIsResetMode] = useState(!!searchParams.get('type'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: '',
    },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handlePasswordReset = async (data: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);
    await resetPassword(data.email);
    setIsSubmitting(false);
  };

  const handlePasswordUpdate = async (data: z.infer<typeof resetSchema>) => {
    setIsSubmitting(true);
    await updatePassword(data.password);
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            {isResetMode ? 'Set New Password' : 'Reset Your Password'}
          </CardTitle>
          <CardDescription className="text-center">
            {isResetMode 
              ? 'Enter your new password below' 
              : 'Enter your email and we'll send you instructions to reset your password'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isResetMode ? (
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handlePasswordUpdate)} className="space-y-6">
                <FormField
                  control={resetForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter new password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm new password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gym-orange hover:bg-gym-orange/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordReset)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gym-orange hover:bg-gym-orange/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </form>
            </Form>
          )}
          <div className="mt-4 text-center">
            <a 
              href="/login" 
              className="text-sm font-medium text-gym-orange hover:text-gym-orange/80"
            >
              Back to login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
