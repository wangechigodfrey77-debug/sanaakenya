import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  Package,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit3,
  ExternalLink,
  UploadCloud,
  X,
  Sparkles,
  AlertCircle,
  Eye,
  DollarSign,
  MapPin,
  Tag,
  Layers,
  ArrowUpDown,
  RefreshCw,
  Award,
  Phone,
  Truck
} from 'lucide-react';
import { Artwork, Artisan, Category, Currency } from '../types';
import { KENYA_DELIVERY_REGIONS } from '../data/deliveryRegions';

// Preset Authentic Kenyan Avatars and Product Images for instant selection
import soapstoneAvatar from '../assets/images/kenyan_soapstone_sculptor_1787379506795.jpg';
import maasaiAvatar from '../assets/images/kenyan_maasai_artisan_1787379476084.jpg';
import woodcarverAvatar from '../assets/images/kenyan_woodcarver_master_1787379491936.jpg';
import sisalAvatar from '../assets/images/kenyan_sisal_weaver_1787379521985.jpg';
import swahiliAvatar from '../assets/images/kenyan_swahili_artist_1787379537998.jpg';
import glassAvatar from '../assets/images/kenyan_glass_artisan_1787379554085.jpg';

import kisiiCraftImg from '../assets/images/kisii_soapstone_1786552141742.jpg';
import maasaiCraftImg from '../assets/images/maasai_beadwork_1786552154808.jpg';
import ebonyCraftImg from '../assets/images/ebony_woodcarving_1786552168531.jpg';
import kiondoCraftImg from '../assets/images/kiondo_basket_1786552180434.jpg';
import glassCraftImg from '../assets/images/kitengela_glass_1786552195163.jpg';
import batikCraftImg from '../assets/images/kenyan_batik_painting_1787379569328.jpg';
import beadCraftImg from '../assets/images/kenyan_bead_craft_1787379584867.jpg';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  artisans: Record<string, Artisan>;
  onAddArtwork: (artwork: Artwork) => void;
  onUpdateArtwork: (artwork: Artwork) => void;
  onDeleteArtwork: (artworkId: string) => void;
  onToggleStock: (artworkId: string) => void;
  onToggleFeatured: (artworkId: string) => void;
  onAddArtisan: (artisan: Artisan) => void;
  onDeleteArtisan: (artisanId: string) => void;
  currency: Currency;
  formatPrice: (priceUSD: number, cur: Currency) => string;
  onResetToDefaults: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  artworks,
  artisans,
  onAddArtwork,
  onUpdateArtwork,
  onDeleteArtwork,
  onToggleStock,
  onToggleFeatured,
  onAddArtisan,
  onDeleteArtisan,
  currency,
  formatPrice,
  onResetToDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'vendors' | 'add-product' | 'add-vendor' | 'metrics'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Vendor Form State
  const [vendorName, setVendorName] = useState('');
  const [vendorCoop, setVendorCoop] = useState('');
  const [vendorLocation, setVendorLocation] = useState('Tabaka Quarries, Kisii County');
  const [vendorCraftType, setVendorCraftType] = useState('Soapstone Carving & Polishing');
  const [vendorExperience, setVendorExperience] = useState(15);
  const [vendorBio, setVendorBio] = useState('');
  const [vendorAvatar, setVendorAvatar] = useState(maasaiAvatar);
  const [vendorPhone, setVendorPhone] = useState('0712 345 678');
  const [vendorIsVerified, setVendorIsVerified] = useState(true);

  // New Product Form State
  const [prodTitle, setProdTitle] = useState('');
  const [prodKiswahiliTitle, setProdKiswahiliTitle] = useState('');
  const [prodCategory, setProdCategory] = useState<Category>('soapstone');
  const [prodPriceUSD, setProdPriceUSD] = useState(150);
  const [prodArtisanId, setProdArtisanId] = useState<string>(Object.keys(artisans)[0] || 'tabaka');
  const [prodRegion, setProdRegion] = useState('Tabaka, Kisii County');
  const [prodImage, setProdImage] = useState(kisiiCraftImg);
  const [prodDescription, setProdDescription] = useState('');
  const [prodMaterials, setProdMaterials] = useState('Natural Pink Kisii Soapstone, Beeswax Polish');
  const [prodDimensions, setProdDimensions] = useState('28cm (H) x 15cm (W)');
  const [prodWeightKg, setProdWeightKg] = useState(3.2);
  const [prodCraftedDays, setProdCraftedDays] = useState(10);
  const [prodIsFeatured, setProdIsFeatured] = useState(true);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  // Image Upload helper (converts local file to Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'vendor' | 'product') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (target === 'vendor') setVendorAvatar(reader.result);
          else setProdImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit New Vendor
  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim()) return;

    const vendorId = `artisan-${Date.now()}`;
    const newArtisan: Artisan = {
      id: vendorId,
      name: vendorName.trim(),
      location: vendorLocation,
      coopName: vendorCoop.trim() || 'Kenyan Independent Artisan Guild',
      bio: vendorBio.trim() || `Master craftsperson specializing in authentic Kenyan ${vendorCraftType} with over ${vendorExperience} years of dedicated practice.`,
      avatar: vendorAvatar,
      craftType: vendorCraftType,
      experienceYears: Number(vendorExperience),
    };

    onAddArtisan(newArtisan);
    showToast(`Artisan Vendor "${newArtisan.name}" successfully added!`);
    
    // Reset form & switch tab
    setVendorName('');
    setVendorCoop('');
    setVendorBio('');
    setActiveTab('vendors');
  };

  // Submit New Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim()) return;

    const selectedArtisan = artisans[prodArtisanId] || Object.values(artisans)[0];
    const categoryLabels: Record<Category, string> = {
      all: 'Kenyan Fine Art',
      soapstone: 'Kisii Soapstone',
      beadwork: 'Maasai Beadwork',
      woodcarving: 'Ebony Woodcraft',
      baskets: 'Handwoven Baskets',
      glass: 'Recycled Glass',
      batik: 'Swahili Canvas Batik',
    };

    const newArtwork: Artwork = {
      id: `art-ke-${Date.now()}`,
      title: prodTitle.trim(),
      kiswahiliTitle: prodKiswahiliTitle.trim() || prodTitle.trim(),
      category: prodCategory,
      categoryLabel: categoryLabels[prodCategory] || 'Kenyan Handcrafted Art',
      priceUSD: Number(prodPriceUSD),
      image: prodImage,
      additionalImages: [prodImage, beadCraftImg],
      region: prodRegion || selectedArtisan.location,
      artisan: selectedArtisan,
      description: prodDescription.trim() || `An authentic handcrafted Kenyan ${prodCategory} artwork created by ${selectedArtisan.name} utilizing traditional techniques and locally sourced sustainable materials.`,
      provenance: `Directly sourced from ${selectedArtisan.coopName} in ${prodRegion || selectedArtisan.location} under Fair Trade standards.`,
      materials: prodMaterials.split(',').map((m) => m.trim()).filter(Boolean),
      dimensions: prodDimensions,
      weightKg: Number(prodWeightKg),
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: prodIsFeatured,
      inStock: true,
      certificateId: `KE-${prodCategory.toUpperCase().slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      craftedDays: Number(prodCraftedDays),
    };

    onAddArtwork(newArtwork);
    showToast(`New Kenyan Artwork "${newArtwork.title}" published to catalog!`);

    // Reset form & switch tab
    setProdTitle('');
    setProdKiswahiliTitle('');
    setProdDescription('');
    setActiveTab('products');
  };

  // Filtered artworks for management
  const filteredArtworks = artworks.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kiswahiliTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalCatalogValueUSD = artworks.reduce((sum, a) => sum + a.priceUSD, 0);
  const totalVendorsCount = Object.keys(artisans).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-60 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#00a859] text-white font-medium shadow-2xl border border-white/20 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-6xl bg-[#0f0f0f] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Admin Header */}
        <div className="bg-[#171717] px-6 py-5 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Sanaa Kenya Admin Portal
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00a859]/20 text-[#00a859] border border-[#00a859]/30 text-[10px] font-bold uppercase tracking-wider">
                  Live Merchant Mode
                </span>
              </div>
              <p className="text-xs text-white/50">
                Manage authentic Kenyan artisan vendors, handcrafted products, pricing, and fulfillment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetToDefaults}
              title="Reset sample catalog to original Kenyan collection"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#121212] border-b border-white/5 divide-x divide-white/5 text-center py-3 px-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">Artisan Vendors</span>
            <span className="font-serif text-lg font-bold text-white">{totalVendorsCount} Guilds</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">Active Products</span>
            <span className="font-serif text-lg font-bold text-[#c5a059]">{artworks.length} Artworks</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">Catalog Inventory Value</span>
            <span className="font-serif text-lg font-bold text-white">KSh {(totalCatalogValueUSD * 130).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">Kenya Delivery Fee</span>
            <span className="font-serif text-lg font-bold text-[#00a859]">From KSh 200</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#141414] px-6 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Artworks ({artworks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'vendors'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Artisan Vendors ({totalVendorsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('add-product')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'add-product'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#c5a059]" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('add-vendor')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'add-vendor'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#00a859]" />
            <span>Add New Vendor</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Kenya Delivery Rates</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PRODUCTS TABLE */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search title, artisan, region..."
                    className="w-full bg-[#171717] rounded-xl pl-9 pr-4 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#171717] rounded-xl px-3 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="all">All Categories</option>
                    <option value="soapstone">Kisii Soapstone</option>
                    <option value="beadwork">Maasai Beadwork</option>
                    <option value="woodcarving">Ebony Woodcraft</option>
                    <option value="baskets">Handwoven Baskets</option>
                    <option value="glass">Recycled Glass</option>
                    <option value="batik">Swahili Batik</option>
                  </select>

                  <button
                    onClick={() => setActiveTab('add-product')}
                    className="px-3.5 py-2 rounded-xl bg-[#c5a059] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#d6b268] transition-all whitespace-nowrap"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#121212]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-[#1a1a1a] text-white/50 uppercase text-[10px] tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Product & Artwork</th>
                        <th className="p-3.5">Artisan Vendor</th>
                        <th className="p-3.5">Category & Region</th>
                        <th className="p-3.5">Price (USD / KSh)</th>
                        <th className="p-3.5 text-center">Status</th>
                        <th className="p-3.5 text-center">Featured</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredArtworks.map((art) => (
                        <tr key={art.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.image}
                                alt={art.title}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-black"
                              />
                              <div>
                                <span className="font-bold text-white block">{art.title}</span>
                                <span className="text-[10px] text-[#c5a059] italic">{art.kiswahiliTitle}</span>
                                <span className="text-[10px] text-white/40 block font-mono">ID: {art.certificateId}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <img
                                src={art.artisan.avatar}
                                alt={art.artisan.name}
                                referrerPolicy="no-referrer"
                                className="w-6 h-6 rounded-full object-cover border border-white/20"
                              />
                              <div>
                                <span className="text-white font-medium block">{art.artisan.name}</span>
                                <span className="text-[10px] text-white/40">{art.artisan.coopName}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px] uppercase font-bold inline-block mb-1">
                              {art.categoryLabel}
                            </span>
                            <span className="text-[10px] text-white/50 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#c5a059]" />
                              {art.region}
                            </span>
                          </td>
                          <td className="p-3.5 font-medium">
                            <span className="text-white font-bold block">${art.priceUSD}</span>
                            <span className="text-[10px] text-[#00a859] font-mono">KSh {(art.priceUSD * 130).toLocaleString()}</span>
                          </td>
                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => onToggleStock(art.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                                art.inStock
                                  ? 'bg-[#00a859]/20 text-[#00a859] border border-[#00a859]/30 hover:bg-[#00a859]/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                              }`}
                            >
                              {art.inStock ? 'In Stock' : 'Sold Out'}
                            </button>
                          </td>
                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => onToggleFeatured(art.id)}
                              className={`p-1.5 rounded-xl border transition-all ${
                                art.isFeatured
                                  ? 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/30'
                                  : 'bg-white/5 text-white/30 border-white/10 hover:text-white'
                              }`}
                              title={art.isFeatured ? 'Featured on 3D Coverflow' : 'Click to Feature'}
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove "${art.title}" from catalog?`)) {
                                  onDeleteArtwork(art.id);
                                  showToast(`Artwork "${art.title}" deleted.`);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VENDORS / ARTISANS TABLE */}
          {activeTab === 'vendors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Kenyan Artisan Vendors</h3>
                  <p className="text-xs text-white/50">Verified indigenous craft cooperatives, guilds, and individual masters across Kenya.</p>
                </div>
                <button
                  onClick={() => setActiveTab('add-vendor')}
                  className="px-3.5 py-2 rounded-xl bg-[#00a859] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#00924c] transition-all"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Vendor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Object.values(artisans) as Artisan[]).map((vendor: Artisan) => {
                  const vendorProducts = artworks.filter((a) => a.artisan.id === vendor.id);
                  return (
                    <div
                      key={vendor.id}
                      className="bg-[#141414] rounded-2xl border border-white/10 p-5 space-y-4 flex flex-col justify-between hover:border-[#c5a059]/40 transition-all shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={vendor.avatar}
                            alt={vendor.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#c5a059]/40 shadow-md bg-black"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-serif font-bold text-sm text-white truncate">{vendor.name}</h4>
                              <CheckCircle2 className="w-4 h-4 text-[#00a859] shrink-0" />
                            </div>
                            <p className="text-[11px] text-[#c5a059] font-medium truncate">{vendor.coopName}</p>
                            <p className="text-[10px] text-white/50 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-white/40" />
                              {vendor.location}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
                          {vendor.bio}
                        </p>

                        <div className="flex items-center justify-between text-[11px] bg-[#1c1c1c] p-2.5 rounded-xl border border-white/5">
                          <span className="text-white/60">Specialization:</span>
                          <span className="font-bold text-white">{vendor.craftType}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-white/50">
                          <strong className="text-[#c5a059]">{vendorProducts.length}</strong> Products Listed
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (confirm(`Remove vendor "${vendor.name}"? Note: Their products will remain associated with their name.`)) {
                                onDeleteArtisan(vendor.id);
                                showToast(`Vendor "${vendor.name}" removed.`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete Vendor"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW PRODUCT FORM */}
          {activeTab === 'add-product' && (
            <form onSubmit={handleCreateProduct} className="max-w-4xl mx-auto space-y-6 bg-[#141414] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">Artisan Marketplace</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Publish New Handcrafted Artwork</h3>
                <p className="text-xs text-white/50">Add authentic Kenyan art to the live catalog with cultural origin details.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title & Kiswahili Title */}
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Artwork Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    placeholder="e.g. Serengeti Sunrise Sentinel Giraffe"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Kiswahili Cultural Title</label>
                  <input
                    type="text"
                    value={prodKiswahiliTitle}
                    onChange={(e) => setProdKiswahiliTitle(e.target.value)}
                    placeholder="e.g. Twiga Wa Mbinguni"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Artisan Vendor Selection */}
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Artisan Vendor *</label>
                  <select
                    value={prodArtisanId}
                    onChange={(e) => {
                      setProdArtisanId(e.target.value);
                      const art = artisans[e.target.value];
                      if (art) setProdRegion(art.location);
                    }}
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    {(Object.values(artisans) as Artisan[]).map((art: Artisan) => (
                      <option key={art.id} value={art.id}>
                        {art.name} ({art.coopName} - {art.location})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Craft Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as Category)}
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="soapstone">Kisii Soapstone</option>
                    <option value="beadwork">Maasai Beadwork</option>
                    <option value="woodcarving">Ebony & Olive Woodcraft</option>
                    <option value="baskets">Handwoven Sisal Kiondo Baskets</option>
                    <option value="glass">Recycled Blown Glass</option>
                    <option value="batik">Swahili Canvas Batik</option>
                  </select>
                </div>

                {/* Price USD & Live KSh */}
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">
                    Price in USD * (Live: <span className="text-[#00a859]">KSh {(prodPriceUSD * 130).toLocaleString()}</span>)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs font-bold">$</span>
                    <input
                      type="number"
                      required
                      min={5}
                      max={10000}
                      value={prodPriceUSD}
                      onChange={(e) => setProdPriceUSD(Number(e.target.value))}
                      className="w-full bg-[#1b1b1b] rounded-xl pl-8 pr-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                {/* Region / County */}
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">County / Origin Region</label>
                  <input
                    type="text"
                    value={prodRegion}
                    onChange={(e) => setProdRegion(e.target.value)}
                    placeholder="e.g. Wamunyu, Machakos County"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Product Image Selector & Upload */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#1b1b1b] border border-white/5">
                <label className="text-xs font-bold text-white block">Artwork Photograph / Imagery *</label>
                
                {/* Preset Authentic Images */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-white/50">Select an authentic Kenyan craft preset photo:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { img: kisiiCraftImg, label: 'Kisii Soapstone' },
                      { img: maasaiCraftImg, label: 'Maasai Beads' },
                      { img: ebonyCraftImg, label: 'Ebony Wood' },
                      { img: kiondoCraftImg, label: 'Sisal Kiondo' },
                      { img: glassCraftImg, label: 'Kitengela Glass' },
                      { img: batikCraftImg, label: 'Swahili Batik' },
                      { img: beadCraftImg, label: 'Artisan Hands' },
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProdImage(preset.img)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all shrink-0 w-16 h-16 ${
                          prodImage === preset.img ? 'border-[#c5a059] scale-105 shadow-md shadow-[#c5a059]/30' : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.img} alt={preset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-[11px] text-white/60 block mb-1">Or paste custom image URL:</span>
                    <input
                      type="url"
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#121212] rounded-xl px-3 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-white/60 block mb-1">Or upload image file from device:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'product')}
                      className="w-full text-xs text-white/60 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#c5a059] file:text-black hover:file:bg-[#d6b268] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preview */}
                {prodImage && (
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={prodImage}
                      alt="Selected preview"
                      className="w-16 h-16 rounded-xl object-cover border border-[#c5a059]/40 bg-black"
                    />
                    <span className="text-xs text-[#00a859] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Image selected & ready for preview
                    </span>
                  </div>
                )}
              </div>

              {/* Description & Materials */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Description & Cultural Narrative</label>
                  <textarea
                    rows={3}
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    placeholder="Describe the story, craftsmanship techniques, and cultural symbolism..."
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-white/80 block mb-1.5">Materials (comma separated)</label>
                    <input
                      type="text"
                      value={prodMaterials}
                      onChange={(e) => setProdMaterials(e.target.value)}
                      placeholder="e.g. Mpingo Hardwood, Macassar Oil"
                      className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white/80 block mb-1.5">Dimensions</label>
                    <input
                      type="text"
                      value={prodDimensions}
                      onChange={(e) => setProdDimensions(e.target.value)}
                      placeholder="e.g. 45cm (H) x 18cm (W)"
                      className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white/80 block mb-1.5">Days to Handcraft</label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={prodCraftedDays}
                      onChange={(e) => setProdCraftedDays(Number(e.target.value))}
                      className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles & Submit */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsFeatured}
                    onChange={(e) => setProdIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#c5a059]"
                  />
                  <span className="text-xs font-medium text-white">Feature in 3D Coverflow Showcase</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d6b268] text-black text-xs font-bold tracking-wide shadow-lg shadow-[#c5a059]/20 transition-all"
                  >
                    Publish Artwork to Sanaa Kenya
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: ADD NEW VENDOR FORM */}
          {activeTab === 'add-vendor' && (
            <form onSubmit={handleCreateVendor} className="max-w-4xl mx-auto space-y-6 bg-[#141414] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a859]">Vendor Onboarding</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Register New Kenyan Artisan Guild / Master</h3>
                <p className="text-xs text-white/50">Empower indigenous artists and connect their workshop directly with collectors.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Artisan / Vendor Full Name *</label>
                  <input
                    type="text"
                    required
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="e.g. Mama Grace Atieno"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Cooperative / Studio Name</label>
                  <input
                    type="text"
                    value={vendorCoop}
                    onChange={(e) => setVendorCoop(e.target.value)}
                    placeholder="e.g. Kisumu Lakeside Clay & Weavers Co-op"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Kenyan County & Town *</label>
                  <input
                    type="text"
                    required
                    value={vendorLocation}
                    onChange={(e) => setVendorLocation(e.target.value)}
                    placeholder="e.g. Voi, Taita Taveta County"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Craft Specialization *</label>
                  <input
                    type="text"
                    required
                    value={vendorCraftType}
                    onChange={(e) => setVendorCraftType(e.target.value)}
                    placeholder="e.g. Handwoven Sisal Kiondo Baskets"
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">Years of Master Experience</label>
                  <input
                    type="number"
                    min={1}
                    max={70}
                    value={vendorExperience}
                    onChange={(e) => setVendorExperience(Number(e.target.value))}
                    className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/80 block mb-1.5">M-PESA Registered Phone (Disbursements)</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#00a859]" />
                    <input
                      type="tel"
                      value={vendorPhone}
                      onChange={(e) => setVendorPhone(e.target.value)}
                      placeholder="07XX XXX XXX"
                      className="w-full bg-[#1b1b1b] rounded-xl pl-9 pr-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                    />
                  </div>
                </div>
              </div>

              {/* Vendor Avatar Selector (Authentic Kenyan Faces) */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#1b1b1b] border border-white/5">
                <label className="text-xs font-bold text-white block">Artisan Portrait with Face *</label>
                
                <div className="space-y-1.5">
                  <span className="text-[11px] text-white/50">Select authentic Kenyan artisan face portrait:</span>
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { img: maasaiAvatar, label: 'Maasai Artisan' },
                      { img: woodcarverAvatar, label: 'Akamba Woodcarver' },
                      { img: soapstoneAvatar, label: 'Kisii Sculptor' },
                      { img: sisalAvatar, label: 'Taita Weaver' },
                      { img: swahiliAvatar, label: 'Swahili Artist' },
                      { img: glassAvatar, label: 'Kitengela Glassblower' },
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setVendorAvatar(preset.img)}
                        className={`relative rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-16 h-16 ${
                          vendorAvatar === preset.img ? 'border-[#00a859] scale-105 shadow-lg shadow-[#00a859]/30' : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.img} alt={preset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-[11px] text-white/60 block mb-1">Or paste custom portrait URL:</span>
                    <input
                      type="url"
                      value={vendorAvatar}
                      onChange={(e) => setVendorAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#121212] rounded-xl px-3 py-2 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-white/60 block mb-1">Or upload portrait photo:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'vendor')}
                      className="w-full text-xs text-white/60 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#00a859] file:text-white hover:file:bg-[#00924c] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preview */}
                {vendorAvatar && (
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={vendorAvatar}
                      alt="Selected portrait"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#00a859]/50 bg-black"
                    />
                    <div>
                      <span className="text-xs text-[#00a859] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Authentic Artisan Portrait Verified
                      </span>
                      <span className="text-[11px] text-white/50">Face portrait ready for storytelling profile</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio & Story */}
              <div>
                <label className="text-xs font-bold text-white/80 block mb-1.5">Artisan Biography & Craft Heritage Story</label>
                <textarea
                  rows={3}
                  value={vendorBio}
                  onChange={(e) => setVendorBio(e.target.value)}
                  placeholder="Tell the story of how this master artisan learned their craft, materials used, and community impact..."
                  className="w-full bg-[#1b1b1b] rounded-xl px-4 py-2.5 text-xs border border-white/10 text-white focus:outline-none focus:border-[#00a859]"
                />
              </div>

              {/* Verified & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vendorIsVerified}
                    onChange={(e) => setVendorIsVerified(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#00a859]"
                  />
                  <span className="text-xs font-medium text-white flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#00a859]" />
                    Fair Trade Certified Authentic Kenyan Artisan
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('vendors')}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00a859] hover:bg-[#00924c] text-white text-xs font-bold tracking-wide shadow-lg shadow-[#00a859]/20 transition-all"
                  >
                    Register Kenyan Vendor
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 5: KENYA DELIVERY RATES */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#00a859]">Logistics Management</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Kenya Regional Delivery Fee Structure</h3>
                <p className="text-xs text-white/50">Active courier and direct dispatch tariffs integrated with M-PESA checkout.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {KENYA_DELIVERY_REGIONS.map((region) => (
                  <div
                    key={region.key}
                    className="bg-[#141414] rounded-2xl border border-white/10 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-white">{region.label}</h4>
                      <span className="px-3 py-1 rounded-full bg-[#00a859]/20 text-[#00a859] font-mono font-bold text-xs border border-[#00a859]/30">
                        KSh {region.feeKsh}
                      </span>
                    </div>

                    <p className="text-xs text-white/60">
                      <strong>Coverage:</strong> {region.countiesSample}
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                      <span>Delivery Timeframe:</span>
                      <span className="text-white font-medium">{region.estimatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
