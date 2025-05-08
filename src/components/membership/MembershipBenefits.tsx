
import React from 'react';

interface MembershipBenefitsProps {
  benefits: string[];
}

const MembershipBenefits = ({ benefits }: MembershipBenefitsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gym-dark">Membership Benefits</h2>
      <p className="text-gray-700 mb-4">
        All members, regardless of plan, enjoy these additional benefits:
      </p>
      <ul className="space-y-2 list-disc pl-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-gray-700">{benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipBenefits;
