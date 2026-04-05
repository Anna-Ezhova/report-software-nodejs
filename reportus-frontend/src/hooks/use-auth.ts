import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const signOut = async (token: string | undefined) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Signed out succesfully");

      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast.error("Couldn't sign out please try again");
    }
  };

  return { signOut };
};
