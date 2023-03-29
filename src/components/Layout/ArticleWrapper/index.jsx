import { Header } from '../Header/Full';
import { Footer } from '../Footer';
import { LocaleProvider } from '../../ContextProviders/LocaleProvider';

export const ArticleWrapper = ({
  pageData,
  children,
}) => (
  <LocaleProvider pageData={pageData}>
    <Header />
    <main>{children}</main>
    <Footer />
  </LocaleProvider>
);
