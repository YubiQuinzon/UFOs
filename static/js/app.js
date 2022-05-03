// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};


// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    // Creates an array which stores all the values and id's of all the objects that fit the select criteria and 'on' condition
    let changedElements = d3.select(this); //d3.selectALL("input").on("change"); HELP?

    // 4b. Save the value that was changed as a variable.
    // Creates an array of all the changed elements' values - add to lowercase case so case doesnt matter in user entry
    let elementValue = changedElements.property("value").toLowerCase();
   
    // printing the element Values array
    console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    // Saves the ids of the filtered array into the filterId object.
    let filterId = changedElements.attr("id");

    // printing the filtered arrays ids
    console.log(filterId);

  
    // 5. If a filter value was entered - it will create an elementValue array - if so, add filterId and value to the filters list.
    if (elementValue){  
      filters[filterId]= elementValue;
    }
    // Otherwise, clear that filter from the filters object.
    else {
      delete filters[filterId];
    }
 
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    
  
    // 9. Loop through all of the filters and keep any data that matches the filter values
    // Object.entries returns an array of [key, value] paired arrays - which make it able to iterate the arrays as key, value pairs
    // i.e: { {key_1, value_1}, {key_1, value_1} } rather {key_1: value_1, key_2, value_2}
    Object.entries(filters).forEach(([id, value]) => {
        filteredData = filteredData.filter(row => row[id] === value); // filtering the table
      })
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  // Creating an event listener (IMPORTANT) - this detects any changes in "input elements" found on the html, if so: calls funtion on that element
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
