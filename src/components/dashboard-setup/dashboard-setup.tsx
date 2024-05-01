'use client';
import { AuthUser } from '@supabase/supabase-js';
import React from 'react';
import { subscriptions } from '../../../migrations/schema';

type DashboardSetupProps = {
  user?: AuthUser;
  subscriptions?: {} | null;
};

const DashboardSetup = ({ user, subscriptions }: DashboardSetupProps) => {
  return <div>DashboardSetup</div>;
};

export default DashboardSetup;
