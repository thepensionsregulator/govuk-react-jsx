import React from 'react';
import { Link } from '../../../utils/Link';

function BackLink(props) {
  const { children, href, to, govukClassNames, className, ...attributes } =
    props;
  const contents = children;
  const classNames = govukClassNames || {};
  classNames['govuk-back-link'] =
    classNames['govuk-back-link'] || 'govuk-back-link';

  return (
    <Link
      {...attributes}
      className={`${classNames['govuk-back-link']} ${className || ''}`}
      href={href}
      to={to}
    >
      {contents}
    </Link>
  );
}

BackLink.defaultProps = {
  href: '/',
  children: 'Back',
};

export { BackLink };
