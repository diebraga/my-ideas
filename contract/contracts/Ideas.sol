// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Here's the contract or class with all the methods inside
contract Ideas {
    // Here's a interface to define hows the idea object
    struct IdeaType {
        uint id;
        string title;
        string message;
        uint timestamp;
    }

    // Array variable to store all ideas
    // but as you can no class or program out of this
    // contract can retirive the entire list of ideas
    IdeaType[] private allIdeas;

    // Mapping from an address to a list of idea indexes
    mapping(address => uint[]) private ideaIndexesByAddress;

    // Event to emit when a new idea is created this is the same as a function or method
    event Idea(
        uint indexed id,
        address indexed from,
        string title,
        string message,
        uint timestamp
    );

    // Function to add a new idea when calling this function
    function addIdea(
        string memory _title,
        string memory _message,
        uint _timestamp
    )
        public
    // as you can see the function is public progrms out of this clss can call it
    {
        // assign the length as unique id each idea will be id 1, 2, 3 and so on
        uint ideaId = allIdeas.length;

        // this line pushes the new idea to the allIdeas variable array
        allIdeas.push(IdeaType(ideaId, _title, _message, _timestamp));
        ideaIndexesByAddress[msg.sender].push(ideaId);
        // store in the blockchain
        emit Idea(ideaId, msg.sender, _title, _message, _timestamp);
    }

    // Function to get ideas by address
    function getIdeasByAddress(
        address _address,
        uint start,
        uint limit
    )
        public
        view
        returns (
            // as you can see the function is public progrms out of this clss can call it
            // It's also a view function or read-only it means that it basicly means that
            // you can only retrieve data and does not make any mutation so you won't spend any gas
            IdeaType[] memory
        )
    {
        // create an array based on the address so it will contain only ideas
        // that match the specific wallet address
        uint[] storage indexes = ideaIndexesByAddress[_address];

        // variable that stores the length of the array
        uint totalIdeas = indexes.length;

        // Return an empty array if the starting index is out of range
        if (start >= totalIdeas) {
            return new IdeaType[](0);
        }

        uint end = start + limit; // Calculate the ending index based on the limit
        if (end > totalIdeas) {
            end = totalIdeas; // Ensure the ending index does not exceed the total number of ideas
        }

        // Prepare an array slice to hold the ideas to be returned
        IdeaType[] memory ideasSlice = new IdeaType[](end - start);

        // Iterate through the ideas in reverse order
        // example if you stored 1 and 2 I want to render the idea 2 at the top and the one at the bottom
        // this loop is made to to increasilly fetch data istead of fetching everything at once
        for (uint i = 0; i < end - start; i++) {
            // Calculate the index in the original allIdeas array
            uint origIndex = totalIdeas - 1 - i - start;
            ideasSlice[i] = allIdeas[indexes[origIndex]]; // Populate the ideasSlice array with ideas
        }

        // Returns paginated ideaas by address sent.
        return ideasSlice;
    }
}
