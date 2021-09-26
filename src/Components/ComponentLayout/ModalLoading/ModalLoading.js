import React from 'react';
import {Bars, useLoading} from '@agney/react-loading';
import './ModalLoading.css';

export default function ModalLoading({modalOpen = false}) {
  const {containerProps, indicatorEl} = useLoading({
    loading: modalOpen,
    indicator: <Bars width="50" />,
  });
  return (
    <div
      className={`dark-mode-loading ${
        modalOpen ? 'loading-modal' : 'loading-modal-close'
      }`}
    >
      <section
        className={`${
          modalOpen ? 'loading-modal-main' : 'loading-modal-main-close'
        }`}
      >
        <section {...containerProps} style={{color: '#034ea1'}}>
          {indicatorEl}
        </section>
      </section>
    </div>
  );
}
