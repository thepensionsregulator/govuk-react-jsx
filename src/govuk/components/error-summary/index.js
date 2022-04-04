import React, { useEffect } from 'react';

const defaultRef = React.createRef();

const ErrorSummary = React.forwardRef((props, ref) => {
  const {
    govukClassNames,
    className,
    descriptionChildren,
    errorList,
    titleChildren,
    disableAutoFocus,
    ...attributes
  } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-error-summary'] =
    classNames['govuk-error-summary'] || 'govuk-error-summary';
  classNames['govuk-error-summary__title'] =
    classNames['govuk-error-summary__title'] || 'govuk-error-summary__title';
  classNames['govuk-error-summary__body'] =
    classNames['govuk-error-summary__body'] || 'govuk-error-summary__body';
  classNames['govuk-list'] = classNames['govuk-list'] || 'govuk-list';
  classNames['govuk-error-summary__list'] =
    classNames['govuk-error-summary__list'] || 'govuk-error-summary__list';

  const errorSummaryRef = ref || defaultRef;

  useEffect(() => {
    (async () => {
      if (typeof document !== 'undefined') {
        const { default: ErrorSummaryJS } = await import(
          /* webpackChunkName: "govuk-frontend-error-summary" */
          /* webpackMode: "lazy" */
          /* webpackPrefetch: true */
          'govuk-frontend/govuk/components/error-summary/error-summary'
        );

        if (errorSummaryRef.current) {
          // Just bind the click event handlers from the gov error summary
          // This is because we don't want to focus by default - that's up to the calling app
          errorSummaryRef.current.addEventListener(
            'click',
            ErrorSummaryJS.prototype.handleClick.bind(ErrorSummaryJS.prototype)
          );
        }
      }
    })();
  }, [errorSummaryRef]);

  let description;
  if (descriptionChildren) {
    description = <p>{descriptionChildren}</p>;
  }

  return (
    <div
      className={`${classNames['govuk-error-summary']} ${className || ''}`}
      aria-labelledby="error-summary-title"
      role="alert"
      data-disable-auto-focus={disableAutoFocus ? 'true' : null}
      {...attributes}
      data-module="govuk-error-summary"
      ref={errorSummaryRef}
    >
      <h2
        className={classNames['govuk-error-summary__title']}
        id="error-summary-title"
      >
        {titleChildren}
      </h2>
      <div className={classNames['govuk-error-summary__body']}>
        {description}
        <ul
          className={`${classNames['govuk-list']} ${classNames['govuk-error-summary__list']}`}
        >
          {errorList
            ? errorList.map((error, index) => {
                const { reactListKey, children, href, ...errorAttributes } =
                  error;

                return (
                  <li key={reactListKey || index}>
                    {href ? (
                      <a {...errorAttributes} href={href}>
                        {children}
                      </a>
                    ) : (
                      <>{children}</>
                    )}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
});

ErrorSummary.defaultProps = {
  titleChildren: 'There is a problem',
};

ErrorSummary.displayName = 'ErrorSummary';

export { ErrorSummary };
