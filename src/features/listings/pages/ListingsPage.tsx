import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { List } from '../../../shared/components/List';
import { HeaderImages } from '../components/HeaderImages';
import { SearchBar } from '../components/SearchBar';
import { SavedBadge } from '../components/SavedBadge';
import { useStore } from '../../../store/StoreContext';
import { useListings } from '../hooks/useListings';
import { useFavorites } from '../hooks/useFavorites';
import type { Listing } from '../types';
import { Card } from '../components/Card';
import { SavedListings } from '../components/SavedListings';
import { Spinner } from '../../../shared/components/Spinner';
import './ListingsPage.css';

export const ListingsPage = () => {
  const { listings, isLoading, isError, isFetching, refetch } = useListings();
  const { isSaved, count: savedCount } = useFavorites();
  const { state, dispatch } = useStore();
  const { filter } = state;
  const [savedOnly, setSavedOnly] = useState(false);

  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Homes');


  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesQuery =
        listing.title.toLowerCase().includes(filter.toLowerCase()) ||
        listing.location.toLowerCase().includes(filter.toLowerCase());
      const matchesSaved = savedOnly ? isSaved(listing.id) : true;
      return matchesQuery && matchesSaved;
    });
  }, [listings, filter, savedOnly, isSaved]);


  return (
    <div className="airbnb-layout">
      <HeaderImages />
      {/* Main Navigation Tabs */}
      <div className="main-tabs-wrapper">
        <div className="container">
          <div className="main-tabs">
            <button 
              className={clsx('main-tab', { active: activeCategory === 'Homes' })} 
              onClick={() => setActiveCategory('Homes')}
            >
              <div className="tab-icon-wrapper">
                <img src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=100&h=100&q=80" alt="" width="28" height="28" style={{ borderRadius: '4px' }} />
              </div>
              <span>Homes</span>
            </button>
            <button 
              className={clsx('main-tab', { active: activeCategory === 'Experiences' })} 
              onClick={() => setActiveCategory('Experiences')}
            >
              <div className="tab-icon-wrapper">
                <img src="https://images.unsplash.com/photo-1533553932610-950834d82b71?auto=format&fit=crop&w=100&h=100&q=80" alt="" width="28" height="28" style={{ borderRadius: '4px' }} />
                <span className="tab-badge">NEW</span>
              </div>
              <span>Experiences</span>
            </button>
            <button 
              className={clsx('main-tab', { active: activeCategory === 'Services' })} 
              onClick={() => setActiveCategory('Services')}
            >
              <div className="tab-icon-wrapper">
                <img src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=100&h=100&q=80" alt="" width="28" height="28" style={{ borderRadius: '4px' }} />
                <span className="tab-badge">NEW</span>
              </div>
              <span>Services</span>
            </button>
          </div>
        </div>
      </div>


      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          
          <SearchBar 
            value={filter} 
            onChange={(val) => dispatch({ type: 'SET_FILTER', payload: val })} 
          />

          <div className="section-header">
            <div className="section-header-top">
              <h2>Popular homes in Kigali</h2>
              <div className="section-header-actions">
                <button 
                  className="reset-btn" 
                  onClick={() => {
                    dispatch({ type: 'RESET' });
                    setSavedOnly(false);
                  }}
                >
                  Clear All
                </button>
                <span className="results-count">{filteredListings.length} results</span>
                <label className="saved-only-toggle">
                  <input type="checkbox" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} />
                  Saved Only
                </label>
                <div onClick={() => setIsSavedPanelOpen(true)} className="badge-trigger">
                  <SavedBadge count={savedCount} variant="light" />
                </div>
              </div>
            </div>
            {isFetching && <span className="refreshing-indicator">Refreshing...</span>}
          </div>

          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <div className="error-state">
              <h3>Something went wrong</h3>
              <p>We couldn't load the listings. Please try again.</p>
              <button onClick={() => refetch()} className="retry-button">Retry</button>
            </div>
          ) : (
            <List<Listing>
              items={filteredListings}
              className="listings-grid"
              keyExtractor={(l) => l.id}
              emptyMessage="No exact matches found. Try changing your filters."
              renderItem={(l) => (
                <Link key={l.id} to={`/listings/${l.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card listing={l}>
                    <Card.Image />
                    <Card.Badge />
                    <div className="card-info">
                      <div className="card-info-header">
                        <Card.Title />
                        <Card.Rating />
                      </div>
                      <Card.Location />
                      <Card.Price />
                    </div>
                  </Card>
                </Link>
              )}
            />
          )}
          
        </div>
      </main>

      {/* Footer */}
      <footer className="airbnb-footer">
        <div className="container">
          <div className="footer-links">
            <div className="footer-col">
              <h3>Support</h3>
              <a href="#">Help Center</a>
              <a href="#">AirCover</a>
              <a href="#">Anti-discrimination</a>
            </div>
            <div className="footer-col">
              <h3>Hosting</h3>
              <a href="#">THIERRY your home</a>
              <a href="#">AirCover for Hosts</a>
              <a href="#">Hosting resources</a>
            </div>
            <div className="footer-col">
              <h3>THIERRY BNB</h3>
              <a href="#">Newsroom</a>
              <a href="#">New features</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
      </footer>

      <SavedListings 
        isOpen={isSavedPanelOpen} 
        onClose={() => setIsSavedPanelOpen(false)} 
      />
    </div>
  );
};
