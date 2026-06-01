import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/store';
import { FaTruck, FaCheck, FaTags } from 'react-icons/fa';

const Home = () => {
  const { getCategories, categories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-green-50 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            No. 1 Grocery Hub in Oxiguri
          </span>
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            Fresh Groceries, Delivered Straight To Your Doorstep
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Skip the market crowds. Order daily staples, fresh dairy, and household essentials on WhatsApp. Free 30-minute delivery straight to your home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/917662006613" target="_blank" rel="noopener noreferrer" 
               className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">
              Order via WhatsApp
            </a>
            <a href="tel:+917662006613" 
               className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 -mt-8 relative z-10 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <FaTruck className="text-4xl text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">30-Min Delivery</h3>
          <p className="text-gray-600">Lightning fast home delivery within Oxiguri and nearby areas</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <FaCheck className="text-4xl text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
          <p className="text-gray-600">Handpicked fresh produce and authentic products</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <FaTags className="text-4xl text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Best Prices</h3>
          <p className="text-gray-600">Unmatched bulk discounts and seasonal weekend deals</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`}
                  className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🥬</div>
              <h4 className="font-bold text-green-700">{cat}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to order?</h2>
          <p className="text-xl mb-8">Get your groceries delivered in just 30 minutes!</p>
          <Link to="/products" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
