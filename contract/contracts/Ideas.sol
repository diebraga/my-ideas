// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ideas {
    struct IdeaType {
        uint id;
        string title;
        string message;
        uint timestamp;
    }

    // Array to store all ideas
    IdeaType[] private allIdeas;

    // Mapping from an address to a list of idea indexes
    mapping(address => uint[]) private ideaIndexesByAddress;

    // Event to emit when a new idea is created
    event Idea(
        uint indexed id,
        address indexed from,
        string title,
        string message,
        uint timestamp
    );

    // Function to add a new idea
    function addIdea(
        string memory _title,
        string memory _message,
        uint _timestamp
    ) public {
        uint ideaId = allIdeas.length;
        allIdeas.push(IdeaType(ideaId, _title, _message, _timestamp));
        ideaIndexesByAddress[msg.sender].push(ideaId);

        emit Idea(ideaId, msg.sender, _title, _message, _timestamp);
    }

    // Function to get ideas by address
    function getIdeasByAddress(
        address _address,
        uint start,
        uint limit
    ) public view returns (IdeaType[] memory) {
        uint[] storage indexes = ideaIndexesByAddress[_address];
        uint totalIdeas = indexes.length;

        if (start >= totalIdeas) {
            return new IdeaType[](0);
        }

        uint end = start + limit;
        if (end > totalIdeas) {
            end = totalIdeas;
        }

        IdeaType[] memory ideasSlice = new IdeaType[](end - start);

        // Iterate backwards through the ideas array
        for (uint i = 0; i < end - start; i++) {
            // Calculate the index in the original array
            uint origIndex = totalIdeas - 1 - i - start;
            ideasSlice[i] = allIdeas[indexes[origIndex]];
        }

        return ideasSlice;
    }
}
