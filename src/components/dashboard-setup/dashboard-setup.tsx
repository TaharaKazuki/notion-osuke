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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type CreateWorkspaceFormSchemaType } from '@/lib/types';

type DashboardSetupProps = {
  user?: AuthUser;
  subscriptions?: {} | null;
};

const DashboardSetup = ({ user, subscriptions }: DashboardSetupProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState('💼');
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<CreateWorkspaceFormSchemaType>({
    mode: 'onChange',
    defaultValues: {
      logo: '',
      workspaceName: '',
    },
  });

  const onSubmit: SubmitHandler<CreateWorkspaceFormSchemaType> = async (
    value
  ) => {
    const file = value.logo?.[0];
  };

  return <div>DashboardSetup</div>;
};

export default DashboardSetup;
