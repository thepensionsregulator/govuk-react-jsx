import React, { useEffect, useRef } from 'react';
import { ErrorMessage, Fieldset, Hint, Label } from '../govuk';
import omit from './omitKey';

function Boolean(props) {
  const {
    govukClassNames,
    className,
    errorMessage,
    fieldset,
    formGroup,
    hint,
    idPrefix,
    items,
    controlType,
    name,
    onChange,
    onBlur,
    'aria-describedby': describedByProp,
    ...attributes
  } = props;
  const classNames = govukClassNames || {};
  classNames[`govuk-${controlType}`] =
    classNames[`govuk-${controlType}`] || `govuk-${controlType}`;
  classNames[`govuk-${controlType}__divider`] =
    classNames[`govuk-${controlType}__divider`] ||
    `govuk-${controlType}__divider`;
  classNames[`govuk-${controlType}__item`] =
    classNames[`govuk-${controlType}__item`] || `govuk-${controlType}__item`;
  classNames[`govuk-${controlType}__input`] =
    classNames[`govuk-${controlType}__input`] || `govuk-${controlType}__input`;
  classNames[`govuk-${controlType}__label`] =
    classNames[`govuk-${controlType}__label`] || `govuk-${controlType}__label`;
  classNames[`govuk-${controlType}__hint`] =
    classNames[`govuk-${controlType}__hint`] || `govuk-${controlType}__hint`;
  classNames[`govuk-${controlType}__conditional`] =
    classNames[`govuk-${controlType}__conditional`] ||
    `govuk-${controlType}__conditional`;
  classNames[`govuk-${controlType}__conditional--hidden`] =
    classNames[`govuk-${controlType}__conditional--hidden`] ||
    `govuk-${controlType}__conditional--hidden`;
  classNames['govuk-form-group'] =
    classNames['govuk-form-group'] || 'govuk-form-group';
  classNames['govuk-form-group--error'] =
    classNames['govuk-form-group--error'] || 'govuk-form-group--error';

  const controlRef = useRef();
  const idPrefixValue = idPrefix || name;
  let describedBy = describedByProp || '';
  if (fieldset?.['aria-describedby']) {
    describedBy = fieldset['aria-describedby'];
  }

  let hintComponent;
  let errorMessageComponent;

  useEffect(() => {
    (async () => {
      switch (controlType) {
        case 'radios':
          if (typeof document !== 'undefined') {
            const { default: RadiosJS } = await import(
              /* webpackChunkName: "govuk-frontend-radios" */
              /* webpackMode: "lazy" */
              /* webpackPrefetch: true */
              'govuk-frontend/govuk/components/radios/radios'
            );

            if (controlRef.current) {
              new RadiosJS(controlRef.current).init();
            }
          }
          break;
        case 'checkboxes':
          if (typeof document !== 'undefined') {
            const { default: CheckboxesJS } = await import(
              /* webpackChunkName: "govuk-frontend-checkboxes" */
              /* webpackMode: "lazy" */
              /* webpackPrefetch: true */
              'govuk-frontend/govuk/components/checkboxes/checkboxes'
            );

            if (controlRef.current) {
              new CheckboxesJS(controlRef.current).init();
            }
          }
          break;

        default:
      }
    })();
  }, [controlRef, controlType]);

  if (hint) {
    const hintId = `${idPrefixValue}-hint`;
    describedBy += ` ${hintId}`;

    hintComponent = (
      <Hint {...hint} id={hintId} govukClassNames={govukClassNames} />
    );
  }

  const hasFieldset = !!fieldset;

  if (errorMessage) {
    const errorId = `${idPrefixValue}-error`;
    describedBy += ` ${errorId}`;
    errorMessageComponent = (
      <ErrorMessage
        {...errorMessage}
        id={errorId}
        govukClassNames={govukClassNames}
      />
    );
  }

  const innerHtml = (
    <>
      {hintComponent}
      {errorMessageComponent}

      <div
        className={`${classNames[`govuk-${controlType}`]} ${className || ''}`}
        {...attributes}
        ref={controlRef}
        data-module={`govuk-${controlType}`}
      >
        {items &&
          items.map((item, index) => {
            if (!item) {
              return null;
            }

            if (item.behaviour === 'exclusive') {
              // Forcibly disable the "exclusive" behaviour introduced in https://github.com/alphagov/govuk-frontend/pull/2151 since it cannot work in React
              // The upstream JS cannot manipulate the checked state of controls without it causing problems
              // At the moment, if a service needs this behaviour they should implement it themselves in the application code
              delete item.behaviour;
            }

            const {
              id,
              children,
              hint: itemHint,
              conditional: itemConditional,
              behaviour,
              label,
              reactListKey,
              ...itemAttributes
            } = item;

            const idSuffix = `-${index + 1}`;
            const idValue =
              id || `${idPrefixValue}${index === 0 ? '' : idSuffix}`;
            const nameValue = item.name ? item.name : name;
            const conditionalId = itemConditional?.children
              ? `conditional-${idValue}`
              : null;
            const itemHintId = `${idValue}-item-hint`;

            let itemDescribedBy = '';

            if (controlType === 'checkboxes' && !hasFieldset) {
              itemDescribedBy = describedBy;
            }

            if (itemHint) {
              itemDescribedBy += ` ${itemHintId}`;
            }

            if (item.divider) {
              return (
                <div
                  key={reactListKey || index}
                  className={classNames[`govuk-${controlType}__divider`]}
                >
                  {item.divider}
                </div>
              );
            }

            return (
              <React.Fragment key={reactListKey || index}>
                <div className={classNames[`govuk-${controlType}__item`]}>
                  <input
                    className={classNames[`govuk-${controlType}__input`]}
                    id={idValue}
                    name={nameValue}
                    type={controlType === 'radios' ? 'radio' : 'checkbox'}
                    data-aria-controls={conditionalId}
                    aria-describedby={itemDescribedBy || null}
                    onChange={onChange}
                    onBlur={onBlur}
                    data-behaviour={behaviour}
                    {...itemAttributes}
                  />
                  <Label
                    {...{
                      ...label,
                      className: `${
                        classNames[`govuk-${controlType}__label`]
                      } ${label?.className || ''}`,
                      htmlFor: idValue,
                      isPageHeading: false,
                      govukClassNames,
                    }}
                  >
                    {children}
                  </Label>
                  {itemHint ? (
                    <Hint
                      {...{
                        ...itemHint,
                        className: `${
                          classNames[`govuk-${controlType}__hint`]
                        } ${itemHint.className || ''}`,
                      }}
                      id={itemHintId}
                      govukClassNames={govukClassNames}
                    />
                  ) : (
                    ''
                  )}
                </div>

                {itemConditional?.children ? (
                  <div
                    className={`${
                      classNames[`govuk-${controlType}__conditional`]
                    } ${
                      item.checked
                        ? ''
                        : classNames[
                            `govuk-${controlType}__conditional--hidden`
                          ]
                    }`}
                    id={conditionalId}
                  >
                    {itemConditional.children}
                  </div>
                ) : (
                  ''
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );

  return (
    <div
      className={`${classNames['govuk-form-group']}${
        errorMessage ? ` ${classNames['govuk-form-group--error']}` : ''
      } ${formGroup?.className || ''}`}
    >
      {hasFieldset ? (
        <Fieldset
          {...omit(fieldset, 'role')}
          aria-describedby={describedBy.trim() || null}
          govukClassNames={govukClassNames}
        >
          {innerHtml}
        </Fieldset>
      ) : (
        innerHtml
      )}
    </div>
  );
}

export { Boolean };
