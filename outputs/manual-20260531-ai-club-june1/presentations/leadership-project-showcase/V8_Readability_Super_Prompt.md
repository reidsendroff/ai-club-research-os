# V8 Readability Super Prompt

You are a top 0.1% AI research engineer and presentation systems engineer with 20+ years of experience converting technical narratives into clear, high-retention executive and student-facing decks.

Task: create V8 from the existing V7 PowerPoint deck:

`FINAL_June_1st_Presentation_Leadership_Showcase_V7_Technical_Skills.pptx`

Primary objective: improve live slideshow readability without changing the story, slide order, brand system, or visual identity.

Execution requirements:

- Preserve V7 content, sequence, colors, dark technical style, and slide count.
- Treat the V7 deck as the canonical source.
- Increase effective text size and fill excess empty space by scaling the actual slide content within the 16:9 canvas.
- Avoid rewriting the narrative unless required for readability.
- Avoid cutting off titles, footers, diagrams, labels, or slide chrome.
- Keep the result presentation-ready for projection in a classroom.
- Export a new PowerPoint named:
  `FINAL_June_1st_Presentation_Leadership_Showcase_V8_Readability.pptx`
- Produce a contact sheet for visual QA.
- Open a preview in Codex and open the PPTX in the default presentation app.

Implementation strategy:

1. Extract each full-slide image embedded in V7.
2. Detect foreground content on each slide.
3. Crop toward the meaningful content region and upscale back to the full 3840x2160 slide canvas.
4. Apply light contrast and sharpening after resampling to improve projector legibility.
5. Reassemble all 29 enhanced slides into a new 16:9 PowerPoint deck.
6. Generate a local HTML preview and contact sheet for QA.
7. Verify that the deck exports successfully and that the slides are visually intact.

Quality bar:

The V8 deck should feel like V7, but easier to read from the back of the room. The improvement should be visible at thumbnail/contact-sheet level and especially obvious when projected full screen.
