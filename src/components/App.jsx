import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from 'components/contactform/ContactForm';
import ContactList from 'components/contactlist/ContactList';
import Filter from 'components/filter/Filter';
import { addContact, deleteContact, fetchContacts } from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const [filter, setFilter] = useState('');
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContactHandler = contact => {
    dispatch(addContact(contact));
  };

  const deleteContactHandler = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContactHandler} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={setFilter} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContactHandler}
        />
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default App;
