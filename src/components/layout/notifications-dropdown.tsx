
'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, Clock } from 'lucide-react';
import { notifications } from '@/lib/notifications';
import { format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function NotificationsDropdown() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto w-auto flex flex-col items-center justify-center gap-1 p-2 rounded-lg relative">
          <div className="relative">
            <Bell className="h-6 w-6" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className={cn(
                    "absolute -top-0.5 -right-0.5 inline-flex h-full w-full rounded-full bg-primary opacity-75",
                    "animate-ping"
                  )}></span>
                  <span className="relative -top-0.5 -right-0.5 inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background"></span>
              </span>
            )}
          </div>
          <span className="text-xs font-bold">Alerts</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
            <span className='font-bold text-base'>Notifications</span>
            <Button variant="ghost" size="sm" className='h-auto px-2 py-1 text-xs'>Mark all as read</Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
            {notifications.slice(0, 4).map((notification) => (
                <Link href={notification.href} key={notification.id} passHref>
                    <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                        <div className={`mt-1 p-1.5 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                            <notification.icon className={`h-5 w-5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                        </div>
                        <div className='flex-1'>
                            <p className={`font-semibold ${notification.read ? 'text-muted-foreground' : ''}`}>{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                                <Clock className="h-3 w-3" />
                                {isClient ? format(new Date(notification.timestamp), 'dd-MMM-yyyy') : '...'}
                            </p>
                        </div>
                        {!notification.read && <div className="mt-1 h-2 w-2 rounded-full bg-primary" />}
                    </DropdownMenuItem>
                </Link>
            ))}
        </div>
        <DropdownMenuSeparator />
        <Link href="/notifications" passHref>
            <DropdownMenuItem className="justify-center font-semibold text-primary">
                View all notifications
            </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
