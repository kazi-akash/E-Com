import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Lemon',
    email: 'lemon@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  { 
    name: 'Jenifar',
    email: 'jenifar@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  }
];

export default users;