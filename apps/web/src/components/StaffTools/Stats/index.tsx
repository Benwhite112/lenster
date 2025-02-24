import MetaTags from '@components/Common/MetaTags';
import { Card } from '@components/UI/Card';
import { GridItemEight, GridItemFour, GridLayout } from '@components/UI/GridLayout';
import useStaffMode from '@components/utils/hooks/useStaffMode';
import {
  ChatAlt2Icon,
  CollectionIcon,
  FireIcon,
  SwitchHorizontalIcon,
  UserAddIcon,
  UsersIcon
} from '@heroicons/react/outline';
import { PencilAltIcon } from '@heroicons/react/solid';
import humanize from '@lib/humanize';
import { t } from '@lingui/macro';
import { APP_NAME, ERROR_MESSAGE } from 'data/constants';
import { useLensterStatsQuery } from 'lens';
import type { NextPage } from 'next';
import type { FC, ReactNode } from 'react';
import Custom404 from 'src/pages/404';

import StaffToolsSidebar from '../Sidebar';

interface StatBoxProps {
  icon: ReactNode;
  value: number;
  title: string;
}

export const StatBox: FC<StatBoxProps> = ({ icon, value, title }) => (
  <Card className="w-full px-7 py-4" forceRounded>
    <div className="flex items-center space-x-2">
      {icon}
      <b className="text-lg">{humanize(value)}</b>
    </div>
    <div className="lt-text-gray-500">{title}</div>
  </Card>
);

const Stats: NextPage = () => {
  const { allowed } = useStaffMode();

  const { data, loading, error } = useLensterStatsQuery({ pollInterval: 1000 });

  if (!allowed) {
    return <Custom404 />;
  }

  const stats: any = data?.globalProtocolStats;

  return (
    <GridLayout>
      <MetaTags title={t`Stafftools • ${APP_NAME}`} />
      <GridItemFour>
        <StaffToolsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <Card className="p-5">
          {error ? (
            <b className="text-red-500">{ERROR_MESSAGE}</b>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            <section className="space-y-3">
              <h1 className="mb-4 text-xl font-bold">Stats</h1>
              <div className="block justify-between space-y-3 sm:flex sm:space-y-0 sm:space-x-3">
                <StatBox
                  icon={<UsersIcon className="h-4 w-4" />}
                  value={stats?.totalProfiles}
                  title="total profiles"
                />
                <StatBox
                  icon={<FireIcon className="h-4 w-4" />}
                  value={stats?.totalBurntProfiles}
                  title="profiles burnt"
                />
                <StatBox
                  icon={<PencilAltIcon className="h-4 w-4" />}
                  value={stats?.totalPosts}
                  title="total posts"
                />
              </div>
              <div className="block justify-between space-y-3 sm:flex sm:space-y-0 sm:space-x-3">
                <StatBox
                  icon={<SwitchHorizontalIcon className="h-4 w-4" />}
                  value={stats?.totalMirrors}
                  title="total mirrors"
                />
                <StatBox
                  icon={<ChatAlt2Icon className="h-4 w-4" />}
                  value={stats?.totalComments}
                  title="total comments"
                />
              </div>
              <div className="block justify-between space-y-3 sm:flex sm:space-y-0 sm:space-x-3">
                <StatBox
                  icon={<CollectionIcon className="h-4 w-4" />}
                  value={stats?.totalCollects}
                  title="total collects"
                />
                <StatBox
                  icon={<UserAddIcon className="h-4 w-4" />}
                  value={stats?.totalFollows}
                  title="total follows"
                />
              </div>
            </section>
          )}
          <div />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default Stats;
