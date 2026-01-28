import { LoginPage } from "@/components";
import type { InkConfig, InkProviderComponents } from "@/types";

export const defaultInkConfig: InkConfig = {
  backendUrl: "http://localhost:8000/api",
  locales: ["en", "ar"],
  currentLocale: "ar",
  getConfig: {
    endpoint: "/locales",
    responsePathToBottle: ["data"],
  },
  updateConfig: {
    endpoint: "/locales/KEY",
    endpointIdentifierKey: "KEY",
    responsePathToBottle: ["data"],
    preferredMethod: "PATCH",
    requestFormDataKey: "data",
  },
  credentials: {
    email: "",
    pass: "",
  },
};

export const defaultInkComponents: InkProviderComponents = {
  loginPage: {
    label: "Login",
    node: <LoginPage />,
  },
};
