const common_error: {[key: number] :string} = {
    400: "Bad Request",
    401: "Unauthorized, Please provide a valid API key!",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout"
  };
  
  export function handle_error(status :number) :string |null{
    const code = Number(status);
    if (common_error.hasOwnProperty(code)) {
      return common_error[code];
    } else {
      return null;
    }
  }
  
  
  