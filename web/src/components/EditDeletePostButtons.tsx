import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
        <Button as={Link} mr={4} aria-label='Edit Post' width='40px'>
          <EditIcon />
        </Button>
      </NextLink>
      <Button
        aria-label='Delete Post'
        width='40px'
        onClick={() => {
          deletePost({ id });
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};
