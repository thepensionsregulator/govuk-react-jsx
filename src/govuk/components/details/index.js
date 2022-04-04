import React from 'react';

function Details(props) {
  const {
    govukClassNames,
    className,
    children,
    summaryChildren,
    ...attributes
  } = props;
  const classNames = govukClassNames || {};
  classNames['govuk-details'] = classNames['govuk-details'] || 'govuk-details';
  classNames['govuk-details__summary'] =
    classNames['govuk-details__summary'] || 'govuk-details__summary';
  classNames['govuk-details__summary-text'] =
    classNames['govuk-details__summary-text'] || 'govuk-details__summary-text';
  classNames['govuk-details__text'] =
    classNames['govuk-details__text'] || 'govuk-details__text';

  return (
    <details
      className={`${classNames['govuk-details']} ${className || ''}`}
      {...attributes}
      data-module="govuk-details"
    >
      <summary className={classNames['govuk-details__summary']}>
        <span className={classNames['govuk-details__summary-text']}>
          {summaryChildren}
        </span>
      </summary>
      <div className={classNames['govuk-details__text']}>{children}</div>
    </details>
  );
}

export { Details };
