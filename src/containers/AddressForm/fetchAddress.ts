import axios, { AxiosRequestConfig } from "axios";

const apiKey = "eKtESYz-3UWLEdxChO2gHw22427";

export const fetchAddress = async (postcode: string) => {
  const config: AxiosRequestConfig = {
    params: {
      "api-key": apiKey,
      validateStatus: (status: number) => {
        return status >= 200 && status < 300;
      },
    },
  };
  return axios
    .get(`https://api.getAddress.io/find/${postcode}`, config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        // handle response errors
        console.log(error.response);
      } else if (error.request) {
        // handle request errors
        console.log(error.request);
      } else {
        // handle other errors
        console.log("Error");
      }
    });
};
