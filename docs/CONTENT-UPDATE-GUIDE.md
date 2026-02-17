# Bombers Baseball Content Update Guide

**Last Updated:** February 2026
**For:** Board members and staff updating website content
**Technical Contact:** [TECHNICAL_CONTACT] — [TECHNICAL_CONTACT_EMAIL] — [TECHNICAL_CONTACT_PHONE]

---

## 1. Welcome / Overview

### What This Guide Is For

This guide shows you how to update content on the Bombers Baseball website, including:

- Team rosters and coach information
- Event dates and registration fees
- Sponsor information
- Board member profiles
- Spirit wear products
- Contact information and home page content
- Code of Conduct

You don't need any coding or technical experience to make updates. If you're comfortable using email and a web browser, you can update the website.

### What You Need

- **GitHub account** (free) — Sign up at https://github.com/signup
- **Repository access** — Contact [TECHNICAL_CONTACT] to be added as a collaborator
- **Web browser** — Chrome, Firefox, Safari, or Edge

### Safety Features

The website has several built-in safety features to protect against mistakes:

- **Automatic validation** catches errors before they go live (missing commas, invalid data, etc.)
- **Preview links** let you see your changes before publishing
- **Instant rollback** can undo changes if something goes wrong
- **Version history** tracks every change with who made it and when

If you make a mistake, the system will either catch it automatically or it can be fixed quickly. **Don't be afraid to make changes** — the safety features are there to help you.

### Getting Help

If you need assistance at any time:

- **Primary contact:** [TECHNICAL_CONTACT] at [TECHNICAL_CONTACT_EMAIL]
- **Urgent issues** (site is broken): [TECHNICAL_CONTACT_PHONE]
- **Non-urgent questions:** Create an Issue in GitHub (explained later in this guide)

---

## 2. Getting Started with GitHub

### What Is GitHub?

GitHub is a website that stores the files for the Bombers website. Think of it as a special filing cabinet where:

- All website files are organized in folders
- Every change is saved with a record of who made it and when
- Multiple people can work on updates without overwriting each other's work

### How to Sign In

1. Go to https://github.com
2. Click **Sign in** in the top right corner
3. Enter your username and password
4. If prompted, complete two-factor authentication

### Finding the Bombers Repository

A "repository" (or "repo") is a project folder in GitHub that contains all the files for a website.

1. After signing in, click your profile icon (top right)
2. Click **Your repositories**
3. Find and click **bombers** in the list
4. **Bookmark this page** so you can return to it easily

[SCREENSHOT: GitHub repository page with bombers highlighted]

### Navigating to Data Files

All editable content is stored in the `src/lib/data` folder. Here's how to find it:

1. On the repository main page, click the **src** folder
2. Click the **lib** folder
3. Click the **data** folder
4. You'll see 8 files ending in `.json` — these contain all the website content

[SCREENSHOT: File structure showing src > lib > data path]

**The 8 Data Files:**

| File | What It Contains |
|------|------------------|
| `teams.json` | Team rosters, coaches, and player information |
| `fees.json` | Registration fees, event dates, and FAQs |
| `organization.json` | Board members and staff profiles |
| `sponsors.json` | Sponsor information and logos |
| `home.json` | Home page content (headline, quick links, key dates) |
| `spirit-wear.json` | Spirit wear products and store link |
| `contact.json` | Contact email, donation link, social media |
| `conduct.json` | Code of Conduct sections and rules |

---

## 3. How to Edit a File (General Process)

This section explains the step-by-step process for editing any file. You'll use these same steps whether you're updating a roster, adding a sponsor, or changing event dates.

### Step 1: Navigate to the File

1. Go to the repository on GitHub (use your bookmark)
2. Navigate to `src/lib/data` (click **src** → **lib** → **data**)
3. Click the file you want to edit (e.g., `teams.json`)

### Step 2: Click the Edit Button

1. Look for the **pencil icon** (✏️) on the right side of the screen
2. It says "Edit this file" when you hover over it
3. Click the pencil icon

[SCREENSHOT: Pencil icon location in GitHub file view]

**Note:** If you don't see the pencil icon, you may not have edit permissions. Contact [TECHNICAL_CONTACT] to request access.

### Step 3: Make Your Changes in the Editor

The file will open in a text editor. You'll see the content in a format called JSON (explained later).

- Make your changes carefully
- Pay attention to commas, quotes, and brackets (explained in each section below)
- Use copy-paste templates provided in this guide to avoid syntax errors

[SCREENSHOT: GitHub web editor with JSON content]

### Step 4: Preview Your Changes (Optional)

Before saving, you can scroll through the file to double-check your changes. The editor doesn't have spell-check, so review carefully.

### Step 5: Describe Your Changes

Scroll to the bottom of the page. You'll see a section called **"Commit changes"**.

1. In the first text box, write a short description of what you changed:
   - Good: "Add Tyler Bennett to 7U Adams roster"
   - Good: "Update tryout date to March 15"
   - Bad: "Update" (too vague)
   - Bad: "Fixed stuff" (not descriptive)

2. The second text box (optional extended description) can be left blank for simple changes

[SCREENSHOT: Commit changes section with description field highlighted]

### Step 6: Select "Create a New Branch"

Below the description boxes, you'll see two options:

- **Commit directly to the main branch** (DO NOT select this)
- **Create a new branch for this commit and start a pull request** (SELECT THIS)

Always select **"Create a new branch for this commit and start a pull request"**. This creates a safety checkpoint before your changes go live.

[SCREENSHOT: Branch options with correct option highlighted]

### Step 7: Propose Changes

1. Click the green **"Propose changes"** button
2. Wait for the page to load (it will take you to a new screen)

### Step 8: Create Pull Request

1. You'll see a page titled "Open a pull request"
2. Review the summary of your changes (shown in green for additions, red for deletions)
3. Click the green **"Create pull request"** button

[SCREENSHOT: Create pull request button]

### Step 9: Wait for Validation

After creating the pull request, GitHub will automatically check your changes. This takes 1-2 minutes.

Look for the status indicators:

- **🟡 Yellow dot** = Validation is running (wait)
- **✅ Green checkmark** = Validation passed! Your changes are safe to publish
- **❌ Red X** = Validation failed. There's an error that needs to be fixed

[SCREENSHOT: Pull request checks with green checkmark]

### Step 10: Merge Your Changes (If Validation Passed)

If you see a green checkmark:

1. Click the green **"Merge pull request"** button
2. Click **"Confirm merge"**
3. Your changes are now queued for publishing!

The website will update automatically in 2-3 minutes.

[SCREENSHOT: Merge pull request button]

### What If Validation Fails? (Red X)

If you see a red X, don't worry! This is the safety system doing its job.

1. Click **"Details"** next to the failed check to see the error message
2. Look for the specific error (e.g., "Missing comma on line 45")
3. Click the **"Files changed"** tab
4. Click the **three dots** (...) next to the file name
5. Click **"Edit file"**
6. Fix the error
7. Scroll down and click **"Commit changes"**
8. Wait for validation to run again

See the **Troubleshooting** section (Section 14) for common errors and how to fix them.

---

## 4. Editing Team Rosters (teams.json)

**File location:** `src/lib/data/teams.json`

This file contains all team rosters, including team names, coaches, and player lists.

### Common Task: Add a Player to a Team

**Step-by-step:**

1. Navigate to `teams.json` and click the edit button (pencil icon)
2. Find the team you want to update:
   - Use **Ctrl+F** (Windows) or **Cmd+F** (Mac) to search
   - Search for the team name (e.g., "7U Adams")
3. Find the `"players"` array (it's a list inside square brackets `[]`)
4. Place your cursor after the last player in the list
5. Add a comma after the closing brace `}` of the last player (if not already there)
6. Copy this template and paste it:

```json
        { "name": "First Last", "jerseyNumber": 12 }
```

7. Replace `"First Last"` with the player's name
8. Replace `12` with the player's jersey number
9. **Important:** Check if you need a comma after the closing brace `}`:
   - If there are more players after this one, add a comma
   - If this is the last player, do NOT add a comma

**Example:**

```json
      "players": [
        { "name": "Tyler Bennett", "jerseyNumber": 5 },
        { "name": "Mason Carter", "jerseyNumber": 8 },
        { "name": "New Player Name", "jerseyNumber": 10 }
      ]
```

**WARNING:** Each player on a team must have a unique jersey number. If you use a duplicate number, validation will fail.

### Common Task: Remove a Player from a Team

1. Find the player entry (use Ctrl+F / Cmd+F to search for the name)
2. Delete the entire player line, including the comma:

**Before:**
```json
        { "name": "Tyler Bennett", "jerseyNumber": 5 },
        { "name": "Mason Carter", "jerseyNumber": 8 },
        { "name": "Player to Remove", "jerseyNumber": 10 }
```

**After:**
```json
        { "name": "Tyler Bennett", "jerseyNumber": 5 },
        { "name": "Mason Carter", "jerseyNumber": 8 }
```

**Note:** Make sure the last player in the list does NOT have a comma after the closing brace.

### Common Task: Change a Jersey Number

1. Find the player (use Ctrl+F / Cmd+F to search)
2. Change the number after `"jerseyNumber":`

**Before:**
```json
        { "name": "Tyler Bennett", "jerseyNumber": 5 }
```

**After:**
```json
        { "name": "Tyler Bennett", "jerseyNumber": 12 }
```

### Common Task: Update a Coach's Bio

1. Find the coach in the `"coaches"` array
2. Find the `"bio"` field
3. Edit the text between the quotes
4. Keep the bio under 500 characters

**Example:**
```json
          "bio": "Coach Adams has been coaching youth baseball for 8 years and focuses on building fundamental skills in a fun, supportive environment."
```

### Common Task: Change Coach Photo

1. First, upload the coach's photo (see Section 12: Uploading Images)
2. Find the coach in the `"coaches"` array
3. Update the `"photoUrl"` field with the new filename:

```json
          "photoUrl": "/images/coaches/coach-mike-adams.jpg"
```

**Important:** The path must start with `/images/coaches/` and the filename must be lowercase with hyphens (no spaces).

### Common Task: Add a New Team

Copy this template and paste it into the `"teams"` array (remember to add a comma before or after as needed):

```json
    {
      "id": "age-coachname",
      "name": "Age Group Coach Last Name",
      "ageGroup": "12U",
      "headCoachName": "First Last",
      "season": "Spring 2026",
      "coaches": [
        {
          "name": "First Last",
          "role": "Head Coach",
          "photoUrl": "/images/coaches/placeholder.jpg",
          "bio": "Short bio about the coach (optional)"
        }
      ],
      "players": [],
      "teamPhotoUrl": "/images/teams/placeholder.jpg"
    }
```

**Replace:**
- `"age-coachname"` → Lowercase age group + coach last name (e.g., `"12u-martinez"`)
- `"Age Group Coach Last Name"` → Display name (e.g., `"12U Martinez"`)
- `"12U"` → Age group (must be one of: 7U, 8U, 9U, 10U, 11U, 12U, 13U, 14U, 15U)
- `"First Last"` → Coach's full name
- `"Spring 2026"` → Current season (match the `"currentSeason"` at the top of the file)
- Update bio, photo URLs, and add players as needed

### Common Task: Update the Current Season

At the very top of the file, you'll see:

```json
  "currentSeason": "Spring 2026",
```

Change the season value to the current season (e.g., `"Fall 2026"`, `"Spring 2027"`)

**Important:** When changing the season, also update the `"season"` field for each team to match.

---

## 5. Editing Fees & Events (fees.json)

**File location:** `src/lib/data/fees.json`

This file contains registration fees, key event dates, and frequently asked questions.

### Common Task: Update a Registration Fee

1. Find the `"ageFees"` section
2. Find the age group you want to update
3. Change the `"amount"` number:

**Before:**
```json
      "ageGroup": "9U-10U",
      "amount": 450,
```

**After:**
```json
      "ageGroup": "9U-10U",
      "amount": 475,
```

**Note:** Do not include a dollar sign or decimal point if the amount is a whole number.

### Common Task: Add a New Fee Tier

Copy this template and paste it into the `"ageFees"` array:

```json
    {
      "ageGroup": "16U-18U",
      "amount": 700,
      "includes": [
        "Full season roster spot",
        "Team uniform (jersey and hat)",
        "Tournament fees",
        "Practice field time"
      ],
      "paymentDeadline": "March 15, 2026",
      "depositAmount": 150
    }
```

Update all the values as needed.

### Common Task: Change an Event Date

1. Find the `"keyDates"` section
2. Use Ctrl+F / Cmd+F to search for the event by name or label
3. Update the `"date"` field:

**Before:**
```json
      "label": "Tryouts Begin",
      "date": "February 10, 2026",
```

**After:**
```json
      "label": "Tryouts Begin",
      "date": "February 15, 2026",
```

**Note:** Use the format "Month DD, YYYY" (e.g., "March 15, 2026")

### Common Task: Add a New Event Date

Copy this template and paste it into the `"keyDates"` array:

```json
    {
      "id": "event-name",
      "label": "Event Name",
      "date": "Month DD, YYYY",
      "category": "registration",
      "description": "Brief description of the event"
    }
```

**Category options:**
- `"registration"` — Registration deadlines and payment dates
- `"tryout"` — Tryout dates
- `"tournament"` — Tournament and game dates
- `"season"` — Season start/end dates

### Common Task: Update an FAQ Answer

1. Find the `"faqItems"` section
2. Use Ctrl+F / Cmd+F to search for the question text
3. Update the `"answer"` field:

```json
      "question": "What is included in the registration fee?",
      "answer": "The registration fee covers all team expenses including uniforms, tournament fees, field time, and equipment. It does NOT include optional spirit wear or travel expenses.",
```

### Common Task: Add a New FAQ

Copy this template and paste it into the `"faqItems"` array:

```json
    {
      "id": "unique-id",
      "question": "Your question here?",
      "answer": "Your answer here.",
      "category": "fees"
    }
```

**Category options:**
- `"fees"` — Payment and cost questions
- `"tryouts"` — Tryout process questions
- `"season"` — Season logistics and schedule questions
- `"general"` — General program questions

---

## 6. Editing Board Members & Staff (organization.json)

**File location:** `src/lib/data/organization.json`

This file contains board member and staff profiles.

### Common Task: Add a Board Member

Copy this template and paste it into the `"boardMembers"` array:

```json
    {
      "name": "First Last",
      "title": "Board Position",
      "bio": "Brief bio about the board member and their role with the organization.",
      "photoUrl": "/images/board/placeholder.jpg"
    }
```

**Replace:**
- `"First Last"` → Board member's full name
- `"Board Position"` → Their title (e.g., "President", "Treasurer", "Secretary")
- Update the bio (keep under 500 characters)
- Upload a photo (see Section 12) and update the `"photoUrl"`

### Common Task: Update a Board Member's Title or Bio

1. Find the board member by name (use Ctrl+F / Cmd+F)
2. Update the `"title"` or `"bio"` field:

```json
    {
      "name": "John Smith",
      "title": "Vice President",
      "bio": "Updated bio text here.",
      "photoUrl": "/images/board/john-smith.jpg"
    }
```

### Common Task: Remove a Board Member

1. Find the board member entry
2. Delete the entire block from the opening `{` to the closing `}`, including the comma:

**Before:**
```json
  "boardMembers": [
    {
      "name": "John Smith",
      "title": "Vice President",
      "bio": "...",
      "photoUrl": "/images/board/john-smith.jpg"
    },
    {
      "name": "Person to Remove",
      "title": "Secretary",
      "bio": "...",
      "photoUrl": "/images/board/person.jpg"
    }
  ]
```

**After:**
```json
  "boardMembers": [
    {
      "name": "John Smith",
      "title": "Vice President",
      "bio": "...",
      "photoUrl": "/images/board/john-smith.jpg"
    }
  ]
```

**Note:** Make sure the last item in the list does NOT have a comma after the closing `}`.

---

## 7. Editing Sponsors (sponsors.json)

**File location:** `src/lib/data/sponsors.json`

This file contains sponsor information and logos.

### Common Task: Add a New Sponsor

Copy this template and paste it into the `"sponsors"` array:

```json
    {
      "id": "company-name",
      "name": "Company Name Inc.",
      "logoUrl": "/images/sponsors/company-logo.png",
      "description": "Brief description of the sponsor and their support.",
      "websiteUrl": "https://example.com"
    }
```

**Replace:**
- `"company-name"` → Lowercase company name with hyphens (e.g., `"valley-auto-group"`)
- `"Company Name Inc."` → Full company name as it should display
- Upload the sponsor logo (see Section 12) and update `"logoUrl"`
- Write a brief description (1-2 sentences)
- `"websiteUrl"` → Company website (optional — if the sponsor doesn't have a website, you can remove this line entirely)

**Example without website:**
```json
    {
      "id": "local-cafe",
      "name": "Main Street Cafe",
      "logoUrl": "/images/sponsors/main-street-cafe.png",
      "description": "Family-owned cafe serving the community since 2010."
    }
```

### Common Task: Remove a Sponsor

1. Find the sponsor entry (use Ctrl+F / Cmd+F to search)
2. Delete the entire block from `{` to `}`, including the comma

Make sure the last sponsor in the list does not have a trailing comma.

### Common Task: Update Sponsor Information

1. Find the sponsor by name
2. Update any field (name, description, websiteUrl)

```json
    {
      "id": "valley-auto",
      "name": "Valley Auto Group - Updated Name",
      "logoUrl": "/images/sponsors/valley-auto.png",
      "description": "Updated description here.",
      "websiteUrl": "https://newwebsite.com"
    }
```

**WARNING:** If you change the sponsor `"id"`, you may also need to update references to that sponsor in other files (e.g., `home.json`). Contact [TECHNICAL_CONTACT] for assistance with ID changes.

---

## 8. Editing Spirit Wear (spirit-wear.json)

**File location:** `src/lib/data/spirit-wear.json`

This file contains spirit wear products and the online store link.

### Common Task: Add a Spirit Wear Product

Copy this template and paste it into the `"products"` array:

```json
    {
      "id": "product-name",
      "name": "Product Name",
      "category": "apparel",
      "price": 25,
      "imageUrl": "/images/spirit-wear/product-image.jpg",
      "description": "Product description here.",
      "sizes": ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL"],
      "externalUrl": "https://store.com/product"
    }
```

**Replace:**
- `"product-name"` → Lowercase product name with hyphens (e.g., `"t-shirt-navy"`)
- `"Product Name"` → Display name (e.g., `"Bombers T-Shirt - Navy"`)
- `"category"` → Must be one of: `"apparel"`, `"headwear"`, or `"accessories"`
- `"price"` → Price as a number (no dollar sign)
- Upload product image (see Section 12) and update `"imageUrl"`
- `"description"` → Brief product description
- `"sizes"` → Available sizes (optional — remove this line if not applicable)
- `"externalUrl"` → Direct link to the product (optional — remove if not applicable)

### Common Task: Update Product Price

1. Find the product by name
2. Change the `"price"` number:

```json
      "price": 30,
```

### Common Task: Update the Spirit Wear Store URL

At the top of the file, find:

```json
  "storeUrl": "https://example.com/bombers-store",
```

Replace the URL with the new store link.

---

## 9. Editing Home Page Content (home.json)

**File location:** `src/lib/data/home.json`

This file contains the home page hero section, quick links, and key dates.

### Common Task: Change the Hero Headline or Tagline

At the top of the file, find the `"hero"` section:

```json
  "hero": {
    "headline": "Welcome to Bombers Baseball",
    "tagline": "Building Champions On and Off the Field",
    "imageUrl": "/images/hero-placeholder.jpg"
  },
```

Edit the `"headline"` or `"tagline"` text as needed.

### Common Task: Update Key Dates on Homepage

The home page displays a few key upcoming dates. Find the `"keyDates"` array:

```json
  "keyDates": [
    {
      "label": "Tryouts Begin",
      "date": "February 10, 2026"
    },
    {
      "label": "Registration Deadline",
      "date": "March 1, 2026"
    },
    {
      "label": "Season Starts",
      "date": "April 15, 2026"
    }
  ]
```

Update the dates using the format "Month DD, YYYY".

### Common Task: Update Quick Link Descriptions

The home page has quick links to important pages. Find the `"quickLinks"` array:

```json
    {
      "title": "View Teams",
      "description": "Meet our coaches and view team rosters",
      "href": "/teams",
      "iconName": "Users"
    }
```

You can update the `"description"` field. The `"title"` and `"href"` should usually stay the same.

**Note:** The `"iconName"` field controls which icon displays. To change icons, contact [TECHNICAL_CONTACT] — this requires code changes.

---

## 10. Editing Contact Info (contact.json)

**File location:** `src/lib/data/contact.json`

This file contains the contact email, donation link, and social media links.

### Common Task: Update the Contact Email Address

Find the `"email"` field:

```json
  "email": "info@bombers-baseball.org",
```

Replace with the new email address.

### Common Task: Update the Donation URL

Find the `"donationUrl"` field:

```json
  "donationUrl": "https://example.com/donate",
```

Replace with the new donation page link.

### Common Task: Update Social Media URLs

Find the `"socialLinks"` array:

```json
  "socialLinks": [
    {
      "platform": "Facebook",
      "url": "https://facebook.com/bombers",
      "iconName": "Facebook"
    },
    {
      "platform": "Instagram",
      "url": "https://instagram.com/bombers",
      "iconName": "Instagram"
    }
  ]
```

Update the `"url"` fields with the new social media profile links.

**Note:** The `"iconName"` field controls which icon displays. To add new social media platforms or change icons, contact [TECHNICAL_CONTACT] — this requires code changes.

---

## 11. Editing Code of Conduct (conduct.json)

**File location:** `src/lib/data/conduct.json`

This file contains the Code of Conduct sections and rules.

### Common Task: Edit Rules in a Section

1. Find the section you want to update (`"player"`, `"parent"`, `"coach"`, or `"spectator"`)
2. Find the `"rules"` array
3. Edit the text of existing rules:

```json
      "rules": [
        "Updated rule text here",
        "Another rule here"
      ]
```

### Common Task: Add a New Rule to a Section

1. Find the section
2. Find the `"rules"` array
3. Add a comma after the last rule
4. Add your new rule in quotes:

**Before:**
```json
      "rules": [
        "Respect coaches, teammates, and officials at all times",
        "Display good sportsmanship in victory and defeat"
      ]
```

**After:**
```json
      "rules": [
        "Respect coaches, teammates, and officials at all times",
        "Display good sportsmanship in victory and defeat",
        "New rule here"
      ]
```

### Common Task: Add a New Code of Conduct Section

Copy this template and paste it into the `"sections"` array:

```json
    {
      "id": "section-name",
      "title": "Section Title",
      "description": "Brief description of this section.",
      "rules": [
        "First rule",
        "Second rule",
        "Third rule"
      ]
    }
```

---

## 12. Uploading Images

Board members can upload images directly through GitHub's web interface.

### Image Naming Rules

All image filenames must follow these rules:

- **Lowercase only** — Use `coach-mike-adams.jpg`, not `Coach-Mike-Adams.jpg`
- **Use hyphens for spaces** — Use `team-photo.jpg`, not `team photo.jpg`
- **No special characters** — Only letters, numbers, and hyphens
- **Supported formats** — `.jpg`, `.jpeg`, `.png`

**Examples:**
- ✅ Good: `coach-mike-adams.jpg`
- ✅ Good: `12u-martinez-team.png`
- ❌ Bad: `Coach Mike Adams.jpg` (uppercase, spaces)
- ❌ Bad: `team_photo.jpg` (underscores)
- ❌ Bad: `logo (1).png` (spaces, parentheses)

### Recommended Image Sizes

Different types of images have different recommended sizes:

| Image Type | Recommended Size | Aspect Ratio |
|------------|------------------|--------------|
| Team photos | 1200 x 800 pixels | 3:2 (landscape) |
| Coach headshots | 400 x 400 pixels | 1:1 (square) |
| Board member photos | 400 x 400 pixels | 1:1 (square) |
| Sponsor logos | 800 x 800 pixels | 1:1 (square), transparent PNG preferred |
| Spirit wear products | 800 x 800 pixels | 1:1 (square) |

**Note:** These are recommendations, not strict requirements. The website will display images that are larger or smaller, but these sizes provide the best quality.

### Where to Upload Each Type of Image

| Image Type | Upload To |
|------------|-----------|
| Team photos | `/public/images/teams/` |
| Coach photos | `/public/images/coaches/` |
| Board member photos | `/public/images/board/` |
| Sponsor logos | `/public/images/sponsors/` |
| Spirit wear products | `/public/images/spirit-wear/` |

### Step-by-Step: Upload an Image via GitHub

**Example: Uploading a coach photo**

1. Navigate to the repository on GitHub (use your bookmark)
2. Click the **public** folder
3. Click the **images** folder
4. Click the **coaches** folder (or the appropriate folder for your image type)
5. Click the **Add file** button (top right)
6. Select **Upload files** from the dropdown menu
7. Drag your image file into the upload area, or click **choose your files** to browse
8. Make sure the filename follows the naming rules (lowercase, hyphens, no spaces)
9. Scroll down to the **"Commit changes"** section
10. Write a brief description: "Add coach Mike Adams photo"
11. Select **"Commit directly to the main branch"** (images can be uploaded directly)
12. Click **"Commit changes"**

[SCREENSHOT: Upload files interface with drag-and-drop area]

**Note:** Unlike editing data files, images can be uploaded directly to the main branch. They won't break the site if there's an issue with the file.

### How to Reference Images in JSON Files

After uploading an image, you need to reference it in the appropriate JSON file.

**Important:** The path in JSON starts with `/images/`, NOT `/public/images/`.

**Examples:**

If you uploaded: `/public/images/coaches/coach-mike-adams.jpg`
Reference it as: `/images/coaches/coach-mike-adams.jpg`

If you uploaded: `/public/images/sponsors/valley-auto-logo.png`
Reference it as: `/images/sponsors/valley-auto-logo.png`

**In teams.json:**
```json
          "photoUrl": "/images/coaches/coach-mike-adams.jpg"
```

**In sponsors.json:**
```json
      "logoUrl": "/images/sponsors/valley-auto-logo.png"
```

---

## 13. Previewing Your Changes

After you create a pull request, a preview of your changes is automatically generated. This lets you see how your changes will look on the live site before publishing.

### How Preview Deployments Work

When you create a pull request (Step 8 in Section 3), a service called Vercel automatically builds a preview version of the website with your changes.

**Timeline:**
- Pull request created → Preview starts building (takes 2-3 minutes)
- Preview ready → A comment appears on the pull request with a link
- Click the link → See your changes on a preview site

[SCREENSHOT: Vercel bot comment with preview URL]

### Finding the Preview Link

1. After creating your pull request, scroll down to the comments section
2. Look for a comment from **"Vercel bot"** or **"vercel[bot]"**
3. The comment will have a link labeled **"Visit Preview"** or show a URL
4. Click the link to open the preview site in a new tab

### What to Check in the Preview

Navigate to the page with your changes and verify:

- **Text accuracy** — Is the information correct?
- **Formatting** — Does everything display properly?
- **Images** — Do photos and logos appear (not broken)?
- **Links** — If you updated links, click them to make sure they work

If something looks wrong, you can edit the pull request before merging (see Section 3, Step 10 under "What If Validation Fails").

### When Preview Links Are Available

Preview deployments are set up in **Phase 10: Deployment**. If you're reading this guide before Phase 10 is complete, preview links may not be available yet. Check with [TECHNICAL_CONTACT] if you're unsure.

---

## 14. Troubleshooting

### "I see a red X on my pull request"

**What this means:** The automatic validation found an error in your changes.

**Common causes:**

1. **Missing comma** — JSON requires commas between items in a list
2. **Extra comma** — The last item in a list should NOT have a comma after it
3. **Missing quotes** — All text values must be inside double quotes `"like this"`
4. **Duplicate jersey number** — Two players on the same team can't have the same number
5. **Invalid value** — For example, age group must be 7U-15U, not "ABC"

**How to fix:**

1. Click **"Details"** next to the failed check to see the exact error message
2. Read the error carefully — it usually tells you what's wrong and where
3. Click the **"Files changed"** tab
4. Click the **three dots** (...) next to the filename
5. Click **"Edit file"**
6. Fix the error based on the message
7. Scroll down and click **"Commit changes"**
8. Wait for validation to run again (1-2 minutes)

**Example error messages and fixes:**

| Error Message | What It Means | How to Fix |
|---------------|---------------|------------|
| "Unexpected token }" | Extra or missing comma | Check commas in the list near the error |
| "Jersey number must be between 1 and 99" | Invalid jersey number | Change the number to a valid range |
| "Duplicate team IDs found" | Two teams have the same ID | Change one of the IDs to be unique |
| "Missing required field: name" | A required field is empty or missing | Add the missing field |

### "I can't find the Edit button (pencil icon)"

**What this means:** You may not have permission to edit the repository.

**How to fix:**

Contact [TECHNICAL_CONTACT] and ask to be added as a collaborator on the repository. Provide your GitHub username.

### "My changes aren't showing on the website"

**Possible causes:**

1. **You didn't merge the pull request** — Creating a pull request doesn't publish changes; you must also click "Merge pull request"
2. **Deployment is still in progress** — Changes take 2-3 minutes to deploy
3. **Browser cache** — Your browser is showing an old version of the page

**How to fix:**

1. Go to the pull request and check if you clicked **"Merge pull request"** and **"Confirm merge"**
2. Wait 3 minutes after merging
3. Try refreshing your browser with a hard refresh:
   - **Windows:** Ctrl + F5
   - **Mac:** Cmd + Shift + R
4. If still not working, try opening the site in a private/incognito browser window
5. If none of these work, contact [TECHNICAL_CONTACT]

### "I made a mistake and it's live on the website"

**Don't panic!** Changes can be instantly rolled back.

**What to do:**

1. Contact [TECHNICAL_CONTACT] immediately
2. Explain what the issue is
3. They can revert to the previous version in seconds using Vercel's instant rollback feature
4. No data is lost — every version of the site is saved in history

**Note:** This is why it's important to preview changes before merging, but mistakes happen and they can be fixed quickly.

### "I see weird symbols like <<<< HEAD or ====="

**What this means:** This is called a "merge conflict." It happens when two people edit the same part of the same file at the same time.

**How to fix:**

Merge conflicts are complex to resolve. Contact [TECHNICAL_CONTACT] for help. They can fix this quickly.

**How to avoid:**

- Coordinate with other board members before editing (use email or a shared calendar)
- Merge pull requests quickly — don't leave them open for days
- Make one change at a time (don't update all teams at once; do one team per pull request)

### "The GitHub editor looks different from the screenshots in this guide"

**What this means:** GitHub occasionally updates their user interface.

**How to fix:**

The steps are the same even if the visual design is slightly different. Look for:
- The edit button is usually a **pencil icon** (might be in a different location)
- The commit section is always at the **bottom of the page**
- Button colors might change, but **green usually means proceed** and **red means cancel**

If you're unsure, contact [TECHNICAL_CONTACT] or consult GitHub's official documentation.

### "I uploaded an image but it shows as broken on the website"

**Possible causes:**

1. **Incorrect path in JSON** — Make sure you used `/images/folder/filename.jpg` (not `/public/images/...`)
2. **Filename mismatch** — The filename in JSON must exactly match the uploaded file (case-sensitive)
3. **Image upload failed** — The file may not have uploaded successfully

**How to fix:**

1. Check the image path in your JSON file:
   - ✅ Correct: `"/images/coaches/mike-adams.jpg"`
   - ❌ Wrong: `"/public/images/coaches/mike-adams.jpg"`
2. Verify the filename matches exactly (use Ctrl+F / Cmd+F to search GitHub for the file)
3. Check that the image file exists in the repository (navigate to the folder and look for it)
4. If still broken, try re-uploading the image with a different filename, then update the JSON

---

## 15. JSON Quick Reference

JSON (JavaScript Object Notation) is a format for storing structured data. It's designed to be easy to read and write, but it has strict syntax rules.

### Basic JSON Syntax Rules

1. **Curly braces `{}` contain objects** (a collection of fields)
2. **Square brackets `[]` contain arrays** (a list of items)
3. **All text values must be in double quotes** `"like this"`
4. **Numbers do NOT have quotes** (e.g., `25`, not `"25"`)
5. **Commas separate items** in lists and fields in objects
6. **The last item does NOT have a comma**

### Example JSON Structure

```json
{
  "name": "Bombers Baseball",
  "foundedYear": 1995,
  "teams": [
    {
      "name": "7U Adams",
      "players": [
        { "name": "Tyler Bennett", "jerseyNumber": 5 },
        { "name": "Mason Carter", "jerseyNumber": 8 }
      ]
    }
  ]
}
```

**Breakdown:**
- `{}` — Object containing the entire data
- `"name": "Bombers Baseball"` — A field with text value (in quotes)
- `"foundedYear": 1995` — A field with number value (no quotes)
- `"teams": [...]` — A field containing an array (list)
- Each item in a list is separated by a comma
- The last item has NO comma

### Common Mistakes (Wrong vs. Right)

**Missing comma between items:**
```json
❌ Wrong:
{
  "name": "Tyler"
  "jerseyNumber": 5
}

✅ Right:
{
  "name": "Tyler",
  "jerseyNumber": 5
}
```

**Comma after the last item:**
```json
❌ Wrong:
[
  { "name": "Tyler", "jerseyNumber": 5 },
  { "name": "Mason", "jerseyNumber": 8 },
]

✅ Right:
[
  { "name": "Tyler", "jerseyNumber": 5 },
  { "name": "Mason", "jerseyNumber": 8 }
]
```

**Missing quotes around text:**
```json
❌ Wrong:
{ "name": Tyler }

✅ Right:
{ "name": "Tyler" }
```

**Quotes around numbers (when not needed):**
```json
❌ Wrong:
{ "jerseyNumber": "5" }

✅ Right:
{ "jerseyNumber": 5 }
```

### Pro Tip: Copy and Modify

The easiest way to avoid syntax errors is to **copy an existing entry and modify it** rather than typing from scratch.

**Example: Adding a player**

1. Find an existing player entry
2. Copy the entire entry (from `{` to `}`)
3. Paste it where you want the new player
4. Change the name and jersey number
5. Make sure commas are correct

---

## 16. Getting Help

### When to Ask for Help

Don't hesitate to reach out if:

- You see an error message you don't understand
- Validation keeps failing and you're not sure why
- You need to make a change that's not covered in this guide
- The website is showing incorrect or broken content
- You accidentally deleted something important

### Primary Contact

**[TECHNICAL_CONTACT]**
Email: [TECHNICAL_CONTACT_EMAIL]
Phone: [TECHNICAL_CONTACT_PHONE]

### For Urgent Issues

If the website is broken or showing wrong information that needs immediate fixing:

1. Call [TECHNICAL_CONTACT] at [TECHNICAL_CONTACT_PHONE]
2. Explain the issue and when it happened
3. They can roll back changes instantly if needed

### For Non-Urgent Questions

You can create a GitHub Issue for questions or requests:

1. Go to the repository on GitHub
2. Click the **Issues** tab (near the top)
3. Click the green **"New issue"** button
4. Write a descriptive title (e.g., "How do I add a tournament date?")
5. Describe your question or problem in the comment box
6. Click **"Submit new issue"**
7. You'll receive email notifications when someone responds

[SCREENSHOT: GitHub Issues tab with "New issue" button highlighted]

### Tips for Getting Help Quickly

When asking for help, provide:

- **What you were trying to do** (e.g., "I was trying to add a new player to the 9U team")
- **What happened** (e.g., "I got a red X with an error about missing comma")
- **The file you were editing** (e.g., `teams.json`)
- **Screenshots if possible** (use your computer's screenshot tool and attach the image)

The more information you provide, the faster the issue can be resolved.

---

## Appendix: Quick Task Index

**Jump to the most common tasks:**

- [Add a player to a team](#common-task-add-a-player-to-a-team) — Section 4
- [Remove a player](#common-task-remove-a-player-from-a-team) — Section 4
- [Change jersey number](#common-task-change-a-jersey-number) — Section 4
- [Update coach bio or photo](#common-task-update-a-coachs-bio) — Section 4
- [Add a new team](#common-task-add-a-new-team) — Section 4
- [Update registration fee](#common-task-update-a-registration-fee) — Section 5
- [Change event date](#common-task-change-an-event-date) — Section 5
- [Add new event date](#common-task-add-a-new-event-date) — Section 5
- [Update FAQ answer](#common-task-update-an-faq-answer) — Section 5
- [Add board member](#common-task-add-a-board-member) — Section 6
- [Remove board member](#common-task-remove-a-board-member) — Section 6
- [Add sponsor](#common-task-add-a-new-sponsor) — Section 7
- [Remove sponsor](#common-task-remove-a-sponsor) — Section 7
- [Add spirit wear product](#common-task-add-a-spirit-wear-product) — Section 8
- [Upload images](#step-by-step-upload-an-image-via-github) — Section 12

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Maintained By:** [TECHNICAL_CONTACT]
