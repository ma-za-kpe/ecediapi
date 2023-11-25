import hre from 'hardhat';

async function main() {
  const ToDoList = await hre.ethers.deployContract("ToDoList", );

  await ToDoList.waitForDeployment();

  console.log(
    `deployed to ${ToDoList.target}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


