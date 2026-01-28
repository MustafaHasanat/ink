"use client";

import { useInk } from "@/hooks";

export function LoginPage() {
  const { ink } = useInk({ key: "auth" });

  return (
    <div className="min-h-screen text-black flex items-center justify-center p-4 bg-linear-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl px-6 py-9">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold leading-snug text-slate-900">
            {ink("login.title")}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {ink("login.description")}
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-900"
            >
              {ink("login.labels.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-900"
            >
              {ink("login.labels.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-2 mb-1 flex items-center justify-between gap-3">
            <label
              htmlFor="remember"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-700 cursor-pointer"
            >
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
              />
              <span> {ink("login.labels.remember")} </span>
            </label>
            <a
              href="#"
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700"
            >
              {ink("login.labels.forgot")}
            </a>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {ink("login.labels.submit")}
          </button>
        </form>

        <div className="mt-7 text-center text-sm text-slate-500">
          <span> {ink("login.labels.no_account")} </span>
          <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
            {ink("login.labels.create")}
          </a>
        </div>
      </div>
    </div>
  );
}
