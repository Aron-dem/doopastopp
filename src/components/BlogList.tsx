import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from './Header';
import { BLOG_POSTS } from '../data/blogPosts';

const BlogList: React.FC = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pb-16 px-6 md:px-12 stars-bg" style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 40%, #0f1a2e 100%)' }}>
      <Header showLogo={true} />
      <div className="max-w-6xl mx-auto flex-1">
        <header className="text-center mb-16 fade-in-up mt-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {t('المدونة التعليمية', 'Educational Blog')}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t(
              'مقالات علمية وعملية لمساعدتك على فهم ظاهرة تعفن الدماغ وكيفية استعادة تركيزك في العصر الرقمي.',
              'Scientific and practical articles to help you understand brain rot and how to reclaim your focus in the digital age.'
            )}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <article 
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="glass rounded-[2rem] overflow-hidden card-hover cursor-pointer flex flex-col fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title[lang]} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {post.date}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-xl font-black text-white mb-4 line-clamp-2">
                  {post.title[lang]}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.summary[lang]}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-purple-400 font-bold text-sm">
                    {t('اقرأ المزيد', 'Read More')} →
                  </span>
                  <span className="text-gray-500 text-xs">{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
