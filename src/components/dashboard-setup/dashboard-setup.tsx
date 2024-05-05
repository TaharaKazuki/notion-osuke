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
import { workspaces } from '../../lib/supabase/schema';

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
    let filePath = null;
    const workspaceUUID = v4();
    console.info(file);

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from('work-space-logos')
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: '3600',
            upsert: true,
          });
        if (error) throw new Error('');
      } catch (error) {
        console.info('Error', error);
        toast({
          variant: 'destructive',
          title: 'Error! Could not upload your workspace logo',
        });
      }
    }
    try {
      // const newWorkspace
    } catch (error) {}
  };

  return <div>DashboardSetup</div>;
};

export default DashboardSetup;
