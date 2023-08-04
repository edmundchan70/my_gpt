import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
type Props = {
  File: File | Uint8Array
}
function Display_Pdf({ File }: Props) {
 
  const [numPages, setNumPages] = useState<number | null>(null);
  
 
  return  File instanceof Uint8Array?
 
       <Document
        file={{data:File}}>
        <Page pageIndex={0}/>

</Document>

 
 
    
    :
 
  <Document
    file={File}
    onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
      {numPages&&
        Array.from({length:numPages!},(item,i)=>{
          return (<Page  pageIndex={i}></Page>)
        }) 
      }
  </Document>
 
   
    
  
 
}

export default Display_Pdf