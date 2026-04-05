import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/user-cookies";
import AlarmDialog from "./AlarmDialog";

const AlertCheckUser = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (user && user.role != "user_general") {
    return <AlarmDialog></AlarmDialog>;
  }
};

export default AlertCheckUser;
