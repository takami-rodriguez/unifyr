"use client";
import Link from "next/link";
import { getIcon, getShareLink, SocialPlatform } from "./_helpers";
import { primary } from "@/lib/colors";
import { usePathname } from "next/navigation";

const SocialShare = ({
  size = 32,
  className,
  fill = primary,
}: {
  fill?: string;
  size?: number;
  className?: string;
}) => {
  const pathname = usePathname();
  const shares = [
    SocialPlatform.Facebook,
    SocialPlatform.Twitter,
    SocialPlatform.LinkedIn,
    SocialPlatform.Email,
  ];
  const url = `${process.env.NEXT_PUBLIC_URL}${pathname}`;
  return (
    <div className="flex flex-col md:flex-row  pb-12 lg:pb-0  justify-center items-center lg:justify-end space-y-6 md:space-y-0 md:space-x-8 px-5 md:px-20">
      <p className="text-2xl font-bold">Share this article</p>
      <div className="flex items-center space-x-8 md:space-x-6 ">
        {shares.map((s, i) => (
          <Link
            key={s + i}
            href={getShareLink(url, s)}
            passHref
            className="h-8 w-8"
            aria-label={`${s} share link (opens in a new tab)"`}
            target="_blank"
          >
            {getIcon(s, { fill, size, className })}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
