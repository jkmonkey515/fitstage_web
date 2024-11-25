import React, { useState } from 'react';
import { Save, Plus, Trash2, Upload, Image, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useBranding } from '@/contexts/BrandingContext';

interface Category {
  id: string;
  name: string;
  description: string;
  prizePool: number;
  maxCompetitors: number;
}

interface FooterLink {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface BrandingSettings {
  logoFile: File | null;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
  ctaText: {
    competitor: string;
    promoter: string;
  };
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
    }
  ]);

  const [settings, setSettings] = useState<BrandingSettings>({
    logoFile: null,
    footerLinks: [
      { id: '1', label: 'Competition Rules', url: '/rules', isExternal: false },
      { id: '2', label: 'FAQs', url: '/faq', isExternal: false },
      { id: '3', label: 'Contact Us', url: '/contact', isExternal: false },
      { id: '4', label: 'Privacy Policy', url: '/privacy', isExternal: false },
      { id: '5', label: 'Terms of Service', url: '/terms', isExternal: false }
    ],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'Twitter', url: 'https://twitter.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
      { platform: 'YouTube', url: 'https://youtube.com' },
      { platform: 'Facebook', url: 'https://facebook.com' }
    ],
    ctaText: {
      competitor: 'Register as Competitor',
      promoter: 'Become a Promoter'
    }
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogo(base64String);
        setSettings(prev => ({ ...prev, logoFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setSettings(prev => ({ ...prev, logoFile: null }));
  };

  const handleAddFooterLink = () => {
    const newLink: FooterLink = {
      id: Date.now().toString(),
      label: '',
      url: '',
      isExternal: false
    };
    setSettings(prev => ({
      ...prev,
      footerLinks: [...prev.footerLinks, newLink]
    }));
  };

  const handleRemoveFooterLink = (id: string) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: prev.footerLinks.filter(link => link.id !== id)
    }));
  };

  const handleUpdateFooterLink = (id: string, field: keyof FooterLink, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: prev.footerLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleUpdateSocialLink = (platform: string, url: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.platform === platform ? { ...link, url } : link
      )
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', { categories, settings });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
        
        <div className="space-y-6">
          {/* Logo Upload */}
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

          {/* Footer Links */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Footer Links</h4>
            <div className="space-y-4">
              {settings.footerLinks.map((link) => (
                <div key={link.id} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleUpdateFooterLink(link.id, 'label', e.target.value)}
                    placeholder="Link Label"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleUpdateFooterLink(link.id, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={link.isExternal}
                      onChange={(e) => handleUpdateFooterLink(link.id, 'isExternal', e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">External</span>
                  </label>
                  <button
                    onClick={() => handleRemoveFooterLink(link.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddFooterLink}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
              >
                <Plus className="w-5 h-5" />
                Add Link
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Social Media Links</h4>
            <div className="space-y-4">
              {settings.socialLinks.map((link) => (
                <div key={link.platform} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-gray-700">{link.platform}</div>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleUpdateSocialLink(link.platform, e.target.value)}
                    placeholder={`${link.platform} URL`}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Text */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Call to Action Text</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Competitor Button</label>
                <input
                  type="text"
                  value={settings.ctaText.competitor}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    ctaText: { ...prev.ctaText, competitor: e.target.value }
                  }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Promoter Button</label>
                <input
                  type="text"
                  value={settings.ctaText.promoter}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    ctaText: { ...prev.ctaText, promoter: e.target.value }
                  }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}