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



// type GetInTouchProps = {};

const GetInTouch = () => {
  return (
    <div className="bg-white rounded-md p-2  space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <InputField
          type="text"
          label="First Name"
          name="first_name"
          placeholder="Alex"
        />
        <InputField
          type="text"
          label="Last Name"
          name="last_name"
          placeholder="Bloggs"
        />
      </div>
      <InputField
        label="Email address"
        type="email"
        name="email"
        placeholder="alex.bloggs@email.com"
      />
      <InputField
        label="Company"
        name="company"
        type="text"
        placeholder="alex.bloggs@email.com"
      />
      <div className="space-y-1">
        <Label>Who are you?</Label>
        <Select>
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
        <Button variant={"secondary"} type="submit">Submit message</Button>
      </div>
    </div>
  );
};

export default GetInTouch;
