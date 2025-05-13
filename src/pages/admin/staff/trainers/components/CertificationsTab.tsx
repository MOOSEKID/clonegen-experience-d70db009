
import React from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StaffProfile, StaffCertification } from '@/hooks/trainers/types';

interface CertificationsTabProps {
  trainer: StaffProfile;
  onAddCertification: () => void;
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ trainer, onAddCertification }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certifications</CardTitle>
        <Button variant="outline" size="sm" onClick={onAddCertification}>Add Certification</Button>
      </CardHeader>
      <CardContent>
        {trainer.certifications && trainer.certifications.length > 0 ? (
          <div className="divide-y">
            {trainer.certifications.map((cert, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{cert.certification_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuing_organization || 'No issuing organization'} •
                    {cert.issue_date && ` Issued: ${format(new Date(cert.issue_date), 'MMM d, yyyy')}`}
                    {cert.expiry_date && ` • Expires: ${format(new Date(cert.expiry_date), 'MMM d, yyyy')}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${cert.verified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {cert.verified ? 'Verified' : 'Unverified'}
                  </span>
                  {cert.certification_file && (
                    <Button variant="ghost" size="sm">View</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No certifications found</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={onAddCertification}>
              Add First Certification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationsTab;
