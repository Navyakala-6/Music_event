import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, getDatabase, ref, set } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBk9voLnYCmAtimrIZDK9F_dFO3sQCyMII",
  authDomain: "sri-music-events-37987.firebaseapp.com",
  projectId: "sri-music-events-37987",
  storageBucket: "sri-music-events-37987.firebasestorage.app",
  messagingSenderId: "171969258087",
  appId: "1:171969258087:web:cb29c4efff579eae17aac2",
  measurementId: "G-R0TES365LE"
};

// Initialize Firebase
let auth, db;
try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
} catch (e) {
  console.warn('Firebase init error:', e);
}

function LoginScreen({ onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showOTPVerify, setShowOTPVerify] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null); // store Firebase confirmation object
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: ''
  });

  useEffect(() => {
    // Setup reCAPTCHA when modal opens
    if (showModal && isSignup && !window.recaptchaVerifier) {
      setTimeout(() => {
        const container = document.getElementById('recaptcha-container');
        if (container && auth) {
          try {
            // proper recaptcha verifier from Firebase
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
              size: 'invisible',
              callback: (response) => {
                console.log('reCAPTCHA solved');
              }
            }, auth);
          } catch (e) {
            console.warn('reCAPTCHA init error:', e);
          }
        }
      }, 500);
    }
  }, [showModal, isSignup]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendOTP = async () => {
    if (!formData.mobile || formData.mobile.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    if (!auth) {
      alert('Firebase not initialized');
      return;
    }

    try {
      let phoneNumber = formData.mobile;
      if (phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber)) {
        phoneNumber = '+91' + phoneNumber;
      } else if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+' + phoneNumber;
      }

      // Ensure recaptcha verifier exists (may have been created in useEffect)
      if (!window.recaptchaVerifier && auth) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved');
          }
        }, auth);
      }

      if (window.recaptchaVerifier) {
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        // confirmation is used later to verify OTP
        setConfirmationResult(confirmation);
        setVerificationId(confirmation.verificationId);
        setShowOTPVerify(true);
        alert('OTP sent to your mobile number!');
      } else {
        alert('Unable to initialize verification. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP: ' + error.message);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    if (!confirmationResult) {
      alert('No OTP request found. Please send OTP first.');
      return;
    }

    try {
      // actually confirm the code with Firebase
      await confirmationResult.confirm(otp);
      setPhoneVerified(true);
      setShowOTPVerify(false);
      alert('Phone number verified successfully!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP: ' + error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Static login for now - any username/password works
    if (formData.username && formData.password) {
      // Store user data in localStorage for demo
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        email: formData.email || '',
        mobile: formData.mobile || ''
      }));
      onLogin();
      setShowModal(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Check if phone verification is required
    if (!phoneVerified) {
      alert('Please verify your mobile number with OTP first');
      return;
    }

    // Static signup - just store the data
    if (formData.username && formData.password && formData.email) {
      // Store user data in localStorage for demo
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile || '',
        phoneVerified: true
      }));
      
      // Also save to Firebase Realtime Database if available
      if (db) {
        try {
          const userRef = ref(db, 'users/' + formData.username);
          set(userRef, {
            username: formData.username,
            email: formData.email,
            mobile: formData.mobile || '',
            phoneVerified: true,
            createdAt: new Date().toISOString()
          });
        } catch (e) {
          console.warn('Firebase save error:', e);
        }
      }
      
      onLogin();
      setShowModal(false);
    }
  };

  return (
    <div className="login-screen">
      {/* Banner with Sri Logo */}
      <div className="login-banner">
        <img src="assets/sirilogo.jpg" alt="Sri Logo" className="sri-logo" />
        <h1 className="banner-title">Music Events</h1>
      </div>

      {/* Login Button */}
      <div className="login-actions">
        <button
          className="login-btn"
          onClick={() => {
            setIsSignup(false);
            setShowModal(true);
          }}
        >
          Login
        </button>
        <button
          className="signup-btn"
          onClick={() => {
            setIsSignup(true);
            setShowModal(true);
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      {/* Modal */}
      {showModal && (
        <div className="login-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={isSignup ? handleSignup : handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {isSignup && (
                <>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        style={{ flex: 1 }}
                        required
                      />
                      {!phoneVerified && (
                        <button 
                          type="button" 
                          className="submit-btn" 
                          onClick={sendOTP}
                          style={{ whiteSpace: 'nowrap', padding: '8px 12px' }}
                        >
                          Send OTP
                        </button>
                      )}
                      {phoneVerified && (
                        <span style={{ color: 'green', alignSelf: 'center', fontSize: '0.9rem' }}>
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* OTP Verification Section */}
                  {showOTPVerify && (
                    <div className="form-group">
                      <label>Enter OTP</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          name="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="6-digit OTP"
                          maxLength={6}
                          style={{ flex: 1 }}
                        />
                        <button 
                          type="button" 
                          className="submit-btn" 
                          onClick={verifyOTP}
                          style={{ whiteSpace: 'nowrap', padding: '8px 12px' }}
                        >
                          Verify
                        </button>
                      </div>
                      <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={sendOTP}
                        style={{ marginTop: '8px', fontSize: '0.8rem' }}
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </>
              )}
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isSignup ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
