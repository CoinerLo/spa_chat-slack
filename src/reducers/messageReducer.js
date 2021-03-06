/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { removeChannel } from './channelsReducer.js';

const messagesReducer = createSlice({
  name: 'messageData',
  initialState: {
    messages: [],
  },
  reducers: {
    loadingMessages(state, action) {
      const { messages } = action.payload;
      state.messages = messages;
    },
    addMessage(state, action) {
      const { messageData } = action.payload;
      state.messages.push(messageData);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const { channelId } = action.payload;
        _.remove(state.messages, (message) => message.channelId === channelId);
      });
  },

});

export const getCurrentChannelMessages = (state) => {
  const { messages } = state.messages;
  const { currentChannelId } = state.channels;
  return messages.filter((message) => message.channelId === currentChannelId);
};

export const { addMessage, loadingMessages } = messagesReducer.actions;

export default messagesReducer.reducer;
