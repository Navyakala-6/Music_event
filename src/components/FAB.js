import React, { useState, useRef, useEffect } from 'react';

function FAB() {
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'suggestion' or 'help'
  const fabRef = useRef(null);
  const fabMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabMenuRef.current && !fabMenuRef.current.contains(event.target) &&
          fabRef.current && !fabRef.current.contains(event.target)) {
        setFabMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFabClick = () => {
    setFabMenuOpen(!fabMenuOpen);
  };

  const handleSuggestionClick = () => {
    setModalType('suggestion');
    setModalOpen(true);
    setFabMenuOpen(false);
  };

  const handleHelpClick = () => {
    setModalType('help');
    setModalOpen(true);
    setFabMenuOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType('');
  };

  const handleFormSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: type === 'suggestion' ? `Suggestion / Question from ${data.name}` : `Help request from ${data.name}`,
          message: data.message,
          type: type
        })
      });

      if (response.ok) {
        alert(type === 'suggestion' ? 'Suggestion sent. Thank you!' : 'Help request sent. We will contact you soon.');
        closeModal();
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.warn('POST /send-message failed', err);
      // Fallback to mailto
      const subject = encodeURIComponent(type === 'suggestion' ? `Suggestion / Question from ${data.name}` : `Help request from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nMobile: ${data.phone}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:navyakalayatham@gmail.com?subject=${subject}&body=${body}`;
      closeModal();
    }
  };

  return (
    <>
      <div className="fab" ref={fabRef}>
        <button
          type="button"
          className="fab-btn"
          id="fabToggle"
          onClick={handleFabClick}
          aria-haspopup="true"
          aria-expanded={fabMenuOpen}
          aria-label="Suggestion and Help"
        />
        <div className={`fab-menu ${fabMenuOpen ? 'open' : ''}`} id="fabMenu" ref={fabMenuRef}>
          <button className="fab-item" id="suggestionBtn" onClick={handleSuggestionClick}>
            Suggestion
          </button>
          <button className="fab-item" id="helpBtn" onClick={handleHelpClick}>
            Help
          </button>
        </div>
      </div>

      {/* Modal - Centered popup with backdrop blur - smaller size */}
      {modalOpen && (
        <div className="account-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={closeModal}>
          <div className="account-modal" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="modalTitle">{modalType === 'suggestion' ? 'Suggestion / Question' : 'Contact / Help'}</h3>
              <button className="icon-btn" onClick={closeModal} aria-label="Close">✖</button>
            </div>
            <div className="modal-body" id="modalBody">
              <form onSubmit={(e) => handleFormSubmit(e, modalType)}>
                <div className="account-field">
                  <label>Name *</label>
                  <input type="text" name="name" className="account-input" required />
                </div>
                <div className="account-field">
                  <label>Email *</label>
                  <input type="email" name="email" className="account-input" required />
                </div>
                <div className="account-field">
                  <label>Mobile *</label>
                  <input type="tel" name="phone" className="account-input" required />
                </div>
                <div className="account-field">
                  <label>Message *</label>
                  <textarea name="message" className="account-input" rows="3" required></textarea>
                </div>
                {modalType === 'help' && (
                  <div style={{ marginTop: '8px', color: '#9ca3af', fontSize: '0.8rem' }}>
                    Admin: <strong style={{ color: '#fff' }}>navyakalayatham@gmail.com</strong>
                  </div>
                )}
                <div className="account-actions" style={{ marginTop: '12px' }}>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FAB;
