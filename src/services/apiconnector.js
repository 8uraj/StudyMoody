import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector =async (method, url, bodyData, headers, params) => {
  console.log("url is ",url,method);
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
