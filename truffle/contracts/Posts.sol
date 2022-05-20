//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Posts {

    struct Post {
        uint id;
        address charityOrganizationAddress;
        string headline;
        string description;
        string readMoreUrl;
        bool deleted;
    }

    Post[] private posts;
    uint count = 0;

    function addPost(address charityOrganizationAddress, string memory headline, string memory description, string memory readMoreUrl) public {
        posts.push(Post(count, charityOrganizationAddress, headline, description, readMoreUrl, false));
        count++;
    }

    function updatePost(uint id, address charityOrganizationAddress, string memory headline, string memory description, string memory readMoreUrl) public {
        posts[id] =  Post(id, charityOrganizationAddress, headline, description, readMoreUrl, false);
    }

    function deletePostById(uint id) public {
        posts[id].deleted = true;
    }

    function getPostById(uint id) view 
                                  public 
                                  returns (Post memory) {
        return posts[id];
    }

    function getAllPosts() view 
                           public 
                           returns (Post[] memory) {
        return posts;
    }
}