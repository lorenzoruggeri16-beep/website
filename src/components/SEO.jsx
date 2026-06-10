import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  image = "/images/hero.jpg",
  url = "https://goldenlightstudio.com",
}) {

  return (

    <Helmet>

      {/* Basic SEO */}
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
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
        content={image}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:site_name"
        content="Golden Light Studio"
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
        content={image}
      />

      {/* Theme */}
      <meta
        name="theme-color"
        content="#f8f6f2"
      />

    </Helmet>

  );

}