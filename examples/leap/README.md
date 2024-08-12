# Examples of leaping between CKB and Branch chain

## How to Start

Copy the `.env.example` file to `.env`:

```shell
cd examples/leap && cp .env.example .env
```

Update the configuration values:

```yaml
# True for CKB Mainnet and false for CKB Testnet, the default value is false
IS_MAINNET=false

# The CKB secp256k1 private key whose format is 32bytes hex string with 0x prefix
CKB_SECP256K1_PRIVATE_KEY=0x-private-key

# CKB node url which should match IS_MAINNET
CKB_NODE_URL=https://testnet.ckb.dev/rpc

```

### Leap xUDT from CKB to Branch chain

```shell
npx ts-node leap-to-branch.ts 
```

### Unlock Request cells after timeout

You can unlock request cells after timeout to cancel leaping from CKB to Branch chain

```shell
npx ts-node unlock-request-cells.ts 
```
