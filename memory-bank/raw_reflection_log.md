---
Date: 2025-08-31
TaskRef: "Update next game card on home page to link to signup URL"

Learnings:
- Jekyll Liquid templating can have issues with complex nested HTML structures, especially when wrapping large blocks of content with <a> tags
- CSS `pointer-events: none` on child elements completely blocks click functionality - this was a critical issue that prevented links from working
- JavaScript onclick events with `window.open()` are more reliable than complex HTML link structures for clickable card components
- HTML structure validation is crucial - malformed nested divs can interfere with link functionality
- Jekyll data files (_data/games-list.yml) work correctly and the templating processes the data as expected

Difficulties:
- Initial approach using <a> tags wrapping the entire next-game-highlight content caused HTML structure issues
- CSS rule `* { pointer-events: none; }` in .next-game-link class was blocking all click events
- Malformed HTML with unclosed divs was interfering with the link functionality
- Visible `</a>` tags in the browser indicated Jekyll templating processing issues

Successes:
- Successfully identified and removed the problematic `pointer-events: none` CSS rule
- Fixed malformed HTML structure by properly closing nested divs
- Implemented a more reliable JavaScript-based click solution using onclick and window.open()
- Verified the Jekyll data integration is working correctly (showing "Mega Empires: The West" on "September 20, 2025")
- Confirmed the click functionality works (hover effects activate on click)

Improvements_Identified_For_Consolidation:
- For clickable card components, JavaScript onclick events are more reliable than complex nested HTML link structures
- Always validate HTML structure when working with Jekyll templating
- CSS pointer-events should be used carefully as they can completely block interactivity
---
