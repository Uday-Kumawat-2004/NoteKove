export default function Header() {
  return (
    <div className="flex w-screen max-h-[60px] min-h-[60px] shadow-md shadow-gray-700">
      <div className="flex items-center basis-1/4 p-2 
      ">
        {/* <div className="relative left-[-18px]">
          <img src="/NoteKove2.png" alt="NoteKove Logo" className="h-[200px] w-[200px] " />
        </div> */}
      </div>
      <div className="flex items-center justify-center basis-2/4">
        {/* Center Content (search bar or nav links) */}
      </div>
      <div className="flex items-center justify-end basis-1/4 pr-4">
        {/* Profile, settings, etc. */}
      </div>
    </div>
  );
}
