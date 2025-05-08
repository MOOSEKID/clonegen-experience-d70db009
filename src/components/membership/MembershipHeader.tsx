
import React from 'react';

interface MembershipHeaderProps {
  title: string;
  subtitle: string;
}

const MembershipHeader = ({ title, subtitle }: MembershipHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-2 text-gym-dark">{title}</h1>
      <p className="text-lg text-gray-600 mb-12">{subtitle}</p>
    </>
  );
};

export default MembershipHeader;
