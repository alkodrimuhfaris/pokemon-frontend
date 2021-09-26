import React from 'react';
import './ModalRename.css';

export default function ModalRename({modalOpen, submitNickname}) {
  const [nickname, setNickname] = React.useState('');
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
        <div className="modal-rename">
          <form
            className="d-flex flex-column"
            onSubmit={(e) => {
              e.preventDefault();
              submitNickname(nickname);
            }}
          >
            <input
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button type="submit">Ganti nickname</button>
          </form>
        </div>
      </section>
    </div>
  );
}
