import type { ComponentProps } from 'react';
import { AsyncBoundary } from '@toss/async-boundary';

const INIT_PENDING_FALLBACK = <></>;
const INIT_ERROR_FALLBACK = () => null;

type BaseAsyncBoundaryProps = ComponentProps<typeof AsyncBoundary>;

interface SEBoundaryProps extends Omit<BaseAsyncBoundaryProps, 'pendingFallback' | 'rejectedFallback'> {
  pendingFallback?: BaseAsyncBoundaryProps['pendingFallback'];
  rejectedFallback?: BaseAsyncBoundaryProps['rejectedFallback'];
}

function SEBoundary({ pendingFallback, rejectedFallback, ...props }: SEBoundaryProps) {
  return (
    <AsyncBoundary
      pendingFallback={pendingFallback || INIT_PENDING_FALLBACK}
      rejectedFallback={rejectedFallback || INIT_ERROR_FALLBACK}
      {...props}
    />
  );
}

export default SEBoundary;
