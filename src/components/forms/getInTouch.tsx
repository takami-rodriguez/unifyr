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

const GetInTouch = ({ id }: { id: string }) => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);

  const sendData = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const first_name = (
      form.elements.namedItem("first_name") as HTMLInputElement
    ).value;
    const last_name = (form.elements.namedItem("last_name") as HTMLInputElement)
      .value;
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("first_name", first_name);
    urlencoded.append("last_name", last_name);
    urlencoded.append("company", company);

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
      .then((result) => result)
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
    sendData(e)
      .then((d) => {
        console.log("form submitted");
        setSuccess(true);
      })
      .catch((error) => {
        setErrors(error);
        console.error("sendData Error", error);
      });
  };
  return (
    <div className="w-full">
      <form id={id} onSubmit={handleSubmit}>
        <div
          className="bg-white/60 rounded-2xl py-10 px-14 space-y-6"
          style={boxShadow}
        >
          <div className="grid grid-cols-2 gap-6">
            <InputField
              type="text"
              label="First Name"
              name="first_name"
              placeholder="Alex"
              required
            />
            <InputField
              type="text"
              label="Last Name"
              name="last_name"
              placeholder="Bloggs"
              required
            />
          </div>
          <InputField
            label="Email address"
            type="email"
            name="email"
            placeholder="alex.bloggs@email.com"
            required
          />
          <InputField
            label="Company"
            name="company"
            type="text"
            placeholder="alex.bloggs@email.com"
            required
          />
          <div className="space-y-1">
            <Label>Who are you?</Label>
            <Select name="entity_type">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agency">Agency</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant={"primary"} type="submit" disabled={success}>
              {success ? "Success" : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
