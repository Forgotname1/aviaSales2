import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import service from '../service';

import { buttonSortTicketsForClicked } from './buttonSortTicketsForClicked';

export const getTickets = createAsyncThunk('aviaSales/getTickets', () => service.getTickets());

const appSlice = createSlice({
  name: 'aviaSales',
  initialState: {
    checkboxes: [
      { id: 1, text: 'Все', checked: true },
      { id: 2, text: 'Без пересадок', checked: true },
      { id: 3, text: '1 пересадка', checked: true },
      { id: 4, text: '2 пересадки', checked: true },
      { id: 5, text: '3 пересадки', checked: true },
    ],
    tickets: [],
    filters: [
      { id: 1, text: 'самый дешевый', clicked: false },
      { id: 2, text: 'самый быстрый', clicked: false },
      { id: 3, text: 'оптимальный', clicked: false },
    ],
    arrayCountTransfer: [0, 1, 2, 3],
    error: false,
    status: '',
    stop: false,
  },
  reducers: {
    changeCheckbox(state, action) {
      state.checkboxes.forEach((checkbox) => {
        if (checkbox.id === action.payload) {
          checkbox.checked = !checkbox.checked;
        }
      });
      if (state.checkboxes[0].checked && action.payload === 1) {
        state.checkboxes.forEach((checkbox) => (checkbox.checked = true));
      }
      if (!state.checkboxes[0].checked && action.payload === 1) {
        state.checkboxes.forEach((checkbox) => (checkbox.checked = false));
      }
      if (state.checkboxes[0].checked && action.payload !== 1) {
        state.checkboxes.forEach((checkbox) => (checkbox.checked = false));
      }
      if (
        state.checkboxes[1].checked &&
        state.checkboxes[2].checked &&
        state.checkboxes[3].checked &&
        state.checkboxes[4].checked
      ) {
        state.checkboxes[0].checked = true;
      }
      state.arrayCountTransfer = state.checkboxes.slice(1).map((item) => (item.checked ? item.id - 2 : null));
    },
    filterTickets(state, action) {
      state.filters.forEach((button) => {
        button.clicked = button.id === action.payload;
        buttonSortTicketsForClicked(state);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTickets.pending, (state) => {
      state.error = false;
      state.status = 'loading';
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      const newTickets = action.payload.tickets.map((ticket) => ({ ticket, id: v4() }));
      state.tickets = [...state.tickets, ...newTickets];
      if (!action.payload.stop) {
        state.stop = !state.stop;
      } else {
        state.status = 'endOfAction';
      }
    });
    builder.addCase(getTickets.rejected, (state) => {
      state.error = true;
      state.status = 'Error';
      state.stop = !state.stop;
    });
  },
});
export const { changeCheckbox, filterTickets } = appSlice.actions;
export default appSlice.reducer;
