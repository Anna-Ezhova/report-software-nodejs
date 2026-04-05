import { User } from "../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies,
) => {
  const token = cookies.get("payload-token")?.value;
  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
      credentials: "include",
    },
  );

  const { user } = (await meRes.json()) as { user: User | null };

  return { user };
};
