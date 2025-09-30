
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { searchData } from '@/lib/search-data';
import { useRouter } from 'next/navigation';

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden shadow-lg">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder="Search for anything..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {searchData.map((group) => (
                <CommandGroup key={group.heading} heading={group.heading}>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={item.title}
                        value={`${group.heading} ${item.title} ${item.keywords || ''}`}
                        onSelect={() => {
                          runCommand(() => router.push(item.href));
                        }}
                      >
                        <Icon className="mr-2" />
                        <span>{item.title}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
