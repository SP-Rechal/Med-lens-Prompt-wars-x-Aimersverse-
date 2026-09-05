'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { usePatientStore } from '@/store/patient-store';

interface VerificationCheckboxProps {
  section: string;
  label: string;
}

export default function VerificationCheckbox({ section, label }: VerificationCheckboxProps) {
  const { verifySection, unverifySection, reviewState } = usePatientStore((state) => state);
  const isVerified = reviewState.verifiedSections.includes(section);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      verifySection(section);
    } else {
      unverifySection(section);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <Checkbox 
        id={`verify-${section}`} 
        checked={isVerified} 
        onCheckedChange={handleCheckedChange} 
      />
      <Label 
        htmlFor={`verify-${section}`} 
        className="flex-1 cursor-pointer font-medium"
      >
        {label}
      </Label>
      {isVerified && (
        <span className="text-green-600 text-sm font-medium flex items-center">
          Verified ✓
        </span>
      )}
    </div>
  );
}
