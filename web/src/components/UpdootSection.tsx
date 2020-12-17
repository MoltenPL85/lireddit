import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from '../generated/graphql';
import gql from 'graphql-tag';
import { ApolloCache } from '@apollo/client';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updataAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment __ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: 'Post:' + postId,
      fragment: gql`
        fragment _ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [vote] = useVoteMutation();
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
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updataAfterVote(1, post.id, cache),
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
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updataAfterVote(-1, post.id, cache),
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
