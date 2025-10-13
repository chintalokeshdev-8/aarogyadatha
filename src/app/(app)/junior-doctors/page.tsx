import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const doctors = [
    { 
        name: "Dr. Ananya Sharma", 
        specialty: "General Physician", 
        experience: "5 years", 
        languages: "English, Telugu, Hindi", 
        status: "Online", 
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "female doctor"
    },
    { 
        name: "Dr. Vikram Singh", 
        specialty: "Pediatrician", 
        experience: "8 years", 
        languages: "English, Hindi", 
        status: "Online", 
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "male doctor"
    },
    { 
        name: "Dr. Priya Desai", 
        specialty: "General Physician", 
        experience: "3 years", 
        languages: "English, Telugu", 
        status: "Offline", 
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "female doctor portrait"
    },
    { 
        name: "Dr. Rohan Gupta", 
        specialty: "General Physician", 
        experience: "4 years", 
        languages: "English, Telugu", 
        status: "Online", 
        avatar: "https://placehold.co/100x100.png",
        dataAiHint: "male doctor"
    },
];

export default function JuniorDoctorsPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold" style={{color: 'hsl(var(--nav-junior-doctors))'}}>24/7 Junior Doctors</h1>
                <p className="text-muted-foreground mt-2">Get instant consultation from our team of dedicated junior doctors, anytime.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor, index) => (
                    <Card key={index} className="flex flex-col transition-shadow hover:shadow-md border">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-16 w-16 border" style={{borderColor: 'hsl(var(--nav-junior-doctors))'}}>
                                <AvatarImage src={doctor.avatar} data-ai-hint={doctor.dataAiHint} />
                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    {doctor.name}
                                </CardTitle>
                                <CardDescription>{doctor.specialty}</CardDescription>
                            </div>
                             {doctor.status === 'Online' ? (
                                <div className="ml-auto flex items-center gap-2 text-green-600 font-semibold">
                                    <span className="relative flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-600"></span>
                                    </span>
                                    Online
                                </div>
                            ) : (
                                <Badge variant='secondary' className="ml-auto">
                                    Offline
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3 text-sm p-4 pt-0">
                            <p className="text-muted-foreground"><BadgeCheck className="inline-block mr-2 h-4 w-4" style={{color: 'hsl(var(--nav-junior-doctors))'}}/>{doctor.experience} of experience</p>
                            <p className="text-muted-foreground">Speaks: {doctor.languages}</p>
                        </CardContent>
                        <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                            <Button disabled={doctor.status === 'Offline'} style={{backgroundColor: doctor.status === 'Online' ? 'hsl(var(--nav-junior-doctors))' : ''}}>
                                <Video className="mr-2 h-4 w-4" /> Video Call
                            </Button>
                            <Button variant="outline" disabled={doctor.status === 'Offline'} className="border">
                                <Phone className="mr-2 h-4 w-4" /> Audio Call
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
