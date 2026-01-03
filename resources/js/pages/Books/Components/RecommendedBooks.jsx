import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const BOOKS_THRESHOLD = 4; // Show slider when more than 4 books

const RecommendedBooks = ({ books = [], settings }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Default fallback
  const defaultBooks = [
    { id: 1, cover_image: "/assets/books/recommended_book1.png", title: "Recommended Book" },
    { id: 2, cover_image: "/assets/books/recommended_book2.png", title: "Recommended Book" },
    { id: 3, cover_image: "/assets/books/recommended_book3.png", title: "Recommended Book" },
    { id: 4, cover_image: "/assets/books/recommended_book4.png", title: "Recommended Book" },
    { id: 5, cover_image: "/assets/books/recommended_book5.png", title: "Recommended Book" },
  ];

  const displayBooks = books.length > 0 ? books : defaultBooks;
  const shouldUseSlider = displayBooks.length > BOOKS_THRESHOLD;

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  // Book card component for reuse
  const BookCard = ({ book, index }) => (
    <div
      key={book.id || index}
      className="p-14 bg-slate-100 border border-slate-300 cursor-pointer hover:bg-slate-200 transition-colors h-full"
      onClick={() => handleBookClick(book)}
    >
      <img
        src={book.cover_image || "/assets/books/default.png"}
        alt={book.title || "Book cover"}
        className="w-full h-auto object-contain"
      />
    </div>
  );

  return (
    <div className="bg-white py-18">
      <div>
        <h1 className="text-5xl font-semibold text-slate-950 text-center mb-12">
          {settings?.recommended_books_title || "Recommended Books"}
        </h1>
        {settings?.recommended_books_subtitle && (
          <p className="text-slate-600 text-center mb-8 text-lg">
            {settings.recommended_books_subtitle}
          </p>
        )}

        {shouldUseSlider ? (
          // Slider view for more than 4 books
          <div className="px-16">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayBooks.map((book, index) => (
                  <CarouselItem
                    key={book.id || index}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <BookCard book={book} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-8 lg:-left-12" />
              <CarouselNext className="-right-8 lg:-right-12" />
            </Carousel>
          </div>
        ) : (
          // Grid view for 4 or fewer books
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {displayBooks.map((book, index) => (
              <BookCard key={book.id || index} book={book} index={index} />
            ))}
          </div>
        )}

        <div className="w-11/12 lg:w-9/12 mx-auto mt-18">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="lg:w-1/2 ">
              <h1 className="text-5xl font-semibold text-slate-950 mb-8">
                {books[0]?.title || "Publication Summary"}
              </h1>
              <p className="text-slate-950 text-lg mb-8">
                {books[0]?.summary || '"Chat GPT: Risk or Opportunity?" has been widely acclaimed for its insightful analysis of artificial intelligence\'s role in modern business. The book provides practical guidance for entrepreneurs and business leaders navigating the AI revolution.'}
              </p>
              {books[0]?.review && (
                <p className="text-slate-950 text-lg">
                  {books[0].review}
                </p>
              )}
              {!books[0]?.review && (
                <p className="text-slate-950 text-lg">
                  {settings?.recommended_books_description || "Through real-world examples and strategic frameworks, Shahriar Khan offers a balanced perspective on leveraging AI opportunities while managing associated risks, making it an essential read for anyone interested in the future of technology and business."}
                </p>
              )}
            </div>

            <div className="flex-1 flex items-center justify-end">
              <img src={books[0]?.cover_image || "/assets/books/publication_image.png"} alt={books[0]?.title || "Publication"} />
            </div>
          </div>
        </div>
      </div>

      {/* Book Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedBook.title || "Book Details"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Book Cover */}
                <div className="w-full flex justify-center">
                  <img
                    className="max-h-80 object-contain"
                    src={selectedBook.cover_image || "/assets/books/default.png"}
                    alt={selectedBook.title || "Book cover"}
                  />
                </div>

                {/* Book Details */}
                {selectedBook.author && (
                  <p className="text-muted-foreground">
                    <strong>Author:</strong> {selectedBook.author}
                  </p>
                )}

                {selectedBook.price && (
                  <p className="text-lg font-semibold text-blue-600">
                    Price: {selectedBook.price}
                  </p>
                )}

                {selectedBook.summary && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedBook.summary}
                    </p>
                  </div>
                )}

                {selectedBook.review && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Review</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedBook.review}
                    </p>
                  </div>
                )}

                {selectedBook.is_recommended && (
                  <Badge variant="default">Recommended</Badge>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecommendedBooks;
