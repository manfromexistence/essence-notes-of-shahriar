import React from "react";

const Review = ({ books = [], settings }) => {
  const book = books[0];

  return (
    <div className="py-18" style={{ backgroundColor: settings?.review_bg_color || '#2E5AFF' }}>
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h1 className="text-5xl font-semibold text-white text-center mb-8">
          {settings?.review_section_title || "Review"}
        </h1>
        <div className="mb-12 relative">
          <p className="text-lg text-white text-center lg:w-3/4 mx-auto  relative z-10">
            {book?.review || settings?.review_default_text || "The Nightingale has easily found its way to one of my favorite books to recommend. Although some may feel daunted by the over 300 page book, it is worth every page. The characters are well written and relatable. Isabelle is definitely one of my all time favorite heroes."}
          </p>
          <div className="absolute -top-8 z-0 hidden lg:block">
            <img src={settings?.review_quotation_icon || "/assets/books/colon.svg"} alt="" />
          </div>
        </div>

        {book?.author && (
          <>
            <div className="flex items-center justify-center mb-6">
              <img src={settings?.review_avatar_image || "/assets/books/review.png"} alt="Reviewer" />
            </div>
            <h3 className="text-white font-semibold text-2xl text-center mb-2">
              {book.author}
            </h3>
            <p className="text-slate-200 mb-2 text-center">Author</p>
          </>
        )}
        {!book?.author && (
          <>
            <div className="flex items-center justify-center mb-6">
              <img src={settings?.review_avatar_image || "/assets/books/review.png"} alt="Reviewer" />
            </div>
            <h3 className="text-white font-semibold text-2xl text-center mb-2">
              {settings?.review_default_author_name || "Shah Alam Chowdhury"}
            </h3>
            <p className="text-slate-200 mb-2 text-center">{settings?.review_default_author_title || "Managing Director"}</p>
            <p className="text-slate-200 mb-2 text-center">{settings?.review_default_author_company || "AB Company"}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
