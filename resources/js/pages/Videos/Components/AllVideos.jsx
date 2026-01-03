import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Search } from "lucide-react";

const AllVideos = ({ videos = [], settings }) => {
  const [visibleVideos, setVisibleVideos] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Use videos directly from database (passed via props)
  const displayVideos = videos;

  const filteredVideos = displayVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="py-18 bg-slate-100">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl lg:text-5xl text-slate-900 font-semibold">
            {settings?.all_videos_title || "All Videos"}
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search For Videos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg text-slate-600 shadow-lg bg-white w-64"
            />
          </div>
        </div>

        {displayVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No videos available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredVideos.slice(0, visibleVideos).map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0!">
                <CardContent className="p-0!">
                <div className="w-full relative group cursor-pointer" onClick={() => handlePlayVideo(video)}>
                  <img
                    className="w-full h-48 object-cover"
                    src={video.thumbnail || "/assets/videos/video_thumbline.png"}
                    alt={video.title}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="lg"
                      className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </Button>
                  </div>
                </div>
                
                {/* Title and Description below the thumbnail */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2">
                    {video.title || "Untitled Video"}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  {video.duration && (
                    <p className="text-xs text-slate-400 mt-2">
                      Duration: {video.duration}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {displayVideos.length > 0 && (
          <div className="text-center mt-6">
            {visibleVideos < filteredVideos.length ? (
              <Button
                onClick={() => setVisibleVideos(filteredVideos.length)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Load More
              </Button>
            ) : filteredVideos.length > 3 && (
              <Button
                onClick={() => setVisibleVideos(3)}
                variant="destructive"
              >
                Show Less
              </Button>
            )}
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

export default AllVideos;
