"use client";
import { useState } from "react";

interface ShowMoreProps {
  text: string;
  readMore: string;
  readLess: string;
}

const ReadMoreLines: React.FC<ShowMoreProps> = ({ text ,readMore, readLess}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 100;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const displayedText = text;

  return (
    <div>
      <p
        className={`${isExpanded ? "" : "line-clamp-4"} text-start prose prose-h3:text-primary prose-h1:text-primary prose-h2:text-primary prose-h4:text-primary prose-h3:py-0`}
        dangerouslySetInnerHTML={{ __html: displayedText }}
      ></p>
      
      {/* <p>{!isExpanded && text.length > charLimit ? "..." : ""}</p> */}
      {text?.length > charLimit && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-primary hover:underline"
        >
          {isExpanded ? readLess : readMore}
        </button>
      )}
    </div>
  );
};

export default ReadMoreLines;
