// Add an event listener to run code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Find all tables with class "zw-rgrid" and process them
    document.querySelectorAll("table.zw-rgrid").forEach(function (item) {
        processTable(item);
    })

    // Attach a click event listener to expand/contract ".zw-rgrid-header-mobile" elements with hidden content
    document.querySelectorAll(".zw-rgrid-header-mobile").forEach(function (item) {
        item.addEventListener("click", function () {
            toggleExpanded(this);
        })
    });
}, false);

// Function to process a table with class "zw-rgrid"
function processTable(table: Element) {

    const tableId = table.id;
    const table_headers: NodeListOf<HTMLTableCellElement> = table.querySelectorAll("table#" + tableId + " > thead > tr > th");
    const table_rows: NodeListOf<HTMLTableRowElement> = table.querySelectorAll("table#" + tableId + " > tbody tr");
    let has_pk: boolean = hasPrimaryKey(table_headers);

    // Process each row in the table
    table_rows.forEach((row) => {
        const table_cells: NodeListOf<HTMLTableCellElement> = row.querySelectorAll('td:not(.zw-rgrid-header-mobile)');
        let PkValues: string[];

        if (has_pk) {
            PkValues = extractPrimaryKeyValues(table_headers, table_cells);

            // Insert a mobile header cell with concatenated primary key values
            insertMobileHeaderCell(PkValues, row);
        }

        setAttributesAndClasses({table_cells: table_cells, table_headers: table_headers});
    });
}

// Function to check if there is a primary key column in the table headers
function hasPrimaryKey(table_headers: NodeListOf<Element>) {
    return Array.from(table_headers).some((obj: { dataset: { pk: any; }; }) => obj.dataset.pk);
}

// Function to extract primary key values from the table
function extractPrimaryKeyValues(table_headers: NodeListOf<HTMLTableCellElement>, table_cells: string | any[] | NodeListOf<Element>) {
    return Array.from(table_headers).reduce((values: any[], obj: {
        dataset: { pk: any; };
    }, index: string | number) => {
        if (obj.dataset.pk && table_cells.length > 0) {
            values.push(table_cells[index].innerText);
        }
        return values;
    }, []);
}

// Function to insert a mobile header cell with concatenated primary key values
function insertMobileHeaderCell(PkValues: any[], row: Element) {
    const td_header_mobile = createHeaderMobile(PkValues);
    row.insertBefore(td_header_mobile, row.querySelector('td:not(.zw-rgrid-header-mobile)'));
}

// Function to create a mobile header cell with concatenated primary key values
function createHeaderMobile(strPkValue: any[]) {
    const td_header_mobile = document.createElement("td");
    td_header_mobile.classList.add('zw-rgrid-header-mobile');
    td_header_mobile.innerText = strPkValue.join(", ");
    return td_header_mobile;
}

// Function to set "data-th" attribute and add "zw-rgrid-detail" class for certain cells
function setAttributesAndClasses({table_cells, table_headers}: { table_cells: any, table_headers: any }) {
    Array.from(table_cells).forEach((cell: {
        setAttribute: (arg0: string, arg1: any) => void;
        classList: { add: (arg0: string) => void; };
    }, index: string | number) => {
        cell.setAttribute("data-th", table_headers[index].innerText);
        if (table_headers[index].dataset.hide) {
            cell.classList.add('zw-rgrid-detail');
        }
    });
}

// Function to toggle the "expanded" class on the closest table row
function toggleExpanded(element: {
    closest: (arg0: string) => {
        (): any;
        new(): any;
        classList: { (): any; new(): any; toggle: { (arg0: string): void; new(): any; }; };
    };
}) {
    element.closest('tr').classList.toggle("expanded");
}
