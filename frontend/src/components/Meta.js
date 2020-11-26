import React from 'react';
import { Helmet } from 'react-helmet';


const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keyword' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Ecom',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics, ecom, bangladesh ecommerce, bd ecommerce, ecom shop'
}

export default Meta;
