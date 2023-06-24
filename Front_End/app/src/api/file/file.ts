import service from "../request/request";

export function upload_file(file: File){
    const formData = new FormData();
    formData.append('document',file);
    return service({
        url: '/doc_query/upload_pdf',
        method: 'post',
        data: formData
    })
}