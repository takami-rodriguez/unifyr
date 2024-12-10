import { Label } from "@radix-ui/react-label";
import InputField from "./components/inputField";
import { Textarea } from "./components/textarea";
import { Button } from "../ui/button";
import FormWrapper from "./components/formWrapper";



// type ContactFormProps = {};

const ContactForm = () => {
  return (
    <FormWrapper id="contact-form">
      <div className="bg-white rounded-md p-2 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InputField label="First Name" name="first_name" placeholder="Alex" />
          <InputField label="Last Name" name="last_name" placeholder="Bloggs" />
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
        <Button variant={"primary"} type="submit" className="w-full">
          Submit message
        </Button>
      </div>
    </FormWrapper>
  );
};

export default ContactForm;
