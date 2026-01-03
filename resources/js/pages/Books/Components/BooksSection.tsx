import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Threshold for switching between grid and slider view
export const BOOKS_THRESHOLD = 4;

interface Book {
  id: number;
  title: string;
  author?: string;
  cover_image?: string;
  summary?: string;
  review?: string;
  highlights?: string;
  is_recommended?: boolean;
  price?: string;
}

interface BooksSectionSettings {
  section_title?: string;
  section_subtitle?: string;
  section_description?: string;
}

interface BooksSectionProps {
  books?: Book[];
  settings?: BooksSectionSettings;
  title?: string;
  subtitle?: string;
  showNavigation?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const BooksSection = ({
  books = [],
  settings,
  title,
  subtitle,
  showNavigation = true,
  autoplay = true,
  autoplayDelay = 3000,
}: BooksSectionProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  // Default fallback books
  const defaultBooks: Book[] = [
    { id: 1, cover_image: "/assets/books/recommended_book1.png", title: "Recommended Book 1" },
    { id: 2, cover_image: "/assets/books/recommended_book2.png", title: "Recommended Book 2" },
    { id: 3, cover_image: "/assets/books/recommended_book3.png", title: "Recommended Book 3" },
    { id: 4, cover_image: "/assets/books/recommended_book4.png", title: "Recommended Book 4" },
    { id: 5, cover_image: "/assets/books/recommended_book5.png", title: "Recommended Book 5" },
  ];

  const displayBooks = books.length > 0 ? books : defaultBooks;
  // Show slider when more than threshold (>4 books = slider)
  const shouldUseSlider = displayBooks.length > BOOKS_THRESHOLD;

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const sectionTitle = title || settings?.section_title || "Our Books";
  const sectionSubtitle = subtitle || settings?.section_subtitle;

  // Book card component for reuse
  const BookCard = ({ book, index }: { book: Book; index: number }) => (
    <div
      className="p-6 md:p-10 lg:p-14 bg-slate-100 border border-slate-300 cursor-pointer hover:bg-slate-200 transition-colors h-full flex items-center justify-center"
      onClick={() => handleBookClick(book)}
    >
      <img
        src={book.cover_image || "/assets/books/default.png"}
        alt={book.title || "Book cover"}
        className="w-full h-auto object-contain max-h-64 md:max-h-80"
      />
    </div>
  );

  return (
    <div className="bg-white py-12 md:py-18">
      <div className="w-11/12 lg:w-10/12 mx-auto">
        {/* Section Header */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 text-center mb-6 md:mb-12">
          {sectionTitle}
        </h1>
        {sectionSubtitle && (
          <p className="text-slate-600 text-center mb-6 md:mb-8 text-base md:text-lg">
            {sectionSubtitle}
          </p>
        )}

        {shouldUseSlider ? (
          // Slider view for more than 4 books with Swiper.js
          <div className="relative px-8 md:px-12 lg:px-16">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              loop={displayBooks.length > 4}
              autoplay={autoplay ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              } : false}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="books-swiper pb-12"
            >
              {displayBooks.map((book, index) => (
                <SwiperSlide key={book.id || index}>
                  <BookCard book={book} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {showNavigation && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-slate-100 rounded-full w-10 h-10 md:w-12 md:h-12"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-slate-100 rounded-full w-10 h-10 md:w-12 md:h-12"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
              </>
            )}
          </div>
        ) : (
          // Grid view for 4 or fewer books
          <div className={`grid gap-4 md:gap-6 ${
            displayBooks.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : displayBooks.length === 2 
                ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' 
                : displayBooks.length === 3 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {displayBooks.map((book, index) => (
              <BookCard key={book.id || index} book={book} index={index} />
            ))}
          </div>
        )}
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

                {selectedBook.highlights && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Highlights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedBook.highlights}
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

      {/* Custom Swiper styles */}
      <style>{`
        .books-swiper .swiper-pagination-bullet {
          background: #64748b;
          opacity: 0.5;
        }
        .books-swiper .swiper-pagination-bullet-active {
          background: #0f172a;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default BooksSection;
export { BooksSection };
