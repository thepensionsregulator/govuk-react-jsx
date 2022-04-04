import React from 'react';

function Panel(props) {
  const {
    headingLevel,
    children,
    govukClassNames,
    className,
    titleChildren,
    ...attributes
  } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-panel'] = classNames['govuk-panel'] || 'govuk-panel';
  classNames['govuk-panel__body'] =
    classNames['govuk-panel__body'] || 'govuk-panel__body';
  classNames['govuk-panel--confirmation'] =
    classNames['govuk-panel--confirmation'] || 'govuk-panel--confirmation';
  classNames['govuk-panel__title'] =
    classNames['govuk-panel__title'] || 'govuk-panel__title';

  const HeadingLevel = headingLevel ? `h${headingLevel}` : 'h1';

  const innerHtml = children ? (
    <div className={classNames['govuk-panel__body']}>{children}</div>
  ) : null;

  return (
    <div
      className={`${classNames['govuk-panel']} ${
        classNames['govuk-panel--confirmation']
      } ${className || ''}`}
      {...attributes}
    >
      <HeadingLevel className={classNames['govuk-panel__title']}>
        {titleChildren}
      </HeadingLevel>
      {innerHtml}
    </div>
  );
}

export { Panel };
