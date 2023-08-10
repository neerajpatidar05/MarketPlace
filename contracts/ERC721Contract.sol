                // SPDX-License-Identifier: MIT
                pragma solidity ^0.8.9;

                import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
                import "@openzeppelin/contracts/access/Ownable.sol";
                import "@openzeppelin/contracts/utils/Counters.sol";

                contract ERC721Contract is ERC721, Ownable {
                    using Counters for Counters.Counter;

                    Counters.Counter private _tokenIdCounter;
                    string private _baseURIextended ;
                    constructor() ERC721("MyToken", "MTK") {}
                    mapping (uint256 => string) private _tokenURIs;
                    mapping(address => uint256[]) private _ownedTokens;
                    mapping(string => uint256) private _tokenURIToId;
                    struct mintedNft{
                        address owner;
                        uint256[] tokenId;
                    }
                    function setBaseURI(string memory baseURI_) external onlyOwner() {
                        _baseURIextended = baseURI_;
                    }
                    function safeMint(string memory _tokenURI) public  returns (uint256){
                        uint256 tokenId = _tokenIdCounter.current();
                        _tokenIdCounter.increment();
                        _safeMint(msg.sender, tokenId);
                        _setTokenURI(tokenId,_tokenURI);
                        _ownedTokens[msg.sender].push(tokenId);
                        _tokenURIToId[_tokenURI] = tokenId;
                        return tokenId;
                    }
                    function getTokenId(string memory _tokenURI) public view returns (uint256) {
                         return _tokenURIToId[_tokenURI];
                     }
                    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
                        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
                        _tokenURIs[tokenId] = _tokenURI;
                    }
                        
                    function _baseURI() internal view virtual override returns (string memory) {
                            return _baseURIextended;
                    }
                        
                        function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
                            require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

                            string memory _tokenURI = _tokenURIs[tokenId];
                            string memory base = _baseURI();
                            
                            if (bytes(base).length == 0) {
                                return _tokenURI;
                            }
                            if (bytes(_tokenURI).length > 0) {
                                return string(abi.encodePacked(base, _tokenURI));
                            }
                            return string(abi.encodePacked(base, tokenId));
                        }



                    function getOwnedNFTs(address owner) public view returns (string[] memory) {
                        uint256[] memory tokenIds = _ownedTokens[owner];
                        string[] memory tokenURIs = new string[](tokenIds.length);
                        address caller=owner;
                        for (uint256 i = 0; i < tokenIds.length; i++) {
                            if(ownerOf(tokenIds[i])==caller){
                            tokenURIs[i] = tokenURI(tokenIds[i]);
                           
                            }
                        }
                        
                        return tokenURIs;
                    }

                }
