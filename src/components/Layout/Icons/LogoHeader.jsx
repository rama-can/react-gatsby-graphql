import { graphql, useStaticQuery } from 'gatsby';

export const LogoHeader = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsSeoAndPwa {
        seoAndPwaNodes: nodes {
          locale
          siteName
          pwaIcon {
            url
          }
        }
      }
    }
  `);

  const {
    allDatoCmsSeoAndPwa: { seoAndPwaNodes },
  } = data;

  return (
    <div>
      <img src={seoAndPwaNodes[0].pwaIcon.url}
        alt={seoAndPwaNodes[0].siteName}
        className='logo'
      />
    </div>
  );
};
