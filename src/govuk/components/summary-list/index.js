import React from 'react';
import { Link } from '../../../utils/Link';

function ActionLink(props) {
  const { children, visuallyHiddenText, className, href, to, ...attributes } =
    props;

  const contents = (
    <>
      {children}
      {visuallyHiddenText && (
        <span className="govuk-visually-hidden">{visuallyHiddenText}</span>
      )}
    </>
  );

  return (
    <Link
      className={`govuk-link ${className || ''}`}
      to={to}
      href={href}
      {...attributes}
    >
      {contents}
    </Link>
  );
}

function actions(row) {
  const actionLinks = row.actions?.items.map((action, index) => {
    const { reactListKey, ...actionAttributes } = action;
    return <ActionLink key={reactListKey || index} {...actionAttributes} />;
  });

  if (row.actions?.items.length) {
    return (
      <dd
        className={`govuk-summary-list__actions ${row.actions.className || ''}`}
      >
        {row.actions.items.length === 1 ? (
          actionLinks
        ) : (
          <ul className="govuk-summary-list__actions-list">
            {actionLinks.map((actionLink) => (
              <li
                key={actionLink.key}
                className="govuk-summary-list__actions-list-item"
              >
                {actionLink}
              </li>
            ))}
          </ul>
        )}
      </dd>
    );
  }

  return null;
}

function SummaryList(props) {
  const { className, rows, ...attributes } = props;
  const filteredRows = rows ? rows.filter((row) => row) : [];
  const anyRowHasActions = filteredRows.some(
    (item) => item.actions?.items.length > 0 === true
  );

  return (
    <dl className={`govuk-summary-list ${className || ''}`} {...attributes}>
      {filteredRows.map((row, index) => (
        <div
          key={row.reactListKey || index}
          className={`govuk-summary-list__row ${
            anyRowHasActions && !row.actions?.items
              ? 'govuk-summary-list__row--no-actions'
              : ''
          } ${row.className || ''}`}
        >
          <dt className={`govuk-summary-list__key ${row.key?.className || ''}`}>
            {row.key?.children}
          </dt>
          <dd
            className={`govuk-summary-list__value ${
              row.value?.className || ''
            }`}
          >
            {row.value?.children}
          </dd>

          {actions(row)}
        </div>
      ))}
    </dl>
  );
}

export { SummaryList };
