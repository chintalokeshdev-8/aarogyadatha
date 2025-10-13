
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ShieldAlert, PlusCircle, AlertTriangle, Droplet, User, Building, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";


const emergencyContacts = [
    { name: "Apollo Emergency Ambulance", distance: "2.5 km", available: true },
    { name: "Care Hospital Emergency", distance: "4 km", available: true },
    { name: "Dr. Rajesh Kumar (Emergency)", distance: "N/A", available: false },
    { name: "Police Emergency", distance: "1.2 km", available: true },
    { name: "Fire Department", distance: "3 km", available: true },
]

export default function EmergencyPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-destructive">Emergency Services</h1>
                <p className="text-muted-foreground mt-2">In case of emergency, use the options below immediately.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Button className="h-24 text-2xl font-bold" variant="destructive">
                    <Phone className="mr-4 h-8 w-8" /> CALL AMBULANCE - 108
                </Button>
                <Button className="h-24 text-2xl font-bold" variant="secondary">
                    <MapPin className="mr-4 h-8 w-8" /> Share My Location
                </Button>
            </div>
            
            <Card className="border-destructive/50 bg-destructive/5 border-2">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2"><ShieldAlert/> Critical Information</CardTitle>
                    <CardDescription>Share this with emergency services.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                    <p><strong>Name:</strong> Chinta Lokesh Babu</p>
                    <p><strong>Age:</strong> 27 Years</p>
                    <p><strong>Blood Group:</strong> O+ Positive</p>
                    <p><strong>Contact:</strong> +91 8008334948</p>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
                 <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Emergency Contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {emergencyContacts.map(contact => (
                                <li key={contact.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border-2">
                                    <div>
                                        <p className="font-semibold">{contact.name}</p>
                                        <p className="text-sm text-muted-foreground">{contact.distance}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={contact.available ? 'default' : 'destructive'} className={cn('font-bold', contact.available ? 'bg-green-500' : '')}>
                                            {contact.available ? 'Available' : 'Unavailable'}
                                        </Badge>
                                        <Button size="icon" variant="outline" className="border-2"><Phone className="h-4 w-4"/></Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                 <div className="space-y-6">
                     <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><AlertTriangle/> Medical Alerts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <h4 className="font-semibold">Current Medications:</h4>
                                <p className="text-muted-foreground">Metformin, Paracetamol</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Known Allergies:</h4>
                                <p className="text-muted-foreground">Penicillin</p>
                            </div>
                        </CardContent>
                    </Card>

                     <Card className="border-2">
                        <CardHeader>
                            <CardTitle>Emergency Instructions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                           <p>1. Stay calm and do not panic.</p>
                           <p>2. Call the ambulance or your nearest emergency contact.</p>
                           <p>3. Share your live location if possible.</p>
                           <p>4. Inform them about your medical alerts.</p>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    )

    

