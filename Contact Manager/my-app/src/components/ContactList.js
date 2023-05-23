import React from 'react'
import ContactCard from './ContactCard'

const ContactList = (props) => {
  const DeleterContainerHandler=(id)=>{
    props.getContact(id)
  }



    const renderContactList=props.contacts.map((contact)=>{
      return(
        <ContactCard contact={contact}
        clickHandler={DeleterContainerHandler}
        key={contact.id}/>
        // <div className='item'>
        //   <div className='content'>
        //     <div className='header'>{contact.name}</div>
        //     <div>{contact.email}</div>
        //   </div>
        //   <i className='trash alternate outline icon'>
        //   </i>
        // </div>
      )
    })
  return (
    <div className='ui celled list'>
      ContactList
      {renderContactList}

    </div>
  )
}

export default ContactList
