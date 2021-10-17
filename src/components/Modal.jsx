import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CreateChannel from './modals/CreateChannel.jsx';
import { getChannels, getChannelsNames } from '../reducers/channelsReducer';
import { closeModal, getChannelId, getModalInfo } from '../reducers/modalsReducer.js';

const modals = {
  adding: CreateChannel,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const channelId = useSelector(getChannelId);
  const channels = useSelector(getChannels);
  const channelsNames = useSelector(getChannelsNames);

  const { type, isOpen } = useSelector(getModalInfo);
  if (!type) return null;

  const close = () => dispatch(closeModal());
  const Component = modals[type];

  return (
    <Modal show={isOpen} onHide={close}>
      <Component
        close={close}
        dispatch={dispatch}
        channelId={channelId}
        channels={channels}
        channelsNames={channelsNames}
      />
    </Modal>
  );
};

export default ModalComponent;
