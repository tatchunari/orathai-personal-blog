const AuthorBio = ({ post }) => {
  return (
    <div className="bg-[#EFEEEB] rounded-3xl p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt="Thompson P."
            className="object-cover w-16 h-16"
          />
        </div>
        <div>
          <p className="text-sm">Author</p>
          <h3 className="text-2xl font-bold">{post && post.author}</h3>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="text-muted-foreground space-y-4">
        {/* <p>{state?.profile.bio}</p> */}
      </div>
    </div>
  );
};
export default AuthorBio;
