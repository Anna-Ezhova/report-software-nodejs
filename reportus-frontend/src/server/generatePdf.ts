import playwright from 'playwright';

export async function generatePDFfromHTML(htmlContent: string, outputPath:string) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath });
  console.log('PDF generated successfully');
  await browser.close();
}

