'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type EmojiPickerProps = {
  children: ReactNode;
  getValue?: (emoji: string) => void;
};

const EmojiPicker = ({ children, getValue }: EmojiPickerProps) => {
  const route = useRouter();
  const Picker = dynamic(() => import('emoji-picker-react'));
  const onClick = (selectedEmoji: any) => {
    if (getValue) getValue(selectedEmoji.emoji);
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent className="border-none p-0">
          <Picker onEmojiClick={onClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
