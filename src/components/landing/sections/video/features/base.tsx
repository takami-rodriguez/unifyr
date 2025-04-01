export const VideoFeatures = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center justify-between space-y-14 md:flex-row lg:space-x-28 lg:space-y-0">
        {children}
      </div>
    </div>
  );
};

export default VideoFeatures;
