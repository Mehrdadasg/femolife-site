import React from "react";
import OtherBlog from "./OtherBlog";
import Comment from "./Comment";
import Rate from "./Rate";
import DOMPurify from "isomorphic-dompurify";
import { getLocale } from "next-intl/server";

async function BlogContent({ blog }: { blog: any }) {
  const locale = await getLocale();
  const cleanHtml = DOMPurify.sanitize(blog?.Content?.Text);

  return (
    <section className="max-w-4xl mx-auto mt-10">
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
      <Rate />
      <Comment />
      <OtherBlog slug={blog?.Content?.Slug} locale={locale} />
    </section>
  );
}

export default BlogContent;
