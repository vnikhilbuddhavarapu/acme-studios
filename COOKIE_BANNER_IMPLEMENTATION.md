# Cookie Banner Implementation Guide

## Overview

A cookie consent banner has been implemented following GDPR/CCPA best practices with a clean, non-intrusive UX.

---

## How It Works

### **Cookies Used**

1. **`lng`** - Language preference (EN or FR-CA)
   - **Type:** Essential
   - **Always set:** Yes
   - **User can reject:** No (essential for functionality)

2. **`session_id`** - Authentication session
   - **Type:** Essential
   - **Set when:** User signs in
   - **User can reject:** No (essential for functionality)

3. **`cookie_consent`** - User's consent choice
   - **Type:** Preference tracking
   - **Values:** `accepted` or `rejected`
   - **Duration:** 1 year (365 days)
   - **Purpose:** Remember user's choice so banner doesn't show again

---

## User Experience

### **First Visit**
1. User visits any page
2. Cookie banner appears at bottom of screen
3. User sees two options:
   - **"Accept All"** - Consents to all cookies
   - **"Reject Non-Essential"** - Only essential cookies (same result since you only have essential cookies)
4. User clicks either button
5. Banner disappears and sets `cookie_consent` cookie
6. Banner won't show again for 1 year

### **Return Visits**
- Banner checks for `cookie_consent` cookie
- If found → Banner stays hidden
- If not found → Banner shows again

### **After 1 Year**
- `cookie_consent` cookie expires
- Banner shows again on next visit
- User makes choice again

### **If User Clears Cookies**
- All cookies deleted (including `cookie_consent`)
- Banner shows again on next visit
- Essential cookies (`lng`, `session_id`) are recreated as needed

---

## Banner Behavior

### **Position**
- Fixed at bottom of screen
- Full width with max-width container
- Above all content (z-index: 50)
- Does NOT block page interaction

### **Styling**
- Matches your theme colors and fonts
- Uses CSS variables: `--surface-1`, `--border`, `--fg`, `--accent`
- Responsive: Stacks vertically on mobile
- Shadow and border for visibility

### **Buttons**

#### "Reject Non-Essential"
- Sets `cookie_consent=rejected`
- Essential cookies still work (`lng`, `session_id`)
- Currently same result as "Accept" (you have no non-essential cookies)

#### "Accept All"
- Sets `cookie_consent=accepted`
- All cookies work normally
- Ready for future analytics cookies

---

## Privacy Policy Link

- Banner includes "Learn more" link
- Opens Privacy modal from Footer
- Uses custom event: `window.dispatchEvent(new CustomEvent('openPrivacy'))`
- Footer listens for event and opens modal

---

## Technical Implementation

### **Files Created/Modified**

1. **`src/react-app/components/CookieBanner.tsx`** (NEW)
   - Cookie banner component
   - Cookie consent management functions
   - 1-year expiration logic

2. **`src/react-app/App.tsx`** (MODIFIED)
   - Added `<CookieBanner />` to Shell component
   - Renders on all pages

3. **`src/react-app/components/Footer.tsx`** (MODIFIED)
   - Added event listener for `openPrivacy` event
   - Opens Privacy modal when triggered from banner

---

## Cookie Consent Logic

```typescript
// Check if user has made a choice
function getCookieConsent(): 'accepted' | 'rejected' | null {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'cookie_consent') {
      return value as 'accepted' | 'rejected'
    }
  }
  return null // No choice made yet
}

// Set user's choice (1 year expiration)
function setCookieConsent(value: 'accepted' | 'rejected') {
  const maxAge = 365 * 24 * 60 * 60 // 1 year in seconds
  document.cookie = `cookie_consent=${value}; max-age=${maxAge}; path=/; SameSite=Lax`
}
```

---

## Future: Adding Analytics Cookies

When you add Google Analytics or Cloudflare Analytics:

### **Step 1: Update Banner Logic**

```typescript
const handleAccept = () => {
  setCookieConsent('accepted')
  setVisible(false)
  
  // Load analytics only if accepted
  loadGoogleAnalytics()
  loadCloudflareAnalytics()
}

const handleReject = () => {
  setCookieConsent('rejected')
  setVisible(false)
  // Don't load analytics
}
```

### **Step 2: Conditional Loading**

```typescript
// In App.tsx or a separate analytics file
React.useEffect(() => {
  const consent = getCookieConsent()
  
  if (consent === 'accepted') {
    // Load Google Analytics
    window.gtag('config', 'GA_MEASUREMENT_ID')
    
    // Load Cloudflare Web Analytics
    // ... analytics code
  }
}, [])
```

### **Step 3: Update Banner Text**

Change from:
```
"We use cookies to remember your language preference and keep you signed in."
```

To:
```
"We use cookies for essential site functions and, with your consent, 
to analyze site usage and improve your experience."
```

---

## Testing

### **Test 1: First Visit**
1. Open site in incognito/private window
2. Banner should appear at bottom
3. Click "Accept All"
4. Banner should disappear
5. Check cookies: `cookie_consent=accepted` should exist

### **Test 2: Return Visit**
1. Close and reopen browser (same profile)
2. Visit site again
3. Banner should NOT appear
4. Cookie still exists: `cookie_consent=accepted`

### **Test 3: Reject**
1. Clear all cookies
2. Visit site
3. Click "Reject Non-Essential"
4. Banner disappears
5. Check cookies: `cookie_consent=rejected` should exist
6. Essential cookies (`lng`, `session_id`) still work

### **Test 4: Privacy Link**
1. Banner visible
2. Click "Learn more"
3. Privacy modal should open
4. Banner still visible behind modal
5. Close modal
6. Banner still visible

### **Test 5: Cookie Expiration**
1. Set `cookie_consent` with short expiration (for testing)
2. Wait for expiration
3. Refresh page
4. Banner should appear again

---

## GDPR/CCPA Compliance

### **✅ Compliant Because:**

1. **Essential cookies don't require consent**
   - `lng` (language) - Essential for site function
   - `session_id` (auth) - Essential for logged-in users

2. **User has clear choice**
   - Two buttons: Accept or Reject
   - Clear explanation of what cookies do

3. **Consent is remembered**
   - 1-year expiration
   - User not annoyed on every visit

4. **Privacy policy accessible**
   - Link in banner
   - Link in footer
   - Detailed information provided

5. **Reject option works**
   - User can reject non-essential cookies
   - Site still functions normally

---

## Customization

### **Change Banner Position**

Top of screen:
```tsx
<div className="fixed top-0 left-0 right-0 ...">
```

### **Change Expiration Time**

6 months:
```typescript
const maxAge = 180 * 24 * 60 * 60 // 6 months
```

30 days:
```typescript
const maxAge = 30 * 24 * 60 * 60 // 30 days
```

### **Change Button Colors**

Edit in `CookieBanner.tsx`:
```tsx
<button className="px-4 py-2 text-sm bg-blue-600 text-white ...">
  Accept All
</button>
```

### **Add "Customize" Button**

Future enhancement for granular cookie control:
```tsx
<button onClick={() => setShowCustomize(true)}>
  Customize
</button>
```

---

## Summary

✅ **Cookie banner implemented**
✅ **Matches your theme and styling**
✅ **Appears at bottom, doesn't block content**
✅ **Remembers choice for 1 year**
✅ **Links to Privacy policy**
✅ **Essential cookies always work**
✅ **Ready for future analytics cookies**
✅ **GDPR/CCPA compliant**

**User won't be annoyed:** Banner only shows once per year (or until they clear cookies).
