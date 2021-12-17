import React from 'react';

function ErrorMessage(props) {
  const {
    govukClassNames,
    className,
    children,
    visuallyHiddenText,
    ...attributes
  } = props;
  const classNames = govukClassNames || {};
  classNames['govuk-visually-hidden'] = classNames['govuk-visually-hidden'] || 'govuk-visually-hidden';
  classNames['govuk-error-message'] = classNames['govuk-error-message'] || 'govuk-error-message';

  let visuallyHiddenTextComponent;
  if (visuallyHiddenText) {
    visuallyHiddenTextComponent = (
      <span className={classNames['govuk-visually-hidden']}>
        {visuallyHiddenText}:{' '}
      </span>
    );
  }

  return (
    <span
      className={`${classNames['govuk-error-message']} ${className || ''}`}
      {...attributes}
    >
      {visuallyHiddenTextComponent}
      {children}
    </span>
  );
}

ErrorMessage.defaultProps = {
  visuallyHiddenText: 'Error',
};

export { ErrorMessage };
