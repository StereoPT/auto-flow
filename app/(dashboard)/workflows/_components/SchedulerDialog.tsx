'use client';

import { UpdateWorkflowCron } from '@/actions/workflows/updateWorkflowCron';
import { CustomDialogHeader } from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import cronstrue from 'cronstrue';
import parser from 'cron-parser';
import { RemoveWorkflowSchedule } from '@/actions/workflows/removeWorkflowSchedule';
import { Separator } from '@/components/ui/separator';

type SchedulerDialogProps = {
  workflowId: string;
  cronProp: string | null;
};

export const SchedulerDialog = ({
  workflowId,
  cronProp,
}: SchedulerDialogProps) => {
  const [cron, setCron] = useState(cronProp || '');
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState('');

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success('Schedule Updated Successfully', { id: 'cron' });
    },
    onError: () => {
      toast.success('Error Updating Schedule', { id: 'cron' });
    },
  });

  const removeScheduleMutation = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success('Schedule Updated Successfully', { id: 'cron' });
    },
    onError: () => {
      toast.success('Error Updating Schedule', { id: 'cron' });
    },
  });

  useEffect(() => {
    try {
      parser.parseExpression(cron);
      const humanCronStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronStr);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = cronProp && cronProp.length > 0;
  const readableSavedCron =
    workflowHasValidCron && cronstrue.toString(cronProp);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn(
            'text-sm p-0 h-auto text-orange-500',
            workflowHasValidCron && 'text-primary',
          )}>
          {workflowHasValidCron && (
            <div className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {readableSavedCron}
            </div>
          )}
          {!workflowHasValidCron && (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3" /> Set Schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC.
          </p>
          <Input
            value={cron}
            onChange={(e) => {
              setCron(e.target.value);
            }}
            placeholder="E.g. * * * * *"
          />
          <div
            className={cn(
              'bg-accent rounded-md p-4 border text-sm border-destructive text-destructive',
              validCron && 'border-primary text-primary',
            )}>
            {validCron ? readableCron : 'Not a valid cron expression'}
          </div>

          {workflowHasValidCron && (
            <DialogClose asChild>
              <div className="">
                <Button
                  className="w-full text-destructive border-destructive hover:text-destructive"
                  variant="outline"
                  disabled={
                    mutation.isPending || removeScheduleMutation.isPending
                  }
                  onClick={() => {
                    toast.loading('Removing Schedule...', { id: 'cron' });
                    removeScheduleMutation.mutate(workflowId);
                  }}>
                  Remove Current Schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading('Saving Schedule...', { id: 'cron' });
                mutation.mutate({ id: workflowId, cron });
              }}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
