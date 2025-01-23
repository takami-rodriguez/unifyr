import { Label } from "@radix-ui/react-label";
import InputField from "./components/inputField";
import { Textarea } from "./components/textarea";
import { Button } from "../ui/button";
import { boxShadow } from "@/data/styleHelpers";
import { FormEvent } from "react";

const ContactForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.error("Handle Validation", "contact-form");
    console.log("Form submitted", "contact-form");
  };
  return (
    <div>
      <form id="1859" onSubmit={handleSubmit}>
        <div
          className="space-y-6 rounded-2xl bg-white px-14 py-10"
          style={boxShadow}
        >
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="first_name"
              placeholder="Alex"
            />
            <InputField
              label="Last Name"
              name="last_name"
              placeholder="Bloggs"
            />
          </div>
          <InputField
            label="Email address"
            name="email"
            placeholder="alex.bloggs@email.com"
            required
          />
          <div className="space-y-1">
            <Label>Message</Label>
            <Textarea placeholder="Your message" />
          </div>
          <div className="flex w-full justify-end">
            <Button variant={"primary"} type="submit">
              Submit message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
