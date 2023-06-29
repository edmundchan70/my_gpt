import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
type Props = {
  File: File
}
function Display_Pdf({ File }: Props) {
  console.log(File)
  const [numPages, setNumPages] = useState<number | null>(null);
  console.log(numPages)
  return (

    <Document
      file={File}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >

        {numPages&&
          Array.from({length:numPages!},(item,i)=>{
            return (<Page  pageIndex={i}></Page>)
          })
        }
    
    </Document>





  )
}

export default Display_Pdf