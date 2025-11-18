# Counter dApp Frontend
React frontend for interacting with the on-chain Solana Counter program. Users can create and manage their own personal counter stored on the Solana blockchain.

## What It Does
- Connect Solana wallet (Phantom)
- Create a personal counter account using PDAs
- Increment/decrement counter value
- Set custom count values
- View real-time counter state on blockchain

## How to Run
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   - Go to `http://localhost:5173`
   - Connect your Phantom wallet
   - Use the counter buttons to interact with the program

## Build for Production
```bash
npm run build
```

## Connected Program
- **Network:** Solana Devnet
- **Program ID:** `Asfjdz55joSntTv9NKCSCXvRVhGEJ6CWguurNkokAF2j`