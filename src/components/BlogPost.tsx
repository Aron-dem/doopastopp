import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from './Header';
import { BLOG_POSTS } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title[lang]} | Dopastopp`;
      window.scrollTo(0, 0);
    }
  }, [post, lang]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center stars-bg text-white">
        <Header showLogo={true} />
        <div className="text-center flex-1 flex items-center justify-center">
          <div>
            <h1 className="text-4xl font-black mb-4">404</h1>
            <p className="mb-8">{t('المقال غير موجود', 'Post not found')}</p>
            <button onClick={() => navigate('/blog')} className="text-purple-400 font-bold underline">
              {t('العودة للمدونة', 'Back to Blog')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 stars-bg flex flex-col" style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 40%, #0f1a2e 100%)' }}>
      <Header showLogo={true} />
      
      {/* Cover Image */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title[lang]} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A1E] to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {post.date}
            </span>
            <span className="text-gray-300 text-xs font-medium">{post.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {post.title[lang]}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 flex-1">
        <button 
          onClick={() => navigate('/blog')}
          className="mb-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          {lang === 'ar' ? '← العودة للمدونة' : '← Back to Blog'}
        </button>

        <article className={`prose prose-invert prose-purple max-w-none ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
          <div className="glass rounded-[2rem] p-8 md:p-12 border border-white/5">
            <ReactMarkdown>{post.content[lang]}</ReactMarkdown>
          </div>
        </article>

        {/* Share Section */}
        <div className="mt-12 p-8 glass rounded-2xl border border-purple-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            {t('شارك هذا المقال مع أصدقائك', 'Share this article with your friends')}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {t('ساعد في نشر الوعي حول العافية الرقمية.', 'Help spread awareness about digital wellness.')}
          </p>
          <button 
            onClick={() => {
              const shareText = `${post.title[lang]} - Dopastopp Blog`;
              if (navigator.share) {
                navigator.share({ title: shareText, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(t('تم نسخ الرابط!', 'Link copied!'));
              }
            }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            {t('شارك', 'Share')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
