import './App.css';
import React,{useEffect, useState} from 'react';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import {v4 as uuid} from 'uuid';
function App() {
  const [contacts,setContacts]=useState([
  
  ])

console.log(contacts,"c")
  const removeContactHandler=(id)=>{
    const newContactList=contacts.filter((contact)=>{
      return contact.id!==id
    })
    setContacts(newContactList)
  }

  
 /* [
   {
      id:"1",
      name:"indhuja",
      email:"indhuja@gmail.com"
    },
    {

      id:"2",
      name:"Nadhu",
      email:"nandhuja@gmail.com"
    }
  ]*/
  const AddContactHandler=(contact)=>{
   // console.log(contact)
   return setContacts([...contacts, {id:uuid(),name:contact.name,email:contact.email}])
  };

  return (
    <div className='ui container'>
    <Header/>
    <AddContact AddContactHandler={AddContactHandler}/>
    <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
