'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SourceBadge } from '@/components/common/SourceBadge';
import { Pencil, Check, X } from 'lucide-react';
import { usePatientStore } from '@/store/patient-store';
import { SourceType } from '@/types';

interface EditableFieldProps {
  fieldName: string;
  label: string;
  value: string;
  source: SourceType;
  onSave?: (newValue: string) => void;
}

export default function EditableField({ fieldName, label, value, source, onSave }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const { editField, reviewState } = usePatientStore((state) => state);
  
  const hasBeenEdited = reviewState.editedFields[fieldName] !== undefined;
  const displayValue = hasBeenEdited ? reviewState.editedFields[fieldName].newValue : value;
  const currentSource = hasBeenEdited ? 'user-corrected' : source;

  const handleSave = () => {
    editField(fieldName, value, editValue);
    if (onSave) onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(displayValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-500">{label}</div>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <Input 
              value={editValue} 
              onChange={(e) => setEditValue(e.target.value)} 
              className="max-w-xs"
            />
            <Button size="icon" variant="ghost" onClick={handleSave} className="text-green-600"><Check size={18} /></Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} className="text-red-600"><X size={18} /></Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg">{displayValue}</span>
            {hasBeenEdited && <span className="text-xs line-through text-gray-400 ml-2">{value}</span>}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <SourceBadge source={currentSource} />
        {!isEditing && (
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Pencil size={16} className="text-gray-500" />
          </Button>
        )}
      </div>
    </div>
  );
}
