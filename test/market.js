const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Market", function () {
  let usdt, market, myNft, account1, account2;
  let baseURI = "https://sameple.com/";

  beforeEach(async () => {
    [account1, account2] = await ethers.getSigners();
    // const MAX_ALLOWANCE = BigNumber.from(2).pow(256).sub(1);
    const USDT = await ethers.getContractFactory("cUSDT");
    usdt = await USDT.deploy();
    const MyNFT = await ethers.getContractFactory("NFTM");
    myNft = await MyNFT.deploy(account1.address);
    const Market = await ethers.getContractFactory("Market");
    market = await Market.deploy(usdt.target, myNft.target);
    // console.log(account1)

    await myNft.safeMint(account1.address, baseURI + "0");
    await myNft.safeMint(account1.address, baseURI + "1");
    await myNft.approve(market.target, 0);
    await myNft.approve(market.target, 1);
    await usdt.transfer(account2.address, "10000000000000000000000");
    await usdt.connect(account2).approve(market.target, "1000000000000000000000000");
  });

  it('its erc20 address should be usdt', async function () {

    expect(await market.erc20()).to.equal(usdt.target);
  });

  it('its erc721 address should be myNft', async function () {

    expect(await market.erc721()).to.equal(myNft.target);
  });

  it('account1 should have 2 nfts', async function () {

    expect(await myNft.balanceOf(account1.address)).to.equal(2);
  });

  it('account2 should have 10000 USDT', async function () {

    expect(await usdt.balanceOf(account2.address)).to.equal("10000000000000000000000");
  });

  it('account2 should have 0 nfts', async function () {

    expect(await myNft.balanceOf(account2.address)).to.equal(0);
  });

  it('account1 can list two nfts to market', async function () {
    const price = "0x0000000000000000000000000000000000000000000000000001c6bf52634000";
       // account1 上架两个nft,调用onERC721Received
       await market.onERC721Received(account1.address, account1.address, 0, price);
       await market.onERC721Received(account1.address, account1.address, 1, price);
      
    
    // account1 查看自己上架的nft
    const list = await market.getNFTsByOwner(account1.address);
    expect(list.length).to.equal(2);
     expect(list[0].seller).to.equal(account1.address);
     expect(list[0].tokenId).to.equal(0);
     expect(list[0].price).to.equal(price);
     expect(list[1].seller).to.equal(account1.address);
     expect(list[1].tokenId).to.equal(1);
     expect(list[1].price).to.equal(price);
    

  })

  it('account1 can unlist one nft from market', async function () {

    const price = "0x0000000000000000000000000000000000000000000000000001c6bf52634000";
    expect(await myNft['safeTransferFrom(address,address,uint256,bytes)']
      (account1.address, market.target, 0, price));
    expect(await myNft['safeTransferFrom(address,address,uint256,bytes)']
      (account1.address, market.target, 1, price));
    expect(await market.isListed(1)).to.equal(true);
    expect(await market.connect(account1).cancelOrder(1));
    expect(await market.isListed(1)).to.equal(false);
  })

  it('account1 can change price of nft from market', async function () {
    const price = "0x0000000000000000000000000000000000000000000000000001c6bf52634000";
    expect(await myNft['safeTransferFrom(address,address,uint256,bytes)']
      (account1.address, market.target, 0, price));
    expect(await myNft['safeTransferFrom(address,address,uint256,bytes)']
      (account1.address, market.target, 1, price));
    expect((await market.getAllNFTs())[0][2]).to.equal(500000000000000);
    expect(await market.connect(account1).changePrice(0, 1000000000));
    expect((await market.getAllNFTs())[0][2]).to.equal(1000000000);
    expect((await market.connect(account1).getMyNFTs())[0][2]).to.equal(1000000000);

  })

  it('account2 can buy nft from market', async function () {
    const price = "0x0000000000000000000000000000000000000000000000000001c6bf52634000";
    expect(await myNft['safeTransferFrom(address,address,uint256,bytes)']
      (account1.address, market.target, 0, price));
    expect(await myNft['safeTransferFrom(address,address,uint256,bytes)']
      (account1.address, market.target, 1, price));
    expect((await market.getAllNFTs())[0][0]).to.equal(account1.address)
    expect(await market.connect(account2).buy(0));
    expect(await myNft.balanceOf(account2.address)).to.equal(1);

  })
})
