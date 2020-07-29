import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import favicon from 'govuk-frontend/govuk/assets/images/favicon.ico';
import govukMaskIcon from 'govuk-frontend/govuk/assets/images/govuk-mask-icon.svg';
import appleTouchIcon180 from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-180x180.png';
import appleTouchIcon167 from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-167x167.png';
import appleTouchIcon152 from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon-152x152.png';
import appleTouchIcon from 'govuk-frontend/govuk/assets/images/govuk-apple-touch-icon.png';
import govukOpenGraphImage from 'govuk-frontend/govuk/assets/images/govuk-opengraph-image.png';

import { SkipLink, Header, Footer } from '..';

function Template(props) {
  const {
    children,
    htmlLang,
    htmlClassName,
    pageTitle,
    pageTitleLang,
    headIcons,
    head,
    skiplink,
    bodyStart,
    header,
    footer,
    beforeContent,
    mainLang,
    containerClassName,
    mainClassName,
    themeColor,
    bodyEnd,
  } = props;

  useEffect(() => {
    document.documentElement.classList.add('govuk-template');
    document.body.classList.add('js-enabled', 'govuk-template__body');
  }, []);

  return (
    <>
      <Helmet>
        <html className={`govuk-template ${htmlClassName}`} lang={htmlLang} />

        <title {...(pageTitleLang && { lang: pageTitleLang })}>
          {pageTitle}
        </title>

        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0b0c0c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {headIcons || (
          <>
            <link
              rel="shortcut icon"
              sizes="16x16 32x32 48x48"
              href={favicon}
              type="image/x-icon"
            />
            <link
              rel="mask-icon"
              href={govukMaskIcon}
              color={themeColor || '#0b0c0c'}
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href={appleTouchIcon180}
            />
            <link
              rel="apple-touch-icon"
              sizes="167x167"
              href={appleTouchIcon167}
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href={appleTouchIcon152}
            />
            <link rel="apple-touch-icon" href={appleTouchIcon} />
          </>
        )}

        {head}

        <meta property="og:image" content={govukOpenGraphImage} />
      </Helmet>

      {bodyStart}

      <SkipLink {...skiplink} />

      <Header {...header} />

      <div className={`govuk-width-container ${containerClassName || ''}`}>
        {beforeContent}
        <main
          className={`govuk-main-wrapper ${mainClassName || ''}`}
          id="main-content"
          role="main"
          lang={mainLang || null}
        >
          {children}
        </main>
      </div>

      <Footer {...footer} />

      {bodyEnd}
    </>
  );
}

Template.defaultProps = {
  htmlLang: 'en',
  htmlClassName: '',
  pageTitle:
    'GOV.UK - The best place to find government services and information',
  pageTitleLang: null,
  headIcons: null,
  head: null,
  bodyStart: null,
  skipLink: {
    href: '#main-content',
    text: 'Skip to main content',
  },
  header: {},
  footer: {},
  beforeContent: null,
  bodyEnd: null,
};

export { Template };
