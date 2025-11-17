import { useEffect, useState } from "react";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "bn.js";

const PROGRAM_ID = new PublicKey("Asfjdz55joSntTv9NKCSCXvRVhGEJ6CWguurNkokAF2j");

const getProgram = (wallet: any) => {
  return {} as any;
};

function App() {
  const { connected, publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const [counterPda, setCounterPda] = useState<PublicKey | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [customCount, setCustomCount] = useState("");
  const [message, setMessage] = useState("");

  // Compute PDA when wallet connects
  useEffect(() => {
    if (!publicKey) {
      setCounterPda(null);
      setCount(null);
      return;
    }

    const computePda = async () => {
      try {
        const [pda] = await PublicKey.findProgramAddress(
          [Buffer.from("counter"), publicKey.toBuffer()],
          PROGRAM_ID
        );
        setCounterPda(pda);
        setMessage("PDA computed successfully");
      } catch (error) {
        setMessage("Error computing PDA");
      }
    };

    computePda();
  }, [publicKey]);

  const createCounter = async () => {
    setMessage("Initializing counter...");
    setLoading(true);
    setTimeout(() => {
      setCount(0);
      setMessage("Counter initialized successfully");
      setLoading(false);
    }, 1000);
  };

  const increment = async () => {
    if (count === null) return;
    setMessage("Incrementing...");
    setLoading(true);
    setTimeout(() => {
      setCount(count + 1);
      setMessage("Counter incremented");
      setLoading(false);
    }, 1000);
  };

  const decrement = async () => {
    if (count === null) return;
    setMessage("Decrementing...");
    setLoading(true);
    setTimeout(() => {
      setCount(count - 1);
      setMessage("Counter decremented");
      setLoading(false);
    }, 1000);
  };

  const setCountValue = async () => {
    if (!customCount) return;
    
    const countValue = parseInt(customCount);
    if (isNaN(countValue) || countValue < 0) {
      setMessage("Please enter a valid positive number");
      return;
    }

    setMessage("Setting count...");
    setLoading(true);
    setTimeout(() => {
      setCount(countValue);
      setCustomCount("");
      setMessage("Count set successfully");
      setLoading(false);
    }, 1000);
  };

  const refreshCount = () => {
    setMessage("Connect your wallet to see real blockchain data");
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#9945FF' }}>
        Solana Counter dApp
      </h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <WalletMultiButton />
      </div>

      {connected && publicKey && (
        <div style={{
          background: '#f8f9fa',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Counter Status
          </h2>
          
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#9945FF',
            marginBottom: '2rem',
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #e9ecef'
          }}>
            {count !== null ? count : "Not Initialized"}
          </div>

          {message && (
            <div style={{
              background: '#e8f5e8',
              color: '#2e7d32',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button 
              onClick={createCounter}
              disabled={loading}
              style={{
                padding: '12px 16px',
                backgroundColor: '#9945FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Loading...' : 'Initialize'}
            </button>
            
            <button 
              onClick={increment}
              disabled={loading || count === null}
              style={{
                padding: '12px 16px',
                backgroundColor: '#14F195',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                opacity: (loading || count === null) ? 0.6 : 1
              }}
            >
              {loading ? 'Loading...' : 'Increment'}
            </button>
            
            <button 
              onClick={decrement}
              disabled={loading || count === null}
              style={{
                padding: '12px 16px',
                backgroundColor: '#FF6B6B',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                opacity: (loading || count === null) ? 0.6 : 1
              }}
            >
              {loading ? 'Loading...' : 'Decrement'}
            </button>
            
            <button 
              onClick={refreshCount}
              style={{
                padding: '12px 16px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Refresh
            </button>
          </div>

          {/* Set Count Section */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            marginBottom: '1rem'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Set Custom Count</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="number"
                value={customCount}
                onChange={(e) => setCustomCount(e.target.value)}
                placeholder="Enter count value"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                min="0"
              />
              <button 
                onClick={setCountValue}
                disabled={loading || !customCount}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#512da8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  opacity: (loading || !customCount) ? 0.6 : 1
                }}
              >
                {loading ? 'Setting...' : 'Set Count'}
              </button>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666',
            border: '1px solid #e9ecef'
          }}>
            <p><strong>Your Address:</strong> {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}</p>
            <p><strong>Counter PDA:</strong> {counterPda ? `${counterPda.toString().slice(0, 8)}...` : 'Computing...'}</p>
            <p><strong>Program ID:</strong> {PROGRAM_ID.toString().slice(0, 8)}...</p>
            <p><strong>Status:</strong> UI Working | Blockchain: Simulation Mode</p>
          </div>
        </div>
      )}

      {!connected && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: '#f8f9fa',
          borderRadius: '12px',
          color: '#666',
          border: '1px solid #e9ecef'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Connect your wallet to start using the Counter dApp
          </p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Make sure you're connected to Solana Devnet in your wallet
          </p>
        </div>
      )}
    </div>
  );
}

export default App;