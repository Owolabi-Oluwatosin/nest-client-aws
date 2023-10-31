import React, { Fragment, useMemo } from "react";
import Card from "../Card";
import { useSelector } from "react-redux";
import moment from "moment";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);

  //Memoize the posts data to prevent re-renders
  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <Fragment>
      {memoizedPosts
        ? memoizedPosts?.map((post) => {
            return (
              <Card
                className='w-full bg-white text-grey-600 rounded-lg border shadow p-2 mb-4'
                key={post._id}
              >
                <div className='flex justify-between'>
                  <span className='text-sm font-semibold'>
                    {post?.author?.firstName} {post?.author?.lastName}
                  </span>
                  <span className='text-sm font-semibold'>
                    {moment(post?.author?.createdAt).fromNow()}
                  </span>
                </div>
                <p className='text-md mt-4'>{post?.content}</p>
              </Card>
            );
          })
        : "No post"}
    </Fragment>
  );
};

export default Post;
