#  TrustVault Protocol

**Global P2P Escrow & Settlement Infrastructure**

TrustVault is a trustless, multi-oracle settlement layer designed to facilitate secure global trade between strangers. By replacing human trust with automated verification, the protocol bridges the gap between digital intent and physical reality.

---

##  System Architecture

TrustVault operates as a **Modular Monolith** using a "Single-Phase" build system where every layer shares a common DNA (Protobuf).

*   **Engine (Go):** The central orchestrator handling business logic, Paystack fiat rails, and Logistics APIs (DHL/FedEx).
*   **Muscle (Rust):** High-performance security core for cryptographic validation of unboxing videos and weight-delta analysis.
*   **Vault (Solidity):** Non-custodial Ethereum smart contracts holding the "Source of Truth" for fund settlement.
*   **Face (React/Vite):** A cinematic, glassmorphism-styled dashboard for real-time trade monitoring.
*   **DNA (Protobuf):** The shared schema that ensures type-safety across all programming languages.

---

##  Repository Structure

```text
/trustvault
├── proto/                # 🧬 Universal DNA (Shared Schema)
├── core/
│   ├── orchestrator/     # ⚙️ Go Backend (The Brain)
│   ├── integration/      # 🚚 DHL, FedEx, & Paystack Drivers
│   └── validator/        # 🦀 Rust Security Core (The Muscle)
├── blockchain/           # ⛓️ Solidity Vault (Hardhat Environment)
├── src/                  # ⚛️ React/Vite Frontend (The Face)
├── shared/gen/           # 🔗 Auto-generated Bridge Code
├── data/                 # 💾 SQL Ledger & Audit Triggers
└── Makefile              # 🛠️ Master Build Script
```

---

## Quick Start

### 1. Prerequisites
Ensure you have the following installed:
*   [Go](https://go.dev) (v1.21+)
*   [Rust/Cargo](https://rustup.rs)
*   [Node.js](https://nodejs.org)
*   [Protobuf Compiler](https://grpc.io) (`protoc`)

### 2. Initial Setup
Install all dependencies across all language layers:
```bash
make setup
```

### 3. Generate DNA & Build
Compile the Protobuf DNA and the Rust Security Library:
```bash
make all
```

### 4. Launch the Protocol
In separate terminals, start the backend and frontend:

**Backend:**
```bash
go run core/orchestrator/main.go
```

**Frontend:**
```bash
npm run dev
```

---

##  Security Principles
*   **Weight Oracles:** Automated verification using carrier-reported package mass at dispatch and arrival.
*   **Visual Proof:** Requirement for authenticated unboxing videos, verified by the Rust security core.
*   **Dual-Deposit Escrow:** Game-theory based skin-in-the-game for both buyers and sellers.
*   **Immutable Audit:** Every trade state change is recorded in a PostgreSQL ledger with automated triggers.

---

##  Roadmap
- [x] Multi-language Monorepo Foundation
- [x] Logistics API Integration (DHL/FedEx)
- [x] Smart Contract Vault (Solidity)
- [ ] AI-driven Unboxing Video Verification
- [ ] Multi-chain Support (Arbitrum/Polygon)