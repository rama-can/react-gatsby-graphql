import { ArticleHead } from '../../Head/ArticleHead.jsx';
import { Header } from '../Header/Full';
import { Footer } from '../Footer';
import { LocaleProvider } from '../../ContextProviders/LocaleProvider';

export const ArticleWrapper = ({
  pageData,
  seoTitle,
  seoDescription,
  seoImage,
  children,
}) => (
  <LocaleProvider pageData={pageData}>
    <ArticleHead
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImage}
    />
    <Header />
    <main>{children}</main>
    <Footer />
  </LocaleProvider>
);
