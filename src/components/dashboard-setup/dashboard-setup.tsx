'use client';
import { AuthUser } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
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
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type CreateWorkspaceFormSchemaType } from '@/lib/types';
import { workspaces } from '../../lib/supabase/schema';
import EmojiPicker from '@/components/global/emoji-picker';
import { Input } from '@/components/ui/input';
import { Subscription } from '@/lib/supabase/supabase.types';
import { Button } from '@/components/ui/button';
import Loader from '../global/Loader';

type DashboardSetupProps = {
  user: AuthUser;
  subscription: Subscription | null;
};

const DashboardSetup = ({ user, subscription }: DashboardSetupProps) => {
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
      // const newWorkspace;
    } catch (error) {}
  };

  return (
    <Card className="h-screen w-[800px] sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                  id="workspace"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isLoading}
                  {...register('workspaceName', {
                    required: 'Workspace name is required',
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>

            <div>
              <Label htmlFor="logo" className="text-sm text-muted-foreground">
                Workspace Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Workspace Name"
                {...(register('logo'),
                {
                  required: false,
                })}
              />
              <small className="text-red-600">
                {errors.logo?.message?.toString()}
              </small>
              {subscription?.status !== 'active' && (
                <small className="block text-muted-foreground">
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              )}
            </div>
            <div className="self-end">
              <Button disabled={isLoading} type="submit">
                {!isLoading ? 'Create Workspace' : <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
