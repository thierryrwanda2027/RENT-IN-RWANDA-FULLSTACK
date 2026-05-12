import React from 'react';
import styles from './HeaderImages.module.css';

const images = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
];

export const HeaderImages: React.FC = () => (
  <div className={styles.container}>
    <img src={images[0]} alt="Header Banner" className={styles.image} />
  </div>
);
