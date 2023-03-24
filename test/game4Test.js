const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const signer = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const address = await signer.getAddress();
    const address2 = await signer2.getAddress();
    return { game, signer, signer2, address, address2 };
  }
  it('should be a winner', async function () {
    const { game, signer, signer2, address, address2  } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(signer2).write(address);
    await game.connect(signer).win(address2);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
