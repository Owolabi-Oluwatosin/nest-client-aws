import React, { useMemo } from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.user);

  //Memoize the login user data to prevent re-renders
  const memoizedUser = useMemo(() => userInfo, [userInfo]);

  return (
    <Layout>
      <div className='flex justify-center mt-4'>
        <div>
          <div>
            <span className='text-sm font-semibold'>
              {memoizedUser?.firstName}
            </span>{" "}
            <span className='text-sm font-semibold'>
              {memoizedUser?.lastName}
            </span>
          </div>
          <span className='text-sm font-semibold'>{memoizedUser?.email}</span>
        </div>
      </div>
      <div className='flex justify-center mx-4 md:mx-0 mt-4'>
        <div className='md:h-[100vh] md:overflow-auto md:scrollbar'>
          <div className='mb-4'>
            <CreatePost />
          </div>
          <div className='mb-4'>
            <Post />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
