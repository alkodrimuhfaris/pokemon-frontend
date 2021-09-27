import React from 'react';
import IconMemo from '../ModalConfirm/Icons';
import './ModalRename.css';

export default function ModalRename({
  modalOpen,
  submitNickname,
  icon = 'success',
}) {
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
          {modalOpen ? <IconMemo icon={icon} /> : null}
          <p className="text-center font-bold mb-4">
            Awesome! you got the pokemon!
            <br />
            Now you can rename your pokemon
          </p>
          <form
            className="d-flex flex-column"
            onSubmit={(e) => {
              if (nickname) {
                e.preventDefault();
                submitNickname(nickname);
              } else {
                e.preventDefault();
                // eslint-disable-next-line no-alert
                window.alert('Nickname can not be empty!');
              }
            }}
          >
            <input
              value={nickname}
              className="input"
              type="text"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button className="submit-btn" type="submit">
              Change Nickname
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
