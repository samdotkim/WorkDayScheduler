# HW 05: Work Day Scheduler - sam.kim

## Overview

This is a simple application to allow users to save events for each hour of the day between 9am-5pm to their device's local storage through their web browser.

This app uses a combination of HTML, CSS, JavaScript and jQuery to dynamically update content that is shown on the page.

Moment.js library is also used to utilize date and time.


## Functionality

Dates are displayed throughout the calendar using the Moment.js library to format and work with date & time.

The application was built largely using JQuery. For example, the timeblocks for standard business hours are dynamically generated using JQuery. Although JQuery is a less popular nowadays, I utilized as much JQuery as possible as an educational exercise to learn JQuery and to continue to implementing common Javascript patterns. Nonetheless, JQuery combined with string literals makes for powerful code as demonstrated by my .on('click') with the Save icons on line 89 of script.js.

Bootstrap classes are set for each generated HTML element to utilize the Bootstrap grid. Saved events are also stored to local storage and will persist when the page is refreshed.

Each timeblock is color coded to indicate whether it is in the past, present, or future. So check it out some time during your work day!

The following animation is the comp that was provided to demonstrate the application functionality. However, I've put my own twist on the front-end styling with Google Fonts and some custom CSS.

Enjoy!

```


## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.
