import deepIterator from 'deep-iterator'
import ReactHtmlParser from 'react-html-parser'

const propReplacements = {
  classes: 'className',
  describedBy: 'aria-describedby',
  containerClasses: 'containerClassName',
  navigationClasses: 'navigationClassName',
  autocomplete: 'autoComplete',
  for: 'htmlFor',
  // checked: 'defaultChecked',
  // value: 'defaultValue',
  captionClasses: 'captionClassName',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  summaryText: 'summaryChildren',
  summaryHtml: 'summaryChildren',
  descriptionText: 'descriptionChildren',
  descriptionHtml: 'descriptionChildren',
  titleText: 'titleChildren',
  titleHtml: 'titleChildren'
}

export default function processExampleData(data, componentName) {
  for (let { parent, value, key } of deepIterator(data)) {
    // Replace html and text props with children
    // Turn any html strings into jsx
    if ((key === 'html' || key === 'text') && value) {
      parent['children'] = ReactHtmlParser(value)
      delete parent[key]
    }

    // Various replacements of govuk specific params to react syntax. E.g. classes -> className
    if (Object.keys(propReplacements).includes(key)) {
      parent[propReplacements[key]] = value
      delete parent[key]
    }

    // Spread attributes out into the object above them in a more React-like fashion
    if (key === 'attributes') {
      Object.assign(parent, value)
      delete parent['attributes']
    }
  }

  // 2nd pass over for tweaks to radios data
  if (componentName === 'radios') {
    for (let { parent, value, key } of deepIterator(data)) {
      // Replace 'checked' value on radio items with a top level 'value' prop for compatibility with react form libraries
      if (key === 'items') {
        // Work out which one is checked
        let checked = value.find(item => item.checked)

        // Remove the checked value from each item
        parent.items = value.map(item => {
          const modifiedItem = Object.assign({}, item)
          delete modifiedItem['checked']
          return modifiedItem
        })

        if (checked) {
          parent.value = checked.value
        }
      }
    }
  }

  return data
}
