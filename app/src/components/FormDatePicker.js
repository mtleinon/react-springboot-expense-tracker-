import React from 'react';
import { FormGroup, Label, } from 'reactstrap';
import DatePicker from 'react-datepicker';

export default function FormDatePicker({ date, setDate }) {
  return (
    <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
      <Label for="expenseDate">Expense Date *</Label>
      <DatePicker selected={date} onChange={setDate}
        className="red-border"
      />
    </FormGroup>
  );
}