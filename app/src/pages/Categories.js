import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form, FormGroup } from 'reactstrap';
import FormInput from '../components/FormInput';
import { Link } from 'react-router-dom';

export default function Category() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState({ categories: [] });
  const [categoryName, setCategoryName] = useState({ value: '', feedback: '', valid: false });

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await fetch('/api/categories');
    const body = await response.json();
    setCategories(body);
    setIsLoading(false);
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

  const createNewCategory = async (event) => {
    event.preventDefault();

    if (!categoryName.valid) {
      return;
    }

    const newCategory = {
      id: 0,
      name: categoryName.value
    }

    const response = await fetch('/api/category/',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newCategory)
      }
    );

    if (response.status === 201) {
      const body = await response.json();
      setCategories(s => ([...s, body]));
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Container className="themed-container" fluid="sm">
      <div>
        <h2>All Categories</h2>
        <Table width="40%">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category =>
              <tr key={category.id}>
                <td>{category.name}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <h2 className="mt-4 mb-4">Add New Category:</h2>

      <Form onSubmit={createNewCategory}>
        <FormInput id="category" label="New Category Name *" onChange={onChangeCategoryName} value={categoryName} />
        <FormGroup>
          <Button disabled={!categoryName.valid} color="success" type="submit" className="m-2">Save</Button>
          <Button className="m-2" color="danger" tag={Link} to="/home">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
  );
}
