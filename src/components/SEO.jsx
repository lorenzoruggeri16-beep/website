import { Helmet } from "react-helmet-async";
import { SITE } from "../config/site";

export default function SEO({
  title,
  description = SITE.description,
  image = SITE.image,
  url = "",
  type = "website",
}) {
  const canonicalUrl = url
    ? `${SITE.url}${url}`
    : SITE.url;

  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE.url}${image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: SITE.name,
    image: imageUrl,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tenerife",
      addressRegion: "Canary Islands",
      addressCountry: "ES",
    },
    sameAs: [
      SITE.instagram,
    ],
  };

  return (
    <Helmet>

      {/* Basic SEO */}
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content="
        Tenerife Photographer,
        Wedding Photographer Tenerife,
        Couple Photographer Tenerife,
        Family Photographer Tenerife,
        Luxury Photography,
        Golden Light Studio
        "
      />

      <meta
        name="author"
        content={SITE.name}
      />

      <meta
        name="robots"
        content="index,follow"
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:site_name"
        content={SITE.name}
      />

      <meta
        property="og:locale"
        content="en_GB"
      />

      {/* Twitter */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />

      {/* Theme */}

      <meta
        name="theme-color"
        content="#f8f6f2"
      />

      {/* Structured Data */}

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

    </Helmet>
  );
}