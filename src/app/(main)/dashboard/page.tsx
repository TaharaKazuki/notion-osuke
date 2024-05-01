import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import db from '@/lib/supabase/db';
import { workspaces } from '../../../../migrations/schema';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';

const DashboardPag = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const workspaces = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

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
        <DashboardSetup />
      </div>
    );

  return <div>DashboardPage</div>;
};

export default DashboardPag;
