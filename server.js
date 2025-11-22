const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Serve static files so the frontend can load assets directly
app.use(express.static(path.join(__dirname)));

// Helper: safe folder name (prevent path traversal)
function safeFolderName(name) {
  if (!name) return null;
  if (name.includes('..')) return null;
  // remove any leading/trailing slashes
  return name.replace(/^\/+|\/+$/g, '');
}

// List assets in a folder under assets/<folder>
app.get('/list-assets/:folder', (req, res) => {
  const folderRaw = req.params.folder || '';
  const folder = safeFolderName(decodeURIComponent(folderRaw));
  if (!folder) return res.status(400).json({ error: 'Invalid folder name' });

  const folderPath = path.join(__dirname, 'assets', folder);
  fs.stat(folderPath, (err, stat) => {
    if (err || !stat.isDirectory()) return res.json({ files: [] });
    fs.readdir(folderPath, (err, files) => {
      if (err) return res.status(500).json({ error: 'Unable to read folder' });
      const filtered = files.filter(f => /\.(jpe?g|png|gif|bmp|webp|mp4|webm|mov)$/i.test(f))
        .map(f => path.posix.join('assets', folder, f));
      res.json({ files: filtered });
    });
  });
});

// Send message (Suggestion / Help)
app.post('/send-message', async (req, res) => {
  const { name, email, phone, subject, message, type } = req.body || {};
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'navyakalayatham@gmail.com';

  // Compose email
  const mailSubject = subject || `${type || 'Message'} from ${name}`;
  const mailBody = `Name: ${name}\nEmail: ${email}\nMobile: ${phone}\n\nMessage:\n${message}`;

  // If SMTP config present, send via nodemailer; otherwise log and return success (dev mode)
  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.log('No SMTP configured — message received (dev fallback):');
    console.log('To:', adminEmail);
    console.log('Subject:', mailSubject);
    console.log(mailBody);
    return res.json({ ok: true, info: 'No SMTP configured — logged on server.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com',
      to: adminEmail,
      subject: mailSubject,
      text: mailBody
    });

    return res.json({ ok: true, info });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ error: 'Failed to send email', details: err && err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log('Endpoints: GET /list-assets/:folder   POST /send-message');
});
