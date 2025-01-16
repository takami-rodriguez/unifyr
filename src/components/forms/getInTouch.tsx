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
import { FormEvent, useRef, useState } from "react";
import { Turnstile } from "next-turnstile";
import { cn } from "@/lib/utils";

const GetInTouch = ({ id }: { id: string }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [success, setSuccess] = useState(false);
  const [turnstileStatus, setTurnstileStatus] = useState("required");
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    marketo: undefined,
  });

  const sendData = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    console.log(
      form.elements,
      form.elements.namedItem("cf-turnstile-response")
    );
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const token = formData.get("cf-turnstile-response");
    const first_name = (
      form.elements.namedItem("first_name") as HTMLInputElement
    ).value;
    const last_name = (form.elements.namedItem("last_name") as HTMLInputElement)
      .value;
    // const token = (
    //   form.elements.namedItem("cf-turnstile-response") as HTMLInputElement
    // ).value;
    const entity_type = (
      form.elements.namedItem("entity_type__c") as HTMLInputElement
    ).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    console.log(token);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const urlencoded = new URLSearchParams();
    urlencoded.append("Email", email);
    urlencoded.append("cf-turnstile-response", String(token));
    urlencoded.append("FirstName", first_name);
    urlencoded.append("LastName", last_name);

    urlencoded.append("entity_type__c", entity_type);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      mode: "no-cors" as RequestMode,
      redirect: "follow" as RequestRedirect,
    };

    return await fetch(
      `https://next.staging.unifyr.com/forms/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => {
        console.error(error);
        setErrors({ ...errors, marketo: error });
      });
  };
  console.log({ errors });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
    sendData(e)
      .then((d) => {
        console.log("form submitted", d);
        setSuccess(true);
      })
      .catch((error) => {
        setErrors(error);
        console.error("sendData Error", error);
      });
  };
  return (
    <div className="w-full">
      <form id={id} ref={formRef} onSubmit={handleSubmit}>
        <div
          className={cn("bg-white/60 rounded-2xl py-10 px-14 space-y-6", {
            "h-[434px]": turnstileStatus === "required",
          })}
          style={boxShadow}
        >
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            retry="auto"
            refreshExpired="auto"
            sandbox={process.env.NODE_ENV === "development"}
            onError={() => {
              setTurnstileStatus("error");
              setTurnstileError(
                "Security check failed. Please refresh and try again."
              );
            }}
            onExpire={() => {
              setTurnstileStatus("expired");
              setTurnstileError(
                "Security check expired. Please refresh and verify again."
              );
            }}
            onLoad={() => {
              setTurnstileStatus("required");
              setTurnstileError(null);
            }}
            onVerify={() => {
              setTurnstileStatus("success");
              setTurnstileError(null);
            }}
          />
          {turnstileStatus === "success" ? (
            <>
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
                  name="FirstName"
                  placeholder="Alex"
                  required
                  error={errors.first_name}
                />
                <InputField
                  type="text"
                  label="Last Name"
                  name="LastName"
                  placeholder="Bloggs"
                  required
                  error={errors.last_name}
                />
              </div>
              <InputField
                label="Email address"
                type="email"
                name="Email"
                placeholder="alex.bloggs@email.com"
                required
                error={errors.email}
              />
              <div className="flex justify-between">
                <div>{errors.marketo}</div>
                <Button variant={"primary"} type="submit" disabled={success}>
                  {success ? "Success" : "Submit"}
                </Button>
              </div>
            </>
          ) : (
            <>
              {turnstileError && (
                <div className="text-red-500 text-sm">{turnstileError}</div>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
