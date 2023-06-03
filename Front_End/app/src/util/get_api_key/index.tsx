export const get_api_key  = (): string | null =>{
    return localStorage.getItem('api_key');
}