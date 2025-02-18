interface ArtistCardProps {
  name: string;
  photo: string;
  country: string;
  rating: number;
  monthlyListeners: number;
  trend: "up" | "down";
}

export default function ArtistCard({
  name,
  photo,
  country,
  rating,
  monthlyListeners,
  trend,
}: ArtistCardProps) {
  return (
    <div className="w-30 min-w-20 max-w-40 p-4 m-2 border-2 rounded-md border-rose-500 bg-red-100 flex flex-col items-center">
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6T3B0yzOWZhfy_W6tikdZESIUojeSOwz9g&s' alt='arijit' className="w-24 h-24 rounded-full mb-3" />
      <h2 className="text-lg font-semibold">Artist name</h2>
      <p className="text-sm text-gray-500">Artist country</p>
      <p className="mt-2 text-sm">
        Rating: <span className="font-bold">5</span>
      </p>
      <p className="text-sm">
        Monthly Listeners: <span className="font-bold">90k</span>
      </p>
      <p
        className={`text-sm mt-2 ${
          trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        Trend: {trend === "up" ? "📈 Growth" : "📉 Decline"}
      </p>
    </div>
  );
}
