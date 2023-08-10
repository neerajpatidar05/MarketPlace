// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Contract.sol";
contract NFTMarketplace {
    address public owner;
    uint256 public feePercentage; // Fee percentage taken by the marketplace
    enum SaleType{Auction, DirectSale}
    struct Sale {
        uint256 tokenId;
        address seller; 
        uint256 floorPrice; 
        bool active; 
        uint256 endAt;
        SaleType SaleType;
    }

    struct Request {
        address requester;
        uint256 amount;
    }

    mapping (uint256 => Request[]) public buyRequest;
    mapping(uint256 => Sale) public tokenIdToSale;
    mapping(address=>uint256[])public successfullyBuy;
    ERC721 public nftContract;
    uint256[] public listedTokenIds; // Array to store the listed token IDs
    event BidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event SaleCreated(uint256 indexed tokenId, address indexed seller, uint256 price);
    event SaleCancelled(uint256 indexed tokenId, address indexed seller);
    event SaleSuccessful(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event AuctionEnded(uint256 indexed tokenId, address indexed highestBidder, uint256 winningBid);
    event AuctionStarted(uint256 indexed tokenId,uint256 indexed floorPrice,uint256 indexed endAt);
    constructor(address _nftContract) {
        owner = msg.sender;
        feePercentage = 1; // 1% fee by default
        nftContract = ERC721(_nftContract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 5, "Fee percentage must be less than or equal to 5");
        feePercentage = _feePercentage;
    }

    function createSale(uint256 _tokenId, uint256 _price,uint256 _endAt,SaleType saleType) external {
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can create a sale");
        require(_price > 0, "Price must be greater than zero");
      
        tokenIdToSale[_tokenId] = Sale({
            tokenId: _tokenId,
            seller: msg.sender,
            floorPrice: _price,
            active: true,
            endAt:uint256(block.timestamp+_endAt),
            SaleType:saleType
        });
        removeTokenFromListed(_tokenId);
        listedTokenIds.push(_tokenId); 
        emit SaleCreated(_tokenId, msg.sender, _price);
    }
 
     function cancelSale(uint256 _tokenId) external {
        Sale storage sale = tokenIdToSale[_tokenId];
        require(sale.active, "Sale is not active");
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can cancel a sale");
        delete tokenIdToSale[_tokenId];
        sale.active=false;
           removeTokenFromListed(_tokenId); 
  
        emit SaleCancelled(_tokenId, msg.sender);
    }

    function removeTokenFromListed(uint256 _tokenId) internal {
        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            if (listedTokenIds[i] == _tokenId) {
                if (i != listedTokenIds.length - 1) {
                    listedTokenIds[i] = listedTokenIds[listedTokenIds.length - 1];
                }
                listedTokenIds.pop();
                break;
            }
        }
    }
    function modifySale(uint256 _tokenId,uint256 _floorPrice,SaleType saleType) external{
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can create a sale");
        require(_floorPrice > 0, "Price must be greater than zero");
        emit SaleCancelled(_tokenId, msg.sender);
        uint256 _endAt= tokenIdToSale[_tokenId].endAt;
            tokenIdToSale[_tokenId] = Sale({
            tokenId: _tokenId,
            seller: msg.sender,
            floorPrice: _floorPrice,
            active: true,
            endAt: _endAt,
            SaleType:saleType
        });

        emit SaleCreated(_tokenId, msg.sender, _floorPrice);
    }

    function buy(uint256 _tokenId) external payable {
        Sale storage sale = tokenIdToSale[_tokenId];
        require(sale.active, "Sale is not active");
        require(msg.value >= sale.floorPrice, "Insufficient payment");
        require(sale.endAt>=block.timestamp,"sale ended");
        address payable seller = payable(sale.seller);
        uint256 marketplaceFee = (sale.floorPrice * feePercentage) / 100;
        address originalOwner=sale.seller;
        delete tokenIdToSale[_tokenId];
        uint256 amountToSeller = msg.value-marketplaceFee;
        nftContract.transferFrom(originalOwner, msg.sender, _tokenId);
        seller.transfer(amountToSeller);

if (originalOwner != address(this)) {

        uint256[] storage ownerTokenIds = successfullyBuy[originalOwner];
        for (uint256 i = 0; i < ownerTokenIds.length; i++) {
            if (ownerTokenIds[i] == _tokenId) {
                if (i != ownerTokenIds.length - 1) {
                    ownerTokenIds[i] = ownerTokenIds[ownerTokenIds.length - 1];
                }
                ownerTokenIds.pop();
                break;
            }
        }
    }


        successfullyBuy[msg.sender].push(_tokenId);
        emit SaleSuccessful(_tokenId, sale.seller, msg.sender, sale.floorPrice);
    }

    function bid(uint256 tokenId)public payable {
      
        Sale storage auction = tokenIdToSale[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp <= auction.endAt, "Auction has ended");
        require(msg.value > auction.floorPrice, "Bid must be higher than the floor price");
        require(auction.SaleType==SaleType.Auction,"tokenid available for direct sale only");
       
        if(buyRequest[tokenId].length==0) {
        auction.floorPrice = msg.value;
        auction.seller = msg.sender;
        buyRequest[tokenId].push(Request(msg.sender,msg.value));
        }
        else {
        address payable previousBidder = payable(auction.seller);
        previousBidder.transfer(auction.floorPrice);
        auction.floorPrice = msg.value;
        auction.seller = msg.sender;
        buyRequest[tokenId].push(Request(msg.sender,msg.value));
        }
        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    function endAuction(uint256 tokenId) public onlyOwner{
        Sale storage auction = tokenIdToSale[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp >= auction.endAt, "Auction has not ended yet");
        address highestBidder = auction.seller;
        uint256 winningBid = auction.floorPrice;
        address payable seller = payable(nftContract.ownerOf(tokenId));
        nftContract.transferFrom(seller, highestBidder, tokenId);
        uint256 marketplaceFee = (winningBid * feePercentage) / 100;
        uint256 sellerProceeds = winningBid - marketplaceFee;
        seller.transfer(sellerProceeds);
        auction.active = false;
        emit AuctionEnded(tokenId, highestBidder, winningBid);
}

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }
       
    function getListedTokens() external view returns (Sale[] memory) {
        Sale[] memory listedTokens = new Sale[](listedTokenIds.length);
        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            uint256 tokenId = listedTokenIds[i];
            Sale memory sale =tokenIdToSale[tokenId];
            if(sale.endAt>block.timestamp){
            listedTokens[i] = tokenIdToSale[tokenId];
            }
        }
        return listedTokens;
    }
    function getSuccessfullyBoughtTokens(address _address) public view returns (uint256[] memory) {
       return successfullyBuy[_address];
}
}