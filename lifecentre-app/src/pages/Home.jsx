import React, { useState, useEffect } from 'react';
import sql from '../lib/db';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import FilterBar from '../components/FilterBar';
import { searchItems } from '../utils/search';
import { trackActivity } from '../utils/analytics';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);
  
  const [services, setServices] = useState([]);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    trackActivity('page_view', { pageViewed: 'home' });
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, groupsData, coursesData] = await Promise.all([
        sql`SELECT * FROM services ORDER BY name`,
        sql`SELECT * FROM groups ORDER BY name`,
        sql`SELECT * FROM courses ORDER BY name`
      ]);
      
      setServices(servicesData);
      setGroups(groupsData);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      trackActivity('search', { searchQuery: query });
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchQuery('');
    setSelectedCategory('');
    trackActivity('tab_change', { pageViewed: tabId });
  };

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
    trackActivity('item_view', {
      itemViewedType: type,
      itemViewedId: item.id
    });
  };

  const getCurrentData = () => {
    switch(activeTab) {
      case 'services': return services;
      case 'groups': return groups;
      case 'courses': return courses;
      default: return [];
    }
  };

  const getFilteredData = () => {
    let data = getCurrentData();
    
    if (selectedCategory && activeTab === 'services') {
      data = data.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      data = searchItems(data, searchQuery);
    }
    
    return data;
  };

  const getCategories = () => {
    if (activeTab !== 'services') return [];
    const cats = [...new Set(services.map(s => s.category))];
    return cats.sort();
  };

  const tabs = [
    { id: 'services', label: 'Services',  count: services.length },
    { id: 'groups', label: 'Groups',  count: groups.length },
    { id: 'courses', label: 'Courses',  count: courses.length }
  ];

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 sm:py-16">
        <div className="section-container text-center">
          <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-4xl sm:text-5xl">💙</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Find the Support You Need
          </h1>
          <p className="text-base sm:text-xl text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
            Explore professional services, support groups, and healing courses
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="tel:+27123456789" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto text-center">
              Call Helpline
            </a>
            <Link to="/about" className="bg-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto text-center">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      <main className="section-container py-6 sm:py-10 -mt-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          <div className="px-4 sm:px-6 pb-6">
            {activeTab === 'services' && (
              <FilterBar
                categories={getCategories()}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading amazing resources...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4"></div>
                <p className="text-xl font-semibold text-gray-700 mb-2">No results found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredData.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    type={activeTab.slice(0, -1)}
                    onClick={() => handleItemClick(item, activeTab.slice(0, -1))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-16 py-8">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Life Centre</h3>
              <p className="text-sm text-gray-600">
                Christ-centered care and professional support for healing and growth
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/" className="block text-gray-600 hover:text-blue-600">Home</Link>
                <Link to="/about" className="block text-gray-600 hover:text-blue-600">About Us</Link>
                <Link to="/connect" className="block text-gray-600 hover:text-blue-600">Connect</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <a href="tel:+27123456789" className="block hover:text-blue-600">📞 +27 12 345 6789</a>
                <p>📧 info@lifecentre.org</p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm border-t border-gray-200 pt-6">
            <p>© 2025 Life Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          type={selectedItemType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Home;
