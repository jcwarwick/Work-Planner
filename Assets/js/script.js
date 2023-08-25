$(document).ready(function () {
  // Display the current date at the top of the calendar
  var currentDate = dayjs();
  $("#currentDay").text(currentDate.format("dddd, MMMM D"));

  // Defined standard business hours
  var businessHours = [
    { hour: 9, label: "9AM" },
    { hour: 10, label: "10AM" },
    { hour: 11, label: "11AM" },
    { hour: 12, label: "12PM" },
    { hour: 13, label: "1PM" },
    { hour: 14, label: "2PM" },
    { hour: 15, label: "3PM" },
    { hour: 16, label: "4PM" },
    { hour: 17, label: "5PM" },
  ];

  // Loop through each time block
  for (var i = 0; i < businessHours.length; i++) {
    var blockHour = businessHours[i].hour;
    var blockLabel = businessHours[i].label;

    var timeBlockEl = $("<div>")
      .attr("id", "hour-" + blockHour)
      .addClass("row time-block");
    if (blockHour < currentDate.hour()) {
      timeBlockEl.removeClass("present")
      timeBlockEl.removeClass("future")
      timeBlockEl.addClass("past");
    } else if (blockHour === currentDate.hour()) {
      timeBlockEl.removeClass("past");
      timeBlockEl.removeClass("future")
      timeBlockEl.addClass("present");
    } else {
      timeBlockEl.removeClass("present");
      timeBlockEl.removeClass("past");
      timeBlockEl.addClass("future");
    }

    var hourEl = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(blockLabel);

    var descriptionEl = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3");

    var saveBtnEl = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    // Load saved text from local storage
    var savedText = localStorage.getItem("hour-" + blockHour);
    if (savedText) {
      descriptionEl.val(savedText);
    }

    // Save button click event
    saveBtnEl.on("click", function () {
      var clickedBlockHour = $(this)
        .closest(".time-block")
        .attr("id")
        .split("-")[1];
      var userInput = $(this).siblings("textarea").val();
      localStorage.setItem("hour-" + clickedBlockHour, userInput);
    });

    // Append elements to time block
    timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);

    // Append time block to container
    $(".container-lg").append(timeBlockEl);
  }
});
