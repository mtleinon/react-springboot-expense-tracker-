import React from 'react';
import { FormFeedback, FormGroup, Label, Input } from 'reactstrap';

export default function FormInput({ id, label, value, onChange }) {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input invalid={value.feedback.length > 0} valid={value.valid} type="text"
        name={id} id={id}
        onChange={(e) => onChange(e.target.value)} value={value.value} />
      <FormFeedback>{value.feedback}</FormFeedback>
    </FormGroup>
  );
}