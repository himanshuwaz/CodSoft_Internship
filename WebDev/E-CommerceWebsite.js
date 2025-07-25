import React, { useState, useEffect, createContext, useContext } from 'react';

// Tailwind CSS is assumed to be available.

// --- Inline SVG Icons (simplified for demonstration) ---
const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

// --- Mock Product Data ---
const mockProducts = [
    {
        id: 'p1',
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        price: 79.99,
        imageUrl: 'https://placehold.co/400x300/e0e7ff/6366f1?text=Headphones',
        description: 'Experience immersive sound with active noise cancellation and comfortable earcups. Long-lasting battery life for all-day listening.',
        inStock: 15
    },
    {
        id: 'p2',
        name: 'Smartwatch Fitness Tracker',
        category: 'Electronics',
        price: 129.99,
        imageUrl: 'https://placehold.co/400x300/d1fae5/10b981?text=Smartwatch',
        description: 'Track your steps, heart rate, and sleep. Receive notifications and control music from your wrist. Water-resistant design.',
        inStock: 10
    },
    {
        id: 'p3',
        name: 'Ergonomic Office Chair',
        category: 'Home & Office',
        price: 249.99,
        imageUrl: 'https://placehold.co/400x300/ffe4e6/ef4444?text=Office+Chair',
        description: 'Designed for ultimate comfort and support during long working hours. Adjustable features for personalized seating.',
        inStock: 5
    },
    {
        id: 'p4',
        name: 'Stainless Steel Water Bottle',
        category: 'Accessories',
        price: 19.99,
        imageUrl: 'https://placehold.co/400x300/e0f2fe/0ea5e9?text=Water+Bottle',
        description: 'Keep your drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable for everyday use.',
        inStock: 50
    },
    {
        id: 'p5',
        name: 'Portable SSD 1TB',
        category: 'Electronics',
        price: 99.99,
        imageUrl: 'https://placehold.co/400x300/f0f9ff/3b82f6?text=Portable+SSD',
        description: 'Ultra-fast external storage for all your files. Compact and lightweight design, perfect for on-the-go professionals.',
        inStock: 8
    },
    {
        id: 'p6',
        name: 'Organic Coffee Beans (1lb)',
        category: 'Food & Beverage',
        price: 15.50,
        imageUrl: 'https://placehold.co/400x300/fff7ed/f97316?text=Coffee+Beans',
        description: 'Premium organic coffee beans, freshly roasted for a rich and aromatic brew. Sustainably sourced.',
        inStock: 30
    }
];

// --- Context for Cart Management ---
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const updateCartQuantity = (productId, quantity) => {
        setCartItems(prevItems => {
            if (quantity <= 0) {
                return prevItems.filter(item => item.id !== productId);
            }
            return prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateCartQuantity,
            removeFromCart,
            clearCart,
            getTotalItems,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

// --- Components ---

// Navbar Component
const Navbar = ({ setCurrentPage }) => {
    const { getTotalItems } = useContext(CartContext);
    return (
        <nav className="bg-white p-4 shadow-lg sticky top-0 z-10 rounded-b-xl">
            <div className="container mx-auto flex justify-between items-center">
                <button onClick={() => setCurrentPage('home')} className="text-gray-800 text-2xl font-bold rounded-md px-3 py-1 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200">
                    ShopNow
                </button>
                <div className="flex space-x-4 items-center">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <HomeIcon /> Products
                    </button>
                    <button
                        onClick={() => setCurrentPage('cart')}
                        className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative"
                    >
                        <ShoppingCartIcon /> Cart
                        {getTotalItems() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {getTotalItems()}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

// Home/Product Listing Page
const HomePage = ({ setCurrentPage }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(mockProducts.map(p => p.category))];

    const filteredProducts = selectedCategory === 'All'
        ? mockProducts
        : mockProducts.filter(p => p.category === selectedCategory);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.name} added to cart!`); // Using alert for simulation as per instructions
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl my-4 shadow-inner">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Products</h2>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm
                            ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 flex flex-col">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-indigo-600 font-medium text-lg mb-1">${product.price.toFixed(2)}</p>
                            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 mt-auto"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Shopping Cart Page
const CartPage = ({ setCurrentPage }) => {
    const { cartItems, updateCartQuantity, removeFromCart, getTotalPrice, clearCart } = useContext(CartContext);

    const handleQuantityChange = (productId, e) => {
        const quantity = parseInt(e.target.value);
        updateCartQuantity(productId, quantity);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }
        alert(`Simulating checkout for total: $${getTotalPrice().toFixed(2)}. Order placed!`); // Using alert for simulation
        clearCart();
        setCurrentPage('home'); // Redirect to home after checkout
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl my-4 shadow-inner">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">Your cart is empty. <button onClick={() => setCurrentPage('home')} className="text-indigo-600 hover:underline font-medium">Start shopping!</button></p>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4"/>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e)}
                                        className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                        title="Remove item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end items-center mb-6 pr-4">
                        <p className="text-2xl font-bold text-gray-900">Total: ${getTotalPrice().toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={clearCart}
                            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 shadow-md"
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors duration-300 shadow-md"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};


// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'cart'

    // Render content based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'cart':
                return <CartPage setCurrentPage={setCurrentPage} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <CartProvider>
            <div className="bg-gray-100 min-h-screen">
                <Navbar setCurrentPage={setCurrentPage} />
                {renderPage()}
            </div>
        </CartProvider>
    );
};

export default App; // Export the main App component
