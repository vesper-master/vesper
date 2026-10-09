# 🌙 Vesper

> **Someone nearby can help.**

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Built on Stellar](https://img.shields.io/badge/Stellar-Freighter-7B2FBE)](https://stellar.org)
[![Built on Ethereum](https://img.shields.io/badge/Ethereum-MetaMask-F6851B)](https://ethereum.org)

Vesper is an open-source community mutual aid platform built on **Stellar** and **Ethereum**. It connects people who need help with people nearby who can give it — food, clothes, rides, skills, childcare, and more.

Every fulfilled act of help is recorded permanently on-chain. Real impact. No inflated numbers. No single company in control.

---

## The Problem

Right now, in every city on earth:

- A restaurant throws away 50 meals while 200 people nearby are hungry
- A family has bags of clothes their kids outgrew while a family down the street needs them
- An elderly person needs help with groceries while a teenager two blocks away has nothing to do

The people who need and the people who have are steps apart. They never connect. **There is no system.**

Vesper is that system.

---

## Features

| | Feature | Description |
|---|---|---|
| 🙏 | **Post a need** | Food, clothes, medicine, a ride, childcare, skills, emotional support |
| 🤲 | **Post an offer** | Share what you have or what you can do |
| 🗺️ | **Community feed** | Browse and filter by category, type, and location |
| 🔗 | **On-chain recording** | Connect MetaMask or Freighter to record fulfilled help permanently |
| ✅ | **Mark as fulfilled** | Close the loop when help actually happens |
| 👍 | **Upvote** | Surface the most urgent needs to the top |
| 🌍 | **No signup required** | Anyone can browse and help instantly |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Stellar | `@stellar/stellar-sdk` |
| Ethereum | `ethers.js v6` |
| Storage | `localStorage` (MVP) → on-chain (production) |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/vesper.git
cd vesper

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build   # Production build
npm run lint    # Lint the codebase
npm run start   # Start production server
```

---

## Project Structure

```
vesper/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx           # Top navigation
│   │   ├── PostCard.tsx         # Individual need/offer card
│   │   ├── NotificationBell.tsx # In-app notifications
│   │   └── WalletConnect.tsx    # MetaMask + Freighter connector
│   ├── context/
│   │   └── AuthContext.tsx      # Auth state provider
│   ├── feed/
│   │   └── page.tsx             # Community feed with filters
│   ├── post/
│   │   └── page.tsx             # Create a need or offer
│   ├── login/
│   │   └── page.tsx             # Login / sign up
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── types.ts                 # Shared TypeScript types
│   ├── store.ts                 # localStorage data layer
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout + metadata
│   └── page.tsx                 # Landing page
└── public/                      # Static assets
```

---

## Blockchain Integration

Vesper uses two chains for different purposes — Stellar for speed and accessibility, Ethereum for donor trust and NGO compatibility.

### Stellar (Freighter Wallet)
- Identity and day-to-day help recording — fast, cheap, accessible globally
- Transactions settle in 3–5 seconds at fractions of a cent
- Designed for communities in Africa, LatAm, and Southeast Asia
- Uses `simulateTransaction` RPC for on-chain recording (full `submitTransaction` coming)

### Ethereum (MetaMask)
- Reputation and donor layer — NGOs and donors already operate here
- USDC/ETH flows from organizations directly to communities
- Verified impact data readable by any Ethereum-compatible tool

### How it works

1. User connects a wallet (MetaMask or Freighter)
2. Post is submitted and recorded on-chain with a transaction hash
3. When help is fulfilled, the fulfillment is also recorded
4. A permanent, tamper-proof history of community impact is created — publicly verifiable by anyone

---

## Roadmap

**Shipped**
- [x] Landing page with I Need / I Can Help CTAs
- [x] Community feed with search and filters
- [x] Post creation with category selection
- [x] Wallet connect — MetaMask + Freighter
- [x] On-chain tx hash recording (simulated)
- [x] Notifications and upvoting

**Up next**
- [ ] Real Stellar `submitTransaction` integration
- [ ] Real Ethereum smart contract writes
- [ ] Map view (Leaflet / Mapbox)
- [ ] Push notifications when someone responds
- [ ] NGO dashboard for verified impact reporting
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## Why This Matters

> *2 billion people globally work in the informal economy with no social safety net. 1 in 3 people lack access to basic daily needs. The people who can help and the people who need help are often in the same neighborhood — they just have no way to find each other.*

Vesper gives communities a tool that belongs to them. No company in the middle. No algorithm deciding who gets help. Just neighbors helping neighbors, with blockchain ensuring the record stays honest.

---

## Grant Applications

Vesper is submitted as a public goods project to:

- **[Stellar Community Fund (SCF)](https://communityfund.stellar.org)** — Financial inclusion, real-world Stellar usage, Soroban smart contracts
- **[Gitcoin Grants](https://grants.gitcoin.co)** — Humanitarian public good, community impact, open source infrastructure

---

## Contributing

Pull requests are welcome. Please open an issue first for major changes so we can discuss the approach.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a PR

---

## License

Apache 2.0 — see [LICENSE](./LICENSE) for details.

---

*Built as a public good. 🌍*
