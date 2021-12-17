import React from 'react';

function Label(props) {
  const {
    govukClassNames,
    className,
    htmlFor,
    children,
    isPageHeading,
    ...attributes
  } = props;

  // If no children, just don't output anything
  if (!children) {
    return null;
  }

  const classNames = govukClassNames || {};
  classNames['govuk-label'] = classNames['govuk-label'] || 'govuk-label';
  classNames['govuk-label-wrapper'] = classNames['govuk-label-wrapper'] || 'govuk-label-wrapper';

  const label = (
    // Stop eslint flagging the for/id combination as an error. It is failing due to the way the
    // input and label are located in different components and so it cannot track the association
    //
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      className={`${classNames['govuk-label']} ${className || ''}`}
      {...attributes}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );

  if (isPageHeading === true) {
    return <h1 className={classNames['govuk-label-wrapper']}>{label}</h1>;
  }

  return label;
}

export { Label };
