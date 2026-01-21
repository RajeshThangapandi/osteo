# EmailJS Integration Guide
## Osteoarthritis Treatment Landing Page

**Document Version:** 1.0  
**Date:** January 21, 2026  
**Purpose:** Complete guide to integrate EmailJS for form submissions

---

## Table of Contents
1. [What is EmailJS?](#what-is-emailjs)
2. [Required IDs from EmailJS](#required-ids-from-emailjs)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Integration Code](#integration-code)
5. [Email Template Setup](#email-template-setup)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from JavaScript without needing a backend server. Perfect for landing pages and static websites.

### **Benefits:**
- ✅ No backend server required
- ✅ Free tier available (200 emails/month)
- ✅ Easy integration
- ✅ Works with Gmail, Outlook, etc.
- ✅ Email templates with variables

---

## Required IDs from EmailJS

You need **3 IDs** from EmailJS to make it work:

### **1. Service ID** (Email Service Provider)
- **What it is:** Connects to your email provider (Gmail, Outlook, etc.)
- **Format:** `service_xxxxxxx`
- **Example:** `service_abc1234`

### **2. Template ID** (Email Template)
- **What it is:** The email template design/content
- **Format:** `template_xxxxxxx`
- **Example:** `template_xyz5678`

### **3. Public Key** (User ID)
- **What it is:** Your EmailJS account public key
- **Format:** `xxxxxxxxxxxx` (alphanumeric string)
- **Example:** `AbC123XyZ456`
- **Also called:** User ID or Public Key

---

## Step-by-Step Setup

### **Step 1: Create EmailJS Account**

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Create account with:
   - Email address
   - Password
4. Verify your email

---

### **Step 2: Add Email Service**

1. After login, go to **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for most users)
   - Outlook
   - Yahoo
   - Custom SMTP
4. Click on **Gmail** (or your choice)
5. Click **"Connect Account"**
6. Sign in with your Gmail account
7. Allow EmailJS permissions
8. **Copy the Service ID** (looks like `service_xxxxxxx`)
   - ⚠️ **SAVE THIS - YOU NEED IT!**

**Example Service ID:** `service_abc1234`

---

### **Step 3: Create Email Template**

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. You'll see a template editor with:
   - **Subject line**
   - **Email body (HTML)**
   - **Variables** (dynamic content)

#### **Recommended Template for Consultation Form:**

**Template Name:** `Consultation Request - Osteoarthritis`

**Subject:**
```
New Consultation Request from {{from_name}}
```

**Email Body (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0066CC; margin: 0;">New Consultation Request</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Osteoarthritis Treatment Landing Page</p>
        </div>
        
        <!-- Patient Information -->
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; font-size: 18px; margin-top: 0;">Patient Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                        <strong style="color: #555;">Name:</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                        <span style="color: #333;">{{from_name}}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                        <strong style="color: #555;">Phone:</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                        <span style="color: #333;">{{phone}}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                        <strong style="color: #555;">Location:</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                        <span style="color: #333;">{{location}}</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0;">
                        <strong style="color: #555;">Form Type:</strong>
                    </td>
                    <td style="padding: 10px 0; text-align: right;">
                        <span style="color: #333;">{{form_type}}</span>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Message Section -->
        {{#if message}}
        <div style="background-color: #fff9e6; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
            <h3 style="color: #333; font-size: 16px; margin-top: 0;">Patient Message:</h3>
            <p style="color: #555; margin: 0; white-space: pre-wrap;">{{message}}</p>
        </div>
        {{/if}}
        
        <!-- Submission Details -->
        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Submitted:</strong> {{submission_time}}<br>
                <strong>Page URL:</strong> {{page_url}}
            </p>
        </div>
        
        <!-- Action Button -->
        <div style="text-align: center; margin-top: 30px;">
            <a href="tel:{{phone}}" style="display: inline-block; background-color: #0066CC; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                📞 Call Patient Now
            </a>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
                This is an automated notification from your Osteoarthritis Treatment landing page.<br>
                Please respond to the patient within 24 hours for best conversion rates.
            </p>
        </div>
        
    </div>
</div>
```

4. **Save the template**
5. **Copy the Template ID** (looks like `template_xxxxxxx`)
   - ⚠️ **SAVE THIS - YOU NEED IT!**

**Example Template ID:** `template_xyz5678`

---

### **Step 4: Get Your Public Key**

1. Go to **"Account"** → **"General"** (left sidebar)
2. Find **"Public Key"** section
3. **Copy the Public Key** (alphanumeric string)
   - ⚠️ **SAVE THIS - YOU NEED IT!**

**Example Public Key:** `AbC123XyZ456`

---

### **Step 5: Configure Template Variables**

In your EmailJS template, you need to set up these variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `{{from_name}}` | Patient's full name | "Ramesh Kumar" |
| `{{phone}}` | Patient's phone number | "+91 98765 43210" |
| `{{location}}` | Patient's city/location | "Chennai" |
| `{{message}}` | Optional message from patient | "I have severe back pain..." |
| `{{form_type}}` | Which form was submitted | "Hero Form" or "Modal Form" |
| `{{submission_time}}` | When form was submitted | "Jan 21, 2026 1:30 PM" |
| `{{page_url}}` | Landing page URL | "https://yoursite.com" |

---

## Integration Code

### **Step 1: Add EmailJS SDK to HTML**

Add this script tag in your `index.html` **before** the closing `</body>` tag (before `<script src="script.js"></script>`):

```html
<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="text/javascript">
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your actual public key
    })();
</script>

<script src="script.js"></script>
```

**⚠️ Replace `YOUR_PUBLIC_KEY_HERE` with your actual Public Key from Step 4**

**Example:**
```html
<script type="text/javascript">
    (function(){
        emailjs.init("AbC123XyZ456"); // Your actual public key
    })();
</script>
```

---

### **Step 2: Update Form Submission Code**

Replace the form submission functions in `script.js`:

#### **For Hero Form (lines 77-133):**

```javascript
async function handleFormSubmission(form) {
    // Get form values from hero form
    const formData = {
        name: document.getElementById('hero-name').value,
        phone: document.getElementById('hero-phone').value,
        location: document.getElementById('hero-location').value,
        message: document.getElementById('hero-message').value
    };

    // Basic validation
    if (!formData.name || !formData.phone || !formData.location) {
        alert('Please fill in all required fields marked with *');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    try {
        // Prepare EmailJS parameters
        const templateParams = {
            from_name: formData.name,
            phone: formData.phone,
            location: formData.location,
            message: formData.message || 'No message provided',
            form_type: 'Hero Form',
            submission_time: new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short'
            }),
            page_url: window.location.href
        };

        // Send email via EmailJS
        await emailjs.send(
            'YOUR_SERVICE_ID',      // Replace with your Service ID
            'YOUR_TEMPLATE_ID',     // Replace with your Template ID
            templateParams
        );

        // Show success message
        alert('Thank you! Your consultation request has been received. Our team will contact you within 24 hours.');

        // Reset form
        form.reset();

        // Track conversion (if you have analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Consultation',
                'event_label': 'Hero Form'
            });
        }

    } catch (error) {
        console.error('Form submission error:', error);
        alert('Sorry, there was an error submitting your request. Please call us directly at +91 78999 03943');
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}
```

**⚠️ Replace:**
- `YOUR_SERVICE_ID` with your actual Service ID (e.g., `service_abc1234`)
- `YOUR_TEMPLATE_ID` with your actual Template ID (e.g., `template_xyz5678`)

---

#### **For Modal Form (lines 444-464):**

```javascript
// Handle form submission
consultationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(consultationForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show loading state
    const submitButton = consultationForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
        // Prepare EmailJS parameters
        const templateParams = {
            from_name: data.name,
            phone: data.phone,
            location: data.city,
            message: data.message || 'No message provided',
            form_type: 'Modal Form',
            submission_time: new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short'
            }),
            page_url: window.location.href
        };
        
        // Send email via EmailJS
        await emailjs.send(
            'YOUR_SERVICE_ID',      // Replace with your Service ID
            'YOUR_TEMPLATE_ID',     // Replace with your Template ID
            templateParams
        );
        
        // Show success message
        alert('Thank you! We will contact you shortly.');
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Consultation',
                'event_label': 'Modal Form'
            });
        }
        
        // Close modal
        closeModal();
        
    } catch (error) {
        console.error('EmailJS error:', error);
        alert('Sorry, there was an error. Please call us at +91 78999 03943');
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});
```

**⚠️ Replace:**
- `YOUR_SERVICE_ID` with your actual Service ID
- `YOUR_TEMPLATE_ID` with your actual Template ID

---

## Summary: What You Need

### **3 Required IDs:**

```javascript
// 1. SERVICE ID (from Email Services)
const SERVICE_ID = 'service_xxxxxxx';  // Example: service_abc1234

// 2. TEMPLATE ID (from Email Templates)
const TEMPLATE_ID = 'template_xxxxxxx';  // Example: template_xyz5678

// 3. PUBLIC KEY (from Account settings)
const PUBLIC_KEY = 'xxxxxxxxxxxx';  // Example: AbC123XyZ456
```

---

## Quick Setup Checklist

- [ ] **1. Create EmailJS account** at emailjs.com
- [ ] **2. Add Email Service** (Gmail recommended)
  - [ ] Copy Service ID: `service_________`
- [ ] **3. Create Email Template**
  - [ ] Use the HTML template provided above
  - [ ] Set up variables: `from_name`, `phone`, `location`, `message`, etc.
  - [ ] Copy Template ID: `template_________`
- [ ] **4. Get Public Key**
  - [ ] Go to Account → General
  - [ ] Copy Public Key: `____________`
- [ ] **5. Add EmailJS SDK to index.html**
  - [ ] Add script tag before closing `</body>`
  - [ ] Initialize with Public Key
- [ ] **6. Update script.js**
  - [ ] Replace `YOUR_SERVICE_ID` with actual Service ID
  - [ ] Replace `YOUR_TEMPLATE_ID` with actual Template ID
  - [ ] Update both Hero Form and Modal Form handlers
- [ ] **7. Test the forms**
  - [ ] Submit test data
  - [ ] Check if email arrives
  - [ ] Verify all variables are populated

---

## Email Template Variables Reference

When setting up your EmailJS template, use these exact variable names:

```javascript
{
    from_name: "Patient's full name",
    phone: "Patient's phone number",
    location: "Patient's city/location",
    message: "Optional message from patient",
    form_type: "Hero Form" or "Modal Form",
    submission_time: "Jan 21, 2026 1:30 PM",
    page_url: "https://yoursite.com"
}
```

---

## Testing

### **Test Procedure:**

1. **Open your landing page** in a browser
2. **Fill out the Hero Form:**
   - Name: Test Patient
   - Phone: 9876543210
   - Location: Chennai
   - Message: This is a test
3. **Click Submit**
4. **Check your email** (the one connected to EmailJS)
5. **Verify:**
   - ✅ Email received
   - ✅ All fields populated correctly
   - ✅ Formatting looks good
   - ✅ "Call Patient" button works

6. **Repeat for Modal Form**

---

## Troubleshooting

### **Problem 1: Email not received**

**Possible causes:**
- Wrong Service ID, Template ID, or Public Key
- EmailJS account not verified
- Email service not connected properly
- Monthly limit reached (200 emails on free plan)

**Solution:**
- Double-check all IDs
- Verify email in EmailJS account
- Check EmailJS dashboard for errors
- Check browser console for errors

---

### **Problem 2: "emailjs is not defined" error**

**Cause:** EmailJS SDK not loaded

**Solution:**
- Make sure EmailJS script is added to `index.html`
- Check that script loads before `script.js`
- Check browser console for loading errors

---

### **Problem 3: Variables not showing in email**

**Cause:** Variable names don't match

**Solution:**
- Make sure template uses exact variable names: `{{from_name}}`, `{{phone}}`, etc.
- Check that JavaScript sends same variable names
- Case-sensitive! `from_name` ≠ `From_Name`

---

### **Problem 4: Form submits but no email**

**Cause:** EmailJS service error

**Solution:**
- Check EmailJS dashboard for error logs
- Verify Service ID and Template ID are correct
- Check browser console for error messages
- Try sending test email from EmailJS dashboard

---

## Free vs Paid Plans

### **EmailJS Free Plan:**
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Basic support

### **When to Upgrade:**
- If you get more than 200 form submissions per month
- Need more email templates
- Need priority support

**Pricing:** Check [emailjs.com/pricing](https://www.emailjs.com/pricing)

---

## Security Best Practices

### **1. Don't expose sensitive data**
- Public Key is safe to expose (it's meant to be public)
- Service ID and Template ID are also safe
- Never expose your EmailJS password

### **2. Add reCAPTCHA (Optional)**
- Prevents spam submissions
- EmailJS supports reCAPTCHA integration

### **3. Rate Limiting**
- EmailJS has built-in rate limiting
- Free plan: 200 emails/month
- Prevents abuse

---

## Alternative: Using EmailJS with Environment Variables

If you're using a build system (like Vite, Webpack), you can use environment variables:

```javascript
// .env file
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=AbC123XyZ456

// In your code
emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams
);
```

**Note:** For your current static HTML setup, just use the IDs directly in the code.

---

## Support Resources

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Dashboard:** [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
- **Support:** support@emailjs.com

---

## Quick Reference Card

**Print this and keep it handy:**

```
┌─────────────────────────────────────────────┐
│         EMAILJS INTEGRATION IDs             │
├─────────────────────────────────────────────┤
│                                             │
│  Service ID:   service_____________         │
│                                             │
│  Template ID:  template_____________        │
│                                             │
│  Public Key:   ____________________         │
│                                             │
├─────────────────────────────────────────────┤
│  Where to use:                              │
│  • index.html (Public Key)                  │
│  • script.js (Service ID + Template ID)     │
└─────────────────────────────────────────────┘
```

---

**Document End**

*Last Updated: January 21, 2026*
