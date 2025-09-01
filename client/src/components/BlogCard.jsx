function BlogCard(props) {
  const {image, category, title, description, author, date} = props;
  return (
    <div className="flex flex-col gap-4">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img className="w-full h-full object-cover rounded-md" src={image} alt={title}/>
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-[#D7F2E9] rounded-full px-3 py-1 text-sm font-semibold text-[#12B279] mb-2">{category}
          </span>
        </div>
        <a href="#" >
          <h2 className="text-start font-bold text-[#26231E] text-xl mb-2 line-clamp-2 hover:underline">
          {title}
          </h2>
        </a>
        <p className="text-muted-foreground text-[#75716B] text-sm mb-4 flex-grow line-clamp-3">
        {description}
        </p>
        <div className="flex">
          <img className="w-10 h-10 md:w-8 md:h-8 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt={author} />
          {/* Author & Date */}
          <div className="flex flex-row justify-center items-center text-center">
          <span className="text-base">{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-base text-[#75716B]">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard