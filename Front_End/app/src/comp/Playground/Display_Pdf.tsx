import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
type Props = {
  File?: File,
  Data?: Uint8Array
}
function Display_Pdf({ File ,Data}: Props) {
 
  const [numPages, setNumPages] = useState<number | null>(null);
  
   console.log(File)
  return File?
    <Document
      file={File}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {numPages&&
          Array.from({length:numPages!},(item,i)=>{
            return (<Page  pageIndex={i}></Page>)
          }) 
        }
    </Document>:
    
    <Document
      file={{data:Data}}  
      
     >
      <Page pageIndex={0}/>
    
    </Document>
  
 
}

export default Display_Pdf