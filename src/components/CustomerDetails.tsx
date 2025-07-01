import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, TrendingUp, Package, Heart, Star, MessageSquare, Filter, Search, Plus, Eye, Edit, MoreVertical, ShoppingBag, Clock, Award, Target, Users, Save, X, Upload, Camera, Building, IndianRupee, Briefcase, Tag, BarChart3, Image, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  description: string;
  images: string[];
  stockQuantity: number;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  unit: string;
  seasonality: string;
  shelfLife: string;
  tags: string[];
  monthlySales: number;
  totalRevenue: number;
  profitMargin: number;
  customerRating: number;
  isOrganic: boolean;
  isHandmade: boolean;
  certifications: string[];
  supplierInfo: string;
  storageRequirements: string;
  deliveryTime: string;
  bulkDiscounts: { quantity: number; discount: number }[];
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  totalPurchases: number;
  lastPurchase: string;
  favoriteProducts: string[];
  customerSince: string;
  loyaltyLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalOrders: number;
  averageOrderValue: number;
  preferredPayment: string;
  notes: string;
  status: 'Active' | 'Inactive' | 'VIP';
  avatar?: string;
  businessType?: string;
  address?: string;
  gstNumber?: string;
  bankDetails?: string;
  monthlyTarget?: number;
  currentMonthSales?: number;
  productCategories?: string[];
  businessExperience?: string;
  products?: Product[];
}

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  costPrice: number;
  description: string;
  stockQuantity: number;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  unit: string;
  seasonality: string;
  shelfLife: string;
  tags: string[];
  monthlySales: number;
  isOrganic: boolean;
  isHandmade: boolean;
  certifications: string[];
  supplierInfo: string;
  storageRequirements: string;
  deliveryTime: string;
  bulkDiscounts: { quantity: number; discount: number }[];
}

interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  businessType: string;
  gstNumber: string;
  bankDetails: string;
  monthlyTarget: number;
  currentMonthSales: number;
  businessExperience: string;
  preferredPayment: string;
  notes: string;
  products: ProductFormData[];
}

const CustomerDetails: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive' | 'VIP'>('All');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    businessType: '',
    gstNumber: '',
    bankDetails: '',
    monthlyTarget: 0,
    currentMonthSales: 0,
    businessExperience: '',
    preferredPayment: 'UPI',
    notes: '',
    products: [{
      name: '',
      category: '',
      price: 0,
      costPrice: 0,
      description: '',
      stockQuantity: 0,
      minOrderQuantity: 1,
      maxOrderQuantity: 100,
      unit: 'kg',
      seasonality: 'year-round',
      shelfLife: '',
      tags: [],
      monthlySales: 0,
      isOrganic: false,
      isHandmade: false,
      certifications: [],
      supplierInfo: '',
      storageRequirements: '',
      deliveryTime: '',
      bulkDiscounts: []
    }]
  });
  const { t, isHindi } = useLanguage();

  const businessTypes = [
    { value: 'vegetables', label: isHindi ? 'सब्जी विक्रेता' : 'Vegetable Vendor' },
    { value: 'handicrafts', label: isHindi ? 'हस्तशिल्प' : 'Handicrafts' },
    { value: 'textiles', label: isHindi ? 'वस्त्र व्यापार' : 'Textiles' },
    { value: 'spices', label: isHindi ? 'मसाले' : 'Spices' },
    { value: 'dairy', label: isHindi ? 'डेयरी उत्पाद' : 'Dairy Products' },
    { value: 'bakery', label: isHindi ? 'बेकरी' : 'Bakery' },
    { value: 'grocery', label: isHindi ? 'किराना' : 'Grocery' },
    { value: 'beauty', label: isHindi ? 'सौंदर्य उत्पाद' : 'Beauty Products' },
    { value: 'other', label: isHindi ? 'अन्य' : 'Other' }
  ];

  const productCategories = [
    { value: 'fresh_vegetables', label: isHindi ? 'ताज़ी सब्जियां' : 'Fresh Vegetables' },
    { value: 'organic_products', label: isHindi ? 'जैविक उत्पाद' : 'Organic Products' },
    { value: 'handicrafts', label: isHindi ? 'हस्तशिल्प' : 'Handicrafts' },
    { value: 'home_textiles', label: isHindi ? 'घरेलू वस्त्र' : 'Home Textiles' },
    { value: 'spices_herbs', label: isHindi ? 'मसाले और जड़ी-बूटियां' : 'Spices & Herbs' },
    { value: 'dairy_products', label: isHindi ? 'डेयरी उत्पाद' : 'Dairy Products' },
    { value: 'baked_goods', label: isHindi ? 'बेकरी सामान' : 'Baked Goods' },
    { value: 'beauty_cosmetics', label: isHindi ? 'सौंदर्य प्रसाधन' : 'Beauty & Cosmetics' }
  ];

  const units = [
    { value: 'kg', label: isHindi ? 'किलोग्राम' : 'Kilogram' },
    { value: 'gram', label: isHindi ? 'ग्राम' : 'Gram' },
    { value: 'liter', label: isHindi ? 'लीटर' : 'Liter' },
    { value: 'piece', label: isHindi ? 'पीस' : 'Piece' },
    { value: 'dozen', label: isHindi ? 'दर्जन' : 'Dozen' },
    { value: 'bundle', label: isHindi ? 'बंडल' : 'Bundle' },
    { value: 'box', label: isHindi ? 'बॉक्स' : 'Box' }
  ];

  const seasonalityOptions = [
    { value: 'year-round', label: isHindi ? 'साल भर' : 'Year Round' },
    { value: 'summer', label: isHindi ? 'गर्मी' : 'Summer' },
    { value: 'winter', label: isHindi ? 'सर्दी' : 'Winter' },
    { value: 'monsoon', label: isHindi ? 'बारिश' : 'Monsoon' },
    { value: 'festival', label: isHindi ? 'त्योहारी' : 'Festival Season' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: isHindi ? 'नया (0-1 साल)' : 'Beginner (0-1 year)' },
    { value: 'intermediate', label: isHindi ? 'मध्यम (1-3 साल)' : 'Intermediate (1-3 years)' },
    { value: 'experienced', label: isHindi ? 'अनुभवी (3-5 साल)' : 'Experienced (3-5 years)' },
    { value: 'expert', label: isHindi ? 'विशेषज्ञ (5+ साल)' : 'Expert (5+ years)' }
  ];

  const commonTags = [
    { value: 'fresh', label: isHindi ? 'ताज़ा' : 'Fresh' },
    { value: 'organic', label: isHindi ? 'जैविक' : 'Organic' },
    { value: 'local', label: isHindi ? 'स्थानीय' : 'Local' },
    { value: 'premium', label: isHindi ? 'प्रीमियम' : 'Premium' },
    { value: 'handmade', label: isHindi ? 'हस्तनिर्मित' : 'Handmade' },
    { value: 'traditional', label: isHindi ? 'पारंपरिक' : 'Traditional' },
    { value: 'seasonal', label: isHindi ? 'मौसमी' : 'Seasonal' },
    { value: 'bulk', label: isHindi ? 'थोक' : 'Bulk Available' }
  ];

  // Sample customer data with products
  useEffect(() => {
    const sampleCustomers: Customer[] = [
      {
        id: '1',
        name: 'प्रिया शर्मा',
        phone: '+91 98765 43210',
        email: 'priya.sharma@email.com',
        location: 'दिल्ली',
        address: 'सेक्टर 15, नोएडा, उत्तर प्रदेश',
        businessType: 'vegetables',
        totalPurchases: 15600,
        lastPurchase: '2024-01-15',
        favoriteProducts: ['Fresh Vegetables', 'Organic Spices'],
        customerSince: '2023-06-15',
        loyaltyLevel: 'Gold',
        totalOrders: 24,
        averageOrderValue: 650,
        preferredPayment: 'UPI',
        notes: 'Prefers organic products, orders weekly',
        status: 'VIP',
        monthlyTarget: 25000,
        currentMonthSales: 18500,
        businessExperience: 'intermediate',
        gstNumber: 'GST123456789',
        bankDetails: 'SBI - 1234567890',
        products: [
          {
            id: '1',
            name: 'ताज़े टमाटर',
            category: 'fresh_vegetables',
            price: 40,
            costPrice: 25,
            description: 'फार्म से ताज़े लाए गए लाल टमाटर, बेहतरीन गुणवत्ता',
            images: [],
            stockQuantity: 500,
            minOrderQuantity: 5,
            maxOrderQuantity: 100,
            unit: 'kg',
            seasonality: 'year-round',
            shelfLife: '5-7 दिन',
            tags: ['fresh', 'local', 'premium'],
            monthlySales: 1200,
            totalRevenue: 48000,
            profitMargin: 37.5,
            customerRating: 4.8,
            isOrganic: false,
            isHandmade: false,
            certifications: ['FSSAI'],
            supplierInfo: 'स्थानीय किसान - राम सिंह',
            storageRequirements: 'ठंडी और सूखी जगह',
            deliveryTime: '2-4 घंटे',
            bulkDiscounts: [
              { quantity: 50, discount: 5 },
              { quantity: 100, discount: 10 }
            ]
          }
        ]
      }
    ];
    setCustomers(sampleCustomers);
  }, []);

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, {
        name: '',
        category: '',
        price: 0,
        costPrice: 0,
        description: '',
        stockQuantity: 0,
        minOrderQuantity: 1,
        maxOrderQuantity: 100,
        unit: 'kg',
        seasonality: 'year-round',
        shelfLife: '',
        tags: [],
        monthlySales: 0,
        isOrganic: false,
        isHandmade: false,
        certifications: [],
        supplierInfo: '',
        storageRequirements: '',
        deliveryTime: '',
        bulkDiscounts: []
      }]
    }));
  };

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const updateProduct = (index: number, field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const handleTagToggle = (productIndex: number, tag: string) => {
    const currentTags = formData.products[productIndex].tags;
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    updateProduct(productIndex, 'tags', newTags);
  };

  const addBulkDiscount = (productIndex: number) => {
    const currentDiscounts = formData.products[productIndex].bulkDiscounts;
    updateProduct(productIndex, 'bulkDiscounts', [
      ...currentDiscounts,
      { quantity: 0, discount: 0 }
    ]);
  };

  const updateBulkDiscount = (productIndex: number, discountIndex: number, field: 'quantity' | 'discount', value: number) => {
    const currentDiscounts = formData.products[productIndex].bulkDiscounts;
    const newDiscounts = currentDiscounts.map((discount, i) =>
      i === discountIndex ? { ...discount, [field]: value } : discount
    );
    updateProduct(productIndex, 'bulkDiscounts', newDiscounts);
  };

  const removeBulkDiscount = (productIndex: number, discountIndex: number) => {
    const currentDiscounts = formData.products[productIndex].bulkDiscounts;
    updateProduct(productIndex, 'bulkDiscounts', currentDiscounts.filter((_, i) => i !== discountIndex));
  };

  const handleInputChange = (field: keyof Omit<CustomerFormData, 'products'>, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      address: formData.address,
      businessType: formData.businessType,
      totalPurchases: formData.currentMonthSales,
      lastPurchase: new Date().toISOString().split('T')[0],
      favoriteProducts: formData.products.map(p => p.name),
      customerSince: new Date().toISOString().split('T')[0],
      loyaltyLevel: 'Bronze',
      totalOrders: 0,
      averageOrderValue: 0,
      preferredPayment: formData.preferredPayment,
      notes: formData.notes,
      status: 'Active',
      monthlyTarget: formData.monthlyTarget,
      currentMonthSales: formData.currentMonthSales,
      businessExperience: formData.businessExperience,
      gstNumber: formData.gstNumber,
      bankDetails: formData.bankDetails,
      products: formData.products.map((product, index) => ({
        ...product,
        id: `${Date.now()}-${index}`,
        images: [],
        totalRevenue: product.price * product.monthlySales,
        profitMargin: ((product.price - product.costPrice) / product.price) * 100,
        customerRating: 0
      }))
    };

    setCustomers(prev => [...prev, newCustomer]);
    setShowAddCustomer(false);
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      address: '',
      businessType: '',
      gstNumber: '',
      bankDetails: '',
      monthlyTarget: 0,
      currentMonthSales: 0,
      businessExperience: '',
      preferredPayment: 'UPI',
      notes: '',
      products: [{
        name: '',
        category: '',
        price: 0,
        costPrice: 0,
        description: '',
        stockQuantity: 0,
        minOrderQuantity: 1,
        maxOrderQuantity: 100,
        unit: 'kg',
        seasonality: 'year-round',
        shelfLife: '',
        tags: [],
        monthlySales: 0,
        isOrganic: false,
        isHandmade: false,
        certifications: [],
        supplierInfo: '',
        storageRequirements: '',
        deliveryTime: '',
        bulkDiscounts: []
      }]
    });
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getLoyaltyColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const CustomerRegistrationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-24 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378] rounded-3xl p-8 max-w-6xl w-full shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#2D4F4A] rounded-full flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>
                {isHindi ? 'नया विक्रेता पंजीकरण' : 'New Vendor Registration'}
              </h2>
              <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                {isHindi ? 'अपनी व्यापारिक और उत्पाद की जानकारी भरें' : 'Fill in your business and product details'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#2D4F4A]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-[#8DBTA4]/10 p-6 rounded-xl border border-[#8DBTA4]/30">
            <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 flex items-center space-x-2 ${isHindi ? 'text-base font-medium' : ''}`}>
              <User className="w-5 h-5" />
              <span>{isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? 'पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                  placeholder={isHindi ? 'आपका पूरा नाम' : 'Your full name'}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? 'फोन नंबर *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                  placeholder={isHindi ? '+91 98765 43210' : '+91 98765 43210'}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? 'ईमेल' : 'Email'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                  placeholder={isHindi ? 'आपका ईमेल पता' : 'your.email@example.com'}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? 'शहर *' : 'City *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                  placeholder={isHindi ? 'आपका शहर' : 'Your city'}
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-[#8DBTA4]/10 p-6 rounded-xl border border-[#8DBTA4]/30">
            <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 flex items-center space-x-2 ${isHindi ? 'text-base font-medium' : ''}`}>
              <Briefcase className="w-5 h-5" />
              <span>{isHindi ? 'व्यापारिक जानकारी' : 'Business Information'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? 'व्यापार का प्रकार *' : 'Business Type *'}
                </label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                >
                  <option value="">{isHindi ? 'व्यापार का प्रकार चुनें' : 'Select business type'}</option>
                  {businessTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? 'मासिक लक्ष्य (₹)' : 'Monthly Target (₹)'}
                </label>
                <input
                  type="number"
                  value={formData.monthlyTarget}
                  onChange={(e) => handleInputChange('monthlyTarget', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                  placeholder={isHindi ? '25000' : '25000'}
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="bg-[#8DBTA4]/10 p-6 rounded-xl border border-[#8DBTA4]/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-bold text-[#0A0F0D] flex items-center space-x-2 ${isHindi ? 'text-base font-medium' : ''}`}>
                <Package className="w-5 h-5" />
                <span>{isHindi ? 'उत्पाद विवरण' : 'Product Details'}</span>
              </h3>
              <button
                type="button"
                onClick={addProduct}
                className={`flex items-center space-x-2 px-4 py-2 bg-[#2D4F4A] text-white rounded-lg hover:bg-[#0A0F0D] transition-colors ${isHindi ? 'text-sm' : ''}`}
              >
                <Plus className="w-4 h-4" />
                <span>{isHindi ? 'उत्पाद जोड़ें' : 'Add Product'}</span>
              </button>
            </div>

            {formData.products.map((product, productIndex) => (
              <div key={productIndex} className="bg-[#F5F3EC]/50 p-6 rounded-xl border border-[#8DBTA4]/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg font-semibold text-[#0A0F0D] ${isHindi ? 'text-base font-medium' : ''}`}>
                    {isHindi ? `उत्पाद ${productIndex + 1}` : `Product ${productIndex + 1}`}
                  </h4>
                  {formData.products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(productIndex)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Basic Product Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'उत्पाद का नाम *' : 'Product Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={product.name}
                      onChange={(e) => updateProduct(productIndex, 'name', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder={isHindi ? 'जैसे: ताज़े टमाटर' : 'e.g., Fresh Tomatoes'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'श्रेणी *' : 'Category *'}
                    </label>
                    <select
                      required
                      value={product.category}
                      onChange={(e) => updateProduct(productIndex, 'category', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    >
                      <option value="">{isHindi ? 'श्रेणी चुनें' : 'Select category'}</option>
                      {productCategories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'बिक्री मूल्य (₹) *' : 'Selling Price (₹) *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={product.price}
                      onChange={(e) => updateProduct(productIndex, 'price', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder="40"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'लागत मूल्य (₹)' : 'Cost Price (₹)'}
                    </label>
                    <input
                      type="number"
                      value={product.costPrice}
                      onChange={(e) => updateProduct(productIndex, 'costPrice', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'इकाई' : 'Unit'}
                    </label>
                    <select
                      value={product.unit}
                      onChange={(e) => updateProduct(productIndex, 'unit', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    >
                      {units.map((unit) => (
                        <option key={unit.value} value={unit.value}>{unit.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'मुनाफा %' : 'Profit %'}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={product.price && product.costPrice ? 
                        `${(((product.price - product.costPrice) / product.price) * 100).toFixed(1)}%` : '0%'}
                      className={`w-full px-4 py-3 bg-gray-100 border border-[#8DBTA4]/30 rounded-xl text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                    {isHindi ? 'उत्पाद विवरण *' : 'Product Description *'}
                  </label>
                  <textarea
                    required
                    value={product.description}
                    onChange={(e) => updateProduct(productIndex, 'description', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    placeholder={isHindi ? 'उत्पाद की विस्तृत जानकारी दें...' : 'Provide detailed product information...'}
                  />
                </div>

                {/* Stock & Sales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'स्टॉक मात्रा' : 'Stock Quantity'}
                    </label>
                    <input
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) => updateProduct(productIndex, 'stockQuantity', parseInt(e.target.value) || 0)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'न्यूनतम ऑर्डर' : 'Min Order Qty'}
                    </label>
                    <input
                      type="number"
                      value={product.minOrderQuantity}
                      onChange={(e) => updateProduct(productIndex, 'minOrderQuantity', parseInt(e.target.value) || 1)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'मासिक बिक्री' : 'Monthly Sales'}
                    </label>
                    <input
                      type="number"
                      value={product.monthlySales}
                      onChange={(e) => updateProduct(productIndex, 'monthlySales', parseInt(e.target.value) || 0)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder="1200"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'मौसमी उपलब्धता' : 'Seasonality'}
                    </label>
                    <select
                      value={product.seasonality}
                      onChange={(e) => updateProduct(productIndex, 'seasonality', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    >
                      {seasonalityOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'शेल्फ लाइफ' : 'Shelf Life'}
                    </label>
                    <input
                      type="text"
                      value={product.shelfLife}
                      onChange={(e) => updateProduct(productIndex, 'shelfLife', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder={isHindi ? '5-7 दिन' : '5-7 days'}
                    />
                  </div>
                </div>

                {/* Product Tags */}
                <div className="mb-6">
                  <label className={`block text-sm font-medium text-[#2D4F4A] mb-3 ${isHindi ? 'text-xs' : ''}`}>
                    {isHindi ? 'उत्पाद टैग' : 'Product Tags'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {commonTags.map((tag) => (
                      <label
                        key={tag.value}
                        className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all duration-300 ${
                          product.tags.includes(tag.value)
                            ? 'bg-[#2D4F4A] text-white border-[#2D4F4A]'
                            : 'bg-white text-[#2D4F4A] border-[#8DBTA4]/30 hover:bg-[#8DBTA4]/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={product.tags.includes(tag.value)}
                          onChange={() => handleTagToggle(productIndex, tag.value)}
                          className="hidden"
                        />
                        <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                          product.tags.includes(tag.value)
                            ? 'bg-white border-white'
                            : 'border-[#2D4F4A]'
                        }`}>
                          {product.tags.includes(tag.value) && (
                            <div className="w-1.5 h-1.5 bg-[#2D4F4A] rounded"></div>
                          )}
                        </div>
                        <span className={`text-xs font-medium ${isHindi ? 'text-xs' : ''}`}>{tag.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Attributes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`organic-${productIndex}`}
                      checked={product.isOrganic}
                      onChange={(e) => updateProduct(productIndex, 'isOrganic', e.target.checked)}
                      className="w-4 h-4 text-[#2D4F4A] border-[#8DBTA4]/30 rounded focus:ring-[#2D4F4A]"
                    />
                    <label htmlFor={`organic-${productIndex}`} className={`text-sm font-medium text-[#2D4F4A] ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'जैविक उत्पाद' : 'Organic Product'}
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`handmade-${productIndex}`}
                      checked={product.isHandmade}
                      onChange={(e) => updateProduct(productIndex, 'isHandmade', e.target.checked)}
                      className="w-4 h-4 text-[#2D4F4A] border-[#8DBTA4]/30 rounded focus:ring-[#2D4F4A]"
                    />
                    <label htmlFor={`handmade-${productIndex}`} className={`text-sm font-medium text-[#2D4F4A] ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'हस्तनिर्मित' : 'Handmade'}
                    </label>
                  </div>
                </div>

                {/* Bulk Discounts */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className={`block text-sm font-medium text-[#2D4F4A] ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'थोक छूट' : 'Bulk Discounts'}
                    </label>
                    <button
                      type="button"
                      onClick={() => addBulkDiscount(productIndex)}
                      className={`flex items-center space-x-1 px-3 py-1 bg-[#2D4F4A] text-white rounded-lg hover:bg-[#0A0F0D] transition-colors text-xs ${isHindi ? 'text-xs' : ''}`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{isHindi ? 'छूट जोड़ें' : 'Add Discount'}</span>
                    </button>
                  </div>
                  {product.bulkDiscounts.map((discount, discountIndex) => (
                    <div key={discountIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="number"
                        value={discount.quantity}
                        onChange={(e) => updateBulkDiscount(productIndex, discountIndex, 'quantity', parseInt(e.target.value) || 0)}
                        className={`flex-1 px-3 py-2 bg-white border border-[#8DBTA4]/30 rounded-lg focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                        placeholder={isHindi ? 'मात्रा' : 'Quantity'}
                      />
                      <span className={`text-sm text-[#2D4F4A] ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'पर' : 'at'}
                      </span>
                      <input
                        type="number"
                        value={discount.discount}
                        onChange={(e) => updateBulkDiscount(productIndex, discountIndex, 'discount', parseInt(e.target.value) || 0)}
                        className={`flex-1 px-3 py-2 bg-white border border-[#8DBTA4]/30 rounded-lg focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                        placeholder={isHindi ? 'छूट %' : 'Discount %'}
                      />
                      <button
                        type="button"
                        onClick={() => removeBulkDiscount(productIndex, discountIndex)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Additional Product Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'सप्लायर जानकारी' : 'Supplier Information'}
                    </label>
                    <input
                      type="text"
                      value={product.supplierInfo}
                      onChange={(e) => updateProduct(productIndex, 'supplierInfo', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder={isHindi ? 'सप्लायर का नाम और संपर्क' : 'Supplier name and contact'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'डिलीवरी समय' : 'Delivery Time'}
                    </label>
                    <input
                      type="text"
                      value={product.deliveryTime}
                      onChange={(e) => updateProduct(productIndex, 'deliveryTime', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      placeholder={isHindi ? '2-4 घंटे' : '2-4 hours'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-xl hover:bg-[#8DBTA4]/30 transition-colors ${isHindi ? 'text-sm' : ''}`}
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className={`px-6 py-3 bg-[#2D4F4A] text-white rounded-xl hover:bg-[#0A0F0D] transition-colors flex items-center space-x-2 ${isHindi ? 'text-sm' : ''}`}
            >
              <Save className="w-5 h-5" />
              <span>{isHindi ? 'पंजीकरण करें' : 'Register Vendor'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => (
    <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#8DBTA4]/20 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#2D4F4A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : 'text-base'}`}>{customer.name}</h3>
            <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : 'text-sm'}`}>{customer.location}</p>
            {customer.businessType && (
              <p className={`text-[#2D4F4A]/60 text-xs ${isHindi ? 'text-xs' : ''}`}>
                {businessTypes.find(bt => bt.value === customer.businessType)?.label}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLoyaltyColor(customer.loyaltyLevel)}`}>
            {customer.loyaltyLevel}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
            {customer.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#8DBTA4]/10 p-3 rounded-xl border border-[#8DBTA4]/20">
          <p className={`text-xs text-[#2D4F4A]/70 mb-1 ${isHindi ? 'text-xs' : ''}`}>
            {isHindi ? 'कुल उत्पाद' : 'Total Products'}
          </p>
          <p className="text-lg font-bold text-[#2D4F4A]">{customer.products?.length || 0}</p>
        </div>
        <div className="bg-[#8DBTA4]/10 p-3 rounded-xl border border-[#8DBTA4]/20">
          <p className={`text-xs text-[#2D4F4A]/70 mb-1 ${isHindi ? 'text-xs' : ''}`}>
            {isHindi ? 'मासिक लक्ष्य' : 'Monthly Target'}
          </p>
          <p className="text-lg font-bold text-[#2D4F4A]">₹{customer.monthlyTarget?.toLocaleString() || 'N/A'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-[#2D4F4A]/70">
          <Phone className="w-4 h-4" />
          <span className={`${isHindi ? 'text-xs' : 'text-sm'}`}>{customer.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-[#2D4F4A]/70">
          <Package className="w-4 h-4" />
          <span className={`${isHindi ? 'text-xs' : 'text-sm'}`}>
            {customer.products?.[0]?.name || 'No products'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedCustomer(customer)}
          className={`flex items-center space-x-2 px-4 py-2 bg-[#2D4F4A] text-white rounded-lg hover:bg-[#0A0F0D] transition-colors ${isHindi ? 'text-sm' : ''}`}
        >
          <Eye className="w-4 h-4" />
          <span>{isHindi ? 'विवरण देखें' : 'View Details'}</span>
        </button>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4 text-[#2D4F4A]" />
          </button>
          <button 
            onClick={() => {
              setSelectedCustomer(customer);
              setShowEditCustomer(true);
            }}
            className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-[#2D4F4A]" />
          </button>
          <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-[#2D4F4A]" />
          </button>
        </div>
      </div>
    </div>
  );

  const CustomerDetailModal: React.FC<{ customer: Customer; onClose: () => void }> = ({ customer, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-24 overflow-y-auto">
      <div className="bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378] rounded-3xl p-8 max-w-6xl w-full shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#2D4F4A] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>{customer.name}</h2>
              <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                {isHindi ? 'विक्रेता से' : 'Vendor since'} {new Date(customer.customerSince).toLocaleDateString()}
              </p>
              {customer.businessType && (
                <p className={`text-[#2D4F4A]/60 ${isHindi ? 'text-sm' : ''}`}>
                  {businessTypes.find(bt => bt.value === customer.businessType)?.label}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#2D4F4A]" />
          </button>
        </div>

        {/* Products Section */}
        {customer.products && customer.products.length > 0 && (
          <div className="mb-8">
            <h3 className={`text-xl font-bold text-[#0A0F0D] mb-6 ${isHindi ? 'text-lg font-medium' : ''}`}>
              {isHindi ? 'उत्पाद पोर्टफोलियो' : 'Product Portfolio'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customer.products.map((product, index) => (
                <div key={product.id} className="bg-[#8DBTA4]/10 p-6 rounded-xl border border-[#8DBTA4]/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className={`font-bold text-[#0A0F0D] text-lg ${isHindi ? 'text-base font-medium' : ''}`}>
                        {product.name}
                      </h4>
                      <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                        {productCategories.find(cat => cat.value === product.category)?.label}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#2D4F4A]">₹{product.price}</p>
                      <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'प्रति' : 'per'} {units.find(u => u.value === product.unit)?.label}
                      </p>
                    </div>
                  </div>

                  <p className={`text-[#2D4F4A] mb-4 ${isHindi ? 'text-sm' : ''}`}>{product.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className={`text-xs text-[#2D4F4A]/70 mb-1 ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'मासिक बिक्री' : 'Monthly Sales'}
                      </p>
                      <p className="text-lg font-bold text-[#2D4F4A]">{product.monthlySales}</p>
                    </div>
                    <div>
                      <p className={`text-xs text-[#2D4F4A]/70 mb-1 ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'स्टॉक' : 'Stock'}
                      </p>
                      <p className="text-lg font-bold text-[#2D4F4A]">{product.stockQuantity}</p>
                    </div>
                    <div>
                      <p className={`text-xs text-[#2D4F4A]/70 mb-1 ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'मुनाफा मार्जिन' : 'Profit Margin'}
                      </p>
                      <p className="text-lg font-bold text-[#2D4F4A]">{product.profitMargin?.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className={`text-xs text-[#2D4F4A]/70 mb-1 ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'मासिक आय' : 'Monthly Revenue'}
                      </p>
                      <p className="text-lg font-bold text-[#2D4F4A]">₹{product.totalRevenue?.toLocaleString()}</p>
                    </div>
                  </div>

                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-[#2D4F4A] text-white text-xs rounded-full"
                        >
                          {commonTags.find(t => t.value === tag)?.label || tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {product.bulkDiscounts && product.bulkDiscounts.length > 0 && (
                    <div>
                      <p className={`text-sm font-medium text-[#2D4F4A] mb-2 ${isHindi ? 'text-xs' : ''}`}>
                        {isHindi ? 'थोक छूट:' : 'Bulk Discounts:'}
                      </p>
                      <div className="space-y-1">
                        {product.bulkDiscounts.map((discount, discountIndex) => (
                          <p key={discountIndex} className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                            {discount.quantity}+ {isHindi ? 'पर' : 'at'} {discount.discount}% {isHindi ? 'छूट' : 'off'}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#8DBTA4]/5 p-6 rounded-xl border border-[#8DBTA4]/20">
            <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 ${isHindi ? 'text-base font-medium' : ''}`}>
              {isHindi ? 'संपर्क जानकारी' : 'Contact Information'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#2D4F4A]" />
                <span className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{customer.phone}</span>
              </div>
              {customer.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#2D4F4A]" />
                  <span className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{customer.email}</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#2D4F4A]" />
                <span className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{customer.location}</span>
              </div>
              {customer.address && (
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-[#2D4F4A] mt-1" />
                  <span className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{customer.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#8DBTA4]/5 p-6 rounded-xl border border-[#8DBTA4]/20">
            <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 ${isHindi ? 'text-base font-medium' : ''}`}>
              {isHindi ? 'व्यापारिक जानकारी' : 'Business Information'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-[#2D4F4A]" />
                <div>
                  <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                    {isHindi ? 'मासिक लक्ष्य' : 'Monthly Target'}
                  </p>
                  <p className="font-bold text-[#2D4F4A]">₹{customer.monthlyTarget?.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-[#2D4F4A]" />
                <div>
                  <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                    {isHindi ? 'इस महीने की बिक्री' : 'Current Month Sales'}
                  </p>
                  <p className="font-bold text-[#2D4F4A]">₹{customer.currentMonthSales?.toLocaleString()}</p>
                </div>
              </div>
              {customer.gstNumber && (
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-[#2D4F4A]" />
                  <div>
                    <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>GST Number</p>
                    <p className="font-bold text-[#2D4F4A]">{customer.gstNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className={`px-6 py-3 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-xl hover:bg-[#8DBTA4]/30 transition-colors ${isHindi ? 'text-sm' : ''}`}
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
          <button className={`px-6 py-3 bg-[#2D4F4A] text-white rounded-xl hover:bg-[#0A0F0D] transition-colors ${isHindi ? 'text-sm' : ''}`}>
            {isHindi ? 'संपादित करें' : 'Edit Vendor'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className={`text-2xl font-bold text-[#0A0F0D] mb-2 ${isHindi ? 'text-xl font-medium' : ''}`}>
            {isHindi ? 'विक्रेता विवरण' : 'Vendor Details'}
          </h2>
          <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
            {isHindi ? 'अपने विक्रेताओं और उनके उत्पादों को प्रबंधित करें' : 'Manage your vendors and their product portfolios'}
          </p>
        </div>
        <button
          onClick={() => setShowAddCustomer(true)}
          className={`flex items-center space-x-2 px-6 py-3 bg-[#2D4F4A] text-white rounded-xl hover:bg-[#0A0F0D] transition-colors shadow-lg hover:shadow-xl ${isHindi ? 'text-sm' : ''}`}
        >
          <Plus className="w-5 h-5" />
          <span>{isHindi ? 'नया विक्रेता जोड़ें' : 'Add New Vendor'}</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2D4F4A]/50" />
            <input
              type="text"
              placeholder={isHindi ? 'विक्रेता खोजें...' : 'Search vendors...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className={`px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
          >
            <option value="All">{isHindi ? 'सभी' : 'All'}</option>
            <option value="Active">{isHindi ? 'सक्रिय' : 'Active'}</option>
            <option value="VIP">VIP</option>
            <option value="Inactive">{isHindi ? 'निष्क्रिय' : 'Inactive'}</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#2D4F4A] text-white' : 'bg-[#8DBTA4]/20 text-[#2D4F4A]'}`}
          >
            <Package className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#2D4F4A] text-white' : 'bg-[#8DBTA4]/20 text-[#2D4F4A]'}`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Vendor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-8 h-8 text-[#2D4F4A]" />
            <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
              {isHindi ? 'कुल विक्रेता' : 'Total Vendors'}
            </h3>
          </div>
          <p className="text-3xl font-bold text-[#2D4F4A]">{customers.length}</p>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
          <div className="flex items-center space-x-3 mb-3">
            <Package className="w-8 h-8 text-[#2D4F4A]" />
            <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
              {isHindi ? 'कुल उत्पाद' : 'Total Products'}
            </h3>
          </div>
          <p className="text-3xl font-bold text-[#2D4F4A]">
            {customers.reduce((sum, c) => sum + (c.products?.length || 0), 0)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
          <div className="flex items-center space-x-3 mb-3">
            <Star className="w-8 h-8 text-[#2D4F4A]" />
            <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
              VIP {isHindi ? 'विक्रेता' : 'Vendors'}
            </h3>
          </div>
          <p className="text-3xl font-bold text-[#2D4F4A]">
            {customers.filter(c => c.status === 'VIP').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-8 h-8 text-[#2D4F4A]" />
            <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
              {isHindi ? 'औसत लक्ष्य' : 'Avg Target'}
            </h3>
          </div>
          <p className="text-3xl font-bold text-[#2D4F4A]">
            ₹{Math.round(customers.reduce((sum, c) => sum + (c.monthlyTarget || 0), 0) / customers.length).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Vendor Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-[#2D4F4A]/50 mx-auto mb-4" />
          <h3 className={`text-xl font-bold text-[#2D4F4A] mb-2 ${isHindi ? 'text-lg font-medium' : ''}`}>
            {isHindi ? 'कोई विक्रेता नहीं मिला' : 'No vendors found'}
          </h3>
          <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
            {isHindi ? 'अपनी खोज या फ़िल्टर बदलने का प्रयास करें' : 'Try adjusting your search or filters'}
          </p>
        </div>
      )}

      {/* Vendor Registration Form */}
      {showAddCustomer && (
        <CustomerRegistrationForm onClose={() => setShowAddCustomer(false)} />
      )}

      {/* Vendor Detail Modal */}
      {selectedCustomer && !showEditCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default CustomerDetails;