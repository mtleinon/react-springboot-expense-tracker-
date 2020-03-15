import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import DropDown from '../components/DropDown';
import FormDatePicker from '../components/FormDatePicker';

import ExpensesTable from '../components/ExpensesTable';

import "react-datepicker/dist/react-datepicker.css";

export default function Expenses() {
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expenseDate, setExpenseDate] = useState(new Date());

  const [description, setDescription] = useState({ value: '', feedback: '', valid: false });
  const [location, setLocation] = useState({ value: '', feedback: '', valid: false });
  const [categoryName, setCategoryName] = useState({ value: '', feedback: '', valid: false });

  const formValid = description.valid && location.valid && categoryName.valid;

  const onChangeLocation = (newValue) => {
    const value = newValue;
    const valid = value.length > 0;
    const feedback = value.length < 1 ? 'Please give location' : '';
    setLocation({
      value,
      valid,
      feedback
    });
  }

  const onChangeCategoryName = (newValue) => {
    const value = newValue;
    const valid = true;
    const feedback = value.length < 1 ? 'Please select category' : '';
    setCategoryName({
      value,
      valid,
      feedback
    });
  }

  const deleteExpense = async (id) => {
    const response = await fetch('/api/expenses/' + id,
      {
        method: "delete",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      }
    );
    if (response.status === 200) {
      setExpenses(s => s.filter(expense => expense.id !== id))
    }
  }

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    const response = await fetch('/api/categories');
    const body = await response.json();
    setCategories(body);
    setIsLoadingCategories(false);
  }

  const fetchExpenses = async () => {
    setIsLoadingExpenses(true);
    const response = await fetch('/api/expenses');
    const body = await response.json();
    setExpenses(body);
    setIsLoadingExpenses(false);
  }

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, [])

  const createNewExpense = async (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }

    const newExpense = {
      id: 0,
      description: description.value,
      location: location.value,
      expenseDate,
      category: {
        id: categories.find(e => e.name === categoryName.value)['id'],
        name: categoryName.value
      }
    }

    const response = await fetch('/api/expenses/',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newExpense)
      }
    );

    if (response.status === 201) {
      const body = await response.json();
      setExpenses(s => ([...s, body]));
    }
  }

  const onChangeDescription = (newValue) => {
    const value = newValue;
    const valid = value.length > 0;
    const feedback = value.length < 1 ? 'Please give description' : '';
    setDescription({
      value,
      valid,
      feedback
    });
  }

  return (
    <Container className="p-3">
      <h3>Add Expense</h3>
      <Form onSubmit={createNewExpense}>

        <FormInput id="description" label="Description *" onChange={onChangeDescription} value={description} />

        {isLoadingCategories ? <Spinner color="primary" /> :
          <DropDown value={categoryName.value}
            options={categories.map(category => category.name)}
            onSelect={onChangeCategoryName}
            feedback={categoryName.feedback} />
        }
        <FormDatePicker date={expenseDate} setDate={setExpenseDate} />

        <FormInput id="location" label="Location *" onChange={onChangeLocation} value={location} />

        <FormGroup>
          <Button disabled={!formValid} color="success" type="submit" className="m-2">Save</Button>
          <Button className="m-2" color="danger" tag={Link} to="/home">Cancel</Button>
        </FormGroup>

      </Form>
      <h3 className="mt-5">Expenses List</h3>
      <Container className="mt-3">
        {isLoadingExpenses ? <Spinner color="primary" /> :
          <ExpensesTable expenses={expenses} deleteExpense={deleteExpense} />
        }
      </Container>
    </Container >
  );
}