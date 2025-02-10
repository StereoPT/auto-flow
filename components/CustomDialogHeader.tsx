'use client';

import { LucideIcon } from 'lucide-react';
import { DialogHeader, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

type CustomDialogHeaderProps = {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
};

export const CustomDialogHeader = (props: CustomDialogHeaderProps) => {
  const Icon = props.icon;

  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon
              size={30}
              className={cn('stroke-primary', props.iconClassName)}
            />
          )}
          {props.title && (
            <p className={cn('text-xl text-primary', props.titleClassName)}>
              {props.title}
            </p>
          )}
          {props.subTitle && (
            <p
              className={cn(
                'text-sm text-muted-foreground',
                props.subTitleClassName,
              )}>
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};
