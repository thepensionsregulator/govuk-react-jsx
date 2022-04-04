import React from 'react';
import { Tag } from '../..';

function PhaseBanner(props) {
  const { govukClassNames, className, tag, children, ...attributes } = props;

  const classNames = govukClassNames || {};
  classNames['govuk-phase-banner'] =
    classNames['govuk-phase-banner'] || 'govuk-phase-banner';
  classNames['govuk-phase-banner__content'] =
    classNames['govuk-phase-banner__content'] || 'govuk-phase-banner__content';
  classNames['govuk-phase-banner__content__tag'] =
    classNames['govuk-phase-banner__content__tag'] ||
    'govuk-phase-banner__content__tag';
  classNames['govuk-phase-banner__text'] =
    classNames['govuk-phase-banner__text'] || 'govuk-phase-banner__text';

  return (
    <div
      className={`${classNames['govuk-phase-banner']} ${className || ''}`}
      {...attributes}
    >
      <p className={classNames['govuk-phase-banner__content']}>
        <Tag
          className={`${classNames['govuk-phase-banner__content__tag']} ${
            tag?.className || ''
          }`}
        >
          {tag && tag.children}
        </Tag>

        <span className={classNames['govuk-phase-banner__text']}>
          {children}
        </span>
      </p>
    </div>
  );
}

export { PhaseBanner };
