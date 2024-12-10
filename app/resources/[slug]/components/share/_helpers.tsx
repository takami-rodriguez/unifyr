import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

export enum SocialPlatform {
  Facebook = "Facebook",
  Twitter = "Twitter",
  LinkedIn = "LinkedIn",
  Instagram = "Instagram",
  Email = "Email",
}

export const getShareLink = (url: string, platform: string) => {
  switch (platform) {
    case "Facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`;
    case "Twitter":
      return `https://twitter.com/intent/tweet?text=Careology&url=${url}`;
    case "LinkedIn":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    case "Email":
      return `mailto:?subject=Check out this article&body=${encodeURIComponent(
        url
      )}`;
    default:
      return "";
  }
};
// https://www.facebook.com/sharer/sharer.php?u=https://the-digital-reader.com/how-to-make-your-own-custom-share-links-buttons-for-facebook-and-twitter

export const getIcon = (
  socialType: SocialPlatform,
  props: { size?: number; fill?: string; className?: string }
) => {
  switch (socialType) {
    case SocialPlatform.Facebook:
      return <FaFacebook {...props} />;
    case SocialPlatform.Twitter:
      return <BsTwitterX {...props} />;
    case SocialPlatform.LinkedIn:
      return <FaLinkedin {...props} />;
    case SocialPlatform.Instagram:
      return <FaInstagram {...props} />;
    case SocialPlatform.Email:
      return <FaEnvelope {...props} />;
    default:
      return <></>;
  }
};
