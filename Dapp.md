# DApp 设计与开发

> **提示：建议先观看课程视频，这样记忆会更深刻，笔记是配合视频学习的。另外老师会提到很多案例还有建议，这些都很重要，本文档只用于记录知识点。**


## 一、简介

### 相关技术栈

- Solidty / JavaScript
- Node.js / React.js
- Hardhat / Remix IDE / Metamask
- ERC20 / ERC721 / Openzepplin
- VScode / Github / Vercel / Cloudflare
- IPFS / The Graph / Readthedocs

---

### 智能合约工程师的基本素质

- 安全
- 测试
- 英语
- 人品 and 快速学习能力

---

## 二、区块链基本概念

- 账户与钱包
- 区块链浏览器
- 本地链 / 测试网 / 主网
- 本地环境 / 测试环境 / 生产环境
- Provider / Relay Network

### 私钥、公钥生产的方式

**私钥：**

1. 私钥是256位的随机数
2. 在随机数前插入版本号，后面附加压缩标志和校验码（经过两次SHA-256的算法校验，取两次哈希结果的前四个字节作为校验码）
3. 通过 Base56 Encode 成更容易阅读和管理的编码数据（与第二步可互相转化）

**公钥：**

1. 得到私钥之后利用椭圆曲线加密算法计算所对应的非压缩公钥，生成的公钥一共65字节，其中一个字节是0x04，其中32个字节是X坐标，另外32个字节是Y坐标
2. 将第一步得到的公钥地址进行SHA-256哈希计算
3. 取上一步结果，进行RIPEMD-160计算
4. 取上一步结果，在其前面加上地址版本号
5. 取上一步结果，进行两次SHA-256计算
6. 取上一步的前4个字节（8位十六进制），追加到**第4步**的结果后面
7. 最后用 Base58 Encode 得到最后的结果

---

### 钱包与账户

**`"Not your keys, not your coins"`**

钱包即管理私钥的工具。

**钱包的类型：**

- 纸钱包
- 冷钱包
- 热钱包
- 网页钱包
- 手机钱包
- 硬件钱包
- 交易所
- 随机钱包
- 种子钱包
- ...

**BIP39：**

BIP：*Bitcoin* *Improvement Proposal*

github：[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

意义：提供一种易于使用和安全的方法来管理加密货币钱包的助记词。

**私钥的保管方式：**

- 每次接收别人的转账时使用新地址
- 私钥不能接触网络
- ...

> 这块老师还提了很多私钥泄露的故事，可以了解保管私钥的方式有多么重要，推荐看一遍。

---

### 区块链浏览器

区块浏览器（Block Explorer）是一种用于查看和分析区块链数据的工具。

区块浏览器可以用于多种用途，例如：

- 查看交易历史记录
- 查看地址余额
- 查看区块信息
- 查看智能合约
- ...

> 老师还提到有很多新加入的功能，比如不通过Wallet去对合约地址进行交互等等

---

### 产品开发流程

1. 分析需求
2. 开发
3. 测试与审计
4. 部署到测试网
5. 部署到主网

---

### 本地环境、测试环境与生产环境

本地环境、测试环境和生产环境是软件开发中常用的三种环境。它们之间的主要区别在于它们的目的和使用方式。

1. 本地环境：本地环境是指开发人员在本地计算机上搭建的开发环境。它通常用于开发和测试新功能，以及进行单元测试和集成测试等。本地环境通常包括开发工具、数据库、Web 服务器和其他必要的软件组件。
2. 测试环境：测试环境是指专门用于测试软件的环境。它通常是一个独立的环境，与生产环境隔离开来，以便测试人员可以在不影响生产环境的情况下进行测试。测试环境通常包括与生产环境相同的硬件和软件配置，以确保测试结果的准确性。
3. 生产环境：生产环境是指软件正式部署和运行的环境。它通常是一个稳定的环境，用于处理实际的业务流程和用户请求。生产环境通常需要高可用性、高性能和高安全性，以确保系统的稳定性和可靠性。

---

### Provider 与 Relay Network

**Provider：**

解决用户与区块链进行交互的问题，即用户与区块链交互的方式，例如钱包。

**Relay Network：**

Relay Network 是一种用于加速以太坊交易的网络。它是由 MetaMask 团队开发的，旨在提高以太坊交易的速度和可靠性。Relay Network 的主要特点是它可以通过中继节点来转发交易，从而减少交易的等待时间和燃气费用。

Relay Network 的工作原理如下：

1. 用户将交易发送到 Relay Network。
2. Relay Network 将交易转发到中继节点。
3. 中继节点验证交易，并将其转发到以太坊网络。
4. 以太坊网络处理交易，并将结果返回给中继节点。
5. 中继节点将结果返回给 Relay Network。
6. Relay Network 将结果返回给用户。

通过使用 Relay Network，给用户提供接口，使用户可以不用跑全节点，例如`infura`。用户可以将交易发送到一个中心化的网络，而不是直接发送到以太坊网络。这可以减少交易的等待时间和燃气费用，从而提高交易的速度和可靠性。同时，Relay Network 还提供了一些额外的功能，例如交易重放和交易取消等。

---

## 三、NFT交易市场简介

### OpenSea

OpenSea是部署在以太坊上的项目，需要用户提前准备好一个以太坊钱包（网页版推荐MetaMask钱包），且准备ETH作为手续费。OpenSea支持包括ETH、WHALE、RARI、WETH、USDC、DAI 等代币支付，具体要看 NFT 所有人是以哪种代币进行标价（主要以ETH支付为主）。

> 具体交互视频里有演示

---

## 四、Remix IDE的基本使用

最好使用网页版的Remix，本地版的Remix除了可以离线使用之外，都不如网页版的Reimx。

### WorkSpace

点击创建WorkSpace后会默认生成三个合约，Storage、Owner与Ballot：

![image-20231104193400563](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104193400563.png)

![image-20231104193422401](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104193422401.png)

---

### 部署方式

1. 通过TS脚本去部署

   编译后点击scripts目录下的`deploy_with_ether.ts`：

   ![image-20231104202634964](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104202634964.png)

![image-20231104202647821](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104202647821.png)

2. 选择remix中的部署按钮部署：

   ![image-20231104202903319](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104202903319.png)

---

部署之后会可以点击按钮查看合约信息：

![image-20231104203115252](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104203115252.png)

### Debug

调用store函数输入数值，并打开交易信息。复制信息中的 transaction hash 到`Debugger`按钮中的输入框进行debug：

![image-20231104203510037](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104203510037.png)

可以查看函数或者变量在运行中的状态。

---

### 测试

选择`Solidity uint testing`按钮，这是remix自带的测试目录，用户测试时需要自己去编写测试合约，Pass✔：

![image-20231104204317181](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104204317181.png)

---

### Remix d

点击Remix图标回到Home主页，在Files中选择Access File System，可以使用Remixd的npm使本地文件与Remix IDE进行连接：

![image-20231104204727798](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104204727798.png)

![image-20231104204736079](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104204736079.png)

> 本地必须安装node.js

在本地目录的命令行中输入：

`remixd -s <path-to-the-shared-folder> --remix-ide <Remix IDE URL>`

即可连接本地文件，要注意在Remix IDE中修改了文件，本地文件也会更改，并且不会提示。若本地修改，Remix IDE会出现提示。

---

### USDT示例

URL：[Tether USD](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#code)

复制 Contract Source Code 到Remix IDE中，连接metamask切换到以太坊主网。修改编译器版本后进行编译，选择TetherToken合约并在At Address中输入Token contract address：

![image-20231104211937214](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104211937214.png)

即可不需要前端或者后端对合约进行交互。

---

## 五、Hardhat基本使用

Hardhat 是一个用于以太坊开发的开源开发环境。它提供了一系列工具和库，可以帮助开发者更轻松地编写、测试和部署智能合约。Hardhat 支持 Solidity 和 Vyper 两种智能合约语言，并提供了一系列插件，可以与其他工具和服务集成，例如 Truffle、Etherscan、Infura 等。

### 安装Hardhat

```shell
npm install hardhat
```

---

### Hardhat 初始化

```shell
npx hardhat init
```

![image-20231104213943624](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104213943624.png)

根据提示步骤进行。

---

### Hardhat 任务

```shell
npx hardhat 
```

可以查看任务列表

---

### 编译

```shell
npx hardhat compile
```

![image-20231104215103407](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104215103407.png)

编译通过后会生成两个文件夹`artifacts`和`cache`：

![image-20231104215213374](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104215213374.png)

artifacts目录下的合约同名json文件中会有合约的ABI。

---

### 测试

```shell
npx hardhat test
```

可以通过`hardhat/console.sol`去打印测试状态信息

---

### 部署

```shell
npx hardhat run scripts/deploy.js
```

![image-20231104220813047](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104220813047.png)

会将该合约部署到Hardhat的VM中

查看Hardhat VM：

```shell
npx hardhat node
```

![image-20231104221005693](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104221005693.png)

hardhat与remix连接：

![image-20231104221708187](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104221708187.png)

部署到测试网：

修改`hardhat.config.js`：

![image-20231104222438530](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104222438530.png)

运行命令：

```shell
npx hardhat run scripts/deploy.js --network testnet
```

执行成功：

![image-20231104224221923](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231104224221923.png)

可以前往测试网浏览器查看detail

---

## 六、测试驱动开发 TDD

测试驱动开发(Test Driven Development)，是一种不同于传统软件开发流程的新型的开发方法。它要求在编写某个功能的代码之前先编写测试代码，然后只编写使测试通过的功能代码通过测试来推动整个开发的进行。这有助于编写简洁可用和高质量的代码，并加速开发过程。

![image-20231107093513852](https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231107093513852.png)

TDD流程：

<img src="https://github.com/bookerhuang/Learning-Notes/blob/main/Web3/imgs/image-20231107093949946.png" alt="image" width="70%" height="70%">

### 测试驱动开发的好处

- 降低开发者负担
- 保护网
- 提前澄清需求
- 快速反馈

---

### 实施测试驱动开发的要点

1. 分析问题并拆分：把问题分解成一个个可以操作的任务
2. 代码设计：规划、设计功能的实现

### 案例演示

**功能设计：**

1. 可以查看总共有多少信件
2. 当有新的信件到来时，总信件数 + 1
3. 存储信件内容并可查看
4. 存储信件发送人并可查看

JS测试代码：

```js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mailbox", async () => {
	it("should get mailbox contract", async () => {
		const mailboxContract = await ethers.getContractFactory("Mailbox");
	});

	it("should get total letters in the box", async () => {
		const mailboxContract = await ethers.getContractFactory("Mailbox");
		const mailbox = await mailboxContract.deploy();

		expect(await mailbox.totalLetters()).to.equal(0);
	});

	it("should increase by one when get new letter", async () => {
		const mailboxContract = await ethers.getContractFactory("Mailbox");
		const mailbox = await mailboxContract.deploy();

		await mailbox.write("hello");
		expect(await mailbox.totalLetters()).to.equal(1);
	});

	it("should get mail contract", async () => {
		const mailboxContract = await ethers.getContractFactory("Mailbox");
		const mailbox = await mailboxContract.deploy();

		await mailbox.write("hello");
		const letters = await mailbox.read();
		expect(letters[0].letter).to.equal("hello");
	});

	it("should get mail sender", async () => {
		const mailboxContract = await ethers.getContractFactory("Mailbox");
		const mailbox = await mailboxContract.deploy();

		await mailbox.write("hello");
		const letters = await mailbox.read();
		expect(letters[0].sender).to.equal(
			"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
		);
	});
});
```

合约代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Mailbox {
    uint public totalLetters;

    struct Letter {
        string letter;
        address sender;
    }

    Letter[] private letters;

    function write(string memory letter) public {
        letters.push(Letter(letter, msg.sender));
        totalLetters++;
    }

    function read() public view returns (Letter[] memory) {
        return letters;
    }
}
```
##  七、ERC20

### ERC20简介

ERC20 是以太坊上最常见的代币标准之一，它定义了一系列标准接口，用于实现代币的基本功能，例如转账、查询余额等。ERC20 代币可以在以太坊上进行交易，也可以用于支付燃气费用。

### ERC20 属性

ERC20 代币具有以下属性(可选项)：

- 名称（name）：代币的名称，例如“以太坊”。
- 符号（symbol）：代币的符号，例如“ETH”。
- 小数位数（decimals）：代币的小数位数，例如 18。


### ERC20 标准接口

ERC20 标准接口定义了一系列函数，用于实现代币的基本功能，例如转账、查询余额等。ERC20 标准接口的定义如下：

```solidity
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```
### oppenZeppelin简介

OpenZeppelin 是一个开源的以太坊智能合约库，提供了一系列安全的智能合约，可以帮助开发者更轻松地构建、部署和测试智能合约。OpenZeppelin 提供了一系列标准的智能合约，例如 ERC20、ERC721、ERC777 等，可以帮助开发者更轻松地实现代币、非同质化代币、代币众筹等功能。

### safeERC20

safeERC20 是 OpenZeppelin 提供的一个库，用于安全地实现 ERC20 代币的转账功能。它提供了一系列安全的 ERC20 代币转账函数，可以帮助开发者更轻松地实现 ERC20 代币的转账功能。类似于WETH，将ETH转换成ERC20代币。作用是防止合约开发者未按照 ERC20 标准（包括参数与返回值）实现代币的转账功能，从而导致代币无法转账的问题。


##  八、ERC721

### ERC721简介

ERC721 是以太坊上最常见的非同质化代币标准之一，它定义了一系列标准接口，用于实现非同质化代币的基本功能，例如转账、查询余额等。ERC721 代币可以在以太坊上进行交易，也可以用于支付燃气费用。

### ERC721 接口

ERC721 标准接口定义了一系列函数，用于实现非同质化代币的基本功能，例如转账、查询余额等。ERC721 标准接口的定义如下：

```solidity
interface IERC721 {
	event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
	event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
	event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
	function balanceOf(address owner) external view returns (uint256 balance);
	function ownerOf(uint256 tokenId) external view returns (address owner);
	function safeTransferFrom(address from, address to, uint256 tokenId) external;
	function transferFrom(address from, address to, uint256 tokenId) external;
	function approve(address to, uint256 tokenId) external;
	function getApproved(uint256 tokenId) external view returns (address operator);
	function setApprovalForAll(address operator, bool _approved) external;
	function isApprovedForAll(address owner, address operator) external view returns (bool);
	function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
}
```

### ERC165 接口 (可选)

ERC165 标准接口定义了一系列函数，用于实现智能合约的接口检测功能。ERC165 标准接口的定义如下：

```solidity
interface IERC165 {
	function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```
例如是否支持ERC721TokenReceiver接口 -- 当合约接收到ERC721代币时，会调用该接口。

```solidity
interface ERC721TokenReceiver {
	function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}
```

### ERC721Metadata 接口 (可选)

ERC721Metadata 标准接口定义了一系列函数，用于实现非同质化代币的元数据功能。ERC721Metadata 标准接口的定义如下：

```solidity
interface IERC721Metadata {
	function name() external view returns (string memory);
	function symbol() external view returns (string memory);
	function tokenURI(uint256 tokenId) external view returns (string memory);
}
```

### ERC721Enumerable 接口 (可选)

ERC721Enumerable 标准接口定义了一系列函数，用于实现非同质化代币的枚举功能。ERC721Enumerable 标准接口的定义如下：

```solidity
interface IERC721Enumerable {
	function totalSupply() external view returns (uint256);
	function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId);
	function tokenByIndex(uint256 index) external view returns (uint256);
}
```

### ERC 1155

ERC1155 是以太坊上最常见的多重代币标准之一，它定义了一系列标准接口，用于实现多重代币的基本功能，例如转账、查询余额等。ERC1155 代币可以在以太坊上进行交易，也可以用于支付燃气费用。

功能：①可以在一个合约中实现多种代币；
    ②可以在一个合约中实现多种代币的转账功能；
	③可以在一个合约中实现多种代币的批量转账功能；

作用：①减少燃料费用；
      ②降低交易数量；
	  ③减少合约数量；
	  ④减少合约占用的存储空间。

### ERC1155 接口

ERC1155 标准接口定义了一系列函数，用于实现多重代币的基本功能，例如转账、查询余额等。ERC1155 标准接口的定义如下：

```solidity
interface IERC1155 {
	event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
	event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values);
	event ApprovalForAll(address indexed account, address indexed operator, bool approved);
	event URI(string value, uint256 indexed id);
	function balanceOf(address account, uint256 id) external view returns (uint256);
	function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory);
	function setApprovalForAll(address operator, bool approved) external;
	function isApprovedForAll(address account, address operator) external view returns (bool);
	// id 为代币的ID，value 为代币的数量，data 为代币的元数据
	function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
	function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) external;
}
```

## 图床简介

### 什么是图床

图床是一种用于存储图片的服务，可以将图片上传到图床，然后通过链接来访问图片。图床可以帮助开发者更轻松地存储和管理图片，从而提高开发效率。
建议使用去中心化的图床，例如 IPFS、Arweave 等。

## Express.js

### Express.js 简介

Express.js 是一个基于 Node.js 平台的 Web 开发框架，它提供了一系列功能强大的 API，可以帮助开发者更轻松地构建 Web 应用程序。Express.js 提供了一系列中间件，可以帮助开发者更轻松地实现路由、请求处理、错误处理等功能。

### Express.js 安装

```shell
npm install express
```

### Express.js 使用

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
```

### Express.js 中间件

Express.js 中间件是一个函数，用于处理 HTTP 请求。它可以访问 HTTP 请求对象（req）、HTTP 响应对象（res）和下一个中间件函数（next），并且可以修改 HTTP 请求对象（req）和 HTTP 响应对象（res）。Express.js 中间件的定义如下：

```js
const middleware = (req, res, next) => {
	// ...
	next();
};
```
使用中间件：

```js
app.use(middleware);
```
内置中间件：

```js
// 作用：用于解析 HTTP 请求体
app.use(express.json());
```

### Express.js 模板引擎

Express.js 模板引擎是一个函数，用于将模板转换为 HTML 字符串。这里使用 Pug 模板引擎，它提供了一系列功能强大的 API，可以帮助开发者更轻松地实现模板功能。Express.js 模板引擎的定义如下：

安装

```shell
npm install pug
```

使用

```js
app.set("view engine", "pug");
app.set("views", "./views");
```

在views目录下创建home.pug文件：
```js
html
	head
		title= title
	body
		h1= message
```

在app.js中使用：

```js
app.get("/", (req, res) => {
	res.render("home", { title: "Home", message: "Hello World!" });
});
```

### nodemon

nodemon 是一个基于 Node.js 平台的开发工具，它可以帮助开发者更轻松地开发 Node.js 应用程序。nodemon 提供了一系列功能强大的 API，可以帮助开发者更轻松地实现自动重启、自动编译等功能。

安装

```shell
npm install nodemon
```

使用

```shell
nodemon app.js
```
## IPFS

### IPFS 简介

IPFS 是一个去中心化的分布式文件系统，它提供了一系列功能强大的 API，可以帮助开发者更轻松地存储和管理文件。IPFS 提供了一系列工具，可以帮助开发者更轻松地实现文件上传、文件下载等功能。

### IPFS 安装 (Linux)

```shell
wget https://dist.ipfs.tech/kubo/v0.24.0/kubo_0.24.0_linux_amd64.tar.gz
tar -xvzf kubo_0.24.0_linux_amd64.tar.gz
cd kubo
sudo bash install.sh

ipfs version
```

### IPFS 使用

上传文件 -- 会返回一个hash值

```shell
ipfs add <file>
```

下载文件

```shell
ipfs get <hash>
```
查找文件

```shell
ipfs cat <hash>
```

启动 IPFS

```shell
ipfs daemon

curl http://localhost:8080/ipfs/<hash>
```


## React 基础

### React 简介

React 是一个基于 JavaScript 的前端开发框架，它提供了一系列功能强大的 API，可以帮助开发者更轻松地构建 Web 应用程序。React 提供了一系列组件，可以帮助开发者更轻松地实现组件化开发、状态管理等功能。

### React 初始化

```shell
npx create-react-app my-app
cd my-app
code .
npm run start
```

### React 组件

React 组件是一个函数，用于将组件转换为 HTML 字符串。React 组件的定义如下：

```js
function Welcome(props) {
	// 像这样定义的组件称为函数组件，retrun后面的内容就是组件的内容，称为JSX语法
	return <h1>Hello, {props.name}</h1>;
}
```

### React 组件使用

```js
function Welcome(){
	return <h1>Hello, World!</h1>;
}

function App() {
	// 使用组件
	return (
		<div>
			<Welcome /> 
			<Welcome /> 
			<Welcome />  
		</div>
	);
}

```

### React 状态

React 状态是一个变量，用于存储组件的状态。

#### 使用

先引入useState

```js
import React, { useState } from "react";
```

定义组件如下 ： 定义一个count变量，setCount是用来修改count的函数


```js
function App() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```
### React 属性

React 属性是一个变量，用于存储组件的属性。

#### 使用

```js
function Welcome({name}) {
	return <h1>Hello, {name}</h1>;
}

function App() {
	return (
		<div>
			<Welcome name="World" />
		</div>
	);
}
```
#### use effect

useEffect 是一个函数，用于处理副作用。它可以访问 React 状态（state）和 React 属性（props），并且可以修改 React 状态（state）。useEffect 的定义如下：

导入

```js
import React, { useState, useEffect } from "react";
```

使用

```js
function App() {
	const [count, setCount] = useState(0);
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});

	/*
	如果只需要监听count变化，可以这样写
	
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	}, [count]);
  */

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

## Github Pages

### Github Pages 简介

Github Pages 是一个基于 Github 平台的静态网站托管服务，它提供了一系列功能强大的 API，可以帮助开发者更轻松地部署静态网站。Github Pages 提供了一系列工具，可以帮助开发者更轻松地实现静态网站的部署、静态网站的访问等功能。

## Cloudflare

### Cloudflare 简介

Cloudflare 是一个基于云计算平台的网络服务提供商，它提供了一系列功能强大的 API，可以帮助开发者更轻松地实现网络加速、网络安全等功能。Cloudflare 提供了一系列工具，可以帮助开发者更轻松地实现网络加速、网络安全等功能。

## vercel 

### vercel 简介

Vercel 是一个基于云计算平台的静态网站托管服务，它提供了一系列功能强大的 API，可以帮助开发者更轻松地部署静态网站。Vercel 提供了一系列工具，可以帮助开发者更轻松地实现静态网站的部署、静态网站的访问等功能。


