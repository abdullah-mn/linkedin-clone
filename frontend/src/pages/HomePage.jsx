import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation.jsx";
import Post from "../components/Post.jsx";
import { Users } from "lucide-react";
import SuggestedConnections from "../components/SuggestedConnections.jsx";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post");
      return res.data;
    },
    enabled: !!authUser,
  });

  const { data: suggestedConnections } = useQuery({
    queryKey: ["suggestedConnections"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/suggested-connections");
      return res.data;
    },
    enabled: !!authUser,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />

        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {posts?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              No Posts Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>
      {suggestedConnections?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {suggestedConnections?.map((user) => (
              <SuggestedConnections key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
