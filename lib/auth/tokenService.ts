"use server";

import { cookies } from "next/headers";

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("access_token", accessToken, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  return access_token?.value || null;
}

export async function deleteAccessToken() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
