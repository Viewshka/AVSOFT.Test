let rootElement = document.getElementById("root");
let toolbar = createToolbar();
let table = createTable();
let modal = createModal()
rootElement.appendChild(toolbar);
rootElement.appendChild(table);
rootElement.appendChild(modal)
refreshPager();
refreshTable(0)

function createToolbar() {
    let container = document.createElement("div");

    let buttonRefresh = document.createElement("button");
    buttonRefresh.append('Refresh');
    buttonRefresh.onclick = () => refreshTable(0);
    buttonRefresh.className = 'btn btn-secondary';

    let buttonAdd = document.createElement("button")
    buttonAdd.append('Add');
    buttonAdd.onclick = () => createModal();
    buttonAdd.className = 'btn btn-primary';
    buttonAdd.setAttribute('data-bs-toggle', 'modal');
    buttonAdd.setAttribute('data-bs-target', '#add-modal');

    container.appendChild(buttonRefresh);
    container.appendChild(buttonAdd);
    return container;
}

function createTable() {
    let table = document.createElement('table');
    table.className = 'table table-hover';

    let tableFooter = createTableFooter();
    let tableHeader = createTableHeader();
    let tableBody = createTableBody();

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    table.appendChild(tableFooter);

    return table;
}

function createModal() {
    let modal = document.createElement("div");
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    modal.id = 'add-modal'
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-labelledby', 'modalLabel')
    modal.ariaHidden = 'true';

    let modalDialog = document.createElement("div");
    modalDialog.className = 'modal-dialog';

    let modalContent = document.createElement("div");
    modalContent.className = 'modal-content';

    let modalHeader = document.createElement("div");
    modalHeader.className = 'modal-header';

    let h5 = document.createElement("h5");
    h5.className = 'modal-title';
    h5.id = 'modalLabel';
    h5.append('Add counter');

    let body = document.createElement("div");
    body.className = 'modal-body';

    let form = document.createElement("form");
    form.id = 'counter-form'

    let keyContainer = document.createElement("div");
    keyContainer.className = 'mb-3';

    let keyLabel = document.createElement("label");
    keyLabel.className = 'col-form-label';
    keyLabel.setAttribute('for', 'key');
    keyLabel.append('Key');

    let keyInput = document.createElement("input", {is: 'key'});
    keyInput.className = 'form-control';
    keyInput.type = 'number';
    keyInput.id = 'key';
    keyInput.min = '0'
    keyInput.value = '0';

    let valueContainer = document.createElement("div");
    valueContainer.className = 'mb-3';

    let valueLabel = document.createElement("label");
    valueLabel.className = 'col-form-label';
    valueLabel.setAttribute('for', 'value');
    valueLabel.append('Value');

    let valueInput = document.createElement("input", {is: 'value'});
    valueInput.className = 'form-control';
    valueInput.type = 'number';
    valueInput.id = 'value';
    valueInput.min = '0';
    valueInput.value = '0';

    let footer = document.createElement("div");
    footer.className = 'modal-footer';

    let buttonClose = document.createElement("button");
    buttonClose.className = 'btn btn-secondary';
    buttonClose.setAttribute('data-bs-dismiss', 'modal')
    buttonClose.append('Close');

    let buttonAdd = document.createElement("button");
    buttonAdd.className = 'btn btn-primary';
    buttonAdd.onclick = () => submitForm();
    buttonAdd.setAttribute('data-bs-dismiss', 'modal')
    buttonAdd.append('Save');

    modal.appendChild(modalDialog);

    modalDialog.appendChild(modalContent);

    modalContent.appendChild(modalHeader)
    modalContent.appendChild(body);

    body.appendChild(form);
    form.appendChild(keyContainer);
    keyContainer.appendChild(keyLabel);
    keyContainer.appendChild(keyInput);

    form.appendChild(valueContainer);
    valueContainer.appendChild(valueLabel);
    valueContainer.appendChild(valueInput);

    modalContent.appendChild(footer);

    footer.appendChild(buttonClose);
    footer.appendChild(buttonAdd);

    modalHeader.appendChild(h5);

    return modal;
}

function refreshPager() {
    let recordCount = getRecordCount();
    let pager = document.getElementById('counter-table-pager');

    pager.innerHTML = '';

    getPageCount(recordCount)
        .then(pageCount => {
            let ul = document.createElement("ul");
            ul.className = 'pagination';

            for (let i = 0; i < pageCount; i++) {
                let li = document.createElement('li');
                li.className = 'page-item';

                let a = document.createElement("a");
                a.className = 'page-link';
                a.append((i + 1).toString())

                li.appendChild(a)

                let skip = i * recordCount;
                a.onclick = () => refreshTable(skip, recordCount);

                ul.appendChild(li);
            }
            pager.appendChild(ul);
        });
}

function refreshTable(skip) {
    let take = getRecordCount();
    let countersPromise = getCounters(skip, take);
    let body = document.getElementById('counter-table-body');

    body.innerHTML = "";

    countersPromise.then((counters) => {
        for (let i = 0; i < counters.length; i++) {
            let counter = counters[i];
            let row = document.createElement("tr");
            let cell1 = document.createElement("td");
            let cell2 = document.createElement("td");
            let cell3 = document.createElement("td");

            cell1.append(counter.id);
            cell2.append(counter.key);
            cell3.append(counter.value);

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            body.appendChild(row)
        }
    });
}

function createTableHeader() {
    let header = document.createElement("thead");
    header.className = 'thead';

    let headerRow = document.createElement("tr");
    let cell1 = document.createElement("th");
    let cell2 = document.createElement("th");
    let cell3 = document.createElement("th");

    cell1.append("Id");
    cell2.append("Key");
    cell3.append("Value");

    headerRow.appendChild(cell1);
    headerRow.appendChild(cell2);
    headerRow.appendChild(cell3);

    header.appendChild(headerRow);

    return header;
}

function createTableBody() {
    let body = document.createElement("tbody");
    body.id = 'counter-table-body';
    return body;
}

function createTableFooter() {
    let footer = document.createElement("tfoot");
    let row = document.createElement("tr");

    let cell = document.createElement("td");
    cell.colSpan = 3;
    cell.id = 'footer-row';

    let mainContainer = document.createElement("div");
    mainContainer.id = 'footer-main-container';
    let pagerContainer = document.createElement("div");
    pagerContainer.id = 'pager-container'
    let buttonsContainer = document.createElement("div");
    let pager = createPager();
    let selector = createPageSelector();
    pagerContainer.appendChild(selector)
    pagerContainer.appendChild(pager);
    mainContainer.appendChild(buttonsContainer);
    mainContainer.appendChild(pagerContainer);

    cell.appendChild(mainContainer);

    row.appendChild(cell);
    footer.appendChild(row);

    return footer;
}

function createPager() {
    let container = document.createElement('div');
    container.id = 'counter-table-pager'

    return container;
}

function createPageSelector() {
    let selector = document.createElement("select");
    selector.id = 'page-count-selector';
    selector.onchange = () => valueChanged();
    selector.className = 'form-control page-selector';

    let option1 = document.createElement('option');
    option1.value = '5';
    option1.text = '5';
    option1.selected = true;

    let option2 = document.createElement('option');
    option2.value = '10';
    option2.text = '10';

    let option3 = document.createElement('option');
    option3.value = '15';
    option3.text = '15';

    selector.appendChild(option1);
    selector.appendChild(option2);
    selector.appendChild(option3);

    return selector;
}

function valueChanged() {
    refreshTable(0);
    refreshPager();
}

function getRecordCount() {
    let select = document.getElementById('page-count-selector');
    return select.options[select.selectedIndex].value;
}

async function getCounters(skip, take) {
    return await fetch(`home/GetCounters?skip=${skip}&take=${take}`).then(value => value.json());
}

async function getPageCount(recordCount) {
    return await fetch(`home/GetPageCount?recordCount=${recordCount}`).then(value => value.json());
}

function submitForm() {
    let form = document.getElementById('counter-form');
    let data = {
        key: form.key.value,
        value: form.value.value
    }

    fetch('Home/AddCounter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => refreshTable(0))
        .catch(error => console.log(error));
}