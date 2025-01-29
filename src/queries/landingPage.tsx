import { g2Data, LandingPageProps } from "@/data/landingPages";


export const getLPData = async (slug:string): Promise<LandingPageProps> => {
 switch(slug){
      case "g2":
          return g2Data;
      default:
          return g2Data;
  } 
       
}