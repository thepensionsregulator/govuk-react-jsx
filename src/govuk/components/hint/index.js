import React from 'react';

function Hint(props) {
  const { govukClassNames, className, children, ...attributes } = props;
	const classNames = govukClassNames || {};
  classNames['govuk-hint'] = classNames['govuk-hint'] || 'govuk-hint';
  
  return (
    <div
      className={`${classNames['govuk-hint']} ${className || ''}`}
      {...attributes}
    >
      {children}
    </div>
  );
}
export { Hint };
