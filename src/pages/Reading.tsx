import { useEffect } from 'react';
import { usePageTimeTracking } from '@/hooks/useTimeTracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, Star, ExternalLink, BookMarked } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

type ShelfBook = {
  title: string;
  author: string;
  category: string;
  cover?: string;
  link: string;
  rating?: number;
  review?: string;
  linkLabel?: string;
  dateRead?: string;
};

const OL = (id: number) => `https://covers.openlibrary.org/b/id/${id}-M.jpg`;

const BookCover = ({ src, title, className }: { src?: string; title: string; className: string }) => {
  if (src) {
    return <img src={src} alt={title} className={`${className} object-cover rounded shadow-sm flex-shrink-0`} />;
  }
  return (
    <div className={`${className} rounded shadow-sm flex-shrink-0 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-800/40 flex items-center justify-center`}>
      <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
    </div>
  );
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mt-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
    ))}
  </div>
);

const categoryColors: Record<string, string> = {
  Fiction: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Philosophy: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Technology: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Leadership: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Personal Growth": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Poetry: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Humor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Biography: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
};

const CategoryBadge = ({ category }: { category: string }) => (
  <Badge variant="secondary" className={`text-xs shrink-0 ${categoryColors[category] ?? "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"}`}>
    {category}
  </Badge>
);

const Reading = () => {
  usePageTimeTracking('reading');

  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    };
    document.title = 'Reading List | Vinay Badhan';
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Books Vinay Badhan is reading or has read — spanning software engineering, leadership, AI, and personal growth.");
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://vinayb21-work.github.io/reading');
    return () => {
      document.title = prev.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', prev.desc);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', prev.canonical);
    };
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const currentlyReading: ShelfBook[] = [
    { title: "Meditations", author: "Marcus Aurelius", category: "Philosophy", cover: OL(211529), link: "https://www.goodreads.com/book/show/30659.Meditations" },
    { title: "The Mountain Is You", author: "Brianna Wiest", category: "Personal Growth", cover: OL(13838236), link: "https://www.goodreads.com/book/show/50046997-the-mountain-is-you" },
    { title: "The Ocean at the End of the Lane", author: "Neil Gaiman", category: "Fiction", cover: OL(7258156), link: "https://www.goodreads.com/book/show/15783514-the-ocean-at-the-end-of-the-lane" },
    { title: "Make Something Wonderful", author: "Steve Jobs", category: "Leadership", cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1773602394l/128533513._SX98_.jpg", link: "https://www.goodreads.com/book/show/128533513-make-something-wonderful" },
    { title: "Men Are from Mars, Women Are from Venus", author: "John Gray", category: "Personal Growth", cover: OL(10991), link: "https://www.goodreads.com/book/show/36520.Men_Are_from_Mars_Women_Are_from_Venus" },
    { title: "Applied Machine Learning and AI for Engineers", author: "Jeff Prosise", category: "Technology", link: "https://www.goodreads.com/book/show/60138929-applied-machine-learning-and-ai-for-engineers" },
    { title: "Algorithmic Puzzles", author: "Anany V. Levitin", category: "Technology", link: "https://www.goodreads.com/book/show/12829545-algorithmic-puzzles" },
    { title: "Always Remember", author: "Charlie Mackesy", category: "Fiction", link: "https://www.goodreads.com/book/show/198389628-always-remember" },
    { title: "The Uncommon Reader", author: "Alan Bennett", category: "Fiction", link: "https://www.goodreads.com/book/show/23616.The_Uncommon_Reader" },
    { title: "The Art of Not Overthinking", author: "Shaurya Kapoor", category: "Personal Growth", link: "https://www.goodreads.com/book/show/191427534-the-art-of-not-overthinking" },
    { title: "The Entrepreneur's Book", author: "Neil Francis", category: "Leadership", link: "https://www.goodreads.com/book/show/59766059-the-entrepreneur-s-book" },
    { title: "A Little Book of Forgiveness", author: "D. Patrick Miller", category: "Personal Growth", link: "https://www.goodreads.com/book/show/9699.A_Little_Book_of_Forgiveness" },
    { title: "Control Your Emotions", author: "Patrick King", category: "Personal Growth", link: "https://www.goodreads.com/book/show/58261024-control-your-emotions" },
    { title: "The Call of the Wild", author: "Jack London", category: "Fiction", cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1452291694l/1852._SX98_.jpg", link: "https://www.goodreads.com/book/show/1852.The_Call_of_the_Wild" },
    { title: "Through the Woods", author: "Emily Carroll", category: "Fiction", cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1414845473l/18659623._SX98_.jpg", link: "https://www.goodreads.com/book/show/18659623-through-the-woods" },
  ];

  // Sorted by date_read descending
  const readBooks: ShelfBook[] = [
    { title: "The Dead Are Silent", author: "Arthur Schnitzler", category: "Fiction", rating: 3, review: "A mixed bag of feelings. The start is quite slow and doesn't really catch your attention, but it slowly picks up — a brief but haunting novella.", dateRead: "Nov 2026", link: "https://www.goodreads.com/book/show/44024.The_Dead_Are_Silent", linkLabel: "View on Goodreads" },
    { title: "Emotions Explained with Buff Dudes", author: "Andrew Tsyaston", category: "Humor", rating: 4, dateRead: "Nov 2026", link: "https://www.goodreads.com/book/show/32895298-emotions-explained-with-buff-dudes", linkLabel: "View on Goodreads" },
    { title: "The Art of Communicating", author: "Thich Nhat Hanh", category: "Personal Growth", rating: 4, review: "Good read. It leans a bit more towards spirituality and deep listening, and is slightly less pragmatic compared to Nonviolent Communication — but a worthwhile companion to it.", dateRead: "Nov 2026", cover: OL(8738077), link: "https://www.goodreads.com/book/show/18969725-the-art-of-communicating", linkLabel: "View on Goodreads" },
    { title: "Nest", author: "RiotBones", category: "Fiction", rating: 2, dateRead: "Nov 2026", link: "https://www.goodreads.com/book/show/59648461-nest", linkLabel: "View on Goodreads" },
    { title: "Learning To Love Myself", author: "alex aubrey", category: "Personal Growth", rating: 2, dateRead: "Nov 2026", link: "https://www.goodreads.com/book/show/58282567-learning-to-love-myself", linkLabel: "View on Goodreads" },
    { title: "Unrequited Feelings", author: "Leslie B.", category: "Poetry", rating: 3, dateRead: "Nov 2026", link: "https://www.goodreads.com/book/show/58948261-unrequited-feelings", linkLabel: "View on Goodreads" },
    { title: "Big Panda & Tiny Dragon", author: "James Norbury", category: "Fiction", rating: 5, review: "A good, lighthearted read and a true depiction of the saying, 'a picture is worth a thousand words.' The author relates life to the seasons — a beautiful meditation on friendship and resilience.", dateRead: "Nov 2026", cover: OL(14686370), link: "https://www.goodreads.com/book/show/55117683-big-panda-tiny-dragon", linkLabel: "View on Goodreads" },
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry", category: "Fiction", rating: 5, review: "Such a beautiful book to read. There are very few books where I completely get lost in the world they create, and this was one of them. The innocence and wisdom packed into such a small book is remarkable.", dateRead: "Nov 2026", cover: OL(10746692), link: "https://www.goodreads.com/book/show/157993.The_Little_Prince", linkLabel: "View on Goodreads" },
    { title: "Begin Again, and Again, and Again", author: "Alessandra Olanow", category: "Personal Growth", rating: 4, review: "A good short read (2–4 hours) that touches upon relatable yet often ignored feelings within ourselves. Quietly reassuring.", dateRead: "Oct 2026", link: "https://www.goodreads.com/book/show/60125869-begin-again-and-again-and-again", linkLabel: "View on Goodreads" },
    { title: "Before the Coffee Gets Cold", author: "Toshikazu Kawaguchi", category: "Fiction", dateRead: "Oct 2026", cover: OL(10138333), link: "https://www.goodreads.com/book/show/44421460-before-the-coffee-gets-cold", linkLabel: "View on Goodreads" },
    { title: "Think Straight", author: "Darius Foroux", category: "Personal Growth", rating: 4, review: "Mixed opinions. The author is upfront from the start: this book may not be for everyone. What works is the directness — it's a no-nonsense approach to cutting through mental noise.", dateRead: "Oct 2026", cover: OL(10359785), link: "https://www.goodreads.com/book/show/36748119-think-straight", linkLabel: "View on Goodreads" },
    { title: "Rebecca", author: "Daphne du Maurier", category: "Fiction", rating: 5, review: "Completely new genre for me — Gothic fiction! Really liked how the author built up the narrative and suspense. The atmosphere is thick and the unreliable narrator keeps you guessing throughout.", dateRead: "Oct 2026", cover: OL(8238729), link: "https://www.goodreads.com/book/show/17899948-rebecca", linkLabel: "View on Goodreads" },
    { title: "How to Be More Tree", author: "Liz Marvin", category: "Personal Growth", rating: 5, review: "Soothing read.", dateRead: "Oct 2026", link: "https://www.goodreads.com/book/show/48813091-how-to-be-more-tree", linkLabel: "View on Goodreads" },
    { title: "Boundaries = Freedom", author: "Joseph Nguyen", category: "Personal Growth", rating: 5, review: "A striking reframe: boundaries aren't walls you build to keep people out — they're the lines you draw to stay true to yourself. Short, honest, and worth revisiting.", dateRead: "Oct 2026", cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1699362575l/201775519._SX50_.jpg", link: "https://www.goodreads.com/book/show/201775519-boundaries-freedom", linkLabel: "View on Goodreads" },
    { title: "How to Listen", author: "Thich Nhat Hanh", category: "Personal Growth", rating: 5, review: "A gentle yet profound guide to deep listening — the kind that requires presence, compassion, and the willingness to truly hear another person without judgment.", dateRead: "Oct 2026", cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1719788000l/203819110._SY75_.jpg", link: "https://vinay-badhan21.medium.com/how-to-listen-thich-nhat-hanh-0de998f2c545", linkLabel: "Read my review" },
    { title: "84, Charing Cross Road", author: "Helene Hanff", category: "Fiction", dateRead: "Oct 2026", cover: OL(95718), link: "https://www.goodreads.com/book/show/5677.84_Charing_Cross_Road", linkLabel: "View on Goodreads" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Technology", rating: 5, review: "The definitive guide to building reliable, scalable, and maintainable systems. A must-read for any backend engineer.", link: "https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321", linkLabel: "View on Amazon" },
    { title: "Dreaming Out Loud", author: "Bruce Feiler", category: "Biography", dateRead: "Jun 2014", link: "https://www.goodreads.com/book/show/95378.Dreaming_Out_Loud", linkLabel: "View on Goodreads" },
  ];

  const wantToRead: ShelfBook[] = [
    { title: "The Stranger", author: "Albert Camus", category: "Fiction", link: "https://www.goodreads.com/book/show/49552.The_Stranger" },
    { title: "Forgive", author: "Timothy J. Keller", category: "Personal Growth", link: "https://www.goodreads.com/book/show/58650540-forgive" },
    { title: "Against Breaking", author: "Ada Limón", category: "Poetry", link: "https://www.goodreads.com/book/show/199430424-against-breaking" },
    { title: "Healing Letters", author: "Nur Bella", category: "Poetry", link: "https://www.goodreads.com/book/show/199430424" },
    { title: "Healing Whispers", author: "Nur Bella", category: "Poetry", link: "https://www.goodreads.com/book/show/199430424" },
    { title: "For the Boy Who Feels Too Much", author: "Nur Bella", category: "Poetry", link: "https://www.goodreads.com/book/show/199430424" },
    { title: "Whispers of the Soul", author: "Patricia Greer", category: "Poetry", link: "https://www.goodreads.com/book/show/199430424" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm dark:shadow-slate-800/50 sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">Reading List</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                Books that have shaped my thinking on technology, leadership, and personal growth
              </p>
              <a
                href="https://www.goodreads.com/user/show/32018142-vinay-badhan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline text-sm font-medium"
              >
                <BookMarked className="w-4 h-4" />
                Follow me on Goodreads <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Currently Reading */}
        <section className="pb-14">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                Currently Reading
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">({currentlyReading.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentlyReading.map((book, index) => (
                  <a
                    key={index}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
                  >
                    <BookCover src={book.cover} title={book.title} className="w-11 h-16" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 dark:text-slate-100 text-sm leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">{book.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">by {book.author}</p>
                      <div className="mt-2">
                        <CategoryBadge category={book.category} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Read */}
        <section className="pb-14">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                Read
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">({readBooks.length})</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {readBooks.map((book, index) => (
                  <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex gap-3 items-start">
                        <BookCover src={book.cover} title={book.title} className="w-12 h-18" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-slate-800 dark:text-slate-100 text-sm leading-snug">{book.title}</CardTitle>
                            <CategoryBadge category={book.category} />
                          </div>
                          <CardDescription className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">by {book.author}</CardDescription>
                          {book.rating !== undefined && <Stars rating={book.rating} />}
                          {book.dateRead && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{book.dateRead}</p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {(book.review || book.link) && (
                      <CardContent className="pt-0">
                        {book.review && (
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 italic">"{book.review}"</p>
                        )}
                        {book.link && (
                          <a
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline text-xs"
                          >
                            {book.linkLabel ?? "View on Goodreads"} <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Want to Read */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                Want to Read
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">({wantToRead.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {wantToRead.map((book, index) => (
                  <a
                    key={index}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-dashed border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-solid transition-all duration-300"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-slate-700 dark:text-slate-200 text-sm leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{book.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">by {book.author}</p>
                      <div className="mt-2">
                        <CategoryBadge category={book.category} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href="https://www.goodreads.com/user/show/32018142-vinay-badhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline text-sm"
                >
                  See full shelf on Goodreads <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reading;
