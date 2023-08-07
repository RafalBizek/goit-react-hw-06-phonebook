// contactsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      // Tutaj umieść kod do pobierania kontaktów z serwera lub localStorage
      const response = await fetch('/api/contacts');
      const contacts = await response.json();
      // Zwróć tablicę kontaktów
      return contacts;
    } catch (error) {
      // Obsłuż błąd pobierania
      throw new Error('Failed to fetch contacts');
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
