import Axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import Cookies from "js-cookie";
 
 
const BASE_URL  =process.env.REACT_APP_TEST_SERVER
const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  const onResponseError = async (error: AxiosError): Promise<AxiosError|undefined| AxiosResponse> => {
    if (error.response){
        if( error.response.status === 401){
            const refresh_token = Cookies.get('refresh_token');
            try{
                const resp = await Axios({
                    url: BASE_URL+"/auth/refresh",
                    method:"POST",
                    headers:{
                        Authorization: 'Bearer ' +refresh_token 
                    }
                }); 
                const new_access_token = resp.data.access_token
                Cookies.set('access_token',new_access_token);
               
                // delay original requests until authorization has been completed
                const original_url = error.request.responseURL
                const data = error.config?.data;
                console.log(data)
                const method = error.config?.method
                
                const origin_resp=   await Axios({
                    url:original_url,
                    data:JSON.parse(data),
                    method:method,
                    headers:{
                            Authorization: 'Bearer ' +new_access_token
                    }
                });
                
                return origin_resp
            }catch(err:any){
                console.log('err,upper' ,err)
                alert("Refresh Key not found, please re-login!")
                window.location.href ="http://localhost:3000/login"
                return  ; //
            } 
        }
    }
    return  Promise.reject(error)
}
 
 const setupInterceptorsTo = (
    axiosInstance: AxiosInstance
  ): AxiosInstance => {
 //   axiosInstance.interceptors.request.use(onRequest,OnRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
  };
  
  let service =setupInterceptorsTo(Axios.create({
    baseURL:BASE_URL  ,
    timeout:30000
}))
export default service;
