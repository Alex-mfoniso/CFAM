import { useParams } from "react-router-dom";
import { assets } from "../assets/asset";

const eventData = {
  "sunday-service": {
    title: "Sunday Service",
    description: "Join us every Sunday at 10 AM for an uplifting service.",
    image: "/images/sunday-service.jpg",
    details: "Experience powerful worship and inspiring sermons."
  },
  "youth-conference": {
    title: "Youth Conference",
    description: "A gathering for young believers.",
    image: assets.church,
    details: "A life-changing experience for young people seeking God."
  },
  "prayer-meeting": {
    title: "Prayer Meeting",
    description: "Join us for prayer every Wednesday.",
    image: "/images/prayer-meeting.jpg",
    details: "Come and intercede with us every midweek."
  },
  "bible-study": {
    title: "Bible Study",
    description: "Deep dive into God’s Word every Friday at 6 PM.",
    image: "/images/bible-study.jpg",
    details: "Gain wisdom and understanding through the Word."
  }
};

const EventDetail = () => {
  const { eventId } = useParams();
  const event = eventData[eventId];

  if (!event) return <h1 className="text-center text-3xl mt-10">Event Not Found</h1>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="mt-2 text-gray-700">{event.details}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
