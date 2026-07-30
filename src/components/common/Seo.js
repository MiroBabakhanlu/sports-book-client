import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'AssuredBets';
const SITE_URL = 'https://assuredbets.example'; // TODO: replace with the real production domain once decided

export default function Seo({ title, description, path = '', jsonLd, noindex = false }) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Top Streak Generator`;
    const canonical = `${SITE_URL}${path}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            <link rel="canonical" href={canonical} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}

            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
        </Helmet>
    );
}
