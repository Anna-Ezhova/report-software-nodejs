"use client"

import { Button } from "@mui/material";
import { generatePDFfromHTML } from "@/server/generatePdf";

const ExportButton = () => {

    const htmlContent = '<p>Hello World. This is custom HTML content.</p>';

    
return <Button onClick={() => {generatePDFfromHTML(htmlContent, 'custom.pdf')}}>Test</Button>

}

export default ExportButton