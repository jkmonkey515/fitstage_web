import React, { useState } from 'react';
import { Save, Globe, Upload, Image, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useBranding } from '@/contexts/BrandingContext';
import { testDatabaseConnection } from '@/utils/testConnection';

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

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              const result = await testDatabaseConnection();
              if (result.success) {
                alert('Successfully connected to database and inserted test data!');
              } else {
                alert('Database connection test failed. Check console for details.');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Globe className="w-5 h-5" />
            Test Connection
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
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
                    onChange={(e) => {
                      const newLinks = settings.socialLinks.map(l =>
                        l.platform === link.platform ? { ...l, url: e.target.value } : l
                      );
                      setSettings(prev => ({ ...prev, socialLinks: newLinks }));
                    }}
                    placeholder={`${link.platform} URL`}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}