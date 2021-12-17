import React from 'react';
import { Label, Hint, ErrorMessage } from '../..';

const Select = React.forwardRef((props, ref) => {
  const {
    govukClassNames,
    className,
    'aria-describedby': describedBy,
    errorMessage,
    formGroup,
    hint,
    id,
    items,
    label,
    ...attributes
  } = props;

  let describedByValue = describedBy || '';
  let hintComponent;
  let errorMessageComponent;
  const classNames = govukClassNames || {};
  classNames['govuk-form-group'] = classNames['govuk-form-group'] || 'govuk-form-group';
  classNames['govuk-form-group--error'] = classNames['govuk-form-group--error'] || 'govuk-form-group--error';
  classNames['govuk-select'] = classNames['govuk-select'] || 'govuk-select';
  classNames['govuk-select--error'] = classNames['govuk-select--error'] || 'govuk-select--error';

  if (hint) {
    const hintId = `${id}-hint`;
    describedByValue += ` ${hintId}`;
    hintComponent = <Hint govukClassNames={classNames} {...hint} id={hintId} />;
  }

  if (errorMessage) {
    const errorId = id ? `${id}-error` : '';
    describedByValue += ` ${errorId}`;
    errorMessageComponent = (
      <ErrorMessage
        govukClassNames={classNames}
        {...errorMessage}
        id={errorId}
      />
    );
  }

  const options = items
    ? items
        .filter((item) => item)
        .map((option, index) => {
          const { reactListKey, children, ...optionAttributes } = option;
          return (
            <option {...optionAttributes} key={reactListKey || index}>
              {children}
            </option>
          );
        })
    : null;

  return (
    <div
      className={`${classNames['govuk-form-group']}${
        errorMessage ? ` ${classNames['govuk-form-group--error']}` : ''
      } ${formGroup?.className || ''}`}
    >
      <Label govukClassNames={classNames} {...label} htmlFor={id} />
      {hintComponent}
      {errorMessageComponent}
      <select
        className={`${classNames['govuk-select']} ${className || ''}${
          errorMessage ? ` ${classNames['govuk-select--error']}` : ''
        }`}
        id={id}
        ref={ref}
        aria-describedby={describedByValue || null}
        {...attributes}
      >
        {options}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
