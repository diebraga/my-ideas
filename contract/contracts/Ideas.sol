// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ideas {
    struct IdeaType {
        string title;
        string message;
        uint timestamp;
    }

    // Mapping from an address to a list of ideas
    mapping(address => IdeaType[]) private ideasByAddress;

    event Idea(
        address indexed from,
        string title,
        string message,
        uint timestamp
    );

    function addIdea(
        string memory _title,
        string memory _message,
        uint _timestamp
    ) public {
        IdeaType memory newIdea = IdeaType(_title, _message, _timestamp);
        ideasByAddress[msg.sender].push(newIdea);

        emit Idea(msg.sender, _title, _message, _timestamp);
    }

    function getIdeasByAddress(
        address _address,
        uint start,
        uint limit
    ) public view returns (IdeaType[] memory) {
        uint totalIdeas = ideasByAddress[_address].length;

        if (start >= totalIdeas) {
            return new IdeaType[](0);
        }

        uint end = start + limit;
        if (end > totalIdeas) {
            end = totalIdeas;
        }

        IdeaType[] memory ideasSlice = new IdeaType[](end - start);
        for (uint i = start; i < end; i++) {
            ideasSlice[i - start] = ideasByAddress[_address][i];
        }

        return ideasSlice;
    }
}
