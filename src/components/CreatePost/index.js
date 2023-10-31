import React, { useState } from "react";
import Card from "../Card";
import TextArea from "../TextArea";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createPost, getRecentPost } from "../../features/post/postsAction";

const CreatePost = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [content, setContent] = useState("");

  const HandleContent = (e) => {
    const content = e.target.value;
    if (content.length > 500) {
      toast({
        title: "Post content length!",
        description: `You can only create post less than 500 characters`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    return setContent(content.slice(0, 500));
  };

  const handleButtonClick = () => {
    if (!content) {
      toast({
        title: "Error Message",
        description: `All field is required!`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data = {
      content,
    };

    dispatch(createPost(data)).then(() => {
      toast({
        title: `Success`,
        description: `Post created successfully`,
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(getRecentPost());
    });
    // console.log(data);
  };

  return (
    <Card className='w-full bg-white text-grey-600 rounded-lg border shadow'>
      <div className='mx-2 py-2'>
        <div className='font-bold text-xl md:text-lg pb-1'>What's new?</div>
        <div className='flex items-center'>
          <div className='w-[400px] relative'>
            <TextArea
              value={content}
              onChange={HandleContent}
              type='text'
              placeholder='post content...'
              inputClass='mb-2'
            />
            <span
              className={`${
                content.length > 0 ? "text-[#00acee]" : ""
              } absolute right-1 -bottom-2 text-xs`}
            >
              {`${content.length}/500`}
            </span>
          </div>
        </div>
        <div className='mt-2'>
          <button
            onClick={() => handleButtonClick()}
            className='bg-[#00acee] hover:bg-[#bae6fd] hover:shadow-sm transition duration-500 cursor-pointer tracking-wider rounded px-5 py-2 font-semibold text-white'
          >
            {/* {createLoading ? <Spinner size='md' /> : "Post"} */}
            {"Post"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;
