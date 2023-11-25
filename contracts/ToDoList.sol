// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ToDoList {
    // Struct to represent a to-do item
    struct ToDo {
        string title;
        string description;
        bool isCompleted;
    }

    // Mapping to associate each user with their to-do items
    mapping(address => ToDo[]) public userTodos;

    // Event emitted when a new to-do is added
    event ToDoAdded(address indexed user, string title, string description);

    // Function to add a new to-do item for the caller (msg.sender)
    function addTodo(string memory _title, string memory _description) public {
        // Create a new to-do item
        ToDo memory newTodo = ToDo({
            title: _title,
            description: _description,
            isCompleted: false
        });

        // Add the new to-do item to the array associated with the caller's address
        userTodos[msg.sender].push(newTodo);

        // Emit an event to signal that a new to-do has been added
        emit ToDoAdded(msg.sender, _title, _description);
    }

    // Function to get the total number of to-do items for the caller (msg.sender)
    function getTodoCount() public view returns (uint256) {
        return userTodos[msg.sender].length;
    }

    // Function to get details of a specific to-do item for the caller (msg.sender)
    function getTodo(
        uint256 index
    ) public view returns (string memory, string memory, bool) {
        require(index < userTodos[msg.sender].length, "Index out of bounds");
        ToDo storage todo = userTodos[msg.sender][index];
        return (todo.title, todo.description, todo.isCompleted);
    }
}
