import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { platform: 'Instagram', url: 'https://instagram.com', icon: <Instagram className="w-5 h-5" /> },
  { platform: 'Twitter', url: 'https://twitter.com', icon: <Twitter className="w-5 h-5" /> },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
  { platform: 'YouTube', url: 'https://youtube.com', icon: <Youtube className="w-5 h-5" /> },
  { platform: 'Facebook', url: 'https://facebook.com', icon: <Facebook className="w-5 h-5" /> },
  { 
    platform: 'TikTok', 
    url: 'https://tiktok.com', 
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="w-5 h-5"
        fill="currentColor"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    )
  }
];

export default function Footer() {
  const { getThemeColor } = useTheme();

  return (
    <>
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Showcase Your Fitness Journey?
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto mb-8">
            Join our platform as a competitor or promoter and be part of the next big fitness competition.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register/competitor"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Register as Competitor
            </Link>
            <Link
              to="/register/promoter"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Become a Promoter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900">FitStage.io</h2>
              <p className="mt-4 text-gray-600">
                The premier platform for fitness competitions and athlete showcases.
              </p>
              <div className="flex gap-4 mt-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/competitions" className="text-gray-600 hover:text-purple-600">
                    Competitions
                  </Link>
                </li>
                <li>
                  <Link to="/voting" className="text-gray-600 hover:text-purple-600">
                    Vote
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-600 hover:text-purple-600">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-gray-600 hover:text-purple-600">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-purple-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-purple-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/rules" className="text-gray-600 hover:text-purple-600">
                    Competition Rules
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-purple-600">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-center">
              © {new Date().getFullYear()} FitStage.io. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}