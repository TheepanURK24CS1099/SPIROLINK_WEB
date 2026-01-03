# ✅ Gmail Setup Guide - FINAL SOLUTION

## ⚠️ IMPORTANT: Your Gmail App Password

You need a **Gmail App Password**, not your regular Gmail password.

### Step 1: Create Gmail App Password

**Google has a special "App Password" system for third-party apps like Render.**

1. Go to: https://myaccount.google.com/security
2. Look for **"App passwords"** (you may need to enable 2FA first)
3. If you don't see "App passwords":
   - Click **2-Step Verification** 
   - Complete the setup
   - Then "App passwords" will appear
4. Select:
   - App: **Mail**
   - Device: **Windows PC** (or any option)
5. Google generates a **16-character password**
6. **Copy this password** (this is your EMAIL_PASSWORD)

### Step 2: Update Render Environment Variables

1. Go to: https://dashboard.render.com/
2. Click your backend: **spirolink-web-backend-2**
3. Go to **Environment** tab
4. **Update or Create these variables:**

```
EMAIL_USER=theepannkl2006@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

(Replace with your Gmail and the 16-char app password from Step 1)

5. **Remove** these (if present):
   - `SENDGRID_API_KEY`
   - `RESEND_API_KEY`

6. Click **Save** (auto-redeploys ~2 min)

### Step 3: Test

1. Wait for redeploy (check the logs)
2. Go to your website
3. Fill contact form
4. Click Send
5. ✅ Should work!

---

## 🔍 Verify Setup

Check the health endpoint to confirm Gmail is active:

```bash
curl https://spirolink-web-backend-2.onrender.com/health
```

You should see:
```json
{
  "emailService": "gmail",
  "status": "OK"
}
```

---

## ❓ Common Issues

### "App passwords" not showing?
- You need 2-Step Verification enabled
- Go to: https://myaccount.google.com/security
- Click **2-Step Verification**

### Still timing out?
- **Your Gmail app password might be wrong** - copy it again carefully
- **Check for extra spaces** - no spaces before/after
- **Wait for Render to fully redeploy** (5-10 minutes)
- Check Render logs for errors

### Not using Gmail, using SendGrid?
- Remove `EMAIL_USER` and `EMAIL_PASSWORD` from Render
- Add `SENDGRID_API_KEY` instead
- (SendGrid also works if Gmail doesn't)

---

## 📋 Checklist

- [ ] Enable 2FA on your Gmail account
- [ ] Create App Password for "Mail"
- [ ] Copy the 16-char password
- [ ] Go to Render → Environment
- [ ] Set `EMAIL_USER=theepannkl2006@gmail.com`
- [ ] Set `EMAIL_PASSWORD=xxxx xxxx xxxx xxxx`
- [ ] Remove SendGrid/Resend keys (if any)
- [ ] Click Save
- [ ] Wait 2-5 minutes for redeploy
- [ ] Test contact form
- [ ] ✅ Done!

---

**Your app password is sensitive - don't share it!**
