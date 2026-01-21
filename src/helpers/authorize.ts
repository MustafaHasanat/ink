import axios from "axios";
import { AxiosWrapperType, ItemResponse } from "@/types";
import { BACKEND_DOMAIN } from "@/constants";
import { Endpoints } from "@/enums";

interface Props {
  email: string;
  pass: string;
}

export async function authorize({ email, pass }: Props) {
  const response = await axios.get<
    FormData,
    AxiosWrapperType<ItemResponse<object>>
  >(`${BACKEND_DOMAIN}${Endpoints.AUTHORIZE}`, {
    params: {
      email,
      pass,
    },
  });

  if (!response?.data?.status || !response?.data?.data)
    throw new Error(response?.data?.error || "Error authorizing the user");
}
