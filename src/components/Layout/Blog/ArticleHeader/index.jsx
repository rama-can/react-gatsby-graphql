// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { useLocales } from '../../../../hooks/useLocales';
import {
  ArticleTitle,
  ArticleSubtitle,
} from '../../sharedStyles/headingStyles';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from '../../Icons/SocialIcons';
import { formatDateTime } from '../../../../functions/formatDateTime';
import { useTextDirection } from '../../../../hooks/useTextDirection';
import { usePageLocale } from '../../../../hooks/usePageLocale';
import { Navigator } from '../../../Navigator';
import { BackToBlog } from '../BackToBlog';

import {
  Wrapper,
  AuthorDateContainer,
  Author,
  ImgFullWrapper,
  ImgWrapper,
  AuthorImg,
  ArticleCover,
  SharingIcons,
  Icon,
  Dot,
  CategoryBox,
  LastModified,
} from './styles';
import { useFormattedDate } from '../../../../hooks/useFormattedDate';

const commonExtLinkProps = {
  rel: 'noreferrer',
  target: '_blank',
};

export const ArticleHeader = ({
  authorName,
  seoTitle,
  seoDescription,
  title,
  subtitle,
  authorImg,
  coverImg,
  lastModified,
  lastModifiedText,
  firstPublish,
  category,
  
}) => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsSeoAndPwa {
        seoAndPwaNodes: nodes {
          locale
          siteName
          separator
          fallbackDescription
          defaultOgImage {
            url
          }
          pwaThemeColor {
            themeHexColor: hex
          }
        }
      }
    }
  `);

  const {
    allDatoCmsSeoAndPwa: { seoAndPwaNodes },
  } = data;

  const { href } = useLocation();
  const { pageLocale } = usePageLocale();
  const { defaultLocale } = useLocales();

  const { isRtl } = useTextDirection();

  const seoAndPwaNodesMatch = seoAndPwaNodes.find(
    ({ locale }) => locale === pageLocale
  );

  const {
    siteName,
    separator,
    fallbackDescription,
    defaultOgImage: { url: defaultImgUrl },
    pwaThemeColor: { themeHexColor },
  } = seoAndPwaNodesMatch;
  
  const titleContent = seoTitle
    ? `${seoTitle} ${separator} ${siteName}`
    : siteName;

  const SocialIcons = [
    {
      svgIcon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
    },
    {
      svgIcon: <TwitterIcon />,
      href: `https://twitter.com/share?url=${href}`,
    },
    {
      svgIcon: <LinkedinIcon />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
    },
  ];

  const openGraphTags = [
    {
      properties: ['og:title', 'twitter:title'],
      content: titleContent,
    },
    {
      properties: ['og:description', 'twitter:description'],
      content: seoDescription || fallbackDescription,
    },
    {
      properties: ['og:image', 'twitter:image'],
      content: coverImg || defaultImgUrl,
    },
    { properties: ['og:url', 'twitter:url'], content: href },
  ];

  const pwaIconSizes = ['192', '512'];

  const { formattedDate } = useFormattedDate(firstPublish);

  return (
    <>
    <Helmet>
      {/* HTML lang and dir attrs */}

      <html lang={pageLocale} dir={isRtl ? 'rtl' : 'ltr'} />

      {/* PWA */}

      <meta name="theme-color" content={themeHexColor} />
      <link
        rel="manifest"
        href={(() => {
          if (pageLocale === defaultLocale) return '/manifest.webmanifest';
          return `/manifest_${pageLocale}.webmanifest`;
        })()}
        crossOrigin="anonymous"
      />
      <link rel="icon" href="/favicon-32.png" type="image/png" />
      {pwaIconSizes.map((size) => (
        <link
          key={`icon-${size}`}
          rel="apple-touch-icon"
          sizes={`${size}x${size}`}
          href={`/images/icon-${size}.png`}
        />
      ))}

      {/* SEO meta tags */}
      
      <title>{titleContent}</title>
      <meta
        name="description"
        content={seoDescription || fallbackDescription}
      />
      <meta property="og:type" content="article" />
      {openGraphTags.map(({ properties, content }) =>
        properties.map((property) => (
          <meta key={property} property={property} content={content} />
        ))
      )}
      <meta name="author" content={siteName}/>
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
      <Wrapper>
        <BackToBlog />
        {category && (
          <CategoryBox>
            <Navigator recordId={category.id}>{category.title}</Navigator>
          </CategoryBox>
        )}
        <AuthorDateContainer>
          {authorName && (
            <>
              <Author>{authorName}</Author>
              <Dot />
            </>
          )}
          <Author as="time">{formattedDate}</Author>
        </AuthorDateContainer>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleSubtitle>{subtitle}</ArticleSubtitle>
        <LastModified>
          {`${lastModifiedText}: ${formatDateTime(lastModified, pageLocale)}`}
        </LastModified>
      </Wrapper>
      <ImgFullWrapper $isRtl={isRtl}>
        <ImgWrapper>
          <AuthorImg
            as={!authorImg && 'div'}
            style={{ visibility: !authorImg && 'hidden' }}
            image={authorImg}
            alt={authorName}
          />
          <ArticleCover $isRtl={isRtl} image={coverImg} alt={title} />
        </ImgWrapper>
        <SharingIcons>
          {SocialIcons.map(({ svgIcon, href: socialHref }, index) => (
            <Icon
              {...commonExtLinkProps}
              href={socialHref}
              key={`socialIcon_${index}`}
            >
              {svgIcon}
            </Icon>
          ))}
        </SharingIcons>
      </ImgFullWrapper>
    </>
  );
};
