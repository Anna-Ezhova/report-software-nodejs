"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  SignInValidator,
  TSignInValidator,
} from "@/lib/validators/sign-in-validator";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Suspense } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInValidator>({
    resolver: zodResolver(SignInValidator),
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");
   const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/login`

  const onSubmit = async ({ email, password }: TSignInValidator) => {
    // signIn({ email, password})

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include", // Important for cookie handling
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      toast.success("Eingeloggt!");

      router.refresh();
      router.push("/");
      location.reload();
    } catch (err) {
      toast.error("Etwas ist schief gelaufen");
    }
  };

  return (
    <>
      <Suspense>
        <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] pb-10">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Image
                src="/logo_asoftnetweiss.webp"
                alt="logo"
                height="200"
                width="200"
              />

              <h1 className="text-2xl font-bold">Einloggen</h1>
            </div>
            <div className="grid gap-6 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      className={cn({
                        "focus-visible:ring-red-500": errors.email,
                      })}
                      placeholder="mustermann@asoftnet.de"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="password">Passwort</Label>
                    <Input
                      {...register("password")}
                      className={cn({
                        "focus-visible:ring-red-500": errors.password,
                      })}
                      type="password"
                      placeholder="Passwort"
                    />
                    {errors?.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button> Einloggen</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Page;
