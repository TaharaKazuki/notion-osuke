import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import db from '@/lib/supabase/db';
import { workspaces, subscriptions } from '../../../../migrations/schema';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const workspaces = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;

  if (!workspaces)
    return (
      <div
        className="
          flex
          h-screen
          w-screen
          items-center
          justify-center
          bg-background
          "
      >
        <DashboardSetup user={user} subscription={subscription} />
      </div>
    );

  return <div>DashboardPage</div>;
};

export default DashboardPage;
