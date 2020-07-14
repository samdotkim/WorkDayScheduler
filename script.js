$(document).ready(function() {

  // clock
  const clock = false;

  // get current time from moment API
  const current = moment().format('MMMM Do YYYY');

  // commented out for clock in non-standard hours
  let currentHour24 = moment().format('H');
  let currentHour12 = moment().format('h');

  // set times for testing after hours
  if (clock) {
    currentHour24 = 13;
    currentHour12 = 1;
  }

  // set save icon
  const saveIcon = "./images/save-regular.svg"; 

  // display current date in heading
  let $displayDate = $('#currentDate');
  $displayDate.text(current);

  // Get stored todos from localStorage and turn JSON string into an object
  let storedTodos = JSON.parse(localStorage.getItem("storedTodos"));

  // if plans retrieved from localStorage, update storedPlans array
  if (storedTodos !== null) {
    storedPlans = storedTodos;
  } else {

    // preloaded content for first time visitors
    storedPlans = new Array(9);
    storedPlans[0] = "Eat some pancakes";
  }

  // define planner element variable
  let $plannerDiv = $('#scheduler');

  // clear any existing elements
  $plannerDiv.empty();

  // create calendar rows for workday hours: 9AM - 5PM
  for (let hour = 9; hour <= 17; hour++) {
    let index = hour - 9;
   
    // create row components
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
    
    // create row time component
    let $TimeDivCol2 = $('<div>');
    $TimeDivCol2.addClass('col-md-2');
    
    // create timeBox element
    const $timeBlockSpan = $('<span>');
    
    // use this to get value
    $timeBlockSpan.attr('class','timeBox');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate timeBox with time
    $timeBlockSpan.text(`${displayHour} ${ampm}`);
    $rowDiv.append($TimeDivCol2);
    $TimeDivCol2.append($timeBlockSpan);
    
    // create row components
    let $plannerSpan = $('<input>');
    $plannerSpan.attr('id',`input-${index}`);
    $plannerSpan.attr('hour-index',index);
    $plannerSpan.attr('type','text');
    $plannerSpan.attr('class','dailyPlan');
    
    // access index from data array for hour 
    $plannerSpan.val( storedPlans[index] );
    
    // create col to control width
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');
    
    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($plannerSpan);
    
    // build save button rows
    let $saveDivCol = $('<div>');
    $saveDivCol.addClass('col-md-1');
    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    // add col width and row component to row
    $rowDiv.append($saveDivCol);
    $saveDivCol.append($saveBtn);

    // stop building save button rows , update row color according to time
    updateRowColor($rowDiv, hour);

    // add row to planner container
    $plannerDiv.append($rowDiv);
  };

  // Update Row Color
  function updateRowColor ($hourRow,hour) { 
    if (clock) { console.log("rowColor ",currentHour24, hour); }
    if ( hour < currentHour24) {

      // $hourRow.css('')
      if (clock) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > currentHour24) {
      if (clock) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (clock) { console.log("eqaul"); }
      $hourRow.css("background-color","tomato")
    }
  };

  // saves to local storage, onclick function to listen for user clicks on plan area
  $(document).on('click','i', function(event) {
    event.preventDefault();  
    if (clock) { console.log('click pta before '+ storedPlans); }
    let $index = $(this).attr('save-id');
    let inputId = '#input-'+$index;
    let $value = $(inputId).val();
    storedPlans[$index] = $value;
    if (clock) { console.log('value ', $value); }
    if (clock) { console.log('index ', $index); }
    if (clock) { console.log('click pta after '+ storedPlans); }
    
    // remove shawdow pulse class
    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedTodos", JSON.stringify(storedPlans));
  });  
  
  // function to color save button on change of input
  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (clock) { console.log('onChange'); }
    if (clock) { console.log('id', $(this).attr('hour-index')); }
    
    // need to check for save button
    let i = $(this).attr('hour-index');
  });
});