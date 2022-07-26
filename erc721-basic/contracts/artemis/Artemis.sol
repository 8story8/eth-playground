// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract Artemis is ERC721URIStorage, ERC721Enumerable, ERC721Royalty, Ownable {
    using SafeMath for uint256;

    uint256 public constant MAX_SUPPLY = 100;

    uint256 public constant GENERAL_SUPPLY = 90;

    uint256 public generalTokenCnt = 1;

    uint256 public maxMintPerTx = 10;

    uint256 public constant GENERAL_TOKEN_PRICE = 1000000000000000; // 0.001 ETH

    uint256 public SPECIAL_SUPPLY = MAX_SUPPLY.sub(GENERAL_SUPPLY);  // 10

    uint256 public specialTokenCnt = 1;

    uint256 public specialTokenId = GENERAL_SUPPLY.add(1);  // 91

    string public BASE_URI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator
    ) ERC721(name, symbol) {
        BASE_URI = baseURI;
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    function mintGeneral(uint256 quantity) public payable {
        require(
            quantity <= maxMintPerTx,
            "The quantity would exceed maxMintPerTx."
        );
        require(
            generalTokenCnt.sub(1).add(quantity) <= GENERAL_SUPPLY,
            "Minting would exceed general supply."
        );
        require(
            msg.value >= GENERAL_TOKEN_PRICE.mul(quantity),
            "ETH sent would be not enough."
        );
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, generalTokenCnt++);
        }
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function mintSpecial(address receiver) public onlyOwner {
        require(
            specialTokenCnt <= SPECIAL_SUPPLY,
            "Minting would exceed special supply."
        );
        _safeMint(receiver, specialTokenId++);
        specialTokenCnt++;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        BASE_URI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return BASE_URI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function setRoyalty(address royaltyReceiver, uint96 royaltyFeeNumerator)
        public
        onlyOwner
    {
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    function deleteRoyalty() public onlyOwner {
        _deleteDefaultRoyalty();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage, ERC721Royalty)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable, ERC721Royalty)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
