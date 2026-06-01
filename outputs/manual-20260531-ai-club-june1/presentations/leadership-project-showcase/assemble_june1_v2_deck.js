const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const slidesDir = 'C:/Projects/AI_Club_Brain/outputs/manual-20260531-ai-club-june1/presentations/leadership-project-showcase/v2_generated_slides';
const out = process.env.PPTX_OUT || 'C:/Users/reid/Downloads/June_1st_Presentation_Leadership_Showcase_V2_Audited.pptx';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Northern Highlands AI Club';
pptx.subject = 'June 1 AI Club leadership project showcase';
pptx.title = 'June 1 AI Club Leadership Showcase V2';
pptx.company = 'Northern Highlands AI Club';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Segoe UI',
  bodyFontFace: 'Segoe UI',
  lang: 'en-US',
};
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';

const files = fs.readdirSync(slidesDir)
  .filter((file) => file.endsWith('.png'))
  .sort((a, b) => Number(a.slice(0, 2)) - Number(b.slice(0, 2)));

for (const file of files) {
  const slide = pptx.addSlide();
  slide.background = { color: '050A13' };
  slide.addImage({
    path: path.join(slidesDir, file),
    x: 0,
    y: 0,
    w: 13.333333,
    h: 7.5,
  });
}

pptx.writeFile({ fileName: out }).then(() => {
  console.log(`WROTE=${out}`);
  console.log(`SLIDES=${files.length}`);
});
