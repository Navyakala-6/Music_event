import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from './AuthProvider';
import { useWishlist } from './WishlistContext';
import logo from '../assets/sirilogo.jpg';

function Topbar({ onLogout, onMenuSelect, onHomeClick, onWishlistSelect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const { user, auth } = useAuth();
  const { wishlist } = useWishlist();
  const menuRef = useRef(null);
  const loginMenuRef = useRef(null);
  const wishlistRef = useRef(null);

  // Custom names for alphabet menu
  const custom = ["Ohm", "Sri", "Chinna", "Ammu", "Moon", "Star", "Sun", "Sky"];
  const labels = [];
  for (let i = 0; i < 26; i++) {
    if (i < custom.length && custom[i]) labels.push(custom[i]);
    else labels.push(String.fromCharCode(65 + i));
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
        setLoginMenuOpen(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setWishlistOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onLogout();
      setLoginMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      onLogout();
      setLoginMenuOpen(false);
    }
  };

  // Handle My Account click
  const handleMyAccount = () => {
    setLoginMenuOpen(false);
    setAccountModalOpen(true);
    setEditMode(false);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setEditedUser({ ...storedUser });
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save user details
  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(editedUser));
    setEditMode(false);
    window.location.reload();
  };

  // Handle cancel edit
  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setEditedUser({ ...storedUser });
    setEditMode(false);
  };

  // Handle Reset Password
  const handleResetPassword = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const email = storedUser.email || 'navyakalayatham@gmail.com';
    const username = storedUser.username || 'User';
    
    const subject = encodeURIComponent('Password Reset Request - Music Events App');
    const body = encodeURIComponent(
      `Hello,\n\n` +
      `I would like to reset my password for the Music Events App.\n\n` +
      `Account Details:\n` +
      `----------------\n` +
      `Username: ${username}\n` +
      `Email: ${email}\n` +
      `Mobile: ${storedUser.mobile || 'Not set'}\n\n` +
      `Please send me a password reset link to my email.\n\n` +
      `Thank you!`
    );
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const displayName = editedUser.username || storedUser.username || user?.displayName || user?.email || 'User';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Login Logo - acts as home button with tooltip */}
        <button
          type="button"
          className="login-logo topbar-icon-btn"
          onClick={onHomeClick}
          aria-label="Home"
        >
          <img src={logo} alt="Logo" style={{
            height: "20px",
            width: "20px",
            borderRadius: "50%"
          }} />
        </button>

        {/* Wishlist */}
        <div className="wishlist-wrapper" ref={wishlistRef}>
          <button
            type="button"
            className="hamburger wishlist-btn topbar-icon-btn"
            onClick={() => {
              setWishlistOpen(!wishlistOpen);
              setLoginMenuOpen(false);
            }}
            aria-haspopup="true"
            aria-expanded={wishlistOpen}
            aria-label="Open wishlist"
          >
            ♥
            {wishlist.length > 0 && (
              <span className="wishlist-count">{wishlist.length}</span>
            )}
          </button>
          <div className={`menu wishlist-menu ${wishlistOpen ? 'open' : ''}`}>
            <div className="wishlist-menu-header">Wishlist</div>
            {wishlist.length === 0 ? (
              <p className="wishlist-empty">No liked media yet.</p>
            ) : (
              <ul className="wishlist-list">
                {wishlist.map((item) => (
                  <li key={item.src}>
                    <button
                      type="button"
                      className="wishlist-item"
                      onClick={() => {
                        if (onWishlistSelect) onWishlistSelect(item);
                        setWishlistOpen(false);
                      }}
                    >
                      {item.type === 'video' ? (
                        <video src={item.src} muted playsInline />
                      ) : (
                        <img src={item.src} alt={item.title} />
                      )}
                      <span className="wishlist-item-title">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Login Menu - User initial button with tooltip */}
        <div className="login-menu-wrapper" ref={loginMenuRef}>
          <button
            type="button"
            className="hamburger login-hamburger topbar-icon-btn"
            onClick={() => {
              setLoginMenuOpen(!loginMenuOpen);
              setWishlistOpen(false);
            }}
            aria-haspopup="true"
            aria-expanded={loginMenuOpen}
            aria-label="Settings"
          >
            {userInitial}
          </button>
          <div className={`menu login-menu ${loginMenuOpen ? 'open' : ''}`}>
            <button type="button" className="menu-item" onClick={handleMyAccount}>
              My Account
            </button>
            <button type="button" className="menu-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Brand with tooltip */}
      <div className="brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        <span className="logo">🎵</span>
        <span className="title">Music Event's</span>
      </div>


      {/* Event Hamburger Dropdown (right) */}
      <div className="topbar-right">
        <div className="menu-wrapper" ref={menuRef}>
          <button
            type="button"
            className="hamburger topbar-icon-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Events menu"
          >
            ☰
          </button>
          <div className={`menu ${menuOpen ? 'open' : ''}`}>
            {labels.map((label, index) => (
              <button
                key={index}
                className="menu-item"
                data-folder={label}
                onClick={() => {
                  if (onMenuSelect) onMenuSelect(label);
                  setMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* My Account Modal - Centered popup with backdrop blur */}
      {accountModalOpen && createPortal(
        <div className="account-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="accountModalTitle" onClick={() => setAccountModalOpen(false)}>
          <div className="account-modal" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card" role="document">
              <div className="modal-header">
                <h3 id="modalTitle">My Account</h3>
                <button className="icon-btn" onClick={() => setAccountModalOpen(false)} aria-label="Close">✖</button>
              </div>

              <div className="modal-body" id="modalBody">
                <form id="userAccountForm" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div>
                    <label htmlFor="accountFullName">Full Name</label>
                    <input
                      id="accountFullName"
                      name="username"
                      type="text"
                      value={editedUser.username ?? storedUser.username ?? ''}
                      onChange={handleInputChange}
                      required
                      readOnly={!editMode}
                    />
                  </div>

                  <div>
                    <label htmlFor="accountEmail">Email</label>
                    <input
                      id="accountEmail"
                      name="email"
                      type="email"
                      value={editedUser.email ?? storedUser.email ?? ''}
                      onChange={handleInputChange}
                      required
                      readOnly={!editMode}
                    />
                  </div>

                  <div>
                    <label htmlFor="accountMobile">Mobile Number</label>
                    <input
                      id="accountMobile"
                      name="mobile"
                      type="tel"
                      value={editedUser.mobile ?? storedUser.mobile ?? ''}
                      onChange={handleInputChange}
                      required
                      readOnly={!editMode}
                    />
                  </div>

                  <div>
                    <label htmlFor="accountPassword">New Password (leave blank to keep current)</label>
                    <input id="accountPassword" name="accountPassword" type="password" placeholder="Enter new password" disabled={!editMode} />
                  </div>

                  <div>
                    <label htmlFor="accountConfirmPassword">Confirm New Password</label>
                    <input id="accountConfirmPassword" name="accountConfirmPassword" type="password" placeholder="Confirm new password" disabled={!editMode} />
                  </div>

                  <div className="modal-actions">
                    {editMode ? (
                      <>
                        <button type="button" className="btn btn-secondary" id="cancelBtn" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary" id="updateAccountBtn">Update Account</button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="btn" onClick={() => setEditMode(true)}>Edit</button>
                        <button type="button" className="btn btn-secondary" onClick={handleResetPassword}>Reset</button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>, document.body
      )}
    </header>
  );
}

export default Topbar;
