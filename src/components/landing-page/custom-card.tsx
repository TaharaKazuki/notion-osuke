import type { ComponentProps, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CardProps = ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
  cardHeader?: ReactNode;
  cardContent?: ReactNode;
  cardFooter?: ReactNode;
};

const CustomCard = ({
  className,
  cardHeader,
  cardContent,
  cardFooter,
  ...props
}: CustomCardProps) => {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>{cardHeader}</CardHeader>
      <CardContent className="grid gap-4">{cardContent}</CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
};

export default CustomCard;
