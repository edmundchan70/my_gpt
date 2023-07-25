 
import service from "../request/request";
import { getAccessToken } from "../../util/getToken/getToken";

export function upload_file(file: File){
    const formData = new FormData();
    formData.append('document',file);
    return service({
        url: '/doc_query/upload_pdf',
        method: 'post',
        data: formData,
        headers:{
            Authorization: 'Bearer ' +getAccessToken()
        }
    })
}