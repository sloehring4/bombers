# Pitfalls Research: Youth Baseball Association Website

## Critical Pitfalls

### 1. Content Update Bottleneck
**The problem**: Building a beautiful site that only a developer can update. Board members can't change rosters, add events, or update fees without technical help.

**Warning signs**: Content editing requires code changes, no clear documentation for updates, board members asking "how do I change X?"

**Prevention**:
- Use simple JSON data files with clear structure and comments
- Create a CONTENT_GUIDE.md with step-by-step instructions for every common update
- Keep data files separate from code — board members only touch `/data/` folder
- Consider GitHub web editor for simple edits (no git knowledge needed)

**Phase**: Address in Phase 1 (data architecture) and final phase (documentation)

### 2. Roster Data Management Pain
**The problem**: 16+ teams across age groups means a lot of roster data. If the data structure is awkward, seasonal updates become a nightmare.

**Warning signs**: Duplicated player info, no clear structure for adding/removing teams, roster updates take more than 5 minutes per team

**Prevention**:
- Design roster data structure carefully upfront (one JSON file, well-organized)
- Each team is an object with clear fields (name, age group, season, players array, coaches array)
- Make adding a new team as simple as copying a template block
- Include example entries as templates

**Phase**: Address in Phase 2 (teams/roster system)

### 3. Design That Looks Good Empty
**The problem**: Site looks great with placeholder content but terrible with real data — uneven team sizes, long names, missing photos.

**Warning signs**: Only tested with perfect placeholder data, no edge case testing with real roster sizes

**Prevention**:
- Test with real data from current site early
- Handle variable team sizes gracefully (some teams have 12 players, some have 15)
- Design for missing data (no photo? show placeholder)
- Don't depend on uniform content lengths

**Phase**: Address in Phase 3 (content integration)

### 4. Mobile Neglect
**The problem**: Parents check the site on phones at baseball fields and tournaments. A desktop-first design that breaks on mobile is unusable.

**Warning signs**: Navigation doesn't work on mobile, tables overflow, text too small

**Prevention**:
- Mobile-first responsive design from day one
- Test roster tables on small screens (they have many columns)
- Hamburger menu for mobile navigation
- Touch-friendly tap targets

**Phase**: Address in Phase 1 (foundation) — bake into every component

### 5. Over-Engineering for a Seasonal Site
**The problem**: Building a complex CMS, database, auth system, or admin panel for a site that changes content maybe 3-4 times per year (pre-season, season start, mid-season, post-season).

**Warning signs**: Discussing databases, admin dashboards, user authentication for a content site

**Prevention**:
- Static site generation — no server, no database, no admin panel
- JSON files for data — simple, version-controlled, no CMS needed
- Focus effort on design quality and content clarity, not infrastructure
- If they need a CMS later, it can be added without rebuilding

**Phase**: Address in Phase 1 (architecture decisions)

### 6. Losing SEO and Existing Traffic
**The problem**: Current site has some search ranking for "O'Fallon Bombers baseball." New site could lose that if not handled properly.

**Warning signs**: No meta tags, no sitemap, different URL structure without redirects

**Prevention**:
- Proper meta tags (title, description) on every page
- Generate sitemap.xml
- Set up proper Open Graph tags for social sharing
- Maintain similar URL patterns where possible

**Phase**: Address in final polish phase

### 7. Spirit Wear Integration Complexity
**The problem**: Trying to build an e-commerce system for spirit wear instead of linking to an existing store.

**Warning signs**: Discussions about shopping carts, payment processing, inventory management

**Prevention**:
- Link to external spirit wear store (most clubs use SquadLocker, BSN, or similar)
- Display catalog images/descriptions on site but "Buy" links go external
- Zero payment processing liability

**Phase**: Address in info pages phase
