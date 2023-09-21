// Add an event listener to run code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Find all tables with class "zw-rgrid" and process them
    document.querySelectorAll("table.zw-rgrid").forEach(function (item, index) {
        zw_rgridfy(item);
    })

    // Attach a click event listener to expand/contract ".zw-rgrid-header-mobile" elements with hidden content
    document.querySelectorAll(".zw-rgrid-header-mobile").forEach(function (item, index) {
        item.addEventListener("click", function () {
            this.closest('tr').classList.toggle("expanded");
        })
    });

}, false);

// Function to enhance tables with class "zw-rgrid"
function zw_rgridfy(table) {

    // Select all header cells in the table
    var table_headers = table.querySelectorAll("thead tr th");

    // Select all rows in the table
    var table_rows = table.querySelectorAll("tbody tr");

    // Flag to check if there is a primary key column
    var haspk = false;

    // Check if any header cell has a "data-pk" attribute
    table_headers.forEach((obj) => {
        if (obj.dataset.pk) {
            haspk = true;
        }
    });

    // Process each row in the table
    table_rows.forEach((obj) => {
        // Select all cells in the row (excluding mobile header cells)
        var table_cells = obj.querySelectorAll('td:not(.zw-rgrid-header-mobile)');
        var PkValues = [];

        // If there is a primary key column, extract the values
        if (haspk) {
            table_headers.forEach((obj, index) => {
                if (obj.dataset.pk && table_cells.length > 0) {
                    PkValues.push(table_cells[index].innerText);
                }
            });

            // Insert a mobile header cell with concatenated primary key values
            obj.insertBefore(createHeaderMobile(PkValues), table_cells[0]);
        }

        // Set "data-th" attribute and add "zw-rgrid-detail" class for certain cells
        table_cells.forEach((obj, index) => {
            obj.setAttribute("data-th", table_headers[index].innerText);
            if (table_headers[index].dataset.hide) {
                obj.classList.add('zw-rgrid-detail');
            }
        });

    });
}

// Function to create a mobile header cell with concatenated primary key values
function createHeaderMobile(strPkValue: string[]) {

    var td_header_mobile;

    td_header_mobile = document.createElement("td");
    td_header_mobile.classList.add('zw-rgrid-header-mobile');
    td_header_mobile.innerText = strPkValue.join(", ");

    return td_header_mobile;
}
