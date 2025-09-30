
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
import { Bell, Check, Clock } from 'lucide-react';
import { notifications } from '@/lib/notifications';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export function NotificationsDropdown() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full relative">
          <Bell className="h-5 w-5" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
            <span className='font-bold text-base'>Notifications</span>
            <Button variant="ghost" size="sm" className='h-auto px-2 py-1 text-xs'>Mark all as read</Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
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
                                {isClient ? formatDistanceToNow(notification.timestamp, { addSuffix: true }) : '...'}
                            </p>
                        </div>
                        {!notification.read && <div className="mt-1 h-2 w-2 rounded-full bg-primary" />}
                    </DropdownMenuItem>
                </Link>
            ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center font-semibold text-primary">
            View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
