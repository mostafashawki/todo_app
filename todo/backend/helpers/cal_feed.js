const dateFormat = require("dateformat");
const schedule = require("node-schedule");
const { writeFileSync } = require("fs");
const Todo = require("../models/Todo");


/////////////////////////////////////////////////////////////
//////////////////START SCHEDULE TASK (cal feed)/////////////
/////////////////////////////////////////////////////////////
// execute every 5 seconds
// const calfeed = schedule.scheduleJob("*/5 * * * * *", function() {
//run every hour when minute = 1
const calfeed = schedule.scheduleJob("1 * * * *", function() {
  //run every hour when minute = 1
  console.log("less than", new Date("2100-1-1"));
  console.log("greater than", new Date());
  //1- find all the upcoming todos
  Todo.find({ dueDate: { $gte: new Date(), $lt: new Date("2099-1-1") } })
    .then(todos => {
      if (!todos) return false;
      console.log(todos);
      let event = "";
      const header = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//bobbin v0.1//NONSGML iCal Writer//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH`;
      const footer = `END:VCALENDAR`;
      //make it unique
      // //start creating for user
      // 2- put assignees into one array by map
      let assigneeArr = todos.map(todo => todo.assignee);
      console.log("TARGET------>", assigneeArr);
      // 3- make this array unique using Set (some users have more than one todo)
      assigneeArrUnique = Array.from(
        new Set(assigneeArr.map(assignee => assignee))
      );
      console.log("---------------------------AAUNIQUE", assigneeArrUnique);
      let assigneeEmail = "";
      // 4- loop into assigneeArrUnique and filter the todos to get targetedtodos for every user then create his calendar feed
      for (let i = 0; i < assigneeArrUnique.length; i++) {
        assigneeEmail = assigneeArrUnique[i].replace("@", "").replace(".", "");
        console.log("USER Email____", assigneeEmail);

        let targetedTodos = todos.filter(
          todo => todo.assignee === assigneeEmail
        );
        console.log(`targetedTodos for user ${assigneeEmail}`, targetedTodos);
        for (let j = 0; j < targetedTodos.length; j++) {
          let dueDateFormatted = dateFormat(
            targetedTodos[j].dueDate,
            "yyyymmdd'T'HHMMss'Z'"
          );
          event += `\nBEGIN:VEVENT\nDTSTART:${dueDateFormatted}\nDTEND:${dueDateFormatted}\nDTSTAMP:${dueDateFormatted}\nUID:${
            targetedTodos[j]._id
          }_TODO24X7\nCREATED:${dueDateFormatted}\nDESCRIPTION:${
            targetedTodos[j].todoText
          }\nLAST-MODIFIED:${dueDateFormatted}\nSEQUENCE:${
            targetedTodos[j].SEQUENCE
          }\nSTATUS:CONFIRMED\nSUMMARY:${
            targetedTodos[j].todoText
          }\nTRANSP:OPAQUE\nEND:VEVENT`;
        } //end j loop
        let allEvents = header + event + "\n" + footer;
        writeFileSync(`../../ics/users/${assigneeEmail}.ics`, allEvents);
      } //end i loop
      console.log("DONE ALL");
    })
    .catch(err => console.log(err));

});

module.exports = calfeed;
