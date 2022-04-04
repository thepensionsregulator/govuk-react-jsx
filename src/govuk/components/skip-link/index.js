import React, { useEffect } from 'react';

function SkipLink(props) {
  const { href, govukClassNames, className, children, ...attributes } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-skip-link'] =
    classNames['govuk-skip-link'] || 'govuk-skip-link';

  const skipLinkRef = React.createRef();

  useEffect(() => {
    (async () => {
      if (typeof document !== 'undefined') {
        const { default: SkipLinkJS } = await import(
          /* webpackChunkName: "govuk-frontend-skip-link" */
          /* webpackMode: "lazy" */
          /* webpackPrefetch: true */
          'govuk-frontend/govuk/components/skip-link/skip-link'
        );

        if (skipLinkRef.current) {
          new SkipLinkJS(skipLinkRef.current).init();
        }
      }
    })();
  }, [skipLinkRef]);

  return (
    <a
      href={href}
      className={`${classNames['govuk-skip-link']} ${className || ''}`}
      data-module="govuk-skip-link"
      ref={skipLinkRef}
      {...attributes}
    >
      {children}
    </a>
  );
}

SkipLink.defaultProps = {
  href: '#content',
};

export { SkipLink };
