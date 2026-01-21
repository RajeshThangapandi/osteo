# Google Ads Conversion Tracking Plan
## Osteoarthritis Treatment Landing Page

**Document Version:** 1.0  
**Date:** January 21, 2026  
**Page URL:** [Your Landing Page URL]

---

## Table of Contents
1. [Overview](#overview)
2. [Conversion Actions to Track](#conversion-actions-to-track)
3. [Current Tracking Status](#current-tracking-status)
4. [Implementation Steps](#implementation-steps)
5. [Conversion Action Details](#conversion-action-details)
6. [Testing Checklist](#testing-checklist)
7. [Reporting & Optimization](#reporting--optimization)

---

## Overview

This document outlines the complete conversion tracking strategy for Google Ads campaigns targeting osteoarthritis treatment services. The goal is to track all user interactions that indicate intent or lead to patient acquisition.

### Primary Business Goals:
- Generate qualified consultation bookings
- Track phone call inquiries
- Monitor WhatsApp engagement
- Measure form submissions

---

## Conversion Actions to Track

### **Priority 1: Primary Conversions** (Direct Lead Generation)

| # | Conversion Name | Type | Value | Location |
|---|----------------|------|-------|----------|
| 1 | **Hero Form Submission** | Form Submit | High | Hero section (top of page) |
| 2 | **Modal Form Submission** | Form Submit | High | Popup modal (triggered by CTA buttons) |
| 3 | **Phone Call - Desktop** | Click-to-Call | High | Navbar, floating button, footer |
| 4 | **Phone Call - Mobile** | Click-to-Call | High | Mobile bottom bar |
| 5 | **WhatsApp - Floating (Desktop)** | Click | Medium-High | Floating action button (right side) |
| 6 | **WhatsApp - Mobile Bottom Bar** | Click | Medium-High | Mobile sticky bottom bar |

### **Priority 2: Secondary Conversions** (Engagement Indicators)

| # | Conversion Name | Type | Value | Location |
|---|----------------|------|-------|----------|
| 7 | **Video View** | Engagement | Low-Medium | Expert Insights section |
| 8 | **FAQ Interaction** | Engagement | Low | FAQ section |
| 9 | **Page Scroll Depth** | Engagement | Low | 25%, 50%, 75%, 100% |
| 10 | **Time on Page** | Engagement | Low | 30s, 60s, 120s+ |

---

## Current Tracking Status

### ✅ **Already Implemented (Partial)**
```javascript
// Form submission tracking (lines 118-123 in script.js)
gtag('event', 'form_submission', {
    'event_category': 'Consultation',
    'event_label': 'Hero Form'
});

// Phone call tracking (lines 264-269 in script.js)
gtag('event', 'phone_call', {
    'event_category': 'Contact',
    'event_label': link.href
});
```

### ❌ **Missing Tracking**
- WhatsApp click tracking (both floating and mobile)
- Modal form submission tracking
- Video engagement tracking
- Scroll depth tracking
- Time on page tracking
- Conversion differentiation (can't distinguish between different buttons)

---

## Implementation Steps

### **Step 1: Set Up Google Ads Conversion Actions**

#### In Google Ads Account:
1. Go to **Tools & Settings** → **Conversions**
2. Click **+ New Conversion Action**
3. Select **Website**
4. Create the following conversion actions:

#### **Conversion Action 1: Form Submission - Hero**
- **Conversion name:** `Consultation Form - Hero Section`
- **Category:** Submit lead form
- **Value:** Use different values for each conversion action (or same value)
- **Count:** One
- **Conversion window:** 30 days
- **Attribution model:** Data-driven (or Last click)

#### **Conversion Action 2: Form Submission - Modal**
- **Conversion name:** `Consultation Form - Modal Popup`
- **Category:** Submit lead form
- **Value:** Same as above
- **Count:** One
- **Conversion window:** 30 days

#### **Conversion Action 3: Phone Calls**
- **Conversion name:** `Phone Call - Click to Call`
- **Category:** Phone call leads
- **Value:** Assign value
- **Count:** One
- **Conversion window:** 30 days

#### **Conversion Action 4: WhatsApp - Floating Button**
- **Conversion name:** `WhatsApp Chat - Floating Button (Desktop)`
- **Category:** Contact
- **Value:** Assign value (slightly lower than phone)
- **Count:** One
- **Conversion window:** 30 days

#### **Conversion Action 5: WhatsApp - Mobile Bottom Bar**
- **Conversion name:** `WhatsApp Chat - Mobile Bottom Bar`
- **Category:** Contact
- **Value:** Assign value
- **Count:** One
- **Conversion window:** 30 days

#### **Conversion Action 6: Video Engagement**
- **Conversion name:** `Video View - Expert Insights`
- **Category:** Engagement
- **Value:** Lower value
- **Count:** One
- **Conversion window:** 7 days
- **Include in "Conversions":** No (track separately)

---

### **Step 2: Install Google Ads Global Site Tag**

Add this code to the `<head>` section of `index.html` (before line 15):

```html
<!-- Google Ads Global Site Tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXXX');
</script>
```

**Replace `AW-XXXXXXXXXX` with your actual Google Ads Conversion ID**

---

### **Step 3: Add Conversion Tracking Code**

After setting up each conversion action in Google Ads, you'll receive a conversion tracking code. Here's how to implement each:

---

## Conversion Action Details

### **1. Hero Form Submission Tracking**

**Location in code:** `script.js` lines 71-74 (already has basic tracking)

**Enhanced tracking code to add:**
```javascript
// In script.js, update the handleFormSubmission function (around line 118)

// REPLACE THIS:
if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submission', {
        'event_category': 'Consultation',
        'event_label': 'Hero Form'
    });
}

// WITH THIS:
if (typeof gtag !== 'undefined') {
    // Google Ads Conversion Tracking
    gtag('event', 'conversion', {
        'send_to': 'AW-XXXXXXXXXX/CONVERSION_LABEL_1',
        'event_category': 'Lead',
        'event_label': 'Hero Form Submission'
    });
    
    // Google Analytics Event (optional)
    gtag('event', 'form_submission', {
        'event_category': 'Consultation',
        'event_label': 'Hero Form'
    });
}
```

**Trigger:** Form submit button click (line 132 in script.js)  
**Element:** `<form id="heroBookingForm">` (line 111 in index.html)

---

### **2. Modal Form Submission Tracking**

**Location in code:** `script.js` lines 445-461

**Tracking code to add:**
```javascript
// In script.js, update the consultationForm submit handler (around line 445)

consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(consultationForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // ADD THIS GOOGLE ADS CONVERSION TRACKING:
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXXX/CONVERSION_LABEL_2',
            'event_category': 'Lead',
            'event_label': 'Modal Form Submission'
        });
    }
    
    // Show success message
    alert('Thank you! We will contact you shortly.');
    
    // Close modal
    closeModal();
});
```

**Trigger:** Modal form submit (line 445 in script.js)  
**Element:** `<form id="consultationForm">` (line 694 in index.html)

---

### **3. Phone Call Tracking**

**Location in code:** `script.js` lines 261-271 (already has basic tracking)

**Enhanced tracking code:**
```javascript
// In script.js, update the phone call tracking (around line 261)

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Determine source of click
        let clickSource = 'Unknown';
        if (link.classList.contains('nav-phone')) {
            clickSource = 'Navbar';
        } else if (link.classList.contains('call-btn')) {
            clickSource = 'Floating Button';
        } else if (link.classList.contains('btn-call')) {
            clickSource = 'Mobile Bottom Bar';
        } else if (link.closest('.footer-contact-info')) {
            clickSource = 'Footer';
        } else if (link.closest('.treatment-cta-section')) {
            clickSource = 'CTA Section';
        }
        
        // Google Ads Conversion Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXXX/CONVERSION_LABEL_3',
                'event_category': 'Contact',
                'event_label': 'Phone Call - ' + clickSource
            });
            
            // Also track as phone_call event
            gtag('event', 'phone_call', {
                'event_category': 'Contact',
                'event_label': clickSource + ' - ' + link.href
            });
        }
    });
});
```

**Trigger:** Click on any `tel:` link  
**Elements:** 
- Navbar: line 25 in index.html
- Floating button: line 664 in index.html
- Mobile bottom bar: line 728 in index.html
- Footer: line 622 in index.html
- CTA sections: lines 205, 347 in index.html

---

### **4. WhatsApp Tracking - Floating Button (Desktop/Tablet)**

**Location in code:** Currently NOT tracked

**Tracking code to add:**
```javascript
// In script.js, add this new tracking (around line 250)

// WhatsApp Floating Button Tracking
document.querySelectorAll('.whatsapp-btn').forEach(link => {
    link.addEventListener('click', (e) => {
        // Google Ads Conversion Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXXX/CONVERSION_LABEL_4',
                'event_category': 'Contact',
                'event_label': 'WhatsApp - Floating Button Desktop'
            });
            
            // Also track as custom event
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'Floating Button',
                'button_type': 'desktop_floating'
            });
        }
    });
});
```

**Trigger:** Click on floating WhatsApp button  
**Element:** `<a class="floating-btn whatsapp-btn">` (line 657 in index.html)  
**URL:** `https://wa.me/917899903943?text=Hi,%20I%20would%20like%20to%20book%20a%20consultation%20for%20osteoarthritis%20treatment.`

---

### **5. WhatsApp Tracking - Mobile Bottom Bar**

**Location in code:** Currently NOT tracked

**Tracking code to add:**
```javascript
// In script.js, add this new tracking (around line 250)

// WhatsApp Mobile Bottom Bar Tracking
document.querySelectorAll('.btn-whatsapp').forEach(link => {
    link.addEventListener('click', (e) => {
        // Google Ads Conversion Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXXX/CONVERSION_LABEL_5',
                'event_category': 'Contact',
                'event_label': 'WhatsApp - Mobile Bottom Bar'
            });
            
            // Also track as custom event
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'Mobile Bottom Bar',
                'button_type': 'mobile_sticky'
            });
        }
    });
});
```

**Trigger:** Click on mobile bottom bar WhatsApp button  
**Element:** `<a class="mobile-action-btn btn-whatsapp">` (line 747 in index.html)  
**URL:** `https://wa.me/917899903943?text=Hi,%20I%20would%20like%20to%20book%20a%20consultation.`

---

### **6. Video Engagement Tracking**

**Location in code:** `script.js` lines 334-366 (video modal functionality exists)

**Tracking code to add:**
```javascript
// In script.js, update the video card click handler (around line 334)

videoCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get URL from href or iframe src
        const iframe = this.querySelector('iframe');
        const videoUrl = iframe ? iframe.src : '';
        
        // Extract video ID
        let videoId = '';
        if (videoUrl.includes('youtube.com/embed/')) {
            videoId = videoUrl.split('embed/')[1].split('?')[0];
        }
        
        // Google Ads Conversion Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXXX/CONVERSION_LABEL_6',
                'event_category': 'Engagement',
                'event_label': 'Video View - ' + videoId
            });
            
            // Also track as video engagement
            gtag('event', 'video_view', {
                'event_category': 'Engagement',
                'event_label': 'Expert Insights',
                'video_id': videoId
            });
        }
        
        // ... rest of existing code
    });
});
```

**Trigger:** Click on video card  
**Elements:** `.video-card` (lines 446, 459, 472 in index.html)

---

### **7. Scroll Depth Tracking (Optional - Engagement Metric)**

**Location in code:** New addition needed

**Tracking code to add:**
```javascript
// Add this to script.js (around line 320, after page load)

// Scroll Depth Tracking
let scrollDepthTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
};

window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    // Track 25% scroll
    if (scrollPercent >= 25 && !scrollDepthTracked['25']) {
        scrollDepthTracked['25'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '25%',
                'value': 25
            });
        }
    }
    
    // Track 50% scroll
    if (scrollPercent >= 50 && !scrollDepthTracked['50']) {
        scrollDepthTracked['50'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '50%',
                'value': 50
            });
        }
    }
    
    // Track 75% scroll
    if (scrollPercent >= 75 && !scrollDepthTracked['75']) {
        scrollDepthTracked['75'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '75%',
                'value': 75
            });
        }
    }
    
    // Track 100% scroll
    if (scrollPercent >= 100 && !scrollDepthTracked['100']) {
        scrollDepthTracked['100'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '100%',
                'value': 100
            });
        }
    }
});
```

---

### **8. Time on Page Tracking (Optional - Engagement Metric)**

**Tracking code to add:**
```javascript
// Add this to script.js (around line 320, after page load)

// Time on Page Tracking
let timeTracked = {
    '30': false,
    '60': false,
    '120': false
};

// Track 30 seconds
setTimeout(() => {
    if (!timeTracked['30']) {
        timeTracked['30'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                'event_category': 'Engagement',
                'event_label': '30 seconds',
                'value': 30
            });
        }
    }
}, 30000);

// Track 60 seconds
setTimeout(() => {
    if (!timeTracked['60']) {
        timeTracked['60'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                'event_category': 'Engagement',
                'event_label': '60 seconds',
                'value': 60
            });
        }
    }
}, 60000);

// Track 120 seconds
setTimeout(() => {
    if (!timeTracked['120']) {
        timeTracked['120'] = true;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                'event_category': 'Engagement',
                'event_label': '120 seconds',
                'value': 120
            });
        }
    }
}, 120000);
```

---

## Testing Checklist

### **Before Going Live:**

#### ✅ **1. Google Tag Assistant Setup**
- [ ] Install Google Tag Assistant Chrome extension
- [ ] Verify Global Site Tag is firing on page load
- [ ] Check that Conversion ID is correct

#### ✅ **2. Test Each Conversion Action**

**Hero Form:**
- [ ] Fill out hero form (lines 111-135 in index.html)
- [ ] Submit form
- [ ] Verify conversion fires in Tag Assistant
- [ ] Check Google Ads → Conversions → Recent conversions (may take 24-48 hours)

**Modal Form:**
- [ ] Click any "Book Appointment" button
- [ ] Fill out modal form
- [ ] Submit
- [ ] Verify conversion fires

**Phone Calls:**
- [ ] Click navbar phone number
- [ ] Click floating call button
- [ ] Click mobile bottom bar call button
- [ ] Click footer phone number
- [ ] Verify each fires conversion with correct label

**WhatsApp Buttons:**
- [ ] Click floating WhatsApp button (desktop)
- [ ] Click mobile bottom bar WhatsApp button
- [ ] Verify each fires separate conversion

**Video Engagement:**
- [ ] Click on video card
- [ ] Verify conversion fires

**Scroll Depth:**
- [ ] Scroll to 25%, 50%, 75%, 100%
- [ ] Verify events fire at each milestone

**Time on Page:**
- [ ] Stay on page for 30s, 60s, 120s
- [ ] Verify events fire

#### ✅ **3. Cross-Device Testing**
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test on tablet
- [ ] Verify mobile-specific buttons work correctly

#### ✅ **4. Conversion Verification**
- [ ] Wait 24-48 hours after testing
- [ ] Check Google Ads → Tools → Conversions
- [ ] Verify test conversions appear
- [ ] Check conversion attribution is correct

---

## Reporting & Optimization

### **Key Metrics to Monitor:**

#### **Primary Conversions (Lead Generation)**
| Metric | Target | Action if Below Target |
|--------|--------|------------------------|
| Form Submission Rate | 3-5% | Optimize form fields, add trust signals |
| Phone Call Rate | 2-4% | Make phone number more prominent |
| WhatsApp Click Rate | 1-3% | Test different CTA copy |
| Total Conversion Rate | 6-12% | A/B test landing page elements |

#### **Secondary Metrics (Engagement)**
| Metric | Target | Insight |
|--------|--------|---------|
| Avg. Time on Page | 2+ minutes | Indicates content engagement |
| Scroll Depth (75%+) | 40%+ | Users reading full page |
| Video View Rate | 10-20% | Interest in expert content |
| Bounce Rate | <50% | Page relevance to ad |

### **Google Ads Columns to Add:**

1. **Conversions** (by conversion action)
2. **Conversion Rate**
3. **Cost per Conversion**
4. **Conversion Value**
5. **All Conversions** (includes cross-device)

### **Optimization Strategy:**

**Week 1-2: Data Collection**
- Let conversions accumulate
- Don't make changes
- Monitor for tracking errors

**Week 3-4: Initial Analysis**
- Identify best-performing keywords
- Identify best-performing ad copy
- Check device performance (mobile vs desktop)
- Analyze time-of-day patterns

**Week 5+: Optimization**
- Increase bids on high-converting keywords
- Pause low-performing keywords
- Test new ad variations
- Adjust landing page based on conversion data

---

## Conversion Value Assignment (Recommended)

Assign different values based on lead quality:

| Conversion Type | Suggested Value | Reasoning |
|----------------|-----------------|-----------|
| Hero Form | ₹500-1000 | High intent, detailed form |
| Modal Form | ₹500-1000 | High intent, detailed form |
| Phone Call | ₹800-1500 | Highest intent, immediate contact |
| WhatsApp (Desktop) | ₹300-600 | Medium intent, specific message |
| WhatsApp (Mobile) | ₹300-600 | Medium intent, generic message |
| Video View | ₹50-100 | Engagement, not direct lead |

**Note:** Adjust values based on your actual patient acquisition cost and lifetime value.

---

## Summary of Required Changes

### **Files to Modify:**

1. **index.html** (line 15)
   - Add Google Ads Global Site Tag

2. **script.js** (multiple locations)
   - Update form submission tracking (line 118)
   - Update modal form tracking (line 445)
   - Update phone call tracking (line 261)
   - Add WhatsApp floating button tracking (new, ~line 250)
   - Add WhatsApp mobile button tracking (new, ~line 250)
   - Add video engagement tracking (line 334)
   - Add scroll depth tracking (new, ~line 320)
   - Add time on page tracking (new, ~line 320)

### **Google Ads Setup:**
- Create 6-8 conversion actions
- Get conversion labels for each
- Replace `AW-XXXXXXXXXX` and `CONVERSION_LABEL_X` in code

---

## Quick Reference: Conversion Labels

After creating conversion actions in Google Ads, fill in this table:

| Conversion Action | Conversion ID | Conversion Label | Status |
|-------------------|---------------|------------------|--------|
| Hero Form | AW-XXXXXXXXXX | _____________ | ⬜ Not Set |
| Modal Form | AW-XXXXXXXXXX | _____________ | ⬜ Not Set |
| Phone Call | AW-XXXXXXXXXX | _____________ | ⬜ Not Set |
| WhatsApp Floating | AW-XXXXXXXXXX | _____________ | ⬜ Not Set |
| WhatsApp Mobile | AW-XXXXXXXXXX | _____________ | ⬜ Not Set |
| Video View | AW-XXXXXXXXXX | _____________ | ⬜ Not Set |

---

## Support & Troubleshooting

### **Common Issues:**

**Issue 1: Conversions not showing in Google Ads**
- Wait 24-48 hours for data to appear
- Check Tag Assistant for errors
- Verify conversion ID and labels are correct

**Issue 2: Duplicate conversions**
- Check "Count" setting (should be "One")
- Verify code isn't firing multiple times

**Issue 3: WhatsApp conversions not tracking**
- Ensure `target="_blank"` doesn't prevent tracking
- Add small delay before opening WhatsApp

**Issue 4: Mobile conversions lower than expected**
- Check mobile-specific elements are tracked separately
- Verify mobile bottom bar is visible and functional

---

## Contact Information

**For Implementation Support:**
- Developer: [Your Name]
- Google Ads Manager: [Name]
- Analytics Team: [Contact]

**Important Links:**
- Google Ads Account: [URL]
- Google Tag Manager (if used): [URL]
- Analytics Dashboard: [URL]

---

**Document End**

*Last Updated: January 21, 2026*
