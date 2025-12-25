import { useState } from "react";
import { MapPin, Calendar as CalendarIcon, Clock, Users, QrCode, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  quota: number;
  registered: number;
  xpReward: number;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Kopdar Akbar MPJ Jawa Timur 2025",
    date: "15 Jan 2025",
    time: "08:00 WIB",
    location: "Gedung Serbaguna Surabaya",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    quota: 200,
    registered: 145,
    xpReward: 100,
  },
  {
    id: 2,
    title: "Workshop Video Editing",
    date: "20 Jan 2025",
    time: "13:00 WIB",
    location: "PP Al Hikmah Malang",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&h=200&fit=crop",
    quota: 50,
    registered: 32,
    xpReward: 75,
  },
  {
    id: 3,
    title: "Pelatihan Fotografi Dasar",
    date: "25 Jan 2025",
    time: "09:00 WIB",
    location: "Studio Photo Kediri",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=200&fit=crop",
    quota: 30,
    registered: 28,
    xpReward: 50,
  },
];

const registeredEvents: Event[] = [
  {
    id: 4,
    title: "Seminar Media Dakwah Digital",
    date: "10 Jan 2025",
    time: "10:00 WIB",
    location: "Aula PP Nurul Huda",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
    quota: 100,
    registered: 100,
    xpReward: 80,
  },
];

const historyEvents: Event[] = [
  {
    id: 5,
    title: "Training Content Creator 2024",
    date: "20 Nov 2024",
    time: "08:00 WIB",
    location: "PP Darul Ulum Jombang",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop",
    quota: 75,
    registered: 75,
    xpReward: 60,
  },
  {
    id: 6,
    title: "Kopdar Regional Malang Raya",
    date: "15 Okt 2024",
    time: "09:00 WIB",
    location: "Taman Krida Budaya Malang",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=200&fit=crop",
    quota: 150,
    registered: 142,
    xpReward: 75,
  },
];

const CrewEventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showTicket, setShowTicket] = useState(false);

  const EventCard = ({ event, type }: { event: Event; type: "upcoming" | "registered" | "history" }) => (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-36 object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            +{event.xpReward} XP
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-foreground mb-2 line-clamp-2">{event.title}</h3>
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{event.date}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            {type === "upcoming" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{event.registered}/{event.quota} peserta</span>
              </div>
            )}
          </div>
          
          {type === "upcoming" && (
            <Button className="w-full bg-primary hover:bg-primary/90">
              Daftar Sekarang
            </Button>
          )}
          {type === "registered" && (
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => {
                setSelectedEvent(event);
                setShowTicket(true);
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Lihat Tiket
            </Button>
          )}
          {type === "history" && (
            <Button variant="outline" className="w-full">
              Lihat Detail
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="upcoming" className="flex-1 flex flex-col">
        <div className="px-4 pt-4 bg-background sticky top-0 z-10">
          <TabsList className="w-full grid grid-cols-3 bg-muted">
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm">Upcoming</TabsTrigger>
            <TabsTrigger value="registered" className="text-xs sm:text-sm">Terdaftar</TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">Riwayat</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} type="upcoming" />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="registered" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-4">
              {registeredEvents.length > 0 ? (
                registeredEvents.map((event) => (
                  <EventCard key={event.id} event={event} type="registered" />
                ))
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada event terdaftar</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="history" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-4">
              {historyEvents.map((event) => (
                <EventCard key={event.id} event={event} type="history" />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Ticket Modal */}
      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Tiket Event</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
                <h3 className="font-bold mb-1">{selectedEvent.title}</h3>
                <p className="text-sm opacity-80">{selectedEvent.date} • {selectedEvent.time}</p>
                <div className="mt-6 bg-primary-foreground rounded-lg p-4 inline-block">
                  <QrCode className="h-32 w-32 text-primary" />
                </div>
                <p className="mt-4 text-xs opacity-70">Tunjukkan QR Code ini kepada panitia</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrewEventPage;
