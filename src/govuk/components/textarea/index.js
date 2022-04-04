import React from 'react';

import { Label, Hint, ErrorMessage } from '../..';

const Textarea = React.forwardRef((props, ref) => {
  const {
    govukClassNames,
    className,
    'aria-describedby': describedBy,
    errorMessage,
    formGroup,
    hint,
    label,
    id,
    ...attributes
  } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-form-group'] =
    classNames['govuk-form-group'] || 'govuk-form-group';
  classNames['govuk-form-group--error'] =
    classNames['govuk-form-group--error'] || 'govuk-form-group--error';
  classNames['govuk-textarea'] =
    classNames['govuk-textarea'] || 'govuk-textarea';
  classNames['govuk-textarea--error'] =
    classNames['govuk-textarea--error'] || 'govuk-textarea--error';

  let describedByValue = describedBy;
  let hintComponent;
  let errorMessageComponent;

  if (hint) {
    const hintId = `${id}-hint`;
    describedByValue += ` ${hintId}`;
    hintComponent = (
      <Hint {...hint} id={hintId} govukClassNames={govukClassNames} />
    );
  }

  if (errorMessage) {
    const errorId = id ? `${id}-error` : '';
    describedByValue += ` ${errorId}`;
    errorMessageComponent = (
      <ErrorMessage
        {...errorMessage}
        id={errorId}
        govukClassNames={govukClassNames}
      />
    );
  }

  return (
    <div
      className={`${classNames['govuk-form-group']}${
        errorMessage ? ` ${classNames['govuk-form-group--error']}` : ''
      } ${formGroup?.className || ''}`}
    >
      <Label {...label} htmlFor={id} govukClassNames={govukClassNames} />
      {hintComponent}
      {errorMessageComponent}
      <textarea
        {...attributes}
        id={id}
        ref={ref}
        className={`${classNames['govuk-textarea']}${
          errorMessage ? ` ${classNames['govuk-textarea--error']}` : ''
        } ${className || ''}`}
        aria-describedby={describedByValue.trim() || null}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  'aria-describedby': '',
  rows: 5,
  id: '',
  name: '',
};

export { Textarea };
