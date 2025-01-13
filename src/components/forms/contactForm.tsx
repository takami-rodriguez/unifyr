import { Label } from "@radix-ui/react-label";
import InputField from "./components/inputField";
import { Textarea } from "./components/textarea";
import { Button } from "../ui/button";
import { boxShadow } from "@/data/styleHelpers";

const ContactForm = () => {
  // const handleSubmit = (e: FormData) => {
  //   console.error("Handle Validation", "contact-form");
  //   console.log("Form submitted", "contact-form");
  // };
  return (
    <div>
      <form id="contact-form" action="/forms/1859">
        <div
          className="bg-white rounded-2xl py-10 px-14 space-y-6"
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
          />
          <div className="space-y-1">
            <Label>Message</Label>
            <Textarea placeholder="Your message" />
          </div>
          <div className="flex justify-end w-full">
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
