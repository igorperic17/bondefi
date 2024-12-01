// import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import {
//   BancorFormula,
//   BancorFormula__factory,
//   BatchedMarketMaker,
//   BatchedMarketMaker__factory,
//   ERC20Token,
//   ERC20Token__factory,
//   TestDAI,
//   TestDAI__factory,
// } from "../../typechain-types";

// // Project Constants
// const initialSupply = ethers.parseEther("360000000");
// const initialCurveLiquidity = 540000; // DAIs from public sale
// const targetInitialPrice = 0.035;
// const reserveRatio = 0.2;

// // Test Variables
// const blocksPerBatch = 20;
// const slippage = ethers.parseEther(".1"); // 10 pct max slippage
// const buyFee = ethers.parseEther("0.0015"); // 0.15% Buying Trading Fee
// const sellFee = ethers.parseEther("0.003"); // 0.3% Buying Trading Fee
// const initialCurveSupply =
//   initialCurveLiquidity / (targetInitialPrice * reserveRatio); // Value from model 61714285.71428571 OR 77.14285714285714, now calculated dynamically
// const minCurveSupply = ethers.parseEther("60000000");
// const PPM = 1000000;
// const reserveRatioPPM = reserveRatio * PPM; // 250000 => 25 pct in PPM

// // Simulation Variables
// const simulationRuns = 5;
// const simulationAmount = ethers.parseEther("100000");

// // Helpers
// const openAndClaimBuyOrder = require("./helpers/utils").openAndClaimBuyOrder(
//   this,
//   blocksPerBatch,
// );
// const openAndClaimSellOrder = require("./helpers/utils").openAndClaimSellOrder(
//   this,
//   blocksPerBatch,
// );
// const progressToNextBatch =
//   require("./helpers/utils").progressToNextBatch(blocksPerBatch);

// describe("BatchedMarketMaker", () => {
//   //TODO: these tests are dependant on each other and sequential runs.
//   //Permissions and deployments need to be better handled with beforeEach and before hooks.
//   console.log(
//     "BatchedMarketMaker tests are disabled until refactoring of this suite is done",
//   );
//   return;
//   let admin: SignerWithAddress;
//   let minter: SignerWithAddress;
//   let pauser: SignerWithAddress;
//   let treasury: SignerWithAddress;
//   let alice: SignerWithAddress;
//   let bob: SignerWithAddress;
//   let charlie: SignerWithAddress;

//   let formula: BancorFormula;
//   let marketMaker: BatchedMarketMaker;
//   let token: ERC20Token;
//   let dai: TestDAI;

//   before(async () => {
//     [admin, minter, pauser, treasury, alice, bob, charlie] =
//       await ethers.getSigners();
//     formula = await new BancorFormula__factory(admin).deploy();
//   });

//   beforeEach(async () => {
//     token = await new ERC20Token__factory(admin).deploy(
//       treasury,
//       initialSupply,
//       "Test Curve",
//       "TTest1",
//     );

//     dai = await new TestDAI__factory(admin).deploy(
//       treasury,
//       ethers.parseEther("1000000000"),
//     );

//     marketMaker = await new BatchedMarketMaker__factory(admin).deploy(
//       formula,
//       token,
//       1,
//       admin,
//       ethers.parseEther(initialCurveSupply.toString()),
//       minCurveSupply,
//       blocksPerBatch,
//       buyFee,
//       sellFee,
//     );
//   });

//   describe("Contract deployment", () => {
//     it("Should deploy TokenERC20", async () => {
//       const token = await new ERC20Token__factory(admin).deploy(
//         treasury,
//         initialSupply,
//         "Test Curve",
//         "TTest1",
//       );

//       expect(await token.name()).to.equal("Test Curve");
//       expect(await token.symbol()).to.equal("TTest1");
//       expect(await token.decimals()).to.equal(18);
//       expect(await token.MINTER_ROLE()).to.equal(
//         "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
//       );
//       expect(await token.PAUSER_ROLE()).to.equal(
//         "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a",
//       );
//       expect(await token.totalSupply()).to.equal(initialSupply);
//     });

//     it("Should deploy Test DAI", async () => {
//       const dai = await new TestDAI__factory(admin).deploy(
//         treasury,
//         ethers.parseEther("1000000000"),
//       );
//       expect(await dai.name()).to.equal("Test Curve DAI");
//       expect(await dai.symbol()).to.equal("TCDAI");
//       expect(await dai.decimals()).to.equal(18);
//     });

//     it("Should deploy Bancor Formula", async () => {
//       const formula = await new BancorFormula__factory(admin).deploy();
//       expect(await formula.version()).to.equal(4);
//     });

//     it("Should fail to deploy the Curve with wrong arguments", async () => {
//       await expect(
//         new BatchedMarketMaker__factory(admin).deploy(
//           formula,
//           token,
//           1,
//           "0x0000000000000000000000000000000000000000",
//           ethers.parseEther(initialCurveSupply.toString()),
//           minCurveSupply,
//           blocksPerBatch,
//           buyFee,
//           sellFee,
//         ),
//       ).to.be.revertedWith("MM_INVALID_BENEFICIARY");

//       await expect(
//         new BatchedMarketMaker__factory(admin).deploy(
//           formula,
//           token,
//           1,
//           admin,
//           ethers.parseEther(initialCurveSupply.toString()),
//           minCurveSupply,
//           0,
//           buyFee,
//           sellFee,
//         ),
//       ).to.be.revertedWith("MM_INVALID_BATCH_BLOCKS");

//       await expect(
//         new BatchedMarketMaker__factory(admin).deploy(
//           formula,
//           token,
//           1,
//           admin,
//           ethers.parseEther(initialCurveSupply.toString()),
//           minCurveSupply,
//           blocksPerBatch,
//           buyFee,
//           ethers.parseEther("1"),
//         ),
//       ).to.be.revertedWith("MM_INVALID_PERCENTAGE");
//     });

//     it("Should deploy the market maker", async () => {
//       const marketMaker = await new BatchedMarketMaker__factory(admin).deploy(
//         formula,
//         token,
//         1,
//         admin,
//         ethers.parseEther(initialCurveSupply.toString()),
//         minCurveSupply,
//         blocksPerBatch,
//         buyFee,
//         sellFee,
//       );
//       expect(await marketMaker.beneficiary()).to.equal(admin);
//     });

//     it("Should set the Curve as a valid minter", async () => {
//       const MINTER_ROLE = await token.MINTER_ROLE();
//       await token.connect(admin).grantRole(MINTER_ROLE, marketMaker);
//       expect(await token.hasRole(MINTER_ROLE, marketMaker)).to.equal(true);
//     });
//   });

//   describe("Initializing the Curve", () => {
//     it("Should set a valid address to open trading", async () => {
//       const OPEN_ROLE = await marketMaker.OPEN_ROLE();
//       await marketMaker.connect(admin).grantRole(OPEN_ROLE, admin);
//       expect(await marketMaker.hasRole(OPEN_ROLE, admin)).to.equal(true);
//     });

//     it("Should add initial collateral to the market maker", async () => {
//       await dai
//         .connect(treasury)
//         .transfer(
//           marketMaker,
//           ethers.parseEther(initialCurveLiquidity.toString()),
//         );

//       await marketMaker
//         .connect(admin)
//         .addCollateralToken(
//           dai,
//           BigInt(0),
//           BigInt(0),
//           reserveRatioPPM,
//           slippage,
//         );

//       expect(await dai.balanceOf(marketMaker)).to.equal(
//         ethers.parseEther(initialCurveLiquidity.toString()),
//       );
//       expect(await marketMaker.getCollateralToken(dai)).to.deep.equal([
//         true,
//         BigInt(0),
//         BigInt(0),
//         reserveRatioPPM,
//         slippage,
//       ]);
//     });

//     it("Should open trading", async () => {
//       await marketMaker.connect(admin).open(true);
//       expect(await marketMaker.isOpen()).to.equal(true);
//     });
//   });
//   describe("Alice buying at the Curve for 100k", () => {
//     it("Should transfer 100K test DAIs to Alice", async () => {
//       const amount = ethers.parseEther("100000");
//       await dai.connect(treasury).transfer(alice, amount);
//       expect(await dai.balanceOf(alice)).to.equal(amount);
//     });

//     it("Should not allow Alice to buy with wrong collateral", async () => {
//       await expect(
//         marketMaker.connect(alice).openBuyOrder(alice, token, 1),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//     });

//     it("Should not allow Alice to buy without approval", async () => {
//       const amount = await dai.balanceOf(alice);
//       await expect(
//         marketMaker.connect(alice).openBuyOrder(alice, dai, amount),
//       ).to.be.revertedWith("MM_INVALID_COLLATERAL_VALUE");
//     });

//     it("Should not allow Alice to buy for 0", async () => {
//       await expect(
//         marketMaker.connect(alice).openBuyOrder(alice, dai, 0),
//       ).to.be.revertedWith("MM_INVALID_COLLATERAL_VALUE");
//     });

//     it("Should not allow Alice to sell since she has not bought yet", async () => {
//       const aliceBalance = await token.balanceOf(alice);
//       await expect(
//         marketMaker.connect(alice).openSellOrder(alice, dai, aliceBalance),
//       ).to.be.revertedWith("MM_INVALID_BOND_AMOUNT");
//     });

//     it("Should allow Alice to buy at the marketMaker for 100K TDAIs", async () => {
//       const amount = ethers.parseEther("100000");
//       await dai.connect(alice).approve(marketMaker, amount);
//       await openAndClaimBuyOrder(alice, dai, amount);
//     });
//   });

//   describe("Bob buying at the Curve for 100k", () => {
//     it("Should transfer 100K test DAIs to Bob", async () => {
//       const amount = ethers.parseEther("100000");
//       await dai.connect(treasury).transfer(bob, amount);
//       expect(await dai.balanceOf(bob)).to.equal(amount);
//     });

//     it("Should allow Bob to buy at the marketMaker for 100K TDAIs", async () => {
//       const amount = ethers.parseEther("100000");
//       await dai.connect(bob).approve(marketMaker, amount);
//       await openAndClaimBuyOrder(bob, dai, amount);
//     });
//   });

//   describe("Alice selling at the Curve", () => {
//     it("Should not allow Alice to sell his Tokens without approval", async () => {
//       const aliceBalance = await token.balanceOf(alice);
//       await expect(
//         marketMaker.connect(alice).openSellOrder(alice, dai, aliceBalance),
//       ).to.be.revertedWith("ERC20: insufficient allowance");
//     });

//     it("Should allow Alice to sell at the marketMaker all his Tokens", async () => {
//       const aliceBalance = await token.balanceOf(alice);
//       await token.connect(alice).approve(marketMaker, aliceBalance);
//       await openAndClaimSellOrder(alice, dai, aliceBalance);
//     });
//   });

//   describe("Bob selling at the Curve", () => {
//     it("Should allow Bob to sell at the marketMaker all his Tokens", async () => {
//       const bobBalance = await token.balanceOf(bob);
//       await token.connect(bob).approve(marketMaker, bobBalance);
//       await openAndClaimSellOrder(bob, dai, bobBalance);
//     });
//   });

//   describe("Alice and Bob buying in same batch", () => {
//     it("Should allow Alice and Bob to buy in same batch", async () => {
//       const amountA = ethers.parseEther("50000");
//       const amountB = ethers.parseEther("50000");
//       await dai.connect(alice).approve(marketMaker, amountA);
//       await dai.connect(bob).approve(marketMaker, amountB);
//       const txA = await marketMaker
//         .connect(alice)
//         .openBuyOrder(alice, dai, amountA);
//       const receiptA = await txA.wait();
//       const eventA = receiptA.events?.filter((x: any) => {
//         return x.event == "OpenBuyOrder";
//       });
//       const batchIdA = eventA["0"]["args"]["batchId"];
//       const txB = await marketMaker
//         .connect(bob)
//         .openBuyOrder(bob, dai, amountB);
//       const receiptB = await txB.wait();
//       const eventB = receiptB.events?.filter((x: any) => {
//         return x.event == "OpenBuyOrder";
//       });
//       const batchIdB = eventB["0"]["args"]["batchId"];
//       expect(batchIdA).to.equal(batchIdB);

//       await progressToNextBatch();

//       await marketMaker.connect(alice).claimBuyOrder(alice, batchIdA, dai);
//       await marketMaker.connect(bob).claimBuyOrder(bob, batchIdB, dai);
//     });

//     it("Should allow Bob to sell at the marketMaker all his Tokens", async () => {
//       const bobBalance = await token.balanceOf(bob);
//       await token.connect(bob).approve(marketMaker, bobBalance);
//       await openAndClaimSellOrder(bob, dai, bobBalance);
//     });

//     it("Should allow Alice to sell at the marketMaker all his Tokens", async () => {
//       const aliceBalance = await token.balanceOf(alice);
//       await token.connect(alice).approve(marketMaker, aliceBalance);
//       await openAndClaimSellOrder(alice, dai, aliceBalance);
//     });
//   });

//   describe("Alice and Bob trying to buy in same batch but Bob getting slippage and having to wait", () => {
//     it("Should allow Alice to buy but not Bob in same batch since slippage is exceeded", async () => {
//       const amountA = ethers.parseEther("100000");
//       const amountB = ethers.parseEther("50000");
//       await dai.connect(alice).approve(marketMaker, amountA);
//       await dai.connect(bob).approve(marketMaker, amountB);
//       const txA = await marketMaker
//         .connect(alice)
//         .openBuyOrder(alice, dai, amountA);
//       const receiptA = await txA.wait();
//       const eventA = receiptA.events?.filter((x: any) => {
//         return x.event == "OpenBuyOrder";
//       });
//       const batchIdA = eventA["0"]["args"]["batchId"];
//       await expect(
//         marketMaker.connect(bob).openBuyOrder(bob, dai, amountB),
//       ).to.be.revertedWith("MM_SLIPPAGE_EXCEEDS_LIMIT");

//       await progressToNextBatch();
//       await marketMaker.connect(alice).claimBuyOrder(alice, batchIdA, dai);

//       // Since we reached next Batch, bob should be able to buy
//       await openAndClaimBuyOrder(bob, dai, amountB);
//     });

//     it("Should allow Alice to sell at the marketMaker all his Tokens", async () => {
//       const aliceBalance = await token.balanceOf(alice);
//       await token.connect(alice).approve(marketMaker, aliceBalance);
//       await openAndClaimSellOrder(alice, dai, aliceBalance);
//     });

//     it("Should allow Bob to sell at the marketMaker all his Tokens", async () => {
//       const bobBalance = await token.balanceOf(bob);
//       await token.connect(bob).approve(marketMaker, bobBalance);
//       await openAndClaimSellOrder(bob, dai, bobBalance);
//     });
//   });

//   describe("Economic Simulation: it should properly increase and decrease price as expected", () => {
//     it("Should transfer 100M test DAIs to Charlie", async () => {
//       const amount = ethers.parseEther("100000000");
//       await dai.connect(treasury).transfer(charlie, amount);
//       expect(await dai.balanceOf(charlie)).to.equal(amount);
//     });

//     // Bulk buy and sell
//     for (var i = 0; i < simulationRuns; i++) {
//       it("Should allow Charlie to buy at the marketMaker for the simulation amount TDAIs", async () => {
//         await dai.connect(charlie).approve(marketMaker, simulationAmount);
//         await openAndClaimBuyOrder(charlie, dai, simulationAmount);
//       });
//     }

//     it("Should allow Charlie to sell at the marketMaker for all his balance in same steps", async () => {
//       const balance = await token.balanceOf(charlie);
//       const sellAmount = Math.floor(balance / simulationRuns);
//       await token.connect(charlie).approve(marketMaker, balance);
//       for (var i = 0; i < simulationRuns; i++) {
//         await openAndClaimSellOrder(charlie, dai, sellAmount);
//       }
//     });
//   });

//   describe("Should properly revert on wrong order claims", () => {
//     it("Should allow Alice to open buy at the marketMaker for 10K TDAIs", async () => {
//       const amount = ethers.parseEther("10000");
//       await dai.connect(alice).approve(marketMaker, amount);
//       const txA = await marketMaker
//         .connect(alice)
//         .openBuyOrder(alice, dai, amount);
//       const receiptA = await txA.wait();
//       const eventA = receiptA.events?.filter((x: any) => {
//         return x.event == "OpenBuyOrder";
//       });
//       const batchIdA = eventA["0"]["args"]["batchId"];

//       await expect(
//         marketMaker.connect(alice).claimBuyOrder(alice, batchIdA, token),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//       await expect(
//         marketMaker.connect(alice).claimBuyOrder(alice, batchIdA, dai),
//       ).to.be.revertedWith("MM_BATCH_NOT_OVER");

//       await progressToNextBatch();

//       await expect(
//         marketMaker.connect(bob).claimBuyOrder(bob, batchIdA, dai),
//       ).to.be.revertedWith("MM_NOTHING_TO_CLAIM");
//       await expect(
//         marketMaker.connect(alice).claimCancelledBuyOrder(alice, batchIdA, dai),
//       ).to.be.revertedWith("MM_BATCH_NOT_CANCELLED");
//       await marketMaker.connect(alice).claimBuyOrder(alice, batchIdA, dai);
//       expect(await token.balanceOf(alice)).to.be.above(0);
//     });

//     it("Should allow Alice to sell at the marketMaker all his Tokens", async () => {
//       const aliceBalance = await token.balanceOf(alice);
//       await token.connect(alice).approve(marketMaker, aliceBalance);
//       const txA = await marketMaker
//         .connect(alice)
//         .openSellOrder(alice, dai, aliceBalance);
//       const receiptA = await txA.wait();
//       const eventA = receiptA.events?.filter((x: any) => {
//         return x.event == "OpenSellOrder";
//       });
//       const batchIdA = eventA["0"]["args"]["batchId"];

//       await expect(
//         marketMaker.connect(alice).claimSellOrder(alice, batchIdA, token),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//       await expect(
//         marketMaker.connect(alice).claimSellOrder(alice, batchIdA, dai),
//       ).to.be.revertedWith("MM_BATCH_NOT_OVER");

//       await progressToNextBatch();

//       await expect(
//         marketMaker.connect(bob).claimSellOrder(bob, batchIdA, dai),
//       ).to.be.revertedWith("MM_NOTHING_TO_CLAIM");
//       await expect(
//         marketMaker
//           .connect(alice)
//           .claimCancelledSellOrder(alice, batchIdA, dai),
//       ).to.be.revertedWith("MM_BATCH_NOT_CANCELLED");
//       await marketMaker.connect(alice).claimSellOrder(alice, batchIdA, dai);
//       expect(await token.balanceOf(alice)).to.equal(0);
//     });
//   });

//   describe("Should properly react to collateral removal", () => {
//     const amountA = ethers.parseEther("10000");
//     let amountB: bigint;

//     let batchIdA: string;
//     let batchIdB: string;

//     it("Should allow Bob to buy at the marketMaker for 10K TDAIs", async () => {
//       await dai.connect(bob).approve(marketMaker, amountA);
//       await openAndClaimBuyOrder(bob, dai, amountA);
//     });

//     it("Should allow Alice to open Buy order, Bob to open Sell order in same batch", async () => {
//       await dai.connect(alice).approve(marketMaker, amountA);

//       amountB = await token.balanceOf(bob);
//       await token.connect(bob).approve(marketMaker, amountB);

//       await progressToNextBatch();

//       const txA = await marketMaker
//         .connect(alice)
//         .openBuyOrder(alice, dai, amountA);
//       const receiptA = await txA.wait();
//       const eventA = receiptA.events?.filter((x: any) => {
//         return x.event == "OpenBuyOrder";
//       });
//       batchIdA = eventA["0"]["args"]["batchId"];

//       const txB = await marketMaker
//         .connect(bob)
//         .openSellOrder(bob, dai, amountB);
//       const receiptB = await txB.wait();
//       const eventB = receiptB.events?.filter((x: any) => {
//         return x.event == "OpenSellOrder";
//       });
//       batchIdB = eventB["0"]["args"]["batchId"];

//       expect(batchIdA).to.equal(batchIdB);
//     });

//     it("Should allow admin to remove collateral", async () => {
//       await marketMaker.connect(admin).removeCollateralToken(dai);
//       await expect(
//         marketMaker.connect(alice).openBuyOrder(alice, dai, 1),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//       await expect(
//         marketMaker.connect(bob).openSellOrder(bob, dai, 1),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//     });

//     it("Should fail if trying to claim wrong cancelled order ", async () => {
//       await expect(
//         marketMaker
//           .connect(alice)
//           .claimCancelledSellOrder(alice, batchIdA, dai),
//       ).to.be.revertedWith("MM_NOTHING_TO_CLAIM");
//       await expect(
//         marketMaker.connect(bob).claimCancelledBuyOrder(bob, batchIdB, dai),
//       ).to.be.revertedWith("MM_NOTHING_TO_CLAIM");
//     });

//     it("Should allow users to claim cancelled orders", async () => {
//       const balanceA = await dai.balanceOf(alice);
//       await marketMaker
//         .connect(alice)
//         .claimCancelledBuyOrder(alice, batchIdA, dai);
//       await marketMaker
//         .connect(bob)
//         .claimCancelledSellOrder(bob, batchIdB, dai);
//       const afterBalanceA = await dai.balanceOf(alice);
//       const aliceRefund = afterBalanceA - balanceA;
//       const fee = (amountA * buyFee) / ethers.parseEther("1");

//       expect(aliceRefund).to.equal(amountA - fee);
//       expect(await token.balanceOf(bob)).to.equal(amountB);
//     });

//     it("Should fail to readd collateral with wrong Reserve Ratio", async () => {
//       await expect(
//         marketMaker
//           .connect(admin)
//           .addCollateralToken(dai, BigInt(0), BigInt(0), 1100000, slippage),
//       ).to.be.revertedWith("MM_INVALID_RESERVE_RATIO");
//     });

//     it("Should allow admin to readd collateral", async () => {
//       await marketMaker
//         .connect(admin)
//         .addCollateralToken(
//           dai,
//           BigInt(0),
//           BigInt(0),
//           reserveRatioPPM,
//           slippage,
//         );
//     });

//     it("Should fail to buy in current cancelled batch", async () => {
//       await expect(
//         marketMaker.connect(alice).openBuyOrder(alice, dai, 1),
//       ).to.be.revertedWith("MM_BATCH_CANCELLED");
//       await expect(
//         marketMaker.connect(bob).openSellOrder(bob, dai, 1),
//       ).to.be.revertedWith("MM_BATCH_CANCELLED");
//     });

//     it("Should not allow claiming orders from cancelled batches", async () => {
//       await progressToNextBatch();
//       await expect(
//         marketMaker.connect(alice).claimBuyOrder(alice, batchIdA, dai),
//       ).to.be.revertedWith("MM_BATCH_CANCELLED");
//       await expect(
//         marketMaker.connect(bob).claimSellOrder(bob, batchIdB, dai),
//       ).to.be.revertedWith("MM_BATCH_CANCELLED");
//     });

//     it("Should allow Bob to sell his Tokens after admin readds collateral", async () => {
//       const bobBalance = await token.balanceOf(bob);
//       await token.connect(bob).approve(marketMaker, bobBalance);
//       await openAndClaimSellOrder(bob, dai, bobBalance);
//     });
//   });

//   describe("Should properly allow admin to manage the marketMaker", () => {
//     it("Should allow Admin to tap the Curve", async () => {
//       const amount = ethers.parseEther("25000");
//       const balance = await dai.balanceOf(admin);
//       await marketMaker.connect(admin).withdrawCollateral(dai, amount);
//       const newBalance = await dai.balanceOf(admin);
//       expect(newBalance - balance).to.equal(amount);
//     });

//     it("Should allow Alice to buy at a reduced price", async () => {
//       const amount = ethers.parseEther("100000");
//       expect(await marketMaker.getCollateralPricePPM(dai)).to.be.below(
//         targetInitialPrice * PPM,
//       );
//       await dai.connect(treasury).transfer(alice, amount);
//       await dai.connect(alice).approve(marketMaker, amount);
//       await openAndClaimBuyOrder(alice, dai, amount);
//     });

//     it("Should allow admin to stop trading", async () => {
//       await marketMaker.connect(admin).open(false);
//       expect(await marketMaker.isOpen()).to.equal(false);
//     });

//     it("Shouldn not allow Bob to buy at the marketMaker since trading is stopped", async () => {
//       const amount = await dai.balanceOf(bob);
//       await expect(
//         marketMaker.connect(bob).openBuyOrder(bob, dai, amount),
//       ).to.be.revertedWith("MM_NOT_OPEN");
//     });

//     it("Should not allow Alice to sell at the marketMaker since trading is stopped", async () => {
//       const amount = await token.balanceOf(alice);
//       await token.connect(alice).approve(marketMaker, amount);
//       await expect(
//         marketMaker.connect(alice).openSellOrder(alice, dai, amount),
//       ).to.be.revertedWith("MM_NOT_OPEN");
//     });

//     it("Should allow admin to reopen trading", async () => {
//       await marketMaker.connect(admin).open(true);
//       expect(await marketMaker.isOpen()).to.equal(true);
//     });

//     it("Should allow Admin to update marketMaker supply", async () => {
//       const amount = ethers.parseEther("100000000");
//       await marketMaker.connect(admin).updateCurveSupply(amount);
//       const marketMakerSupply = await marketMaker.curveSupply();
//       expect(marketMakerSupply).to.equal(amount);
//     });

//     it("Should allow Admin to update minimum marketMaker supply", async () => {
//       const amount = ethers.parseEther("100000000");
//       await marketMaker.connect(admin).updateMinCurveSupply(amount);
//       const minCurveSupply = await marketMaker.minCurveSupply();
//       expect(minCurveSupply).to.equal(amount);
//     });

//     it("Should not allow Alice to buy at the marketMaker since minimum supply is reached", async () => {
//       const amount = await token.balanceOf(alice);
//       await token.connect(alice).approve(marketMaker, amount);
//       await expect(
//         marketMaker.connect(alice).openSellOrder(alice, dai, amount),
//       ).to.be.revertedWith("MM_INSUFFICIENT_POOL_BALANCE");
//     });

//     it("Should allow Admin to update bancor formula", async () => {
//       await marketMaker.connect(admin).updateFormula(formula);
//       expect(await marketMaker.formula()).to.equal(formula);
//     });

//     it("Should allow Admin to update trading fees", async () => {
//       await marketMaker.connect(admin).updateFees(0, 0);
//       expect(await marketMaker.buyFeePct()).to.equal(0);
//       expect(await marketMaker.sellFeePct()).to.equal(0);
//     });

//     it("Should fail if Admin tries to update with invalid Fees", async () => {
//       await expect(
//         marketMaker.connect(admin).updateFees(0, ethers.parseEther("1")),
//       ).to.be.revertedWith("MM_INVALID_PERCENTAGE");
//     });

//     it("Should allow Admin to update beneficiary", async () => {
//       await marketMaker.connect(admin).updateBeneficiary(treasury);
//       expect(await marketMaker.beneficiary()).to.equal(treasury);
//     });

//     it("Should fail if Admin tries to update an invalid beneficiary", async () => {
//       await expect(
//         marketMaker
//           .connect(admin)
//           .updateBeneficiary("0x0000000000000000000000000000000000000000"),
//       ).to.be.revertedWith("MM_INVALID_BENEFICIARY");
//     });

//     it("Should fail if Admin tries to update an invalid collateral", async () => {
//       await expect(
//         marketMaker
//           .connect(admin)
//           .updateCollateralToken(
//             token,
//             BigInt(0),
//             BigInt(0),
//             reserveRatioPPM,
//             slippage,
//           ),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//       await expect(
//         marketMaker
//           .connect(admin)
//           .updateCollateralToken(dai, BigInt(0), BigInt(0), 1100000, slippage),
//       ).to.be.revertedWith("MM_INVALID_RESERVE_RATIO");
//     });

//     it("Should allow Admin to update collateral Token Reserve Ratio", async () => {
//       const newRRPPM = 300000;
//       await marketMaker
//         .connect(admin)
//         .updateCollateralToken(dai, BigInt(0), BigInt(0), newRRPPM, slippage);
//       const collateral = await marketMaker.collaterals(dai);
//       expect(collateral.reserveRatio).to.equal(newRRPPM);
//     });

//     it("Should fail to add managed token as collateral", async () => {
//       await expect(
//         marketMaker
//           .connect(admin)
//           .addCollateralToken(
//             token,
//             BigInt(0),
//             BigInt(0),
//             reserveRatioPPM,
//             slippage,
//           ),
//       ).to.be.revertedWith("MM_INVALID_COLLATERAL");
//     });

//     it("Should fail to readd dai token as collateral", async () => {
//       await expect(
//         marketMaker
//           .connect(admin)
//           .addCollateralToken(
//             dai,
//             BigInt(0),
//             BigInt(0),
//             reserveRatioPPM,
//             slippage,
//           ),
//       ).to.be.revertedWith("MM_COLLATERAL_ALREADY_WHITELISTED");
//     });

//     it("Should fail to remove non whitelisted dai token as collateral", async () => {
//       await expect(
//         marketMaker.connect(admin).removeCollateralToken(token),
//       ).to.be.revertedWith("MM_COLLATERAL_NOT_WHITELISTED");
//     });

//     it("Should return current batch", async () => {
//       const batchId = await marketMaker.getCurrentBatchId();
//       const batch = await marketMaker.getBatch(batchId, dai);
//     });
//   });
// });
