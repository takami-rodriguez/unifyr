import React from 'react'
import { getDynamicPageSEOData } from '@/lib/seoHelper';
import { PageProps } from '@/types/page';
import { SEOData } from '@/types/seo';
import { Metadata, ResolvingMetadata } from 'next';

const metaData: SEOData = {
  title: "",
  plugin: "",
  og_image: "",
  og_title: "",
  description: "",
  twitter_image: "",
  twitter_title: "",
  og_description: "",
  twitter_description: "",
}

export async function generateMetadata(
{ params: {  } }: PageProps,
parent: ResolvingMetadata
): Promise<Metadata> {
return getDynamicPageSEOData(metaData,parent);
}

const PrivacyPolicy = async () => {
    return (
      <div>
        Privacy
    </div>
  )
};

export default PrivacyPolicy;