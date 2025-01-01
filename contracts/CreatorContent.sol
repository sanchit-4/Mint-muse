// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CreatorContent is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    
    struct Content {
        string title;
        string metadataHash;
        address creator;
        uint256 price;
        string copyright;
        uint256 likes;
        uint256 comments;
        uint256 earnings;
        bool isSubscriptionContent;
        uint256 subscriptionPrice;
        address[] collaborators;
        uint256[] collaboratorShares;
        uint256 royaltyPercentage;
        bool isFractionalized;
        uint256 fractionsAvailable;
    }

    struct Comment {
        address commenter;
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Content) public contents;
    mapping(address => uint256[]) public creatorContents;
    mapping(uint256 => Comment[]) public contentComments;
    mapping(address => mapping(uint256 => bool)) public contentSubscriptions;
    mapping(uint256 => mapping(address => uint256)) public contentFractions;

    event ContentCreated(uint256 tokenId, string title, address creator);
    event ContentPurchased(uint256 tokenId, address buyer, uint256 price);
    event CopyrightUpdated(uint256 tokenId, string newCopyright);
    event PriceUpdated(uint256 tokenId, uint256 newPrice);
    event ContentLiked(uint256 tokenId, address liker);
    event ContentCommented(uint256 tokenId, address commenter, string content);
    event SubscriptionPurchased(uint256 tokenId, address subscriber);
    event RoyaltyDistributed(uint256 tokenId, address recipient, uint256 amount);
    event FractionPurchased(uint256 tokenId, address buyer, uint256 amount);

    constructor() ERC721("CreatorContent", "CC") {}

    function createContent(
        string memory title,
        string memory metadataHash,
        uint256 price,
        string memory copyright,
        bool isSubscriptionContent,
        uint256 subscriptionPrice,
        address[] memory collaborators,
        uint256[] memory collaboratorShares,
        uint256 royaltyPercentage,
        bool isFractionalized,
        uint256 fractionsAvailable
    ) public returns (uint256) {
        require(collaborators.length == collaboratorShares.length, "Collaborator and share arrays must be the same length");
        require(royaltyPercentage <= 100, "Royalty percentage must be between 0 and 100");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, metadataHash);

        contents[newTokenId] = Content({
            title: title,
            metadataHash: metadataHash,
            creator: msg.sender,
            price: price,
            copyright: copyright,
            likes: 0,
            comments: 0,
            earnings: 0,
            isSubscriptionContent: isSubscriptionContent,
            subscriptionPrice: subscriptionPrice,
            collaborators: collaborators,
            collaboratorShares: collaboratorShares,
            royaltyPercentage: royaltyPercentage,
            isFractionalized: isFractionalized,
            fractionsAvailable: fractionsAvailable
        });

        creatorContents[msg.sender].push(newTokenId);

        emit ContentCreated(newTokenId, title, msg.sender);

        return newTokenId;
    }

    function purchaseContent(uint256 tokenId) public payable {
        Content storage content = contents[tokenId];
        require(msg.value >= content.price, "Insufficient payment");

        if (content.isFractionalized) {
            uint256 fractionsToSell = (msg.value * content.fractionsAvailable) / content.price;
            require(fractionsToSell > 0, "Not enough to purchase a fraction");
            contentFractions[tokenId][msg.sender] += fractionsToSell;
            content.fractionsAvailable -= fractionsToSell;
        } else {
            _transfer(content.creator, msg.sender, tokenId);
        }

        distributePayment(tokenId, msg.value);

        emit ContentPurchased(tokenId, msg.sender, msg.value);
    }

    function distributePayment(uint256 tokenId, uint256 amount) internal {
        Content storage content = contents[tokenId];
        uint256 royaltyAmount = (amount * content.royaltyPercentage) / 100;
        uint256 remainingAmount = amount - royaltyAmount;

        // Distribute royalties to creator
        payable(content.creator).transfer(royaltyAmount);
        emit RoyaltyDistributed(tokenId, content.creator, royaltyAmount);

        // Distribute remaining amount to collaborators
        uint256 totalShares = 0;
        for (uint256 i = 0; i < content.collaboratorShares.length; i++) {
            totalShares += content.collaboratorShares[i];
        }

        for (uint256 i = 0; i < content.collaborators.length; i++) {
            uint256 collaboratorAmount = (remainingAmount * content.collaboratorShares[i]) / totalShares;
            payable(content.collaborators[i]).transfer(collaboratorAmount);
            emit RoyaltyDistributed(tokenId, content.collaborators[i], collaboratorAmount);
        }

        content.earnings += amount;
    }

    function purchaseSubscription(uint256 tokenId) public payable {
        Content storage content = contents[tokenId];
        require(content.isSubscriptionContent, "This content does not offer subscriptions");
        require(msg.value >= content.subscriptionPrice, "Insufficient payment");

        contentSubscriptions[msg.sender][tokenId] = true;
        distributePayment(tokenId, msg.value);

        emit SubscriptionPurchased(tokenId, msg.sender);
    }

    function updateCopyright(uint256 tokenId, string memory newCopyright) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        contents[tokenId].copyright = newCopyright;
        emit CopyrightUpdated(tokenId, newCopyright);
    }

    function updatePrice(uint256 tokenId, uint256 newPrice) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        contents[tokenId].price = newPrice;
        emit PriceUpdated(tokenId, newPrice);
    }

    function likeContent(uint256 tokenId) public {
        contents[tokenId].likes += 1;
        emit ContentLiked(tokenId, msg.sender);
    }

    function commentOnContent(uint256 tokenId, string memory commentText) public {
        require(bytes(commentText).length > 0, "Comment cannot be empty");
        Comment memory newComment = Comment({
            commenter: msg.sender,
            content: commentText,
            timestamp: block.timestamp
        });
        contentComments[tokenId].push(newComment);
        contents[tokenId].comments += 1;
        emit ContentCommented(tokenId, msg.sender, commentText);
    }

    function getContent(uint256 tokenId) public view returns (Content memory) {
        return contents[tokenId];
    }

    function getCreatorContents(address creator) public view returns (uint256[] memory) {
        return creatorContents[creator];
    }

    function getAllContents() public view returns (Content[] memory) {
        Content[] memory allContents = new Content[](_tokenIds.current());
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            allContents[i - 1] = contents[i];
        }
        return allContents;
    }

    function getContentComments(uint256 tokenId) public view returns (Comment[] memory) {
        return contentComments[tokenId];
    }

    function isSubscribed(address user, uint256 tokenId) public view returns (bool) {
        return contentSubscriptions[user][tokenId];
    }

    function getFractionBalance(address user, uint256 tokenId) public view returns (uint256) {
        return contentFractions[tokenId][user];
    }
}

