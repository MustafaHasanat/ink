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
  createConfig: {
    endpoint: "/locales",
    requestFormDataKey: "key",
    bodyShape: "formData",
  },
  updateConfig: {
    endpoint: "/locales/KEY",
    endpointIdentifierKey: "KEY",
    responsePathToBottle: ["data"],
    preferredMethod: "PATCH",
    requestFormDataKey: "value",
    bodyShape: "formData",
  },
  deleteConfig: {
    endpoint: "/locales/KEY",
    endpointIdentifierKey: "KEY",
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
