import axios, { AxiosRequestConfig } from "axios";

const apiKey = "eKtESYz-3UWLEdxChO2gHw22427"; // for convenience, added here as constant - in prod, would refactor into env. var.

export const fetchAddress = async (
  postcode: string,
  setModal: (title: string, subheading: string) => void
): Promise<string[][]> => {
  const config: AxiosRequestConfig = {
    params: {
      "api-key": apiKey,
      format: true,
    },
    validateStatus: (status: number) => {
      return status >= 200 && status < 300;
    },
  };
  return axios
    .get(`https://api.getAddress.io/find/${postcode}`, config)
    .then((response) => {
      return response.data.addresses;
    })
    .catch((error) => {
      if (error.response) {
        // handle response errors
        setModal("Error from server", error.response.data.Message);
      } else if (error.request) {
        // handle request errors
        setModal(
          "Error in request",
          "Something wrong with request - check api key"
        );
      } else {
        // handle other errors
        setModal("Unknown error", "Please contact admin");
      }
    });
};
