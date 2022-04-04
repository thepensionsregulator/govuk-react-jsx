import React from 'react';

function Fieldset(props) {
  const { legend, govukClassNames, className, children, ...attributes } = props;
  const classNames = govukClassNames || {};
  classNames['govuk-fieldset'] =
    classNames['govuk-fieldset'] || 'govuk-fieldset';
  classNames['govuk-fieldset__legend'] =
    classNames['govuk-fieldset__legend'] || 'govuk-fieldset__legend';
  classNames['govuk-fieldset__heading'] =
    classNames['govuk-fieldset__heading'] || 'govuk-fieldset__heading';

  let legendComponent;
  if (legend && legend.children) {
    legendComponent = (
      <legend
        className={`${classNames['govuk-fieldset__legend']} ${
          legend.className || ''
        }`}
      >
        {legend.isPageHeading ? (
          <h1 className={classNames['govuk-fieldset__heading']}>
            {legend.children}
          </h1>
        ) : (
          legend.children
        )}
      </legend>
    );
  }

  return (
    <fieldset
      className={`${classNames['govuk-fieldset']} ${className || ''}`}
      {...attributes}
    >
      {legendComponent}
      {children}
    </fieldset>
  );
}

export { Fieldset };
