import React, { useState } from 'react';
import { Save, Plus, Trash2, Upload, Image } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useBranding } from '@/contexts/BrandingContext';

interface Category {
  id: string;
  name: string;
  description: string;
  prizePool: number;
  maxCompetitors: number;
}

interface BrandingSettings {
  logoFile: File | null;
}

export default function PlatformSettings() {
  const { getThemeColor } = useTheme();
  const { logo, setLogo } = useBranding();
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: "Men's Bodybuilding",
      description: "Open division for male bodybuilders",
      prizePool: 25000,
      maxCompetitors: 50
    },
    {
      id: '2',
      name: "Women's Bikini",
      description: "Bikini division for female competitors",
      prizePool: 25000,
      maxCompetitors: 50
    },
    {
      id: '3',
      name: "Men's Physique",
      description: "Men's physique and aesthetics division",
      prizePool: 25000,
      maxCompetitors: 50
    }
  ]);

  const [branding, setBranding] = useState<BrandingSettings>({
    logoFile: null
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a FileReader to convert the file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Save the base64 string to localStorage and context
        setLogo(base64String);
        setBranding({
          logoFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setBranding({
      logoFile: null
    });
  };

  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    description: '',
    prizePool: 0,
    maxCompetitors: 0
  });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategory.name,
          description: newCategory.description,
          prizePool: newCategory.prizePool || 0,
          maxCompetitors: newCategory.maxCompetitors || 0
        }
      ]);
      setNewCategory({
        name: '',
        description: '',
        prizePool: 0,
        maxCompetitors: 0
      });
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', { categories, branding });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Branding Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Logo
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Recommended size: 64px height, auto width)
              </span>
            </label>
            
            <div className="mt-2 flex items-start space-x-6">
              <div className="flex-shrink-0">
                {logo ? (
                  <div className="relative">
                    <img
                      src={logo}
                      alt="Platform logo"
                      className="h-16 w-auto object-contain"
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="h-16 w-32 flex items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <label className="relative cursor-pointer bg-white rounded-lg border border-gray-300 hover:border-purple-500 transition-colors flex items-center justify-center p-4">
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-purple-600">
                      {logo ? 'Change logo' : 'Upload logo'}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, GIF up to 2MB
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Competition Categories</h3>
        
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{category.name}</h4>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                <div className="mt-2 flex gap-4 text-sm text-gray-600">
                  <span>Prize Pool: ${category.prizePool.toLocaleString()}</span>
                  <span>Max Competitors: {category.maxCompetitors}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-900 mb-4">Add New Category</h4>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="number"
                placeholder="Prize Pool"
                value={newCategory.prizePool || ''}
                onChange={(e) => setNewCategory({ ...newCategory, prizePool: parseInt(e.target.value) })}
                className="rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="number"
                placeholder="Max Competitors"
                value={newCategory.maxCompetitors || ''}
                onChange={(e) => setNewCategory({ ...newCategory, maxCompetitors: parseInt(e.target.value) })}
                className="rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <button
              onClick={handleAddCategory}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}