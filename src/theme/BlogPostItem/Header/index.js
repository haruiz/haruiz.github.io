import React from 'react';
import BlogPostItemHeaderTitle from './Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
// import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
export default function BlogPostItemHeader() {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      {/*<BlogPostItemHeaderAuthors />*/}
    </header>
  );
}
