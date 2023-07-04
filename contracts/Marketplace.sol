// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Contract.sol";

contract NFTMarketplace {
    address public owner;
    uint256 public feePercentage; // Fee percentage taken by the marketplace
    uint256 public startAt;
    uint256 private bidcounter;
    enum SaleType{Auction, DirectSale}
    struct Sale {
        uint256 tokenId;
        address seller; 
        uint256 floorPrice; 
        bool active; 
        uint endAt;
        SaleType SaleType;
    }
    struct Request {
        address requester;
        uint256 amount;
     }
    mapping (uint256 => Request[]) public buyRequest;
    // struct AuctionListing{
    //     uint256 tokenId;
    //     uint256 floorPrice;
    //     uint256 endTime;
    //     address seller; 
    //     bool active;
    // }
    //  1000000000000000000

   // mapping(uint256 => AuctionListing) public tokentoAuction;
    mapping(uint256 => Sale) public tokenIdToSale;
    ERC721 public nftContract;
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
        Sale storage sale = tokenIdToSale[_tokenId];
        require(sale.active==false,"token is already listed for sale");
       // nftContract.transferFrom(msg.sender, address(this), _tokenId);

        tokenIdToSale[_tokenId] = Sale({
            tokenId: _tokenId,
            seller: msg.sender,
            floorPrice: _price,
            active: true,
            endAt:uint256(block.timestamp+_endAt),
            SaleType:saleType
        });

        emit SaleCreated(_tokenId, msg.sender, _price);
    }

    function cancelSale(uint256 _tokenId) external {
        Sale storage sale = tokenIdToSale[_tokenId];
        require(sale.active, "Sale is not active");
        // require(sale.seller == msg.sender, "Only the seller can cancel the sale");
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only the token owner can create a sale");
     
        delete tokenIdToSale[_tokenId];
        sale.active=false;
        // sale.SaleType=2;
      //  nftContract.transferFrom(address(this), sale.seller, _tokenId);

        emit SaleCancelled(_tokenId, msg.sender);
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
            // Transfer funds to the seller and marketplace
   

        emit SaleSuccessful(_tokenId, sale.seller, msg.sender, sale.floorPrice);
    }

    // function startAuction(uint256 _tokenId,uint256 _timePeriod,uint256 _floorPrice,SaleType saleType)public{
    //     require(nftContract.ownerOf(_tokenId)== msg.sender);
    //     Sale storage auction = tokenIdToSale[_tokenId];
    //     require(auction.active==false,"tokenid is already listed for sale");
    //     uint256 _endAt=uint256(block.timestamp+_timePeriod);
    //     tokenIdToSale[_tokenId]=Sale({
    //         tokenId:_tokenId,
    //         floorPrice:_floorPrice,
    //         endAt:_endAt,
    //         active:true,
    //         seller:msg.sender,
    //         SaleType:saleType

    //        });
    //     emit AuctionStarted(_tokenId, _floorPrice,_endAt);
    // }

    function bid(uint256 tokenId)public payable {
      
        Sale storage auction = tokenIdToSale[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp <= auction.endAt, "Auction has ended");
        require(msg.value > auction.floorPrice, "Bid must be higher than the floor price");
        require(auction.SaleType==SaleType.Auction,"tokenid available for direct sale only");
       
        // Refund the previous highest bidder
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
   function check()public view returns (uint256){
       uint256 a=buyRequest[0].length;
       return a;
   }
    function endAuction(uint256 tokenId) public onlyOwner{
        Sale storage auction = tokenIdToSale[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp >= auction.endAt, "Auction has not ended yet");
 //address originalOwner=nftContract.ownerOf(tokenId);
        address highestBidder = auction.seller;
        uint256 winningBid = auction.floorPrice;
address payable seller = payable(nftContract.ownerOf(tokenId));
        // Transfer the NFT to the highest bidder
        //nftContract.transferFrom(originalOwner, highestBidder, tokenId);
 nftContract.transferFrom(seller, highestBidder, tokenId);
        // Distribute the funds: NFT price to the seller, marketplace fee to the owner
        uint256 marketplaceFee = (winningBid * feePercentage) / 100;
        uint256 sellerProceeds = winningBid - marketplaceFee;

       // address payable seller = payable(nftContract.ownerOf(tokenId));
        seller.transfer(sellerProceeds);
        //payable(owner).transfer(marketplaceFee);

        // Mark the auction as inactive
        auction.active = false;

        emit AuctionEnded(tokenId, highestBidder, winningBid);
}

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }
}
