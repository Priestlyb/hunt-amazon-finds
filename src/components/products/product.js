// Product.js
import React from 'react';
import ReadMore from './readmore';
import Titlereadmore from './titlereadmore';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './products.css'; // make sure it includes skeleton styles

const Product = ({ product }) => {
  // If `product` is null or undefined, render loading skeleton
  if (!product) {
    return (
      <div className="card skeleton-card">
        <div className="card-header skeleton-box" />
        <div className="card-img skeleton-box" />
        <div className="card_info">
          <div className="card-info">
            <div className="skeleton-box title-skeleton" />
            <div className="skeleton-box text-skeleton" />
            <div className="skeleton-box text-skeleton" />
          </div>
          <div className="card-footer">
            <div className="card-button skeleton-box" />
          </div>
        </div>
      </div>
    );
  }

  const { title, category, description, image, link, brand } = product;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">{category}</span>
      </div>

      <div className="card-img">
        <LazyLoadImage
          src={image}
          alt={title}
          width="100%"
          height="100px"
          effect="blur"
        />
      </div>

      <div className='card_info'>
        <div className="card-info">
          <h2 className="text-title"><Titlereadmore content={title} /></h2>
          <p className="text-body"><strong>Brand:</strong> {brand}</p>
          <p className="text-body"><ReadMore content={description} /></p>
        </div>

        <div className="card-footer">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="card-button">
              {/* SVG icon */}
              <svg className="svg-icon" viewBox="0 0 20 20">...</svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
