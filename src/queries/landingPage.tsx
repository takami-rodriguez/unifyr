import { g2Data, LandingPageProps } from "@/data/landingPages";

export enum LandingPageSlug {
  g2 = "g2",
}

export const sendFormData = async (formdata: FormData, id: string) => {
  const query = new URLSearchParams(window.location.search);
  const url = new URL(`${process.env.NEXT_PUBLIC_URL}/forms/${id}`);
  query.forEach((v, k) => url.searchParams.append(k, v));

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  const urlparams = new URLSearchParams(
    Array.from(formdata.entries()).map(([k, v]) => {
      return [k, v as string];
    }),
  );

  return await fetch(url, {
    method: "POST",
    headers,
    body: urlparams,
  });
};

export const getAllLPPageSlugs = (): {slug:string}[] => {
  return Object.values(LandingPageSlug).map((slug) => ({slug}));
};

export const getLPData = async (
  slug: LandingPageSlug,
): Promise<LandingPageProps> => {
  switch (slug) {
    case LandingPageSlug.g2:
      return g2Data;
    default:
      return g2Data;
  }
};
