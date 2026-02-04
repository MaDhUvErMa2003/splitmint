#SplitMint 
### Smart Group Expense Manager (Splitwise-like App)

SplitMint is a full-stack web application that helps users manage shared group expenses, track balances, and settle payments efficiently.  
It is inspired by Splitwise and enhanced with a smart expense parsing feature called **MintSense**.

---

## 🚀 Features

### 👥 Group Management
- Create, update, and delete groups
- Add up to **3 participants per group**
- Cascade delete (group → participants → expenses)

### 💰 Expense Management
- Add expenses with:
  - Equal split
  - Custom amount split
  - Percentage split
- Choose who paid for the expense
- Automatic validation for split correctness

### 📊 Balance Engine
- Calculates **net balance** for each participant
- Determines **who owes whom**
- Generates **minimal settlement transactions**
- Handles rounding issues gracefully (near-zero balances treated as settled)

### 📈 Dashboards & Visualizations
- Summary cards (total spent, owed, net balance)
- Group contribution dashboard
- Pie chart & bar chart for expense distribution
- Clear, color-coded balance views

###  MintSense (Smart Expense Parsing)
- Convert natural language input into structured expenses  
  > _“I paid 1200 for dinner for Rahul and Aman”_
- Auto-detects:
  - Amount
  - Expense category (Food, Travel, Rent, Shopping, etc.)
  - Split type
- Designed with **graceful fallback** (rule-based parsing if AI services are unavailable)

### 🔐 Authentication & Security
- JWT-based authentication
- Protected routes for all group and expense operations

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- Recharts (charts & graphs)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

---

## 🧠 System Design Highlights

- **Normalized data models** for Groups, Participants, and Expenses
- **Cascade delete strategy** to maintain data integrity
- **Event-driven UI updates** after expense creation
- **Hybrid AI design**: rule-based logic with pluggable LLM support
- Defensive handling of floating-point rounding errors in financial calculations

---

## ⚙️ Installation & Setup

### 1️ Clone the repository
Git CLone repository
### 2 backend setup
cd backend
npm install
npm start

### 3 frontend setup

cd frontend
npm install
npm run dev


Live website Link:
https://splitmint.netlify.app/

