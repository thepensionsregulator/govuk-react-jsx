import React from 'react';

function InsetText(props) {
  const { govukClassNames, className, children, ...attributes } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-inset-text'] =
    classNames['govuk-inset-text'] || 'govuk-inset-text';

  return (
    <div
      className={`${classNames['govuk-inset-text']} ${className || ''}`}
      {...attributes}
    >
      {children}
    </div>
  );
}

export { InsetText };
