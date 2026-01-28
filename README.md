# Ink

A dynamic solution for inter-localization (translation) in for Node.js projects!

## How does it work?

### The challenge

When your web application should be implemented using multi-languages, you're going to use one of the most used tools for inter-localization which is called **i18n**. We use this tool to help us gather the static string across the app in simple JSON files which will be dynamically fetched and placed in the app according to each used key.

#### Time consumption

One of the major problems that Frontend Engineers face is the constant changing of these static values according to business calls or designers changing. It is always a time-consuming process for the Frontend team to make these non-stopping changes.

#### Code redundancy

Another problem is that whenever we want to add a new key or a language, we have to create a huge piece of code or make some redundant changes everywhere. We should focus our attention to the actual problems to solve instead of wasting time and effort on translation changes.

### The solution

We solved all those problems by building a dynamic editor for those JSON files which can be provided directly to the client so they can change any string with a quick API call!. The JSON data will be stored in your database and get called by your frontend project then get globalized so you can use them across the project with a single call.

### General working principle

You're going to build a small column in one of the tables of your project's database (let's call it **bottle**), it will have all the translated data in all languages (locales). Your bottle will be empty at first (no JSON data), but every time you click the save button in our editor, the bottle will be refilled with the newly created JSON by you!

Firstly, you need to configure the `InkProvider`, which will do all the heavy lifting in the project. Provide it with proper configs and a list of all of your components in the app, and it will render them in the view page dynamically so you can see what you're changing.

Our fantastic editor is called `InkBrush`. You're going to call it wherever you like inside your project. We have 2 main pages you're going to notice after you open the page where you called our `InkBrush`, "**View**" and "**Edit**" pages. You can toggle the language or the mode (view or edit) using the controls in the header.

The editor page displays a nested input fields for each key and value in your JSON. You can change them and hit "save" to be updated in your database and in your whole project. The view page allows you to select the current component and language to check its keys that lead to each string in the JSON. You can go to the editor after that to change the corresponding value.

Lastly, you will have to use our hook `useInk` to place the translation keys across your app. The tool will replace each instance of those to its corresponding value in the retrieved JSON object.

## Getting started

> Note: This tutorial is set for **React** and **Next.js** users. For other frameworks, you need to modify the setup accordingly.

### Installation

- Install **ink** in your Node project:  
   `npm install @js-empire/ink`

### Build the app wrapper using `InkProvider`

Build a local provider to configure your project, make sure you to replace all the placeholders:

- `YOUR_BACKEND_CONFIGS`: all needed Axios config to access your private endpoint safely.
- `YOUR_CURRENT_LOCALE`: the current locale your project is using.
- `YOUR_BACKEND_DOMAIN`: the domain of your backend.
- `THE_GET_ENDPOINT`: the endpoint used to get the locales JSON.
- `THE_UPDATE_ENDPOINT`: the endpoint used to update the locales JSON.

```typescript
"use client";  // used for Next.js

import { InkProvider, InkProviderComponents } from "@js-empire/ink";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";

const LocalInkProvider = ({ children }: { children: JSX.Element }) => {
    const axiosConfig = {
        // --- YOUR_BACKEND_CONFIGS ---
    };

    // change these components to yours
    const components: InkProviderComponents = {
        loginPage: {
            label: "Login",
            node: <LoginPage />,
        },
        registerPage: {
            label: "Register",
            node: <RegisterPage />,
        },
    };

    return (
        <InkProvider
            config={{
                backendUrl: "https://YOUR_BACKEND_DOMAIN/",
                locales: ["en", "ar"],  // change these locales to yours
                currentLocale: "YOUR_CURRENT_LOCALE",
                getConfig: {
                    endpoint: "THE_GET_ENDPOINT",
                    responsePathToBottle: ["payload", "trans"],  // change the path to your own
                    axiosConfig,
                },
                updateConfig: {
                    endpoint: "THE_UPDATE_ENDPOINT",
                    responsePathToBottle: ["payload", "newRecord", "trans"],  // change the path to your own
                    preferredMethod: "patch",  // select the update method your backend uses
                    requestFormDataKey: "trans",  // the key for the formData of the request's payload
                    axiosConfig,
                },
                // change to the credentials of your own (use dummy data now since the project still in development phase)
                credentials: {
                    email: "example@gmail.com",
                    pass: "XXXXXXX",
                },
            }}
            components={components}
        >
            {children}
        </InkProvider>
    );
};

export default LocalInkProvider;
```

### Wrap your project

Wrap the whole project with the local wrapper we created to access the context API globally:

```typescript
// app/layout.tsx

import LocalInkProvider from "../LocalInkProvider"

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    return (
        <html>
            <body>
                <LocalInkProvider>
                    {children}
                </LocalInkProvider>
            </body>
        </html>
    );
}
```

### Define the path to our editor `InkBrush`

Define a new route in your app and call the editor (we call it **InkBrush**) in that page: (Feel free to place the editor anywhere in your app)

```typescript
// app/ink/page.tsx

import React from "react";
import { InkBrushPage } from "@js-empire/ink";

export default async function Page() {
    return <InkBrushPage />;
}
```

> **Now you're ready to go!**

### Use our hook `useInk`

Call the hook `useInk` whenever you want to use one of the JSON keys dynamically. Simple call the `ink` function returned by the hook and provide it with the `chain` string (the path of the wanted string in the JSON).

Let's say we have the following bottle (JSON) and we want to place the phrase at the path `object.auth.login.welcome`:

```json
{
  "auth": {
    "login": {
      "welcome": {
        "en": "Welcome!",
        "ar": "مرحبا!"
      },
      "button": {
        "en": "Login",
        "ar": "تسجيل دخول"
      }
    },
    "register": {
      "button": {
        "en": "Create New Account",
        "ar": "افتح حساب جديد"
      }
    }
  }
}
```

So we use the `ink` function as shows bellow. The tool will display the English string when your global locale variable is set to "**en**", and displays the Arabic string when it is set to "**ar**".

```typescript
// app/LoginPage.tsx

"use client"

import { useInk } from "@js-empire/ink";

const LoginPage = () => {
    const { ink } = useInk();

    return (
        <div>
            {ink("auth.login.welcome")}
        </div>
    );
};

export default LoginPage;
```

# InkProvider API

### `InkProvider`

| Prop                | Key                  | Type                    | Description                                                                                                             |
| ------------------- | -------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| config              | backendUrl           | string                  | The URL of your backend containing the database                                                                         |
| config              | locales              | string array            | A list of your possible locales (languages)                                                                             |
| config              | currentLocale        | string                  | The dynamic current locale in your project                                                                              |
| config.getConfig    | endpoint             | string                  | The endpoint to the GET api in your database that retrieves the JSON string record                                      |
| config.getConfig    | responsePathToBottle | string array            | An array of strings containing the chain of sub-objects in your GET response to reach the JSON string                   |
| config.getConfig    | axiosConfig          | AxiosRequestConfig<any> | Axios config for the GET request                                                                                        |
| config.updateConfig | endpoint             | string                  | The endpoint to the UPDATE api in your database that updates the JSON string record                                     |
| config.updateConfig | responsePathToBottle | string array            | An array of strings containing the chain of sub-objects in your UPDATE response to reach the JSON string after updating |
| config.updateConfig | preferredMethod      | "patch" or "put"        | The method you prefer to update your records                                                                            |
| config.updateConfig | requestFormDataKey   | string                  | The key you use in your UPDATE request for the formData to provide the new JSON string                                  |
| config.updateConfig | axiosConfig          | AxiosRequestConfig<any> | Axios config for the UPDATE request                                                                                     |
| config.credentials  | email                | string                  | You Kaiser account email                                                                                                |
| config.credentials  | pass                 | string                  | You Kaiser account password                                                                                             |
| components          | ---                  | Object                  | An object containing a all components' name labels and nodes                                                            |

#### Explaining `responsePathToBottle` for GET request

If you return the JSON string from your backend as bellow, then you need to specify the path as: `responsePathToBottle: ["data", "trans"]`

```json
{
  "data": {
    "trans": "---JSON string---"
  },
  "status": 200,
  "error": null
}
```

#### Explaining `responsePathToBottle` for UPDATE request

If you return the JSON string from your backend after updating as bellow, then you need to specify the path as: `responsePathToBottle: ["payload", "newRecord", "trans"]`

```json
{
  "payload": {
    "newRecord": {
      "trans": "---JSON string---"
    }
  },
  "message": "Updated successfully!",
  "status": 200,
  "error": null
}
```

#### Explaining `requestFormDataKey` for UPDATE request

If you accept the JSON string in your backend under the key "**trans**" as bellow, then you need to specify the request-key as: `requestFormDataKey: "trans"`

```typescript
const formData = new FormData();

formData.append("trans", JSON.stringify(myObject));
```

# Next Phase Updates

- **Split JSON files**: we will define a way to split each JSON object to be saved in multiple spots in your database.

- **Create JSON**: a button to create an initial JSON object instead of initializing it manually.

- **Translate with AI**: click a button to translate the whole existing JSON to any other language.
