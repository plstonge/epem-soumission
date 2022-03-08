/**
 * Create a generic button with classes
 * @param {*} textContent - text on button
 * @param  {...any} classes - CSS classes
 * @returns the button object
 */
function createButton(textContent, ...classes) {
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  button.textContent = textContent
  button.classList.add(...classes)
  return button
}


/**
 * Create an action button
 * @param {*} textContent - text on button
 * @returns the action button object
 */
function createButtonAction(textContent) {
  return createButton(textContent, 'btn', 'btn-secondary')
}


/**
 * Create a critical button
 * @param {*} textContent - text on button
 * @returns the critical button object
 */
function createButtonCritical(textContent) {
  return createButton(textContent, 'btn', 'btn-danger')
}


/**
 * Creates a tool-bar group
 * @param {*} name - tool-bar group name
 * @returns the tool-bar group
 */
function createToolBarGroup(name) {
  const tbg = document.createElement('div')
  tbg.classList.add('btn-group')
  tbg.setAttribute('role', 'group')
  tbg.setAttribute('aria-label', name)
  return tbg
}


/**
 * @class ToolBar
 *
 * The app tool-bar and buttons
 */
class ToolBar extends HTMLDivElement {
  constructor() {
    super()

    // Bootstrap 5 attributes
    this.classList.add('btn-toolbar')
    this.setAttribute('role', 'toolbar')
    this.setAttribute('aria-label', 'Toolbar with button groups')

    // New button in a group
    this.buttonNew = createButtonAction(tr('New_quote'))

    const groupNew = createToolBarGroup('group_new')
    groupNew.append(this.buttonNew)

    // Append groups to tool-bar
    this.append(groupNew)
  }

  bindNewClicked(handle) {
    this.buttonNew.addEventListener('click', handle)
  }
}
customElements.define('tool-bar', ToolBar, { extends: 'div' })


/**
 * Create a checkbox
 * @param {*} id - the checkbox DOM id
 * @returns the checkbox
 */
function createCheckbox(id, checked=false) {
  const cb = document.createElement('input')
  cb.type = 'checkbox'
  cb.classList.add('form-check-input')
  cb.id = id
  cb.checked = checked
  return cb
}


/**
 * Creates a div object with a 'col*' class and a minimum width value
 * @param {*} child - input object or another div
 * @param {*} colClass - 'col' default column class
 * @param {*} minWidth - '1in' default minimum width
 * @returns the div with proper classes and the internal child object
 */
function createDivCol(child, colClass='col', minWidth='1in') {
  const divCol = document.createElement('div')
  divCol.classList.add(colClass)
  divCol.style.minWidth = minWidth
  divCol.append(child)
  return divCol
}


/**
 * Creates a div with class 'form-floating'
 * @param {*} input - input object to be labeled
 * @param {*} label - the label object
 * @returns the div with class 'form-floating'
 */
function createDivFloat(input, label) {
  const divFloat = document.createElement('div')
  divFloat.classList.add('form-floating')
  divFloat.append(input, label)
  return divFloat
}


/**
 * Creates a div with the class 'row' and other classes
 * @param {...any} classes - optional additional classes
 * @returns the div object with classes 'row' and other classes
 */
function createDivRow(...classes) {
  const divRow = document.createElement('div')
  divRow.classList.add('row', ...classes)
  return divRow
}


/**
 * Creates a label object to be attached to an input object
 * @param {*} forID - id of object to be labeled
 * @returns the label object
 */
function createLabel(forID, textContent) {
  const label = document.createElement('label')
  label.setAttribute('for', forID)
  label.textContent = textContent
  return label
}


/**
 * Creates a date input selector
 * @param {*} dt - timestamp from which the local date is taken
 * @returns the date input selector with the given date
 */
function createSelectorDate(dt) {
  const di = document.createElement('input')  // Date input
  di.classList.add('form-select')
  di.type = 'date'
  di.value = dt.toLocaleDateString()
  return di
}


/**
 * @class CheckboxWithLabel
 *
 * Checkbox input with a label
 */
class CheckboxWithLabel extends HTMLDivElement {
  constructor(id, textContent, checked) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('form-check')

    // Create the checkbox and its label
    this.checkbox = createCheckbox(id, checked)

    const label = createLabel(id, textContent)
    label.classList.add('form-check-label')

    this.append(this.checkbox, label)
  }
}
customElements.define('checkbox-with-label', CheckboxWithLabel, { extends: 'div' })


/**
 * Create a switch with a label from CheckboxWithLabel
 * @param {*} id - Object ID
 * @param {*} textContent - Label text
 * @param {*} checked - true if switched on
 * @returns a CheckboxWithLabel with a switch
 */
function createSwitchWithLabel(id, textContent=tr(id), checked=true) {
  const swl = new CheckboxWithLabel(id, textContent, checked)
  swl.classList.add('form-switch', 'my-4')
  return swl
}


/**
 * @class SelectorFloatLabel
 *
 * Selector with floating label
 */
class SelectorFloatLabel extends HTMLDivElement {
  constructor(groupName, numID, options, defaultOptionID) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('form-floating')

    // The selector
    this.selector = document.createElement('select')
    this.selector.id = groupName + '.' + numID
    this.selector.classList.add('form-select', groupName)

    // For each option
    for (const option of options) {
      const opt = document.createElement('option')
      opt.value = option.id
      opt.text = option.name
      this.selector.add(opt)
    }
    this.selector.value = defaultOptionID

    // Label before the selector
    const label = createLabel(this.selector.id, tr(groupName))

    this.append(this.selector, label)
  }
}
customElements.define('selector-float-label', SelectorFloatLabel, { extends: 'div' })


/**
 * @class ServiceToolBar
 *
 * Service selector for duplication or deletion
 */
class ServiceToolBar extends HTMLDivElement {
  constructor(groupName, numID) {
    super()

    // Bootstrap 5 classes: margin-bottom-1
    this.classList.add('row', 'm-0', 'mb-1', 'px-2', 'py-1')

    this.selector = new CheckboxWithLabel(
      groupName, 'Service #' + (numID + 1), false)
    this.selector.classList.add('my-1', 'pt-2')

    this.buttonDuplicate = createButtonAction(tr('Duplicate'))
    this.buttonDuplicate.disabled = !this.selector.checkbox.checked

    this.buttonDelete = createButtonCritical(tr('Delete'))
    this.buttonDelete.disabled = !this.selector.checkbox.checked

    const buttonRow = createDivRow()
    buttonRow.classList.add('mt-1', 'pb-1')
    buttonRow.append(
      createDivCol(this.buttonDuplicate, 'col', '1.5in'),
      createDivCol(this.buttonDelete, 'col', '1.5in'))

    this.append(
      createDivCol(this.selector, 'col-2', '1.5in'),
      createDivCol(buttonRow, 'col-4', '3.25in'))
  }
}
customElements.define('service-tool-bar', ServiceToolBar, { extends: 'div' })


/**
 * @class TimePeriodEditor
 *
 * Time Period Editor
 */
class TimePeriodEditor extends HTMLDivElement {
  constructor(groupName, numID, startDT, untilDT) {
    super()

    // Bootstrap 5 classes: margin-bottom-1
    this.classList.add('row', 'mb-1', 'g-1')

    // Main objects gathered in a dictionary
    this.startDate = createSelectorDate(startDT)
    this.untilDate = createSelectorDate(untilDT)

    this.startTime = new SelectorFloatLabel(
      groupName + '_start_time', numID,
      serviceHours.times.slice(0, -2),  // All times until 21:30
      startDT.getHours() * 60 + startDT.getMinutes())
    this.untilTime = new SelectorFloatLabel(
      groupName + '_until_time', numID,
      serviceHours.times.slice(2),  // All times from 6:30
      untilDT.getHours() * 60 + untilDT.getMinutes())

    const dictDT = {
      'start': {dateSelector: this.startDate, timeSelector: this.startTime},
      'until': {dateSelector: this.untilDate, timeSelector: this.untilTime},
    }

    // Display date selectors in a row
    const divRowDates = createDivRow('g-1')  // g == spacing between columns

    for (const [startUntil, dt] of Object.entries(dictDT)) {
      const className = groupName + '_' + startUntil + '_date'
      dt.dateSelector.id = className + '.' + numID
      dt.dateSelector.classList.add(className)

      const dateLabel = createLabel(dt.dateSelector.id)
      dateLabel.textContent = tr(className)

      divRowDates.append(
        createDivCol(
          createDivFloat(dt.dateSelector, dateLabel)))
    }

    // Display time selectors in a row
    const divRowTimes = createDivRow('g-1')  // g == spacing between columns

    for (const [startUntil, dt] of Object.entries(dictDT)) {
      divRowTimes.append(createDivCol(dt.timeSelector))
    }

    this.append(
      createDivCol(divRowDates, 'col', '3.25in'),
      createDivCol(divRowTimes, 'col', '3.25in'))
  }
}
customElements.define('time-period-editor', TimePeriodEditor, { extends: 'div' })


/**
 * @class ServiceEditor
 *
 * Editor of one service
 */
 class ServiceEditor extends HTMLDivElement {
  constructor(service) {
    super()

    const groupName = 'Service'
    this.id = groupName + '.' + service.id

    // Bootstrap 5 attributes
    this.classList.add('border', 'rounded', 'mb-3', 'p-1')

    // [ ] Service #x - [Duplicate] - [Delete]
    const toolBar = new ServiceToolBar(groupName + '_select', service.id)

    // Type of service - Duration (hh:mm)
    const typeSelector = new SelectorFloatLabel(
      groupName + '_type', service.id, serviceTypes, service.typeID)
    typeSelector.classList.add('mb-1')

    // First day - Last day - Frequency
    const timePeriod = new TimePeriodEditor(
      groupName, service.id, service.startDT, service.untilDT)

    this.append(toolBar, typeSelector, timePeriod)
  }
}
customElements.define('service-editor', ServiceEditor, { extends: 'div' })


/**
 * @class ServicesSection
 *
 * The app Services section
 */
class ServicesSection extends HTMLDivElement {
  constructor() {
    super()

    // Section title
    const title = document.createElement('h2')
    title.textContent = tr('Select_services')

    // One-shot services
    this.initialVisit = createSwitchWithLabel('Initial_visit')
    this.returningKey = createSwitchWithLabel('Returning_key')

    const divOneShotServices = document.createElement('div')
    divOneShotServices.classList.add('border', 'mb-3', 'px-4', 'rounded')
    divOneShotServices.append(this.initialVisit, this.returningKey)

    // List of services - empty div
    this.services = document.createElement('div')

    // Add button
    this.buttonAdd = createButtonAction(tr('Add_service'))

    // Append all
    this.append(title, divOneShotServices, this.services, this.buttonAdd)
  }

  add(service) {
    const newServiceEditor = new ServiceEditor(service)
    this.services.append(newServiceEditor)
  }

  bindAddClicked(handle) {
    this.buttonAdd.addEventListener('click', handle)
  }

  bindTypeChanged(handle) {
    this.services.addEventListener('change', (event) => {
      if (event.target.className === 'form-select Service_type') {
        const serviceID = parseInt(event.target.id.split('.')[1])
        const typeID = event.target.value
        handle(serviceID, typeID)
      }
    })
  }

  reset() {
    this.initialVisit.checkbox.checked = true
    this.returningKey.checkbox.checked = true

    while (this.services.firstChild) {
      this.services.removeChild(this.services.firstChild)
    }
  }
}
customElements.define('services-section', ServicesSection, { extends: 'div' })


/**
 * @class DistanceForm
 *
 * Distance editor
 */
class DistanceForm extends HTMLFormElement {
  constructor() {
    super()

    // Label before distance input
    const distLabel = document.createElement('label')
    distLabel.setAttribute('for', 'distance')
    distLabel.style = 'margin-right: 6px;'
    distLabel.textContent = tr('Distance_to_destination')

    // The distance input field
    this.distance = document.createElement('input')
    this.distance.id = 'distance'
    this.distance.type = 'number'
    this.distance.min = distance_properties.min
    this.distance.max = distance_properties.max
    this.distance.value = distance_properties.default
    this.distance.style = 'width: 1in;'

    // Distance units - km
    const distUnits = document.createElement('label')
    distUnits.setAttribute('for', 'distance')
    distUnits.style = 'margin-left: 6px;'
    distUnits.textContent = "km"

    this.append(distLabel, this.distance, distUnits)
  }

  bindDistanceEdited(handler) {
    const handleNewDistance = (event) => {
      handler(parseFloat(event.target.value))
    }

    this.distance.addEventListener('change', (event) => {
      handleNewDistance(event)
    })
    this.distance.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        handleNewDistance(event)
      }
    })
  }
}
customElements.define('distance-form', DistanceForm, { extends: 'form' })


/**
 * @class StaffSection
 *
 * The app Staff section
 */
class StaffSection extends HTMLDivElement {
  constructor() {
    super()

    // Section title
    const title = document.createElement('h2')
    title.textContent = tr('Select_staff_members')

    // List of staff members - empty div
    this.staff = document.createElement('div')

    // Append all
    this.append(title, this.staff)
  }
}
customElements.define('staff-section', StaffSection, { extends: 'div' })


/**
 * @class QuoteSection
 *
 * The app Quote section
 */
class QuoteSection extends HTMLDivElement {
  constructor() {
    super()

    // Section title
    const title = document.createElement('h2')
    title.textContent = tr('Quote')

    // The detailed quote - empty div
    this.quote = document.createElement('div')

    // Append all
    this.append(title, this.quote)
  }
}
customElements.define('quote-section', QuoteSection, { extends: 'div' })


/**
 * @class QuoteEditor
 *
 * The main app user interface
 */
class QuoteEditor {
  constructor() {
    this.app = document.getElementById('quoteEditor')

    this.toolbar = new ToolBar()
    this.services = new ServicesSection()
    //this.staff = new StaffSection()
    //this.quote = new QuoteSection()

    this.app.append(this.toolbar, this.services)
  }

  bindNewClicked(handle) {
    this.toolbar.bindNewClicked(handle)
  }

  bindServiceAddClicked(handle) {
    this.services.bindAddClicked(handle)
  }

  bindServiceTypeChanged(handle) {
    this.services.bindTypeChanged(handle)
  }

  reset() {
    this.services.reset()
  }

  serviceAdd(service) {
    this.services.add(service)
  }
}
