// define current time and starting time
var timeCurrent = parseInt(moment().format('H'));
var timeStart = 9;

// create empty arrays for localStorage saved tasks
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var getTask = localStorage.getItem('tasks');

// display the current date & time from moment on page
var current = moment().format('llll');
let $displayDate = $('#currentDate');
    $displayDate.text(current);

// build time blocks 9 am - 5 pm
for (let index = 0; index < 9; index++) {
    
  // row builder
    var rowDiv = $('<div class="row">');
    rowDiv.attr('data-id', index);
    $('.container').append(rowDiv);
    if (getTask === null) {
      
        // create objects in tasks array with index as id for local storage
        tasks.push({ eventId: index });
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    
    // fill first column with time
    var timeBlock = $('<div class="hour col-1">');
    var hour = moment(timeStart, 'h').format('hA');
    timeBlock.text(hour);
    rowDiv.append(timeBlock);

    // create description div and text areas for task input
    var taskDesc = $('<div class="description col-10">');
    taskDesc.attr('data-time', timeStart);
    setTimeClass();
    var taskTextArea = $('<textarea cols="40" rows="1"></textarea>');
    taskDesc.html(taskTextArea);
    taskTextArea.attr('data-id', index);
    rowDiv.append(taskDesc);

    // get task description out of local storage to display
    var taskText = tasks[index].description;
    taskTextArea.val(taskText);

    // generate save buttons
    var saveDiv = $('<div class="saveBtn col-1">');
    rowDiv.append(saveDiv);
    var saveBtn = $('<i class="far fa-save fa-md"></i>');
    saveDiv.html(saveBtn);
    saveBtn.attr('data-id', index);
    timeStart++;
};

// set classes for past, present, future timeblocks
function setTimeClass() {

    // set class for description div based on past/present/future
    if (moment(timeStart).isBefore(timeCurrent)) {
        taskDesc.addClass('past');
        console.log('past!');
    };

    if (moment(timeStart).isSame(timeCurrent)) {
        taskDesc.addClass('present');
        console.log('present!');
    };

    if (moment(timeStart).isAfter(timeCurrent)) {
        taskDesc.addClass('future');
        console.log('future!');
    };

};

// save button event listener
$('.far').on('click', function () {

    // get the data ID to set index in storage array
    var dataID = $(this).attr('data-id');
    console.log("data ID of clicked item: " + dataID);

    // take textarea value with currentId
    var taskText = $(`textarea[data-id|='${dataID}']`).val();
    console.log("tasK: " + taskText);

    // set to description property of that ID in tasks array    
    tasks[dataID].description = taskText;
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log("saved ID description: " + dataID);
});