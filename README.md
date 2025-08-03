# SUDES - Bird's Nest E-commerce Platform

A modern e-commerce platform specialized in bird's nest products, built with Vue.js and featuring both customer-facing and administrative interfaces.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse bird's nest products with detailed information
- **User Authentication**: Complete registration, login, OTP verification, and password recovery
- **Shopping Cart**: Add products to cart with persistent storage
- **Checkout Process**: Secure checkout with address management
- **Order Management**: Track orders and view order history
- **User Account**: Manage profile, addresses, and change passwords
- **Search & Categories**: Advanced product search and category browsing
- **Responsive Design**: Mobile-first responsive design

### Admin Features
- **Dashboard**: Comprehensive admin dashboard
- **Product Management**: Add, edit, and manage products
- **Category Management**: Organize products into categories and subcategories
- **User Management**: Manage customer accounts and roles
- **Order Management**: Process and track customer orders
- **Content Management**: Manage blogs and policies
- **Authentication**: Secure admin authentication system

## 🛠️ Technology Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Swiper.js** - Touch slider components
- **Heroicons** - Icon library
- **Naive UI** - Vue 3 component library (for admin)

### Development Tools
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **Vue Toast Notification** - Toast notifications

### Key Dependencies
- Vue 3 Composition API
- Vue Router for navigation
- Pinia for state management
- Tailwind CSS for styling
- Swiper for carousels and sliders

## 📁 Project Structure

```
src/
├── assets/              # Static assets and styles
│   └── styles/          # CSS files including animations
├── components/          # Reusable Vue components
│   ├── Body/           # Main content components
│   ├── Header/         # Header components
│   └── Icon/           # Icon components
├── layout/             # Layout components
├── router/             # Vue Router configuration
├── stores/             # Pinia stores
│   ├── auth.js         # Authentication store
│   ├── cart.js         # Shopping cart store
│   └── address.js      # Address management store
├── utils/              # Utility functions
│   └── axios.js        # Axios configuration
└── views/              # Page components
    ├── Client/         # Customer-facing pages
    └── Admin/          # Admin panel pages
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/minhquang39/SUDES.git
cd SUDES
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```env
VITE_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
