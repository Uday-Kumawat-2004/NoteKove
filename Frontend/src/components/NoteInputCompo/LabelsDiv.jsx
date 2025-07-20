export default function LabelsDiv({
  onLabelSelect,
}) {
  return (
    <div className="flex flex-wrap gap-1.5 w-full h-auto items-center p-1">
      {
        onLabelSelect.map((item) => {
          return(
            <div
            key={item._id}
            className=" text-sm border-2 font-medium border-[#cac4ce] p-2 text-[#cac4ce] rounded-2xl items-center"
            >
              {item.name}
            </div>
          )
        })
      }
    </div>
  );
}
