import { Paper } from '@mui/material';
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { inherits } from 'util';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
type Props = {
  File: File
}
function Display_Pdf({ File }: Props) {
  console.log(File)
  return (
 
       <Document file={File} >
      <Page pageNumber={1} />
    </Document>

      
    
    

  )
}

export default Display_Pdf