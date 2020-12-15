import React from 'react';
import ReactDOMServer from 'react-dom/server';
import processExampleData from '../utils/processExampleData';
import * as components from '../src/govuk';

const glob = require('glob');
const path = require('path');
const ent = require('ent');
const prettyhtml = require('@starptech/prettyhtml');
const { HtmlDiffer } = require('@markedjs/html-differ');
const diffLogger = require('@markedjs/html-differ/lib/logger');

const govukFrontendPath = path.dirname(
  require.resolve('govuk-frontend/package.json')
);

function cleanHtml(dirtyHtml) {
  return prettyhtml(ent.decode(dirtyHtml), {
    sortAttributes: true,
  }).contents;
}

function hyphenatedToCamel(string) {
  return string
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

const htmlDiffer = new HtmlDiffer({
  ignoreAttributes: ['style', 'src', 'disabled'],
  ignoreSelfClosingSlash: true,
});

const allFixtures = glob
  .sync(path.join(govukFrontendPath, 'govuk/components/**/fixtures.json'))
  .map((file) => [path.basename(path.dirname(file)), require(file)]); // eslint-disable-line import/no-dynamic-require, global-require

expect.extend({
  toBeTrueWithMessage(received, message) {
    return {
      pass: received === true,
      message: () => message,
    };
  },
});

describe('govuk-react-jsx output matches govuk-frontend', () => {
  describe.each(allFixtures)('Component: %s', (component, fixtures) => {
    const ReactComponent = components[hyphenatedToCamel(component)];

    it.each(
      fixtures.fixtures.map((fixture) => [
        fixture.name,
        fixture.options,
        fixture.html,
      ])
    )('Example: %s', async (name, options, govukFrontendOutput) => {
      expect(ReactComponent).toBeDefined();

      // Override values in specific fixtures to avoid issues
      // Ideally follow up anything in here with a pull request to govuk-frontend resolving the issue
      switch (`${component}:${name}`) {
        case 'select:with falsey values':
        case 'select:attributes on items':
          // Value missing, and should actually be marked as required in govuk-frontend since it is treated as such. (Omitting value in params just outputs empty values)
          // Remove once https://github.com/alphagov/govuk-frontend/pull/2043 is merged
          options.items.forEach((item, index) => {
            if (item) {
              options.items[index].value = '';
            }
          });
          break;

        case 'checkboxes:fieldset params':
          return; // Example is just broken - Remove once https://github.com/alphagov/govuk-frontend/pull/2043 is merged

        case 'checkboxes:multiple hints':
          options.items[2].value = ''; // Example is missing a value - Remove once https://github.com/alphagov/govuk-frontend/pull/2043 is merged
          break;

        default:
      }
      // END overrides

      const props = processExampleData(options, component);
      const formComponents = [
        'select',
        'input',
        'textarea',
        'checkboxes',
        'radios',
        'date-input',
        'file-upload',
        'character-count',
      ];
      const govukReactJsxOutput = ReactDOMServer.renderToStaticMarkup(
        <ReactComponent
          {...{
            ...props,
            ...(formComponents.includes(component) // Make sure form components all get an onChange handler to stop React getting upset
              ? { onChange: () => {} }
              : null),
          }}
        />
      );

      const actual = cleanHtml(govukReactJsxOutput);
      const expected = cleanHtml(govukFrontendOutput);

      const isEqual = await htmlDiffer.isEqual(actual, expected);
      const diff = await htmlDiffer.diffHtml(actual, expected);

      expect(isEqual).toBeTrueWithMessage(diffLogger.getDiffText(diff));
    });
  });
});