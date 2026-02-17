# Phase 9: Content Management System - Research

**Researched:** 2026-02-16
**Domain:** Non-technical content editing, JSON/TypeScript data validation, GitHub-based workflows
**Confidence:** HIGH

## Summary

Enabling non-technical board members to update structured data requires balancing simplicity, safety, and the existing TypeScript-based architecture. The current codebase uses TypeScript files in `src/lib/data/` with exported interfaces and data — ideal for type safety but challenging for non-developers.

The optimal approach is **migration to JSON + Zod validation** with **GitHub web editor** and **automated CI checks** that block broken deployments. This provides:

1. Simple editing (plain JSON in browser, no TypeScript syntax)
2. Critical safety (schema validation blocks invalid changes)
3. Preview capability (Vercel automatic preview deployments)
4. Easy rollback (Vercel one-click instant rollback)
5. Familiar version control (GitHub UI abstracts Git complexity)

**Primary recommendation:** Convert TypeScript data files to JSON, create Zod schemas for runtime validation, implement GitHub Actions for pre-merge validation, and provide comprehensive step-by-step documentation with screenshots for the GitHub web editor workflow.

## User Constraints

<user_constraints>
### Locked Decisions

**Critical Safety Priority:** The site must never break from a bad edit — validation must catch errors before deploy.

**Non-Technical Audience:** Board members are comfortable with email and basic computer use, but have no coding or GitHub experience.

**Equal Data Priority:** Rosters, events, fees, sponsors, and staff all receive equal documentation coverage (all updated with similar frequency).

**Existing Pattern:** The codebase currently uses TypeScript data files in `src/lib/data/` (home.ts, teams.ts, organization.ts, fees.ts, sponsors.ts, etc.) with exported interfaces and constants.

### Claude's Discretion

**File Organization:** Choose between one file per type vs per page based on existing codebase patterns.

**Data Format:** TypeScript data files vs plain JSON that .ts files import — optimize for non-technical editors.

**Image Management:** Board members adding images to a folder and referencing filenames, or separate process.

**Edit Method:** GitHub web editor, intermediary process, or simplest approach for non-technical users.

**Deployment Trigger:** Auto-deploy on commit vs manual trigger — coordinate with Phase 10 Vercel setup.

**Preview Capability:** Leverage what Vercel offers out of the box.

**Validation Strategy:** Block bad deploys or warn-only (lean toward blocking given critical safety priority).

**Rollback Mechanism:** Simplest approach for the team — likely Vercel's one-click rollback.

**Example Data:** Include templates for common tasks (adding a new team, new sponsor, etc.).

**Documentation Format:** Markdown in repo vs standalone document — most accessible for non-technical board members.

**Detail Level:** Step-by-step vs cheat sheet — tailored for non-technical audience.

**Troubleshooting:** Include dedicated troubleshooting section given critical safety priority and non-technical audience.

**Technical Contact:** Generic placeholder that can be filled in later.

### Deferred Ideas

None — discussion stayed within phase scope.
</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Zod | 4.3.6 | Runtime schema validation | Already in dependencies, TypeScript-first, excellent JSON Schema support, 14x faster v4, built-in JSON Schema conversion |
| JSON Schema | Draft 2020-12 | Schema definition format | Industry standard, tooling ecosystem, human-readable, GitHub Actions support |
| GitHub Actions | N/A | CI/CD validation | Built into GitHub, free for public repos, extensive marketplace, no additional setup |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| ajv | Latest | JSON Schema validator in CI | Alternative to Zod in GitHub Actions if needed for pure JSON Schema validation |
| @hookform/resolvers | 5.2.2 | Form validation (already installed) | Not directly relevant to CMS but shows Zod integration pattern |
| zod-to-json-schema | N/A | Convert Zod to JSON Schema | Not needed — Zod 4 has built-in JSON Schema conversion |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| JSON files | Keep TypeScript data files | TypeScript provides compile-time safety but requires technical knowledge, harder for non-developers to edit syntax |
| GitHub web editor | Decap CMS, Sveltia CMS | Dedicated CMS adds complexity, requires hosting, overkill for structured data editing, more dependencies |
| Zod validation | TypeScript-only validation | No runtime validation means errors only caught at build time, not pre-merge |
| GitHub Actions | Manual review only | Human review is fallible, doesn't scale, lacks automation |

**Installation:**
```bash
# Zod already installed (4.3.6)
# For GitHub Actions, use marketplace actions (no installation needed)
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── data/           # JSON files (editable by board members)
│   │   ├── teams.json
│   │   ├── fees.json
│   │   ├── organization.json
│   │   ├── sponsors.json
│   │   ├── home.json
│   │   └── ...
│   └── schemas/        # Zod schemas for validation
│       ├── teams.ts
│       ├── fees.ts
│       ├── organization.ts
│       ├── sponsors.ts
│       └── index.ts    # Export all schemas
├── types/              # TypeScript types (generated from Zod schemas)
│   └── data.ts
└── ...

.github/
└── workflows/
    └── validate-data.yml  # CI validation workflow

public/
└── images/             # Image uploads (existing structure)
    ├── teams/
    ├── coaches/
    ├── sponsors/
    ├── board/
    └── ...

docs/
└── CONTENT-UPDATE-GUIDE.md  # Step-by-step editing instructions
```

### Pattern 1: TypeScript to JSON Migration

**What:** Convert existing TypeScript data files to JSON, create Zod schemas, import JSON in components.

**When to use:** When enabling non-technical editing of structured data.

**Example:**

```typescript
// BEFORE: src/lib/data/teams.ts (current)
export interface Player {
  name: string;
  jerseyNumber: number;
}

export interface Team {
  id: string;
  name: string;
  ageGroup: string;
  players: Player[];
}

export const teams: Team[] = [
  { id: '7u-adams', name: '7U Adams', ageGroup: '7U', players: [...] }
];

// AFTER: src/lib/schemas/teams.ts (new)
import { z } from 'zod';

export const PlayerSchema = z.object({
  name: z.string().min(1, "Player name is required"),
  jerseyNumber: z.number().int().positive().max(99, "Jersey number must be 1-99")
});

export const TeamSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Team name is required"),
  ageGroup: z.string().regex(/^[0-9]+U$/, "Age group must be format like '7U', '12U'"),
  headCoachName: z.string().min(1, "Head coach name is required"),
  season: z.string(),
  players: z.array(PlayerSchema),
  coaches: z.array(CoachSchema),
  teamPhotoUrl: z.string().url().optional()
});

export const TeamsDataSchema = z.object({
  currentSeason: z.string(),
  teams: z.array(TeamSchema)
});

export type Player = z.infer<typeof PlayerSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamsData = z.infer<typeof TeamsDataSchema>;

// AFTER: src/lib/data/teams.json (new - editable by board)
{
  "currentSeason": "Spring 2026",
  "teams": [
    {
      "id": "7u-adams",
      "name": "7U Adams",
      "ageGroup": "7U",
      "headCoachName": "Mike Adams",
      "season": "Spring 2026",
      "players": [
        { "name": "Tyler Bennett", "jerseyNumber": 5 }
      ],
      "coaches": [...]
    }
  ]
}

// AFTER: src/lib/data/index.ts (new - imports and validates)
import teamsJson from './teams.json';
import { TeamsDataSchema } from '../schemas/teams';

export const teamsData = TeamsDataSchema.parse(teamsJson);
export const teams = teamsData.teams;
export const currentSeason = teamsData.currentSeason;
```

### Pattern 2: GitHub Actions Validation Workflow

**What:** Automated JSON Schema validation on pull requests that blocks merging if data is invalid.

**When to use:** Always — critical safety requirement for this phase.

**Example:**

```yaml
# .github/workflows/validate-data.yml
name: Validate Data Files

on:
  pull_request:
    paths:
      - 'src/lib/data/**/*.json'
  push:
    branches:
      - main
    paths:
      - 'src/lib/data/**/*.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    name: Validate JSON Data Files

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run Zod validation
        run: pnpm validate:data

      - name: Type check
        run: pnpm tsc --noEmit

# package.json
{
  "scripts": {
    "validate:data": "tsx scripts/validate-data.ts"
  }
}

// scripts/validate-data.ts
import { TeamsDataSchema } from '../src/lib/schemas/teams';
import { FeesDataSchema } from '../src/lib/schemas/fees';
import { OrganizationDataSchema } from '../src/lib/schemas/organization';
import { SponsorsDataSchema } from '../src/lib/schemas/sponsors';

import teamsJson from '../src/lib/data/teams.json';
import feesJson from '../src/lib/data/fees.json';
import organizationJson from '../src/lib/data/organization.json';
import sponsorsJson from '../src/lib/data/sponsors.json';

function validateData() {
  try {
    console.log('Validating teams.json...');
    TeamsDataSchema.parse(teamsJson);
    console.log('✓ teams.json is valid');

    console.log('Validating fees.json...');
    FeesDataSchema.parse(feesJson);
    console.log('✓ fees.json is valid');

    console.log('Validating organization.json...');
    OrganizationDataSchema.parse(organizationJson);
    console.log('✓ organization.json is valid');

    console.log('Validating sponsors.json...');
    SponsorsDataSchema.parse(sponsorsJson);
    console.log('✓ sponsors.json is valid');

    console.log('\n✓ All data files are valid!');
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Data validation failed:');
    console.error(error);
    process.exit(1);
  }
}

validateData();
```

### Pattern 3: GitHub Branch Protection with Required Checks

**What:** Configure GitHub repository to require validation checks to pass before merging.

**When to use:** Always — ensures no invalid data reaches production.

**Example:**

```
Repository Settings → Branches → Branch protection rules → Add rule

Rule settings:
- Branch name pattern: main
- ✓ Require status checks to pass before merging
  - ✓ Require branches to be up to date before merging
  - Required checks:
    - validate / Validate JSON Data Files
- ✓ Require conversation resolution before merging
- ✓ Do not allow bypassing the above settings
```

### Pattern 4: Image Upload Workflow for Non-Technical Users

**What:** Board members upload images via GitHub web UI, reference filenames in JSON.

**When to use:** When board members need to add team photos, sponsor logos, coach headshots.

**Example:**

```markdown
# In CONTENT-UPDATE-GUIDE.md

## Adding a Team Photo

1. Navigate to the repository on GitHub: https://github.com/org/bombers
2. Click on the `public` folder
3. Click on the `images` folder
4. Click on the `teams` folder
5. Click "Add file" → "Upload files"
6. Drag your image into the upload area
   - Image should be named descriptively: `12u-martinez-team-photo.jpg`
   - Use lowercase, hyphens for spaces
   - Supported formats: .jpg, .jpeg, .png
   - Recommended size: 1200x800 pixels or similar aspect ratio
7. Scroll down, add a commit message: "Add 12U Martinez team photo"
8. Click "Commit changes"
9. In your team's JSON data, reference the image:
   ```json
   {
     "teamPhotoUrl": "/images/teams/12u-martinez-team-photo.jpg"
   }
   ```
```

### Pattern 5: Documentation Structure for Non-Technical Users

**What:** Comprehensive, screenshot-heavy guide with numbered steps and troubleshooting.

**When to use:** Always — critical for non-technical audience success.

**Example structure:**

```markdown
# Content Update Guide

## Table of Contents
1. Getting Started
2. How to Edit Team Rosters
3. How to Update Event Dates
4. How to Change Fees
5. How to Add/Remove Sponsors
6. How to Update Board Member Information
7. How to Upload Images
8. How to Preview Your Changes
9. How to Publish Your Changes
10. Troubleshooting
11. Getting Help

## Getting Started

### What You'll Need
- A GitHub account (free)
- Access to the bombers repository (request from [TECHNICAL_CONTACT])
- A web browser (Chrome, Firefox, Safari, or Edge)

### Important Safety Features
- **Preview Deployments**: Every change creates a preview link so you can see changes before publishing
- **Validation**: The system automatically checks your changes for errors
- **Rollback**: If something goes wrong, changes can be instantly reverted
- **Version History**: Every change is saved with who made it and when

## How to Edit Team Rosters

### Step 1: Navigate to the Teams Data File
1. Go to https://github.com/org/bombers (replace with your actual URL)
2. Click "Sign in" (top right) if not already logged in
3. Click on the `src` folder
4. Click on the `lib` folder
5. Click on the `data` folder
6. Click on `teams.json`

[SCREENSHOT: Showing navigation path]

### Step 2: Edit the File
1. Click the pencil icon (✏️) on the right side ("Edit this file")
2. The file will open in an editor

[SCREENSHOT: Edit button location]

### Step 3: Make Your Changes

**To add a player:**
```json
{
  "name": "Tyler Bennett",
  "jerseyNumber": 5
}
```

Copy the example above, paste it into the `players` array, and update the name and number.

[SCREENSHOT: Where to paste new player]

**To remove a player:**
Delete the entire player object including the curly braces and comma.

**To change a jersey number:**
Find the player and change the number after `"jerseyNumber": `.

[SCREENSHOT: Editing jersey number]

### Step 4: Save Your Changes
1. Scroll to the bottom of the page
2. In the "Commit changes" box:
   - Add a brief description: "Add Tyler Bennett to 7U Adams roster"
   - Select "Create a new branch for this commit and start a pull request"
   - Click "Propose changes"

[SCREENSHOT: Commit interface]

### Step 5: Create Pull Request
1. Review the changes shown
2. Click "Create pull request"
3. Wait 1-2 minutes for automatic validation

[SCREENSHOT: Pull request creation]

### Step 6: Check Validation Status
- ✓ Green checkmark = Changes are valid, safe to merge
- ✗ Red X = Something is wrong, see error messages

[SCREENSHOT: Validation checks]

### Step 7: Preview Your Changes (Optional)
1. Look for the comment from "Vercel bot"
2. Click the preview link
3. Navigate to the Teams page to see your changes

[SCREENSHOT: Vercel preview comment]

### Step 8: Publish Your Changes
1. If validation passed (green checkmark), click "Merge pull request"
2. Click "Confirm merge"
3. Your changes are now live! (Takes 2-3 minutes to deploy)

[SCREENSHOT: Merge button]

## Troubleshooting

### "I see a red X on my pull request"
This means the validation found an error in your changes. Common issues:

- **Missing comma**: JSON requires commas between items
- **Duplicate jersey number**: Two players can't have the same number on one team
- **Invalid characters**: Names can't contain special symbols like `<` or `>`
- **Missing required field**: Every player needs both a name and jersey number

Click "Files changed" to see exactly what was changed, then click the pencil icon to fix the error.

### "I can't find the Edit button"
You may not have permission to edit the repository. Contact [TECHNICAL_CONTACT] to request access.

### "My changes aren't showing on the website"
- Check that you clicked "Merge pull request" (not just created the PR)
- Wait 2-3 minutes for the deployment to complete
- Try refreshing your browser with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### "I made a mistake and published it"
Don't worry! Changes can be instantly rolled back:
1. Contact [TECHNICAL_CONTACT]
2. They can revert to the previous version in seconds
3. No data is lost — every version is saved

## Getting Help

If you encounter an issue not covered here:
- Email: [TECHNICAL_CONTACT_EMAIL]
- Phone: [TECHNICAL_CONTACT_PHONE]
- Or create an "Issue" in GitHub describing the problem
```

### Anti-Patterns to Avoid

- **No validation in CI/CD:** Never rely solely on build-time TypeScript checking — runtime validation prevents bad data from reaching production
- **TypeScript editing for non-technical users:** Syntax is too complex, one missing bracket breaks the entire file
- **Weak validation messages:** "Invalid input" doesn't help; use descriptive Zod error messages like "Jersey number must be between 1 and 99"
- **Manual JSON Schema creation:** Zod 4 has built-in JSON Schema export — use it instead of hand-writing schemas
- **Allowing direct commits to main:** Always require pull requests with validation checks, even for "small" changes
- **No example/template data:** Non-technical users need copy-paste examples for common tasks
- **Technical jargon in documentation:** Avoid terms like "commit," "branch," "merge" without explanation; use plain language

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema validation | Custom validation functions | Zod 4 with built-in JSON Schema | Zod provides type inference, detailed error messages, composition, and automatic TypeScript types. Custom validation lacks these features and is harder to maintain. |
| JSON editing UI | Custom admin panel | GitHub web editor | Building a CMS requires authentication, hosting, database, UI framework, and ongoing maintenance. GitHub provides all this for free with version control built-in. |
| Preview deployments | Custom preview server | Vercel automatic preview deployments | Vercel creates unique preview URLs for every PR automatically. Building this requires infrastructure, DNS management, and cleanup logic. |
| Rollback mechanism | Custom backup/restore system | Vercel Instant Rollback + Git history | Vercel provides one-click rollback to any previous deployment. Git preserves full history. Custom solutions need snapshot storage, diff calculation, and restore logic. |
| CI/CD validation | Manual review process | GitHub Actions with Zod validation | Automated validation is consistent, fast, and doesn't require human availability. Manual review is slow and error-prone. |
| Image optimization | Custom image processing | Next.js Image component (existing) | Already handles optimization, responsive sizes, and lazy loading. Custom solutions need sharp/imagemagick, caching, and format conversion logic. |

**Key insight:** Content management for static sites is a solved problem. The ecosystem (GitHub + Vercel + Zod) provides all necessary pieces. Building custom solutions duplicates functionality that already exists, works well, and is free/low-cost. Focus effort on documentation and schemas, not infrastructure.

## Common Pitfalls

### Pitfall 1: JSON Syntax Errors from Manual Editing

**What goes wrong:** Non-technical users miss commas, add trailing commas, forget quotes, or create invalid JSON syntax.

**Why it happens:** JSON is strict about syntax; editors like VS Code catch errors but GitHub web editor shows raw text without syntax highlighting.

**How to avoid:**
- Provide **copy-paste templates** for every common operation (add player, add team, etc.)
- Use **Zod validation in CI** that shows clear error messages: "Missing comma after line 45" instead of generic "Invalid JSON"
- Include **JSON syntax primer** in documentation with common errors and fixes
- Consider **pre-commit hook** for local development (technical users only)

**Warning signs:**
- Pull request has red X with "Unexpected token" or "Parse error" messages
- Changes don't appear in preview deployment
- Validation step shows JSON parsing errors

### Pitfall 2: Breaking References Between Files

**What goes wrong:** User updates a sponsor ID in `sponsors.json` but forgets to update references in `home.json`, breaking sponsor display on homepage.

**Why it happens:** Data files have relationships that aren't obvious to non-technical users.

**How to avoid:**
- **Validate cross-file references in Zod schemas:** Check that sponsor IDs referenced in home.json exist in sponsors.json
- **Document all relationships** in the update guide with warnings: "⚠️ If you change a sponsor ID, you must also update it in home.json"
- **Use consistent ID format:** kebab-case (lowercase-with-hyphens) reduces typos
- **Provide search instructions:** "Use Ctrl+F to find all references to this ID before changing it"

**Warning signs:**
- Missing sponsors on homepage
- 404 errors for images
- Empty team rosters or coach information

### Pitfall 3: Invalid Image Paths

**What goes wrong:** User uploads image as `Coach Mike.jpg` (with space and capital letters) but references it as `/images/coaches/coach-mike.jpg` in JSON.

**Why it happens:** Filesystem paths are case-sensitive and space-sensitive; users familiar with Windows desktop may not realize this.

**How to avoid:**
- **Enforce naming convention:** All image filenames must be lowercase, use hyphens instead of spaces, no special characters
- **Validate image paths in Zod:** Check that referenced paths exist in the `public/images/` directory (could be a separate script)
- **Provide clear examples** in documentation: "❌ Coach Mike.jpg  ✓ coach-mike.jpg"
- **Add image validation step** to GitHub Actions that checks all referenced images exist

**Warning signs:**
- Broken image icons on website
- Alt text showing instead of images
- 404 errors in browser console

### Pitfall 4: Outdated Documentation

**What goes wrong:** Documentation shows GitHub UI from 2024, but GitHub updated their interface. Board members can't find buttons mentioned in the guide.

**Why it happens:** GitHub regularly updates their UI; screenshots become outdated.

**How to avoid:**
- **Use text descriptions primarily,** screenshots as secondary: "Click the pencil icon (Edit) in the top right corner of the file" rather than "Click here [screenshot]"
- **Add documentation review task** to quarterly board checklist: "Verify content update guide matches current GitHub UI"
- **Keep screenshots minimal:** Only for complex multi-step processes, not every single action
- **Link to official GitHub docs** for general GitHub operations: "See GitHub's guide to creating pull requests"

**Warning signs:**
- Board members reporting "I don't see that button"
- Multiple support requests for the same issue
- Documentation says "new editor" but it's been out for a year

### Pitfall 5: No Rollback Plan

**What goes wrong:** Bad data gets merged and deployed to production. Team doesn't know how to revert, leading to panic and downtime.

**Why it happens:** Rollback process not documented or practiced; assumed to be "technical-only" task.

**How to avoid:**
- **Document rollback in the guide** with clear "If something goes wrong" section
- **Identify rollback authority:** Who has permission to execute rollback? Document their contact info.
- **Use Vercel Instant Rollback:** One-click revert to previous deployment, no Git knowledge needed
- **Practice rollback** during initial setup: Deploy a breaking change to staging, then roll back

**Warning signs:**
- Site showing broken images or missing data
- Errors in browser console
- User reports of missing information

### Pitfall 6: Insufficient Validation Granularity

**What goes wrong:** Validation passes but data is logically wrong: jersey number 999, team in age group "ABC", event date in 1980.

**Why it happens:** Schema only checks data type (number, string) but not realistic value ranges.

**How to avoid:**
- **Add business logic to Zod schemas:**
  - Jersey numbers: `.int().min(0).max(99)`
  - Age groups: `.regex(/^(7|8|9|10|11|12|13|14|15)U$/)`
  - Dates: `.string().refine(date => new Date(date) > new Date(), "Date must be in the future")`
  - URLs: `.url()` for image paths and sponsor websites
- **Test schemas with edge cases:** Try validating jersey number 999, age group "XYZ", date "2000-01-01"
- **Provide clear error messages:** Not just "Invalid," but "Jersey number must be between 0 and 99"

**Warning signs:**
- Data looks "weird" but passed validation
- Dates in the past for upcoming events
- Unrealistic numbers or values

### Pitfall 7: Merge Conflicts from Simultaneous Edits

**What goes wrong:** Two board members edit the same file simultaneously. GitHub shows "merge conflict" error. Non-technical users don't know how to resolve it.

**Why it happens:** Multiple pull requests modifying the same JSON file before merging.

**How to avoid:**
- **Coordinate edits** via simple spreadsheet or email: "I'm updating rosters today, please wait until tomorrow for fee changes"
- **Merge quickly:** Don't leave pull requests open for days; review and merge within 24 hours
- **Keep changes small:** One PR = one logical change (one team roster update, not all teams at once)
- **Document conflict resolution** with screenshots showing GitHub's conflict editor

**Warning signs:**
- Pull request shows "This branch has conflicts that must be resolved"
- Can't click "Merge pull request" button
- File shows `<<<<<<< HEAD` markers

## Code Examples

Verified patterns for data validation and import.

### Example 1: Complete Zod Schema for Teams

```typescript
// src/lib/schemas/teams.ts
import { z } from 'zod';

// Player schema with validation
export const PlayerSchema = z.object({
  name: z.string()
    .min(1, "Player name is required")
    .max(100, "Player name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Player name can only contain letters, spaces, hyphens, and apostrophes"),
  jerseyNumber: z.number()
    .int("Jersey number must be a whole number")
    .min(0, "Jersey number must be at least 0")
    .max(99, "Jersey number must be 99 or less")
});

// Coach schema
export const CoachSchema = z.object({
  name: z.string()
    .min(1, "Coach name is required")
    .max(100, "Coach name must be less than 100 characters"),
  role: z.enum(['Head Coach', 'Assistant Coach'], {
    errorMap: () => ({ message: "Role must be 'Head Coach' or 'Assistant Coach'" })
  }),
  photoUrl: z.string()
    .regex(/^\/images\/coaches\/[a-z0-9-]+\.(jpg|jpeg|png)$/,
      "Photo URL must be in format '/images/coaches/filename.jpg' (lowercase, hyphens only)"),
  bio: z.string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
});

// Team schema
export const TeamSchema = z.object({
  id: z.string()
    .regex(/^[a-z0-9-]+$/, "Team ID must be lowercase letters, numbers, and hyphens only")
    .min(1, "Team ID is required"),
  name: z.string()
    .min(1, "Team name is required")
    .max(50, "Team name must be less than 50 characters"),
  ageGroup: z.string()
    .regex(/^(7|8|9|10|11|12|13|14|15)U$/,
      "Age group must be in format '7U', '9U', '12U', etc. (7U through 15U)"),
  headCoachName: z.string()
    .min(1, "Head coach name is required"),
  season: z.string()
    .min(1, "Season is required"),
  players: z.array(PlayerSchema)
    .default([]),
  coaches: z.array(CoachSchema)
    .min(1, "At least one coach is required"),
  teamPhotoUrl: z.string()
    .regex(/^\/images\/teams\/[a-z0-9-]+\.(jpg|jpeg|png)$/,
      "Team photo URL must be in format '/images/teams/filename.jpg'")
    .optional()
}).refine(
  (team) => {
    // Check for duplicate jersey numbers
    const jerseyNumbers = team.players.map(p => p.jerseyNumber);
    const uniqueNumbers = new Set(jerseyNumbers);
    return jerseyNumbers.length === uniqueNumbers.size;
  },
  {
    message: "Team has duplicate jersey numbers. Each player must have a unique number.",
    path: ["players"]
  }
);

// Root schema for entire file
export const TeamsDataSchema = z.object({
  currentSeason: z.string()
    .min(1, "Current season is required")
    .regex(/^(Spring|Summer|Fall|Winter) \d{4}$/,
      "Season must be in format 'Spring 2026' or 'Fall 2026'"),
  teams: z.array(TeamSchema)
    .min(1, "At least one team is required")
}).refine(
  (data) => {
    // Check for duplicate team IDs
    const ids = data.teams.map(t => t.id);
    const uniqueIds = new Set(ids);
    return ids.length === uniqueIds.size;
  },
  {
    message: "Duplicate team IDs found. Each team must have a unique ID.",
    path: ["teams"]
  }
);

// Export inferred types
export type Player = z.infer<typeof PlayerSchema>;
export type Coach = z.infer<typeof CoachSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamsData = z.infer<typeof TeamsDataSchema>;
```

### Example 2: Data Import with Validation

```typescript
// src/lib/data/index.ts
import teamsJson from './teams.json';
import feesJson from './fees.json';
import organizationJson from './organization.json';
import sponsorsJson from './sponsors.json';

import { TeamsDataSchema } from '../schemas/teams';
import { FeesDataSchema } from '../schemas/fees';
import { OrganizationDataSchema } from '../schemas/organization';
import { SponsorsDataSchema } from '../schemas/sponsors';

// Validate and export teams data
export const teamsData = TeamsDataSchema.parse(teamsJson);
export const teams = teamsData.teams;
export const currentSeason = teamsData.currentSeason;

// Validate and export fees data
export const feesData = FeesDataSchema.parse(feesJson);
export const ageFees = feesData.ageFees;
export const keyDates = feesData.keyDates;
export const faqItems = feesData.faqItems;

// Validate and export organization data
export const organizationData = OrganizationDataSchema.parse(organizationJson);
export const boardMembers = organizationData.boardMembers;
export const staff = organizationData.staff;

// Validate and export sponsors data
export const sponsorsData = SponsorsDataSchema.parse(sponsorsJson);
export const sponsors = sponsorsData.sponsors;
```

### Example 3: Validation Script for CI

```typescript
// scripts/validate-data.ts
import { TeamsDataSchema } from '../src/lib/schemas/teams';
import { FeesDataSchema } from '../src/lib/schemas/fees';
import { OrganizationDataSchema } from '../src/lib/schemas/organization';
import { SponsorsDataSchema } from '../src/lib/schemas/sponsors';

import teamsJson from '../src/lib/data/teams.json';
import feesJson from '../src/lib/data/fees.json';
import organizationJson from '../src/lib/data/organization.json';
import sponsorsJson from '../src/lib/data/sponsors.json';

interface ValidationResult {
  file: string;
  valid: boolean;
  errors?: string[];
}

function validateFile(filename: string, schema: any, data: any): ValidationResult {
  try {
    schema.parse(data);
    return { file: filename, valid: true };
  } catch (error: any) {
    const errors = error.errors?.map((e: any) => {
      const path = e.path.join('.');
      return `  ❌ ${path}: ${e.message}`;
    }) || [error.message];

    return { file: filename, valid: false, errors };
  }
}

function main() {
  console.log('🔍 Validating data files...\n');

  const results: ValidationResult[] = [
    validateFile('teams.json', TeamsDataSchema, teamsJson),
    validateFile('fees.json', FeesDataSchema, feesJson),
    validateFile('organization.json', OrganizationDataSchema, organizationJson),
    validateFile('sponsors.json', SponsorsDataSchema, sponsorsJson),
  ];

  let hasErrors = false;

  for (const result of results) {
    if (result.valid) {
      console.log(`✅ ${result.file} is valid`);
    } else {
      console.log(`❌ ${result.file} has errors:`);
      result.errors?.forEach(error => console.log(error));
      console.log('');
      hasErrors = true;
    }
  }

  console.log('');

  if (hasErrors) {
    console.log('❌ Validation failed. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('✅ All data files are valid!');
    process.exit(0);
  }
}

main();
```

### Example 4: GitHub Actions Workflow

```yaml
# .github/workflows/validate-data.yml
name: Validate Data Files

on:
  pull_request:
    paths:
      - 'src/lib/data/**/*.json'
      - 'src/lib/schemas/**/*.ts'
  push:
    branches:
      - main
    paths:
      - 'src/lib/data/**/*.json'
      - 'src/lib/schemas/**/*.ts'

jobs:
  validate:
    runs-on: ubuntu-latest
    name: Validate JSON Data

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Validate data files with Zod
        run: pnpm validate:data

      - name: TypeScript type check
        run: pnpm tsc --noEmit

      - name: Comment on PR (on failure)
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ Data validation failed. Please check the errors above and fix them before merging.'
            })
```

### Example 5: Template Data for Documentation

```json
// Example: Adding a new player to a team
// Copy this template and replace the values

{
  "name": "First Last",
  "jerseyNumber": 12
}

// Example: Adding a new team
{
  "id": "age-coachname",
  "name": "Age Group Coach Last Name",
  "ageGroup": "12U",
  "headCoachName": "First Last",
  "season": "Spring 2026",
  "players": [],
  "coaches": [
    {
      "name": "First Last",
      "role": "Head Coach",
      "photoUrl": "/images/coaches/firstname-lastname.jpg",
      "bio": "Short bio about the coach (optional)"
    }
  ],
  "teamPhotoUrl": "/images/teams/12u-lastname.jpg"
}

// Example: Adding a new sponsor
{
  "id": "company-name",
  "name": "Company Name Inc.",
  "logoUrl": "/images/sponsors/company-logo.jpg",
  "description": "Brief description of the sponsor",
  "websiteUrl": "https://example.com"
}

// Example: Updating an event date
{
  "id": "event-id",
  "label": "Event Name",
  "date": "Month DD, YYYY",
  "category": "tournament",
  "description": "Event description"
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| TypeScript data files directly | JSON + Zod validation + TypeScript types | Zod 4.0 (2025) | JSON is easier for non-technical editors; Zod 4 added built-in JSON Schema export, making dual validation (runtime + schema) seamless |
| Netlify CMS / Decap CMS | GitHub web editor + Actions | Ongoing (2025-2026) | Dedicated CMS adds complexity; Git-based editing with modern GitHub UI is simpler, especially for structured data vs long-form content |
| Manual JSON Schema writing | Zod schemas with auto-export | Zod 4.0 (2025) | Single source of truth: Zod schema generates both TypeScript types and JSON Schema, eliminating sync issues |
| Pre-commit hooks only | CI/CD validation (GitHub Actions) | Standard practice | Pre-commit requires local setup; CI/CD validates all changes regardless of how they're made, critical for non-technical users |
| Build-time validation only | Runtime + build-time + CI validation | Modern practice | Multiple validation layers catch errors earlier and provide better error messages to non-technical users |

**Deprecated/outdated:**
- **zod-to-json-schema package:** No longer needed — Zod 4 has built-in `.toJSONSchema()` method
- **Netlify CMS:** Now archived as Decap CMS, but less active development; Sveltia CMS is the modern successor but still overkill for simple JSON editing
- **Manual rollback via Git commands:** Vercel Instant Rollback (GA 2025) provides one-click rollback without Git knowledge
- **TypeScript data files for non-technical editing:** JSON is now the clear choice when editors lack development experience

## Open Questions

### 1. Image Optimization Strategy

**What we know:**
- Next.js Image component handles optimization at build time
- Current structure has separate folders: `/images/teams/`, `/images/coaches/`, `/images/sponsors/`
- Board members will upload via GitHub web UI (drag-and-drop)

**What's unclear:**
- Should we validate image dimensions/size in CI, or just document recommendations?
- Image compression: rely on Next.js only, or add pre-upload guidance?

**Recommendation:**
- Document recommended dimensions (e.g., "1200x800 for team photos, 400x400 for coach headshots")
- Don't enforce in validation (blocks uploads, creates friction for non-technical users)
- Consider adding image optimization script that runs on upload (low priority, can defer to later phase)

### 2. Sponsor Logo Consistency

**What we know:**
- Sponsors have varied logo formats (some horizontal, some square, some with taglines)
- Current design uses `SponsorCard` component that displays logos

**What's unclear:**
- Should documentation specify logo aspect ratio or let design handle it flexibly?
- Background: transparent PNG vs white background?

**Recommendation:**
- Document preferred format: "Transparent PNG, approximately square (1:1 ratio), 800x800px recommended"
- Add visual examples in documentation showing good vs problematic logos
- Keep validation permissive (allow .jpg, .jpeg, .png) — visual issues won't break the site

### 3. Multi-Language Support (Future)

**What we know:**
- Current site is English-only
- No requirement for multi-language in Phase 9

**What's unclear:**
- Will board members need to manage translated content in the future?

**Recommendation:**
- Design schemas with optional language support in mind (e.g., could add `"lang": "en"` field)
- Don't implement now — YAGNI principle
- If needed later, Zod schemas can be extended without breaking existing data

## Sources

### Primary (HIGH confidence)

- [Zod GitHub Repository](https://github.com/colinhacks/zod) - Official Zod source, version 4.3.6 installed
- [Zod Official Documentation](https://zod.dev/) - API reference, schema definitions, migration guide
- [Zod v4 Release Notes](https://zod.dev/v4) - v4 features, performance improvements, JSON Schema support
- [Vercel Instant Rollback Documentation](https://vercel.com/docs/instant-rollback) - Official rollback guide
- [Vercel GitHub Integration Documentation](https://vercel.com/docs/git/vercel-for-github) - Preview deployments, automatic deploys
- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) - Required status checks configuration
- Project package.json - Confirmed Zod 4.3.6, Next.js 16.1.6, existing dependencies
- Project source code - Existing TypeScript data files in `src/lib/data/`, interfaces, image structure

### Secondary (MEDIUM confidence)

- [Zod 4 InfoQ Article](https://www.infoq.com/news/2025/08/zod-v4-available/) - Performance benchmarks, Zod Mini, breaking changes
- [GitHub Actions: Validate JSON](https://github.com/marketplace/actions/validate-json) - JSON validation action for CI/CD
- [GitHub Actions: JSON Schema Validate](https://github.com/marketplace/actions/json-schema-validate) - Schema validation marketplace action
- [Vercel Instant Rollback Changelog](https://vercel.com/changelog/instant-rollback-is-now-available-to-revert-deployments) - GA announcement, feature details
- [GitHub Actions Branch Protection Guide](https://oneuptime.com/blog/post/2026-01-28-github-actions-branch-protection/view) - Best practices (January 2026)
- [Sveltia CMS GitHub](https://github.com/sveltia/sveltia-cms) - Modern Netlify CMS successor (referenced as alternative)
- [CloudCannon: Decap CMS Alternatives](https://cloudcannon.com/blog/looking-for-an-alternative-to-netlify-cms-or-decap-cms/) - CMS comparison

### Tertiary (LOW confidence, general context)

- [Content Management Best Practices](https://contentmanagementcourse.com/content-management/best-practices/) - General CMS patterns
- [TechTarget: Content Management Trends 2026](https://www.techtarget.com/searchcontentmanagement/feature/The-top-5-content-management-trends) - Low-code/no-code trends, AI assistance
- [Technical Documentation Best Practices 2026](https://www.documind.chat/blog/technical-documentation-best-practices) - Documentation structure, user-friendly language
- [Top JSON Editors 2026](https://slashdot.org/software/json-editors/) - JSON editing tools landscape
- GitHub web editor discovery (web search) - General availability, no specific 2026 updates found

## Metadata

**Confidence breakdown:**
- **Standard stack: HIGH** - Zod is already installed (4.3.6), well-documented, and actively maintained. GitHub Actions and Vercel integration are proven, standard approaches.
- **Architecture: HIGH** - TypeScript to JSON migration pattern is well-established. Zod validation patterns are documented in official docs. GitHub Actions validation is standard practice.
- **Pitfalls: MEDIUM-HIGH** - JSON syntax errors and manual editing issues are well-known. Image path validation and cross-file references are logical extensions. Merge conflicts are standard Git issues.
- **Documentation patterns: MEDIUM** - Best practices compiled from multiple sources. Step-by-step approach is proven for non-technical users, but specific to this project's needs.

**Research date:** 2026-02-16
**Valid until:** 30 days (March 18, 2026) for stable technologies (Zod, GitHub Actions, Vercel). Fast-moving: GitHub UI updates may require documentation review quarterly.

**Key assumptions:**
- Board members have basic computer literacy (email, web browsing, file uploads)
- Repository will remain on GitHub (not GitLab, Bitbucket, etc.)
- Vercel deployment (Phase 10) will be configured with default preview deployment settings
- No requirement for offline editing or complex workflows (branching strategies, staging environments)

**Notes:**
- This phase bridges non-technical users with developer infrastructure, so simplicity is paramount
- Safety (validation, rollback, preview) must be bulletproof to build trust with non-technical users
- Documentation quality is as critical as technical implementation — invest significant effort here
- Consider creating video walkthrough (not documented here, but valuable for visual learners)
