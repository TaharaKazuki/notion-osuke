'use client';
import { AuthUser } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { subscriptions } from '../../../migrations/schema';
import { v4 } from 'uuid';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import * as z from 'zod';

type DashboardSetupProps = {
  user?: AuthUser;
  subscriptions?: {} | null;
};

const DashboardSetup = ({ user, subscriptions }: DashboardSetupProps) => {
  return <div>DashboardSetup</div>;
};

export default DashboardSetup;
