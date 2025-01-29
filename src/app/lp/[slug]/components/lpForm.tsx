"use client";
import { boxShadow } from "@/data/styleHelpers";
import { FormEvent, useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import { cn } from "@/lib/utils";
import InputField from "@/components/forms/components/inputField";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingSpinner";

const LandingPageForm = ({ id }: { id: string }) => {
  const turnstile = useTurnstile();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sendData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const query = new URLSearchParams(window.location.search);
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/forms/${id}`);
    query.forEach((v, k) => url.searchParams.append(k, v));

    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };

    const formdata = new FormData(event.currentTarget);
    const urlparams = new URLSearchParams(
      Array.from(formdata.entries()).map(([k, v]) => {
        return [k, v as string];
      }),
    );

    return await fetch(url, {
      method: "POST",
      headers,
      body: urlparams,
    })
      .then(async (response) => {
        if (!response.ok) {
          const errors = await response.json();
          turnstile.reset();
          setErrors(errors);
        } else {
          setErrors({});
          setSuccess(true);
        }
      })
      .catch(() => {
        turnstile.reset();
        setErrors({
          message: "Network error. Please try again.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <form id={id} onSubmit={sendData}>
        <div
          className={cn(
            "space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-14 py-10",
          )}
          style={boxShadow}
        >
          <Turnstile
            className="hidden"
            sitekey="0x4AAAAAAA5VmWokYJQQgCCK"
            onVerify={setToken}
            theme="light"
            appearance="interaction-only"
          />
         
          <div className="grid grid-cols-2 gap-6">
            <InputField
              type="text"
              label="First Name"
              name="firstName"
              placeholder="Alex"
              required
              error={errors.first_name}
            />
            <InputField
              type="text"
              label="Last Name"
              name="lastName"
              placeholder="Bloggs"
              required
              error={errors.last_name}
            />
          </div>
          <InputField
            label="Email address"
            type="email"
            name="email"
            placeholder="alex.bloggs@email.com"
            required
            error={errors.email}
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-green-500">
              {errors.message ||
                (success && (
                  <>
                    <div>Success!</div>
                    <div>{"We'll be in touch soon."}</div>
                  </>
                ))}
            </div>
            <Button
              variant={"primary"}
              type="submit"
              disabled={token === null || success}
              className="h-[52px] w-[125px]"
            >
              {loading ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LandingPageForm;
