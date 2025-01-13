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

const GetInTouch = () => {
  return (
    <div>
      <form id="contact-form" action="/forms/1859" method={"POST"}>
        <div
          className="bg-white rounded-2xl py-10 px-14 space-y-6"
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
            <Button variant={"primary"} type="submit">
              Submit message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
