import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../redux/types/userTypes'

const UserEditScreen = ({ match, history }) => {
  const userId= match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispathch= useDispatch();
  
  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetails;
  
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, 
          success: successUpdate, 
          error: errorUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate) {
      dispathch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
        if(!user.name || user._id !== userId)
        {
          dispathch(getUserDetails(userId))
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
    }
  }, [dispathch, userId, user, successUpdate, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispathch(updateUser({
      _id: userId, 
      name, 
      email, 
      isAdmin
    }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger>'>{error}</Message> :(
      <Form onSubmit={onFormSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="name" 
          placeholder="Enter your name"
          value={name} 
          onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="isadmin">
        <Form.Check
          type= 'checkbox'
          lebel= 'Is Admin'
          checked={isAdmin}
          onChange={e => setIsAdmin(e.target.checked)}
        >
        </Form.Check>
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
  </Form>

  )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen; 
