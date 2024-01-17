// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ideas {
    struct Idea {
        bytes32 title; // Use bytes32 for shorter titles, or string for longer text
        string description;
        address from; // Address of the idea submitter
        uint timestamp;
    }

    Idea[] private ideas;

    // Function to add a new idea
    function addIdea(
        bytes32 _title,
        string memory _description,
        uint _timestamp
    ) public {
        ideas.push(Idea(_title, _description, msg.sender, _timestamp));
    }

    // Function to get a list of ideas filtered by an address
    function getIdeasByAddress(
        address _address
    ) private view returns (Idea[] memory) {
        Idea[] memory filteredIdeas = new Idea[](ideas.length);
        uint count = 0;

        // Populate the array with ideas that match the address
        for (uint i = 0; i < ideas.length; i++) {
            if (ideas[i].from == _address) {
                filteredIdeas[count] = ideas[i];
                count++;
            }
        }

        // Copy to a correctly sized array
        Idea[] memory correctlySizedArray = new Idea[](count);
        for (uint i = 0; i < count; i++) {
            correctlySizedArray[i] = filteredIdeas[i];
        }

        return correctlySizedArray;
    }

    // Function to get ideas within a range, filtered by an address
    function getIdeas(
        uint startIndex,
        uint endIndex,
        address _address
    ) public view returns (Idea[] memory) {
        Idea[] memory _ideas = getIdeasByAddress(_address);

        if (endIndex > _ideas.length) {
            endIndex = _ideas.length;
        }
        if (startIndex >= endIndex) {
            return new Idea[](0); // Return an empty array if the range is invalid
        }

        Idea[] memory ideasSlice = new Idea[](endIndex - startIndex);

        for (uint i = startIndex; i < endIndex; i++) {
            ideasSlice[i - startIndex] = _ideas[i];
        }
        return ideasSlice;
    }
}
