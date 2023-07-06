import { redirect } from "react-router";

export function handleResponse(response: any) {
  if (response.results) {
    return response.results;
  }

  if (response.data) {
    return response.data;
  }
  return response;
}

export function handleError(error: { data: any; response: any; }) {
  if (error.response.status) {
    console.log('error:' + error.response.status + ' ' + error.response.statusText);
    if (error.response.status === 401) {
      return redirect('/login');
    }
  }
  if (error.data) {
    throw error.data;
  }
  throw error;
}
