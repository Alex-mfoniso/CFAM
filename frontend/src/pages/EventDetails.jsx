import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/asset";

const eventData = {
  "sunday-service": {
    title: "Sunday Service",
    description: "Join us every Sunday at 10 AM for an uplifting service.",
    image: assets.church,
    details: "Experience powerful worship and inspiring sermons.",
    category: "weekly",
  },
  "youth-conference": {
    title: "Youth Conference",
    description: "A gathering for young believers.",
    image: assets.church,
    details: "A life-changing experience for young people seeking God.",
    category: "yearly",
  },
  "prayer-meeting": {
    title: "Prayer Meeting",
    description: "Join us for prayer every Wednesday.",
    image:  assets.church,
    details: "Come and intercede with us every midweek.",
    category: "weekly",
  },
  "bible-study": {
    title: "Bible Study",
    description: "Deep dive into God’s Word every Friday at 6 PM.",
    image: assets.church,
    details: "Gain wisdom and understanding through the Word.",
    category: "weekly",
  },
};

const EventDetail = () => {
  const { eventId } = useParams(); // Get event ID from URL
  const event = eventData[eventId]; // Fetch event details

  if (!event)
    return <h1 className="text-center text-3xl mt-10">Event Not Found</h1>;

  // Find similar events (same category, excluding current event)
  const similarEvents = Object.entries(eventData)
    .filter(([id, e]) => e.category === event.category && id !== eventId)
    .map(([id, e]) => ({ id, ...e }));

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="mt-2 text-gray-700">{event.details}</p>
        </div>
      </div>

      {/* Similar Events Section */}
      {similarEvents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Similar Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarEvents.map((simEvent) => (
              <Link to={`/events/${simEvent.id}`} key={simEvent.id} className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={simEvent.image}
                    alt={simEvent.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{simEvent.title}</h3>
                    <p className="text-gray-600 mt-2">{simEvent.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;







// const events = [
//   {
//     // id: 1,
//     date: "Oct 22, 2021",
//     time: "9:00 AM",
//     title: "Healing and Deliverance Meeting",
//     description:
//       "Tincidunt augue interdum velit euismod in dis parturient montes nascetur ridiculus mus maurisacilisi ferm.",
//     category: "monthly",
//     link: "events/sunday-service",
//     image:
//       "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
//   },
//   {
//     id: 1,
//     date: "Nov 15, 2021",
//     time: "11:00 AM",
//     title: "Sunday Worship Service",
//     description:
//       "Experience the presence of God through worship, prayer, and the word of God.",
//     category: "weekly",
//     link: "events/sunday-service",
//     image:
//       "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
//   },
//   {
//     id: 3,
//     date: "Dec 5, 2021",
//     time: "6:00 PM",
//     title: "Christmas Carol Night",
//     description:
//       "Join us for an evening of carols, joy, and festive celebration.",
//     category: "monthly",
//     link: "events/sunday-service",
//     image:
//       "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
//   },
//   {
//     id: 4,
//     date: "Jan 10, 2022",
//     time: "7:30 PM",
//     title: "New Year Prayer Vigil",
//     description:
//       "Start the year with prayers, declarations, and divine guidance.",
//     category: "yearly",
//     link: "events/sunday-service",
//     image:
//       "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
//   },
// ];