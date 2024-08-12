# Examples of Branch chain

## How to Start

Copy the `.env.example` file to `.env`:

```shell
cd examples/branch && cp .env.example .env
```

Update the configuration values:

```yaml
# True for Branch chain Mainnet and false for Branch chain Testnet, the default value is false
IS_MAINNET=false

# The Branch chain secp256k1 private key whose format is 32bytes hex string with 0x prefix
BRANCH_SECP256K1_PRIVATE_KEY=0x-private-key

# Branch chain node url which should be matched with IS_MAINNET
BRANCH_NODE_URL=https://branch0.dev.utxostack.network 

```

### Get cells and transactions with Indexer RPCs on Branch chain

```shell
npx ts-node indexer.ts 
```

### Transfer Satoshi on Branch chain


```shell
npx ts-node transfer.ts 
```
