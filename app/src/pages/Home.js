import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'reactstrap';
import ExpensesTable from '../components/ExpensesTable';

export default function Home() {
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    setIsLoadingExpenses(true);
    const response = await fetch('/api/expenses');
    const body = await response.json();
    setExpenses(body);
    setIsLoadingExpenses(false);
  }

  useEffect(() => {
    fetchExpenses();
  }, [])

  return (
    <Container className="mt-3">
      <h2 className="mt-4 mb-4">All Expenses:</h2>
      {isLoadingExpenses
        ? <Spinner color="primary" />
        : <ExpensesTable expenses={expenses} />
      }
    </Container>
  );
}