'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SourceBadge } from '@/components/common/SourceBadge';
import { usePatientStore } from '@/store/patient-store';
import { useWorkflowStore } from '@/store/workflow-store';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PatientIntake, Symptom, Allergy, Medication } from '@/types/patient';

export default function PatientIntakeForm() {
  const { setPatientIntake } = usePatientStore((state: any) => state);
  const { markStepComplete, nextStep } = useWorkflowStore((state: any) => state);

  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [sex, setSex] = useState<'male' | 'female' | 'other'>('male');
  
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [conditionInput, setConditionInput] = useState('');
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddCondition = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && conditionInput.trim()) {
      e.preventDefault();
      if (!conditions.includes(conditionInput.trim())) {
        setConditions([...conditions, conditionInput.trim()]);
      }
      setConditionInput('');
    }
  };

  const removeCondition = (c: string) => {
    setConditions(conditions.filter((item) => item !== c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age || age <= 0) newErrors.age = 'Valid age is required';
    if (symptoms.length === 0) newErrors.symptoms = 'At least one symptom is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const intake: PatientIntake = {
      id: crypto.randomUUID(),
      name,
      age: Number(age),
      sex,
      symptoms,
      conditions,
      allergies,
      medications,
      notes,
      createdAt: new Date(),
    };
    
    setPatientIntake(intake);
    markStepComplete('intake');
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Demographics</CardTitle>
          <SourceBadge source="user-provided" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="age">Age *</Label>
            <Input id="age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div>
            <Label htmlFor="sex">Sex</Label>
            <Select value={sex} onValueChange={(val: any) => setSex(val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">male</SelectItem>
                <SelectItem value="female">female</SelectItem>
                <SelectItem value="other">other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Symptoms *</CardTitle>
          <SourceBadge source="user-provided" />
        </CardHeader>
        <CardContent className="space-y-4">
          {symptoms.map((sym, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Description</Label>
                <Input value={sym.description} onChange={(e) => {
                  const newSyms = [...symptoms];
                  newSyms[index].description = e.target.value;
                  setSymptoms(newSyms);
                }} />
              </div>
              <div className="flex-1">
                <Label>Duration</Label>
                <Input value={sym.duration || ''} onChange={(e) => {
                  const newSyms = [...symptoms];
                  newSyms[index].duration = e.target.value;
                  setSymptoms(newSyms);
                }} />
              </div>
              <div className="flex-1">
                <Label>Frequency</Label>
                <Input value={sym.frequency || ''} onChange={(e) => {
                  const newSyms = [...symptoms];
                  newSyms[index].frequency = e.target.value;
                  setSymptoms(newSyms);
                }} />
              </div>
              <div className="flex-1">
                <Label>Severity</Label>
                <Select value={sym.severity} onValueChange={(val: any) => {
                  const newSyms = [...symptoms];
                  newSyms[index].severity = val;
                  setSymptoms(newSyms);
                }}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mild">Mild</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" variant="destructive" onClick={() => setSymptoms(symptoms.filter((_, i) => i !== index))}><X size={16} /></Button>
            </div>
          ))}
          {errors.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
          <Button type="button" variant="outline" onClick={() => setSymptoms([...symptoms, { description: '', duration: '', severity: 'Mild', frequency: '' }])}>
            <Plus size={16} className="mr-2" /> Add Symptom
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Medical Conditions</CardTitle>
          <SourceBadge source="user-provided" />
        </CardHeader>
        <CardContent>
          <Input 
            value={conditionInput} 
            onChange={(e) => setConditionInput(e.target.value)} 
            onKeyDown={handleAddCondition}
            placeholder="Type condition and press Enter"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {conditions.map(c => (
              <Badge key={c} variant="secondary">
                {c} <button type="button" onClick={() => removeCondition(c)} className="ml-2 text-red-500"><X size={12}/></button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Allergies</CardTitle>
          <SourceBadge source="user-provided" />
        </CardHeader>
        <CardContent className="space-y-4">
          {allergies.map((allergy, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Allergen</Label>
                <Input value={allergy.allergen} onChange={(e) => {
                  const newAllergies = [...allergies];
                  newAllergies[index].allergen = e.target.value;
                  setAllergies(newAllergies);
                }} />
              </div>
              <div className="flex-1">
                <Label>Reaction</Label>
                <Input value={allergy.reaction || ''} onChange={(e) => {
                  const newAllergies = [...allergies];
                  newAllergies[index].reaction = e.target.value;
                  setAllergies(newAllergies);
                }} />
              </div>
              <div className="flex-1">
                <Label>Severity</Label>
                <Select value={allergy.severity} onValueChange={(val: any) => {
                  const newAllergies = [...allergies];
                  newAllergies[index].severity = val;
                  setAllergies(newAllergies);
                }}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mild">Mild</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" variant="destructive" onClick={() => setAllergies(allergies.filter((_, i) => i !== index))}><X size={16} /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setAllergies([...allergies, { allergen: '', severity: 'Mild', reaction: '' }])}>
            <Plus size={16} className="mr-2" /> Add Allergy
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Medications</CardTitle>
          <SourceBadge source="user-provided" />
        </CardHeader>
        <CardContent className="space-y-4">
          {medications.map((med, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Name</Label>
                <Input value={med.name} onChange={(e) => {
                  const newMeds = [...medications];
                  newMeds[index].name = e.target.value;
                  setMedications(newMeds);
                }} />
              </div>
              <div className="flex-1">
                <Label>Dosage</Label>
                <Input value={med.dosage || ''} onChange={(e) => {
                  const newMeds = [...medications];
                  newMeds[index].dosage = e.target.value;
                  setMedications(newMeds);
                }} />
              </div>
              <div className="flex-1">
                <Label>Frequency</Label>
                <Input value={med.frequency || ''} onChange={(e) => {
                  const newMeds = [...medications];
                  newMeds[index].frequency = e.target.value;
                  setMedications(newMeds);
                }} />
              </div>
              <Button type="button" variant="destructive" onClick={() => setMedications(medications.filter((_, i) => i !== index))}><X size={16} /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setMedications([...medications, { name: '', dosage: '', frequency: '' }])}>
            <Plus size={16} className="mr-2" /> Add Medication
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Additional Notes</CardTitle>
          <SourceBadge source="user-provided" />
        </CardHeader>
        <CardContent>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional information..." />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">Next Step</Button>
      </div>
    </form>
  );
}
