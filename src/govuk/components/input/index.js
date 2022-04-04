import React from 'react';
import { Label, Hint, ErrorMessage } from '../..';

const Input = React.forwardRef((props, ref) => {
  const {
    govukClassNames,
    className,
    'aria-describedby': describedBy,
    errorMessage,
    formGroup,
    hint,
    label,
    name,
    id,
    prefix,
    suffix,
    ...attributes
  } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-input'] = classNames['govuk-input'] || 'govuk-input';
  classNames['govuk-input--error'] =
    classNames['govuk-input--error'] || 'govuk-input--error';
  classNames['govuk-form-group'] =
    classNames['govuk-form-group'] || 'govuk-form-group';
  classNames['govuk-form-group--error'] =
    classNames['govuk-form-group--error'] || 'govuk-form-group--error';
  classNames['govuk-input__wrapper'] =
    classNames['govuk-input__wrapper'] || 'govuk-input__wrapper';
  classNames['govuk-input__prefix'] =
    classNames['govuk-input__prefix'] || 'govuk-input__prefix';
  classNames['govuk-input__suffix'] =
    classNames['govuk-input__suffix'] || 'govuk-input__suffix';

  let describedByValue = describedBy || '';
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

  const input = (
    <input
      ref={ref}
      id={id}
      className={`${classNames['govuk-input']} ${className || ''} ${
        errorMessage ? ` ${classNames['govuk-input--error']}` : ''
      }`}
      name={name || id}
      aria-describedby={describedByValue || null}
      {...attributes}
    />
  );

  return (
    <div
      className={`${classNames['govuk-form-group']} ${
        formGroup?.className || ''
      } ${errorMessage ? classNames['govuk-form-group--error'] : ''} `}
    >
      <Label {...label} htmlFor={id} govukClassNames={govukClassNames} />
      {hintComponent}
      {errorMessageComponent}
      {prefix || suffix ? (
        <div className={classNames['govuk-input__wrapper']}>
          {prefix ? (
            <div
              aria-hidden="true"
              {...{
                ...prefix,
                className: `${classNames['govuk-input__prefix']} ${
                  prefix.className ? prefix.className : ''
                }`,
              }}
            />
          ) : null}

          {input}

          {suffix ? (
            <div
              aria-hidden="true"
              {...{
                ...suffix,
                className: `${classNames['govuk-input__suffix']} ${
                  suffix.className ? suffix.className : ''
                }`,
              }}
            />
          ) : null}
        </div>
      ) : (
        input
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.defaultProps = {
  type: 'text',
};

export { Input };
