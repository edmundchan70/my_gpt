import PDFParser from "pdf2json";
export function optimzie_text_chunk(file_buffer:Buffer){
    const pdfParser = new  PDFParser();
    pdfParser.on('pdfParser_dataReady', (pdfData :any) => {
        const text = pdfData.text;
        const sentences = text.split(/[.!?]+/);
        const longestSentence = sentences.reduce((longest, sentence) => {
          return sentence.length > longest.length ? sentence : longest;
        }, '');
    
         return  longestSentence.length;
      });
    pdfParser.parseBuffer(file_buffer);
}