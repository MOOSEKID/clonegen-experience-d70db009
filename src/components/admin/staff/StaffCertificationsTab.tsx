import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon, X, Plus, FileText, Check, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { StaffProfile, StaffCertification } from '@/hooks/trainers/types';
import { useCertificationsManagement } from '@/hooks/trainers/useCertificationsManagement';
import { cn } from '@/lib/utils';

interface StaffCertificationsTabProps {
  staffMember: StaffProfile;
}

const StaffCertificationsTab: React.FC<StaffCertificationsTabProps> = ({ staffMember }) => {
  const { addCertification, deleteCertification } = useCertificationsManagement();
  const [certifications, setCertifications] = useState<StaffCertification[]>(
    staffMember.certifications || []
  );
  
  // Form state
  const [certName, setCertName] = useState("");
  const [organization, setOrganization] = useState("");
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleDeleteCertification = async (certId: string) => {
    try {
      await deleteCertification(certId);
      setCertifications(certifications.filter(cert => cert.id !== certId));
    } catch (error) {
      console.error("Failed to delete certification:", error);
    }
  };

  const handleAddCertification = async () => {
    if (!certName || !organization) return;

    try {
      const newCert = await addCertification({
        staff_id: staffMember.id,
        certification_name: certName,
        issuing_organization: organization,
        issue_date: issueDate ? format(issueDate, 'yyyy-MM-dd') : undefined,
        expiry_date: expiryDate ? format(expiryDate, 'yyyy-MM-dd') : undefined,
        certification_file: fileUrl || undefined,
        verified: false,
      });

      // Ensure the returned certification has the correct shape
      const staffCert: StaffCertification = {
        id: newCert.id,
        staff_id: staffMember.id,
        certification_name: newCert.certification_name,
        issuing_organization: newCert.issuing_organization,
        issue_date: newCert.issue_date,
        expiry_date: newCert.expiry_date,
        certification_file: newCert.certification_file,
        verified: newCert.verified || false,
        created_at: newCert.created_at,
        updated_at: newCert.updated_at
      };

      setCertifications([...certifications, staffCert]);
      
      // Reset form
      setCertName("");
      setOrganization("");
      setIssueDate(null);
      setExpiryDate(null);
      setFileUrl("");
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add certification:", error);
    }
  };

  const toggleAddForm = () => {
    setIsAdding(!isAdding);
    
    // Reset form if closing
    if (isAdding) {
      setCertName("");
      setOrganization("");
      setIssueDate(null);
      setExpiryDate(null);
      setFileUrl("");
    }
  };

  // Check if a certification has expired
  const isExpired = (expiryDate: string | undefined | null) => {
    if (!expiryDate) return false;
    
    const expiry = new Date(expiryDate);
    return expiry < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Certifications</h3>
        <Button 
          variant={isAdding ? "default" : "outline"}
          size="sm" 
          onClick={toggleAddForm}
        >
          {isAdding ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </>
          )}
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Certification Name*</label>
                <Input 
                  placeholder="e.g. Personal Trainer Certification" 
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Issuing Organization*</label>
                <Input 
                  placeholder="e.g. National Academy of Sports Medicine" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Issue Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !issueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {issueDate ? format(issueDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={issueDate || undefined}
                      onSelect={setIssueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expiryDate || undefined}
                      onSelect={setExpiryDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Certificate File URL (optional)</label>
              <Input 
                placeholder="https://example.com/certificate.pdf" 
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Direct link to certification document (PDF, image, etc.)
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={toggleAddForm}>Cancel</Button>
              <Button 
                onClick={handleAddCertification}
                disabled={!certName || !organization}
              >
                Add Certification
              </Button>
            </div>
          </div>
        </Card>
      )}

      {certifications.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-muted/30">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h3 className="mt-3 text-lg font-medium text-muted-foreground/90">No certifications yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add professional certifications and qualifications for this staff member
          </p>
          <Button 
            onClick={toggleAddForm} 
            className="mt-4" 
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" /> Add First Certification
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{cert.certification_name}</h4>
                      {cert.verified ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Pending Verification
                        </Badge>
                      )}
                      
                      {cert.expiry_date && isExpired(cert.expiry_date) && (
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          <AlertCircle className="mr-1 h-3 w-3" /> Expired
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.issuing_organization}</p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteCertification(cert.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {cert.issue_date && (
                    <span>Issued: {new Date(cert.issue_date).toLocaleDateString()}</span>
                  )}
                  {cert.expiry_date && (
                    <span>Expires: {new Date(cert.expiry_date).toLocaleDateString()}</span>
                  )}
                </div>
                
                {cert.certification_file && (
                  <div className="mt-3">
                    <a 
                      href={cert.certification_file} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      <FileText className="mr-1 h-3 w-3" /> View Certificate
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default StaffCertificationsTab;
