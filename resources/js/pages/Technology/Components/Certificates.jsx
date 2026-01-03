import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Certificates = ({ certificates = [], pageSettings }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Default certificates if none provided
  const defaultCertificates = [
    { id: 1, certificate_image: "/assets/technology/certificate_1.png", title: "Technology Certificate" },
    { id: 2, certificate_image: "/assets/technology/certificate_2.png", title: "Technology Certificate" },
    { id: 3, certificate_image: "/assets/technology/certificate_3.png", title: "Technology Certificate" },
    { id: 4, certificate_image: "/assets/technology/certificate_1.png", title: "Technology Certificate" },
  ];

  // Map backend certificate fields to frontend expected fields
  const mappedCertificates = certificates.map(cert => ({
    ...cert,
    title: cert.name || cert.title,
    certificate_image: cert.image || cert.certificate_image,
    issuer: cert.issuing_organization || cert.issuer,
    date: cert.issue_date || cert.date,
    description: cert.description || `Credential ID: ${cert.credential_id || 'N/A'}`,
  }));

  const displayCertificates = mappedCertificates.length > 0 ? mappedCertificates : defaultCertificates;

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-indigo-300 text-white rounded-full p-3 cursor-pointer shadow-lg z-10"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-indigo-300 text-white rounded-full p-3 cursor-pointer shadow-lg z-10"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, displayCertificates.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, displayCertificates.length) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const handleCertificateClick = (cert) => {
    setSelectedCertificate(cert);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-18">
      <h1 className="text-5xl text-slate-900 font-semibold mb-4 text-center">
        {pageSettings?.certificates_title || 'Certificates'}
      </h1>
      <p className="text-slate-600 text-center mb-12">
        {pageSettings?.certificates_description || 'Shahriar Khan holds various professional certifications in technology, cybersecurity, and business management. These credentials validate his expertise and commitment to staying current with industry standards and best practices.'}
      </p>

      {displayCertificates.length > 0 && (
        <Slider {...settings}>
          {displayCertificates.map((cert, index) => (
            <div key={cert.id || index} className="px-2">
              <div 
                className="w-full h-[400px] relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleCertificateClick(cert)}
              >
                {/* Image */}
                <img
                  className="w-full h-full object-contain rounded-2xl"
                  src={cert.certificate_image || "/assets/technology/certificate_1.png"}
                  alt={cert.title || "Certificate"}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Certificate Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedCertificate.title || "Certificate"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Certificate Image - Full Size */}
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    className="w-full object-contain"
                    src={selectedCertificate.certificate_image || "/assets/technology/certificate_1.png"}
                    alt={selectedCertificate.title || "Certificate"}
                  />
                </div>

                {/* Certificate Details */}
                {selectedCertificate.description && (
                  <p className="text-muted-foreground">
                    {selectedCertificate.description}
                  </p>
                )}

                {selectedCertificate.issuer && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Issued by:</strong> {selectedCertificate.issuer}
                  </p>
                )}

                {selectedCertificate.date && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Date:</strong> {new Date(selectedCertificate.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificates;
