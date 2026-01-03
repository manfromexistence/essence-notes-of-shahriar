import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Banner = ({ videos = [], settings }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Use videos from database (passed via props), take first 3 for banner
  const displayVideos = videos.slice(0, 3);

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  };

  return (
    <div className="bg-slate-100 py-18 relative">
      <div className="absolute top-0 right-0 hidden lg:block">
        <div>
          <img src="/assets/videos/vector_right.svg" alt="" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 hidden lg:block">
        <div>
          <img src="/assets/videos/vector_left.svg" alt="" />
        </div>
      </div>
      <div className="w-11/12 lg:w-9/12 mx-auto mt-24">
        <h1 className="text-5xl text-slate-900 font-semibold mb-12">{settings?.page_title || "Videos"}</h1>

        {displayVideos.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-slate-500 text-lg">No featured videos available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-x-8 gap-y-6">
            {displayVideos.length > 0 && (
              <div className="lg:col-span-2 lg:row-span-2">
                <div className="w-full h-full relative group cursor-pointer" onClick={() => handlePlayVideo(displayVideos[0])}>
                  <img
                    className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                    src={displayVideos[0].thumbnail || "/assets/videos/video_thumbline.png"}
                    alt={displayVideos[0].title}
                  />
                  <div className="flex items-center gap-2 absolute bottom-10 left-4">
                    <Button
                      size="lg"
                      className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </Button>
                    <h3 className="text-4xl font-semibold text-white hidden lg:block">
                      {displayVideos[0].title}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {displayVideos.slice(1).map((video) => (
              <div key={video.id} className="lg:col-span-1 lg:row-span-1">
                <div className="w-full h-full relative group cursor-pointer" onClick={() => handlePlayVideo(video)}>
                  <img
                    className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                    src={video.thumbnail || "/assets/videos/video_thumbline.png"}
                    alt={video.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </Button>
                  </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black border-gray-800">
          <div className="aspect-video w-full">
            {selectedVideo && (
              selectedVideo.video_url && selectedVideo.video_url.startsWith('/storage/') ? (
                <video
                  src={selectedVideo.video_url}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(selectedVideo.video_url)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Banner;
