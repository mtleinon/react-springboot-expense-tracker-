import React from 'react';
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, FormGroup, Label, DropdownItem } from 'reactstrap';

const FormError = ({ children }) => {
  let isError = false;
  if (children.length > 0) {
    isError = true;
  }
  return (
    <p className={'text-danger' + (!isError ? ' hidden' : '')}>
      {children} X
    </p>
  )
}

export default function DropDown({ value, options, onSelect, feedback }) {

  return (
    <FormGroup>
      <Label for="categoryName">Category *</Label>
      <UncontrolledDropdown id="categoryName" >
        <DropdownToggle caret>
          {value}
        </DropdownToggle>
        <DropdownMenu>
          {options.map(option =>
            <DropdownItem key={option} name='option'
              onClick={() => onSelect(option)}>
              {option}
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
      <FormError>{feedback}</FormError>
    </FormGroup>);
}
