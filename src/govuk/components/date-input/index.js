import React from 'react';
import { Hint, ErrorMessage, Fieldset, Input } from '../..';

function DateInput(props) {
  const {
    govukClassNames,
    className,
    errorMessage,
    fieldset,
    formGroup,
    hint,
    id,
    items,
    namePrefix,
    onChange,
    ...attributes
  } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-input--width-2'] =
    classNames['govuk-input--width-2'] || 'govuk-input--width-2';
  classNames['govuk-input--width-4'] =
    classNames['govuk-input--width-4'] || 'govuk-input--width-4';
  classNames['govuk-date-input'] =
    classNames['govuk-date-input'] || 'govuk-date-input';
  classNames['govuk-date-input__item'] =
    classNames['govuk-date-input__item'] || 'govuk-date-input__item';
  classNames['govuk-date-input__label'] =
    classNames['govuk-date-input__label'] || 'govuk-date-input__label';
  classNames['govuk-date-input__input'] =
    classNames['govuk-date-input__input'] || 'govuk-date-input__input';
  classNames['govuk-form-group'] =
    classNames['govuk-form-group'] || 'govuk-form-group';
  classNames['govuk-form-group--error'] =
    classNames['govuk-form-group--error'] || 'govuk-form-group--error';

  let describedBy = fieldset?.['aria-describedby']
    ? fieldset['aria-describedby']
    : '';

  let hintComponent;
  let errorMessageComponent;
  let dateInputItems = [];

  if (hint) {
    const hintId = `${id}-hint`;
    describedBy += ` ${hintId}`;
    hintComponent = (
      <Hint {...hint} id={hintId} govukClassNames={govukClassNames} />
    );
  }

  if (errorMessage) {
    const errorId = id ? `${id}-error` : '';
    describedBy += ` ${errorId}`;
    errorMessageComponent = (
      <ErrorMessage
        {...errorMessage}
        id={errorId}
        govukClassNames={govukClassNames}
      />
    );
  }

  if (items && items.length > 0) {
    dateInputItems = items;
  } else {
    dateInputItems = [
      {
        name: 'day',
        className: classNames['govuk-input--width-2'],
        type: 'text',
      },
      {
        name: 'month',
        className: classNames['govuk-input--width-2'],
        type: 'text',
      },
      {
        name: 'year',
        className: classNames['govuk-input--width-4'],
        type: 'text',
      },
    ];
  }

  const itemComponents = dateInputItems
    .filter((item) => item)
    .map((item, index) => {
      const {
        name: itemName,
        inputMode: itemInputMode,
        label: itemLabel,
        reactListKey: itemReactListKey,
        id: itemId,
        className: itemClassName,
        pattern: itemPattern,
        ...itemAttributes
      } = item;

      return (
        <div
          key={itemReactListKey || index}
          className={classNames['govuk-date-input__item']}
        >
          <Input
            onChange={onChange}
            {...itemAttributes}
            label={{
              children:
                itemLabel ||
                itemName.charAt(0).toUpperCase() + itemName.slice(1),
              className: classNames['govuk-date-input__label'],
            }}
            id={itemId || `${id}-${itemName}`}
            className={`${classNames['govuk-date-input__input']} ${
              itemClassName || ''
            }`}
            name={namePrefix ? `${namePrefix}-${itemName}` : itemName}
            type="text"
            inputMode={itemInputMode || 'numeric'}
            pattern={itemPattern || '[0-9]*'}
            govukClassNames={govukClassNames}
          />
        </div>
      );
    });

  const innerHtml = (
    <>
      {hintComponent}
      {errorMessageComponent}
      <div
        className={`${classNames['govuk-date-input']} ${className || ''}`}
        {...attributes}
        id={id}
      >
        {itemComponents}
      </div>
    </>
  );

  return (
    <div
      className={`${classNames['govuk-form-group']}${
        errorMessage ? ` ${classNames['govuk-form-group--error']}` : ''
      } ${formGroup?.className || ''}`}
    >
      {fieldset ? (
        <Fieldset
          {...fieldset}
          aria-describedby={describedBy || null}
          role="group"
          govukClassNames={govukClassNames}
        >
          {innerHtml}
        </Fieldset>
      ) : (
        <>{innerHtml}</>
      )}
    </div>
  );
}

export { DateInput };
