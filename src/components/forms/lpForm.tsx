/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { boxShadow } from "@/data/styleHelpers";
import { FormEvent, useEffect, useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import { cn } from "@/lib/utils";
import InputField from "@/components/forms/components/inputField";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { sendFormData } from "@/queries/formHandler";
import { Textarea } from "@/components/forms/components/textarea";
import { Label } from "@/components/forms/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/select";
import Script from "next/script";

const LandingPageForm = ({
  id,
  name,
  email,
  company,
  title,
  message,
  whoAmI,
  withRouting,
}: {
  id: string;
  name?: boolean;
  email?: boolean;
  company?: boolean;
  title?: boolean;
  message?: boolean;
  whoAmI?: boolean;
  withRouting?: boolean;
}) => {
  const turnstile = useTurnstile();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [entity, setEntity] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEntity(params.get("e") ?? undefined);
  }, []);

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

          if (withRouting && entity == "supplier") {
            window.ApolloMeetings.submit({
              map: false,
              lead: Object.fromEntries(
                formdata.entries().filter(([k, _]) => {
                  return ["email", "firstName", "lastName"].includes(k);
                }),
              ),
            });
          }
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
      {withRouting && (
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
      )}
      <form id={id} onSubmit={sendData}>
        <div
          className={cn(
            "space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-8 pb-5 pt-3 lg:px-8 lg:pb-7 lg:pt-5",
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
          {whoAmI && (
            <div className="space-y-1">
              <Label>I am a...</Label>
              <Select
                name="entity_type__c"
                value={entity}
                onValueChange={(value) => setEntity(value)}
              >
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
          )}
          {name && (
            <div className="grid grid-cols-2 gap-6">
              <InputField
                type="text"
                label="First name"
                name="firstName"
                placeholder="First"
                required
                error={errors.first_name}
              />
              <InputField
                type="text"
                label="Last name"
                name="lastName"
                placeholder="Last"
                required
                error={errors.last_name}
              />
            </div>
          )}
          {email && (
            <InputField
              label="Company email"
              type="email"
              name="email"
              placeholder="name@company.com"
              required
              error={errors.email}
            />
          )}
          {company && (
            <InputField
              label="Company name"
              type="text"
              name="company"
              placeholder="Company name"
              required
              error={errors.company}
            />
          )}
          {title && (
            <InputField
              label="Title"
              type="text"
              name="title"
              placeholder="Title"
              required
              error={errors.title}
            />
          )}
          {message && (
            <div className="space-y-1">
              <Label>How can we help?</Label>
              <div className="relative">
                <Textarea name="commentCapture" error={errors.commentCapture} />
                <div className="absolute -bottom-5 text-sm text-red-500">
                  {errors.commentCapture}
                </div>
              </div>
            </div>
          )}
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
