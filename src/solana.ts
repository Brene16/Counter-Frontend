// import { AnchorProvider, Program } from "@coral-xyz/anchor";
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// // Hardcode the IDL to avoid import issues
// const idl = {
//   version: "0.1.0",
//   name: "counter",
//   instructions: [],
//   accounts: [],
//   types: [],
//   errors: []
// };

// export const PROGRAM_ID = new PublicKey("Asfjdz55joSntTv9NKCSCXvRVhGEJ6CWguurNkokAF2j");

// export const getProgram = (wallet: any) => {
//   const connection = new Connection(clusterApiUrl("devnet"));
//   const provider = new AnchorProvider(connection, wallet, {
//     commitment: "confirmed",
//   });
//   return new Program(idl, PROGRAM_ID, provider);
// };