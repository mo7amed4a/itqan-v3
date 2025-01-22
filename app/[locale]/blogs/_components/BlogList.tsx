"use client";
import CardBlog, { BlogItemType } from "@/components/cards/CardBlog";
// import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const BlogList = ({ posts, blogLang }: { posts: any, blogLang: any}) => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const postsPerPage = 10;  

  const visiblePosts = posts.slice(currentIndex, currentIndex + postsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(0);  
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex + postsPerPage < posts.length ? prevIndex + postsPerPage : 0
  //   );
  // };

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visiblePosts.map((item: BlogItemType) => (
          <div key={item.id}>
            <CardBlog
              key={item.id}
              blog={item}
              textBtn={blogLang.read_more}
            />
          </div>
        ))}
      </section>

      {/* {currentIndex + postsPerPage < posts.length && (
        <Button
          onClick={handleNext}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          {blogLang.show_more}
        </Button>
      )} */}
    </div>
  );
};

export default BlogList;
