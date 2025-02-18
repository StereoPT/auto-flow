import { GetPeriods } from '@/actions/analytics/getPeriods';
import { Suspense } from 'react';
import { PeriodSelector } from './_components/PeriodSelector';
import { Period } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { GetStatsCardsValues } from '@/actions/analytics/getStatsCardsValues';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';
import { StatsCard } from './_components/StatsCard';
import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats';
import { ExecutionStatusChart } from './_components/ExecutionStatusChart';
import { GetCreditsUsageInPeriod } from '@/actions/analytics/getCreditsUsageInPeriod';
import { CreditUsageChart } from '../billing/_components/CreditUsageChart';

type CreditsUsagedInPeriodProps = {
  selectedPeriod: Period;
};

const CreditsUsageInPeriod = async ({
  selectedPeriod,
}: CreditsUsagedInPeriodProps) => {
  const data = await GetCreditsUsageInPeriod(selectedPeriod);
  return (
    <CreditUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
    />
  );
};

type StatsExecutionStatusProps = {
  selectedPeriod: Period;
};

const StatsExecutionStatus = async ({
  selectedPeriod,
}: StatsExecutionStatusProps) => {
  const data = await GetWorkflowExecutionStats(selectedPeriod);
  return <ExecutionStatusChart data={data} />;
};

const StatsCardSkeleton = () => {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full min-h-[120px]" />
      ))}
    </div>
  );
};

type StatsCardsProps = {
  selectedPeriod: Period;
};

const StatsCards = async ({ selectedPeriod }: StatsCardsProps) => {
  const data = await GetStatsCardsValues(selectedPeriod);
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard
        title="Workflow Executions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Phase Executions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
      <StatsCard
        title="Credits consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  );
};

type PeriodSelectorWrapperProps = {
  selectedPeriod: Period;
};

const PeriodSelectorWrapper = async ({
  selectedPeriod,
}: PeriodSelectorWrapperProps) => {
  const periods = await GetPeriods();
  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
};

type HomePageProps = {
  searchParams: {
    month?: string;
    year?: string;
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const currentDate = new Date();
  const { month, year } = await searchParams;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
