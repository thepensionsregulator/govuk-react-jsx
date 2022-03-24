import React from 'react';

function WarningText(props) {
  const {
    govukClassNames,
    className,
    iconFallbackText,
    children,
    ...attributes
  } = props;
	const classNames = govukClassNames || {};
  classNames['govuk-warning-text'] = classNames['govuk-warning-text'] || 'govuk-warning-text';
  classNames['govuk-warning-text__icon'] = classNames['govuk-warning-text__icon'] || 'govuk-warning-text__icon';
  classNames['govuk-warning-text__text'] = classNames['govuk-warning-text__text'] || 'govuk-warning-text__text';
  classNames['govuk-warning-text__assistive'] = classNames['govuk-warning-text__assistive'] || 'govuk-warning-text__assistive';

  return (
    <div className={`${classNames['govuk-warning-text']} ${className || ''}`} {...attributes}>
      <span className={classNames['govuk-warning-text__icon']} aria-hidden="true">
        !
      </span>
      <strong className={classNames['govuk-warning-text__text']}>
        <span className={classNames['govuk-warning-text__assistive']}>
          {iconFallbackText}
        </span>
        {children}
      </strong>
    </div>
  );
}

export { WarningText };
