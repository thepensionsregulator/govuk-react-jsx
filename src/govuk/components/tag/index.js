import React from 'react';

function Tag(props) {
  const { children, govukClassNames, className, ...attributes } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-tag'] = classNames['govuk-tag'] || 'govuk-tag';

  return (
    <strong
      className={`${classNames['govuk-tag']} ${className || ''}`}
      {...attributes}
    >
      {children}
    </strong>
  );
}

export { Tag };
