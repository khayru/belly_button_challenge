// Call updatePlotly() when a change takes place to the DOM

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
/// callthe url using function init() or function mean or use update 
// This function is called when a dropdown menu item is selected

d3.json(url).then(function(data) {
  console.log(data);
});

function updatePlotly() {
  
// assing varable to access html tage for the dropdown D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  /// d3.jyson used togetall the data 
  d3.json(url).then((data) => {
    // Assign the value of the dropdown menu option to a variable
    console.log(data)
    // assing a varable names  to store the data 
    let names = data.names;
    //looping i in the name of the pation then store in droodwon menu
    for (let i = 0; i < names.length; i++) {
      console.log(names)
      dropdownMenu.append("option").text(names[i]).property("value", names[i])
    }
    ///setup page  frist item from list[0] will be 940 
    let first = names[0] 
    // calling function
    console.log(first)
    
  metaTable(newSample);
  chart(newSample);
  buildBubbleChart(newSample);

  });
}

function optionChanged(newSample) {
  // call the functions when the user change option change is it
  // changes every time your user chooses , a new number. From that dropdown it changes the table in the charts
  
}  
///function metadata
function metaTable(sample) { 
// //3d to retreve the data 
  d3.json(url).then((data) => {

    //  creat a varble to hold metadata
    let metadata = data.metadata;
    
    /// create varable to hold  opject and filter wht user choose
    let metaArry =  metadata.filter(sampleObj => sampleObj.id == sample)
    console.log(metaArry)

    // get frist index from the data put it in the table
    let metaResult = metaArry[0]
 
    d3.select("#sample-metadata").html("");
    // let metaTableData 


    Object.entries(metaResult).forEach(([key,metaArry]) => {

      // Log the individual key/value pairs as they are being appended to the metadata panel
      console.log(key,metaArry);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${metaArry}`);
  
})
});
 
// function chart(sample) {
//   d3.json(url).then((data) => {


//     let metadata = data.metadata;
//     console.log(metadata);
//     let metaArry = metadata.filter(sampleObj => sampleObj.id == sample)
//     //  access to  index arry index [0]
//     let metaResult = metaArry[0];
//     let wfrequency =metaResult.wfreq
//     // get the label and sample value
//     let otu_ids = metaResult.otu_ids;
//     let otu_lables =metaResult.otu_lables;
//     let sample_values = metaResult.sample_values;

//     console.log(otu_ids,otu_lables,sample_values);
//     //////set up 10 items to show 
//     let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
//     let xticks = sample_values.slice(0,10);
//     let labels = otu_lables.slice(0,10);
        
//    // Set up barchart 
//     let barchart = {
//       x: xticks,
//       y: yticks,
//       text: labels,
//       type: "bar",
//       orientation: "h"
//     };
//     // titl
//     let layout ={
//       title: "Top 10 OTUS "
//     };
//     // call the chart 
//     updatePlotly.newPlot("bar",[barchart], layout)
//  
