// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody"); // d3.select tells js to look for <tbody> tags in HTML

// Creating a function to build a table
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row <table row> to the table body - we used let so that it can be called globaly
      let row = tbody.append("tr");
  
      // Loop through each element in the dataRow and add
      // each value as a table cell (td) adding the cells to each row
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

  function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");

    let filteredData = tableData;
  
    // Check to see if a date was entered and filter the data using that date.
    if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    }
  
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  }

  function handleReset(){
    filteredData = tableData;
    buildTable(filteredData);
  }
  
  // Selector string '#filter-btn', contains the id for another html tag. this links our code directly to the filter button
  // .on('click', handleClick) executes handleclick function when the button with an id of filter-btn is clicked
  d3.selectAll("#filter-btn").on("click", handleClick);
  d3.selectAll("#reset-btn").on("click", handleReset);
  
  // Build the table when the page loads
  buildTable(tableData);


/*
// Simple JavaScript console.log statement
function printHello() {
    console.log("Hello there!");
}

// Converted to an arrow function
printHello = () => "Hello there!";

// Takes two numbers and adds them
function addition(a, b) {
    return a + b;
}

// Converted to an arrow function
addition = (a, b) => a + b;

// Functions can call other functions
function doubleAddition(c, d) {
    var total = addition(c, d) * 2;
    return total;
}

// Converted to an arrow function
doubleAddition = (c, d) => addition(c, d) * 2;


// Each name is logged in the console, one after the other
let friends = ["Sarah", "Greg", "Cindy", "Jeff"];

function listLoop(userList) {
    for (var i = 0; i < userList.length; i++) {
      console.log(userList[i]);
    }
 }

 */

