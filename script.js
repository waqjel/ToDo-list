//Declaration of the variables
let todoInput = document.querySelector("input");
let todoBtn = document.querySelector("#toDoBtn"); //Id
let toDoItem = document.querySelector("#toDoItem"); //<ul>
let clearAll = document.querySelector("#clearAll");
let smallField = document.querySelector("small"); //For empty input messeage
let label = document.querySelector('.completedCount'); //class
let tasksLabel = document.querySelector('.tasks');
let completedCount = 0;
let tasksCount = 0;
let toDoArray = [];

todoBtn.addEventListener("click", AddToDo);

// Add task to the list when enter key is pressed
todoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        AddToDo();
    }
});

function AddToDo(){
    //Trim the whitespaces and check if the value is present in the input field
    if(todoInput.value.length == 0){
        smallField.innerHTML = "Input must not be empty!";
        return;
    }
    else{
        smallField.innerHTML = '';
        
        // Create a new list item
        let listItem = document.createElement("li");
        
        let delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fa fa-trash-o"></i>'; //Trash icon
        delBtn.classList.add("deleteBtn");
        
        // Add event listener to the delete button
        delBtn.addEventListener("click", function(e) {
            // The stopPropagation() method prevents propagation of the same event from being called.
            // Propagation means bubbling up to parent elements or capturing down to child elements.
            e.stopPropagation();
            
            // Check if the item is completed and update count if needed
            if(listItem.getAttribute("class") == "completed"){
                completedCount--;
                label.innerHTML = `${completedCount} färdiga`;
            }
            
            // Remove the list item from the DOM
            listItem.remove();
            
            // Update tasks count
            tasksCount--;
            tasksLabel.innerHTML = `${tasksCount} uppgifter`;
        });
        
        // Create a new span for items to be added
        const itemLabel = document.createElement("span");
        itemLabel.innerHTML = todoInput.value;
        
        // Append to array. DOM manipulation. Add the created "span" to "li"
        toDoArray.push(todoInput.value);
        listItem.appendChild(itemLabel);
        listItem.appendChild(delBtn);
        toDoItem.appendChild(listItem);
        
        // Update tasks count. Number of tasks entered
        tasksCount++;
        tasksLabel.innerHTML = `${tasksCount} uppgifter`;
        
        // Add click event to handle the completed tasks. Can add and remove the tasks completed.
        //The counter increases when the task is completed and decreases when unselecting the task.
        listItem.addEventListener("click", function() {
            if(listItem.getAttribute("class") == "completed"){
                listItem.setAttribute("class", "");
                completedCount--;
            } 
            else {
                listItem.setAttribute("class", "completed");
                completedCount++;
            }
        
        label.innerHTML = `${completedCount} färdiga`;
        });
        
        // Clear input field after the task is added. When the input field is clicked it focuses by highlighting the input field.
        todoInput.value = '';
        todoInput.focus();
        
        // Update completed count when the task is toggled
        label.innerHTML = `${completedCount} färdiga`;

        //Eventlistener to clear all the items in the list
        clearAll.addEventListener("click", function(){
            listItem.remove();
            completedCount = 0;
            tasksCount = 0;
            label.innerHTML = `${completedCount} färdiga`;
            tasksLabel.innerHTML = `${tasksCount} uppgifter`;

        });
    }
}