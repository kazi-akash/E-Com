import React, { useState } from 'react';
import { From, Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandeler = e => {
    e.preventDefault();
    if(keyword.trim()){
      history.push(`/search/${keyword}`)
    } else {
      history.push('/');
    }
  }

  return (
    <Form onSubmit={submitHandeler} inline>
      <Form.Control
        type= 'text'
        name='q'
        value={keyword}
        onChange= {e => setKeyword(e.target.value)}
        placeholder= 'Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-dark' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox;
