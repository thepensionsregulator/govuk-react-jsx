import React from 'react';
import { Link } from '../../../utils/Link';

function Breadcrumbs(props) {
  const { items, govukClassNames, className, collapseOnMobile, ...attributes } =
    props;
  const classNames = govukClassNames || {};
  classNames['govuk-breadcrumbs'] =
    classNames['govuk-breadcrumbs'] || 'govuk-breadcrumbs';
  classNames['govuk-breadcrumbs--collapse-on-mobile'] =
    classNames['govuk-breadcrumbs--collapse-on-mobile'] ||
    'govuk-breadcrumbs--collapse-on-mobile';
  classNames['govuk-breadcrumbs__list'] =
    classNames['govuk-breadcrumbs__list'] || 'govuk-breadcrumbs__list';
  classNames['govuk-breadcrumbs__list-item'] =
    classNames['govuk-breadcrumbs__list-item'] ||
    'govuk-breadcrumbs__list-item';
  classNames['govuk-breadcrumbs__link'] =
    classNames['govuk-breadcrumbs__link'] || 'govuk-breadcrumbs__link';
  const breadcrumbs = items
    ? items.map((item, index) => {
        const { href, to, reactListKey, children, ...itemAttributes } = item;

        return href || to ? (
          <li
            key={reactListKey || index}
            className={classNames['govuk-breadcrumbs__list-item']}
          >
            <Link
              href={href}
              to={to}
              className={classNames['govuk-breadcrumbs__link']}
              {...itemAttributes}
            >
              {children}
            </Link>
          </li>
        ) : (
          <li
            key={reactListKey || index}
            className={classNames['govuk-breadcrumbs__list-item']}
            aria-current="page"
          >
            {children}
          </li>
        );
      })
    : null;

  return (
    <div
      className={`${classNames['govuk-breadcrumbs']} ${className || ''} ${
        collapseOnMobile
          ? classNames['govuk-breadcrumbs--collapse-on-mobile']
          : ''
      }`}
      {...attributes}
    >
      <ol className={classNames['govuk-breadcrumbs__list']}>{breadcrumbs}</ol>
    </div>
  );
}

export { Breadcrumbs };
