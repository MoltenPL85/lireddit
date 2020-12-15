import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' mr={4}>
      <Button
        width='40px'
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-loading');
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'updoot-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
      >
        <ChevronUpIcon size='24px' />
      </Button>
      {post.points}
      <Button
        width='40px'
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'downdoot-loading'}
        colorScheme={post.voteStatus === -1 ? 'red' : undefined}
      >
        <ChevronDownIcon size='24px' />
      </Button>
    </Flex>
  );
};
