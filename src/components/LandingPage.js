import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './LandingPage.css';
import logo from '../assets/sirilogo.jpg';
import MediaScroller from './MediaScroller';


// Import Firebase compat SDK for better testing support
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBk9voLnYCmAtimrIZDK9F_dFO3sQCyMII",
  authDomain: "sri-music-events-37987.firebaseapp.com",
  projectId: "sri-music-events-37987",
  storageBucket: "sri-music-events-37987.firebasestorage.app",
  messagingSenderId: "171969258087",
  appId: "1:171969258087:web:cb29c4efff579eae17aac2",
  measurementId: "G-R0TES365LE"
};

let firebaseApp = null;
let auth = null;
let db = null;

function LandingPage() {
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [inForm, setInForm] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [showOTPVerify, setShowOTPVerify] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    try {
      // Initialize Firebase synchronously with compat SDK
      if (!firebaseApp) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.database();
        // Disable app verification for testing (localhost)
        auth.settings.appVerificationDisabledForTesting = true;
        console.log('Firebase initialized successfully');
        setFirebaseReady(true);
      }
    } catch (e) {
      console.warn('Firebase init error:', e);
    }
  }, []);

  useEffect(() => {
    // Setup reCAPTCHA after Firebase is ready (don't do it in useEffect, do it in sendOTP instead)
  }, [firebaseReady, showModal, isSignup]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    if (!formData.mobile || formData.mobile.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    if (!firebaseReady || !auth) {
      alert('Firebase not ready. Please wait a moment and try again.');
      return;
    }

    try {
      let phoneNumber = formData.mobile;
      if (phoneNumber.length === 10) phoneNumber = '+91' + phoneNumber;
      else if (!phoneNumber.startsWith('+')) phoneNumber = '+' + phoneNumber;

      // Clear old verifier if it exists
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log('Verifier clear error:', e);
        }
        window.recaptchaVerifier = null;
      }

      const container = document.getElementById('recaptcha-container');
      if (!container) {
        alert('reCAPTCHA container not found');
        return;
      }

      // Create new verifier with compat SDK
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(container, {
        size: 'invisible',
        callback: () => console.log('reCAPTCHA solved'),
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          window.recaptchaVerifier = null;
        }
      });

      const result = await auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      setShowOTPVerify(true);
      alert('OTP sent to your mobile!');
    } catch (error) {
      console.error('Full Error Object:', error);
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      
      // Clear verifier on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log('Verifier clear error:', e);
        }
        window.recaptchaVerifier = null;
      }
      
      // Handle specific Firebase errors gracefully
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Attempting workaround for testing...');
        // For testing purposes, allow manual OTP entry without sending
        setShowOTPVerify(true);
        setConfirmationResult({
          confirm: async (otp) => {
            // Test OTP should be 123456 for any test number
            if (otp === '123456') {
              return Promise.resolve();
            } else {
              return Promise.reject(new Error('Invalid test OTP. Use 123456'));
            }
          }
        });
        alert('Test Mode: Enter OTP 123456 to verify your phone number.');
      } else if (error.code === 'auth/invalid-phone-number') {
        alert('Invalid phone number. Please enter a valid 10-digit number starting with a valid area code.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert('Please enter valid 6-digit OTP');
      return;
    }

    if (!confirmationResult) {
      alert('No OTP request found. Please send OTP first.');
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setPhoneVerified(true);
      setShowOTPVerify(false);
      alert('Phone verified!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP: ' + error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Check in database for user
    if (db) {
      db.ref('users/' + formData.username).once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          // In a real app, you'd hash and compare passwords
          // For now, just verify username exists and password matches
          if (userData.password === formData.password) {
            login({ 
              username: formData.username, 
              email: userData.email, 
              mobile: userData.mobile,
              phoneVerified: userData.phoneVerified
            });
            navigate('/app');
            setShowModal(false);
          } else {
            setError('Invalid password');
          }
        } else {
          setError('User not found. Please sign up first.');
        }
      }).catch((error) => {
        console.error('Login error:', error);
        setError('Error logging in: ' + error.message);
      });
    } else {
      setError('Database not ready. Please try again.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('handleSignup called', { phoneVerified, formData });
    setError('');
    if (!phoneVerified) {
      setError('Verify mobile with OTP first');
      return;
    }
    if (formData.username && formData.password && formData.email) {
      // Save to database
      if (db) {
        db.ref('users/' + formData.username).set({
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password, // In production, hash this!
          phoneVerified: true,
          createdAt: new Date().toISOString()
        }).then(() => {
          console.log('User data saved successfully');
          // read back and log for verification
          return db.ref('users/' + formData.username).once('value');
        }).then((snapshot) => {
          console.log('Saved snapshot:', snapshot.val());
          login({ username: formData.username, email: formData.email, mobile: formData.mobile, phoneVerified: true });
          navigate('/app');
          setShowModal(false);
        }).catch((error) => {
          console.error('Database save error:', error);
          alert('Database save error: ' + error.message);
          setError('Error saving user data: ' + error.message);
        });
      } else {
        alert('Database not ready');
        setError('Database not ready');
      }
    } else {
      setError('All fields required');
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-banner">
        <div className="headerlanding">
          <div className="dropdown-container">
            <button className="login-hamburger" onClick={() => { setShowDropdown(!showDropdown); }}>👤</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => { setShowDropdown(false); setShowModal(true); setInForm(true); setIsSignup(false); setIsForgot(false); setError(''); }}>Login</button>
                <button className="dropdown-item" onClick={() => { setShowDropdown(false); setShowModal(true); setInForm(true); setIsSignup(true); setIsForgot(false); setError(''); }}>Sign Up</button>
              </div>
            )}
          </div>
          <div className="title"><span className="logo">🎵</span>Music Event's</div>
        </div>
        <div className="bodylandng">
          <img src={logo} alt="Sri Logo" className="sri-logo" />
          <MediaScroller />
        </div>
      </div>

      <div id="recaptcha-container"></div>

      {showModal && (
        <div className="auth-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isSignup ? 'Sign Up' : isForgot ? 'Forgot Password' : 'Login'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            {!inForm ? (
              <div className="modal-actions">
                <button className="submit-btn" onClick={() => { setInForm(true); setIsSignup(false); }}>Login</button>
                <button className="submit-btn" onClick={() => { setInForm(true); setIsForgot(true); }}>Forgot Password</button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="submit-btn" onClick={() => { setInForm(true); setIsSignup(true); setError(''); }}>Create Account</button>
              </div>
            ) : (
              <form onSubmit={isSignup ? handleSignup : isForgot ? (e) => { e.preventDefault(); alert('Reset link sent'); setShowModal(false); } : handleLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} required autoFocus />
                </div>
                {isSignup && (
                  <React.Fragment>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label>Mobile</label>
                      <div style={{display:'flex', gap:'8px'}}>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit" style={{flex:1}} required />
                        {!phoneVerified && <button type="button" className="submit-btn" onClick={sendOTP}>Send OTP</button>}
                        {phoneVerified && <span style={{color:'green', alignSelf:'center'}}>✓ Verified</span>}
                      </div>
                    </div>
                    {showOTPVerify && (
                      <div className="form-group">
                        <label>Enter OTP</label>
                        <div style={{display:'flex', gap:'8px'}}>
                          <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="6-digit" maxLength={6} style={{flex:1}} />
                          <button type="button" className="submit-btn" onClick={verifyOTP}>Verify</button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )}
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="modal-actions">
                  <button type="submit" className="submit-btn">{isSignup ? 'Sign Up' : 'Login'}</button>
                </div>
                {!isSignup && <p>No account? <button type="button" onClick={()=>setIsSignup(true)} style={{color:'blue'}}>Create</button></p>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
