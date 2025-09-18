export default function ManItMap({ zoom = 15 }) {
  const lat = 23.22979;
  const lng = 77.41179;

  const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Left Side: Map */}
        <div className="space-y-3">
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <iframe
              title="MANIT Location"
              src={embedUrl}
              className="w-full h-[250px]"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
              allowFullScreen
            />
          </a>
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#002147] text-white px-3 py-1.5 text-xs rounded-full shadow hover:bg-[#013060] transition-colors"
          >
            View in Google Maps
          </a>
        </div>

        {/* Right Side: Logo + Info */}
        <div className="text-center md:text-left space-y-3">
          <img
            src="logo.jpg"
            alt="MANIT Logo"
            className="w-20 mx-auto md:mx-0"
          />
          <h2 className="text-xl font-bold text-[#002147]">
            Maulana Azad National Institute of Technology (MANIT)
          </h2>
          <p className="text-gray-700 text-sm">
            📍 Link Road Number 3, Near Kali Mata Mandir, <br />
            Bhopal – 462003, Madhya Pradesh, India
          </p>
          <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-600 space-y-1">
            <p>🚆 <strong>Nearest Railway Station:</strong> Bhopal Junction (~9 km)</p>
            <p>✈️ <strong>Nearest Airport:</strong> Raja Bhoj Airport (~18 km)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
