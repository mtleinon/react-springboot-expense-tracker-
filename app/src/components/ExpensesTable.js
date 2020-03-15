import React from 'react';
import { Table, Button } from 'reactstrap';
import Moment from 'react-moment';

export default function ExpensesTable({ expenses, deleteExpense }) {
  return (
    <Table>

      <thead>
        <tr>
          <th width="40%">Description</th>
          <th width="25%">Date</th>
          <th width="15%">Location</th>
          <th width="10%">Category</th>
          {!!deleteExpense && <th width="10%">Action</th>}
        </tr>
      </thead>

      <tbody>
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td width="40%">{expense.description}</td>
            <td width="25%"><Moment format="YYYY/MM/DD">{expense.expenseDate}</Moment></td>
            <td width="15%">{expense.location}</td>
            <td width="10%">{expense.category.name}</td>
            <td width="10%">
              {!!deleteExpense &&
                <Button color="danger" onClick={() => deleteExpense(expense.id)}>
                  Delete
                </Button>
              }
            </td>
          </tr>
        ))}
      </tbody>

    </Table>
  );
}



