const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const slidesDir = "/Users/davidsendroff/Projects/AI_Club_Brain/outputs/manual-20260531-ai-club-june1/presentations/leadership-project-showcase/v8_readability_slides";
const out = "/Users/davidsendroff/Projects/AI_Club_Brain/outputs/manual-20260531-ai-club-june1/presentations/leadership-project-showcase/FINAL_June_1st_Presentation_Leadership_Showcase_V8_Readability.pptx";
const pptx = new pptxgen();
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';
pptx.author = 'Northern Highlands AI Club';
pptx.subject = 'June 1 AI Club leadership project showcase';
pptx.title = 'June 1 AI Club Leadership Showcase V8 Readability';
pptx.company = 'Northern Highlands AI Club';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  lang: 'en-US',
};

const files = fs.readdirSync(slidesDir)
  .filter((file) => file.endsWith('.png'))
  .sort((a, b) => Number(a.slice(6, 8)) - Number(b.slice(6, 8)));

for (const file of files) {
  const slide = pptx.addSlide();
  slide.background = { color: '050A13' };
  slide.addImage({ path: path.join(slidesDir, file), x: 0, y: 0, w: 13.333333, h: 7.5 });
}

pptx.writeFile({ fileName: out }).then(() => {
  console.log(`WROTE=${out}`);
  console.log(`SLIDES=${files.length}`);
});
