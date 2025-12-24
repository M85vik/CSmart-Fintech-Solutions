// // File: src/features/contacts/contactSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import contactService from './contactService';

// const initialState = {
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// // Async thunk for submitting the form
// export const submitContactForm = createAsyncThunk(
//   'contacts/submit',
//   async (formData, thunkAPI) => {
//     try {
//       return await contactService.submitContactForm(formData);
//     } catch (error) {
//       const message =
//         (error.response?.data?.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const contactSlice = createSlice({
//   name: 'contact',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitContactForm.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(submitContactForm.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message = action.payload.message; // Capture success message from backend
//       })
//       .addCase(submitContactForm.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload; // Capture error message
//       });
//   },
// });

// export const { reset } = contactSlice.actions;
// export default contactSlice.reducer;


// File: src/features/contacts/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactService from './contactService';

// Updated state to handle both form submission and admin message list
const initialState = {
  adminContacts: [], // Array to hold messages for the dashboard
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- PUBLIC THUNK (for form submission) ---
export const submitContactForm = createAsyncThunk(
  'contacts/submit',
  async (formData, thunkAPI) => {
    try {
      return await contactService.submitContactForm(formData);
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- ADMIN THUNKS ---

// Get all contact messages
export const getContacts = createAsyncThunk('contacts/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await contactService.getContacts(token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete a contact message
export const deleteContact = createAsyncThunk('contacts/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    await contactService.deleteContact(id, token);
    return id; // Return the ID to the reducer to filter the state
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    reset: (state) => {
        // Reset only the public form state
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
    },
    resetAdmin: (state) => {
        // A specific reset for the admin page
        state.adminContacts = [];
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for PUBLIC form submission
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Cases for ADMIN get all messages
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminContacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Cases for ADMIN delete message
      .addCase(deleteContact.pending, (state) => {
        // Optionally show a loading state on the specific item being deleted
        // For now, we'll use the global loader
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminContacts = state.adminContacts.filter(
          (contact) => contact._id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAdmin } = contactSlice.actions;
export default contactSlice.reducer;