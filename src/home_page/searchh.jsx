import React from 'react';
import ReactDOM from 'react-dom';
import UserSearch from './search';
import { createRoot } from 'react-dom/client';


const users = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Frank',
  'Grace',
  'Heidi',
  'Ivan',
  'Judy'
];

export default function DynamicSearch(){
  <>
    <UserSearch users={users} />
  </>
};



