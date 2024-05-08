import error from 'next/error';
import db from './db';
import { Subscription, workspace } from './supabase.types';
import { workspaces } from '../../../migrations/schema';
import { eq } from 'drizzle-orm';

export const createWorkspace = async (workspace: workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.info(error);
    return { data: null, error: `Error ${error}` };
  }
};

export const deleteWorkspace = async (workspaceId: string) => {
  if (!workspaceId) return;
  await db.delete(workspaces).where(eq(workspaces.id, workspaceId));
};

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    });
    if (data) return { data: data as Subscription, error: null };
    else return { data: null, error: null };
  } catch (error) {
    // console.info(error);
    return { data: null, error: `Error: ${error}` };
  }
};
