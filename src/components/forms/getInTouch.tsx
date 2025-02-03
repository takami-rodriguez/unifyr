"use client";
import { boxShadow } from "@/data/styleHelpers";
import { Button } from "../ui/button";
import InputField from "./components/inputField";
import { Label } from "./components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/select";
import { FormEvent, useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../ui/loadingSpinner";
import Script from "next/script";
import { sendFormData } from "@/queries/landingPage";

const GetInTouch = ({ id }: { id: string }) => {
  const turnstile = useTurnstile();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sendData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formdata = new FormData(event.currentTarget);
    return sendFormData(formdata, id)
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
      <Script
        type="text/javascript"
        src="https://assets.apollo.io/js/meetings/meetings-widget.js"
        onLoad={() => {
          window.ApolloMeetings.initWidget({
            appId: "6776bbc84e358502ceed3dce",
            schedulingLink: "67o-gu1-m9c",
          });
        }}
      />
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
          <div className="space-y-1">
            <Label>I am a...</Label>
            <Select name="entity_type__c">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

export default GetInTouch;
