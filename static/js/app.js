//Fetch the JSON data and console log 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function updatePlotly() {
    //  create varable to access html tag use D3 to create the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to retreve the data 
    d3.json(url).then((data) => {
        
        // Create a variable that holds the names. 
        let names =data.names;
        for (let i =0; i< names.length;i++){
        
            dropdownMenu.append("option").text(names[i]).property("value", names[i])
         };

        // Use the first sample from the list to setup the page
        let sample = names[0];

        //print the value of sample
        console.log(sample);

        // Build the initial plots 
        metdat(sample);
        chart(sample);
        bubble_chart(sample);
        

    });
};

//  create Function metadata info
function metdat(sample) {

    // retrieve all the data using d3
    d3.json(url).then((data) => {

        // Create a variable that holds the metadata. 
        let metadata = data.metadata;

        // create filter  to filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // print out after metadata objects filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object to add each key value
        Object.entries(valueData).forEach(([key,value]) => {

            console.log(key,value);

            d3.select("#sample-metadata").append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });

};
// call the function 
updatePlotly()
// create  function chart
function chart(sample) {

    d3.json(url).then((data) => {

        // Create a variable that holds the samples. 
        let sample_data = data.samples;

        // create filter  to filter based on the value of the sample
        let value = sample_data.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten items 
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

//  create function bbubble chart
function bubble_chart(sample) {

    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sample_data = data.samples;

        // create filter  to filter based on the value of the sample
        let value = sample_data.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function updates when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    metdat(value);
    chart(value);
    bubble_chart(value);
    gauge_chart(value);
};

// Call the function
updatePlotly()