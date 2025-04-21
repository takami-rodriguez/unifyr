import AccordionBase from "./accordion";
import AccordionSection from "./section";

const Accordion = AccordionBase as typeof AccordionBase & {
  Section: typeof AccordionSection;
};
Accordion.Section = AccordionSection;

export default Accordion;
