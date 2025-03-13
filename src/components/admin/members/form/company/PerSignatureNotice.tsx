
import React from "react";

interface PerSignatureNoticeProps {
  visible: boolean;
}

const PerSignatureNotice = ({ visible }: PerSignatureNoticeProps) => {
  if (!visible) return null;
  
  return (
    <div className="bg-orange-50 p-3 rounded-md border border-orange-200 mt-4">
      <p className="text-sm text-orange-700">
        <strong>Per-Signature Model:</strong> The company will be billed based on actual gym usage. 
        Attendance tracking will be used to generate invoices. You can view and export attendance 
        reports from the Company Dashboard.
      </p>
    </div>
  );
};

export default PerSignatureNotice;
